-- Migration: Create Dashboard & Feature Tables
-- Date: January 27, 2026
-- Description: Creates tables for loyalty points, referrals, messages, and activity tracking

-- 1. LOYALTY POINTS TABLE
CREATE TABLE IF NOT EXISTS loyalty_points (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    points INT NOT NULL DEFAULT 0,
    reason VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(50), -- 'system', 'admin', 'user'
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- 2. REFERRALS TABLE
CREATE TABLE IF NOT EXISTS referrals (
    id SERIAL PRIMARY KEY,
    referrer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referred_user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referral_code VARCHAR(50) UNIQUE,
    reward_points INT DEFAULT 100,
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, expired
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    expires_at TIMESTAMP,
    UNIQUE KEY unique_referral (referrer_id, referred_user_id),
    INDEX idx_referrer_id (referrer_id),
    INDEX idx_referred_user_id (referred_user_id),
    INDEX idx_status (status)
);

-- 3. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INT,
    business_id INT REFERENCES businesses(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text', -- text, file, image
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    INDEX idx_sender_id (sender_id),
    INDEX idx_receiver_id (receiver_id),
    INDEX idx_business_id (business_id),
    INDEX idx_created_at (created_at),
    INDEX idx_read (read)
);

-- 4. RECENT ACTIVITY TABLE (User Activity)
CREATE TABLE IF NOT EXISTS recent_activity (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- booking, review, points, message, purchase, referral
    business_id INT REFERENCES businesses(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    data JSON, -- Store additional data as JSON
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- 5. BUSINESS ACTIVITY TABLE
CREATE TABLE IF NOT EXISTS business_activity (
    id SERIAL PRIMARY KEY,
    business_id INT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- review, message, booking, update, feature, verify
    description TEXT NOT NULL,
    triggered_by INT REFERENCES users(id) ON DELETE SET NULL,
    data JSON,
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_business_id (business_id),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- 6. AGENTS TABLE
CREATE TABLE IF NOT EXISTS agents (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    monthly_target DECIMAL(10, 2) DEFAULT 0,
    current_progress DECIMAL(10, 2) DEFAULT 0,
    deals_closed INT DEFAULT 0,
    total_revenue DECIMAL(15, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, retired
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);

-- 7. AGENT PERFORMANCE TABLE
CREATE TABLE IF NOT EXISTS agent_performance (
    id SERIAL PRIMARY KEY,
    agent_id INT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    month_year DATE NOT NULL,
    target DECIMAL(10, 2),
    actual DECIMAL(10, 2),
    deals_count INT,
    commission DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE KEY unique_agent_month (agent_id, month_year),
    INDEX idx_agent_id (agent_id),
    INDEX idx_month_year (month_year)
);

-- 8. AI RECOMMENDATIONS TABLE
CREATE TABLE IF NOT EXISTS ai_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_id INT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    reason VARCHAR(255),
    confidence DECIMAL(3, 2),
    clicked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    clicked_at TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_business_id (business_id),
    INDEX idx_created_at (created_at)
);

-- 9. CONVERSATIONS TABLE (for grouping messages)
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_id INT REFERENCES businesses(id) ON DELETE CASCADE,
    other_user_id INT REFERENCES users(id) ON DELETE CASCADE,
    last_message_id INT REFERENCES messages(id) ON DELETE SET NULL,
    last_message_at TIMESTAMP,
    archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE KEY unique_conversation (user_id, business_id, other_user_id),
    INDEX idx_user_id (user_id),
    INDEX idx_business_id (business_id),
    INDEX idx_last_message_at (last_message_at)
);

-- Create aggregated view for user loyalty points
CREATE OR REPLACE VIEW user_loyalty_view AS
SELECT 
    u.id as user_id,
    u.email,
    u.name,
    COALESCE(SUM(lp.points), 0) as total_points,
    COUNT(DISTINCT lp.id) as point_transactions,
    MAX(lp.created_at) as last_points_activity
FROM users u
LEFT JOIN loyalty_points lp ON u.id = lp.user_id
GROUP BY u.id, u.email, u.name;

-- Create aggregated view for referral stats
CREATE OR REPLACE VIEW referral_stats_view AS
SELECT 
    r.referrer_id as user_id,
    COUNT(CASE WHEN r.status = 'completed' THEN 1 END) as completed_referrals,
    COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending_referrals,
    COALESCE(SUM(r.reward_points), 0) as total_reward_points
FROM referrals r
GROUP BY r.referrer_id;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(sender_id, business_id, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_user_date ON recent_activity(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_business_activity_date ON business_activity(business_id, created_at DESC);
