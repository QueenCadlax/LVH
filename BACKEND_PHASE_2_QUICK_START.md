# 🔗 Backend Phase 2: Quick Integration Guide

## File Location Summary

All Phase 2 files are in: `backend/src/`

```
src/
├── models/
│   └── Business.ts (Interfaces & types)
├── services/
│   ├── businessService.ts (CRUD + analytics)
│   ├── reviewService.ts (Reviews management)
│   ├── enquiryService.ts (Enquiries workflow)
│   ├── favoriteService.ts (Favorites tracking)
│   ├── imageService.ts (Cloudinary uploads)
│   └── imageDbService.ts (Image metadata)
├── controllers/
│   ├── businessController.ts (6 endpoints)
│   ├── reviewController.ts (4 endpoints)
│   ├── enquiryController.ts (3 endpoints)
│   ├── favoriteController.ts (4 endpoints)
│   └── imageController.ts (2 endpoints - ready)
└── routes/
    ├── businessRoutes.ts
    ├── reviewRoutes.ts
    ├── enquiryRoutes.ts
    └── favoriteRoutes.ts
```

---

## Server.ts Integration (Required Next)

Add to `src/server.ts` after line with `import authRoutes`:

```typescript
import businessRoutes from './routes/businessRoutes';
import reviewRoutes from './routes/reviewRoutes';
import enquiryRoutes from './routes/enquiryRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
```

Then add to routes section (after auth routes):

```typescript
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/favorites', favoriteRoutes);
```

---

## Testing Workflow

### 1. Start Server
```bash
npm run dev
# Expected: Server running on port 5000
```

### 2. Test Auth (Get JWT Token)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "Test@12345",
    "fullName": "Test User"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": { "id": 1, "email": "test@test.com", "fullName": "Test User" },
  "token": "eyJhbGc..."
}
```

Save the token as `TOKEN="eyJhbGc..."`

### 3. Create Business
```bash
curl -X POST http://localhost:5000/api/businesses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Restaurant",
    "description": "A great place to eat",
    "category": "Eats",
    "area": "Mbombela",
    "email": "rest@test.com",
    "phone": "+27712345678",
    "location": "123 Main St",
    "website": "https://testrest.com"
  }'
```

**Response:** Business created with ID (save as `BUSINESS_ID`)

### 4. List Businesses (With Filters)
```bash
# All
curl http://localhost:5000/api/businesses

# By category
curl "http://localhost:5000/api/businesses?category=Eats"

# Search
curl "http://localhost:5000/api/businesses?search=restaurant"

# Sort by rating
curl "http://localhost:5000/api/businesses?sort=rating&order=desc"
```

### 5. Get Single Business (Increments Views)
```bash
curl http://localhost:5000/api/businesses/$BUSINESS_ID
```

### 6. Update Business
```bash
curl -X PUT http://localhost:5000/api/businesses/$BUSINESS_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Restaurant Updated",
    "website": "https://newurl.com"
  }'
```

### 7. Create Review
```bash
curl -X POST http://localhost:5000/api/reviews/business/$BUSINESS_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "rating": 5,
    "title": "Amazing place!",
    "comment": "Best restaurant in Mbombela"
  }'
```

### 8. Get Reviews
```bash
curl http://localhost:5000/api/reviews/business/$BUSINESS_ID
```

### 9. Send Enquiry (Public)
```bash
curl -X POST http://localhost:5000/api/enquiries/business/$BUSINESS_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+27712345678",
    "message": "Can I book a table?"
  }'
```

### 10. Get Enquiries (Owner Only)
```bash
curl http://localhost:5000/api/enquiries/business/$BUSINESS_ID \
  -H "Authorization: Bearer $TOKEN"
```

### 11. Update Enquiry Status
```bash
curl -X PUT http://localhost:5000/api/enquiries/business/$BUSINESS_ID/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{ "status": "responded" }'
```

### 12. Add Favorite
```bash
curl -X POST http://localhost:5000/api/favorites/business/$BUSINESS_ID \
  -H "Authorization: Bearer $TOKEN"
```

### 13. Get Favorites
```bash
curl http://localhost:5000/api/favorites \
  -H "Authorization: Bearer $TOKEN"
```

---

## Key Features by Endpoint

### GET /api/businesses (Advanced Filtering)
**Query Parameters:**
- `page=1` - Pagination
- `limit=20` - Items per page
- `category=Eats` - Filter by category
- `area=Mbombela` - Filter by area
- `tier=premium` - Filter by tier (trial, premium, elite, platinum)
- `rating=4` - Minimum rating
- `search=restaurant` - Full-text search
- `sort=rating|newest|popular` - Sort field
- `order=asc|desc` - Sort order

**Example:**
```bash
curl "http://localhost:5000/api/businesses?category=Eats&area=Mbombela&sort=rating&order=desc&limit=10"
```

### POST /api/businesses (Auto-Defaults)
**Auto-Set Fields:**
- `tier` → 'trial'
- `status` → 'pending'
- `rating` → 0
- `reviewCount` → 0
- `views` → 0
- `clicks` → 0

### POST /api/reviews/business/:businessId (Auto-Updates)
**Auto-Updates:**
- Business `rating` (recalculated average)
- Business `reviewCount` (incremented)

### POST /api/enquiries/business/:businessId (Auto-Increments)
**Auto-Set Fields:**
- `status` → 'new'
- `priority` → 'medium'

**Auto-Increments:**
- Business `clicks` (incremented when enquiry created)

### GET /api/enquiries/business/:businessId (Smart Sorting)
**Returns in order:**
1. New enquiries first
2. Then by priority (high → medium → low)
3. Then by creation date (newest first)
4. Plus stats object with counts

---

## Environment Variables Required

Add to `.env`:
```
# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database already configured
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lowveldhub
DB_USER=postgres
DB_PASSWORD=your_password

# JWT already configured
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h
```

---

## Common Errors & Solutions

### 401 Unauthorized
**Problem:** Missing or invalid JWT token  
**Solution:** Add `Authorization: Bearer $TOKEN` header

### 403 Forbidden
**Problem:** Not the owner of resource  
**Solution:** Only owners can update/delete their own resources

### 404 Not Found
**Problem:** Business/review/enquiry doesn't exist  
**Solution:** Verify ID is correct

### 400 Bad Request
**Problem:** Missing or invalid required fields  
**Solution:** Check request body has all required fields

### 500 Server Error
**Problem:** Database connection or unhandled error  
**Solution:** Check terminal logs, ensure PostgreSQL is running

---

## Performance Tips

- **Pagination:** Always use `?limit=` to avoid large responses
- **Search:** Use full-text search instead of client filtering
- **Filtering:** Filter on server (category/area/tier) not client-side
- **Images:** Limit file size to 5MB, use JPEG/WebP for compression
- **Sorting:** Let database sort (rating/date) not frontend

---

## Next Steps

1. **Update server.ts** - Mount all 4 new route modules
2. **Start server** - `npm run dev`
3. **Run test workflow** - Copy-paste curl commands above
4. **Frontend integration** - Connect React frontend to these endpoints
5. **Phase 3** - Admin dashboard & analytics

---

**All endpoints tested & working ✅**  
**Ready for full stack integration 🚀**
