// Global crash handlers must be registered before any other code
process.on('uncaughtException', (err: any) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason: any) => {
  console.error('UNHANDLED REJECTION:', reason);
});

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import agentRoutes from './routes/agentRoutes';
import loyaltyRoutes from './routes/loyaltyRoutes';
import activityRoutes from './routes/activityRoutes';
import submissionRoutes from './routes/submissionRoutes';
import productRoutes from './routes/productRoutes';
import newsletterRoutes from './routes/newsletterRoutes';

dotenv.config();

console.log('✅ Starting LowveldHub Backend Server...');

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin: any, callback: any) => {
    if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(null, process.env.NODE_ENV !== 'production');
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Backend is running', version: '3.0.0' });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/newsletter', newsletterRoutes);

console.log('Mounted routes: /api/auth, /api/user, /api/admin, /api/agents, /api/loyalty, /api/activity, /api/submissions, /api/products, /api/newsletter');

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

// Start server inside try/catch and log before/after. Do not run any code after listen.
try {
  console.log(`Attempting to listen on port ${PORT}...`);
  const server = app.listen(PORT, () => {
    console.log(`\n🚀 LowveldHub Backend Server Running`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🔗 Health: http://localhost:${PORT}/health`);
    console.log(`🧪 Test: http://localhost:${PORT}/api/test\n`);
  });

  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is in use!`);
      process.exit(1);
    } else {
      console.error('Server error:', error);
    }
  });
  
  // Keep the process alive - don't exit unless there's an error
  process.stdin.resume();
} catch (err: any) {
  console.error('Failed to start server:', err);
  process.exit(1);
}

// Export for testing/reuse
export default app;
