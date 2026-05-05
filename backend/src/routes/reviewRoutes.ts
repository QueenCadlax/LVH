import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as reviewController from '../controllers/reviewController';

const router = Router();

// Public routes
router.get('/business/:businessId', reviewController.getReviews);

// Protected routes
router.post('/business/:businessId', authMiddleware, reviewController.createReview);
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);
router.put('/:reviewId/helpful', authMiddleware, reviewController.markHelpful);

export default router;
