import express, { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';
import {
  listAgents,
  getAgent,
  updateAgentTarget,
  updateAgentProgress,
  getAgentProgress,
  addAchievement
} from '../controllers/agentController';

const router = Router();


// Admin routes (admin only)
router.get('/list', authMiddleware, isAdmin, listAgents);
router.patch('/:id/target', authMiddleware, isAdmin, updateAgentTarget);

// Agent/user route
router.get('/:id/progress', authMiddleware, getAgentProgress);

export default router;
