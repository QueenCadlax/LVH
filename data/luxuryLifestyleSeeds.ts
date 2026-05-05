import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// CONCIERGE SERVICES
export const conciergeServices: Business[] = [
  {
    id: 'lux_concierge_001',
    name: 'Elite Concierge Mpumalanga',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'CONCIERGE SERVICES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 612,
    description: 'Premium concierge service providing 24/7 personalized assistance, travel arrangements, event planning, dining reservations, and exclusive access. Multilingual, white-glove service.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop',
    phone: '+27 13 752 7800',
    email: 'concierge@elitempumalanga.co.za',
    website: 'www.elitempumalanga.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Concierge', 'Premium Service', '24/7 Available', 'Personal Assistance', 'Luxury']
  },
  {
    id: 'lux_concierge_002',
    name: 'Executive Concierge Associates',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'CONCIERGE SERVICES',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 498,
    description: 'Exclusive concierge providing bespoke lifestyle management, travel coordination, restaurant reservations, and VIP event access. Dedicated personal concierge.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 774 9100',
    email: 'concierge@executiveassociates.co.za',
    website: 'www.executiveassociates.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Concierge', 'Lifestyle Management', 'Executive Service', 'Premium', 'Bespoke']
  }
];

// EXCLUSIVE EXPERIENCES
export const exclusiveExperiences: Business[] = [
  {
    id: 'lux_exclusive_001',
    name: 'Mpumalanga Experiences Elite',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'EXCLUSIVE EXPERIENCES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 567,
    description: 'Curated luxury experiences including private game drives, exclusive safari lodges, helicopter tours, spa retreats, and gourmet dining. Unforgettable moments tailored to preference.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    phone: '+27 13 752 8300',
    email: 'experiences@mpumalangaelite.co.za',
    website: 'www.mpumalangaelite.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Exclusive Experiences', 'Luxury', 'Safari', 'Curated', 'Premium']
  },
  {
    id: 'lux_exclusive_002',
    name: 'Pinnacle Luxury Experiences',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'EXCLUSIVE EXPERIENCES',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 534,
    description: 'Bespoke luxury experiences featuring private yacht charters, helicopter adventures, gourmet food tours, and exclusive resort access. Customized for every client.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    phone: '+27 13 737 7200',
    email: 'bookings@pinnacleluxury.co.za',
    website: 'www.pinnacleluxury.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Exclusive Experiences', 'Bespoke', 'Luxury Adventures', 'Premium', 'Customized']
  }
];

// PERSONAL ASSISTANTS
export const personalAssistants: Business[] = [
  {
    id: 'lux_assistant_001',
    name: 'VIP Personal Assistant Services',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'PERSONAL ASSISTANTS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 589,
    description: 'Professional personal assistants managing schedules, appointments, personal errands, home management, and administrative tasks. Discretion and excellence guaranteed.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 752 6900',
    email: 'assistants@vippersonal.co.za',
    website: 'www.vippersonal.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Personal Assistants', 'Executive Service', 'Discreet', 'Professional', 'Premium']
  },
  {
    id: 'lux_assistant_002',
    name: 'Lifestyle Management Personal Assistants',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'PERSONAL ASSISTANTS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 476,
    description: 'Expert personal assistants providing time management, event coordination, travel planning, and household organization. Experienced in high-net-worth client management.',
    image: 'https://images.unsplash.com/photo-1507238691621-53ec282a0d85?w=800&h=600&fit=crop',
    phone: '+27 13 774 4400',
    email: 'info@lifestylemanagement.co.za',
    website: 'www.lifestylemanagement.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Personal Assistants', 'Lifestyle Management', 'Event Coordination', 'Professional', 'Expert']
  }
];

// LUXURY CLUBS & MEMBERSHIPS
export const luxuryClubsAndMemberships: Business[] = [
  {
    id: 'lux_clubs_001',
    name: 'Mpumalanga Exclusive Elite Club',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'LUXURY CLUBS & MEMBERSHIPS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 645,
    description: 'Exclusive members-only club featuring premium facilities, private dining, business lounges, spa services, and networking events. Curated membership for elite clientele.',
    image: 'https://images.unsplash.com/photo-1514306688772-aadfc4f6fe3e?w=800&h=600&fit=crop',
    phone: '+27 13 752 5500',
    email: 'membership@eliteclub.co.za',
    website: 'www.eliteclub.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Luxury Club', 'Membership', 'Exclusive', 'Premium Facilities', 'Networking']
  },
  {
    id: 'lux_clubs_002',
    name: 'The Platinum Circle Membership',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'LUXURY CLUBS & MEMBERSHIPS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 523,
    description: 'Premium membership club offering luxury lounge access, concierge services, exclusive events, fitness facilities, and gourmet dining. Global reciprocal privileges.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    phone: '+27 13 737 8900',
    email: 'membership@platinumcircle.co.za',
    website: 'www.platinumcircle.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Membership Club', 'Premium Access', 'Concierge', 'Exclusive Events', 'Luxury']
  }
];

// WINE TASTING & VINEYARDS
export const wineTastingAndVineyards: Business[] = [
  {
    id: 'lux_wine_001',
    name: 'Mpumalanga Premium Wine Experiences',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'WINE TASTING & VINEYARDS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 578,
    description: 'Exclusive wine tasting experiences, vineyard tours, wine cellaring services, and sommelier consultations. Curated South African and international wine selections.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=800&h=600&fit=crop',
    phone: '+27 13 752 9700',
    email: 'wine@wineexperiences.co.za',
    website: 'www.wineexperiences.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Wine Tasting', 'Vineyards', 'Sommelier', 'Premium Selection', 'Luxury']
  },
  {
    id: 'lux_wine_002',
    name: 'Estate Cellar Wine & Vineyard Tours',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'WINE TASTING & VINEYARDS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 445,
    description: 'Premium wine estate tours, private tastings, wine education classes, and vineyard lunch experiences. Expert sommelier guidance and wine pairing services.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&h=600&fit=crop',
    phone: '+27 13 774 7700',
    email: 'info@estatecellar.co.za',
    website: 'www.estatecellar.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Wine Tours', 'Vineyard Experiences', 'Tasting', 'Education', 'Premium']
  }
];

// GOLF & COUNTRY CLUBS
export const golfAndCountryClubs: Business[] = [
  {
    id: 'lux_golf_001',
    name: 'Mpumalanga Golf & Country Club Elite',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'GOLF & COUNTRY CLUBS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 634,
    description: 'Championship golf course, pro golf lessons, country club amenities, fine dining, spa facilities, and exclusive member events. Premier golf experience.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    phone: '+27 13 752 4200',
    email: 'golf@countryclub.co.za',
    website: 'www.countryclub.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Golf Course', 'Country Club', 'Championship', 'Pro Lessons', 'Luxury']
  },
  {
    id: 'lux_golf_002',
    name: 'Valley View Golf & Leisure Club',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'GOLF & COUNTRY CLUBS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 512,
    description: 'Scenic 18-hole golf course, professional coaching, country club facilities, restaurant, pro shop, and member events. Exclusive membership experience.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop',
    phone: '+27 13 737 5600',
    email: 'membership@valleyviewgolf.co.za',
    website: 'www.valleyviewgolf.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Golf Course', 'Leisure Club', '18-Hole', 'Professional Coaching', 'Exclusive']
  }
];

// PERSONAL STYLING & WARDROBE CONSULTANTS
export const personalStylingAndWardrobeConsultants: Business[] = [
  {
    id: 'lux_styling_001',
    name: 'Luxury Fashion Styling Consultants',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'PERSONAL STYLING & WARDROBE CONSULTANTS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 556,
    description: 'Bespoke personal styling, wardrobe management, luxury brand curation, fashion consulting, and complete makeover services. Expert image transformation.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop',
    phone: '+27 13 752 3300',
    email: 'styling@luxuryfashion.co.za',
    website: 'www.luxuryfashion.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Personal Styling', 'Fashion Consultant', 'Wardrobe Management', 'Luxury Brands', 'Premium']
  },
  {
    id: 'lux_styling_002',
    name: 'Elevate Image & Wardrobe Design',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'PERSONAL STYLING & WARDROBE CONSULTANTS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 489,
    description: 'Professional image consultants offering wardrobe styling, color analysis, personal shopping, and fashion guidance. Personalized style transformation programs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    phone: '+27 13 774 6600',
    email: 'info@elevateimage.co.za',
    website: 'www.elevateimage.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Image Consultant', 'Personal Styling', 'Wardrobe Design', 'Fashion Guidance', 'Professional']
  }
];
