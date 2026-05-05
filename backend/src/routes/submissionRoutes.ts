import express, { Router, Request, Response } from 'express';
import * as submissionController from '../controllers/submissionController';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

/**
 * Public Routes - Any user can submit a business
 */

// POST /api/submissions - Submit new business
router.post('/', async (req: Request, res: Response) => {
  try {
    await submissionController.submitBusiness(req as AuthRequest, res);
  } catch (error) {
    console.error('Error in submitBusiness route:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

/**
 * Admin Routes - Only admins can review/approve/reject
 */

// GET /api/submissions - Admin view all pending submissions
router.get('/', authMiddleware, isAdmin, async (req: Request, res: Response) => {
  try {
    await submissionController.getPendingSubmissions(req, res);
  } catch (error) {
    console.error('Error in getPendingSubmissions route:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/submissions/stats - Admin view submission statistics
router.get('/stats/overview', authMiddleware, isAdmin, async (req: Request, res: Response) => {
  try {
    await submissionController.getSubmissionStats(req, res);
  } catch (error) {
    console.error('Error in getSubmissionStats route:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/submissions/:id - Admin view single submission details
router.get('/:id', authMiddleware, isAdmin, async (req: Request, res: Response) => {
  try {
    await submissionController.getSubmissionById(req, res);
  } catch (error) {
    console.error('Error in getSubmissionById route:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PATCH /api/submissions/:id/approve - Admin approve submission
router.patch('/:id/approve', authMiddleware, isAdmin, async (req: Request, res: Response) => {
  try {
    const adminRequest = req as AuthRequest;
    if (!adminRequest.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    req.body.adminId = adminRequest.user.id;
    await submissionController.approveSubmission(req, res);
  } catch (error) {
    console.error('Error in approveSubmission route:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// PATCH /api/submissions/:id/reject - Admin reject submission
router.patch('/:id/reject', authMiddleware, isAdmin, async (req: Request, res: Response) => {
  try {
    await submissionController.rejectSubmission(req, res);
  } catch (error) {
    console.error('Error in rejectSubmission route:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
