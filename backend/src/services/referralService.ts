import pool from '../config/database';
import crypto from 'crypto';

export interface Referral {
  id: number;
  referrer_id: number;
  referred_user_id: number;
  referral_code: string;
  reward_points: number;
  status: 'pending' | 'completed' | 'expired';
  created_at: Date;
  completed_at?: Date;
  expires_at?: Date;
}

export interface ReferralStats {
  total_referrals: number;
  completed_referrals: number;
  pending_referrals: number;
  total_reward_points: number;
  referral_list: Referral[];
}

class ReferralService {
  /**
   * Generate unique referral code
   */
  generateReferralCode(): string {
    return crypto.randomBytes(6).toString('hex').toUpperCase().substring(0, 8);
  }

  /**
   * Create a referral link for a user
   */
  async createReferralCode(referrerId: number): Promise<string> {
    const code = this.generateReferralCode();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90); // 90 days expiry

    const query = `
      INSERT INTO referrals (referrer_id, referred_user_id, referral_code, expires_at, status)
      VALUES ($1, NULL, $2, $3, 'pending')
      ON CONFLICT (referral_code) DO UPDATE SET referral_code = EXCLUDED.referral_code
      RETURNING referral_code;
    `;

    const result = await pool.query(query, [referrerId, code, expiresAt]);
    return result.rows[0].referral_code;
  }

  /**
   * Register a referral (user signed up with referral code)
   */
  async registerReferral(
    referralCode: string,
    referredUserId: number
  ): Promise<{ success: boolean; reward_points: number; message: string }> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Find the referral code
      const codeQuery = `
        SELECT * FROM referrals
        WHERE referral_code = $1 AND status = 'pending'
        AND (expires_at IS NULL OR expires_at > NOW());
      `;
      const codeResult = await client.query(codeQuery, [referralCode]);

      if (codeResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return { success: false, reward_points: 0, message: 'Invalid or expired referral code' };
      }

      const referral = codeResult.rows[0];

      // Update referral record
      const updateQuery = `
        UPDATE referrals
        SET referred_user_id = $1, status = 'completed', completed_at = NOW()
        WHERE id = $2;
      `;
      await client.query(updateQuery, [referredUserId, referral.id]);

      // Award points to referrer
      const pointsQuery = `
        INSERT INTO loyalty_points (user_id, points, reason, created_by)
        VALUES ($1, $2, 'Referral reward', 'system');
      `;
      await client.query(pointsQuery, [referral.referrer_id, referral.reward_points]);

      await client.query('COMMIT');
      return { success: true, reward_points: referral.reward_points, message: 'Referral registered successfully' };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get referral stats for a user
   */
  async getReferralStats(userId: number): Promise<ReferralStats> {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_referrals,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_referrals,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_referrals,
        COALESCE(SUM(reward_points), 0) as total_reward_points
      FROM referrals
      WHERE referrer_id = $1;
    `;

    const listQuery = `
      SELECT r.*, u.name, u.email
      FROM referrals r
      LEFT JOIN users u ON r.referred_user_id = u.id
      WHERE r.referrer_id = $1
      ORDER BY r.created_at DESC;
    `;

    const [statsResult, listResult] = await Promise.all([
      pool.query(statsQuery, [userId]),
      pool.query(listQuery, [userId]),
    ]);

    const stats = statsResult.rows[0];
    return {
      total_referrals: parseInt(stats.total_referrals),
      completed_referrals: parseInt(stats.completed_referrals),
      pending_referrals: parseInt(stats.pending_referrals),
      total_reward_points: parseInt(stats.total_reward_points),
      referral_list: listResult.rows,
    };
  }

  /**
   * Get leaderboard of top referrers
   */
  async getTopReferrers(limit: number = 10) {
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(CASE WHEN r.status = 'completed' THEN 1 END) as completed_referrals,
        COALESCE(SUM(r.reward_points), 0) as total_rewards
      FROM users u
      LEFT JOIN referrals r ON u.id = r.referrer_id
      GROUP BY u.id, u.name, u.email
      HAVING COUNT(CASE WHEN r.status = 'completed' THEN 1 END) > 0
      ORDER BY completed_referrals DESC, total_rewards DESC
      LIMIT $1;
    `;

    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  /**
   * Validate referral code
   */
  async validateReferralCode(code: string): Promise<boolean> {
    const query = `
      SELECT * FROM referrals
      WHERE referral_code = $1
      AND status = 'pending'
      AND (expires_at IS NULL OR expires_at > NOW());
    `;
    const result = await pool.query(query, [code]);
    return result.rows.length > 0;
  }
}

export default new ReferralService();
