import pool from '../config/database';

export interface Enquiry {
  id: number;
  businessId: number;
  userId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: number;
  createdAt: Date;
  updatedAt: Date;
}

export const createEnquiry = async (businessId: number, userId: number, data: any): Promise<Enquiry> => {
  const { name, email, phone, message } = data;

  const result = await pool.query(
    `INSERT INTO enquiries (
      "businessId", "userId", name, email, phone, message, status, priority
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [businessId, userId, name, email, phone, message, 'new', 'medium'],
  );

  return result.rows[0];
};

export const getEnquiriesByBusiness = async (businessId: number, page: number = 1, limit: number = 20) => {
  const offset = (page - 1) * limit;

  const result = await pool.query(
    `SELECT e.*, u.fullName, u.email as "userEmail"
    FROM enquiries e
    LEFT JOIN users u ON e."userId" = u.id
    WHERE e."businessId" = $1
    ORDER BY 
      CASE WHEN e.status = 'new' THEN 1 ELSE 2 END,
      CASE 
        WHEN e.priority = 'high' THEN 1
        WHEN e.priority = 'medium' THEN 2
        ELSE 3
      END,
      e."createdAt" DESC
    LIMIT $2 OFFSET $3`,
    [businessId, limit, offset],
  );

  const countResult = await pool.query(
    'SELECT COUNT(*) as count FROM enquiries WHERE "businessId" = $1',
    [businessId],
  );

  return {
    enquiries: result.rows,
    total: parseInt(countResult.rows[0].count, 10),
    page,
  };
};

export const updateEnquiryStatus = async (
  enquiryId: number,
  businessId: number,
  status: string,
): Promise<Enquiry> => {
  const result = await pool.query(
    'UPDATE enquiries SET status = $1, "updatedAt" = NOW() WHERE id = $2 AND "businessId" = $3 RETURNING *',
    [status, enquiryId, businessId],
  );

  if (result.rows.length === 0) {
    throw new Error('Enquiry not found');
  }

  return result.rows[0];
};

export const updateEnquiryPriority = async (
  enquiryId: number,
  businessId: number,
  priority: string,
): Promise<Enquiry> => {
  const result = await pool.query(
    'UPDATE enquiries SET priority = $1, "updatedAt" = NOW() WHERE id = $2 AND "businessId" = $3 RETURNING *',
    [priority, enquiryId, businessId],
  );

  if (result.rows.length === 0) {
    throw new Error('Enquiry not found');
  }

  return result.rows[0];
};

export const assignEnquiry = async (enquiryId: number, businessId: number, userId: number): Promise<Enquiry> => {
  const result = await pool.query(
    'UPDATE enquiries SET "assignedTo" = $1, "updatedAt" = NOW() WHERE id = $2 AND "businessId" = $3 RETURNING *',
    [userId, enquiryId, businessId],
  );

  if (result.rows.length === 0) {
    throw new Error('Enquiry not found');
  }

  return result.rows[0];
};

export const getEnquiryStats = async (businessId: number) => {
  const result = await pool.query(
    `SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as "newCount",
      SUM(CASE WHEN status = 'responded' THEN 1 ELSE 0 END) as "respondedCount",
      SUM(CASE WHEN priority = 'high' THEN 1 ELSE 0 END) as "highPriorityCount"
    FROM enquiries
    WHERE "businessId" = $1`,
    [businessId],
  );

  return result.rows[0];
};
