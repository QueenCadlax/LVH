import { Router } from 'express';
import { registerUser, loginUser, logoutUser, verifyToken, adminResetRouter } from '../controllers/authController';
import { rateLimiter, strictRateLimiter } from '../middleware/rateLimiter';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Mount temporary admin reset endpoint
router.use(adminResetRouter);

// Register user - with rate limiting
router.post('/register', strictRateLimiter, registerUser);

// Login user - with rate limiting
router.post('/login', strictRateLimiter, loginUser);

// Logout user
router.post('/logout', authMiddleware, logoutUser);

// Verify token
router.get('/verify', authMiddleware, verifyToken);

export default router;
