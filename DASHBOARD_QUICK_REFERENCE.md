# Dashboard System - Quick Reference

**Last Updated:** January 27, 2026

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Run migration
cd backend && npm run migrate

# 2. Restart backend
npm run dev

# 3. Test endpoint
curl http://localhost:5000/api/user/loyalty \
  -H "Authorization: Bearer YOUR_TOKEN"

# 4. Expected response
# { "success": true, "data": { "total_points": 0, ... } }
```

---

## 📁 File Organization

### Backend Services (5 files, 920 lines)
```
backend/src/services/
├── loyaltyService.ts        (145 lines) - Points management
├── referralService.ts       (180 lines) - Referral codes
├── messagingService.ts      (210 lines) - Messaging
├── activityService.ts       (165 lines) - Activity logging
└── agentService.ts          (220 lines) - Agent tracking
```

### Backend Routes (2 files, 530 lines)
```
backend/src/routes/
├── userDashboardRoutes.ts   (320 lines) - /api/user/* endpoints
└── dashboardRoutes.ts       (210 lines) - /api/dashboard endpoints
```

### Frontend Components (7 files, 2,445 lines)
```
pages/
├── user/
│   ├── UserDashboard.tsx    (220 lines)
│   └── UserDashboard.css    (420 lines)
├── business/
│   ├── BusinessDashboard.tsx (210 lines)
│   └── BusinessDashboard.css (380 lines)
└── agent/
    ├── AgentDashboard.tsx   (225 lines)
    └── AgentDashboard.css   (300 lines)

components/
├── MessagingUI.tsx          (310 lines)
└── MessagingUI.css          (380 lines)
```

---

## 🔑 Key Functions

### Loyalty Service
```typescript
// Add points to user account
addPoints(userId, points, source_action, description)

// Redeem points for reward
redeemPoints(userId, points)

// Get user's loyalty stats
getUserLoyaltyStats(userId)

// Get top 10 loyalty users
getTopLoyaltyUsers()

// Award points for specific action
awardPointsForAction(userId, action, points)
```

### Referral Service
```typescript
// Generate new referral code
generateReferralCode(userId)

// Register when referred user signs up
registerReferral(referral_code, new_user_id)

// Get referral stats for user
getReferralStats(userId)

// Get top 10 referrers
getTopReferrers()

// Validate code during signup
validateReferralCode(code)
```

### Messaging Service
```typescript
// Send message between users
sendMessage(sender_id, receiver_id, content, type)

// Get all messages in conversation
getConversationMessages(conversation_id)

// Mark conversation as read
markAsRead(conversation_id, user_id)

// Get all conversations for user
getUserConversations(userId)

// Get or create conversation between two users
getOrCreateConversation(user1_id, user2_id)

// Get unread message count
getUnreadCount(userId)

// Delete message
deleteMessage(messageId)

// Archive conversation
archiveConversation(conversationId)
```

### Activity Service
```typescript
// Log user activity
logUserActivity(userId, type, resource_type, resource_id, description)

// Log business activity
logBusinessActivity(businessId, activityType, userId, description)

// Get user's activity feed
getUserActivity(userId, limit, offset)

// Get business activity
getBusinessActivity(businessId, limit, offset)

// Get activity summary stats
getUserActivitySummary(userId)

// Get activities by type
getActivityByType(userId, type)

// Clean old activities (>90 days)
cleanOldActivity()
```

### Agent Service
```typescript
// Create or update agent profile
createOrUpdateAgent(user_id, agent_name, phone, email, team)

// Get agent dashboard data
getAgentDashboard(agent_id)

// Record deal closure
recordDeal(agent_id, deal_description, revenue)

// Update monthly performance metrics
updateMonthlyPerformance(agent_id, year, month, metrics)

// Get agent leaderboard
getLeaderboard(metric, limit)

// Get agent's performance history
getPerformanceHistory(agent_id, months)

// Update agent status
updateAgentStatus(agent_id, status)

// Reset monthly progress
resetMonthlyProgress(agent_id, month)
```

---

## 🔌 API Endpoints (20 total)

### Loyalty (3 endpoints)
```
GET    /api/user/loyalty
POST   /api/user/loyalty
POST   /api/user/loyalty/redeem
```

### Referrals (3 endpoints)
```
GET    /api/user/referrals
POST   /api/user/referral/generate
POST   /api/user/referral/validate
GET    /api/referrals/leaderboard
```

### Messaging (5 endpoints)
```
POST   /api/messages
GET    /api/messages/conversations
GET    /api/messages/:conversationId
POST   /api/messages/:conversationId/read
GET    /api/messages/unread/count
```

### Activity (2 endpoints)
```
GET    /api/activity
GET    /api/activity/summary
```

### Agent (4 endpoints)
```
GET    /api/agent/dashboard
GET    /api/agents/leaderboard
POST   /api/agent/deal
PATCH  /api/agent/performance
```

### Dashboard (4 endpoints)
```
GET    /api/user/dashboard
GET    /api/business/dashboard/:id
GET    /api/business/:id/messages
GET    /api/business/:id/activity
```

---

## 🧩 Database Tables (9 total)

| Table | Rows | Purpose |
|-------|------|---------|
| loyalty_points | ~1000s | Point transactions |
| referrals | ~100s | Referral tracking |
| messages | ~10000s | Message history |
| conversations | ~1000s | Message grouping |
| recent_activity | ~10000s | User activities |
| business_activity | ~1000s | Business events |
| agents | ~100s | Agent profiles |
| agent_performance | ~1000s | Monthly metrics |
| ai_recommendations | ~1000s | AI cache |

---

## 📦 Component Props

### UserDashboard
```typescript
interface Props {
  // No required props - uses Auth context for user ID
}
```

### BusinessDashboard
```typescript
interface Props {
  businessId: string;  // Required
}
```

### AgentDashboard
```typescript
interface Props {
  // No required props - uses Auth context for agent ID
}
```

### MessagingUI
```typescript
interface Props {
  userId: string;           // Required
  userName: string;         // Required
  userRole?: 'user' | 'business' | 'agent';
  onClose?: () => void;
}
```

---

## 🎨 Theme & Styling

### Color Scheme
```css
Primary Gold:    #d4af37
Dark Background: #1a1a1a
White Cards:     #ffffff
Light Gray:      #f9f9f9
Border Gray:     #e0e0e0
```

### Responsive Breakpoints
```css
Mobile:  < 480px
Tablet:  480px - 768px
Desktop: > 768px
```

### Naming Conventions
```css
.component-name { }
.component-name__element { }
.component-name--modifier { }
```

---

## 🔐 Authentication

All endpoints require JWT token:
```http
Authorization: Bearer eyJhbGc...
```

### Get Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

---

## 🧪 Testing Examples

### Get Loyalty Stats
```bash
curl -X GET http://localhost:5000/api/user/loyalty \
  -H "Authorization: Bearer TOKEN"
```

### Generate Referral Code
```bash
curl -X POST http://localhost:5000/api/user/referral/generate \
  -H "Authorization: Bearer TOKEN"
```

### Send Message
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "receiver_id":"business-123",
    "content":"Hello!",
    "message_type":"text"
  }'
```

### Get Agent Dashboard
```bash
curl -X GET http://localhost:5000/api/agent/dashboard \
  -H "Authorization: Bearer TOKEN"
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Token expired, get new one |
| 404 Not Found | Endpoint path typo, check URL |
| 500 Server Error | Check backend logs, verify DB |
| CORS Error | Backend must include frontend origin |
| Message not sent | Verify receiver_id exists |
| Points not added | Check user exists in database |

---

## 📊 Performance Tips

1. **Lazy Load Components**
   ```typescript
   const UserDashboard = React.lazy(() => import('./pages/user/UserDashboard'));
   ```

2. **Cache API Responses**
   ```typescript
   const [cache, setCache] = useState({});
   if (cache[key]) return cache[key];
   ```

3. **Paginate Long Lists**
   ```typescript
   GET /api/activity?limit=20&offset=0
   ```

4. **Use Indexes in Database**
   ```sql
   CREATE INDEX idx_loyalty_user ON loyalty_points(user_id);
   CREATE INDEX idx_messages_conversation ON messages(conversation_id);
   ```

---

## 📝 Import Examples

### Components
```typescript
import UserDashboard from '@/pages/user/UserDashboard';
import BusinessDashboard from '@/pages/business/BusinessDashboard';
import AgentDashboard from '@/pages/agent/AgentDashboard';
import MessagingUI from '@/components/MessagingUI';
```

### Services (Backend only)
```typescript
import { addPoints, getUserLoyaltyStats } from '../services/loyaltyService';
import { generateReferralCode, registerReferral } from '../services/referralService';
import { sendMessage, getConversationMessages } from '../services/messagingService';
import { logUserActivity, getUserActivity } from '../services/activityService';
import { getAgentDashboard, recordDeal } from '../services/agentService';
```

### API Client (Frontend)
```typescript
import api from '@/services/api';

// Make authenticated request
const response = await api.get('/user/loyalty');
const data = response.data.data;
```

---

## 🔄 Data Flow

```
User Action
    ↓
Frontend Component
    ↓
API Request (Axios)
    ↓
Backend Route Handler
    ↓
Service Layer
    ↓
Database Query
    ↓
Response → Component State Update → UI Re-render
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| DASHBOARD_SETUP_GUIDE.md | Complete setup & integration |
| DASHBOARD_IMPLEMENTATION_CHECKLIST.md | Progress tracking |
| DASHBOARD_QUICK_REFERENCE.md | This file |

---

## ✅ Deployment Checklist

- [ ] Run database migration
- [ ] Verify all tables created
- [ ] Test backend endpoints
- [ ] Add components to routing
- [ ] Test frontend integration
- [ ] Load testing (optional)
- [ ] Security review
- [ ] Deploy to production

---

## 📞 Need Help?

1. Check DASHBOARD_SETUP_GUIDE.md for detailed instructions
2. Check component files for TypeScript interfaces
3. Check service files for implementation details
4. Run curl tests to verify backend
5. Check browser DevTools for frontend errors

---

**System Ready:** ✅ All Components Built  
**Status:** Awaiting Database Migration  
**Time to Production:** ~15 minutes
