import pool from '../config/database';

export const createSubscription = async (businessId: number, tier: string) => {
  const result = await pool.query(
    `INSERT INTO subscriptions ("businessId", tier, status, "startDate", "renewalDate", "nextBillingDate", "autoRenew")
     VALUES ($1, $2, 'active', NOW(), NOW() + INTERVAL '30 days', NOW() + INTERVAL '30 days', true)
     ON CONFLICT ("businessId") DO UPDATE
     SET tier = $2, status = 'active', "renewalDate" = NOW() + INTERVAL '30 days'
     RETURNING *`,
    [businessId, tier],
  );

  return result.rows[0];
};

export const getSubscription = async (businessId: number) => {
  const result = await pool.query('SELECT * FROM subscriptions WHERE "businessId" = $1', [businessId]);
  return result.rows[0] || null;
};

export const cancelSubscription = async (businessId: number) => {
  const result = await pool.query(
    'UPDATE subscriptions SET status = $1, "updatedAt" = NOW() WHERE "businessId" = $2 RETURNING *',
    ['cancelled', businessId],
  );

  return result.rows[0];
};

export const getActiveSubscriptions = async (page: number = 1, limit: number = 50) => {
  const offset = (page - 1) * limit;

  const result = await pool.query(
    `SELECT s.*, b.name as "businessName", b.category
     FROM subscriptions s
     JOIN businesses b ON s."businessId" = b.id
     WHERE s.status = 'active'
     ORDER BY s."nextBillingDate" ASC
     LIMIT $1 OFFSET $2`,
    [limit, offset],
  );

  const countResult = await pool.query('SELECT COUNT(*) as count FROM subscriptions WHERE status = $1', ['active']);

  return {
    subscriptions: result.rows,
    total: parseInt(countResult.rows[0].count, 10),
    page,
    totalPages: Math.ceil(parseInt(countResult.rows[0].count, 10) / limit),
  };
};

export const getSubscriptionStats = async () => {
  const result = await pool.query(
    `SELECT 
      tier,
      COUNT(*) as count,
      COUNT(CASE WHEN status = 'active' THEN 1 END) as active
     FROM subscriptions
     GROUP BY tier`,
  );

  return result.rows;
};
