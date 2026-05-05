import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as enquiryController from '../controllers/enquiryController';

const router = Router();

// Public - create enquiry
router.post('/business/:businessId', enquiryController.createEnquiry);

// Protected - manage enquiries
router.get('/business/:businessId', authMiddleware, enquiryController.getEnquiries);
router.put('/business/:businessId/:enquiryId', authMiddleware, enquiryController.updateEnquiry);

export default router;
