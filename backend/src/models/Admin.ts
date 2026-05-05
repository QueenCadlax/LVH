export interface Admin {
  id: number;
  userId: number;
  role: 'super_admin' | 'moderator' | 'analyst';
  permissions: string[];
  createdAt: Date;
}

export interface BusinessApprovalRequest {
  businessId: number;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  tier: 'free' | 'premium' | 'platinum';
  approvedBy?: number;
  approvalNotes?: string;
  approvedAt?: Date;
}

export interface PlatformStats {
  totalBusinesses: number;
  activeBusinesses: number;
  pendingApprovals: number;
  totalUsers: number;
  totalReviews: number;
  totalEnquiries: number;
  averageRating: number;
  revenueThisMonth: number;
}

export interface TierFeatures {
  tier: 'free' | 'premium' | 'platinum';
  maxImages: number;
  maxVideos: number;
  featuredPlacement: boolean;
  contactHighlight: boolean;
  conciergeSupport: boolean;
  analyticsAccess: boolean;
  apiAccess: boolean;
  monthlyPrice: number;
}

export interface Subscription {
  id: number;
  businessId: number;
  tier: 'free' | 'premium' | 'platinum';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  renewalDate: Date;
  nextBillingDate: Date;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessAnalytics {
  businessId: number;
  views: number;
  clicks: number;
  enquiries: number;
  reviews: number;
  averageRating: number;
  conversionRate: number;
  lastViewed: Date;
  week: number;
  month: number;
  year: number;
}

export const TIER_FEATURES: Record<string, TierFeatures> = {
  free: {
    tier: 'free',
    maxImages: 3,
    maxVideos: 0,
    featuredPlacement: false,
    contactHighlight: false,
    conciergeSupport: false,
    analyticsAccess: false,
    apiAccess: false,
    monthlyPrice: 0,
  },
  premium: {
    tier: 'premium',
    maxImages: 10,
    maxVideos: 2,
    featuredPlacement: true,
    contactHighlight: true,
    conciergeSupport: false,
    analyticsAccess: true,
    apiAccess: false,
    monthlyPrice: 49.99,
  },
  platinum: {
    tier: 'platinum',
    maxImages: 50,
    maxVideos: 10,
    featuredPlacement: true,
    contactHighlight: true,
    conciergeSupport: true,
    analyticsAccess: true,
    apiAccess: true,
    monthlyPrice: 149.99,
  },
};
