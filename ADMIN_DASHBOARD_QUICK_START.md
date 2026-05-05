# 🚀 ADMIN DASHBOARD - QUICK START GUIDE

## ⚡ 30-Second Setup

```bash
# Backend is already running on port 5000
# Frontend components are already created
# Just start the dev server:
npm run dev
```

---

## 🎯 Access Admin Dashboard

### URL Path
```
http://localhost:3000/admin/dashboard
```

### Required
- Must be logged in (JWT token in localStorage)
- Token automatically added to all API calls

---

## 📍 Admin Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/admin/dashboard` | Stats & overview |
| Users | `/admin/users` | All users table |
| Businesses | `/admin/businesses` | Business cards + actions |

---

## 🔑 How to Get Admin Access

```javascript
// 1. Login via main app
POST /api/auth/login
body: { email, password }
response: { token: "eyJ..." }

// 2. Token is stored automatically
localStorage.setItem('adminToken', token)

// 3. Access admin dashboard
Navigate to: http://localhost:3000/admin/dashboard
```

---

## ✨ Key Features

### Dashboard
- 📊 4 Stats Cards (Users, Businesses, Verified, Featured)
- ⚡ Quick Actions (5 items)
- 🔋 System Status (Backend, DB, Auth, Cache)

### Users Page
- 👥 Complete user list in table
- Columns: Name, Email, Phone, Business, Verified, Joined

### Businesses Page
- 🏢 Business cards in grid layout
- ✅ **Verify Button** → marks business as verified
- ⭐ **Feature Button** → marks business as featured
- Status indicators: Verified, Featured, Tier

---

## 🔗 API Endpoints (Auto-Connected)

```
GET  /admin/users                → Fetch all users
GET  /admin/businesses-list      → Fetch all businesses
PATCH /admin/business/:id/verify → Verify a business
PATCH /admin/business/:id/feature → Feature a business
```

All requests **automatically include JWT token** via Axios interceptors.

---

## 🎨 Design

**Theme:** Luxury Gold & Black  
**Colors:**
- Primary: Gold (#d4af37)
- Background: Dark (#1a1a1a)
- Cards: White (#ffffff)

**Components:**
- Premium sidebar navigation
- Smooth hover effects
- Loading states on buttons
- Success notifications
- Responsive layout

---

## 🧪 Quick Test

1. **Start backend** (already running on :5000)
2. **Start frontend** `npm run dev` (Vite on :3000)
3. **Get JWT token:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@test.com","password":"password123"}'
   ```
4. **Set token in browser console:**
   ```javascript
   localStorage.setItem('adminToken', 'your_jwt_token_here');
   ```
5. **Visit:** `http://localhost:3000/admin/dashboard`

---

## 🛑 If You See Errors

### "Token not found"
- Login first
- Check localStorage has 'adminToken'

### "API 404"
- Ensure backend running on :5000
- Check `/api/admin/users` endpoint exists

### "Page blank"
- Open browser DevTools
- Check Console for errors
- Verify JWT token is valid

---

## 📝 File Locations

```
src/utils/auth.ts           ← Token management
src/services/api.ts         ← API client with JWT
pages/admin/AdminLayout.tsx ← Main layout
pages/admin/Dashboard.tsx   ← Dashboard page
pages/admin/Users.tsx       ← Users page
pages/admin/Businesses.tsx  ← Businesses page
AdminApp.tsx                ← Router config
```

---

## 🔑 Key Functions

### Auth (src/utils/auth.ts)
```typescript
getToken()          // Get JWT from storage
setToken(token)     // Store JWT
removeToken()       // Clear JWT
isAuthenticated()   // Check if logged in
logout()            // Clear everything
```

### API (src/services/api.ts)
```typescript
api.get(url)        // GET request (auto-adds token)
api.post(url, data) // POST request (auto-adds token)
api.patch(url, data) // PATCH request (auto-adds token)
```

---

## 💡 Pro Tips

1. **Auto Redirect:** If token expires, auto-redirects to login
2. **Real-time:** Businesses page refreshes after verify/feature
3. **Responsive:** Works on mobile (sidebar collapses)
4. **No Page Reload:** SPA routing, fast navigation
5. **Loading States:** Buttons show "Loading..." while saving

---

## 🎓 Example Code

### Verify Business
```typescript
// In Businesses.tsx
const handleVerifyBusiness = async (businessId: string) => {
  try {
    const response = await api.patch(`/admin/business/${businessId}/verify`);
    if (response.data.success) {
      alert('Business verified!');
      // Refresh list
      fetchBusinesses();
    }
  } catch (error) {
    alert('Error verifying business');
  }
};
```

### Feature Business
```typescript
const handleFeatureBusiness = async (businessId: string) => {
  try {
    const response = await api.patch(`/admin/business/${businessId}/feature`);
    if (response.data.success) {
      alert('Business featured!');
      // Refresh list
      fetchBusinesses();
    }
  } catch (error) {
    alert('Error featuring business');
  }
};
```

---

## ✅ Checklist Before Go-Live

- [ ] Backend running on :5000
- [ ] Frontend dev server running
- [ ] Can login and get JWT token
- [ ] Dashboard loads with stats
- [ ] Users page shows user list
- [ ] Businesses page shows business cards
- [ ] Verify button works (business marked verified)
- [ ] Feature button works (business marked featured)
- [ ] Logout clears session
- [ ] Navigation between pages works
- [ ] No console errors

---

## 🔄 Next Steps

1. **Test Everything** - Follow checklist above
2. **Deploy Backend** - Move to production server
3. **Deploy Frontend** - Build & host on CDN
4. **Update API URL** - Change localhost:5000 to production URL
5. **Add Branding** - Update colors & logo
6. **Monitor Logs** - Watch for errors in production

---

## 📞 Support

**Backend Issues?** Check backend logs on port 5000  
**Frontend Issues?** Check browser DevTools Console  
**API Issues?** Check network tab for response codes  

---

**Status:** ✅ Ready to Test  
**Created:** January 27, 2026  
**Version:** 1.0
