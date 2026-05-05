import pool from '../config/database';

export interface Agent {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  monthly_target: number;
  current_progress: number;
  deals_closed: number;
  total_revenue: number;
  status: 'active' | 'inactive' | 'retired';
  created_at: Date;
  updated_at: Date;
}

export interface AgentPerformance {
  id: number;
  agent_id: number;
  month_year: string;
  target: number;
  actual: number;
  deals_count: number;
  commission: number;
  created_at: Date;
}

export interface AgentDashboard {
  agent: Agent;
  current_performance: AgentPerformance | null;
  recent_activity: AgentPerformance[];
  progress_percentage: number;
  target_achieved: boolean;
}

class AgentService {
  /**
   * Create or update agent profile
   */
  async createOrUpdateAgent(
    userId: number,
    name: string,
    email: string,
    phone?: string,
    monthlyTarget: number = 0
  ): Promise<Agent> {
    const query = `
      INSERT INTO agents (user_id, name, email, phone, monthly_target)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        monthly_target = EXCLUDED.monthly_target,
        updated_at = NOW()
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, name, email, phone || null, monthlyTarget]);
    return result.rows[0];
  }

  /**
   * Get agent dashboard
   */
  async getAgentDashboard(agentId: number): Promise<AgentDashboard> {
    const agentQuery = `
      SELECT * FROM agents WHERE id = $1;
    `;

    const currentMonthQuery = `
      SELECT * FROM agent_performance
      WHERE agent_id = $1 AND MONTH(month_year) = MONTH(NOW()) AND YEAR(month_year) = YEAR(NOW())
      LIMIT 1;
    `;

    const recentQuery = `
      SELECT * FROM agent_performance
      WHERE agent_id = $1
      ORDER BY month_year DESC
      LIMIT 6;
    `;

    const [agentResult, currentResult, recentResult] = await Promise.all([
      pool.query(agentQuery, [agentId]),
      pool.query(currentMonthQuery, [agentId]),
      pool.query(recentQuery, [agentId]),
    ]);

    if (agentResult.rows.length === 0) {
      throw new Error('Agent not found');
    }

    const agent = agentResult.rows[0];
    const currentPerformance = currentResult.rows[0] || null;
    const progressPercentage = agent.monthly_target > 0 ? (agent.current_progress / agent.monthly_target) * 100 : 0;

    return {
      agent,
      current_performance: currentPerformance,
      recent_activity: recentResult.rows,
      progress_percentage: Math.min(progressPercentage, 100),
      target_achieved: agent.current_progress >= agent.monthly_target,
    };
  }

  /**
   * Record agent deal/sale
   */
  async recordDeal(
    agentId: number,
    amount: number,
    description: string
  ): Promise<Agent> {
    const agent = await pool.query(`SELECT * FROM agents WHERE id = $1`, [agentId]);
    if (agent.rows.length === 0) throw new Error('Agent not found');

    const currentAgent = agent.rows[0];
    const query = `
      UPDATE agents
      SET 
        deals_closed = deals_closed + 1,
        current_progress = current_progress + $2,
        total_revenue = total_revenue + $2,
        updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [agentId, amount]);
    return result.rows[0];
  }

  /**
   * Update agent performance for month
   */
  async updateMonthlyPerformance(
    agentId: number,
    monthYear: string,
    actual: number,
    dealsCount: number,
    commission: number
  ): Promise<AgentPerformance> {
    const agentQuery = `SELECT monthly_target FROM agents WHERE id = $1`;
    const agentResult = await pool.query(agentQuery, [agentId]);
    const target = agentResult.rows[0]?.monthly_target || 0;

    const query = `
      INSERT INTO agent_performance (agent_id, month_year, target, actual, deals_count, commission)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (agent_id, month_year) DO UPDATE SET
        actual = EXCLUDED.actual,
        deals_count = EXCLUDED.deals_count,
        commission = EXCLUDED.commission
      RETURNING *;
    `;

    const result = await pool.query(query, [agentId, monthYear, target, actual, dealsCount, commission]);
    return result.rows[0];
  }

  /**
   * Get agent leaderboard
   */
  async getLeaderboard(metric: 'revenue' | 'deals' | 'progress' = 'revenue', limit: number = 10) {
    let orderBy = 'a.total_revenue DESC';
    if (metric === 'deals') orderBy = 'a.deals_closed DESC';
    if (metric === 'progress') orderBy = 'a.current_progress DESC';

    const query = `
      SELECT 
        a.*,
        RANK() OVER (ORDER BY ${orderBy.split(' ')[0]} ${orderBy.split(' ')[1]}) as rank,
        ROUND((a.current_progress / NULLIF(a.monthly_target, 0)) * 100, 2) as progress_percentage
      FROM agents a
      WHERE a.status = 'active'
      ORDER BY ${orderBy}
      LIMIT $1;
    `;

    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  /**
   * Get agent performance history
   */
  async getPerformanceHistory(agentId: number, months: number = 12): Promise<AgentPerformance[]> {
    const query = `
      SELECT * FROM agent_performance
      WHERE agent_id = $1 AND month_year > DATE_SUB(NOW(), INTERVAL '${months}' MONTH)
      ORDER BY month_year DESC;
    `;

    const result = await pool.query(query, [agentId]);
    return result.rows;
  }

  /**
   * Update agent status
   */
  async updateAgentStatus(agentId: number, status: 'active' | 'inactive' | 'retired'): Promise<Agent> {
    const query = `
      UPDATE agents
      SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [agentId, status]);
    return result.rows[0];
  }

  /**
   * Reset monthly progress
   */
  async resetMonthlyProgress(agentId: number): Promise<Agent> {
    const query = `
      UPDATE agents
      SET current_progress = 0, deals_closed = 0
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [agentId]);
    return result.rows[0];
  }

  /**
   * Get team leaderboard
   */
  async getTeamLeaderboard(teamIds: number[], metric: 'revenue' | 'deals' = 'revenue', limit: number = 20) {
    let orderBy = 'a.total_revenue DESC';
    if (metric === 'deals') orderBy = 'a.deals_closed DESC';

    const query = `
      SELECT 
        a.*,
        RANK() OVER (ORDER BY ${orderBy.split(' ')[0]} ${orderBy.split(' ')[1]}) as rank
      FROM agents a
      WHERE a.id = ANY($1) AND a.status = 'active'
      ORDER BY ${orderBy}
      LIMIT $2;
    `;

    const result = await pool.query(query, [teamIds, limit]);
    return result.rows;
  }
}

export default new AgentService();
