import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import * as reviewService from '../services/reviewService';
import * as businessService from '../services/businessService';

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { businessId } = req.params;
    const { rating, title, comment } = req.body;

    // Validate
    if (!rating || !title || !comment) {
      throw new AppError(400, 'Missing required fields');
    }

    if (rating < 1 || rating > 5) {
      throw new AppError(400, 'Rating must be between 1 and 5');
    }

    const review = await reviewService.createReview(parseInt(businessId), req.user.id, req.body);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const getReviews = async (req: AuthRequest, res: Response) => {
  try {
    const { businessId } = req.params;
    const page = parseInt(req.query.page as string) || 1;

    const result = await reviewService.getReviewsByBusiness(parseInt(businessId), page);

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { reviewId } = req.params;

    const deleted = await reviewService.deleteReview(parseInt(reviewId), req.user.id);
    if (!deleted) {
      throw new AppError(403, 'Forbidden - You can only delete your own reviews');
    }

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

export const markHelpful = async (req: AuthRequest, res: Response) => {
  try {
    const { reviewId } = req.params;

    await reviewService.markHelpful(parseInt(reviewId));

    res.json({
      success: true,
      message: 'Review marked as helpful',
    });
  } catch (error) {
    console.error('Mark helpful error:', error);
    res.status(500).json({ error: 'Failed to mark review' });
  }
};
