# LowveldHub Database Schema Reference

**Complete database schema for PostgreSQL backend. Last Updated: January 29, 2026.**

## Table Directory

- [users](#users) — Core user accounts
- [businesses](#businesses) — Listings/directory entries
- [reviews](#reviews) — User reviews
- [favorites](#favorites) — User-saved listings
- [enquiries](#enquiries) — Business contact requests
- [subscriptions](#subscriptions) — Tier upgrade history
- [loyalty_points](#loyalty_points) — Reward system (Phase 3)
- [agents](#agents) — Sales agent tracking (Phase 3)
- [activities](#activities) — User action logging (Phase 3)
- [messages](#messages) — User-to-user messaging (Phase 3)

---

## Core Tables

### users
Stores user accounts and authentication info.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user',  -- 'user' | 'admin' | 'agent'
  status VARCHAR(50) DEFAULT 'active',  -- 'active' | 'suspended' | 'pending'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
```

**Common Queries:**
```typescript
// Find user by email
SELECT * FROM users WHERE email = $1;

// Get all admins
SELECT * FROM users WHERE role = 'admin' ORDER BY created_at DESC;

// Suspend user
UPDATE users SET status = 'suspended' WHERE id = $1;
```

---

### businesses
Core listing/business directory. Supports all listing types (eats, retail, real estate, etc.)

```sql
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  uuid UUID UNIQUE DEFAULT gen_random_uuid(),
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,  -- URL-friendly name
  description TEXT,
  category VARCHAR(100) NOT NULL,  -- 'eats' | 'retail' | 'real-estate' | etc.
  sub_category VARCHAR(100),
  area VARCHAR(100) NOT NULL,  -- 'Nelspruit' | 'Mbombela' | etc.
  tier VARCHAR(50) DEFAULT 'trial',  -- 'trial' | 'premium' | 'elite' | 'platinum'
  status VARCHAR(50) DEFAULT 'pending',  -- 'pending' | 'active' | 'suspended' | 'closed'
  image VARCHAR(500),  -- URL to hero image
  logo VARCHAR(500),
  rating DECIMAL(3, 2) DEFAULT 0.0,  -- 0.0 to 5.0
  review_count INTEGER DEFAULT 0,
  price_range VARCHAR(50),  -- 'low' | 'medium' | 'high' | 'luxury'
  trust_score INTEGER DEFAULT 0,  -- 0-100
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  website VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP
);
```

**Indexes:**
```sql
CREATE INDEX idx_businesses_owner_id ON businesses(owner_id);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_area ON businesses(area);
CREATE INDEX idx_businesses_tier ON businesses(tier);
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_businesses_rating ON businesses(rating DESC);
```

**Common Queries:**
```typescript
// Get all active listings in category, sorted by tier & rating
SELECT * FROM businesses 
WHERE status = 'active' AND category = $1 AND area = $2
ORDER BY 
  CASE tier WHEN 'platinum' THEN 1 WHEN 'elite' THEN 2 WHEN 'premium' THEN 3 ELSE 4 END,
  rating DESC, created_at DESC;

// Filter by area + tier
SELECT * FROM businesses 
WHERE area = $1 AND tier IN ('platinum', 'elite')
ORDER BY rating DESC;

// Find unverified listings (admin)
SELECT * FROM businesses 
WHERE status = 'pending' 
ORDER BY created_at ASC;
```

---

### reviews
User-submitted reviews for businesses.

```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,  -- 1-5
  title VARCHAR(255),
  content TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',  -- 'pending' | 'approved' | 'rejected'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
```sql
CREATE INDEX idx_reviews_business_id ON reviews(business_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
```

---

### favorites
User-saved listings.

```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, business_id)
);
```

**Indexes:**
```sql
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
```

---

### enquiries
Contact/inquiry messages from users to businesses.

```sql
CREATE TABLE enquiries (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',  -- 'unread' | 'read' | 'responded'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
```sql
CREATE INDEX idx_enquiries_business_id ON enquiries(business_id);
CREATE INDEX idx_enquiries_status ON enquiries(status);
```

---

### subscriptions
Tier upgrade history and billing records.

```sql
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  tier_from VARCHAR(50),
  tier_to VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2),
  duration_months INTEGER,
  status VARCHAR(50) DEFAULT 'active',  -- 'active' | 'expired' | 'cancelled'
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Phase 3 Tables (Extended Systems)

### loyalty_points
User reward points for purchases, reviews, referrals, activity.

```sql
CREATE TABLE loyalty_points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,  -- 'purchase' | 'review' | 'referral' | 'activity' | 'redemption'
  description VARCHAR(255),
  reference_id VARCHAR(100),  -- ID of related transaction
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
```sql
CREATE INDEX idx_loyalty_points_user_id ON loyalty_points(user_id);
CREATE INDEX idx_loyalty_points_created_at ON loyalty_points(created_at DESC);
```

**Common Queries:**
```typescript
// Get user's total points
SELECT COALESCE(SUM(points), 0) as total FROM loyalty_points WHERE user_id = $1;

// Get transaction history
SELECT * FROM loyalty_points 
WHERE user_id = $1 
ORDER BY created_at DESC 
LIMIT 50;

// Points issued this month
SELECT SUM(points) FROM loyalty_points 
WHERE user_id = $1 AND created_at >= date_trunc('month', CURRENT_DATE);
```

---

### agents
Sales agent KPI tracking and achievements.

```sql
CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  target_value DECIMAL(15, 2) NOT NULL,  -- Monthly/annual sales target
  current_progress DECIMAL(15, 2) DEFAULT 0,  -- Current progress toward target
  achievements JSONB DEFAULT '[]',  -- Array of {name, date_earned, description}
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
```sql
CREATE INDEX idx_agents_user_id ON agents(user_id);
CREATE INDEX idx_agents_status ON agents(status);
```

**Sample Achievement Format:**
```json
[
  {
    "name": "Top Performer",
    "date_earned": "2026-01-15T10:30:00Z",
    "description": "Exceeded monthly target by 150%"
  }
]
```

---

### activities
User action logging for engagement metrics and churn detection.

```sql
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL,  -- 'login' | 'search' | 'favorite_add' | 'review_submit' | 'message_send' | 'listing_view'
  description VARCHAR(255),
  metadata JSONB,  -- Additional context (search query, listing_id, etc.)
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
```sql
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_action_type ON activities(action_type);
CREATE INDEX idx_activities_created_at ON activities(created_at DESC);
```

**Common Queries:**
```typescript
// User activity timeline
SELECT action_type, created_at FROM activities 
WHERE user_id = $1 
ORDER BY created_at DESC 
LIMIT 100;

// Activity counts by type (last 30 days)
SELECT action_type, COUNT(*) as count 
FROM activities 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY action_type;

// Engagement metric: active users today
SELECT COUNT(DISTINCT user_id) FROM activities 
WHERE created_at >= date_trunc('day', CURRENT_TIMESTAMP);
```

---

### messages
User-to-user messaging system.

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  deleted_at TIMESTAMP,  -- Soft delete
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
```sql
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_read ON messages(read);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
```

**Common Queries:**
```typescript
// Unread message count for user
SELECT COUNT(*) FROM messages 
WHERE recipient_id = $1 AND read = FALSE;

// Recent conversation with another user
SELECT * FROM messages 
WHERE (sender_id = $1 AND recipient_id = $2) 
   OR (sender_id = $2 AND recipient_id = $1)
ORDER BY created_at DESC 
LIMIT 50;

// Mark messages as read
UPDATE messages SET read = TRUE, read_at = NOW() 
WHERE recipient_id = $1 AND read = FALSE;
```

---

## Performance Recommendations

### Mandatory Indexes (Already Listed)
✅ All indexes are listed above per table.

### Query Optimization Tips

1. **Pagination is critical:**
   ```typescript
   // Good
   SELECT * FROM activities 
   WHERE user_id = $1 
   ORDER BY created_at DESC 
   LIMIT 20 OFFSET 0;
   
   // Bad (no limit = full table scan)
   SELECT * FROM activities WHERE user_id = $1;
   ```

2. **Filter before aggregation:**
   ```typescript
   // Good: Filter first, then COUNT
   SELECT COUNT(*) FROM loyalty_points 
   WHERE user_id = $1 AND created_at >= DATE_TRUNC('month', CURRENT_DATE);
   
   // Bad: Aggregate all rows then filter
   SELECT * FROM loyalty_points WHERE user_id = $1 THEN filter
   ```

3. **Use EXPLAIN ANALYZE for slow queries:**
   ```sql
   EXPLAIN ANALYZE SELECT * FROM businesses 
   WHERE category = 'real-estate' AND area = 'Nelspruit';
   ```

4. **Consider materialized views for dashboards:**
   ```sql
   CREATE MATERIALIZED VIEW user_dashboard_stats AS
   SELECT 
     u.id,
     COALESCE(SUM(lp.points), 0) as total_points,
     COUNT(DISTINCT f.id) as saved_items,
     COUNT(DISTINCT a.id) as activities
   FROM users u
   LEFT JOIN loyalty_points lp ON u.id = lp.user_id
   LEFT JOIN favorites f ON u.id = f.user_id
   LEFT JOIN activities a ON u.id = a.user_id
   GROUP BY u.id;
   ```

---

## Migrations & Schema Changes

See `backend/src/migrations/` for:
- `runMigrations.ts` — Initializes schema on first run
- `seedAdminUser.ts` — Creates default admin account

To add a new table:
1. Create migration file: `backend/src/migrations/001_add_new_table.ts`
2. Run: `npm run migrate`
3. Update this reference

---

## Backup & Restore

```bash
# Backup database
pg_dump -U postgres -d lowveldhub_db > backup.sql

# Restore from backup
psql -U postgres -d lowveldhub_db < backup.sql
```

