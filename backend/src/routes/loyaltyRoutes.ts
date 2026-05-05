import express, { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  getUserLoyalty,
  submitReferral,
  getUserReferrals,
  confirmReferral
} from '../controllers/loyaltyController';

const router = Router();

// User routes
router.get('/loyalty', authMiddleware, getUserLoyalty);
router.post('/referral', authMiddleware, submitReferral);
router.get('/referrals', authMiddleware, getUserReferrals);

// Admin routes
router.patch('/referral/:referralId/confirm', authMiddleware, confirmReferral);

export default router;
