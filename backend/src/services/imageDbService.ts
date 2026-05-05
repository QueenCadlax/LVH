import pool from '../config/database';

export const saveImageRecord = async (
  businessId: number,
  originalName: string,
  storagePath: string,
  cloudinaryId: string,
  fileSize: number,
  fileType: string,
  uploadedBy: number,
) => {
  const result = await pool.query(
    `INSERT INTO images (
      "businessId", "originalName", "storagePath", "cloudinaryId", 
      "fileSize", "fileType", "uploadedBy"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [businessId, originalName, storagePath, cloudinaryId, fileSize, fileType, uploadedBy],
  );

  return result.rows[0];
};

export const getImagesByBusiness = async (businessId: number) => {
  const result = await pool.query('SELECT * FROM images WHERE "businessId" = $1 ORDER BY "createdAt" DESC', [
    businessId,
  ]);

  return result.rows;
};

export const deleteImageRecord = async (imageId: number, uploadedBy: number) => {
  const result = await pool.query('DELETE FROM images WHERE id = $1 AND "uploadedBy" = $2 RETURNING "cloudinaryId"', [
    imageId,
    uploadedBy,
  ]);

  return result.rows[0];
};
