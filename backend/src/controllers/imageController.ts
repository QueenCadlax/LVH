import { Response } from 'express';
import multer from 'multer';
import { AuthRequest } from '../middleware/authMiddleware';
import { AppError } from '../middleware/errorHandler';
import * as imageService from '../services/imageService';
import * as imageDbService from '../services/imageDbService';
import * as businessService from '../services/businessService';

// Configure multer for memory storage
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
    }
  },
});

export const uploadBusinessImages = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { businessId } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new AppError(400, 'No files uploaded');
    }

    // Verify business ownership
    const business = await businessService.getBusinessById(parseInt(businessId));
    if (!business) {
      throw new AppError(404, 'Business not found');
    }

    if (business.userId !== req.user.id) {
      throw new AppError(403, 'Forbidden - You can only upload images to your own business');
    }

    const uploadedImages: any[] = [];

    for (const file of files) {
      try {
        // Upload to Cloudinary
        const url = await imageService.uploadImage(file, `lowveldhub/business-${businessId}`);

        // Extract cloudinary public ID from URL
        const cloudinaryId = url.split('/').pop()?.split('.')[0] || '';

        // Save to database
        const imageRecord = await imageDbService.saveImageRecord(
          parseInt(businessId),
          file.originalname,
          url,
          cloudinaryId,
          file.size,
          file.mimetype,
          req.user.id,
        );

        uploadedImages.push({
          id: imageRecord.id,
          url: imageRecord.storagePath,
          uploadedAt: imageRecord.createdAt,
        });
      } catch (error) {
        console.error('Error uploading file:', file.originalname, error);
      }
    }

    if (uploadedImages.length === 0) {
      throw new AppError(400, 'Failed to upload any images');
    }

    res.status(201).json({
      success: true,
      message: `${uploadedImages.length} image(s) uploaded successfully`,
      images: uploadedImages,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

export const deleteBusinessImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new AppError(401, 'Unauthorized');
    }

    const { businessId, imageId } = req.params;

    // Verify business ownership
    const business = await businessService.getBusinessById(parseInt(businessId));
    if (!business) {
      throw new AppError(404, 'Business not found');
    }

    if (business.userId !== req.user.id) {
      throw new AppError(403, 'Forbidden');
    }

    // Delete image
    const imageRecord = await imageDbService.deleteImageRecord(parseInt(imageId), req.user.id);
    if (!imageRecord) {
      throw new AppError(404, 'Image not found');
    }

    // Delete from Cloudinary
    if (imageRecord.cloudinaryId) {
      await imageService.deleteImage(imageRecord.cloudinaryId);
    }

    res.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Delete image error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
