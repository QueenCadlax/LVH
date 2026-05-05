import express, { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  getUserActivity,
  getBusinessActivity,
  getGlobalActivity,
  clearOldActivity
} from '../controllers/activityController';

const router = Router();

// User routes
router.get('/my-activity', authMiddleware, getUserActivity);

// Admin routes
router.get('/business/:businessId', authMiddleware, getBusinessActivity);
router.get('/global', authMiddleware, getGlobalActivity);
router.delete('/cleanup', authMiddleware, clearOldActivity);

export default router;
