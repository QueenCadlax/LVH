-- 004-referrals-loyalty-structure.sql

-- Referrals table (enforces: no self-referral, unique referred)
CREATE TABLE IF NOT EXISTS referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points_awarded INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT no_self_referral CHECK (referrer_id <> referred_id),
  CONSTRAINT unique_referred UNIQUE (referred_id)
);

-- Loyalty points table (normalized, if not exists)
CREATE TABLE IF NOT EXISTS loyalty_points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  source VARCHAR(32) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
