# Quick Start: Testing Authentication System

**Status:** ✅ Frontend built and ready  
**Backend:** Ready to test (needs to be running)  
**Frontend:** Compiled to dist/ (npm run dev to test)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Start Backend
```bash
cd backend
npm run build
node dist/server.js
```

Expected output:
```
✓ Database connected
✓ Server listening on port 5000
✓ Health endpoint: GET /health → { status: "ok", timestamp: "..." }
```

### Step 2: Start Frontend (Different Terminal)
```bash
npm run dev
```

Expected output:
```
VITE v6.4.1 ready in XXX ms

➜  Local:   http://localhost:3000/
```

### Step 3: Test in Browser
1. Navigate to http://localhost:3000
2. Click "Sign In" or "Create Account"
3. Follow the testing scenarios below

---

## 🧪 Testing Scenarios

### ✅ Scenario 1: Login with Demo Account
**Goal:** Verify backend authentication works

**Steps:**
1. Open http://localhost:3000
2. Click "Sign In" (should show LoginPage)
3. Enter email: `admin@lowveld.co.za`
4. Enter password: `lowveld2026`
5. Click "Sign In" button

**Expected Result:**
- ✅ Loading spinner shows briefly
- ✅ Redirected to dashboard
- ✅ Dashboard shows "Welcome Admin"
- ✅ Token stored in localStorage (F12 → Application → Local Storage → "token")

**Actual Result:**
- [ ] Same as expected
- [ ] Error message: ______________________
- [ ] Other: ______________________

---

### ❌ Scenario 2: Login with Wrong Password
**Goal:** Verify invalid credentials are rejected

**Steps:**
1. Open http://localhost:3000
2. Click "Sign In"
3. Enter email: `admin@lowveld.co.za`
4. Enter password: `wrongpassword`
5. Click "Sign In" button

**Expected Result:**
- ✅ Error message appears (red background)
- ✅ Message: "Invalid email or password. For demo, try: admin@lowveld.co.za / lowveld2026"
- ✅ No dashboard access
- ✅ No token stored in localStorage

**Actual Result:**
- [ ] Same as expected
- [ ] Error message: ______________________
- [ ] Other: ______________________

---

### ❌ Scenario 3: Login with Nonexistent Email
**Goal:** Verify nonexistent users are rejected

**Steps:**
1. Open http://localhost:3000
2. Click "Sign In"
3. Enter email: `nonexistent@example.com`
4. Enter password: `anypassword`
5. Click "Sign In" button

**Expected Result:**
- ✅ Error message appears
- ✅ Message: "Invalid email or password. For demo, try: admin@lowveld.co.za / lowveld2026"
- ✅ No dashboard access

**Actual Result:**
- [ ] Same as expected
- [ ] Other: ______________________

---

### 📝 Scenario 4: Create New Account (Signup)
**Goal:** Verify signup form works and creates user

**Steps:**
1. Open http://localhost:3000
2. Click "Create Account"
3. Enter first name: `John`
4. Enter email: `john@example.com`
5. Enter password: `Test12345`
6. Confirm password: `Test12345`
7. Click "Create Account" button

**Expected Result:**
- ✅ Loading spinner shows
- ✅ Success message: "Account created successfully! Redirecting to sign in..."
- ✅ After 2 seconds, redirected to login page
- ✅ Token stored in localStorage

**Actual Result:**
- [ ] Same as expected
- [ ] Error message: ______________________
- [ ] Other: ______________________

---

### ✅ Scenario 5: Login with New Account
**Goal:** Verify newly created account can log in

**Steps:**
1. From previous scenario, redirected to login page
2. Enter email: `john@example.com`
3. Enter password: `Test12345`
4. Click "Sign In" button

**Expected Result:**
- ✅ Loading spinner shows
- ✅ Redirected to dashboard
- ✅ Dashboard shows "Welcome John"
- ✅ Token stored in localStorage

**Actual Result:**
- [ ] Same as expected
- [ ] Error message: ______________________
- [ ] Other: ______________________

---

### ❌ Scenario 6: Backend Connection Failed
**Goal:** Verify clear error if backend is not running

**Steps:**
1. Stop backend (`Ctrl+C` in backend terminal)
2. Open http://localhost:3000 (or refresh)
3. Click "Sign In"
4. Enter email: `admin@lowveld.co.za`
5. Enter password: `lowveld2026`
6. Click "Sign In" button

**Expected Result:**
- ✅ Error message appears
- ✅ Message: "Backend connection failed. Ensure server is running at http://localhost:5000"
- ✅ No dashboard access
- ✅ No fake login

**Actual Result:**
- [ ] Same as expected
- [ ] Other: ______________________

---

### 🔓 Scenario 7: Logout & Redirect
**Goal:** Verify logout clears auth and shows login page

**Steps:**
1. Login with demo account (admin@lowveld.co.za / lowveld2026)
2. Dashboard shows
3. Click "Logout" button (top-right)
4. Verify page state

**Expected Result:**
- ✅ Token removed from localStorage
- ✅ Redirected to login page
- ✅ Dashboard not accessible

**Actual Result:**
- [ ] Same as expected
- [ ] Other: ______________________

---

## 🔍 Browser DevTools Testing

### Check localStorage
1. F12 (Open DevTools)
2. Go to "Application" tab
3. Left sidebar → "Local Storage"
4. Click "http://localhost:3000"
5. Look for `token` key
6. Copy token value (it's a JWT)

### Decode JWT Token
1. Go to https://jwt.io
2. Paste your token in "Encoded" box
3. Should see payload with:
   - `id`: User ID (number)
   - `email`: User email (string)
   - `role`: "admin" or "user"
   - `iat`: Issued at (timestamp)
   - `exp`: Expiration (timestamp)

### Check Network Requests
1. F12 (Open DevTools)
2. Go to "Network" tab
3. Try login
4. Look for `POST` request to `/api/auth/login`
5. Click request → "Response" tab
6. Should see:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@lowveld.co.za",
    "firstName": "Admin",
    "role": "admin"
  }
}
```

---

## 📋 Validation Checklist

### LoginPage UI
- [ ] Header: "LowveldHub / Verified businesses. Exclusive connections."
- [ ] Email input with Mail icon
- [ ] Password input with Lock icon
- [ ] Show/hide password toggle (Eye icon)
- [ ] Sign In button (gold background)
- [ ] Forgot Password? link
- [ ] Create Account link
- [ ] Footer: Mission statement + copyright
- [ ] No two-column layout (no hero section on left)
- [ ] No "The Lowveld's Elite Network" large heading

### SignupPage UI
- [ ] Header: "LowveldHub / Verified businesses. Exclusive connections."
- [ ] First Name input
- [ ] Email input
- [ ] Password input with show/hide toggle
- [ ] Confirm Password input
- [ ] Create Account button
- [ ] Sign In link for existing users
- [ ] Footer: Mission statement + copyright

### Form Validation
- [ ] Email validation: Rejects invalid format
- [ ] Password validation: Requires 8+ characters
- [ ] Password match: Requires confirmation to match
- [ ] Error messages: Clear and helpful
- [ ] Success messages: Green with checkmark icon

### Security
- [ ] No demo fallback mode
- [ ] Backend validation required
- [ ] JWT token stored in localStorage
- [ ] Token sent in API requests
- [ ] Dashboard checks for token
- [ ] Invalid credentials rejected
- [ ] Wrong password rejected
- [ ] Nonexistent user rejected

---

## 🐛 Troubleshooting

### Issue: "Backend connection failed"
**Possible Causes:**
- Backend not running
- Backend on different port
- CORS not configured
- Network issue

**Solution:**
```bash
# Check if backend is running
lsof -i :5000  # macOS/Linux
Get-Process -Name node  # Windows

# Restart backend
cd backend
npm run build
node dist/server.js
```

### Issue: "Invalid email or password" (With correct credentials)
**Possible Causes:**
- Backend not properly initialized
- Database not connected
- Test account not created

**Solution:**
```bash
# In backend directory
npm run migrate  # Initialize database
npm run seed     # Create test accounts
```

### Issue: "Cannot find token in localStorage"
**Possible Causes:**
- Login failed silently
- JavaScript error preventing storage
- Private/Incognito mode blocking storage

**Solution:**
1. Check browser console (F12 → Console tab)
2. Look for error messages
3. Try in non-private window
4. Clear browser cache and reload

### Issue: "Dashboard doesn't appear after login"
**Possible Causes:**
- App.tsx not checking authentication
- Navigation not working
- Component rendering error

**Solution:**
1. Check browser console for errors
2. Verify `isAuthenticated` state in App.tsx
3. Try logout and login again

---

## 📞 API Debugging

### Test Login Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@lowveld.co.za",
    "password": "lowveld2026"
  }'
```

Expected response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@lowveld.co.za",
    "firstName": "Admin",
    "role": "admin"
  }
}
```

### Test Signup Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Test12345",
    "firstName": "New",
    "lastName": "User"
  }'
```

Expected response (201):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "firstName": "New"
  }
}
```

---

## ✅ Sign-Off

All tests passed: [ ]

Date: _______________

Tester: _______________

Notes:
_______________________________________________________________

---

**Ready for Production Deployment**
