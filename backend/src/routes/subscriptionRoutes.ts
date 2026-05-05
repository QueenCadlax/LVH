import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as subscriptionController from '../controllers/subscriptionController';

const router = Router();

// Get subscription (public/protected)
router.get('/business/:businessId', subscriptionController.getSubscription);

// Admin routes
router.get('/', authMiddleware, subscriptionController.getSubscriptions);
router.get('/stats/overview', authMiddleware, subscriptionController.getSubscriptionStats);
router.post('/:businessId/cancel', authMiddleware, subscriptionController.cancelSubscription);

export default router;
