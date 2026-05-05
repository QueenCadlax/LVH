import pool from '../config/database';

export interface Favorite {
  id: number;
  userId: number;
  businessId: number;
  createdAt: Date;
}

export const addFavorite = async (userId: number, businessId: number): Promise<Favorite> => {
  // Check if already favorited
  const existing = await pool.query(
    'SELECT * FROM favorites WHERE "userId" = $1 AND "businessId" = $2',
    [userId, businessId],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0];
  }

  const result = await pool.query(
    'INSERT INTO favorites ("userId", "businessId") VALUES ($1, $2) RETURNING *',
    [userId, businessId],
  );

  return result.rows[0];
};

export const removeFavorite = async (userId: number, businessId: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM favorites WHERE "userId" = $1 AND "businessId" = $2', [
    userId,
    businessId,
  ]);

  return result.rowCount! > 0;
};

export const getFavorites = async (userId: number, page: number = 1, limit: number = 20) => {
  const offset = (page - 1) * limit;

  const result = await pool.query(
    `SELECT b.* FROM businesses b
    JOIN favorites f ON b.id = f."businessId"
    WHERE f."userId" = $1
    ORDER BY f."createdAt" DESC
    LIMIT $2 OFFSET $3`,
    [userId, limit, offset],
  );

  const countResult = await pool.query('SELECT COUNT(*) as count FROM favorites WHERE "userId" = $1', [userId]);

  return {
    favorites: result.rows,
    total: parseInt(countResult.rows[0].count, 10),
    page,
  };
};

export const isFavorited = async (userId: number, businessId: number): Promise<boolean> => {
  const result = await pool.query(
    'SELECT id FROM favorites WHERE "userId" = $1 AND "businessId" = $2',
    [userId, businessId],
  );

  return result.rows.length > 0;
};
