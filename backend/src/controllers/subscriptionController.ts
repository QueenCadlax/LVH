import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import * as subscriptionService from '../services/subscriptionService';
import * as adminService from '../services/adminService';

export const getSubscription = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');

    const { businessId } = req.params;

    const subscription = await subscriptionService.getSubscription(parseInt(businessId));

    res.json({
      success: true,
      subscription: subscription || null,
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
};

export const getSubscriptions = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');

    const isAdmin = await adminService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new AppError(403, 'Admin access required');
    }

    const page = parseInt(req.query.page as string) || 1;
    const result = await subscriptionService.getActiveSubscriptions(page);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Get subscriptions error:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

export const getSubscriptionStats = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');

    const isAdmin = await adminService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new AppError(403, 'Admin access required');
    }

    const stats = await subscriptionService.getSubscriptionStats();

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Get subscription stats error:', error);
    res.status(500).json({ error: 'Failed to fetch subscription stats' });
  }
};

export const cancelSubscription = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new AppError(401, 'Unauthorized');

    const { businessId } = req.params;

    const subscription = await subscriptionService.cancelSubscription(parseInt(businessId));

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
};
