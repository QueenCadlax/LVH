# Phase 3 Database Migration & Server Setup Guide

## Prerequisites
- PostgreSQL 12+ running locally
- Node.js 18+ installed
- npm or yarn

## Step 1: Create the LowveldHub Database

```powershell
# Open PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE lowveldhub;

# You should see:
# CREATE DATABASE

# Exit psql
\q
```

## Step 2: Create Initial Schema (Phase 1)

If not already created, run the Phase 1 schema. First, check if tables exist:

```powershell
psql -U postgres -d lowveldhub -c "\dt"
```

If no tables, create Phase 1 schema (users, businesses, reviews, etc.). This should be in `src/migrations/001-init-schema.sql` - run it first.

## Step 3: Setup Backend Environment

```powershell
cd backend

# Copy example env file
Copy-Item .env.example .env

# Edit .env with your database credentials:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=lowveldhub
# DB_USER=postgres
# DB_PASSWORD=<your_postgres_password>
# JWT_SECRET=your-secret-key-here
```

## Step 4: Install Backend Dependencies

```powershell
npm install
```

This will install all backend packages including:
- express, cors, helmet (server)
- pg (PostgreSQL)
- jsonwebtoken, bcryptjs (auth)
- express-rate-limit (security)
- typescript, ts-node (dev)

## Step 5: Run Phase 3 Database Migration

```powershell
npm run migrate
```

This will:
- Create `admins` table for admin users
- Create `admin_logs` table for audit trail
- Create `subscriptions` table for tier management
- Create `payments` table (placeholder for Stripe)
- Add `status` and `tier` columns to `businesses`
- Create 15+ performance indices

**Expected Output:**
```
🔄 Running database migrations...

✅ Migration 1/18 completed
✅ Migration 2/18 completed
...
✅ All database migrations completed successfully!
📊 Phase 3 tables created:
  - admins
  - admin_logs
  - subscriptions
  - payments
```

## Step 6: Create Admin User

Start the backend server first:

```powershell
npm run dev
```

In another terminal, create admin account:

```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    "email": "admin@lowveldhub.co.za",
    "password": "Admin@123456",
    "fullName": "System Administrator"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "admin@lowveldhub.co.za",
    "fullName": "System Administrator"
  }
}
```

## Step 7: Assign Admin Role in Database

```powershell
psql -U postgres -d lowveldhub

# Assign admin role to the user (adjust user ID if needed)
INSERT INTO admins ("userId", role) VALUES (1, 'super_admin');

# Verify
SELECT * FROM admins;
# Should show: id=1, userId=1, role='super_admin'

\q
```

## Step 8: Verify Server is Running

Check the health endpoint:

```powershell
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-26T14:30:45.123Z"
}
```

## Server Startup Output

When you run `npm run dev`, you should see:

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║           🚀 LowveldHub Backend Server Started            ║
║                                                           ║
║  Environment: development                                 ║
║  Port: 5000                                               ║
║  API URL: http://localhost:5000                           ║
║  Frontend: http://localhost:3000                          ║
║                                                           ║
║  ✅ All routes mounted and ready                          ║
║  ✅ Database connected                                   ║
║  ✅ Security middleware active                           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

## Next Steps

### 1. Test Admin Endpoints

```powershell
# Get pending approvals (as admin)
$TOKEN="<your_admin_token>"

curl http://localhost:5000/api/admin/approvals/pending `
  -H "Authorization: Bearer $TOKEN"

# Should return empty array initially
```

### 2. Test Approval Workflow

Create a business, then approve it:

```powershell
# 1. Create a business (as regular user)
curl -X POST http://localhost:5000/api/businesses `
  -H "Authorization: Bearer $USER_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Test Business",
    "description": "A test business",
    "category": "Eats",
    "area": "Nelspruit",
    "email": "test@business.com",
    "phone": "0123456789",
    "website": "example.com"
  }'

# 2. Note the business ID from response

# 3. Approve it (as admin)
curl -X POST http://localhost:5000/api/admin/businesses/1/approve `
  -H "Authorization: Bearer $ADMIN_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "tier": "premium",
    "notes": "Verified and approved"
  }'

# 4. Verify it appears in public list
curl http://localhost:5000/api/businesses
```

### 3. Check Platform Statistics

```powershell
curl http://localhost:5000/api/admin/stats/platform `
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Returns: total businesses, users, reviews, tier distribution, etc.
```

## Troubleshooting

### Database Connection Error
```
Error: getaddrinfo ENOTFOUND localhost
```
**Solution:** PostgreSQL not running. Start it:
```powershell
# Windows
# Open Services, start PostgreSQL
# Or run: pg_ctl -D "C:\Program Files\PostgreSQL\14\data" start
```

### Port 5000 Already in Use
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it (adjust PID)
taskkill /PID <PID> /F
```

### JWT Secret Not Set
**Solution:** Add to .env:
```
JWT_SECRET=your-super-secret-key-change-this
```

### Admin User Can't Be Created
**Solution:** Make sure Phase 1 schema was run first. Check users table:
```powershell
psql -U postgres -d lowveldhub -c "SELECT * FROM users LIMIT 1;"
```

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts              ✅ Environment loader
│   │   └── database.ts         ✅ PostgreSQL pool
│   ├── middleware/
│   │   ├── authMiddleware.ts   ✅ JWT verification
│   │   ├── errorHandler.ts     ✅ Error handling
│   │   └── rateLimiter.ts      ✅ Rate limiting
│   ├── utils/
│   │   ├── jwt.ts              ✅ Token utilities
│   │   ├── password.ts         ✅ Password hashing
│   │   └── validators.ts       ✅ Input validation
│   ├── controllers/
│   │   ├── authController.ts   ✅ Auth endpoints
│   │   ├── businessController.ts
│   │   ├── reviewController.ts
│   │   ├── adminController.ts  ✅ Admin endpoints (Phase 3)
│   │   └── ...
│   ├── routes/
│   │   ├── authRoutes.ts       ✅
│   │   ├── businessRoutes.ts   ✅
│   │   ├── adminRoutes.ts      ✅ (Phase 3)
│   │   └── ...
│   ├── migrations/
│   │   ├── 001-init-schema.sql (Phase 1)
│   │   ├── 002-phase3-admin-subscriptions.sql ✅ (Phase 3)
│   │   └── runMigrations.ts    ✅ Node migration runner
│   └── server.ts               ✅ Main server file
├── package.json                ✅ Dependencies
├── tsconfig.json               ✅ TypeScript config
├── .env.example                ✅ Environment template
└── .env                        (Create from .env.example)
```

## Debugging

Enable detailed logging:

```powershell
# In .env, set
NODE_ENV=development

# Then run server
npm run dev

# You'll see detailed request logs like:
# [2026-01-26T14:30:45.123Z] GET /api/admin/approvals/pending - 200 (125ms)
```

## Next Phase

After Phase 3 backend is confirmed working:
1. Build frontend admin dashboard UI
2. Connect frontend to admin endpoints
3. Test end-to-end approval workflow
4. Move to Phase 4 (Stripe payment integration)
