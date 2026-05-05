-- Phase 3.5: Agents, Loyalty Points, and Activity Logging

-- Agents table for staff management
CREATE TABLE IF NOT EXISTS agents (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "currentTarget" INTEGER DEFAULT 0,
  "monthlyProgress" INTEGER DEFAULT 0,
  achievements TEXT[] DEFAULT ARRAY[]::TEXT[],
  earnings DECIMAL(10, 2) DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Loyalty points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "totalPoints" INTEGER DEFAULT 0,
  "pointsHistory" JSONB DEFAULT '[]',
  "lastEarnedAt" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id SERIAL PRIMARY KEY,
  "referrerId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "referredId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "pointsAwarded" INTEGER DEFAULT 100,
  status VARCHAR(50) DEFAULT 'pending',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  UNIQUE("referrerId", "referredId")
);

-- Recent activity logging table
CREATE TABLE IF NOT EXISTS recent_activity (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  "relatedBusinessId" INTEGER REFERENCES businesses(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Add province column to users if not exists
ALTER TABLE users
ADD COLUMN IF NOT EXISTS province VARCHAR(100) DEFAULT 'Mpumalanga';

-- Add province column to businesses if not exists
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS province VARCHAR(100) DEFAULT 'Mpumalanga';

-- Create indices for performance
CREATE INDEX IF NOT EXISTS idx_agents_userId ON agents("userId");
CREATE INDEX IF NOT EXISTS idx_agents_earnings ON agents(earnings);
CREATE INDEX IF NOT EXISTS idx_loyalty_userId ON loyalty_points("userId");
CREATE INDEX IF NOT EXISTS idx_referrals_referrerId ON referrals("referrerId");
CREATE INDEX IF NOT EXISTS idx_referrals_referredId ON referrals("referredId");
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_activity_userId ON recent_activity("userId");
CREATE INDEX IF NOT EXISTS idx_activity_action ON recent_activity(action);
CREATE INDEX IF NOT EXISTS idx_activity_businessId ON recent_activity("relatedBusinessId");
CREATE INDEX IF NOT EXISTS idx_activity_createdAt ON recent_activity("createdAt");
CREATE INDEX IF NOT EXISTS idx_users_province ON users(province);
CREATE INDEX IF NOT EXISTS idx_businesses_province ON businesses(province);

-- Initialize loyalty_points for existing users
INSERT INTO loyalty_points ("userId", "totalPoints")
SELECT id, 0 FROM users
ON CONFLICT ("userId") DO NOTHING;

