#!/usr/bin/env node
/**
 * ULTRA-SIMPLE BACKEND - NO DEPENDENCIES
 * Pure Node.js HTTP server on 127.0.0.1:5000
 */

const http = require('http');
const url = require('url');

// ===== JWT TOKEN GENERATOR =====
function makeToken(id, email, role) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64').replace(/[=]/g, '');
  const payload = Buffer.from(JSON.stringify({ id, email, role, iat: Date.now() })).toString('base64').replace(/[=]/g, '');
  const signature = 'fake-signature';
  return `${header}.${payload}.${signature}`;
}

// ===== HTTP SERVER =====
const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  // HEALTH
  if (pathname === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    return;
  }

  // ADMIN LOGIN
  if ((pathname === '/admin/login' || pathname === '/api/auth/login') && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString('utf8');
    });

    req.on('end', () => {
      try {
        const creds = JSON.parse(body);
        const { email, password } = creds;

        // ADMIN
        if (email === 'admin@lowveld.co.za' && password === 'lowveld2026') {
          const tok = makeToken(1, email, 'admin');
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token: tok,
            user: { id: 1, email, role: 'admin', firstName: 'Admin', lastName: 'User' }
          }));
          return;
        }

        // TEST USER
        if (email === 'test@lowveld.co.za' && password === 'test2026') {
          const tok = makeToken(2, email, 'user');
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token: tok,
            user: { id: 2, email, role: 'user', firstName: 'Test', lastName: 'User' }
          }));
          return;
        }

        res.writeHead(401);
        res.end(JSON.stringify({ success: false, error: 'Invalid credentials' }));
      } catch (e) {
        console.error('Error:', e.message);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    });

    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

// START
const PORT = 5000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log('');
  console.log('🚀 BACKEND RUNNING');
  console.log(`📍 http://${HOST}:${PORT}`);
  console.log(`✅ Login: POST http://${HOST}:${PORT}/admin/login`);
  console.log(`   Email: admin@lowveld.co.za`);
  console.log(`   Password: lowveld2026`);
  console.log('');
});

server.on('error', (err) => {
  console.error('ERROR:', err);
  process.exit(1);
});
