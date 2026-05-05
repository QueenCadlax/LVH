import { Request, Response } from 'express';
import * as submissionService from '../services/submissionService';
import { SubmissionFilters } from '../models/PendingSubmission';

export async function submitBusiness(req: Request, res: Response) {
  try {
    const {
      business_name,
      category,
      sub_category,
      location,
      address,
      contact_email,
      contact_phone,
      description,
      operating_hours,
      services,
      amenities,
      menu_url,
      images,
      videos,
      proof_of_business_url,
      selected_package,
      package_amount
    } = req.body;

    // Validation
    if (!business_name || !category || !location || !contact_phone || !proof_of_business_url) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: business_name, category, location, contact_phone, proof_of_business_url'
      });
    }

    if (!['essential', 'professional', 'platinum'].includes(selected_package)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid package selection'
      });
    }

    const submission = await submissionService.submitBusiness({
      business_name,
      category,
      sub_category,
      location,
      address,
      contact_email,
      contact_phone,
      description,
      operating_hours: operating_hours || {},
      services,
      amenities: amenities || [],
      menu_url,
      images: images || [],
      videos: videos || [],
      proof_of_business_url,
      selected_package,
      package_amount,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: submission,
      message: 'Business submission received. We will review it and contact you within 48 hours.'
    });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit business'
    });
  }
}

export async function getPendingSubmissions(req: Request, res: Response) {
  try {
    const { status, category, location, page = '1', limit = '20' } = req.query;

    const filters: SubmissionFilters = {
      status: (status as any),
      category: category as string,
      location: location as string,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10)
    };

    const { submissions, total } = await submissionService.getPendingSubmissions(filters);

    res.json({
      success: true,
      data: submissions,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        pages: Math.ceil(total / filters.limit!)
      }
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submissions'
    });
  }
}

export async function getSubmissionById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const submission = await submissionService.getSubmissionById(parseInt(id, 10));

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submission'
    });
  }
}

export async function approveSubmission(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({
        success: false,
        error: 'Admin ID required'
      });
    }

    const submission = await submissionService.approveSubmission(parseInt(id, 10), adminId);

    // Move to businesses table
    await submissionService.moveApprovedToBusiness(parseInt(id, 10));

    res.json({
      success: true,
      data: submission,
      message: 'Submission approved and business added to directory'
    });
  } catch (error) {
    console.error('Error approving submission:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to approve submission'
    });
  }
}

export async function rejectSubmission(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({
        success: false,
        error: 'Rejection reason required'
      });
    }

    const submission = await submissionService.rejectSubmission(parseInt(id, 10), rejectionReason);

    res.json({
      success: true,
      data: submission,
      message: 'Submission rejected'
    });
  } catch (error) {
    console.error('Error rejecting submission:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reject submission'
    });
  }
}

export async function getSubmissionStats(req: Request, res: Response) {
  try {
    const stats = await submissionService.getSubmissionStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submission stats'
    });
  }
}
