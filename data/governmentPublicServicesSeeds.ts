import { ListingTier, SubscriptionDuration, Category } from '../types';

// MUNICIPAL SERVICES
export const municipalServices = [
  {
    id: 'ms_001',
    name: 'Mbombela Municipal Services Hub',
    category: Category.GovernmentAndPublicServices,
    subcategory: 'Municipal Services',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 567,
    description: 'Premier municipal services center offering permits, licenses, public facilities, community programs, and civic engagement with streamlined processing.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    phone: '+27 13 754 0123',
    email: 'services@mbombela.gov.za',
    website: 'www.mbombela.gov.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Municipal Services', 'Permits & Licenses', 'Community Programs'],
    logo: '🏛️'
  },
  {
    id: 'ms_002',
    name: 'Regional Government Services',
    category: Category.GovernmentAndPublicServices,
    subcategory: 'Municipal Services',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 445,
    description: 'Comprehensive government services facility providing municipal administration, public inquiries, facility bookings, and civic services for the region.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    phone: '+27 13 752 4567',
    email: 'info@regionalgov.co.za',
    website: 'www.regionalgov.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Government Services', 'Public Services', 'Community Services'],
    logo: '🏢'
  }
];

// LICENSING & REGISTRATIONS
export const licensingAndRegistrations = [
  {
    id: 'lr_001',
    name: 'Mpumalanga Licensing & Registration Authority',
    category: Category.GovernmentAndPublicServices,
    subcategory: 'Licensing & Registrations',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 612,
    description: 'Premier licensing authority handling vehicle registration, business licenses, professional certifications, and compliance documentation with expert guidance.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    phone: '+27 13 754 1234',
    email: 'licensing@mpuregistrations.gov.za',
    website: 'www.mpuregistrations.gov.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Licensing', 'Registrations', 'Certifications'],
    logo: '📋'
  },
  {
    id: 'lr_002',
    name: 'Provincial Permits & Licensing Services',
    category: Category.GovernmentAndPublicServices,
    subcategory: 'Licensing & Registrations',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 523,
    description: 'Professional licensing and registration services providing vehicle licensing, business registration, professional permits, and compliance verification services.',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
    phone: '+27 13 737 5678',
    email: 'permits@provincialservices.gov.za',
    website: 'www.provincialservices.gov.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Permits', 'Licenses', 'Registrations'],
    logo: '✓'
  }
];

// PUBLIC HEALTH SERVICES
export const publicHealthServices = [
  {
    id: 'phs_001',
    name: 'Mpumalanga Public Health Excellence Center',
    category: Category.GovernmentAndPublicServices,
    subcategory: 'Public Health Services',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 645,
    description: 'Premier public health center providing vaccination programs, health screenings, disease prevention, health education, and community wellness initiatives.',
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&q=80',
    phone: '+27 13 754 2345',
    email: 'health@publichealthmpu.gov.za',
    website: 'www.publichealthmpu.gov.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Public Health', 'Vaccinations', 'Screenings'],
    logo: '🏥'
  },
  {
    id: 'phs_002',
    name: 'Regional Health & Wellness Services',
    category: Category.GovernmentAndPublicServices,
    subcategory: 'Public Health Services',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 534,
    description: 'Comprehensive health services facility offering public healthcare, community health programs, health education, and wellness support services.',
    image: 'https://images.unsplash.com/photo-1631217314831-c02b2e9de566?w=800&q=80',
    phone: '+27 13 752 6789',
    email: 'services@regionalhealthmpu.co.za',
    website: 'www.regionalhealthmpu.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Health Services', 'Community Health', 'Wellness'],
    logo: '⚕️'
  }
];
