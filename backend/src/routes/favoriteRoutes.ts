import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as favoriteController from '../controllers/favoriteController';

const router = Router();

// Public routes
router.get('/business/:businessId/check', favoriteController.checkFavorite);

// Protected routes
router.post('/business/:businessId', authMiddleware, favoriteController.addFavorite);
router.delete('/business/:businessId', authMiddleware, favoriteController.removeFavorite);
router.get('/', authMiddleware, favoriteController.getFavorites);

export default router;
