import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();
const pool = new Pool();

// Subscribe to newsletter
router.post('/subscribe', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required', status: 400 });
    }

    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        verified BOOLEAN DEFAULT FALSE,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        verified_at TIMESTAMP
      )
    `);

    // Insert or update subscriber
    const result = await pool.query(
      'INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO UPDATE SET subscribed_at = CURRENT_TIMESTAMP RETURNING *',
      [email.toLowerCase()]
    );

    res.json({ 
      success: true, 
      data: result.rows[0],
      message: 'Subscribed to newsletter' 
    });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    res.status(500).json({ error: 'Subscription failed', status: 500 });
  }
});

// Get all subscribers (admin only)
router.get('/subscribers', authMiddleware, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, email, verified, subscribed_at, verified_at FROM newsletter_subscribers ORDER BY subscribed_at DESC'
    );
    
    res.json({ 
      success: true, 
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ error: 'Failed to retrieve subscribers', status: 500 });
  }
});

// Mark as verified (email verification)
router.post('/verify/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    
    const result = await pool.query(
      'UPDATE newsletter_subscribers SET verified = TRUE, verified_at = CURRENT_TIMESTAMP WHERE email = $1 RETURNING *',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subscriber not found', status: 404 });
    }

    res.json({ 
      success: true, 
      data: result.rows[0],
      message: 'Email verified' 
    });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({ error: 'Verification failed', status: 500 });
  }
});

// Unsubscribe
router.post('/unsubscribe/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    
    const result = await pool.query(
      'DELETE FROM newsletter_subscribers WHERE email = $1 RETURNING email',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subscriber not found', status: 404 });
    }

    res.json({ 
      success: true, 
      message: 'Unsubscribed from newsletter' 
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Unsubscribe failed', status: 500 });
  }
});

// Send newsletter (admin only - mock)
router.post('/send', authMiddleware, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { subject, content } = req.body;
    
    if (!subject || !content) {
      return res.status(400).json({ error: 'Subject and content required', status: 400 });
    }

    // Get all verified subscribers
    const subscribers = await pool.query(
      'SELECT email FROM newsletter_subscribers WHERE verified = TRUE'
    );

    // Mock: Log instead of actually sending
    console.log(`Newsletter: "${subject}" to ${subscribers.rows.length} subscribers`);
    
    res.json({ 
      success: true, 
      message: `Newsletter sent to ${subscribers.rows.length} subscribers`,
      count: subscribers.rows.length
    });
  } catch (error) {
    console.error('Send newsletter error:', error);
    res.status(500).json({ error: 'Failed to send newsletter', status: 500 });
  }
});

export default router;
