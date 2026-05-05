# 🔗 INTEGRATION GUIDE - Admin Dashboard into Main App

**Status:** Ready for Integration  
**Complexity:** Medium  
**Time Required:** 15-30 minutes

---

## 📋 Overview

You have two options:

### Option A: Run Admin Dashboard Separately ⭐ RECOMMENDED
- Admin dashboard runs on separate entry point
- No changes to main App.tsx
- Complete isolation from main app
- Ideal for testing & independent deployment

### Option B: Integrate into Main App.tsx
- Admin routes nested in main app
- Single entry point
- Shared authentication
- Requires converting App.tsx to React Router

---

## 🚀 Option A: Separate Admin App (RECOMMENDED)

### Step 1: Update vite.config.ts

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        admin: './admin.html', // Add admin entry
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
```

### Step 2: Create admin.html

```html
<!-- admin.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LowveldHub - Admin Dashboard</title>
  </head>
  <body>
    <div id="admin-root"></div>
    <script type="module" src="/index-admin.tsx"></script>
  </body>
</html>
```

### Step 3: Update index-admin.tsx

```typescript
// index-admin.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './AdminApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('admin-root')!).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>,
)
```

### Step 4: Run Both Apps

```bash
# Main app
npm run dev
# Access: http://localhost:3000

# Admin app (in separate terminal if needed)
# Access: http://localhost:3000/admin (with vite-plugin-spa fallback)
# Or: http://localhost:5174 (if vite uses different port for admin entry)
```

**Advantages:**
✅ No changes to main App.tsx  
✅ Independent deployment  
✅ Isolated testing  
✅ Separate performance profile  

---

## 🔀 Option B: Integrate into Main App.tsx

### Step 1: Install React Router in Main App

```bash
npm install react-router-dom
```

### Step 2: Update App.tsx

Add this at the top of App.tsx after imports:

```typescript
// Add these imports at top of App.tsx
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import Businesses from './pages/admin/Businesses'
import { isAuthenticated } from './src/utils/auth'

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
```

### Step 3: Wrap Main App in BrowserRouter

Replace the main return statement in App.tsx:

```typescript
// OLD: Just your component JSX
return (
  <div className="...">
    {/* existing JSX */}
  </div>
)

// NEW: Wrap in Router
return (
  <BrowserRouter>
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="businesses" element={<Businesses />} />
        <Route path="" element={<Navigate to="dashboard" />} />
      </Route>
      
      {/* Main App Routes */}
      <Route path="*" element={
        <div className="...">
          {/* existing main JSX */}
        </div>
      } />
    </Routes>
  </BrowserRouter>
)
```

### Step 4: Update Navigation

Replace `handleNavigate()` calls to admin pages with React Router:

```typescript
// OLD (if using handleNavigate for admin)
handleNavigate('admin-dashboard')

// NEW (use React Router)
import { useNavigate } from 'react-router-dom'
const navigate = useNavigate()
navigate('/admin/dashboard')
```

**Advantages:**
✅ Single entry point  
✅ Shared authentication  
✅ Combined deployment  
✅ Unified routing  

**Disadvantages:**
❌ Modifies main App.tsx  
❌ Larger main bundle  
❌ Mixed routing patterns  

---

## 🔐 Authentication Integration

### Ensure Auth Flow Works

**index.tsx or App.tsx login handler:**

```typescript
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    
    // Store token
    setToken(response.data.token)
    
    // Store user data
    setUser(response.data.user)
    
    // Redirect to admin dashboard
    if (isAdminUser()) {
      navigate('/admin/dashboard') // React Router
      // OR handleNavigate('admin-dashboard') // Your current navigation
    } else {
      navigate('/home') // Main app
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
```

---

## 🧪 Testing the Integration

### Test Scenario 1: Admin Access
```
1. Login with admin credentials
2. Navigate to /admin/dashboard
3. Should see stats cards
4. Should see users list
5. Should see business cards
6. Should be able to verify/feature
```

### Test Scenario 2: Protected Routes
```
1. Without login, try /admin/dashboard
2. Should redirect to /login
3. After login, /admin/dashboard works
```

### Test Scenario 3: Token Refresh
```
1. Login and get token
2. Wait for token expiration
3. API call should redirect to login
4. Re-login to restore access
```

---

## 🚨 Common Issues

### Issue 1: "Cannot find module AdminLayout"
**Solution:** Check import path
```typescript
// Correct
import AdminLayout from './pages/admin/AdminLayout'

// Wrong
import AdminLayout from '@/pages/admin/AdminLayout' // Check if @ alias works
```

### Issue 2: "useNavigate not available"
**Solution:** Make sure component is inside BrowserRouter
```typescript
// Must be inside BrowserRouter context
<BrowserRouter>
  <YourComponent /> {/* Can use useNavigate here */}
</BrowserRouter>
```

### Issue 3: "Token not auto-added to requests"
**Solution:** Ensure api.ts is imported in pages
```typescript
// At top of Users.tsx, Dashboard.tsx, Businesses.tsx
import api from '@/src/services/api'
```

### Issue 4: "Axios interceptor not working"
**Solution:** Check api.ts setup
```typescript
// api.ts should have:
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## 📊 Architecture After Integration

```
User
  ↓
Login (/login)
  ↓
Authenticated?
  ├─ YES → Store JWT in localStorage
  │         ↓
  │         Admin? → /admin/dashboard (Option B) or separate app (Option A)
  │         Main user? → /home
  │
  └─ NO → Redirect to /login
```

---

## 🔄 API URL Configuration

### Development
```typescript
// src/services/api.ts
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})
```

### Production
```typescript
// When deploying, update:
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.yourdomain.com/api',
})
```

Then set environment variable:
```bash
# .env or .env.production
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

## 📦 Build Configuration

### For Option A (Separate App)

```bash
# Build main app
npm run build
# Output: dist/main-xyz.js

# Build admin app
npm run build
# Output: dist/admin-xyz.js

# Deploy both
# Main: /
# Admin: /admin/
```

### For Option B (Integrated)

```bash
# Single build
npm run build
# Output: dist/index-xyz.js (contains both)

# Deploy single bundle
# All routes under: /
```

---

## 🎯 Deployment Steps

### Option A: Separate Admin Dashboard

**Step 1:** Build both versions
```bash
npm run build
```

**Step 2:** Deploy to static hosting
```
Hosting:
  /index.html       → Main app (for http://yourdomain.com)
  /admin.html       → Admin app (for http://yourdomain.com/admin)
  /admin.js         → Admin bundle
  /main.js          → Main bundle
```

**Step 3:** Update API URL
- Update `src/services/api.ts` baseURL to production
- Rebuild and redeploy

### Option B: Integrated Dashboard

**Step 1:** Build once
```bash
npm run build
```

**Step 2:** Deploy single bundle
```
Hosting:
  /index.html       → SPA (handles all routes)
  /bundle.js        → Combined code
```

---

## ✅ Integration Checklist

### Option A (Separate App)
- [ ] admin.html created
- [ ] vite.config.ts updated with dual entries
- [ ] index-admin.tsx configured
- [ ] Can access http://localhost:3000/admin
- [ ] Can access http://localhost:3000/ (main app)
- [ ] Token management works in admin app
- [ ] API calls work with JWT

### Option B (Integrated)
- [ ] React Router installed
- [ ] AdminLayout imported in App.tsx
- [ ] BrowserRouter wrapper added
- [ ] Protected routes configured
- [ ] handleNavigate updated for admin routes
- [ ] Can access /admin/dashboard (protected)
- [ ] Redirects to login when not authenticated
- [ ] Token management works across both apps

---

## 🎓 Examples

### Example 1: Login then Access Admin Dashboard

```typescript
// user@example.com logs in
POST /api/auth/login → { token: "eyJ..." }

// Store token
localStorage.setItem('adminToken', token)

// Access admin dashboard
navigate('/admin/dashboard')

// API call is made
GET /admin/users
Headers: { Authorization: "Bearer eyJ..." }

// Response received
{ users: [...], success: true }
```

### Example 2: Token Expires, Auto Redirect

```typescript
// User is on /admin/businesses
// Makes API call

GET /admin/businesses-list
Headers: { Authorization: "Bearer eyJ..." }

// Response
{ error: "Token expired", status: 401 }

// Axios interceptor catches 401
// Clears localStorage
// Redirects to /login

// User sees login page
```

---

## 🚀 Final Recommendation

**For most cases: Use Option A (Separate App)**

Why:
- ✅ No changes to main App.tsx
- ✅ Independent testing
- ✅ Faster development
- ✅ Easy to iterate
- ✅ Can be deployed separately
- ✅ Clear separation of concerns

Switch to Option B only if:
- You need a single unified app
- You're already using React Router
- You want combined deployment
- You need shared UI components

---

## 🤝 Support

**Need help?**
- Check Option A setup (easier)
- Verify backend running on :5000
- Check browser DevTools for API errors
- Ensure JWT token in localStorage
- Check admin routes mounted on backend

---

**Integration Guide Created:** January 27, 2026  
**Status:** ✅ Ready to Implement  
**Estimated Time:** 15-30 minutes
