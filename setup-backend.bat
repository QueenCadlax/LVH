@echo off
REM LowveldHub Backend Quick Setup Script (Windows)
REM Run this to initialize the backend project structure

echo.
echo 🚀 LowveldHub Backend Initialization
echo ====================================
echo.

REM Create backend directory
mkdir lowveldhub-backend
cd lowveldhub-backend

REM Initialize npm
call npm init -y

REM Install core dependencies
echo.
echo 📦 Installing dependencies...
call npm install express cors dotenv pg axios bcryptjs jsonwebtoken nodemailer helmet express-validator

REM Install dev dependencies
call npm install --save-dev typescript ts-node @types/node @types/express @types/cors nodemon

REM Initialize TypeScript
echo.
echo ⚙️  Setting up TypeScript...
call npx tsc --init

REM Create folder structure
echo.
echo 📁 Creating project structure...
mkdir src\config
mkdir src\controllers
mkdir src\models
mkdir src\routes
mkdir src\middleware
mkdir src\services
mkdir src\utils
mkdir src\migrations

REM Create .env template
(
  echo # Server
  echo NODE_ENV=development
  echo PORT=5000
  echo API_URL=http://localhost:5000
  echo FRONTEND_URL=http://localhost:3000
  echo.
  echo # Database
  echo DB_HOST=localhost
  echo DB_PORT=5432
  echo DB_NAME=lowveldhub
  echo DB_USER=postgres
  echo DB_PASSWORD=your_password
  echo.
  echo # JWT
  echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
  echo JWT_EXPIRY=7d
  echo.
  echo # Email
  echo SMTP_HOST=smtp.gmail.com
  echo SMTP_PORT=587
  echo SMTP_USER=your_email@gmail.com
  echo SMTP_PASSWORD=your_app_password
  echo.
  echo # Storage
  echo CLOUDINARY_NAME=your_name
  echo CLOUDINARY_API_KEY=your_key
  echo CLOUDINARY_API_SECRET=your_secret
) > .env

echo.
echo ✅ Backend project initialized!
echo.
echo 📋 Next steps:
echo 1. Update .env with your actual credentials
echo 2. Setup PostgreSQL database
echo 3. Run: npm run dev
echo.
echo 📚 See BACKEND_IMPLEMENTATION_PLAN.md for detailed instructions
echo.

pause
