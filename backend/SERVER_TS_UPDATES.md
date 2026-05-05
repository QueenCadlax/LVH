// This file shows what to add to your existing backend/src/server.ts

// ADD THESE IMPORTS at the top with other route imports:
// import adminRoutes from './routes/adminRoutes';
// import subscriptionRoutes from './routes/subscriptionRoutes';

// ADD THESE MOUNT POINTS in the routes section (after other app.use() calls):
// app.use('/api/admin', adminRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);

// FULL CONTEXT (find these in your server.ts):

/*
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/favorites', favoriteRoutes);

// REPLACE WITH THIS:

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
*/
