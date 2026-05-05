# 🚀 BACKEND QUICK START GUIDE

**Status:** ✅ Backend is running on port 5000

---

## ✅ What's Done

✅ Database configured (PostgreSQL - LowveldHub)  
✅ All migrations executed (6 tables created)  
✅ Backend server running (Express.js on port 5000)  
✅ All routes mounted and ready  
✅ Security middleware active  
✅ JWT authentication configured  

---

## 🎯 Current Setup

### Database Connection
```
Host: localhost
Port: 5432
Database: lowveldhub
User: postgres
Password: @Queen000
```

### Backend Server
```
URL: http://localhost:5000
Environment: development
Status: RUNNING ✅
```

---

## 📊 Available API Routes

### Authentication
```
POST   /api/auth/register        - Create new user
POST   /api/auth/login           - User login
POST   /api/auth/refresh-token   - Refresh JWT
POST   /api/auth/verify-email    - Verify email
POST   /api/auth/password-reset  - Reset password
```

### Businesses (Listings)
```
GET    /api/businesses           - List all businesses
GET    /api/businesses/:id       - Get business details
POST   /api/businesses           - Create new listing (auth required)
PUT    /api/businesses/:id       - Update listing (auth required)
DELETE /api/businesses/:id       - Delete listing (admin)
```

### Reviews
```
GET    /api/reviews              - Get reviews
POST   /api/reviews              - Create review (auth required)
GET    /api/reviews?business_id=X - Reviews for business
```

### Favorites
```
GET    /api/favorites            - Get user favorites (auth required)
POST   /api/favorites            - Add to favorites (auth required)
DELETE /api/favorites/:id        - Remove favorite (auth required)
```

### Enquiries
```
POST   /api/enquiries            - Create enquiry (auth required)
GET    /api/enquiries            - Get enquiries (admin)
```

### Admin
```
GET    /api/admin/businesses     - Unverified listings queue (admin)
PATCH  /api/admin/businesses/:id/verify - Approve listing (admin)
PATCH  /api/admin/businesses/:id/suspend - Suspend listing (admin)
```

### Subscriptions
```
GET    /api/subscriptions/user   - Get user subscription (auth required)
POST   /api/subscriptions/upgrade - Upgrade tier (auth required)
```

### Health
```
GET    /health                   - Server health check
```

---

## 🔑 Key Features Active

✅ **JWT Authentication** - Secure API endpoints  
✅ **CORS** - Frontend communication enabled (port 3000)  
✅ **Rate Limiting** - Protection against abuse  
✅ **Request Logging** - All API calls logged with duration  
✅ **Error Handling** - Global error handler configured  
✅ **Security Headers** - Helmet.js enabled  
✅ **Body Validation** - express-validator ready  
✅ **Database Pool** - Connection pooling enabled  

---

## 📝 Database Tables

```sql
users              - User accounts & authentication
businesses         - Business listings & directory data
admins             - Admin user management
admin_logs         - Audit trail for admin actions
subscriptions      - Listing tier subscriptions
payments           - Payment/billing records
```

---

## 🧪 Testing the Backend

### 1. Health Check
```bash
curl http://localhost:5000/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@lowveldhub.com",
    "password": "Test@123456",
    "fullName": "Test User"
  }'
```

### 3. Get Businesses
```bash
curl http://localhost:5000/api/businesses
```

### 4. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@lowveldhub.com",
    "password": "Test@123456"
  }'
```

---

## 🛠️ Common Commands

### Start Backend
```bash
cd backend
npm run dev
```

### Stop Backend
```bash
Ctrl+C (in terminal)
```

### View Server Logs
```bash
tail -f server-test.log  # (if logging to file)
```

### Rebuild After Changes
```bash
cd backend
npm run build
npm run start
```

### Reset Database
```bash
cd backend
npm run migrate  # Re-run migrations
```

---

## 📌 Environment Variables

File: `backend/.env`

```env
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=lowveldhub
DB_USER=postgres
DB_PASSWORD=@Queen000

JWT_SECRET=9vX$4mT8!qP#2rL7bY@1zK5wF^3jD6uN
```

⚠️ **Note:** Change `JWT_SECRET` in production!

---

## 🚀 Next: Start Frontend

```bash
# In root directory
npm run dev
```

Frontend will run on: `http://localhost:3000`

Both backend and frontend can communicate seamlessly.

---

## ✅ Checklist

- [x] Database created & configured
- [x] Migrations executed successfully
- [x] Backend server running
- [x] All routes mounted
- [x] Security middleware active
- [x] Health check passing
- [x] Ready for frontend integration

---

**Status:** 🟢 **OPERATIONAL**

Backend is fully functional and ready for use!
