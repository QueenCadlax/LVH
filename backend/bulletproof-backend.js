/**
 * BULLETPROOF WORKING BACKEND - HTTP + MOCK LOGIN
 * - Pure HTTP (no HTTPS)
 * - Mock login (no database)
 * - 127.0.0.1:5000
 */

const http = require('http');
const url = require('url');

const PORT = 5000;

// ===== GENERATE SIMPLE JWT TOKEN =====
function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64').replace(/=/g, '');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '');
  const signature = Buffer.from('secret-key').toString('base64').replace(/=/g, '');
  return `${header}.${body}.${signature}`;
}

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  // Handle health
  if (pathname === '/health' && req.method === 'GET') {
    const response = { status: 'ok', timestamp: new Date().toISOString() };
    res.writeHead(200);
    res.end(JSON.stringify(response));
    return;
  }

  // ===== HANDLE /admin/login (MOCK) =====
  if (pathname === '/admin/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { email, password } = data;

        // Mock credentials
        if (email === 'admin@lowveld.co.za' && password === 'lowveld2026') {
          const token = generateToken({
            id: 1,
            email: 'admin@lowveld.co.za',
            role: 'admin'
          });
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token,
            user: {
              id: 1,
              email: 'admin@lowveld.co.za',
              role: 'admin',
              firstName: 'Admin',
              lastName: 'User'
            }
          }));
          return;
        }

        // Test user
        if (email === 'test@lowveld.co.za' && password === 'test2026') {
          const token = generateToken({
            id: 2,
            email: 'test@lowveld.co.za',
            role: 'user'
          });
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token,
            user: {
              id: 2,
              email: 'test@lowveld.co.za',
              role: 'user',
              firstName: 'Test',
              lastName: 'User'
            }
          }));
          return;
        }

        res.writeHead(401);
        res.end(JSON.stringify({ success: false, error: 'Invalid credentials' }));
      } catch (error) {
        console.error('Login error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: 'Server error' }));
      }
    });
    return;
  }

  // ===== HANDLE /api/auth/login (LEGACY - SAME AS /admin/login) =====
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { email, password } = data;

        // Mock credentials
        if (email === 'admin@lowveld.co.za' && password === 'lowveld2026') {
          const token = generateToken({
            id: 1,
            email: 'admin@lowveld.co.za',
            role: 'admin'
          });
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token,
            user: {
              id: 1,
              email: 'admin@lowveld.co.za',
              role: 'admin',
              firstName: 'Admin',
              lastName: 'User'
            }
          }));
          return;
        }

        // Test user
        if (email === 'test@lowveld.co.za' && password === 'test2026') {
          const token = generateToken({
            id: 2,
            email: 'test@lowveld.co.za',
            role: 'user'
          });
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token,
            user: {
              id: 2,
              email: 'test@lowveld.co.za',
              role: 'user',
              firstName: 'Test',
              lastName: 'User'
            }
          }));
          return;
        }

        res.writeHead(401);
        res.end(JSON.stringify({ success: false, error: 'Invalid credentials' }));
      } catch (error) {
        console.error('Login error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: 'Server error' }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.on('error', (err) => {
  console.error('[SERVER ERROR]', err);
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('🚀 BULLETPROOF BACKEND RUNNING');
  console.log(`📍 Server running on http://127.0.0.1:${PORT}`);
  console.log(`✅ Login endpoint: POST http://127.0.0.1:${PORT}/admin/login`);
  console.log(`✅ Health check: GET http://127.0.0.1:${PORT}/health`);
  console.log('');
});

process.stdin.resume();
