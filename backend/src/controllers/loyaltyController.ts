import { Request, Response } from 'express';
import pool from '../config/database';

// Get user's loyalty points and history
export const getUserLoyalty = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const result = await pool.query(`
      SELECT 
        id,
        "userId",
        "totalPoints",
        "pointsHistory",
        "lastEarnedAt",
        "createdAt"
      FROM loyalty_points
      WHERE "userId" = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        data: {
          totalPoints: 0,
          pointsHistory: [],
          lastEarnedAt: null
        },
        message: 'No loyalty data found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Loyalty points retrieved successfully'
    });
  } catch (error: any) {
    console.error('Get loyalty error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve loyalty points'
    });
  }
};

// Add points to user (internal use)
export const addLoyaltyPoints = async (userId: number, points: number, reason: string) => {
  try {
    // Get current points
    const current = await pool.query(
      'SELECT "totalPoints", "pointsHistory" FROM loyalty_points WHERE "userId" = $1',
      [userId]
    );

    let totalPoints = 0;
    let pointsHistory = [];

    if (current.rows.length > 0) {
      totalPoints = current.rows[0].totalPoints;
      pointsHistory = current.rows[0].pointsHistory || [];
    }

    totalPoints += points;
    pointsHistory.push({
      points,
      reason,
      timestamp: new Date().toISOString()
    });

    // Upsert loyalty record
    await pool.query(`
      INSERT INTO loyalty_points ("userId", "totalPoints", "pointsHistory", "lastEarnedAt")
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT ("userId") DO UPDATE SET
        "totalPoints" = $2,
        "pointsHistory" = $3,
        "lastEarnedAt" = NOW()
    `, [userId, totalPoints, JSON.stringify(pointsHistory)]);

    return { success: true, totalPoints };
  } catch (error: any) {
    console.error('Add loyalty points error:', error);
    return { success: false, error: error.message };
  }
};

// Submit a referral
export const submitReferral = async (req: Request, res: Response) => {
  try {
    const referrerId = (req as any).user?.id;
    const { referredEmail, pointsAwarded = 100 } = req.body;

    if (!referrerId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    if (!referredEmail) {
      return res.status(400).json({
        success: false,
        error: 'Referred email is required'
      });
    }

    // Find referred user
    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [referredEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Referred user not found'
      });
    }

    const referredId = userResult.rows[0].id;

    // Check if referral already exists
    const existingReferral = await pool.query(`
      SELECT id FROM referrals
      WHERE "referrerId" = $1 AND "referredId" = $2
    `, [referrerId, referredId]);

    if (existingReferral.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'You have already referred this user'
      });
    }

    // Create referral
    const referralResult = await pool.query(`
      INSERT INTO referrals ("referrerId", "referredId", "pointsAwarded", status)
      VALUES ($1, $2, $3, 'pending')
      RETURNING *
    `, [referrerId, referredId, pointsAwarded]);

    // Award points to referrer
    await addLoyaltyPoints(referrerId, pointsAwarded, `Referral bonus for ${referredEmail}`);

    res.json({
      success: true,
      data: referralResult.rows[0],
      message: 'Referral submitted successfully'
    });
  } catch (error: any) {
    console.error('Submit referral error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit referral'
    });
  }
};

// Get user's referrals
export const getUserReferrals = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const result = await pool.query(`
      SELECT 
        r.id,
        r."referredId",
        u.email,
        u."firstName",
        u."lastName",
        r."pointsAwarded",
        r.status,
        r."createdAt"
      FROM referrals r
      JOIN users u ON r."referredId" = u.id
      WHERE r."referrerId" = $1
      ORDER BY r."createdAt" DESC
    `, [userId]);

    // Count stats
    const stats = {
      total: result.rows.length,
      completed: result.rows.filter(r => r.status === 'completed').length,
      pending: result.rows.filter(r => r.status === 'pending').length,
      totalEarnings: result.rows.reduce((sum, r) => sum + (r.pointsAwarded || 0), 0)
    };

    res.json({
      success: true,
      data: {
        referrals: result.rows,
        stats
      },
      message: 'Referrals retrieved successfully'
    });
  } catch (error: any) {
    console.error('Get referrals error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve referrals'
    });
  }
};

// Confirm referral (admin only - when referred user makes first purchase/action)
export const confirmReferral = async (req: Request, res: Response) => {
  try {
    const { referralId } = req.params;

    // Update referral status
    const result = await pool.query(`
      UPDATE referrals
      SET status = 'completed'
      WHERE id = $1
      RETURNING "referrerId", "pointsAwarded"
    `, [referralId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Referral not found'
      });
    }

    // Award completion bonus
    const { referrerId, pointsAwarded } = result.rows[0];
    await addLoyaltyPoints(referrerId, 50, 'Referral completion bonus');

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Referral confirmed and bonus awarded'
    });
  } catch (error: any) {
    console.error('Confirm referral error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to confirm referral'
    });
  }
};
