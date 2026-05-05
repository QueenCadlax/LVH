# 🚀 LOWVELDHUB BACKEND IMPLEMENTATION PLAN

**Status:** Frontend Complete ✅ | Backend: Ready to Build 🛠️  
**Date:** January 26, 2026 | **Architecture:** Node.js + Express + PostgreSQL | **Deployment:** Production-Ready

---

## 📋 PHASE 1: PROJECT SETUP (Week 1)

### 1.1 Initialize Backend Project

```bash
# Create backend directory
mkdir lowveldhub-backend
cd lowveldhub-backend

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install express cors dotenv pg axios bcryptjs jsonwebtoken
npm install --save-dev typescript ts-node @types/node @types/express nodemon

# Initialize TypeScript
npx tsc --init
```

### 1.2 Project Structure

```
lowveldhub-backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # PostgreSQL connection
│   │   └── env.ts              # Environment variables
│   ├── controllers/
│   │   ├── authController.ts    # Login, register, verify JWT
│   │   ├── businessController.ts # CRUD for businesses
│   │   ├── userController.ts    # User profile management
│   │   ├── enquiryController.ts # Enquiry handling
│   │   ├── bookingController.ts # Booking management
│   │   ├── searchController.ts  # Smart search
│   │   └── imageController.ts   # Image upload handling
│   ├── models/
│   │   ├── User.ts
│   │   ├── Business.ts
│   │   ├── Enquiry.ts
│   │   ├── Booking.ts
│   │   ├── Review.ts
│   │   └── Image.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── businessRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── enquiryRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   └── searchRoutes.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts    # JWT verification
│   │   ├── errorHandler.ts      # Global error handling
│   │   ├── validation.ts        # Input validation
│   │   └── rateLimiter.ts       # Rate limiting
│   ├── services/
│   │   ├── emailService.ts      # Send emails (nodemailer)
│   │   ├── storageService.ts    # Image upload (AWS S3/Cloudinary)
│   │   ├── searchService.ts     # Elasticsearch or PostgreSQL FTS
│   │   └── aiService.ts         # Gemini API integration
│   ├── utils/
│   │   ├── validators.ts        # Input validation rules
│   │   ├── helpers.ts           # Utility functions
│   │   └── logger.ts            # Logging
│   ├── migrations/
│   │   └── *.sql                # Database schema migrations
│   └── server.ts                # Main app entry point
├── .env
├── .env.example
├── tsconfig.json
├── package.json
└── README.md
```

### 1.3 Environment Setup (.env)

```env
# Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Frontend (CORS)
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lowveldhub
DB_USER=postgres
DB_PASSWORD=your_password

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=30d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
ADMIN_EMAIL=admin@lowveldhub.co.za

# Image Storage
AWS_S3_BUCKET=lowveldhub-images
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
# OR use Cloudinary
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Third-party APIs
GEMINI_API_KEY=your_gemini_key
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PUBLIC_KEY=your_public_key

# Admin Settings
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change_me_in_production
```

---

## 📊 PHASE 2: DATABASE SCHEMA (Week 1)

### 2.1 PostgreSQL Tables

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  profileImage VARCHAR(500),
  
  -- Profile details
  role VARCHAR(50) DEFAULT 'user', -- 'user', 'business', 'admin'
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'suspended', 'inactive'
  
  -- Business owner fields (if role = 'business')
  businessId INT,
  
  -- Preferences
  preferences JSONB DEFAULT '{}',
  
  -- Timestamps
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastLogin TIMESTAMP,
  
  -- Verification
  emailVerified BOOLEAN DEFAULT FALSE,
  phoneVerified BOOLEAN DEFAULT FALSE,
  verificationToken VARCHAR(255),
  
  -- 2FA
  twoFactorEnabled BOOLEAN DEFAULT FALSE,
  twoFactorSecret VARCHAR(255),
  
  CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_uuid ON users(uuid);
```

#### Businesses Table
```sql
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  ownerId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Basic info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  logo VARCHAR(500),
  banner VARCHAR(500),
  
  -- Contact & Location
  email VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(500),
  location VARCHAR(255),
  area VARCHAR(100), -- Must match MPUMALANGA_AREAS
  coordinates POINT, -- latitude, longitude
  
  -- Classification
  category VARCHAR(100) NOT NULL, -- Must match Category enum from frontend
  subcategories VARCHAR(255)[],
  tier VARCHAR(50) DEFAULT 'trial', -- 'trial', 'premium', 'elite', 'platinum'
  
  -- Verification & Trust
  isVerified BOOLEAN DEFAULT FALSE,
  verificationDate TIMESTAMP,
  trustScore FLOAT DEFAULT 0,
  badges VARCHAR(100)[],
  
  -- Business metrics
  rating FLOAT DEFAULT 0,
  reviewCount INT DEFAULT 0,
  views INT DEFAULT 0,
  clicks INT DEFAULT 0,
  
  -- Media
  images VARCHAR(500)[],
  videos VARCHAR(500)[],
  
  -- Pricing & Services
  priceRange JSONB, -- { min: 100, max: 5000 }
  services TEXT[],
  amenities VARCHAR(255)[],
  
  -- Hours of operation
  hours JSONB, -- { mon: "9:00-17:00", tue: "9:00-17:00", ... }
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'suspended', 'pending', 'closed'
  
  -- Timestamps
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT businesses_category_check CHECK (category IN ('eats', 'retail', 'business', 'nightlife', 'real-estate', 'automotive', 'tourism', 'transport', 'healthcare', 'luxury', 'sports', 'education', 'entertainment', 'financial', 'professional-services', 'home-improvement', 'beauty', 'technology', 'agriculture', 'mining', 'manufacturing'))
);

CREATE INDEX idx_businesses_owner ON businesses(ownerId);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_area ON businesses(area);
CREATE INDEX idx_businesses_tier ON businesses(tier);
CREATE INDEX idx_businesses_location ON businesses USING gist(coordinates);
```

#### Reviews & Ratings Table
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  businessId INT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  
  -- Review details
  verified BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0,
  
  -- Media
  images VARCHAR(500)[],
  
  -- Timestamps
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT reviews_one_per_user_business UNIQUE(businessId, userId)
);

CREATE INDEX idx_reviews_business ON reviews(businessId);
CREATE INDEX idx_reviews_user ON reviews(userId);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

#### Enquiries Table
```sql
CREATE TABLE enquiries (
  id SERIAL PRIMARY KEY,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  businessId INT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  userId INT REFERENCES users(id) ON DELETE SET NULL,
  
  -- Enquiry details
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'read', 'replied', 'resolved', 'closed'
  
  -- Classification
  category VARCHAR(100),
  priority VARCHAR(50) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  
  -- Assignment
  assignedTo INT REFERENCES users(id) ON DELETE SET NULL,
  
  -- Timestamps
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  repliedAt TIMESTAMP,
  
  CONSTRAINT enquiries_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

CREATE INDEX idx_enquiries_business ON enquiries(businessId);
CREATE INDEX idx_enquiries_user ON enquiries(userId);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created ON enquiries(createdAt);
```

#### Bookings Table
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  businessId INT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Booking details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Date & Time
  startDate TIMESTAMP NOT NULL,
  endDate TIMESTAMP,
  duration INT, -- in minutes or hours
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  
  -- Pricing
  totalPrice DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'ZAR',
  
  -- Payment
  paymentStatus VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  paymentMethod VARCHAR(50),
  transactionId VARCHAR(255),
  
  -- Customer info
  customerName VARCHAR(255),
  customerEmail VARCHAR(255),
  customerPhone VARCHAR(20),
  
  -- Notes
  notes TEXT,
  
  -- Timestamps
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_business ON bookings(businessId);
CREATE INDEX idx_bookings_user ON bookings(userId);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(startDate);
```

#### Favorites Table
```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  businessId INT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT favorites_unique UNIQUE(userId, businessId)
);

CREATE INDEX idx_favorites_user ON favorites(userId);
CREATE INDEX idx_favorites_business ON favorites(businessId);
```

#### Images Table (for CDN tracking)
```sql
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  businessId INT REFERENCES businesses(id) ON DELETE CASCADE,
  
  originalName VARCHAR(255),
  storagePath VARCHAR(500) NOT NULL,
  cloudinaryId VARCHAR(255), -- if using Cloudinary
  s3Key VARCHAR(255), -- if using AWS S3
  
  fileSize INT,
  fileType VARCHAR(50),
  
  uploadedBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_images_business ON images(businessId);
```

---

## 🔐 PHASE 3: AUTHENTICATION (Week 2)

### 3.1 Auth Routes & Controllers

**POST /api/auth/register**
```typescript
Request Body:
{
  email: string,
  password: string (min 8 chars, uppercase, number, special char),
  fullName: string,
  role: 'user' | 'business'
}

Response:
{
  success: boolean,
  message: string,
  user: { id, email, fullName, role },
  token: JWT
}
```

**POST /api/auth/login**
```typescript
Request Body:
{
  email: string,
  password: string
}

Response:
{
  success: boolean,
  user: { id, email, fullName, role },
  token: JWT,
  refreshToken: string
}
```

**POST /api/auth/refresh-token**
```typescript
Request Body:
{
  refreshToken: string
}

Response:
{
  token: JWT
}
```

**POST /api/auth/verify**
```typescript
Request Header:
Authorization: Bearer <token>

Response:
{
  valid: boolean,
  user: { id, email, fullName, role }
}
```

**POST /api/auth/logout**
```typescript
Response:
{
  success: boolean,
  message: "Logged out successfully"
}
```

**POST /api/auth/forgot-password**
```typescript
Request Body:
{
  email: string
}

Response:
{
  success: boolean,
  message: "Reset link sent to email"
}
```

**POST /api/auth/reset-password**
```typescript
Request Body:
{
  token: string,
  newPassword: string
}

Response:
{
  success: boolean,
  message: "Password reset successfully"
}
```

### 3.2 JWT Strategy

```typescript
// JWT Payload
{
  id: number,
  email: string,
  role: 'user' | 'business' | 'admin',
  iat: timestamp,
  exp: timestamp
}

// Middleware: authMiddleware.ts
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

---

## 💼 PHASE 4: BUSINESS OPERATIONS (Week 2-3)

### 4.1 Business Routes

**GET /api/businesses** (List all, paginated, filtered)
```typescript
Query Parameters:
?page=1&limit=20&category=eats&area=Nelspruit&tier=platinum&search=query&rating=4

Response:
{
  businesses: Business[],
  total: number,
  page: number,
  totalPages: number
}
```

**GET /api/businesses/:id** (Get single business)
```typescript
Response:
{
  id, name, description, location, area, category, tier,
  rating, reviewCount, images, logo, banner,
  owner: { name, phone, email },
  reviews: Review[],
  hours, services, amenities, priceRange,
  isVerified, trustScore, badges
}
```

**POST /api/businesses** (Create, requires auth)
```typescript
Request Body:
{
  name: string,
  description: string,
  category: string,
  area: string,
  email: string,
  phone: string,
  location: string,
  website?: string,
  hours?: {mon, tue, wed, thu, fri, sat, sun},
  priceRange?: {min, max},
  services?: string[],
  amenities?: string[]
}

Response:
{
  id, uuid, name, category, area, tier: 'trial'
}
```

**PUT /api/businesses/:id** (Update, requires owner auth)
```typescript
Response: Updated business object
```

**DELETE /api/businesses/:id** (Delete, requires owner auth)
```typescript
Response: { success: true, message: "Deleted" }
```

**POST /api/businesses/:id/images** (Upload images)
```typescript
Request: FormData with file(s)
Response: {
  images: [{url, id, uploadedAt}]
}
```

**GET /api/businesses/:id/reviews** (Get reviews)
```typescript
Response:
{
  reviews: Review[],
  averageRating: float,
  totalReviews: number
}
```

**POST /api/businesses/:id/reviews** (Create review, requires auth)
```typescript
Request Body:
{
  rating: 1-5,
  title: string,
  comment: string,
  images?: string[] // URLs
}

Response: Created review object
```

---

## 🔍 PHASE 5: SEARCH & FILTERING (Week 3)

### 5.1 Smart Search Implementation

**GET /api/search**
```typescript
Query Parameters:
?q=restaurants&area=Nelspruit&sort=rating&order=desc

Response:
{
  results: [{
    id, name, category, area, rating, location,
    image, logo, distance_km, relevance_score
  }],
  totalFound: number,
  executionTime: number
}
```

**Search Features:**
- Full-text search on name, description, tags
- Category filtering
- Area/location filtering
- Rating filter
- Tier prioritization (Platinum > Elite > Premium > Trial)
- Distance-based sorting (if coordinates provided)
- Relevance scoring

**Implementation:**
```sql
-- Create index for full-text search
CREATE INDEX idx_businesses_search ON businesses 
USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Query example
SELECT * FROM businesses 
WHERE to_tsvector('english', name || ' ' || description) @@ plainto_tsquery('english', 'restaurants')
AND area = 'Nelspruit'
ORDER BY tier DESC, rating DESC
LIMIT 20;
```

---

## 📧 PHASE 6: COMMUNICATION (Week 3)

### 6.1 Enquiries System

**POST /api/enquiries** (Customer submits enquiry)
```typescript
Request Body:
{
  businessId: number,
  name: string,
  email: string,
  phone: string,
  message: string,
  category?: string // 'general', 'booking', 'complaint', 'info'
}

Response: Created enquiry with ID
```

**GET /api/enquiries** (Business views their enquiries, requires auth)
```typescript
Query:
?businessId=1&status=new&page=1&limit=20

Response: { enquiries: [], total, page, totalPages }
```

**PUT /api/enquiries/:id** (Mark as read/replied/resolved)
```typescript
Request Body:
{
  status: 'new' | 'read' | 'replied' | 'resolved' | 'closed'
}

Response: Updated enquiry
```

**POST /api/enquiries/:id/reply** (Send reply email)
```typescript
Request Body:
{
  message: string,
  cc?: string[]
}

Response: { success: true, message: "Reply sent" }
```

### 6.2 Email Service (nodemailer)

```typescript
// Services/emailService.ts
const sendEmail = async ({
  to: string,
  subject: string,
  html: string,
  attachments?: []
}) => {
  // Implement with nodemailer
}

// Email templates:
- Welcome email
- Password reset email
- Enquiry confirmation (to customer)
- New enquiry notification (to business)
- Booking confirmation
- Review notification
```

---

## 💳 PHASE 7: PAYMENTS (Week 4)

### 7.1 Stripe Integration (Optional for MVP, but prepare)

**POST /api/payments/create-intent** (Create payment intent)
```typescript
Request Body:
{
  bookingId: number,
  amount: number,
  currency: 'ZAR'
}

Response:
{
  clientSecret: string,
  amount: number
}
```

**POST /api/payments/webhook** (Stripe webhook)
```typescript
// Handle payment confirmations
// Update booking status
// Send confirmation email
```

---

## 📈 PHASE 8: ADDITIONAL ENDPOINTS (Week 4-5)

### 8.1 User Management

**GET /api/users/:id** (Get profile, requires auth)
**PUT /api/users/:id** (Update profile, requires auth)
**GET /api/users/:id/favorites** (Get user's favorites)
**POST /api/users/:id/favorites/:businessId** (Add favorite)
**DELETE /api/users/:id/favorites/:businessId** (Remove favorite)

### 8.2 Admin Dashboard

**GET /api/admin/dashboard** (Stats: users, businesses, revenue, etc.)
**GET /api/admin/users** (List all users, paginated)
**GET /api/admin/businesses** (List all businesses with filters)
**PUT /api/admin/businesses/:id/verify** (Verify/approve business)
**PUT /api/admin/businesses/:id/tier** (Change business tier)
**GET /api/admin/enquiries** (View all enquiries)
**GET /api/admin/analytics** (Detailed analytics)

### 8.3 Reports & Analytics

**GET /api/analytics/traffic** (Page views, clicks, etc.)
**GET /api/analytics/businesses/:id** (Business-specific metrics)
**GET /api/analytics/areas** (Area-based statistics)
**GET /api/reports/revenue** (Revenue by period)
**GET /api/reports/conversion** (Conversion metrics)

---

## 🛠️ IMPLEMENTATION CHECKLIST

### Week 1
- [ ] Setup Node.js + Express project
- [ ] Configure PostgreSQL database
- [ ] Create all database tables & indices
- [ ] Setup environment variables
- [ ] Create project folder structure
- [ ] Configure TypeScript

### Week 2
- [ ] Implement authentication (register, login, JWT)
- [ ] Add email verification
- [ ] Implement password reset flow
- [ ] Create business CRUD endpoints
- [ ] Add image upload functionality
- [ ] Implement favorites system

### Week 3
- [ ] Implement search/filtering
- [ ] Create enquiries system
- [ ] Setup email notifications
- [ ] Add reviews system
- [ ] Implement rating calculations
- [ ] Add admin verification flow

### Week 4
- [ ] Setup Stripe integration (optional)
- [ ] Implement booking system
- [ ] Add payment processing
- [ ] Create admin dashboard endpoints
- [ ] Add analytics tracking
- [ ] Setup rate limiting & security

### Week 5
- [ ] Testing (unit, integration, e2e)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Deployment preparation
- [ ] Production deployment

---

## 🔒 SECURITY CHECKLIST

- [ ] Password hashing (bcrypt)
- [ ] JWT token validation on all protected routes
- [ ] Rate limiting on auth endpoints
- [ ] CORS properly configured
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (input sanitization)
- [ ] HTTPS enforcement in production
- [ ] Environment variables properly secured
- [ ] API key rotation strategy
- [ ] Database backup strategy
- [ ] Error logging without exposing sensitive info
- [ ] Request validation on all endpoints

---

## 📦 DEPLOYMENT STRATEGY

### Development
- localhost:5000 (Node.js)
- localhost:5432 (PostgreSQL)

### Staging
- AWS EC2 or DigitalOcean droplet
- RDS for PostgreSQL
- AWS S3 for image storage
- CloudFront for CDN

### Production
- AWS EC2 Auto Scaling + Load Balancer
- RDS Multi-AZ PostgreSQL
- S3 + CloudFront for images
- CloudWatch for monitoring
- SNS for alerting

---

## 🔗 FRONTEND-BACKEND INTEGRATION

### API Base URL Configuration

**Frontend (src/services/apiService.ts)**
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth
  login: (email, password) => POST('/auth/login', {email, password}),
  register: (data) => POST('/auth/register', data),
  verify: () => GET('/auth/verify'), // uses stored JWT
  
  // Businesses
  getBusinesses: (filters) => GET('/businesses', {params: filters}),
  getBusinessById: (id) => GET(`/businesses/${id}`),
  createBusiness: (data) => POST('/businesses', data),
  updateBusiness: (id, data) => PUT(`/businesses/${id}`, data),
  
  // Enquiries
  sendEnquiry: (data) => POST('/enquiries', data),
  
  // Favorites
  toggleFavorite: (businessId) => POST(`/favorites/${businessId}`),
  
  // Search
  search: (query) => GET('/search', {params: {q: query}})
};
```

**Intercept JWT in all requests:**
```typescript
// Add JWT to Authorization header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('lh_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 📝 API DOCUMENTATION TEMPLATE

Document all endpoints using OpenAPI/Swagger:

```yaml
/api/businesses:
  get:
    summary: "List all businesses with filtering"
    parameters:
      - name: category
        in: query
        type: string
      - name: area
        in: query
        type: string
      - name: page
        in: query
        type: integer
    responses:
      200:
        description: "Success"
        schema:
          type: object
          properties:
            businesses:
              type: array
            total:
              type: integer
```

---

## 🎯 SUCCESS METRICS

- [ ] All endpoints responding within 200ms
- [ ] Database queries optimized (< 50ms)
- [ ] API uptime 99.9%
- [ ] Zero security vulnerabilities
- [ ] All endpoints have proper error handling
- [ ] Comprehensive logging in place
- [ ] Documentation complete
- [ ] Unit test coverage > 80%
- [ ] All endpoints tested and working

---

## 📞 SUPPORT & NEXT STEPS

**Ready to begin backend development?**

1. **Choose your hosting:**
   - AWS (recommended for scalability)
   - DigitalOcean (cheaper, simpler)
   - Heroku (easiest, least flexible)

2. **Database setup:**
   - Local PostgreSQL for dev
   - RDS for production

3. **Email service:**
   - Gmail SMTP (free, limited)
   - SendGrid (recommended)
   - AWS SES

4. **Image storage:**
   - AWS S3 (industry standard)
   - Cloudinary (easier integration)

5. **Payment processing:**
   - Stripe (recommended)
   - PayFast (for South Africa)

**Timeline: 4-5 weeks to production-ready backend**

---

**Frontend Ready:** ✅ Production-Quality  
**Backend Status:** 🚀 Ready to Build  
**Overall Project:** On Track for World-Class MVP

Let's build the backend! 💪
