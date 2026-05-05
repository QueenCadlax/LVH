#!/bin/bash

# LowveldHub Backend Quick Setup Script
# Run this to initialize the backend project structure

echo "🚀 LowveldHub Backend Initialization"
echo "===================================="
echo ""

# Create backend directory
mkdir lowveldhub-backend
cd lowveldhub-backend

# Initialize npm
npm init -y

# Install core dependencies
echo "📦 Installing dependencies..."
npm install express cors dotenv pg axios bcryptjs jsonwebtoken nodemailer helmet express-validator

# Install dev dependencies
npm install --save-dev typescript ts-node @types/node @types/express @types/cors nodemon

# Initialize TypeScript
echo "⚙️  Setting up TypeScript..."
npx tsc --init

# Create folder structure
echo "📁 Creating project structure..."
mkdir -p src/{config,controllers,models,routes,middleware,services,utils,migrations}

# Create .env template
cat > .env << 'EOF'
# Server
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lowveldhub
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Storage
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
EOF

# Create src/server.ts
cat > src/server.ts << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`💾 Database: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
});
EOF

# Create package.json scripts update
echo ""
echo "✅ Backend project initialized!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env with your actual credentials"
echo "2. Setup PostgreSQL database"
echo "3. Run: npm run dev"
echo ""
echo "📚 See BACKEND_IMPLEMENTATION_PLAN.md for detailed instructions"
echo ""
