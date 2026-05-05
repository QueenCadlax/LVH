import pool from '../config/database';

// Admin Management
export const getAdmin = async (userId: number) => {
  const result = await pool.query('SELECT * FROM admins WHERE "userId" = $1', [userId]);
  return result.rows[0] || null;
};

export const isAdmin = async (userId: number): Promise<boolean> => {
  const result = await pool.query('SELECT id FROM admins WHERE "userId" = $1', [userId]);
  return result.rows.length > 0;
};

export const isSuperAdmin = async (userId: number): Promise<boolean> => {
  const result = await pool.query("SELECT id FROM admins WHERE \"userId\" = $1 AND role = 'super_admin'", [userId]);
  return result.rows.length > 0;
};

// Business Approval Management
export const getPendingApprovals = async (page: number = 1, limit: number = 20) => {
  const offset = (page - 1) * limit;

  const result = await pool.query(
    `SELECT b.*, CONCAT(u."firstName", ' ', u."lastName") as ownerName, u.email as ownerEmail
     FROM businesses b
     JOIN users u ON b."userId" = u.id
     WHERE b.status = 'pending'
     ORDER BY b."createdAt" ASC
     LIMIT $1 OFFSET $2`,
    [limit, offset],
  );

  const countResult = await pool.query("SELECT COUNT(*) as count FROM businesses WHERE status = 'pending'");

  return {
    businesses: result.rows,
    total: parseInt(countResult.rows[0].count, 10),
    page,
    totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / limit),
  };
};

export const approveBusiness = async (
  businessId: number,
  approvedBy: number,
  tier: string = 'free',
  notes: string = '',
): Promise<any> => {
  const result = await pool.query(
    `UPDATE businesses 
     SET status = 'approved', tier = $1, "updatedAt" = NOW()
     WHERE id = $2
     RETURNING *`,
    [tier, businessId],
  );

  if (result.rows.length === 0) {
    throw new Error('Business not found');
  }

  // Log approval
  await pool.query(
    `INSERT INTO admin_logs (action, "businessId", "adminId", notes)
     VALUES ($1, $2, $3, $4)`,
    ['approve_business', businessId, approvedBy, notes],
  );

  return result.rows[0];
};

export const rejectBusiness = async (businessId: number, approvedBy: number, notes: string): Promise<any> => {
  const result = await pool.query(
    `UPDATE businesses 
     SET status = 'rejected', "updatedAt" = NOW()
     WHERE id = $1
     RETURNING *`,
    [businessId],
  );

  if (result.rows.length === 0) {
    throw new Error('Business not found');
  }

  // Log rejection
  await pool.query(
    `INSERT INTO admin_logs (action, "businessId", "adminId", notes)
     VALUES ($1, $2, $3, $4)`,
    ['reject_business', businessId, approvedBy, notes],
  );

  return result.rows[0];
};

export const suspendBusiness = async (businessId: number, adminId: number, reason: string): Promise<any> => {
  const result = await pool.query(
    `UPDATE businesses 
     SET status = 'suspended', "updatedAt" = NOW()
     WHERE id = $1
     RETURNING *`,
    [businessId],
  );

  if (result.rows.length === 0) {
    throw new Error('Business not found');
  }

  await pool.query(
    `INSERT INTO admin_logs (action, "businessId", "adminId", notes)
     VALUES ($1, $2, $3, $4)`,
    ['suspend_business', businessId, adminId, reason],
  );

  return result.rows[0];
};

export const upgradeTier = async (businessId: number, newTier: string, upgrader: number): Promise<any> => {
  const result = await pool.query(
    `UPDATE businesses 
     SET tier = $1, "updatedAt" = NOW()
     WHERE id = $2
     RETURNING *`,
    [newTier, businessId],
  );

  if (result.rows.length === 0) {
    throw new Error('Business not found');
  }

  // Create/update subscription
  await pool.query(
    `INSERT INTO subscriptions ("businessId", tier, status, "startDate", "renewalDate", "nextBillingDate")
     VALUES ($1, $2, 'active', NOW(), NOW() + INTERVAL '30 days', NOW() + INTERVAL '30 days')
     ON CONFLICT ("businessId") DO UPDATE
     SET tier = $2, "renewalDate" = NOW() + INTERVAL '30 days', "nextBillingDate" = NOW() + INTERVAL '30 days'`,
    [businessId, newTier],
  );

  await pool.query(
    `INSERT INTO admin_logs (action, "businessId", "adminId", notes)
     VALUES ($1, $2, $3, $4)`,
    ['upgrade_tier', businessId, upgrader, `Upgraded to ${newTier}`],
  );

  return result.rows[0];
};

// Platform Statistics
export const getPlatformStats = async () => {
  const totalBusinesses = await pool.query("SELECT COUNT(*) as count FROM businesses WHERE status != 'rejected'");

  const activeBusinesses = await pool.query("SELECT COUNT(*) as count FROM businesses WHERE status = 'approved'");

  const pendingApprovals = await pool.query("SELECT COUNT(*) as count FROM businesses WHERE status = 'pending'");

  const totalUsers = await pool.query('SELECT COUNT(*) as count FROM users');

  const totalReviews = await pool.query('SELECT COUNT(*) as count FROM reviews');

  const totalEnquiries = await pool.query('SELECT COUNT(*) as count FROM enquiries');

  const avgRating = await pool.query('SELECT AVG(rating)::NUMERIC(3,2) as avg FROM businesses WHERE rating > 0');

  return {
    totalBusinesses: parseInt(totalBusinesses.rows[0].count, 10),
    activeBusinesses: parseInt(activeBusinesses.rows[0].count, 10),
    pendingApprovals: parseInt(pendingApprovals.rows[0].count, 10),
    totalUsers: parseInt(totalUsers.rows[0].count, 10),
    totalReviews: parseInt(totalReviews.rows[0].count, 10),
    totalEnquiries: parseInt(totalEnquiries.rows[0].count, 10),
    averageRating: parseFloat(avgRating.rows[0].avg || 0),
  };
};

// Tier Analytics
export const getTierDistribution = async () => {
  const result = await pool.query(
    `SELECT tier, COUNT(*) as count
     FROM businesses
     WHERE status = 'approved'
     GROUP BY tier
     ORDER BY tier`,
  );

  return result.rows;
};

// Business-level Analytics
export const getBusinessAnalytics = async (businessId: number) => {
  const businessResult = await pool.query(
    `SELECT id, views, clicks, rating, "reviewCount"
     FROM businesses
     WHERE id = $1`,
    [businessId],
  );

  if (businessResult.rows.length === 0) {
    throw new Error('Business not found');
  }

  const enquiriesResult = await pool.query(
    `SELECT COUNT(*) as count
     FROM enquiries
     WHERE "businessId" = $1`,
    [businessId],
  );

  const business = businessResult.rows[0];

  return {
    businessId,
    views: business.views,
    clicks: business.clicks,
    reviews: business.reviewCount,
    enquiries: parseInt(enquiriesResult.rows[0].count, 10),
    averageRating: business.rating,
    conversionRate: business.clicks > 0 ? (business.views / business.clicks * 100).toFixed(2) : 0,
  };
};

// All Businesses for Admin
export const getAllBusinessesForAdmin = async (
  page: number = 1,
  limit: number = 20,
  filters: any = {},
) => {
  const { status, tier, search } = filters;
  const offset = (page - 1) * limit;

  let query = 'SELECT b.*, CONCAT(u."firstName", \' \', u."lastName") as ownerName FROM businesses b JOIN users u ON b."userId" = u.id WHERE 1=1';
  const params: any[] = [];
  let paramCount = 1;

  if (status) {
    query += ` AND b.status = $${paramCount}`;
    params.push(status);
    paramCount++;
  }

  if (tier) {
    query += ` AND b.tier = $${paramCount}`;
    params.push(tier);
    paramCount++;
  }

  if (search) {
    query += ` AND (b.name ILIKE $${paramCount} OR u.fullName ILIKE $${paramCount})`;
    params.push(`%${search}%`);
    paramCount++;
  }

  query += ` ORDER BY b."createdAt" DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);

  // Count total
  let countQuery = 'SELECT COUNT(*) as count FROM businesses b WHERE 1=1';
  const countParams: any[] = [];
  let countParamCount = 1;

  if (status) {
    countQuery += ` AND b.status = $${countParamCount}`;
    countParams.push(status);
    countParamCount++;
  }

  if (tier) {
    countQuery += ` AND b.tier = $${countParamCount}`;
    countParams.push(tier);
    countParamCount++;
  }

  const countResult = await pool.query(countQuery, countParams);

  return {
    businesses: result.rows,
    total: parseInt(countResult.rows[0].count, 10),
    page,
    totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / limit),
  };
};
