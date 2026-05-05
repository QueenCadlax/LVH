import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import * as adminController from '../controllers/adminController';
import pool from '../config/database';
import * as adminService from '../services/adminService';

const router = Router();

// All admin routes require authentication
router.use(authMiddleware);

// 🆕 GET all users (simple endpoint)
router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    console.log('[AdminRoute /users] Fetching users for admin:', req.user?.id);
    const result = await pool.query(
      `SELECT 
        id, 
        email, 
        "firstName", 
        "lastName", 
        phone, 
        "businessName", 
        "businessType", 
        location, 
        "isVerified", 
        "createdAt"
       FROM users
       ORDER BY "createdAt" DESC`
    );
    console.log('[AdminRoute /users] Found', result.rows.length, 'users');
    res.json({ success: true, users: result.rows });
  } catch (err: any) {
    console.error('[AdminRoute /users] Error:', err.message, err.code);
    res.status(500).json({ success: false, message: `Server error: ${err.message}` });
  }
});

// 🆕 GET all businesses (simple endpoint)
router.get('/businesses-list', async (req: AuthRequest, res: Response) => {
  try {
    console.log('[AdminRoute /businesses-list] Fetching businesses for admin:', req.user?.id);
    const result = await pool.query(
      `SELECT 
        b.id,
        b.name,
        b.description,
        b.category,
        b.location,
        b.rating,
        b."reviewCount",
        b."isVerified",
        b."createdAt",
        b."userId",
        u.email as "ownerEmail",
        u."firstName" as "ownerFirstName",
        u."lastName" as "ownerLastName"
       FROM businesses b
       LEFT JOIN users u ON b."userId" = u.id
       ORDER BY b."createdAt" DESC`
    );
    console.log('[AdminRoute /businesses-list] Found', result.rows.length, 'businesses');
    res.json({ success: true, businesses: result.rows });
  } catch (err: any) {
    console.error('[AdminRoute /businesses-list] Error:', err.message, err.code);
    res.status(500).json({ success: false, message: `Server error: ${err.message}` });
  }
});

// 🆕 PATCH verify a business
router.patch('/business/:id/verify', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    console.log('[AdminRoute /business/:id/verify] Verifying business:', id);
    const result = await pool.query(
      `UPDATE businesses 
       SET "isVerified" = true, status = $1
       WHERE id = $2
       RETURNING *`,
      ['active', parseInt(id)]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }
    
    console.log('[AdminRoute /business/:id/verify] Business verified:', id);
    res.json({ success: true, business: result.rows[0] });
  } catch (err: any) {
    console.error('[AdminRoute /business/:id/verify] Error:', err.message);
    res.status(500).json({ success: false, message: `Cannot verify business: ${err.message}` });
  }
});

// 🆕 PATCH feature a business
router.patch('/business/:id/feature', async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    console.log('[AdminRoute /business/:id/feature] Featuring business:', id);
    // isFeatured column doesn't exist yet - skip this for now
    return res.status(501).json({ success: false, message: 'Feature endpoint not yet implemented' });
  } catch (err: any) {
    console.error('[AdminRoute /business/:id/feature] Error:', err.message);
    res.status(500).json({ success: false, message: 'Cannot feature business' });
  }
});

// Approval Management
router.get('/approvals/pending', adminController.getPendingApprovals);
router.post('/businesses/:businessId/approve', adminController.approveBusiness);
router.post('/businesses/:businessId/reject', adminController.rejectBusiness);
router.post('/businesses/:businessId/suspend', adminController.suspendBusiness);

// Tier Management
router.post('/businesses/:businessId/upgrade-tier', adminController.upgradeTier);

// Analytics & Stats
router.get('/stats/platform', adminController.getPlatformStats);
router.get('/businesses/:businessId/analytics', adminController.getBusinessAnalytics);
router.get('/businesses', adminController.getAllBusinesses);

// Admin overview - totals
router.get('/overview', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    console.log('[AdminRoute /overview] Fetching admin overview for user:', userId);

    // Verify admin via admins table
    const isAdmin = await adminService.isAdmin(userId);
    if (!isAdmin) return res.status(403).json({ error: 'Forbidden' });

    const usersRes = await pool.query('SELECT COUNT(*) as count FROM users');
    const businessesRes = await pool.query('SELECT COUNT(*) as count FROM businesses');
    const pendingRes = await pool.query("SELECT COUNT(*) as count FROM businesses WHERE status = 'pending'");

    console.log('[AdminRoute /overview] Overview data:', {
      totalUsers: usersRes.rows[0]?.count,
      totalBusinesses: businessesRes.rows[0]?.count,
      pendingApprovals: pendingRes.rows[0]?.count
    });

    return res.json({
      success: true,
      data: {
        totalUsers: Number(usersRes.rows[0]?.count || 0),
        totalBusinesses: Number(businessesRes.rows[0]?.count || 0),
        pendingApprovals: Number(pendingRes.rows[0]?.count || 0),
      }
    });
  } catch (err: any) {
    console.error('[AdminRoute /overview] Error:', err.message);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
});

export default router;
