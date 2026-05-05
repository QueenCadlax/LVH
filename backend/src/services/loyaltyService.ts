import pool from '../config/database';

export interface LoyaltyTransaction {
  id: number;
  user_id: number;
  points: number;
  reason: string;
  description: string;
  created_by: string;
  created_at: Date;
}

export interface UserLoyaltyStats {
  total_points: number;
  transactions: LoyaltyTransaction[];
  recent_activity: LoyaltyTransaction[];
}

class LoyaltyService {
  /**
   * Add loyalty points to a user
   */
  async addPoints(
    userId: number,
    points: number,
    reason: string,
    createdBy: string = 'system'
  ): Promise<LoyaltyTransaction> {
    const query = `
      INSERT INTO loyalty_points (user_id, points, reason, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, points, reason, createdBy]);
    return result.rows[0];
  }

  /**
   * Deduct loyalty points (redeem)
   */
  async redeemPoints(
    userId: number,
    points: number,
    reason: string
  ): Promise<{ success: boolean; remaining_points: number }> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Check current points
      const balanceQuery = `SELECT COALESCE(SUM(points), 0) as total FROM loyalty_points WHERE user_id = $1`;
      const balanceResult = await client.query(balanceQuery, [userId]);
      const currentPoints = balanceResult.rows[0].total;

      if (currentPoints < points) {
        await client.query('ROLLBACK');
        throw new Error('Insufficient loyalty points');
      }

      // Deduct points
      await client.query(
        `INSERT INTO loyalty_points (user_id, points, reason, created_by) VALUES ($1, $2, $3, 'system')`,
        [userId, -points, `Redeemed: ${reason}`]
      );

      await client.query('COMMIT');
      return { success: true, remaining_points: currentPoints - points };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get user loyalty stats
   */
  async getUserLoyaltyStats(userId: number): Promise<UserLoyaltyStats> {
    const pointsQuery = `
      SELECT COALESCE(SUM(points), 0) as total_points
      FROM loyalty_points
      WHERE user_id = $1;
    `;

    const transactionsQuery = `
      SELECT * FROM loyalty_points
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 50;
    `;

    const recentQuery = `
      SELECT * FROM loyalty_points
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 10;
    `;

    const [pointsResult, transactionsResult, recentResult] = await Promise.all([
      pool.query(pointsQuery, [userId]),
      pool.query(transactionsQuery, [userId]),
      pool.query(recentQuery, [userId]),
    ]);

    return {
      total_points: pointsResult.rows[0]?.total_points || 0,
      transactions: transactionsResult.rows,
      recent_activity: recentResult.rows,
    };
  }

  /**
   * Get top users by loyalty points
   */
  async getTopLoyaltyUsers(limit: number = 10) {
    const query = `
      SELECT u.id, u.name, u.email, COALESCE(SUM(lp.points), 0) as total_points
      FROM users u
      LEFT JOIN loyalty_points lp ON u.id = lp.user_id
      GROUP BY u.id, u.name, u.email
      ORDER BY total_points DESC
      LIMIT $1;
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  /**
   * Award points for specific actions
   */
  async awardPointsForAction(
    userId: number,
    actionType: string
  ): Promise<LoyaltyTransaction | null> {
    const pointsMap: Record<string, number> = {
      review: 50,
      booking: 25,
      referral: 100,
      purchase: 10,
      message: 5,
      profile_complete: 30,
      first_login: 20,
    };

    const points = pointsMap[actionType];
    if (!points) return null;

    return this.addPoints(userId, points, `Action: ${actionType}`, 'system');
  }
}

export default new LoyaltyService();
