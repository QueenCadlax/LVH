export interface PendingSubmission {
  id: number;
  business_name: string;
  category: string;
  sub_category?: string;
  location: string;
  address?: string;
  contact_email?: string;
  contact_phone: string;
  description?: string;
  operating_hours: Record<string, string>;
  services?: string;
  amenities: string[];
  menu_url?: string;
  logo_url?: string;
  images: string[];
  videos: string[];
  proof_of_business_url: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  tiktok_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  website_url?: string;
  selected_package: 'essential' | 'professional' | 'platinum';
  package_amount: number;
  submitted_at: Date;
  status: 'pending' | 'approved' | 'rejected';
  admin_feedback?: string;
  rejection_reason?: string;
  approved_by?: number;
  approved_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SubmissionFilters {
  status?: 'pending' | 'approved' | 'rejected';
  category?: string;
  location?: string;
  page?: number;
  limit?: number;
}

export interface SubmissionStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  revenueExpected: number;
}

export const PACKAGE_PRICING = {
  essential: 799,
  professional: 1299,
  platinum: 1999
};

export const AMENITIES_OPTIONS = [
  'WiFi',
  'Parking',
  'Indoor Seating',
  'Outdoor Seating',
  'Air Conditioning',
  'Wheelchair Access',
  'Pet Friendly',
  'Outdoor Parking',
  'Valet Parking',
  'Card Payment',
  'Cash Payment',
  'Reservation System',
  'Delivery Available',
  'Takeaway',
  'Private Rooms',
  'Free Water'
];

export const OPERATING_HOURS_TEMPLATE = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '10:00', close: '16:00' },
  sunday: { open: 'Closed', close: 'Closed' }
};
