import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import * as enquiryService from '../services/enquiryService';
import * as businessService from '../services/businessService';

export const createEnquiry = async (req: AuthRequest, res: Response) => {
  try {
    const { businessId } = req.params;
    const { name, email, phone, message } = req.body;
    const userId = req.user?.id || 0;

    // Validate
    if (!name || !email || !phone || !message) {
      throw new AppError(400, 'Missing required fields');
    }

    // Verify business exists
    const business = await businessService.getBusinessById(parseInt(businessId));
    if (!business) {
      throw new AppError(404, 'Business not found');
    }

    const enquiry = await enquiryService.createEnquiry(parseInt(businessId), userId, req.body);

    // Increment business clicks
    await businessService.incrementBusinessClicks(parseInt(businessId));

    res.status(201).json({
      success: true,
      message: 'Enquiry sent successfully',
      enquiry,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Create enquiry error:', error);
    res.status(500).json({ error: 'Failed to create enquiry' });
  }
};

export const getEnquiries = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { businessId } = req.params;
    const page = parseInt(req.query.page as string) || 1;

    // Verify business ownership
    const business = await businessService.getBusinessById(parseInt(businessId));
    if (!business || business.userId !== req.user.id) {
      throw new AppError(403, 'Forbidden');
    }

    const result = await enquiryService.getEnquiriesByBusiness(parseInt(businessId), page);
    const stats = await enquiryService.getEnquiryStats(parseInt(businessId));

    res.json({
      success: true,
      ...result,
      stats,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Get enquiries error:', error);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
};

export const updateEnquiry = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { businessId, enquiryId } = req.params;
    const { status, priority, assignedTo } = req.body;

    // Verify business ownership
    const business = await businessService.getBusinessById(parseInt(businessId));
    if (!business || business.userId !== req.user.id) {
      throw new AppError(403, 'Forbidden');
    }

    let enquiry: any;

    if (status) {
      enquiry = await enquiryService.updateEnquiryStatus(parseInt(enquiryId), parseInt(businessId), status);
    }

    if (priority) {
      enquiry = await enquiryService.updateEnquiryPriority(parseInt(enquiryId), parseInt(businessId), priority);
    }

    if (assignedTo) {
      enquiry = await enquiryService.assignEnquiry(parseInt(enquiryId), parseInt(businessId), assignedTo);
    }

    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Update enquiry error:', error);
    res.status(500).json({ error: 'Failed to update enquiry' });
  }
};
