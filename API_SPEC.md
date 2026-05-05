# LowveldHub API Specification

**Complete REST API endpoint reference. Base URL: `http://localhost:5000/api` (dev) | `https://api.lowveldhub.com` (prod)**

## Response Format Standard

All endpoints follow this response contract:

### Success Response (2xx)
```json
{
  "success": true,
  "data": { /* entity or array */ },
  "message": "Operation completed"
}
```

### Error Response (4xx/5xx)
```json
{
  "success": false,
  "error": "Descriptive error message",
  "status": 400,
  "details": { /* optional validation errors */ }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## Authentication Endpoints

### POST `/auth/login`
Authenticate user with email/password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

**Errors:**
- `401` — Invalid email/password
- `429` — Too many login attempts (rate limited: 5/minute)

---

### POST `/auth/register`
Create new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "secure_password_123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "token": "eyJ...",
    "user": { "id": 2, "email": "newuser@example.com", "role": "user" }
  }
}
```

**Errors:**
- `400` — Email already exists
- `400` — Password too weak (min 8 chars, 1 uppercase, 1 number)

---

### POST `/auth/refresh-token`
Refresh expired JWT token.

**Headers:**
```
Authorization: Bearer <expired_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJ..." /* new token, valid for 7 days */
  }
}
```

---

## Business/Listing Endpoints

### GET `/businesses`
List all active businesses with filters.

**Query Params:**
```
?category=eats&area=Nelspruit&tier=platinum&limit=20&page=1
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Kuka Café",
      "category": "eats",
      "area": "Nelspruit",
      "tier": "elite",
      "rating": 4.8,
      "reviewCount": 24,
      "image": "https://...",
      "status": "active"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 156, "pages": 8 }
}
```

**Query Param Details:**
| Param | Type | Default | Values |
|-------|------|---------|--------|
| `category` | string | all | 'eats', 'retail', 'real-estate', etc. |
| `area` | string | all | Mpumalanga area names |
| `tier` | string | all | 'trial', 'premium', 'elite', 'platinum' |
| `search` | string | none | Free-text search on name |
| `limit` | number | 20 | 1-100 |
| `page` | number | 1 | >= 1 |

---

### GET `/businesses/:id`
Get single business detail by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Kuka Café",
    "description": "Award-winning café...",
    "category": "eats",
    "subcategory": "café",
    "area": "Nelspruit",
    "tier": "elite",
    "rating": 4.8,
    "reviewCount": 24,
    "priceRange": "medium",
    "contactEmail": "info@kuka.co.za",
    "contactPhone": "+27 13 123 4567",
    "website": "https://kuka.co.za",
    "image": "https://...",
    "logo": "https://...",
    "status": "active",
    "createdAt": "2025-09-15T10:30:00Z",
    "verifiedAt": "2025-09-20T14:00:00Z"
  }
}
```

**Errors:**
- `404` — Business not found

---

### POST `/businesses` ⚠️ *Auth Required*
Create new business listing.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "My Restaurant",
  "description": "Best food in town",
  "category": "eats",
  "subcategory": "restaurant",
  "area": "Nelspruit",
  "priceRange": "medium",
  "contactEmail": "contact@myrestaurant.co.za",
  "contactPhone": "+27 13 123 4567",
  "website": "https://myrestaurant.co.za",
  "image": "https://..."
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 100,
    "uuid": "...",
    "status": "pending",
    "tier": "trial",
    "message": "Listing created. Awaiting admin verification."
  }
}
```

**Errors:**
- `401` — Not authenticated
- `400` — Missing required fields

---

### PUT `/businesses/:id` ⚠️ *Auth Required + Owner*
Update existing business listing.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:** (same as POST, partial updates allowed)

**Response (200):**
```json
{
  "success": true,
  "data": { /* updated business */ },
  "message": "Listing updated"
}
```

**Errors:**
- `401` — Not authenticated
- `403` — Not listing owner
- `404` — Listing not found

---

## Review Endpoints

### POST `/reviews` ⚠️ *Auth Required*
Submit review for a business.

**Request:**
```json
{
  "business_id": 1,
  "rating": 5,
  "title": "Excellent service!",
  "content": "Best café in Nelspruit, highly recommend..."
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 50,
    "businessId": 1,
    "rating": 5,
    "status": "pending",
    "message": "Review submitted for moderation"
  }
}
```

**Errors:**
- `401` — Not authenticated
- `400` — Invalid rating (1-5 only)
- `409` — User already reviewed this business

---

### GET `/reviews?business_id=1`
Get all approved reviews for a business.

**Query Params:**
```
?business_id=1&limit=20&page=1&sort=rating_desc
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "businessId": 1,
      "userId": 5,
      "rating": 5,
      "title": "Excellent service!",
      "content": "Best café...",
      "helpfulCount": 12,
      "createdAt": "2026-01-20T10:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 24, "pages": 2 }
}
```

---

## Favorite Endpoints

### POST `/favorites` ⚠️ *Auth Required*
Add business to favorites.

**Request:**
```json
{
  "business_id": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Added to favorites"
}
```

**Errors:**
- `401` — Not authenticated
- `404` — Business not found

---

### DELETE `/favorites/:business_id` ⚠️ *Auth Required*
Remove from favorites.

**Response (200):**
```json
{
  "success": true,
  "message": "Removed from favorites"
}
```

---

### GET `/favorites` ⚠️ *Auth Required*
Get user's favorite listings.

**Response (200):**
```json
{
  "success": true,
  "data": [ /* array of favorite businesses */ ],
  "pagination": { "page": 1, "limit": 20, "total": 5, "pages": 1 }
}
```

---

## Dashboard Endpoints

### GET `/user/dashboard` ⚠️ *Auth Required*
Get complete user dashboard with aggregated stats.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "rewardPoints": 250,
    "savedItemsCount": 5,
    "recentActivityCount": 12,
    "recentMessages": [
      { "id": 1, "senderId": 3, "content": "...", "createdAt": "..." }
    ],
    "messageCounts": {
      "unread": 2,
      "total": 15
    }
  }
}
```

---

## Loyalty Endpoints

### GET `/loyalty/balance` ⚠️ *Auth Required*
Get user's current loyalty points.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalPoints": 250,
    "tier": "silver",
    "nextTierRequires": 750
  }
}
```

---

### GET `/loyalty/history` ⚠️ *Auth Required*
Get loyalty transaction history.

**Query Params:**
```
?limit=20&page=1&type=purchase
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "points": 50,
      "type": "purchase",
      "description": "Purchase at Kuka Café",
      "createdAt": "2026-01-20T10:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 12, "pages": 1 }
}
```

---

## Admin Endpoints

### GET `/admin/businesses` ⚠️ *Auth Required + Admin*
Get unverified/pending business listings queue.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 50,
      "name": "New Listing",
      "category": "eats",
      "status": "pending",
      "createdAt": "2026-01-29T10:00:00Z",
      "owner": { "email": "owner@..." }
    }
  ]
}
```

---

### PATCH `/admin/businesses/:id/verify` ⚠️ *Auth Required + Admin*
Approve/reject pending business listing.

**Request:**
```json
{
  "action": "approve",  /* or "reject" */
  "notes": "Verified business details"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": { /* updated business */ },
  "message": "Business verified and activated"
}
```

---

## Rate Limiting

All endpoints are rate-limited:

| Endpoint | Limit |
|----------|-------|
| `/auth/login` | 5/minute per IP |
| `/auth/register` | 3/minute per IP |
| All other endpoints | 100/minute per user |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1643462400
```

**Error (429):**
```json
{
  "success": false,
  "error": "Too many requests. Try again later.",
  "retryAfter": 60
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK — Request successful |
| `201` | Created — Resource created |
| `400` | Bad Request — Invalid input |
| `401` | Unauthorized — Missing/invalid JWT |
| `403` | Forbidden — Lacks permission (not admin, not owner) |
| `404` | Not Found — Resource doesn't exist |
| `409` | Conflict — Duplicate entry |
| `429` | Too Many Requests — Rate limited |
| `500` | Internal Server Error — Server crash |

---

## Authentication

**All protected endpoints require JWT token in header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token structure (decoded):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "user",
  "iat": 1643462400,
  "exp": 1643548800
}
```

**Token expiry: 7 days**

---

## Example: Complete Flow

```javascript
// 1. Register
POST /auth/register
{ email, password, first_name, last_name }
→ { token, user }

// 2. Store token (frontend memory or localStorage)
localStorage.setItem('authToken', response.token);

// 3. List businesses
GET /businesses?category=eats&area=Nelspruit
→ { data: [ /* businesses */ ] }

// 4. Add to favorites (requires auth)
POST /favorites
Headers: { Authorization: `Bearer ${token}` }
Body: { business_id: 1 }
→ { success: true }

// 5. View dashboard
GET /user/dashboard
Headers: { Authorization: `Bearer ${token}` }
→ { data: { rewardPoints, savedItems, ... } }

// 6. Submit review
POST /reviews
Headers: { Authorization: `Bearer ${token}` }
Body: { business_id: 1, rating: 5, title, content }
→ { success: true, data: { id, status: "pending" } }
```

---

**Need OpenAPI/Swagger docs?** Use `/api-docs` endpoint (if Swagger UI is deployed).

