# 🚀 ADMIN ROUTES - QUICK START GUIDE

**Status:** ✅ Complete  
**Backend:** Running on port 5000

---

## 🎯 4 New Admin Endpoints Added

### 1️⃣ GET All Users
```
GET /api/admin/users
```
Returns list of all registered users

### 2️⃣ GET All Businesses
```
GET /api/admin/businesses-list
```
Returns list of all business listings with owner details

### 3️⃣ Verify a Business
```
PATCH /api/admin/business/1/verify
```
(Replace `1` with business ID)

Marks business as verified and active

### 4️⃣ Feature a Business
```
PATCH /api/admin/business/1/feature
```
(Replace `1` with business ID)

Marks business as featured on homepage

---

## 🔐 Authentication Required

All endpoints require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📍 File Modified

**`backend/src/routes/adminRoutes.ts`**

Added 4 new endpoints with:
- ✅ PostgreSQL queries
- ✅ Error handling
- ✅ Authentication check
- ✅ Proper HTTP responses

---

## 🧪 Test Commands

### Get Token First
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lowveldhub.com","password":"password123"}'
```

### Then Test Endpoints
```bash
# Get users
curl http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get businesses
curl http://localhost:5000/api/admin/businesses-list \
  -H "Authorization: Bearer YOUR_TOKEN"

# Verify business
curl -X PATCH http://localhost:5000/api/admin/business/1/verify \
  -H "Authorization: Bearer YOUR_TOKEN"

# Feature business
curl -X PATCH http://localhost:5000/api/admin/business/1/feature \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ✅ Ready to Go

Backend is running and all admin routes are mounted.

**Next:** Connect these endpoints to your frontend admin dashboard!

---

*January 27, 2026*
