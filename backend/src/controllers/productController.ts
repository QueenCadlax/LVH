import { Router } from 'express';
import pool from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/authMiddleware';

/**
 * Product Controller - Marketplace product CRUD & moderation
 * Handles: listing, reporting, admin review
 */

// ============ PUBLIC ENDPOINTS ============

/**
 * GET /api/products
 * Fetch all active products with filters (category, search, min/max price)
 */
export const getProducts = async (req: any, res: any) => {
  try {
    const { category, search, minPrice, maxPrice, limit = 20, offset = 0 } = req.query;

    let query = `
      SELECT 
        id, title, description, category, condition, 
        price_value as priceValue, stock, images, 
        seller_id as sellerId, seller_name as sellerName, 
        seller_email as sellerEmail, pricing_tier as pricingTier,
        created_at as createdAt, expires_at as expiresAt,
        reported_count as reportedCount, status
      FROM products
      WHERE status = 'active' 
        AND is_suspended = false
        AND (expires_at IS NULL OR expires_at > NOW())
    `;

    const params: any[] = [];
    let paramCount = 1;

    if (category) {
      query += ` AND category = $${paramCount++}`;
      params.push(category);
    }

    if (search) {
      query += ` AND (title ILIKE $${paramCount++} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`, `%${search}%`);
      paramCount += 2;
    }

    if (minPrice) {
      query += ` AND price_value >= $${paramCount++}`;
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ` AND price_value <= $${paramCount++}`;
      params.push(parseFloat(maxPrice));
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount++} OFFSET $${paramCount++}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM products WHERE status = \'active\' AND is_suspended = false';
    if (category) countQuery += ` AND category = '${category}'`;
    if (search) countQuery += ` AND (title ILIKE '%${search}%' OR description ILIKE '%${search}%')`;
    if (minPrice) countQuery += ` AND price_value >= ${minPrice}`;
    if (maxPrice) countQuery += ` AND price_value <= ${maxPrice}`;

    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

/**
 * GET /api/products/:id
 * Fetch single product by ID
 */
export const getProductById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        id, title, description, category, condition, 
        price_value as priceValue, stock, images, 
        seller_id as sellerId, seller_name as sellerName,
        seller_email as sellerEmail, seller_phone as sellerPhone, 
        seller_type as sellerType, pricing_tier as pricingTier,
        created_at as createdAt, expires_at as expiresAt,
        reported_count as reportedCount, status, featured
      FROM products
      WHERE id = $1 AND status = 'active' AND is_suspended = false`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// ============ PROTECTED ENDPOINTS (Sellers) ============

/**
 * POST /api/products
 * Create new product listing
 */
export const createProduct = async (req: AuthRequest, res: any) => {
  try {
    const { title, description, category, condition, priceValue, stock, images, sellerPhone, sellerType, pricingTier, expiresAt } = req.body;
    const sellerId = req.user?.id;
    const sellerName = 'Anonymous';
    const sellerEmail = req.user?.email || '';

    // Validation
    if (!title || !description || !category || !priceValue || images.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const productId = `prod_${uuidv4()}`;

    const result = await pool.query(
      `INSERT INTO products (
        id, title, description, category, condition, price_value,
        stock, images, seller_id, seller_name, seller_email, seller_phone,
        seller_type, pricing_tier, created_at, expires_at, status, reported_count, is_suspended
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), $15, 'active', 0, false)
      RETURNING id, title, price_value as priceValue, seller_name as sellerName`,
      [
        productId, title, description, category, condition, priceValue,
        stock, JSON.stringify(images), sellerId, sellerName, sellerEmail,
        sellerPhone, sellerType, pricingTier, expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Product listed successfully and is now live on the marketplace'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

/**
 * PUT /api/products/:id
 * Update product (seller only)
 */
export const updateProduct = async (req: AuthRequest, res: any) => {
  try {
    const { id } = req.params;
    const { title, description, category, condition, priceValue, stock, images } = req.body;
    const sellerId = req.user?.id;

    // Verify ownership
    const ownerCheck = await pool.query(
      'SELECT seller_id FROM products WHERE id = $1',
      [id]
    );

    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (ownerCheck.rows[0].seller_id !== sellerId) {
      return res.status(403).json({ error: 'Unauthorized to update this product' });
    }

    const result = await pool.query(
      `UPDATE products 
      SET title = $1, description = $2, category = $3, condition = $4,
          price_value = $5, stock = $6, images = $7, updated_at = NOW()
      WHERE id = $8
      RETURNING id, title, price_value as priceValue`,
      [title, description, category, condition, priceValue, stock, JSON.stringify(images), id]
    );

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

/**
 * DELETE /api/products/:id
 * Delete product (soft delete - seller only)
 */
export const deleteProduct = async (req: AuthRequest, res: any) => {
  try {
    const { id } = req.params;
    const sellerId = req.user?.id;

    // Verify ownership
    const ownerCheck = await pool.query(
      'SELECT seller_id FROM products WHERE id = $1',
      [id]
    );

    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (ownerCheck.rows[0].seller_id !== sellerId) {
      return res.status(403).json({ error: 'Unauthorized to delete this product' });
    }

    await pool.query(
      'UPDATE products SET status = $1, updated_at = NOW() WHERE id = $2',
      ['removed', id]
    );

    res.json({
      success: true,
      message: 'Product removed'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

/**
 * GET /api/products/seller/my-products
 * Get all products by authenticated seller
 */
export const getSellerProducts = async (req: AuthRequest, res: any) => {
  try {
    const sellerId = req.user?.id;
    const { limit = 20, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT 
        id, title, description, category, condition, price_value as priceValue,
        stock, images, pricing_tier as pricingTier, created_at as createdAt,
        expires_at as expiresAt, status, reported_count as reportedCount
      FROM products
      WHERE seller_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3`,
      [sellerId, parseInt(limit as string), parseInt(offset as string)]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM products WHERE seller_id = $1',
      [sellerId]
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        total: parseInt(countResult.rows[0].count)
      }
    });
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ error: 'Failed to fetch your products' });
  }
};

// ============ REPORTING & MODERATION ============

/**
 * POST /api/products/:id/report
 * Report product as spam/scam (community moderation)
 * Auto-flags for admin review if >= 3 reports
 */
export const reportProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { reason, description, reporterEmail } = req.body;

    // Validation
    if (!reason || !['Spam', 'Scam', 'Inappropriate', 'Fake Item', 'Wrong Category', 'Other'].includes(reason)) {
      return res.status(400).json({ error: 'Invalid report reason' });
    }

    // Check if product exists
    const productCheck = await pool.query(
      'SELECT id, reported_count FROM products WHERE id = $1',
      [id]
    );

    if (productCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Insert report
    const reportId = `report_${uuidv4()}`;
    await pool.query(
      `INSERT INTO product_reports (id, product_id, reported_by, reason, description, reporter_email, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [reportId, id, reporterEmail || 'anonymous', reason, description, reporterEmail]
    );

    // Update product report count
    const newCount = (productCheck.rows[0].reported_count || 0) + 1;
    const updateResult = await pool.query(
      `UPDATE products 
       SET reported_count = $1, 
           report_reasons = array_append(report_reasons, $2)
       WHERE id = $3
       RETURNING reported_count as reportedCount, report_reasons as reportReasons`,
      [newCount, reason, id]
    );

    // If >= 3 reports, flag for admin review (in real app, send email notification)
    if (newCount >= 3) {
      console.log(`🚨 ALERT: Product ${id} flagged for admin review (${newCount} reports)`);
      // TODO: Send email to admin with product details and review link
    }

    res.status(201).json({
      success: true,
      message: `Report submitted. Report count: ${newCount}`,
      data: {
        reportedCount: updateResult.rows[0].reportedCount,
        reportReasons: updateResult.rows[0].reportReasons
      }
    });
  } catch (error) {
    console.error('Error reporting product:', error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
};

/**
 * GET /api/products/:id/reports
 * Get all reports for a product (admin only)
 */
export const getProductReports = async (req: AuthRequest, res: any) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, product_id as productId, reported_by as reportedBy, 
              reason, description, reporter_email as reporterEmail, created_at as createdAt
       FROM product_reports
       WHERE product_id = $1
       ORDER BY created_at DESC`,
      [id]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

// ============ ADMIN ENDPOINTS ============

/**
 * GET /api/admin/products/flagged
 * Get all flagged products (>= 3 reports) - admin only
 */
export const getFlaggedProducts = async (req: AuthRequest, res: any) => {
  try {
    const { status = 'all' } = req.query;

    let query = `
      SELECT id, title, images, price_value as price, reported_count,
             report_reasons, status, is_suspended, seller_name, seller_email, created_at
      FROM products
      WHERE reported_count >= 3
    `;

    if (status !== 'all') {
      query += ` AND status = '${status}'`;
    }

    query += ` ORDER BY reported_count DESC, created_at DESC`;

    const result = await pool.query(query);

    // Parse images from first image (for thumbnail)
    const products = result.rows.map(p => ({
      ...p,
      image: p.images ? (Array.isArray(p.images) ? p.images[0] : JSON.parse(p.images)[0]) : '/placeholder.jpg'
    }));

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching flagged products:', error);
    res.status(500).json({ error: 'Failed to fetch flagged products' });
  }
};

/**
 * POST /api/products/:id/approve
 * Clear reports and approve product (admin only)
 */
export const approveProduct = async (req: AuthRequest, res: any) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE products 
       SET reported_count = 0, report_reasons = ARRAY[]::text[]
       WHERE id = $1
       RETURNING id, title`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Product approved and reports cleared'
    });
  } catch (error) {
    console.error('Error approving product:', error);
    res.status(500).json({ error: 'Failed to approve product' });
  }
};

/**
 * POST /api/products/:id/remove
 * Remove product from marketplace (admin only)
 */
export const removeProduct = async (req: AuthRequest, res: any) => {
  try {
    const { id } = req.params;
    const { reason = 'Admin removal' } = req.body;

    const result = await pool.query(
      `UPDATE products 
       SET status = 'removed', removal_reason = $1
       WHERE id = $2
       RETURNING id, title`,
      [reason, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: 'Product removed from marketplace'
    });
  } catch (error) {
    console.error('Error removing product:', error);
    res.status(500).json({ error: 'Failed to remove product' });
  }
};

/**
 * POST /api/products/:id/suspend-seller
 * Suspend seller from listing products (admin only)
 */
export const suspendSeller = async (req: AuthRequest, res: any) => {
  try {
    const { id } = req.params;
    const { seller_email } = req.body;

    // Mark all products from this seller as suspended
    const result = await pool.query(
      `UPDATE products 
       SET is_suspended = true
       WHERE seller_email = $1
       RETURNING COUNT(*) as count`,
      [seller_email]
    );

    // Also update the specific product being reviewed
    await pool.query(
      `UPDATE products 
       SET status = 'suspended'
       WHERE id = $1`,
      [id]
    );

    res.json({
      success: true,
      message: `Seller ${seller_email} suspended. ${result.rows.length} products suspended.`
    });
  } catch (error) {
    console.error('Error suspending seller:', error);
    res.status(500).json({ error: 'Failed to suspend seller' });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  reportProduct,
  getProductReports,
  getFlaggedProducts,
  approveProduct,
  removeProduct,
  suspendSeller
};
