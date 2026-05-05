import { Business, Category, ListingTier, SubscriptionDuration } from '@/types';

/**
 * FAMILY SERVICES
 */
export const familyServices: Business[] = [
  {
    id: 'family_service_1',
    name: 'Lowveld Family Support Hub',
    category: Category.CommunityAndOrganisations,
    subcategory: 'FAMILY SERVICES',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 287,
    description: 'Comprehensive family counseling, parenting workshops and family therapy services — supporting healthy family dynamics across Mpumalanga.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 759 2020',
    email: 'support@lowveldfamily.co.za',
    website: 'lowveldfamily.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['family', 'counseling', 'therapy', 'support'],
  },
  {
    id: 'family_service_2',
    name: 'Mpumalanga Community Care',
    category: Category.CommunityAndOrganisations,
    subcategory: 'FAMILY SERVICES',
    tier: ListingTier.Premium,
    location: 'Hazyview',
    rating: 4.7,
    reviewCount: 156,
    description: 'Social services, elderly care coordination and family support programs — connecting families with essential resources and services.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 738 3030',
    email: 'info@mpumalangacare.org.za',
    subscriptionDuration: SubscriptionDuration.SixMonths,
    tags: ['family', 'community', 'social-care', 'support'],
  }
];

/**
 * CHILDCARE & SCHOOLS
 */
export const childcareSchools: Business[] = [
  {
    id: 'childcare_school_1',
    name: 'Lowveld Early Learning Academy',
    category: Category.CommunityAndOrganisations,
    subcategory: 'CHILDCARE & SCHOOLS',
    tier: ListingTier.Platinum,
    location: 'White River',
    rating: 5.0,
    reviewCount: 412,
    description: 'Premium pre-school and early learning center — state-of-the-art facilities, qualified educators and developmental programs for ages 18 months to 5 years.',
    image: 'https://images.unsplash.com/photo-1577720643272-265f434884bf?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 744 6060',
    email: 'admissions@lowveldacademy.co.za',
    website: 'lowveldacademy.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['childcare', 'preschool', 'early-learning', 'education'],
  },
  {
    id: 'childcare_school_2',
    name: 'Safari Valley Montessori School',
    category: Category.CommunityAndOrganisations,
    subcategory: 'CHILDCARE & SCHOOLS',
    tier: ListingTier.Elite,
    location: 'Sabie',
    rating: 4.8,
    reviewCount: 289,
    description: 'Montessori-based primary school with holistic curriculum — small class sizes, nature-integrated learning and caring for ages 3-12.',
    image: 'https://images.unsplash.com/photo-1552881288-3141bb9a9e5d?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 764 5555',
    email: 'admissions@safarivalley.co.za',
    subscriptionDuration: SubscriptionDuration.SixMonths,
    tags: ['montessori', 'school', 'education', 'preschool'],
  }
];

/**
 * LOCAL COMMUNITY CENTRES
 */
export const communitycentres: Business[] = [
  {
    id: 'community_centre_1',
    name: 'Mbombela Central Community Hub',
    category: Category.CommunityAndOrganisations,
    subcategory: 'LOCAL COMMUNITY CENTRES',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.8,
    reviewCount: 201,
    description: 'Multi-purpose community center offering fitness, wellness, skills training and social programs — serving all ages and backgrounds.',
    image: 'https://images.unsplash.com/photo-1552881288-3141bb9a9e5d?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 759 7070',
    email: 'info@mbombela-hub.org.za',
    website: 'mbombela-hub.org.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['community', 'center', 'wellness', 'fitness'],
  },
  {
    id: 'community_centre_2',
    name: 'Hazyview Community Wellness Center',
    category: Category.CommunityAndOrganisations,
    subcategory: 'LOCAL COMMUNITY CENTRES',
    tier: ListingTier.Premium,
    location: 'Hazyview',
    rating: 4.6,
    reviewCount: 134,
    description: 'Community-driven wellness and development center — youth programs, health services and recreational facilities for local residents.',
    image: 'https://images.unsplash.com/photo-1552881288-3141bb9a9e5d?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 738 4040',
    email: 'wellness@hazyview-hub.co.za',
    subscriptionDuration: SubscriptionDuration.SixMonths,
    tags: ['community', 'wellness', 'youth', 'health'],
  }
];

/**
 * RELIGIOUS CENTRES (CHURCHES & MOSQUES)
 */
export const religiouscentres: Business[] = [
  {
    id: 'religious_centre_1',
    name: 'Grace Cathedral Church Mpumalanga',
    category: Category.CommunityAndOrganisations,
    subcategory: 'RELIGIOUS CENTRES (CHURCHES & MOSQUES)',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 523,
    description: 'Historic cathedral with vibrant congregation — services, counseling, community outreach and youth ministries for all denominations.',
    image: 'https://images.unsplash.com/photo-1574044611937-51df56b76178?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 759 1111',
    email: 'admin@gracecathedral.co.za',
    website: 'gracecathedral.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['church', 'religious', 'spiritual', 'community'],
  },
  {
    id: 'religious_centre_2',
    name: 'Mpumalanga Islamic Centre',
    category: Category.CommunityAndOrganisations,
    subcategory: 'RELIGIOUS CENTRES (CHURCHES & MOSQUES)',
    tier: ListingTier.Premium,
    location: 'White River',
    rating: 4.7,
    reviewCount: 98,
    description: 'Modern mosque and Islamic community center — daily prayers, Islamic education, women and youth programs, and interfaith dialogue.',
    image: 'https://images.unsplash.com/photo-1543269867-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 744 2222',
    email: 'info@mpuislamic.co.za',
    subscriptionDuration: SubscriptionDuration.SixMonths,
    tags: ['mosque', 'religious', 'islamic', 'community'],
  }
];

/**
 * PLAY CENTERS & KID ACTIVITIES
 */
export const playcenters: Business[] = [
  {
    id: 'play_center_1',
    name: 'Adventure Kingdom Play Center',
    category: Category.CommunityAndOrganisations,
    subcategory: 'PLAY CENTERS & KID ACTIVITIES',
    tier: ListingTier.Platinum,
    location: 'Hazyview',
    rating: 4.9,
    reviewCount: 445,
    description: 'Premium indoor/outdoor play facility with climbing walls, slides, trampoline park and party venues — safe supervised fun for ages 1-14.',
    image: 'https://images.unsplash.com/photo-1547744486-7546967a70a2?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 738 8888',
    email: 'bookings@adventurekingdom.co.za',
    website: 'adventurekingdom.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['play', 'kids', 'activities', 'entertainment'],
  },
  {
    id: 'play_center_2',
    name: 'Safari Kids Play Zone',
    category: Category.CommunityAndOrganisations,
    subcategory: 'PLAY CENTERS & KID ACTIVITIES',
    tier: ListingTier.Elite,
    location: 'Sabie',
    rating: 4.8,
    reviewCount: 267,
    description: 'Nature-inspired play center with educational activities — animal encounters, garden exploration, crafts and outdoor games for curious minds.',
    image: 'https://images.unsplash.com/photo-1552704169-25bd45d47d08?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 764 9999',
    email: 'info@safarikidszone.co.za',
    subscriptionDuration: SubscriptionDuration.SixMonths,
    tags: ['kids', 'play', 'nature', 'education'],
  }
];

/**
 * AFTER-SCHOOL PROGRAMS & CLUBS
 */
export const afterschoolprograms: Business[] = [
  {
    id: 'afterschool_1',
    name: 'Lowveld Elite After-School Academy',
    category: Category.CommunityAndOrganisations,
    subcategory: 'AFTER-SCHOOL PROGRAMS & CLUBS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.9,
    reviewCount: 356,
    description: 'Premium after-school programs with tutoring, sports, arts and STEM clubs — professional instructors and safe supervised environment until 6pm.',
    image: 'https://images.unsplash.com/photo-1427504494785-cdeedda1a5a7?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 744 3333',
    email: 'admissions@lowveldelite.co.za',
    website: 'lowveldelite.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['tutoring', 'afterschool', 'clubs', 'education'],
  },
  {
    id: 'afterschool_2',
    name: 'Mpumalanga Youth Development Club',
    category: Category.CommunityAndOrganisations,
    subcategory: 'AFTER-SCHOOL PROGRAMS & CLUBS',
    tier: ListingTier.Premium,
    location: 'Mbombela',
    rating: 4.7,
    reviewCount: 189,
    description: 'Community youth programs with sports, life skills and mentorship — building confident, responsible young adults through structured programs.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 759 4444',
    email: 'programs@mpumyouth.org.za',
    subscriptionDuration: SubscriptionDuration.SixMonths,
    tags: ['youth', 'afterschool', 'mentorship', 'development'],
  }
];

/**
 * FAMILY ENTERTAINMENT
 */
export const familyentertainment: Business[] = [
  {
    id: 'family_entertainment_1',
    name: 'Lowveld Family Fun Park',
    category: Category.CommunityAndOrganisations,
    subcategory: 'FAMILY ENTERTAINMENT',
    tier: ListingTier.Platinum,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 398,
    description: 'Complete family entertainment destination with go-karts, mini golf, arcade games, food court and picnic areas — perfect for family outings.',
    image: 'https://images.unsplash.com/photo-1528127269415-af4f6b41b351?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 738 5555',
    email: 'bookings@funpark.co.za',
    website: 'funpark.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['entertainment', 'family', 'fun', 'activities'],
  },
  {
    id: 'family_entertainment_2',
    name: 'Safari Cinema & Family Lounge',
    category: Category.CommunityAndOrganisations,
    subcategory: 'FAMILY ENTERTAINMENT',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.7,
    reviewCount: 234,
    description: 'Luxury family cinema with premium seating, family-friendly movies and interactive entertainment — comfortable viewing experience for all ages.',
    image: 'https://images.unsplash.com/photo-1525712991848-872cda473314?auto=format&fit=crop&q=80&w=800',
    phone: '+27 13 759 6666',
    email: 'info@safaricinema.co.za',
    subscriptionDuration: SubscriptionDuration.SixMonths,
    tags: ['cinema', 'entertainment', 'family', 'movies'],
  }
];
