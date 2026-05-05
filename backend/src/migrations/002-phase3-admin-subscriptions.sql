-- Phase 3: Admin & Business Verification System

-- Admin table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'moderator',
  permissions TEXT[] DEFAULT ARRAY[]::TEXT[],
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Admin audit logs
CREATE TABLE IF NOT EXISTS admin_logs (
  id SERIAL PRIMARY KEY,
  action VARCHAR(100) NOT NULL,
  "businessId" INTEGER REFERENCES businesses(id) ON DELETE SET NULL,
  "adminId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notes TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table for tier management
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  "businessId" INTEGER UNIQUE NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  tier VARCHAR(50) NOT NULL DEFAULT 'free',
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  "startDate" TIMESTAMP DEFAULT NOW(),
  "renewalDate" TIMESTAMP,
  "nextBillingDate" TIMESTAMP,
  "autoRenew" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Payments table for future integration
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  "subscriptionId" INTEGER NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'ZAR',
  status VARCHAR(50) DEFAULT 'pending',
  "paymentMethod" VARCHAR(50),
  "transactionId" VARCHAR(255) UNIQUE,
  "invoiceId" VARCHAR(255) UNIQUE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Add status column if not exists (default 'pending')
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';

-- Add tier column if not exists (default 'free')
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS tier VARCHAR(50) DEFAULT 'free';

-- Create indices for performance
CREATE INDEX IF NOT EXISTS idx_admin_userId ON admins("userId");
CREATE INDEX IF NOT EXISTS idx_admin_logs_businessId ON admin_logs("businessId");
CREATE INDEX IF NOT EXISTS idx_admin_logs_adminId ON admin_logs("adminId");
CREATE INDEX IF NOT EXISTS idx_admin_logs_action ON admin_logs(action);
CREATE INDEX IF NOT EXISTS idx_subscriptions_businessId ON subscriptions("businessId");
CREATE INDEX IF NOT EXISTS idx_subscriptions_tier ON subscriptions(tier);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_renewalDate ON subscriptions("renewalDate");
CREATE INDEX IF NOT EXISTS idx_payments_subscriptionId ON payments("subscriptionId");
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_tier ON businesses(tier);

-- Create initial admin user (password: Admin@123456)
INSERT INTO admins ("userId", role)
SELECT u.id, 'super_admin'
FROM users u
WHERE u.email = 'admin@lowveldhub.co.za'
ON CONFLICT DO NOTHING;
