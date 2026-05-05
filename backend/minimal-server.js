#!/usr/bin/env node
/**
 * MINIMAL TEST SERVER - Just Express, no routes
 * Tests if the issue is the server startup or the routes
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

console.log('Starting minimal test server...');

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(null, process.env.NODE_ENV !== 'production');
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Minimal server is running', version: '3.0.0' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

try {
  console.log(`Attempting to listen on port ${PORT}...`);
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✅ MINIMAL TEST SERVER RUNNING`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🔗 Health: http://localhost:${PORT}/health`);
    console.log(`🧪 Test: http://localhost:${PORT}/api/test\n`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use!`);
      process.exit(1);
    } else {
      console.error('Server error:', error);
    }
  });

  // Keep process alive
  process.stdin.resume();
} catch (err) {
  console.error('Failed to start server:', err);
  process.exit(1);
}
