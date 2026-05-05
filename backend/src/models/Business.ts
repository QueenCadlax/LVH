export interface Business {
  id: number;
  uuid: string;
  userId: number;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  area: string;
  category: string;
  subcategories: string[];
  tier: 'trial' | 'premium' | 'elite' | 'platinum';
  isVerified: boolean;
  verificationDate?: Date;
  trustScore: number;
  badges: string[];
  rating: number;
  reviewCount: number;
  views: number;
  clicks: number;
  images: string[];
  videos: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  services: string[];
  amenities: string[];
  hours?: Record<string, string>;
  status: 'active' | 'suspended' | 'pending' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessFilters {
  page?: number;
  limit?: number;
  category?: string;
  area?: string;
  tier?: string;
  search?: string;
  rating?: number;
  sort?: 'rating' | 'newest' | 'popular';
  order?: 'asc' | 'desc';
}

export interface BusinessCreateRequest {
  name: string;
  description: string;
  category: string;
  area: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  subcategories?: string[];
  hours?: Record<string, string>;
  priceRange?: {
    min: number;
    max: number;
  };
  services?: string[];
  amenities?: string[];
}

export interface BusinessUpdateRequest extends Partial<BusinessCreateRequest> {}
