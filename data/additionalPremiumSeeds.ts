import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// ADDITIONAL PREMIUM RESTAURANTS
export const additionalPremiumEateries: Business[] = [
  {
    id: 'rest_premium_001',
    name: 'Château Lumière',
    category: Category.EatsAndRestaurants,
    subcategory: 'Fine Dining',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 315,
    description: 'Michelin-inspired fine dining with French-African fusion cuisine. Chef-curated tasting menus, extensive wine cellar with rare vintages, and intimate private dining.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 753 9200',
    email: 'reservations@chateaulumieremp.co.za',
    website: 'www.chateaulumieremp.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Fine Dining', 'Michelin-Inspired', 'French-African', 'Luxury', 'Wine Cellar']
  },
  {
    id: 'rest_premium_002',
    name: 'The Ebony Table',
    category: Category.EatsAndRestaurants,
    subcategory: 'Fine Dining',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 278,
    description: 'Upscale contemporary restaurant featuring seasonal menus, locally-sourced ingredients, craft cocktails, and an award-winning sommelier team.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 751 5600',
    email: 'hello@theebonytable.co.za',
    website: 'www.theebonytable.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Contemporary', 'Seasonal Menu', 'Local Sourced', 'Craft Cocktails', 'Award-Winning']
  },
  {
    id: 'rest_premium_003',
    name: 'Amber Garden Restaurant',
    category: Category.EatsAndRestaurants,
    subcategory: 'Fine Dining',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.7,
    reviewCount: 234,
    description: 'Botanical garden dining experience with Mediterranean cuisine, organic ingredients, scenic terrace, and sunset views over the Lowveld.',
    image: 'https://images.unsplash.com/photo-1551632786-e91160432b54?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 737 8900',
    email: 'dining@ambergarden.co.za',
    website: 'www.ambargarden.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Mediterranean', 'Organic', 'Garden Setting', 'Scenic Views', 'Luxury Dining']
  }
];

// LUXURY SPAS & WELLNESS
export const luxurySpasWellness: Business[] = [
  {
    id: 'spa_luxury_001',
    name: 'Serenity Spa & Wellness Sanctuary',
    category: Category.HealthAndMedical,
    subcategory: 'Spas & Wellness',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 487,
    description: 'Ultra-luxury spa featuring signature treatments, holistic therapies, premium skincare brands, meditation retreats, and rejuvenating wellness programs.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 752 5500',
    email: 'wellness@serenityspa.co.za',
    website: 'www.serenityspa.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Luxury Spa', 'Holistic', 'Wellness', 'Premium Skincare', 'Retreats']
  },
  {
    id: 'spa_luxury_002',
    name: 'The Spa at Riverside',
    category: Category.HealthAndMedical,
    subcategory: 'Spas & Wellness',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 412,
    description: 'Riverside luxury spa offering signature treatments, hot stone therapy, aromatherapy, facial rejuvenation, and tranquil relaxation spaces.',
    image: 'https://images.unsplash.com/photo-1544161515-81205f252e61?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 751 7800',
    email: 'spa@riversidewellness.co.za',
    website: 'www.riversidewellness.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Luxury Spa', 'Riverside Setting', 'Aromatherapy', 'Hot Stone', 'Rejuvenation']
  }
];

// LUXURY AUTOMOTIVE
export const luxuryAutomotiveServices: Business[] = [
  {
    id: 'auto_luxury_001',
    name: 'Prestige Motor Works Mpumalanga',
    category: Category.AutomotiveAndTransport,
    subcategory: 'Luxury Car Services',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 356,
    description: 'Premier luxury vehicle services specializing in high-end cars, exotic vehicles, concierge maintenance, and exclusive detailing with hand-crafted finishes.',
    image: 'https://images.unsplash.com/photo-1493496169519-d21e2820a7c5?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 752 3300',
    email: 'service@prestigemotorworks.co.za',
    website: 'www.prestigemotorworks.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Luxury Cars', 'Exotic Vehicles', 'Concierge Service', 'Detailing', 'Premium']
  },
  {
    id: 'auto_luxury_002',
    name: 'Elite Vehicle Solutions',
    category: Category.AutomotiveAndTransport,
    subcategory: 'Luxury Car Services',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 289,
    description: 'Exclusive automotive services for luxury and performance vehicles. Expert technicians, OEM parts, diagnostic center, and bespoke maintenance programs.',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 751 2200',
    email: 'care@elitevehiclesolutions.co.za',
    website: 'www.elitevehiclesolutions.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Luxury Cars', 'Performance Vehicles', 'Expert Technicians', 'OEM Parts', 'Premium']
  }
];

// PERSONAL STYLING & FASHION CONSULTANTS
export const personalStylingServices: Business[] = [
  {
    id: 'style_luxury_001',
    name: 'Mpumalanga Style Atelier',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'PERSONAL STYLING & WARDROBE CONSULTANTS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 289,
    description: 'Bespoke personal styling with luxury brand access, wardrobe curation, color consultation, and exclusive designer partnerships. Transform your look with expert guidance.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 752 4400',
    email: 'style@mpumalaagastyle.co.za',
    website: 'www.mpumalangastyle.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Personal Styling', 'Wardrobe', 'Luxury Brands', 'Designer Access', 'Bespoke']
  },
  {
    id: 'style_luxury_002',
    name: 'The Style Collective',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'PERSONAL STYLING & WARDROBE CONSULTANTS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.7,
    reviewCount: 198,
    description: 'Professional image consulting with wardrobe development, fashion coaching, and personal brand building. Expert stylists serving corporate and social events.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 737 6600',
    email: 'collective@theStyleCollective.co.za',
    website: 'www.theStyleCollective.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Image Consulting', 'Wardrobe', 'Fashion Coaching', 'Personal Brand', 'Professional']
  }
];

// GOLF & COUNTRY CLUBS
export const golfCountryClubs: Business[] = [
  {
    id: 'golf_luxury_001',
    name: 'Mpumalanga Golf & Country Club',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'GOLF & COUNTRY CLUBS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 412,
    description: '18-hole championship golf course with pro shop, luxury clubhouse, fine dining restaurant, spa facilities, and membership-exclusive events and tournaments.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 753 4400',
    email: 'membership@mpgolfclub.co.za',
    website: 'www.mpgolfclub.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Golf', 'Country Club', 'Championship Course', 'Fine Dining', 'Membership']
  },
  {
    id: 'golf_luxury_002',
    name: 'Lowveld Links Golf Club',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'GOLF & COUNTRY CLUBS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 324,
    description: 'Exclusive 18-hole golf course with clubhouse, restaurant, lessons, tournaments, and premium facilities. Pro shop and equipment rentals available.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 751 8800',
    email: 'golf@lowveldlinks.co.za',
    website: 'www.lowveldlinks.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Golf', 'Country Club', '18-Hole Course', 'Pro Shop', 'Premium Facilities']
  }
];

// WINE TASTING & VINEYARDS
export const wineTastingVineyards: Business[] = [
  {
    id: 'wine_luxury_001',
    name: 'Lowveld Premium Wine Estate',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'WINE TASTING & VINEYARDS',
    tier: ListingTier.Platinum,
    location: 'Hazyview',
    rating: 4.9,
    reviewCount: 278,
    description: 'Award-winning wine estate with vineyard tours, wine tastings, cellar experiences, gourmet food pairings, and exclusive member events. World-class wines.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2ded56204?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 737 5500',
    email: 'tastings@lowveldwine.co.za',
    website: 'www.lowveldwine.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Wine Estate', 'Tastings', 'Award-Winning', 'Vineyard Tours', 'Gourmet']
  },
  {
    id: 'wine_luxury_002',
    name: 'Vintage Cellar Experiences',
    category: Category.LuxuryAndLifestyle,
    subcategory: 'WINE TASTING & VINEYARDS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.7,
    reviewCount: 156,
    description: 'Curated wine tasting experiences, sommelier-led tastings, wine education classes, and fine wine collections. Exclusive private tastings available.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2ded56204?auto=format&fit=crop&q=80&w=1400',
    phone: '+27 13 751 9900',
    email: 'tastings@vintagecellar.co.za',
    website: 'www.vintagecellar.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Wine Tastings', 'Sommelier', 'Wine Education', 'Curated Experiences', 'Premium']
  }
];

// EXPORT ALL
export const additionalPremiumBusinesses = [
  ...additionalPremiumEateries,
  ...luxurySpasWellness,
  ...luxuryAutomotiveServices,
  ...personalStylingServices,
  ...golfCountryClubs,
  ...wineTastingVineyards
];
