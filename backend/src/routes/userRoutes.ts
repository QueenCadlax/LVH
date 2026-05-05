import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import * as referralService from '../services/referralService';
import * as loyaltyService from '../services/loyaltyService';
import pool from '../config/database';

const router = Router();

// POST /api/user/referral
router.post('/referral', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const referrerId = req.user!.id;
    const { referredId } = req.body;
    if (!referredId || referrerId === referredId) {
      return res.status(400).json({ success: false, message: 'Invalid referral' });
    }
    // Only one referral per referred user
    const exists = await pool.query('SELECT 1 FROM referrals WHERE referred_id = $1', [referredId]);
    if (exists?.rowCount && exists.rowCount > 0) {
      return res.status(409).json({ success: false, message: 'User already referred' });
    }
    await pool.query(
      'INSERT INTO referrals (referrer_id, referred_id, points_awarded) VALUES ($1, $2, $3)',
      [referrerId, referredId, 100]
    );
    // Optionally add loyalty points here
    await pool.query(
      'INSERT INTO loyalty_points (user_id, points, source) VALUES ($1, $2, $3)',
      [referrerId, 100, 'referral']
    );
    res.json({ success: true, data: null, message: 'Referral recorded' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to record referral' });
  }
});

// GET /api/user/referrals
router.get('/referrals', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const result = await pool.query(
      'SELECT * FROM referrals WHERE referrer_id = $1 OR referred_id = $1',
      [userId]
    );
    res.json({ success: true, data: result.rows, message: 'Referrals fetched' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch referrals' });
  }
});

// GET /api/user/loyalty
router.get('/loyalty', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const result = await pool.query(
      'SELECT * FROM loyalty_points WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json({ success: true, data: result.rows, message: 'Loyalty history fetched' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch loyalty history' });
  }
});

export default router;
