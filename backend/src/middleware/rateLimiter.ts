import rateLimit from 'express-rate-limit';

const isDevelopment = process.env.NODE_ENV === 'development';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 1000 : 100, // More lenient in dev
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  skip: () => isDevelopment // Skip rate limiting in development
});

export const strictRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDevelopment ? 1000 : 5, // Much more lenient in dev for testing
  message: 'Too many attempts, please try again later.',
  skip: () => isDevelopment // Skip rate limiting in development
});
