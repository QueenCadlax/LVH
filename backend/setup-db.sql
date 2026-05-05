-- Create lowveld user and database
-- Run this as postgres (superuser)

-- Drop existing if needed (uncomment if recreating)
-- DROP DATABASE IF EXISTS lowveldhub;
-- DROP USER IF EXISTS lowveld;

-- Create the user
CREATE USER lowveld WITH PASSWORD 'lowveld2026';

-- Create the database with lowveld as owner
CREATE DATABASE lowveldhub OWNER lowveld;

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE lowveldhub TO lowveld;

-- Connect to the lowveldhub database and grant schema privileges
\c lowveldhub

GRANT ALL PRIVILEGES ON SCHEMA public TO lowveld;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO lowveld;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO lowveld;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO lowveld;

-- Verify setup
SELECT * FROM pg_user WHERE usename = 'lowveld';
SELECT datname, datowner FROM pg_database WHERE datname = 'lowveldhub';
