import pool from '../config/database';

export interface Review {
  id: number;
  businessId: number;
  userId: number;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const createReview = async (businessId: number, userId: number, data: any): Promise<Review> => {
  const { rating, title, comment, images = [] } = data;

  const result = await pool.query(
    `INSERT INTO reviews (
      "businessId", "userId", rating, title, comment, images
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [businessId, userId, rating, title, comment, images],
  );

  // Update business average rating
  await updateBusinessRating(businessId);

  return result.rows[0];
};

export const getReviewsByBusiness = async (businessId: number, page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;

  const result = await pool.query(
    `SELECT r.*, u.fullName, u.profileImage
    FROM reviews r
    JOIN users u ON r."userId" = u.id
    WHERE r."businessId" = $1
    ORDER BY r."createdAt" DESC
    LIMIT $2 OFFSET $3`,
    [businessId, limit, offset],
  );

  const countResult = await pool.query('SELECT COUNT(*) as count FROM reviews WHERE "businessId" = $1', [businessId]);

  return {
    reviews: result.rows,
    total: parseInt(countResult.rows[0].count, 10),
    page,
  };
};

export const deleteReview = async (reviewId: number, userId: number): Promise<boolean> => {
  const result = await pool.query(
    'DELETE FROM reviews WHERE id = $1 AND "userId" = $2 RETURNING "businessId"',
    [reviewId, userId],
  );

  if (result.rows.length > 0) {
    const businessId = result.rows[0].businessId;
    await updateBusinessRating(businessId);
    return true;
  }

  return false;
};

export const updateBusinessRating = async (businessId: number): Promise<void> => {
  const result = await pool.query(
    `UPDATE businesses 
    SET rating = (SELECT AVG(rating)::NUMERIC(3,2) FROM reviews WHERE "businessId" = $1),
        "reviewCount" = (SELECT COUNT(*) FROM reviews WHERE "businessId" = $1)
    WHERE id = $1`,
    [businessId],
  );
};

export const markHelpful = async (reviewId: number): Promise<void> => {
  await pool.query('UPDATE reviews SET helpful = helpful + 1 WHERE id = $1', [reviewId]);
};
