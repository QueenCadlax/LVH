-- Phase 1 & 2: Initial Schema & Authentication

-- Users table (Phase 1)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  phone VARCHAR(20),
  "businessName" VARCHAR(255),
  "businessType" VARCHAR(100),
  location VARCHAR(255),
  bio TEXT,
  avatar VARCHAR(500),
  "isVerified" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Businesses table (Phase 2)
CREATE TABLE IF NOT EXISTS businesses (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  location VARCHAR(255),
  image VARCHAR(500),
  logo VARCHAR(500),
  rating DECIMAL(3, 2) DEFAULT 0,
  "reviewCount" INTEGER DEFAULT 0,
  "isVerified" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create indices
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_businesses_userId ON businesses("userId");
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(location);
