import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import * as businessService from '../services/businessService';
import { validateEmail, validatePhone } from '../utils/validators';

export const createBusiness = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { name, description, category, area, email, phone, location, website } = req.body;

    // Validation
    if (!name || !description || !category || !area || !email || !phone) {
      throw new AppError(400, 'Missing required fields');
    }

    if (!validateEmail(email)) {
      throw new AppError(400, 'Invalid email format');
    }

    if (!validatePhone(phone)) {
      throw new AppError(400, 'Invalid phone format');
    }

    const business = await businessService.createBusiness(req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: 'Business created successfully',
      business,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Create business error:', error);
    res.status(500).json({ error: 'Failed to create business' });
  }
};

export const getBusinesses = async (req: AuthRequest, res: Response) => {
  try {
    const sortValue = req.query.sort as string || 'rating';
    const orderValue = req.query.order as string || 'desc';
    
    const validSort = ['rating', 'newest', 'popular'].includes(sortValue) ? (sortValue as any) : 'rating';
    const validOrder = ['asc', 'desc'].includes(orderValue) ? (orderValue as any) : 'desc';
    
    const filters = {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
      category: req.query.category as string,
      area: req.query.area as string,
      tier: req.query.tier as string,
      search: req.query.search as string,
      rating: req.query.rating ? parseInt(req.query.rating as string) : undefined,
      sort: validSort,
      order: validOrder,
    };

    const result = await businessService.getBusinesses(filters);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Get businesses error:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
};

export const getBusinessById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const business = await businessService.getBusinessById(parseInt(id));
    if (!business) {
      throw new AppError(404, 'Business not found');
    }

    // Increment view count
    await businessService.incrementBusinessViews(parseInt(id));

    res.json({
      success: true,
      business,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Get business error:', error);
    res.status(500).json({ error: 'Failed to fetch business' });
  }
};

export const updateBusiness = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { id } = req.params;

    const business = await businessService.updateBusiness(parseInt(id), req.user.id, req.body);

    res.json({
      success: true,
      message: 'Business updated successfully',
      business,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    if (error instanceof Error && error.message.includes('unauthorized')) {
      return res.status(403).json({ error: 'Forbidden - You can only update your own business' });
    }
    console.error('Update business error:', error);
    res.status(500).json({ error: 'Failed to update business' });
  }
};

export const deleteBusiness = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { id } = req.params;

    const deleted = await businessService.deleteBusiness(parseInt(id), req.user.id);
    if (!deleted) {
      throw new AppError(403, 'Forbidden - You can only delete your own business');
    }

    res.json({
      success: true,
      message: 'Business deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Delete business error:', error);
    res.status(500).json({ error: 'Failed to delete business' });
  }
};

export const getMyBusinesses = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await businessService.getBusinessesByOwner(req.user.id, page, limit);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Get my businesses error:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
};
