# Dashboard System - Complete Setup & Integration Guide

**Version:** 1.0  
**Date:** January 27, 2026  
**Status:** Ready for Database Migration & Testing

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Database Setup](#database-setup)
3. [Backend Configuration](#backend-configuration)
4. [Frontend Integration](#frontend-integration)
5. [API Reference](#api-reference)
6. [Testing Procedures](#testing-procedures)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- PostgreSQL running on `localhost:5432`
- Node.js 16+ installed
- Backend running on port 5000
- Frontend running on port 3000/5173

### 5-Minute Setup

```bash
# 1. Run database migrations (from backend/ directory)
npm run migrate

# 2. Restart backend server
npm run dev

# 3. Backend will mount these new routes automatically:
# - GET/POST /api/user/* (User dashboard & loyalty)
# - GET/POST /api/messages/* (Messaging system)
# - GET/POST /api/activity/* (Activity tracking)
# - GET/POST /api/agent/* (Agent dashboard)
# - GET /api/business/* (Business dashboard)

# 4. Frontend components are ready to import:
# - pages/user/UserDashboard.tsx
# - pages/business/BusinessDashboard.tsx
# - pages/agent/AgentDashboard.tsx
# - components/MessagingUI.tsx
```

---

## Database Setup

### Migration File Location
`backend/src/migrations/02_create_dashboard_tables.sql`

### Tables Created (9 total)

#### 1. loyalty_points
Tracks all loyalty point transactions for users.

```sql
-- Core fields
id, user_id, points, transaction_type, source_action, description, created_at, expires_at
```

**Use Case:** User earns points for reviews, referrals, purchases. Admin can reward bonus points.

#### 2. referrals
Manages referral code generation and redemption.

```sql
-- Core fields
id, referrer_id, referral_code, generated_at, expires_at, redeemed, redeemed_by, redeemed_at, reward_points
```

**Use Case:** User generates referral code, shares with friends. When friend signs up with code, both get reward points.

#### 3. messages
Stores all messages between users and businesses.

```sql
-- Core fields
id, conversation_id, sender_id, receiver_id, content, message_type, file_url, read, created_at
```

**Use Case:** Users can message businesses. Businesses can reply. Messages grouped by conversation.

#### 4. conversations
Groups messages between two participants.

```sql
-- Core fields
id, participant1_id, participant2_id, last_message_id, is_archived, created_at, updated_at
```

**Use Case:** Prevents duplicate conversations, enables unread tracking per conversation.

#### 5. recent_activity
Logs all user actions for activity feed.

```sql
-- Core fields
id, user_id, activity_type, resource_type, resource_id, description, metadata, created_at
```

**Use Case:** Build activity timeline (created listing, favorited business, left review, etc.)

#### 6. business_activity
Logs all business-specific events.

```sql
-- Core fields
id, business_id, activity_type, user_id, description, metadata, created_at
```

**Use Case:** Business sees all interactions on their listing (new message, new review, etc.)

#### 7. agents
Stores agent profiles and metadata.

```sql
-- Core fields
id, user_id, agent_name, phone, email, team, status, commission_rate, hire_date, created_at
```

**Use Case:** Businesses can designate an agent who gets performance tracking.

#### 8. agent_performance
Monthly performance metrics for agents.

```sql
-- Core fields
id, agent_id, year, month, deals_closed, revenue_generated, leads_converted, commission_earned
```

**Use Case:** Track agent KPIs, leaderboard rankings, progress toward targets.

#### 9. ai_recommendations
Stores generated AI recommendations for caching/history.

```sql
-- Core fields
id, user_id, recommendation_type, content, quality_score, created_at
```

**Use Case:** Cache AI recommendations to reduce API calls, track recommendation quality.

### Views Created (2 total)

#### user_loyalty_view
Aggregates loyalty stats per user for dashboard display.

```sql
SELECT user_id, SUM(points) as total_points, COUNT(*) as transaction_count, MAX(created_at) as last_activity
FROM loyalty_points
GROUP BY user_id
```

#### referral_stats_view
Shows referral performance metrics per referrer.

```sql
SELECT referrer_id, COUNT(*) as total_referrals, SUM(reward_points) as total_rewards, COUNT(CASE WHEN redeemed THEN 1 END) as redeemed_count
FROM referrals
GROUP BY referrer_id
```

### How to Run Migration

**Option 1: Using npm script (recommended)**
```bash
cd backend
npm run migrate
```

**Option 2: Manual execution**
```bash
cd backend/src/migrations
psql -U postgres -h localhost -d lowveldhub -f 02_create_dashboard_tables.sql
```

**Option 3: Using pgAdmin**
1. Open pgAdmin
2. Connect to `lowveldhub` database
3. Open Query Tool
4. Copy contents of `02_create_dashboard_tables.sql`
5. Execute

### Verify Migration Success

```bash
# Connect to database
psql -U postgres -h localhost -d lowveldhub

# List all tables (should include new ones)
\dt

# Verify loyalty_points table structure
\d loyalty_points

# Check views
\dv

# Exit
\q
```

---

## Backend Configuration

### Server Setup (Already Complete)

**File:** `backend/src/server.ts`

**Routes Mounted:**
```typescript
// All mounted on base path with proper prefixes
import userDashboardRoutes from './routes/userDashboardRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

app.use('/api/user', userDashboardRoutes);  // /api/user/* endpoints
app.use('/api', dashboardRoutes);            // /api/* endpoints (business/agent)
```

### Environment Variables Required

**File:** `backend/.env`

```env
# Existing variables (keep as-is)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lowveldhub
DB_USER=postgres
DB_PASSWORD=<your_password>
JWT_SECRET=<your_secret>
PORT=5000

# Optional: Configuration for new systems
LOYALTY_POINTS_MULTIPLIER=1
REFERRAL_EXPIRY_DAYS=90
MESSAGING_TIMEOUT_MS=30000
```

### Service Layer Files

All service implementations are ready to use:

```typescript
// 1. loyaltyService.ts - Manage loyalty points
import { addPoints, redeemPoints, getUserLoyaltyStats } from './services/loyaltyService';

// 2. referralService.ts - Manage referrals
import { generateReferralCode, registerReferral, getReferralStats } from './services/referralService';

// 3. messagingService.ts - Manage messages
import { sendMessage, getConversationMessages, markAsRead } from './services/messagingService';

// 4. activityService.ts - Log activities
import { logUserActivity, logBusinessActivity, getUserActivity } from './services/activityService';

// 5. agentService.ts - Manage agents
import { createOrUpdateAgent, getAgentDashboard, recordDeal } from './services/agentService';
```

---

## Frontend Integration

### Component Files Created

All React components are production-ready and can be imported into App.tsx or routes:

#### 1. User Dashboard
**File:** `pages/user/UserDashboard.tsx`

```typescript
import UserDashboard from './pages/user/UserDashboard';

// Usage in App.tsx routing
case 'user-dashboard':
  return <UserDashboard />;
```

**Features:**
- User profile display
- Loyalty points visualization
- Referral code generation & tracking
- Message summary
- Recent activity feed

#### 2. Business Dashboard
**File:** `pages/business/BusinessDashboard.tsx`

```typescript
import BusinessDashboard from './pages/business/BusinessDashboard';

// Usage in App.tsx routing
case 'business-dashboard':
  return <BusinessDashboard businessId={selectedBusinessId} />;
```

**Features:**
- Business profile & verification status
- Message inbox with unread count
- Activity history
- Statistics sidebar

#### 3. Agent Dashboard
**File:** `pages/agent/AgentDashboard.tsx`

```typescript
import AgentDashboard from './pages/agent/AgentDashboard';

// Usage in App.tsx routing
case 'agent-dashboard':
  return <AgentDashboard />;
```

**Features:**
- Agent profile & monthly targets
- Progress bar toward goals
- 6-month performance history
- Leaderboard (revenue/deals metrics)
- Current month summary

#### 4. Messaging UI
**File:** `components/MessagingUI.tsx`

```typescript
import MessagingUI from './components/MessagingUI';

// Usage as modal/widget
<MessagingUI userId={userId} userName={userName} onClose={() => setShowMessaging(false)} />
```

**Features:**
- Conversation list with unread badges
- Real-time message history
- Archive conversations
- Delete messages
- Auto-refresh every 10 seconds

### Styling Files

All CSS files use premium gold/black theme:

- `pages/user/UserDashboard.css` - 420 lines
- `pages/business/BusinessDashboard.css` - 380 lines
- `pages/agent/AgentDashboard.css` - 300 lines
- `components/MessagingUI.css` - 380 lines

---

## API Reference

### 1. Loyalty Points Endpoints

#### GET /api/user/loyalty
Fetch user's loyalty stats.

```http
GET /api/user/loyalty
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": {
    "total_points": 1250,
    "available_points": 1200,
    "pending_points": 50,
    "point_value": "R 0.10 per point",
    "next_tier_points": 500,
    "transaction_count": 23,
    "recent_transactions": [...]
  }
}
```

#### POST /api/user/loyalty/redeem
Redeem points for reward.

```http
POST /api/user/loyalty/redeem
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "points": 500,
  "reward_type": "discount" | "points" | "feature_unlock"
}

Response:
{
  "success": true,
  "data": {
    "remaining_points": 750,
    "reward_issued": true,
    "reward_code": "LOYALTY-ABC123"
  }
}
```

### 2. Referral Endpoints

#### GET /api/user/referrals
Get user's referral stats.

```http
GET /api/user/referrals
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": {
    "active_referrals": 5,
    "completed_referrals": 12,
    "total_rewards": 2400,
    "referral_code": "REF-USER123",
    "referral_link": "https://lowveldhub.com?ref=REF-USER123"
  }
}
```

#### POST /api/user/referral/generate
Generate new referral code.

```http
POST /api/user/referral/generate
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": {
    "referral_code": "REF-NEW456",
    "expires_at": "2026-04-27T00:00:00Z",
    "reward_points": 200
  }
}
```

#### POST /api/user/referral/validate
Validate referral code when signing up.

```http
POST /api/user/referral/validate
Content-Type: application/json

{
  "referral_code": "REF-USER123"
}

Response:
{
  "success": true,
  "data": {
    "valid": true,
    "referrer_name": "John Doe",
    "reward_points": 200
  }
}
```

### 3. Messaging Endpoints

#### POST /api/messages
Send a message.

```http
POST /api/messages
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "receiver_id": "business-123",
  "content": "Hello, interested in your services",
  "message_type": "text"
}

Response:
{
  "success": true,
  "data": {
    "id": "msg-456",
    "conversation_id": "conv-789",
    "created_at": "2026-01-27T10:30:00Z"
  }
}
```

#### GET /api/messages/conversations
Get all conversations for user.

```http
GET /api/messages/conversations
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": [
    {
      "conversation_id": "conv-789",
      "participant_name": "Kuka Café",
      "unread_count": 2,
      "last_message": "Thanks for your interest!",
      "last_message_time": "2026-01-27T10:25:00Z"
    }
  ]
}
```

#### GET /api/messages/:conversationId
Get all messages in conversation.

```http
GET /api/messages/conv-789
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": [
    {
      "id": "msg-123",
      "sender_name": "You",
      "content": "Hello",
      "created_at": "2026-01-27T10:20:00Z",
      "read": true
    }
  ]
}
```

#### GET /api/messages/unread/count
Get unread message count.

```http
GET /api/messages/unread/count
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": {
    "unread_count": 3
  }
}
```

### 4. Activity Endpoints

#### GET /api/activity
Get user's activity feed.

```http
GET /api/activity?limit=20&offset=0
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": [
    {
      "id": "act-123",
      "activity_type": "review_created",
      "description": "You left a 5-star review for Kuka Café",
      "created_at": "2026-01-27T09:15:00Z",
      "resource_type": "review"
    }
  ]
}
```

#### GET /api/activity/summary
Get activity summary.

```http
GET /api/activity/summary
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": {
    "today_activities": 3,
    "week_activities": 12,
    "month_activities": 45,
    "total_activities": 128
  }
}
```

### 5. Agent Endpoints

#### GET /api/agent/dashboard
Get agent dashboard data.

```http
GET /api/agent/dashboard
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": {
    "agent": {
      "id": "agent-123",
      "agent_name": "John Smith",
      "team": "Real Estate"
    },
    "current_performance": {
      "deals_closed": 8,
      "revenue_generated": 45000,
      "leads_converted": 12,
      "commission_earned": 4500
    },
    "monthly_target": 150000,
    "progress_percentage": 30
  }
}
```

#### POST /api/agent/deal
Record a deal closure.

```http
POST /api/agent/deal
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "deal_description": "Property sale at X location",
  "revenue": 50000
}

Response:
{
  "success": true,
  "data": {
    "deal_id": "deal-456",
    "commission_earned": 5000,
    "total_monthly_revenue": 50000
  }
}
```

#### GET /api/agents/leaderboard
Get agent leaderboard.

```http
GET /api/agents/leaderboard?metric=revenue&limit=10
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "agent_name": "Top Agent",
      "team": "Real Estate",
      "metric_value": 250000,
      "metric_type": "revenue"
    }
  ]
}
```

### 6. Dashboard Consolidated Endpoints

#### GET /api/user/dashboard
Get complete user dashboard (all stats in one call).

```http
GET /api/user/dashboard
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": {
    "user": { /* user profile */ },
    "loyalty": { /* loyalty stats */ },
    "referrals": { /* referral stats */ },
    "messages": { /* unread count + recent */ },
    "activity": { /* recent activity feed */ }
  }
}
```

#### GET /api/business/dashboard/:id
Get business dashboard.

```http
GET /api/business/dashboard/business-123
Authorization: Bearer <JWT>

Response:
{
  "success": true,
  "data": {
    "business": { /* business profile */ },
    "stats": { /* rating, reviews, verification */ },
    "messages": { /* recent messages */ },
    "activity": { /* business activity */ }
  }
}
```

---

## Testing Procedures

### 1. Database Connection Test

```bash
# Connect to database
psql -U postgres -h localhost -d lowveldhub

# Test loyalty_points table
SELECT * FROM loyalty_points LIMIT 1;

# Test referrals table
SELECT * FROM referrals LIMIT 1;

# Test messages table
SELECT * FROM messages LIMIT 1;

# Test agents table
SELECT * FROM agents LIMIT 1;
```

### 2. Backend Health Check

```bash
# Test server is running
curl http://localhost:5000/health

# Expected response:
# { "status": "ok", "timestamp": "2026-01-27T..." }
```

### 3. API Endpoint Testing

#### 3a. Authentication First (Required)
```bash
# Login to get JWT
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Response includes token:
# { "success": true, "data": { "token": "eyJ..." } }

# Store token for subsequent requests
TOKEN="eyJ..."
```

#### 3b. Test Loyalty Points
```bash
# Get loyalty stats
curl -X GET http://localhost:5000/api/user/loyalty \
  -H "Authorization: Bearer $TOKEN"

# Add points (admin only)
curl -X POST http://localhost:5000/api/user/loyalty \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"points":100,"source_action":"review_created"}'
```

#### 3c. Test Referrals
```bash
# Generate referral code
curl -X POST http://localhost:5000/api/user/referral/generate \
  -H "Authorization: Bearer $TOKEN"

# Get referral stats
curl -X GET http://localhost:5000/api/user/referrals \
  -H "Authorization: Bearer $TOKEN"
```

#### 3d. Test Messaging
```bash
# Get conversations
curl -X GET http://localhost:5000/api/messages/conversations \
  -H "Authorization: Bearer $TOKEN"

# Send message
curl -X POST http://localhost:5000/api/messages \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_id":"business-123",
    "content":"Hello!",
    "message_type":"text"
  }'
```

#### 3e. Test Agent Dashboard
```bash
# Get agent dashboard
curl -X GET http://localhost:5000/api/agent/dashboard \
  -H "Authorization: Bearer $TOKEN"

# Get leaderboard
curl -X GET "http://localhost:5000/api/agents/leaderboard?metric=revenue" \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Frontend Component Testing

#### Test User Dashboard
1. Import `UserDashboard.tsx` in App.tsx
2. Add route: `case 'user-dashboard': return <UserDashboard />;`
3. Navigate to user dashboard
4. Verify:
   - Profile loads
   - Loyalty points display
   - Referral code generates
   - Messages show unread count
   - Activity feed populates

#### Test Business Dashboard
1. Import `BusinessDashboard.tsx` in App.tsx
2. Add route: `case 'business-dashboard': return <BusinessDashboard businessId={selectedBusinessId} />;`
3. Navigate to business dashboard
4. Verify:
   - Business profile displays
   - Stats (rating, reviews) show
   - Messages load
   - Activity history shows

#### Test Agent Dashboard
1. Import `AgentDashboard.tsx` in App.tsx
2. Add route: `case 'agent-dashboard': return <AgentDashboard />;`
3. Navigate to agent dashboard
4. Verify:
   - Agent profile displays
   - Progress bar updates
   - Performance table shows data
   - Leaderboard loads
   - Metric toggle works

#### Test Messaging UI
1. Import `MessagingUI.tsx` in App.tsx
2. Use as modal: `<MessagingUI userId={userId} onClose={...} />`
3. Verify:
   - Conversation list loads
   - Messages display in thread
   - New messages send
   - Archive conversation works
   - Unread badges update

### 5. Load Testing (Optional)

```bash
# Test with Apache Bench (if installed)
ab -n 1000 -c 10 -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/user/loyalty

# Test with wrk (if installed)
wrk -t 4 -c 100 -d 30s \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/user/loyalty
```

---

## Troubleshooting

### Issue: Migration Fails with "Table Already Exists"

**Cause:** Tables were already created in a previous migration.

**Solution:**
```bash
# Option 1: Check if tables exist
psql -U postgres -h localhost -d lowveldhub -c "\dt"

# Option 2: Drop and recreate (WARNING: destroys data)
psql -U postgres -h localhost -d lowveldhub -c "DROP TABLE IF EXISTS loyalty_points CASCADE;"
psql -U postgres -h localhost -d lowveldhub -c "DROP TABLE IF EXISTS referrals CASCADE;"
# ... repeat for all tables

# Option 3: Modify migration to use CREATE TABLE IF NOT EXISTS
# (Already included in provided migration file)
```

### Issue: JWT Authentication Failed

**Cause:** Token expired or invalid.

**Solution:**
```bash
# Re-login to get new token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Update TOKEN variable with new value
TOKEN="<new_token>"
```

### Issue: Foreign Key Constraint Error

**Cause:** Trying to create record with invalid user_id or business_id.

**Solution:**
```bash
# Verify user exists
SELECT * FROM users WHERE id = 'user-123';

# Verify business exists
SELECT * FROM businesses WHERE id = 'business-123';

# Use valid IDs from seed data
```

### Issue: Messages Not Appearing in Thread

**Cause:** Conversation ID mismatch or messages not being grouped.

**Solution:**
```bash
# Check conversations table
SELECT * FROM conversations WHERE participant1_id = 'user-123' OR participant2_id = 'user-123';

# Verify messages associated to conversation
SELECT * FROM messages WHERE conversation_id = 'conv-123';

# Ensure messagesService is creating/finding conversations correctly
```

### Issue: Performance Slow

**Cause:** Missing indexes or N+1 query problems.

**Solution:**
```bash
# Check indexes exist
\d loyalty_points (shows indexes)

# Verify indexes were created by migration
SELECT * FROM pg_indexes WHERE tablename = 'loyalty_points';

# If missing, re-run migration or add manually:
CREATE INDEX idx_loyalty_user_created ON loyalty_points(user_id, created_at DESC);
```

### Issue: Webpack/Vite Build Error

**Cause:** Import paths incorrect or circular dependencies.

**Solution:**
```bash
# Clear cache
rm -rf node_modules/.vite
npm run dev

# Check for import errors in console
# Fix relative paths (use @/ aliases where possible)

# Example correct import:
import UserDashboard from '@/pages/user/UserDashboard';
```

---

## Next Steps

1. **Run Database Migration**
   ```bash
   cd backend
   npm run migrate
   ```

2. **Restart Backend Server**
   ```bash
   npm run dev
   ```

3. **Test Backend Endpoints**
   - Use curl commands from Testing section
   - Verify all routes respond correctly

4. **Integrate Frontend Components**
   - Add to App.tsx routing
   - Test in browser
   - Verify API calls work

5. **Complete Documentation**
   - User guides for each dashboard
   - Admin configuration guide
   - Performance tuning guide

---

## Support & References

- **Backend API Docs:** See API Reference section above
- **Component Props:** Check TypeScript interfaces in component files
- **Database Schema:** See tables definitions in migration file
- **Styling:** Check individual .css files for customization

---

**Created:** January 27, 2026  
**System Ready:** Yes - All components complete, awaiting database migration
