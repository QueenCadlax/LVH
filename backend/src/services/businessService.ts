import pool from '../config/database';
import { Business, BusinessFilters, BusinessCreateRequest, BusinessUpdateRequest } from '../models/Business';

export const createBusiness = async (userId: number, data: BusinessCreateRequest): Promise<Business> => {
  const {
    name,
    description,
    category,
    area,
    email,
    phone,
    location,
    website,
    subcategories = [],
    hours = {},
    priceRange = {},
    services = [],
    amenities = [],
  } = data;

  const result = await pool.query(
    `INSERT INTO businesses (
      "userId", name, description, category, area, email, phone, 
      location, website, subcategories, hours, "priceRange", services, 
      amenities, tier, status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *`,
    [
      userId,
      name,
      description,
      category,
      area,
      email,
      phone,
      location,
      website,
      subcategories,
      JSON.stringify(hours),
      JSON.stringify(priceRange),
      services,
      amenities,
      'trial', // Default tier
      'pending', // Default status
    ],
  );

  return result.rows[0];
};

export const getBusinessById = async (id: number): Promise<Business | null> => {
  const result = await pool.query(
    'SELECT * FROM businesses WHERE id = $1 AND status != $2',
    [id, 'closed'],
  );
  return result.rows[0] || null;
};

export const getBusinesses = async (filters: BusinessFilters) => {
  const {
    page = 1,
    limit = 20,
    category,
    area,
    tier,
    search,
    rating,
    sort = 'rating',
    order = 'desc',
  } = filters;

  let query = 'SELECT * FROM businesses WHERE status = $1';
  const params: any[] = ['approved'];
  let paramCount = 2;

  if (category) {
    query += ` AND category = $${paramCount}`;
    params.push(category);
    paramCount++;
  }

  if (area) {
    query += ` AND area = $${paramCount}`;
    params.push(area);
    paramCount++;
  }

  if (tier) {
    query += ` AND tier = $${paramCount}`;
    params.push(tier);
    paramCount++;
  }

  if (rating) {
    query += ` AND rating >= $${paramCount}`;
    params.push(rating);
    paramCount++;
  }

  if (search) {
    query += ` AND (
      to_tsvector('english', name || ' ' || COALESCE(description, '')) 
      @@ plainto_tsquery('english', $${paramCount})
    )`;
    params.push(search);
    paramCount++;
  }

  // Sort
  const sortColumn = sort === 'newest' ? '"createdAt"' : sort === 'popular' ? 'views' : 'rating';
  query += ` ORDER BY ${sortColumn} ${order.toUpperCase()}`;

  // Pagination
  const offset = (page - 1) * limit;
  query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);

  // Get total count
  let countQuery = 'SELECT COUNT(*) as count FROM businesses WHERE status = $1';
  const countParams: any[] = ['active'];
  let countParamCount = 2;

  if (category) {
    countQuery += ` AND category = $${countParamCount}`;
    countParams.push(category);
    countParamCount++;
  }

  if (area) {
    countQuery += ` AND area = $${countParamCount}`;
    countParams.push(area);
    countParamCount++;
  }

  const countResult = await pool.query(countQuery, countParams);
  const total = parseInt(countResult.rows[0].count, 10);

  return {
    businesses: result.rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateBusiness = async (id: number, userId: number, data: BusinessUpdateRequest): Promise<Business> => {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  // Build dynamic update query
  const allowedFields = [
    'name',
    'description',
    'category',
    'area',
    'email',
    'phone',
    'location',
    'website',
    'subcategories',
    'hours',
    'priceRange',
    'services',
    'amenities',
  ];

  for (const [key, value] of Object.entries(data)) {
    if (allowedFields.includes(key)) {
      updates.push(`"${key}" = $${paramCount}`);
      values.push(['hours', 'priceRange'].includes(key) ? JSON.stringify(value) : value);
      paramCount++;
    }
  }

  if (updates.length === 0) {
    throw new Error('No valid fields to update');
  }

  updates.push('"updatedAt" = NOW()');

  const query = `
    UPDATE businesses 
    SET ${updates.join(', ')}
    WHERE id = $${paramCount} AND "userId" = $${paramCount + 1}
    RETURNING *
  `;

  values.push(id, userId);

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    throw new Error('Business not found or unauthorized');
  }

  return result.rows[0];
};

export const deleteBusiness = async (id: number, userId: number): Promise<boolean> => {
  const result = await pool.query(
    'DELETE FROM businesses WHERE id = $1 AND "userId" = $2',
    [id, userId],
  );

  return result.rowCount! > 0;
};

export const incrementBusinessViews = async (id: number): Promise<void> => {
  await pool.query('UPDATE businesses SET views = views + 1 WHERE id = $1', [id]);
};

export const incrementBusinessClicks = async (id: number): Promise<void> => {
  await pool.query('UPDATE businesses SET clicks = clicks + 1 WHERE id = $1', [id]);
};

export const getBusinessesByOwner = async (userId: number, page: number = 1, limit: number = 20) => {
  const offset = (page - 1) * limit;

  const result = await pool.query(
    'SELECT * FROM businesses WHERE "userId" = $1 ORDER BY "createdAt" DESC LIMIT $2 OFFSET $3',
    [userId, limit, offset],
  );

  const countResult = await pool.query('SELECT COUNT(*) as count FROM businesses WHERE "userId" = $1', [
    userId,
  ]);

  const total = parseInt(countResult.rows[0].count, 10);

  return {
    businesses: result.rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateBusinessTier = async (id: number, tier: string): Promise<Business> => {
  const result = await pool.query('UPDATE businesses SET tier = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING *', [
    tier,
    id,
  ]);

  if (result.rows.length === 0) {
    throw new Error('Business not found');
  }

  return result.rows[0];
};

export const verifyBusiness = async (id: number): Promise<Business> => {
  const result = await pool.query(
    'UPDATE businesses SET "isVerified" = true, "verificationDate" = NOW(), "updatedAt" = NOW() WHERE id = $1 RETURNING *',
    [id],
  );

  if (result.rows.length === 0) {
    throw new Error('Business not found');
  }

  return result.rows[0];
};
