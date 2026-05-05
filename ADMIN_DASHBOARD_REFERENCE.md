# 📚 ADMIN DASHBOARD - COMPREHENSIVE REFERENCE

**Version:** 1.0  
**Created:** January 27, 2026  
**Status:** Complete & Documented

---

## 🎯 Executive Summary

A **premium admin dashboard** has been created for LowveldHub with:

✅ **4 Backend Admin Routes** - Manage users & businesses  
✅ **4 Frontend Admin Pages** - Dashboard, Users, Businesses, Layout  
✅ **JWT Authentication** - Secure token-based access  
✅ **Axios API Integration** - Auto JWT injection  
✅ **Responsive Design** - Mobile-friendly layout  
✅ **Premium Styling** - Gold/black luxury theme  
✅ **Complete Documentation** - Setup, testing, integration guides  

---

## 📂 Project Structure

```
s.lowveldhub/
├── backend/
│   └── src/
│       ├── routes/
│       │   └── adminRoutes.ts        ⭐ NEW: Admin endpoints
│       ├── middleware/
│       │   └── authMiddleware.ts     (JWT verification)
│       └── services/
│           ├── adminService.ts       ⭐ NEW: Admin logic
│           └── ...
│
├── src/
│   ├── utils/
│   │   └── auth.ts                   ⭐ NEW: Token management
│   ├── services/
│   │   └── api.ts                    ⭐ NEW: Axios with JWT
│   └── ...
│
├── pages/
│   └── admin/
│       ├── AdminLayout.tsx            ⭐ NEW: Main layout + sidebar
│       ├── AdminLayout.css            ⭐ NEW: Layout styles
│       ├── Dashboard.tsx              ⭐ NEW: Dashboard page
│       ├── Users.tsx                  ⭐ NEW: Users table
│       ├── Businesses.tsx             ⭐ NEW: Business cards
│       └── AdminPages.css             ⭐ NEW: Page styles
│
├── AdminApp.tsx                       ⭐ NEW: Router config
├── index-admin.tsx                    ⭐ NEW: Admin entry point
│
├── ADMIN_DASHBOARD_SETUP_COMPLETE.md    (Setup summary)
├── ADMIN_DASHBOARD_QUICK_START.md       (Quick start guide)
├── ADMIN_INTEGRATION_GUIDE.md           (Integration options)
├── ADMIN_TESTING_GUIDE.md               (Test procedures)
└── ADMIN_DASHBOARD_REFERENCE.md         (This file)
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Ensure Backend is Running
```bash
cd backend
npm run dev
# Backend will start on port 5000
```

### Step 2: Start Frontend Dev Server
```bash
npm run dev
# Frontend will start on port 3000
```

### Step 3: Access Admin Dashboard
```
1. Login: http://localhost:3000/login
2. Admin Dashboard: http://localhost:3000/admin/dashboard
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                    1. LOGIN                             │
│  User enters email/password → POST /api/auth/login      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              2. STORE TOKEN                             │
│  Response: { token: "eyJ..." }                          │
│  Stored: localStorage.setItem('adminToken', token)     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│          3. AUTO-INJECT IN REQUESTS                     │
│  Axios Interceptor:                                     │
│  ALL requests → Headers: Authorization: Bearer eyJ...   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│           4. ACCESS PROTECTED ROUTES                    │
│  GET /admin/users → Success (401 redirect if expired)   │
│  PATCH /admin/business/:id/verify → Success            │
└─────────────────────────────────────────────────────────┘
```

---

## 📡 Backend Admin Routes

### 1. GET /api/admin/users
**Purpose:** Fetch all registered users  
**Authentication:** Required (JWT)  
**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "phone": "+27701234567",
      "business": "ABC Company",
      "location": "Mbombela",
      "verified": true,
      "createdAt": "2026-01-27T10:00:00Z"
    }
  ]
}
```

---

### 2. GET /api/admin/businesses-list
**Purpose:** Fetch all businesses with details  
**Authentication:** Required (JWT)  
**Response:**
```json
{
  "success": true,
  "businesses": [
    {
      "id": "biz_456",
      "name": "Premium Cafe",
      "owner": "John Doe",
      "location": "White River",
      "category": "Eats",
      "rating": 4.8,
      "reviewCount": 45,
      "verified": true,
      "featured": false,
      "tier": "elite"
    }
  ]
}
```

---

### 3. PATCH /api/admin/business/:id/verify
**Purpose:** Mark a business as verified  
**Authentication:** Required (JWT)  
**Request:**
```json
PATCH /api/admin/business/biz_456/verify
```

**Response:**
```json
{
  "success": true,
  "message": "Business verified successfully",
  "data": {
    "id": "biz_456",
    "verified": true,
    "verifiedAt": "2026-01-27T10:30:00Z"
  }
}
```

---

### 4. PATCH /api/admin/business/:id/feature
**Purpose:** Mark a business as featured  
**Authentication:** Required (JWT)  
**Request:**
```json
PATCH /api/admin/business/biz_456/feature
```

**Response:**
```json
{
  "success": true,
  "message": "Business featured successfully",
  "data": {
    "id": "biz_456",
    "featured": true,
    "featuredAt": "2026-01-27T10:30:00Z"
  }
}
```

---

## 🎨 Frontend Components

### AdminLayout.tsx
**Purpose:** Main admin layout wrapper  
**Features:**
- Premium sidebar with navigation
- Header with user info
- Logout button
- Nested route display (Outlet)
- Responsive design

**Props:** None (uses Outlet for nested routes)

**Usage:**
```typescript
import AdminLayout from './pages/admin/AdminLayout'

<Route path="/admin" element={<AdminLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  ...
</Route>
```

---

### Dashboard.tsx
**Purpose:** Admin dashboard overview  
**Features:**
- 4 stats cards (Users, Businesses, Verified, Featured)
- Quick actions list
- System status display
- Real-time API data

**API Calls:**
```typescript
GET /admin/users          // Get user count
GET /admin/businesses-list // Get business count & stats
```

**State:**
```typescript
const [stats, setStats] = useState({
  totalUsers: 0,
  totalBusinesses: 0,
  verifiedBusinesses: 0,
  featuredBusinesses: 0,
})
```

---

### Users.tsx
**Purpose:** Display all users  
**Features:**
- Premium table layout
- Columns: Name, Email, Phone, Business, Location, Verified, Joined
- Loading & error states
- Responsive design

**API Call:**
```typescript
GET /admin/users // Fetch all users
```

**State:**
```typescript
const [users, setUsers] = useState<User[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

---

### Businesses.tsx
**Purpose:** Manage businesses  
**Features:**
- Card grid layout
- Business details (name, owner, location, rating, tier)
- Status badges (Verified, Featured)
- Action buttons: Verify, Feature
- Loading states on buttons
- Success notifications

**API Calls:**
```typescript
GET /admin/businesses-list              // Fetch businesses
PATCH /admin/business/:id/verify        // Verify business
PATCH /admin/business/:id/feature       // Feature business
```

**Key Functions:**
```typescript
handleVerifyBusiness(businessId)  // Verify button handler
handleFeatureBusiness(businessId) // Feature button handler
```

---

## 🔑 Utility Functions

### src/utils/auth.ts

**getToken()**
```typescript
const token = getToken()
// Returns: JWT string or null if not found
```

**setToken(token)**
```typescript
setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
// Stores token in localStorage
```

**removeToken()**
```typescript
removeToken()
// Clears token from localStorage
```

**isAuthenticated()**
```typescript
if (isAuthenticated()) {
  // User is logged in
}
```

**getUser()**
```typescript
const user = getUser()
// Returns: User object or null
```

**setUser(user)**
```typescript
setUser({ id: '123', email: 'user@example.com', name: 'John' })
// Stores user data
```

**logout()**
```typescript
logout()
// Clears token, user, and redirects to login
```

---

## 📡 API Service (src/services/api.ts)

**Setup:**
```typescript
import api from '@/src/services/api'

// Automatically includes JWT token in all requests
```

**Usage:**
```typescript
// GET request
const response = await api.get('/admin/users')

// POST request
const response = await api.post('/admin/users', data)

// PATCH request
const response = await api.patch(`/admin/business/${id}/verify`, {})

// DELETE request
const response = await api.delete(`/admin/business/${id}`)
```

**Features:**
- ✅ Auto JWT injection
- ✅ Base URL: http://localhost:5000/api
- ✅ Request interceptor adds Authorization header
- ✅ Response interceptor handles 401 errors
- ✅ Auto-redirect to login on token expiry

---

## 🎯 Routing Structure

### Option A: Separate Admin App (Default)
```
URL: http://localhost:3000/admin/dashboard
Entry: index-admin.tsx
Router: AdminApp.tsx (BrowserRouter)
Layout: AdminLayout.tsx
```

### Option B: Integrated with Main App
```
URL: http://localhost:3000/admin/dashboard
Entry: index.tsx
Router: App.tsx (with React Router)
Layout: AdminLayout.tsx (nested route)
```

---

## 🎨 Design System

### Colors
```css
--primary-gold: #d4af37      /* Luxury gold */
--dark-bg: #1a1a1a          /* Dark background */
--light-bg: #f7f7f7         /* Light background */
--card-bg: #ffffff          /* Card white */
--border: #e0e0e0           /* Light border */
--success: #4caf50          /* Green for success */
--error: #f44336            /* Red for errors */
```

### Spacing
```css
--xs: 4px
--sm: 8px
--md: 16px
--lg: 24px
--xl: 32px
--2xl: 48px
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1)
```

### Typography
```css
Font Family: 'Segoe UI', Tahoma, Geneva, Verdana
Font Sizes: 12px, 14px, 16px, 18px, 20px, 24px, 32px
Line Height: 1.5 (default)
Letter Spacing: 0.5px (headings)
```

---

## 📊 Data Flow Diagram

```
┌──────────────┐
│   User       │
│  Interaction │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  React Component     │  (Dashboard, Users, Businesses)
│  (useState, useEffect)│
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Axios API Service   │  (Auto adds JWT token)
│  (src/services/api)  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────┐
│  HTTP Request            │  Headers: { Authorization: Bearer JWT }
│  POST/GET/PATCH/DELETE   │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Express Backend         │  (http://localhost:5000/api)
│  Admin Routes            │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Auth Middleware         │  Verify JWT token
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Admin Service Layer     │  Business logic
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  PostgreSQL Database     │  Data persistence
└──────────────────────────┘
```

---

## 🧪 Testing Checklist

### Backend Tests
- [ ] Health check: GET /health → 200 OK
- [ ] Admin routes mounted
- [ ] JWT verification working
- [ ] Database queries successful
- [ ] Error handling implemented

### Frontend Tests
- [ ] Components render without errors
- [ ] API calls succeed
- [ ] Token auto-injection working
- [ ] Protected routes enforced
- [ ] Loading states display
- [ ] Error handling shows feedback
- [ ] Logout clears session

### Integration Tests
- [ ] Login → Token stored
- [ ] Dashboard loads stats
- [ ] Users page shows table
- [ ] Businesses page shows cards
- [ ] Verify button works
- [ ] Feature button works
- [ ] Logout works

### Error Scenario Tests
- [ ] Expired token → Redirect to login
- [ ] No token → Redirect to login
- [ ] Invalid token → API error
- [ ] Backend down → Network error
- [ ] Database error → Error message

---

## 🚀 Deployment Guide

### Step 1: Build Backend
```bash
cd backend
npm run build
# Output: dist/ (compiled TypeScript)
```

### Step 2: Build Frontend
```bash
npm run build
# Output: dist/ (optimized static files)
```

### Step 3: Deploy Backend
```bash
# Copy backend/dist/ to server
# Set environment variables
# Start server: node dist/server.js
```

### Step 4: Deploy Frontend
```bash
# Copy dist/ to CDN or static hosting
# Update API_URL to production backend URL
# Rebuild if needed
```

### Step 5: Update Configuration
```bash
# Frontend: Update API_URL in vite.config.ts
# Backend: Update FRONTEND_URL in .env
# Both: Verify CORS settings
```

---

## 📋 Environment Variables

### Backend (.env)
```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lowveldhub
DB_USER=postgres
DB_PASSWORD=@Queen000

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=24h

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
# API URL
VITE_API_URL=http://localhost:5000/api
# or
REACT_APP_API_URL=http://localhost:5000/api

# Gemini API (if using AI)
GEMINI_API_KEY=your_api_key_here
```

---

## 📚 Additional Resources

### Documentation Files
- **ADMIN_DASHBOARD_SETUP_COMPLETE.md** - Setup summary with all created files
- **ADMIN_DASHBOARD_QUICK_START.md** - Quick start guide (5 minutes)
- **ADMIN_INTEGRATION_GUIDE.md** - How to integrate into main app
- **ADMIN_TESTING_GUIDE.md** - Complete testing procedures
- **ADMIN_DASHBOARD_REFERENCE.md** - This file (comprehensive reference)

### Code Files
- **src/utils/auth.ts** - Authentication utilities
- **src/services/api.ts** - API service with JWT
- **pages/admin/AdminLayout.tsx** - Main layout component
- **pages/admin/Dashboard.tsx** - Dashboard page
- **pages/admin/Users.tsx** - Users page
- **pages/admin/Businesses.tsx** - Businesses page
- **AdminApp.tsx** - Router configuration
- **index-admin.tsx** - Admin entry point

### Styling Files
- **pages/admin/AdminLayout.css** - Layout styles
- **pages/admin/AdminPages.css** - Page styles

---

## 🎯 Next Steps

### Immediate (This Week)
1. [ ] Run backend and frontend together
2. [ ] Test admin dashboard
3. [ ] Verify all API endpoints work
4. [ ] Test admin actions (verify/feature)
5. [ ] Fix any issues found

### Short Term (Next Week)
1. [ ] Integrate admin dashboard into main App.tsx (optional)
2. [ ] Add more admin features (delete, suspend, export)
3. [ ] Implement email notifications
4. [ ] Add data export functionality
5. [ ] Create admin help documentation

### Medium Term (Next Month)
1. [ ] Add analytics dashboard
2. [ ] Implement advanced filtering
3. [ ] Add bulk operations
4. [ ] Create admin audit logs
5. [ ] Set up automated reports

---

## 💡 Tips & Tricks

### Debugging
```javascript
// Check token in console
localStorage.getItem('adminToken')

// Check auth status
import { isAuthenticated } from '@/src/utils/auth'
isAuthenticated()

// Make manual API call
import api from '@/src/services/api'
api.get('/admin/users').then(res => console.log(res.data))
```

### Performance
- Components are lightweight
- Lazy loading ready (Suspense wrapper available)
- CSS is optimized
- API calls are debounced
- State updates are minimal

### Security
- JWT tokens in localStorage
- Protected routes with auth check
- Server-side JWT verification
- CORS configured
- SQL injection prevention via ORM

---

## ❓ FAQ

**Q: Can I run admin dashboard separately?**
A: Yes! Use index-admin.tsx as entry point for standalone testing.

**Q: How long does token last?**
A: Default 24 hours (configurable in JWT_EXPIRY in .env).

**Q: What happens when token expires?**
A: User redirected to login, token cleared, session reset.

**Q: Can I customize the design?**
A: Yes! Update colors in AdminLayout.css and AdminPages.css.

**Q: How do I add more admin pages?**
A: Create new page component in pages/admin/, add route in AdminApp.tsx.

**Q: Is the admin dashboard mobile-friendly?**
A: Yes! Sidebar collapses on mobile, responsive grid layout.

---

## 📞 Support

**Issues?** Check ADMIN_TESTING_GUIDE.md for troubleshooting.

**Need features?** Reference code is modular and easy to extend.

**Performance concerns?** All components are optimized for speed.

---

## ✅ Sign-Off

✅ **Admin Dashboard is complete**  
✅ **All components created & styled**  
✅ **Backend integration ready**  
✅ **Documentation complete**  
✅ **Testing procedures defined**  

**Status:** 🟢 **Ready for Implementation**

---

**Reference Document Created:** January 27, 2026  
**Version:** 1.0  
**Maintainer:** LowveldHub Admin Team

---

## 🎓 Learning Resources

### React Concepts Used
- Functional components
- useState & useEffect hooks
- Conditional rendering
- Event handling
- Axios/Fetch

### TypeScript Concepts
- Type definitions
- Interfaces
- Generic types
- Type assertions

### CSS Concepts
- CSS Grid
- Flexbox
- Media queries
- CSS variables
- Transitions & animations

---

**End of Reference Document**
