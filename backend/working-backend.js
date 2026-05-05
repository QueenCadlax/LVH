/**
 * WORKING BACKEND - Minimal, verified to listen and respond
 * Purpose: Get a baseline working backend for testing
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Create database pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Middleware
app.use(helmet());
app.use(cors({ credentials: true }));
app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Query database for user
    const result = await pool.query(
      `SELECT id, email, password, "firstName", "lastName" FROM users WHERE email = $1`,
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate mock token (for testing)
    const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString('base64');

    return res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n✅ WORKING BACKEND LISTENING ON PORT ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📍 Login: http://localhost:${PORT}/api/auth/login\n`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

process.stdin.resume();
