import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';
import * as productController from '../controllers/productController';

const router = Router();

// ============ PUBLIC ROUTES ============

// Get all products (marketplace listing)
router.get('/', productController.getProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// ============ PROTECTED ROUTES (Sellers) ============

// Create new product
router.post('/', authMiddleware, productController.createProduct);

// Update product
router.put('/:id', authMiddleware, productController.updateProduct);

// Delete product (soft delete)
router.delete('/:id', authMiddleware, productController.deleteProduct);

// Get seller's products
router.get('/seller/my-products', authMiddleware, productController.getSellerProducts);

// ============ REPORTING ROUTES ============

// Report product (community moderation)
router.post('/:id/report', productController.reportProduct);

// Get reports for a product (admin only)
router.get('/:id/reports', authMiddleware, isAdmin, productController.getProductReports);

// ============ ADMIN ROUTES ============

// Get all flagged products (3+ reports)
router.get('/admin/flagged', authMiddleware, isAdmin, productController.getFlaggedProducts);

// Approve flagged product (clear reports)
router.post('/:id/approve', authMiddleware, isAdmin, productController.approveProduct);

// Remove product from marketplace
router.post('/:id/remove', authMiddleware, isAdmin, productController.removeProduct);

// Suspend seller (ban from listing)
router.post('/:id/suspend-seller', authMiddleware, isAdmin, productController.suspendSeller);

export default router;
