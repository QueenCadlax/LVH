import pool from '../config/database';

export interface ActivityEntry {
  id: number;
  user_id?: number;
  business_id?: number;
  type: string;
  description: string;
  triggered_by?: number;
  data?: any;
  created_at: Date;
}

class ActivityService {
  /**
   * Log user activity
   */
  async logUserActivity(
    userId: number,
    type: string,
    description: string,
    businessId?: number,
    data?: any
  ): Promise<ActivityEntry> {
    const query = `
      INSERT INTO recent_activity (user_id, type, description, business_id, data)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      userId,
      type,
      description,
      businessId || null,
      data ? JSON.stringify(data) : null,
    ]);
    return result.rows[0];
  }

  /**
   * Log business activity
   */
  async logBusinessActivity(
    businessId: number,
    type: string,
    description: string,
    triggeredBy?: number,
    data?: any
  ): Promise<ActivityEntry> {
    const query = `
      INSERT INTO business_activity (business_id, type, description, triggered_by, data)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      businessId,
      type,
      description,
      triggeredBy || null,
      data ? JSON.stringify(data) : null,
    ]);
    return result.rows[0];
  }

  /**
   * Get user activity
   */
  async getUserActivity(userId: number, limit: number = 20): Promise<ActivityEntry[]> {
    const query = `
      SELECT * FROM recent_activity
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2;
    `;
    const result = await pool.query(query, [userId, limit]);
    return result.rows;
  }

  /**
   * Get business activity
   */
  async getBusinessActivity(businessId: number, limit: number = 20): Promise<ActivityEntry[]> {
    const query = `
      SELECT * FROM business_activity
      WHERE business_id = $1
      ORDER BY created_at DESC
      LIMIT $2;
    `;
    const result = await pool.query(query, [businessId, limit]);
    return result.rows;
  }

  /**
   * Get activity by type
   */
  async getActivityByType(
    userId: number,
    type: string,
    limit: number = 10
  ): Promise<ActivityEntry[]> {
    const query = `
      SELECT * FROM recent_activity
      WHERE user_id = $1 AND type = $2
      ORDER BY created_at DESC
      LIMIT $3;
    `;
    const result = await pool.query(query, [userId, type, limit]);
    return result.rows;
  }

  /**
   * Get activity summary for user
   */
  async getUserActivitySummary(userId: number) {
    const query = `
      SELECT 
        type,
        COUNT(*) as count,
        MAX(created_at) as latest
      FROM recent_activity
      WHERE user_id = $1
      GROUP BY type
      ORDER BY count DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  /**
   * Get activity summary for business
   */
  async getBusinessActivitySummary(businessId: number) {
    const query = `
      SELECT 
        type,
        COUNT(*) as count,
        MAX(created_at) as latest
      FROM business_activity
      WHERE business_id = $1
      GROUP BY type
      ORDER BY count DESC;
    `;
    const result = await pool.query(query, [businessId]);
    return result.rows;
  }

  /**
   * Clean old activity (for maintenance)
   */
  async cleanOldActivity(daysOld: number = 90): Promise<number> {
    const query = `
      DELETE FROM recent_activity
      WHERE created_at < NOW() - INTERVAL '${daysOld} days';
    `;
    const result = await pool.query(query);
    return result.rowCount || 0;
  }

  /**
   * Get recent activities for feed
   */
  async getRecentActivitiesFeed(limit: number = 50) {
    const query = `
      SELECT 
        'user' as type_category,
        ra.id,
        ra.user_id,
        u.name as user_name,
        u.email,
        ra.type,
        ra.description,
        ra.created_at
      FROM recent_activity ra
      LEFT JOIN users u ON ra.user_id = u.id
      UNION ALL
      SELECT 
        'business' as type_category,
        ba.id,
        ba.business_id as user_id,
        b.name,
        NULL as email,
        ba.type,
        ba.description,
        ba.created_at
      FROM business_activity ba
      LEFT JOIN businesses b ON ba.business_id = b.id
      ORDER BY created_at DESC
      LIMIT $1;
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }
}

export default new ActivityService();
