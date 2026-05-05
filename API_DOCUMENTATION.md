# LowveldHub Backend API Documentation

## Backend Status ✅
- **Server**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Frontend**: http://localhost:3000

---

## API Endpoints by Category

### 1. Authentication (`/api/auth`)

**POST /api/auth/login**
```json
{
  "email": "admin@lowveldhub.co.za",
  "password": "admin123"
}
```
Response: `{ token: "eyJ...", user: {...} }`

**POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

### 2. User Dashboard (`/api/user`)

**GET /api/user/dashboard** (requires JWT token)
- Header: `Authorization: Bearer <token>`
- Response: `{ rewardPoints, savedItems, unreadMessages, recentActivity }`

**GET /api/loyalty** (requires JWT token)
- Get loyalty points and history
- Response: `{ totalPoints, pointsHistory, lastEarnedAt }`

**POST /api/loyalty/referral** (requires JWT token)
```json
{
  "referredEmail": "friend@example.com",
  "pointsAwarded": 100
}
```
- Response: `{ id, referrerId, referredId, pointsAwarded, status, createdAt }`

**GET /api/loyalty/referrals** (requires JWT token)
- Get all referrals submitted by user
- Response: `{ referrals: [...], stats: { total, completed, pending, totalEarnings } }`

**GET /api/activity/my-activity** (requires JWT token)
- Query params: `?limit=10`
- Get recent activity logs
- Response: `[ { id, action, description, createdAt, ... } ]`

---

### 3. Admin Routes (`/api/admin`)

**GET /api/admin/overview** (requires JWT + admin role)
- Response: `{ totalUsers, totalBusinesses, pendingApprovals }`

**GET /api/admin/agents/list** (requires JWT + admin role)
- List all agents with stats
- Response: `[ { id, userId, email, firstName, currentTarget, monthlyProgress, earnings, ... } ]`

**GET /api/admin/agents/:id** (requires JWT + admin role)
- Get single agent details
- Response: `{ id, userId, email, currentTarget, monthlyProgress, earnings, ... }`

**PATCH /api/admin/agents/:id/target** (requires JWT + admin role)
```json
{
  "currentTarget": 50
}
```
- Update agent sales target

**PATCH /api/admin/agents/:id/progress** (requires JWT + admin role)
```json
{
  "monthlyProgress": 25
}
```
- Update agent monthly progress

**PATCH /api/admin/agents/:id/achievement** (requires JWT + admin role)
```json
{
  "achievement": "Top Performer 2026"
}
```
- Add achievement badge to agent

**PATCH /api/admin/referral/:referralId/confirm** (requires JWT + admin role)
- Confirm a referral (awards completion bonus)
- Response: `{ id, referrerId, pointsAwarded, ... }`

**GET /api/admin/activity/business/:businessId** (requires JWT + admin role)
- Query params: `?limit=20`
- Get activity for specific business

**GET /api/admin/activity/global** (requires JWT + admin role)
- Query params: `?action=viewed_listing&limit=50`
- Get all platform activity (filtered by action if provided)

**DELETE /api/admin/activity/cleanup** (requires JWT + admin role)
```json
{
  "daysOld": 90
}
```
- Clear activity logs older than N days

---

### 4. Agents (`/api/agents`)

**GET /api/agents/:id/progress** (requires JWT token)
- Get personal agent progress
- Response: `{ id, userId, currentTarget, monthlyProgress, progressPercentage, earnings, ... }`

---

## Testing with Postman / cURL

### 1. Get JWT Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lowveldhub.co.za","password":"admin123"}'
```

### 2. Test Protected Endpoint
```bash
curl -X GET http://localhost:5000/api/user/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Get Admin Overview
```bash
curl -X GET http://localhost:5000/api/admin/overview \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

### 4. List Agents
```bash
curl -X GET http://localhost:5000/api/admin/agents/list \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

### 5. Submit Referral
```bash
curl -X POST http://localhost:5000/api/loyalty/referral \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"referredEmail":"friend@example.com","pointsAwarded":100}'
```

---

## Database Tables Created ✅

1. **users** - User accounts (Phase 1)
2. **businesses** - Listings (Phase 2)
3. **admins** - Admin users (Phase 3)
4. **admin_logs** - Audit trail (Phase 3)
5. **subscriptions** - Tier management (Phase 3)
6. **payments** - Payment tracking (Phase 3)
7. **agents** - Staff/agent profiles (Phase 3.5) ✅
8. **loyalty_points** - User points tracking (Phase 3.5) ✅
9. **referrals** - Referral history (Phase 3.5) ✅
10. **recent_activity** - Activity logging (Phase 3.5) ✅

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not found |
| 500 | Server error |

---

## Next Steps - Frontend Integration

1. Update UserDashboard to include loyalty points display
2. Add referral UI component
3. Create AgentDashboard component
4. Add activity feed widget
5. Update color scheme (Primary: #6C4AB6, Accent: #F1C40F)

---

## Credentials for Testing

**Admin Account:**
- Email: `admin@lowveldhub.co.za`
- Password: `admin123`
- Role: `super_admin`

