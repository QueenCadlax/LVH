import { Request, Response } from 'express';
import pool from '../config/database';

// Log user activity (internal use)
export const logActivity = async (
  userId: number,
  action: string,
  description?: string,
  relatedBusinessId?: number,
  metadata?: any
) => {
  try {
    await pool.query(`
      INSERT INTO recent_activity ("userId", action, description, "relatedBusinessId", metadata)
      VALUES ($1, $2, $3, $4, $5)
    `, [
      userId,
      action,
      description || '',
      relatedBusinessId || null,
      metadata ? JSON.stringify(metadata) : '{}'
    ]);
    
    return { success: true };
  } catch (error: any) {
    console.error('Log activity error:', error);
    return { success: false, error: error.message };
  }
};

// Get user's recent activity
export const getUserActivity = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { limit = 10 } = req.query;

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
        action,
        description,
        "relatedBusinessId",
        metadata,
        "createdAt"
      FROM recent_activity
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC
      LIMIT $2
    `, [userId, parseInt(limit as string) || 10]);

    res.json({
      success: true,
      data: result.rows,
      message: 'Recent activity retrieved successfully'
    });
  } catch (error: any) {
    console.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve activity'
    });
  }
};

// Get activity by business (admin view)
export const getBusinessActivity = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    const { limit = 20 } = req.query;

    const result = await pool.query(`
      SELECT 
        id,
        "userId",
        action,
        description,
        "relatedBusinessId",
        metadata,
        "createdAt"
      FROM recent_activity
      WHERE "relatedBusinessId" = $1
      ORDER BY "createdAt" DESC
      LIMIT $2
    `, [businessId, parseInt(limit as string) || 20]);

    res.json({
      success: true,
      data: result.rows,
      message: 'Business activity retrieved successfully'
    });
  } catch (error: any) {
    console.error('Get business activity error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve business activity'
    });
  }
};

// Get global activity (admin only)
export const getGlobalActivity = async (req: Request, res: Response) => {
  try {
    const { action, limit = 50 } = req.query;

    let query = `
      SELECT 
        id,
        "userId",
        action,
        description,
        "relatedBusinessId",
        "createdAt"
      FROM recent_activity
    `;

    const params: any[] = [];

    if (action) {
      query += ' WHERE action = $1';
      params.push(action);
      query += ` ORDER BY "createdAt" DESC LIMIT $${params.length + 1}`;
      params.push(parseInt(limit as string) || 50);
    } else {
      query += ` ORDER BY "createdAt" DESC LIMIT $1`;
      params.push(parseInt(limit as string) || 50);
    }

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows,
      message: 'Global activity retrieved successfully'
    });
  } catch (error: any) {
    console.error('Get global activity error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve activity'
    });
  }
};

// Clear old activity logs (admin maintenance)
export const clearOldActivity = async (req: Request, res: Response) => {
  try {
    const { daysOld = 90 } = req.body;

    const result = await pool.query(`
      DELETE FROM recent_activity
      WHERE "createdAt" < NOW() - INTERVAL '1 day' * $1
      RETURNING id
    `, [daysOld]);

    res.json({
      success: true,
      data: {
        deletedCount: result.rows.length
      },
      message: `${result.rows.length} old activity records deleted`
    });
  } catch (error: any) {
    console.error('Clear activity error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to clear activity logs'
    });
  }
};

// Activity middleware to log key actions
export const activityMiddleware = (action: string, extractBusinessId?: (req: Request) => number) => {
  return async (req: Request, res: Response, next: Function) => {
    const userId = (req as any).user?.id;
    
    if (userId) {
      const businessId = extractBusinessId ? extractBusinessId(req) : undefined;
      
      // Log activity asynchronously (don't block response)
      logActivity(
        userId,
        action,
        `${req.method} ${req.path}`,
        businessId,
        {
          ip: req.ip,
          userAgent: req.get('user-agent')
        }
      ).catch(err => console.error('Activity logging error:', err));
    }
    
    next();
  };
};

// Activity actions enum (for consistency)
export const ActivityActions = {
  VIEWED_LISTING: 'viewed_listing',
  SAVED_ITEM: 'saved_item',
  REMOVED_ITEM: 'removed_item',
  SUBMITTED_REVIEW: 'submitted_review',
  SENT_MESSAGE: 'sent_message',
  MADE_ENQUIRY: 'made_enquiry',
  VIEWED_PROFILE: 'viewed_profile',
  REFERRED_USER: 'referred_user',
  COMPLETED_REFERRAL: 'completed_referral',
  UPGRADED_TIER: 'upgraded_tier',
  UPDATED_PROFILE: 'updated_profile'
};
