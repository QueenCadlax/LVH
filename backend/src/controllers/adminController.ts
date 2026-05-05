import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import * as adminService from '../services/adminService';

// Check if user is admin
const checkAdmin = async (userId: number) => {
  const isAdmin = await adminService.isAdmin(userId);
  if (!isAdmin) {
    throw new AppError(403, 'Admin access required');
  }
};

export const getPendingApprovals = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    await checkAdmin(req.user.id);

    const page = parseInt(req.query.page as string) || 1;
    const result = await adminService.getPendingApprovals(page);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Get pending approvals error:', error);
    res.status(500).json({ error: 'Failed to fetch pending approvals' });
  }
};

export const approveBusiness = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    await checkAdmin(req.user.id);

    const { businessId } = req.params;
    const { tier = 'free', notes = '' } = req.body;

    const business = await adminService.approveBusiness(parseInt(businessId), req.user.id, tier, notes);

    res.json({
      success: true,
      message: 'Business approved successfully',
      business,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Approve business error:', error);
    res.status(500).json({ error: 'Failed to approve business' });
  }
};

export const rejectBusiness = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    await checkAdmin(req.user.id);

    const { businessId } = req.params;
    const { notes = '' } = req.body;

    const business = await adminService.rejectBusiness(parseInt(businessId), req.user.id, notes);

    res.json({
      success: true,
      message: 'Business rejected successfully',
      business,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Reject business error:', error);
    res.status(500).json({ error: 'Failed to reject business' });
  }
};

export const suspendBusiness = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    await checkAdmin(req.user.id);

    const { businessId } = req.params;
    const { reason = '' } = req.body;

    const business = await adminService.suspendBusiness(parseInt(businessId), req.user.id, reason);

    res.json({
      success: true,
      message: 'Business suspended successfully',
      business,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Suspend business error:', error);
    res.status(500).json({ error: 'Failed to suspend business' });
  }
};

export const upgradeTier = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    await checkAdmin(req.user.id);

    const { businessId } = req.params;
    const { tier } = req.body;

    if (!['free', 'premium', 'platinum'].includes(tier)) {
      throw new AppError(400, 'Invalid tier');
    }

    const business = await adminService.upgradeTier(parseInt(businessId), tier, req.user.id);

    res.json({
      success: true,
      message: `Business tier upgraded to ${tier}`,
      business,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Upgrade tier error:', error);
    res.status(500).json({ error: 'Failed to upgrade tier' });
  }
};

export const getPlatformStats = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    await checkAdmin(req.user.id);

    const stats = await adminService.getPlatformStats();
    const tierDistribution = await adminService.getTierDistribution();

    res.json({
      success: true,
      stats,
      tierDistribution,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Get platform stats error:', error);
    res.status(500).json({ error: 'Failed to fetch platform statistics' });
  }
};

export const getBusinessAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    await checkAdmin(req.user.id);

    const { businessId } = req.params;
    const analytics = await adminService.getBusinessAnalytics(parseInt(businessId));

    res.json({
      success: true,
      analytics,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Get business analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch business analytics' });
  }
};

export const getAllBusinesses = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');
    await checkAdmin(req.user.id);

    const page = parseInt(req.query.page as string) || 1;
    const filters = {
      status: req.query.status as string,
      tier: req.query.tier as string,
      search: req.query.search as string,
    };

    const result = await adminService.getAllBusinessesForAdmin(page, 20, filters);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Get all businesses error:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
};
