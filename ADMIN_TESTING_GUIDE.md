# 🧪 ADMIN DASHBOARD - TESTING & TROUBLESHOOTING GUIDE

**Version:** 1.0  
**Last Updated:** January 27, 2026  
**Status:** Ready for Testing

---

## 🚀 Pre-Testing Checklist

Before you start testing, verify:

- [ ] Backend running: `http://localhost:5000/health`
- [ ] PostgreSQL running on localhost:5432
- [ ] Frontend dev server running: `npm run dev`
- [ ] No error messages in backend console
- [ ] No error messages in frontend console
- [ ] Have a test user account (email + password)

---

## 📋 Test Plan

### Phase 1: Backend Verification
### Phase 2: Authentication Testing
### Phase 3: Admin Dashboard Pages
### Phase 4: Admin Actions
### Phase 5: Error Scenarios

---

## ✅ Phase 1: Backend Verification

### Test 1.1: Backend Health Check
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-27T10:30:45.123Z"
}
```

**If Failed:**
- Ensure backend is running: `npm run dev` in `/backend` folder
- Check PostgreSQL is running
- Verify port 5000 is not in use: `lsof -i :5000`
- Check backend console for errors

---

### Test 1.2: Admin Routes Exist
```bash
# Test if admin routes are mounted (should 401 without token)
curl http://localhost:5000/api/admin/users

# Expected: { error: "Unauthorized", status: 401 }
```

**If Failed:**
- Check if adminRoutes.ts is imported in backend/src/server.ts
- Verify route mounting: `app.use('/api/admin', adminRoutes)`
- Restart backend server

---

## ✅ Phase 2: Authentication Testing

### Test 2.1: User Registration

```bash
# Create a test user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Test123!@",
    "name": "Admin User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "email": "admin@test.com", "name": "Admin User" }
}
```

**If Failed:**
- Check password requirements
- Verify email doesn't already exist
- Check PostgreSQL for user table
- Look for validation errors in response

---

### Test 2.2: User Login

```bash
# Login with created user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Test123!@"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "email": "admin@test.com" }
}
```

**If Failed:**
- Verify email & password are correct
- Check if user exists in database
- Verify JWT_SECRET is set in backend .env
- Look for bcrypt/password hash errors

---

### Test 2.3: Token Storage

In browser console (DevTools):

```javascript
// Store the token from login response
localStorage.setItem('adminToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

// Verify it's stored
localStorage.getItem('adminToken');
// Should return: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**If Failed:**
- Check if localStorage is enabled in browser
- Verify key is exactly 'adminToken'
- Check DevTools Storage tab for saved data

---

## ✅ Phase 3: Admin Dashboard Pages

### Test 3.1: Access Dashboard

1. **Prerequisites:**
   - JWT token stored in localStorage
   - Backend running
   - Frontend dev server running

2. **Navigate to:** `http://localhost:3000/admin/dashboard`

3. **Expected Result:**
   - Dashboard loads
   - Sidebar shows 4 navigation links
   - Stats cards display (may show 0 if no data)
   - No console errors

4. **If Failed:**
   ```javascript
   // Debug in console:
   localStorage.getItem('adminToken') // Should return token
   
   // Check if router is working:
   window.location.pathname // Should be /admin/dashboard
   ```

---

### Test 3.2: Dashboard Stats Display

**Expected Dashboard Stats:**
```
Users: [number]
Businesses: [number]
Verified Businesses: [number]
Featured Businesses: [number]
```

**If Stats Show 0:**
- Check if users exist in database: `SELECT COUNT(*) FROM users;`
- Check if businesses exist in database: `SELECT COUNT(*) FROM businesses;`
- Verify `/api/admin/users` endpoint returns data

**If Stats Don't Load:**
- Check DevTools Network tab for failed requests
- Verify JWT token is valid
- Check backend console for errors
- Check if database connection is active

---

### Test 3.3: Navigate to Users Page

1. **Click "Users" in sidebar**
2. **Expected Result:**
   - URL changes to `/admin/users`
   - Users table loads
   - Shows columns: Name, Email, Phone, Business, Verified, Joined

3. **If Table is Empty:**
   - Check database: `SELECT * FROM users;`
   - Verify API endpoint: `curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/admin/users`
   - Check DevTools Network tab for API response

---

### Test 3.4: Navigate to Businesses Page

1. **Click "Businesses" in sidebar**
2. **Expected Result:**
   - URL changes to `/admin/businesses`
   - Business cards load in grid
   - Each card shows: Name, Owner, Location, Rating, Status badges

3. **If Cards Don't Load:**
   - Check database: `SELECT COUNT(*) FROM businesses;`
   - Verify API: `curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/admin/businesses-list`
   - Look for errors in DevTools Console

---

## ✅ Phase 4: Admin Actions

### Test 4.1: Verify Business Button

1. **On Businesses page, find a business card**
2. **Click "Verify" button**
3. **Expected Behavior:**
   - Button shows "Loading..."
   - API call to `PATCH /admin/business/:id/verify`
   - Business status updates to "Verified"
   - Success message appears
   - Card refreshes with verified badge

**Test in Console:**
```bash
# Verify a business directly
curl -X PATCH http://localhost:5000/api/admin/business/BUSINESS_ID/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Business verified",
  "data": { "id": "...", "verified": true }
}
```

**If Failed:**
- Check if business exists: `SELECT * FROM businesses WHERE id = 'BUSINESS_ID';`
- Verify JWT token is valid
- Check backend logs for error details
- Ensure PATCH endpoint is implemented

---

### Test 4.2: Feature Business Button

1. **On Businesses page, find a business card**
2. **Click "Feature" button**
3. **Expected Behavior:**
   - Button shows "Loading..."
   - API call to `PATCH /admin/business/:id/feature`
   - Business status updates
   - Featured badge appears
   - Page refreshes

**Test in Console:**
```bash
curl -X PATCH http://localhost:5000/api/admin/business/BUSINESS_ID/feature \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Business featured",
  "data": { "id": "...", "featured": true }
}
```

**If Failed:**
- Check if business exists
- Verify JWT is valid
- Check backend endpoint implementation
- Review error message in response

---

### Test 4.3: Logout Functionality

1. **Click logout button (top right corner)**
2. **Expected Behavior:**
   - Token removed from localStorage
   - Page redirects to login
   - Cannot access `/admin/dashboard` anymore

**Test in Console:**
```javascript
// Before logout
localStorage.getItem('adminToken') // Returns token

// Click logout

// After logout
localStorage.getItem('adminToken') // Returns null
```

**If Failed:**
- Check if logout() function is called
- Verify removeToken() clears localStorage
- Check if redirect happens

---

## ⚠️ Phase 5: Error Scenarios

### Scenario 5.1: Expired Token

1. **Wait for token to expire** (or modify exp claim in JWT)
2. **Make an API call from dashboard**
3. **Expected Result:**
   - API returns 401 Unauthorized
   - Page redirects to login
   - Token cleared from localStorage

**Simulate in Console:**
```javascript
// Clear token to simulate expiration
localStorage.removeItem('adminToken');

// Try accessing admin dashboard
window.location.href = '/admin/dashboard';
// Should redirect to login
```

---

### Scenario 5.2: No JWT Token

1. **Clear localStorage:**
   ```javascript
   localStorage.clear();
   ```

2. **Try accessing `/admin/dashboard`**
3. **Expected Result:**
   - Page redirects to `/login`
   - Cannot access protected routes

---

### Scenario 5.3: Invalid Token

1. **Set invalid token:**
   ```javascript
   localStorage.setItem('adminToken', 'invalid.token.here');
   ```

2. **Try loading dashboard**
3. **Expected Result:**
   - API calls fail with 401
   - Redirect to login
   - Error message in console

---

### Scenario 5.4: Backend Connection Error

1. **Stop backend server:**
   ```bash
   # Kill backend process
   ```

2. **Try loading dashboard**
3. **Expected Result:**
   - API calls fail (Connection refused)
   - Error message in console: "Network Error"
   - Page shows error state

**Resume Backend:**
```bash
npm run dev # in /backend folder
```

---

### Scenario 5.5: Database Connection Error

1. **Stop PostgreSQL**
2. **Try refreshing dashboard**
3. **Expected Result:**
   - API calls fail
   - Error message: "Database connection failed"
   - Stats cards show error state

**Check DB Connection:**
```bash
# Connect to PostgreSQL
psql -h localhost -U postgres -d lowveldhub

# If fails, restart PostgreSQL
```

---

## 🔍 Debugging Guide

### Enable Console Logging

Add to api.ts:
```typescript
api.interceptors.request.use((config) => {
  console.log('📤 Request:', config.url, config.method)
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.data)
    return response
  },
  (error) => {
    console.error('❌ Error:', error.response?.status, error.message)
    return Promise.reject(error)
  }
)
```

### Common Debug Commands

**Check Token:**
```javascript
localStorage.getItem('adminToken')
```

**Check Auth Status:**
```javascript
// In browser console
import { isAuthenticated } from './src/utils/auth'
isAuthenticated() // true or false
```

**Test API Call:**
```javascript
import api from './src/services/api'
api.get('/admin/users').then(res => console.log(res.data))
```

**Monitor Network:**
- Open DevTools → Network tab
- Filter by XHR/Fetch
- Check request headers for Authorization
- Check response status codes

**Monitor Storage:**
- DevTools → Application → Storage → Local Storage
- Look for 'adminToken'
- Check value is valid JWT

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Unauthorized" error | No/invalid token | Login again, check localStorage |
| "Cannot GET /admin/..." | Route not found | Check vite.config for SPA fallback |
| Stats show 0 | No data in DB | Insert test data into database |
| Table empty | Query fails | Check API endpoint, verify JWT |
| Buttons not responding | API call failing | Check backend logs, verify JWT |
| Logout doesn't work | Function not called | Check onClick handler |
| Page redirects to login | Auth check fails | Verify token valid, check auth util |
| "Network Error" | Backend not running | Start backend: `npm run dev` in /backend |
| Database errors | DB not running | Start PostgreSQL, check connection |
| Styles don't load | CSS import missing | Check AdminLayout.css import |

---

## 📊 Test Results Template

```markdown
## Admin Dashboard Test Results

**Date:** [Today]
**Tester:** [Your Name]

### Phase 1: Backend ✅ / ❌
- [ ] Health check passes
- [ ] Admin routes accessible
- [ ] Authentication works

### Phase 2: Auth ✅ / ❌
- [ ] User registration works
- [ ] User login works
- [ ] Token storage works

### Phase 3: Pages ✅ / ❌
- [ ] Dashboard loads
- [ ] Users page loads
- [ ] Businesses page loads

### Phase 4: Actions ✅ / ❌
- [ ] Verify button works
- [ ] Feature button works
- [ ] Logout works

### Phase 5: Errors ✅ / ❌
- [ ] Expired token handled
- [ ] No token handled
- [ ] Invalid token handled
- [ ] Backend error handled
- [ ] Database error handled

### Issues Found
1. [Issue 1]
2. [Issue 2]
...

### Status
- **Overall:** ✅ PASS / ❌ FAIL
- **Ready for Deployment:** YES / NO
```

---

## 📞 Getting Help

**If tests fail:**

1. **Check backend:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Check database:**
   ```bash
   psql -h localhost -U postgres -d lowveldhub -c "SELECT COUNT(*) FROM users;"
   ```

3. **Check frontend console:**
   - DevTools F12 → Console
   - Look for red error messages

4. **Check network calls:**
   - DevTools F12 → Network
   - Look for failed requests (red)

5. **Restart everything:**
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   npm run dev
   ```

---

## ✅ Sign-Off Checklist

When all tests pass:

- [ ] All 5 phases completed
- [ ] No console errors
- [ ] All API calls successful
- [ ] Token management working
- [ ] Protected routes enforced
- [ ] Admin actions functional
- [ ] Database integration working
- [ ] Error handling tested
- [ ] Ready for integration
- [ ] Ready for deployment

---

**Testing Guide Created:** January 27, 2026  
**Version:** 1.0  
**Status:** ✅ Complete

Good luck with testing! 🚀
