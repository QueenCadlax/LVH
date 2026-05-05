import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import * as favoriteService from '../services/favoriteService';

export const addFavorite = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { businessId } = req.params;

    const favorite = await favoriteService.addFavorite(req.user.id, parseInt(businessId));

    res.status(201).json({
      success: true,
      message: 'Added to favorites',
      favorite,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { businessId } = req.params;

    const removed = await favoriteService.removeFavorite(req.user.id, parseInt(businessId));
    if (!removed) {
      throw new AppError(404, 'Favorite not found');
    }

    res.json({
      success: true,
      message: 'Removed from favorites',
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};

export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const page = parseInt(req.query.page as string) || 1;

    const result = await favoriteService.getFavorites(req.user.id, page);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

export const checkFavorite = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.json({ success: true, isFavorited: false });
    }

    const { businessId } = req.params;

    const isFavorited = await favoriteService.isFavorited(req.user.id, parseInt(businessId));

    res.json({
      success: true,
      isFavorited,
    });
  } catch (error) {
    console.error('Check favorite error:', error);
    res.status(500).json({ error: 'Failed to check favorite' });
  }
};
