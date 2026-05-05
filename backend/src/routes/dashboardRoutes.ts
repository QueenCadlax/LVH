import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import pool from '../config/database';
import messagingService from '../services/messagingService';
import activityService from '../services/activityService';

const router = Router();

/**
 * GET /api/user/dashboard
 * Get complete user dashboard with all stats
 */
router.get('/dashboard', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Get reward points (safe: try/catch each query)
    let rewardPoints = 0;
    try {
      const pointsRes = await pool.query(
        'SELECT COALESCE(SUM(points), 0) as total FROM loyalty_points WHERE user_id = $1',
        [userId]
      );
      rewardPoints = parseInt(pointsRes.rows[0]?.total || '0', 10);
    } catch (e) {
      // Table may not exist, default to 0
    }

    // Get saved items count from favorites
    let savedItems = 0;
    try {
      const savedRes = await pool.query(
        'SELECT COUNT(*) as count FROM favorites WHERE "userId" = $1',
        [userId]
      );
      savedItems = parseInt(savedRes.rows[0]?.count || '0', 10);
    } catch (e) {
      // Table may not exist, default to 0
    }

    // Get unread messages count
    let unreadMessages = 0;
    try {
      const msgRes = await pool.query(
        'SELECT COUNT(*) as count FROM messages WHERE receiver_id = $1 AND read = false',
        [userId]
      );
      unreadMessages = parseInt(msgRes.rows[0]?.count || '0', 10);
    } catch (e) {
      // Table may not exist, default to 0
    }

    // Get recent activity (empty array if table doesn't exist)
    let recentActivity = [];
    try {
      const actRes = await pool.query(
        'SELECT * FROM recent_activity WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10',
        [userId]
      );
      recentActivity = actRes.rows || [];
    } catch (e) {
      // Table may not exist, return empty
    }

    // Get referrals count
    let referralsCount = 0;
    try {
      const refRes = await pool.query(
        'SELECT COUNT(*) as count FROM referrals WHERE referrer_id = $1',
        [userId]
      );
      referralsCount = parseInt(refRes.rows[0]?.count || '0', 10);
    } catch (e) {}

    // Get loyalty history
    let loyaltyHistory = [];
    try {
      const loyRes = await pool.query(
        'SELECT * FROM loyalty_points WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10',
        [userId]
      );
      loyaltyHistory = loyRes.rows || [];
    } catch (e) {}

    res.json({
      success: true,
      data: {
        rewardPoints,
        savedItems,
        unreadMessages,
        recentActivity,
        referralsCount,
        loyaltyHistory
      }
    });
  } catch (error: any) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
});

/**
 * GET /api/business/dashboard/:id
 * Get business dashboard with stats, messages, and activity
 */
router.get('/business/dashboard/:id', async (req: Request, res: Response) => {
  try {
    const { id: businessId } = req.params;

    // Get business info
    const businessQuery = `
      SELECT 
        b.*,
        COALESCE(COUNT(DISTINCT r.id), 0) as review_count,
        COALESCE(AVG(r.rating), 0) as average_rating
      FROM businesses b
      LEFT JOIN reviews r ON b.id = r.business_id
      WHERE b.id = $1
      GROUP BY b.id;
    `;
    const businessResult = await pool.query(businessQuery, [businessId]);

    if (businessResult.rows.length === 0) {
      return res.status(404).json({ error: 'Business not found' });
    }

    const business = businessResult.rows[0];

    // Get recent messages
    const messagesQuery = `
      SELECT m.*, u.name as sender_name
      FROM messages m
      LEFT JOIN users u ON m.sender_id = u.id
      WHERE m.business_id = $1
      ORDER BY m.created_at DESC
      LIMIT 20;
    `;
    const messagesResult = await pool.query(messagesQuery, [businessId]);

    // Get unread messages
    const unreadQuery = `
      SELECT COUNT(*) as count
      FROM messages
      WHERE business_id = $1 AND read = false;
    `;
    const unreadResult = await pool.query(unreadQuery, [businessId]);

    // Get business activity
    const activityQuery = `
      SELECT * FROM business_activity
      WHERE business_id = $1
      ORDER BY created_at DESC
      LIMIT 15;
    `;
    const activityResult = await pool.query(activityQuery, [businessId]);

    // Get business stats
    const statsQuery = `
      SELECT 
        type,
        COUNT(*) as count
      FROM business_activity
      WHERE business_id = $1
      GROUP BY type;
    `;
    const statsResult = await pool.query(statsQuery, [businessId]);

    res.json({
      success: true,
      data: {
        business,
        messages: {
          recent_messages: messagesResult.rows,
          unread_count: unreadResult.rows[0]?.count || 0,
        },
        activity: {
          recent_activity: activityResult.rows,
          stats: statsResult.rows,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/business/:id/messages
 * Get all messages for a business
 */
router.get('/business/:id/messages', async (req: Request, res: Response) => {
  try {
    const { id: businessId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    const query = `
      SELECT m.*, u.name as sender_name, u.email as sender_email
      FROM messages m
      LEFT JOIN users u ON m.sender_id = u.id
      WHERE m.business_id = $1
      ORDER BY m.created_at DESC
      LIMIT $2;
    `;
    const result = await pool.query(query, [businessId, limit]);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/business/:id/activity
 * Get activity for a business
 */
router.get('/business/:id/activity', async (req: Request, res: Response) => {
  try {
    const { id: businessId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

    const activity = await activityService.getBusinessActivity(parseInt(businessId), limit);

    res.json({
      success: true,
      data: activity,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
