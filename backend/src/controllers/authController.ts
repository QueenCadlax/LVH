import bcrypt from 'bcrypt';

// TEMPORARY: Reset admin password endpoint for dev recovery
import pool from '../config/database';
import { Router } from 'express';
const adminResetRouter = Router();

adminResetRouter.post('/reset-admin', async (req, res) => {
  const hashed = await bcrypt.hash('admin123', 10);
  await pool.query(
    `UPDATE users SET password = $1 WHERE email = 'admin@lowveldhub.co.za'`,
    [hashed]
  );
  res.json({ success: true });
});

export { adminResetRouter };
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import { query } from '../config/database';
import { hashPassword, comparePasswords, validatePasswordStrength } from '../utils/password';
import { validateEmail, validateRequiredFields } from '../utils/validators';
import { signToken } from '../utils/jwt';

export const registerUser = async (req: any, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validation
    const { valid, missing } = validateRequiredFields(req.body, ['email', 'password', 'firstName']);
    if (!valid) {
      throw new AppError(400, `Missing required fields: ${missing.join(', ')}`);
    }

    if (!validateEmail(email)) {
      throw new AppError(400, 'Invalid email format');
    }

    const passwordStrength = validatePasswordStrength(password);
    if (!passwordStrength.valid) {
      throw new AppError(400, `Password too weak: ${passwordStrength.errors[0]}`);
    }

    // Check if user exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existingUser.rows.length > 0) {
      throw new AppError(409, 'Email already registered');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await query(
      `INSERT INTO users (email, password, "firstName", "lastName") 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, "firstName", "lastName"`,
      [email.toLowerCase(), hashedPassword, firstName, lastName || '']
    );

    const user = result.rows[0];
    const token = signToken({ id: user.id, email: user.email });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
};

export const loginUser = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;

    const { valid, missing } = validateRequiredFields(req.body, ['email', 'password']);
    if (!valid) {
      throw new AppError(400, `Missing required fields: ${missing.join(', ')}`);
    }

    // ===== MOCK LOGIN: Works without database for testing =====
    // Admin account (works without database)
    if (email === 'admin@lowveld.co.za' && password === 'lowveld2026') {
      const token = signToken({ id: 1, email: 'admin@lowveld.co.za' });
      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { 
          id: 1, 
          email: 'admin@lowveld.co.za', 
          firstName: 'Admin', 
          lastName: 'User',
          role: 'admin'
        }
      });
    }

    // Test user account (works without database)
    if (email === 'test@lowveld.co.za' && password === 'test2026') {
      const token = signToken({ id: 2, email: 'test@lowveld.co.za' });
      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { 
          id: 2, 
          email: 'test@lowveld.co.za', 
          firstName: 'Test', 
          lastName: 'User',
          role: 'user'
        }
      });
    }

    // Try database if available
    try {
      const result = await query('SELECT id, email, password, "firstName", "lastName" FROM users WHERE email = $1', [email.toLowerCase()]);
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = result.rows[0];

      // Compare password (guard against unexpected errors)
      let isValidPassword = false;
      try {
        isValidPassword = await comparePasswords(password, user.password);
      } catch (cmpErr) {
        console.error('Password comparison error:', cmpErr);
        return res.status(500).json({ error: 'Failed to verify credentials' });
      }

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Ensure JWT secret present
      if (!process.env.JWT_SECRET) {
        console.error('Missing JWT_SECRET environment variable');
        return res.status(500).json({ error: 'Authentication server misconfigured' });
      }

      // Create token
      const token = signToken({ id: user.id, email: user.email });

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
      });
    } catch (dbError) {
      // Database unavailable, use mock
      console.warn('Database unavailable, using mock credentials');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    } else {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Failed to login' });
    }
  }
};

export const logoutUser = async (req: AuthRequest, res: Response) => {
  // JWT is stateless, so logout is just client-side token removal
  // But we can implement token blacklisting in future if needed
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

export const verifyToken = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'No user in request');
    }

    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to verify token' });
    }
  }
};
