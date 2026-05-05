import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as businessController from '../controllers/businessController';

const router = Router();

// Public routes
router.get('/', businessController.getBusinesses);
router.get('/:id', businessController.getBusinessById);

// Protected routes
router.post('/', authMiddleware, businessController.createBusiness);
router.put('/:id', authMiddleware, businessController.updateBusiness);
router.delete('/:id', authMiddleware, businessController.deleteBusiness);
router.get('/owner/my-businesses', authMiddleware, businessController.getMyBusinesses);

export default router;
