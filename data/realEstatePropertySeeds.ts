import { ListingTier, SubscriptionDuration, Category } from '../types';

// ESTATE AGENTS
export const estateAgents = [
  {
    id: 'ea_001',
    name: 'Mpumalanga Premium Property Group',
    category: Category.RealEstateAndProperty,
    subcategory: 'Estate Agents',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 678,
    description: 'Luxury real estate agency specializing in premium properties, estate sales, and personalized buyer-seller matching with exclusive market access.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    phone: '+27 13 754 5678',
    email: 'agents@mmpg.co.za',
    website: 'www.mmpg.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Luxury Properties', 'Estate Sales', 'Buyer Matching'],
    logo: '🏢'
  },
  {
    id: 'ea_002',
    name: 'Prestige Real Estate Solutions',
    category: Category.RealEstateAndProperty,
    subcategory: 'Estate Agents',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 534,
    description: 'Full-service estate agency offering property consultation, market analysis, negotiation, and seamless transaction management for premium properties.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    phone: '+27 13 752 3456',
    email: 'info@prestigere.co.za',
    website: 'www.prestigere.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Property Consultation', 'Market Analysis', 'Transaction Management'],
    logo: '🏠'
  }
];

// PROPERTY RENTALS
export const propertyRentals = [
  {
    id: 'pr_001',
    name: 'Luxury Stays & Property Rentals',
    category: Category.RealEstateAndProperty,
    subcategory: 'Property Rentals',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 612,
    description: 'Premium short and long-term property rental service offering curated luxury apartments, villas, and residences with concierge support.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
    phone: '+27 13 754 7890',
    email: 'rentals@luxurystays.co.za',
    website: 'www.luxurystays.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Luxury Rentals', 'Short/Long Term', 'Concierge Support'],
    logo: '🔑'
  },
  {
    id: 'pr_002',
    name: 'Prime Property Management & Rentals',
    category: Category.RealEstateAndProperty,
    subcategory: 'Property Rentals',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 489,
    description: 'Full-service rental management platform connecting premium property owners with verified tenants, handling leasing and maintenance.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    phone: '+27 13 737 6543',
    email: 'manage@primeproperty.co.za',
    website: 'www.primeproperty.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Rental Management', 'Tenant Matching', 'Maintenance'],
    logo: '📋'
  }
];

// COMMERCIAL PROPERTY
export const commercialProperty = [
  {
    id: 'cp_001',
    name: 'Corporate Spaces & Commercial Solutions',
    category: Category.RealEstateAndProperty,
    subcategory: 'Commercial Property',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 645,
    description: 'Specialized commercial property broker offering office spaces, retail locations, industrial units with comprehensive business solutions.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    phone: '+27 13 754 2109',
    email: 'commercial@corporatespaces.co.za',
    website: 'www.corporatespaces.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Office Spaces', 'Retail Locations', 'Industrial Units'],
    logo: '🏗️'
  },
  {
    id: 'cp_002',
    name: 'Enterprise Commercial Real Estate',
    category: Category.RealEstateAndProperty,
    subcategory: 'Commercial Property',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 523,
    description: 'Commercial property specialist providing leasing, acquisition, and property management for corporate and business tenants.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    phone: '+27 13 752 5678',
    email: 'business@enterprisecommercial.co.za',
    website: 'www.enterprisecommercial.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Commercial Leasing', 'Acquisition', 'Property Management'],
    logo: '💼'
  }
];

// PROPERTY MANAGEMENT & TENANTS
export const propertyManagementAndTenants = [
  {
    id: 'pmt_001',
    name: 'Elite Property Management Services',
    category: Category.RealEstateAndProperty,
    subcategory: 'Property Management & Tenants',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 598,
    description: 'Comprehensive property management handling tenant relations, maintenance, financial reporting, and property optimization strategies.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    phone: '+27 13 754 3210',
    email: 'manage@elitepm.co.za',
    website: 'www.elitepm.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Tenant Relations', 'Maintenance', 'Financial Reporting'],
    logo: '🔧'
  },
  {
    id: 'pmt_002',
    name: 'Premier Tenant & Property Solutions',
    category: Category.RealEstateAndProperty,
    subcategory: 'Property Management & Tenants',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 467,
    description: 'Full-service property management company providing tenant screening, lease administration, maintenance coordination, and rent collection.',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
    phone: '+27 13 737 7890',
    email: 'info@premiersolutions.co.za',
    website: 'www.premiersolutions.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Tenant Screening', 'Lease Admin', 'Rent Collection'],
    logo: '📑'
  }
];

// LAND & PLOTS
export const landAndPlots = [
  {
    id: 'lap_001',
    name: 'Land Development & Investment Group',
    category: Category.RealEstateAndProperty,
    subcategory: 'Land & Plots',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 567,
    description: 'Premium land brokerage offering prime plots, development opportunities, investment potential analysis, and land consulting services.',
    image: 'https://images.unsplash.com/photo-1500595046891-4d5d1fb3a76a?w=800&q=80',
    phone: '+27 13 754 4567',
    email: 'land@development.co.za',
    website: 'www.development.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Land Brokerage', 'Development', 'Investment Analysis'],
    logo: '🌍'
  },
  {
    id: 'lap_002',
    name: 'Terrain Plots & Land Solutions',
    category: Category.RealEstateAndProperty,
    subcategory: 'Land & Plots',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 445,
    description: 'Specialist land consultancy providing plot sourcing, development potential assessment, zoning advice, and land investment guidance.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    phone: '+27 13 752 8901',
    email: 'plots@terrainsolutions.co.za',
    website: 'www.terrainsolutions.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Plot Sourcing', 'Zoning Advice', 'Investment Guidance'],
    logo: '🏞️'
  }
];

// LUXURY HOMES & VILLAS
export const luxuryHomesAndVillas = [
  {
    id: 'lhv_001',
    name: 'Exclusive Villas & Luxury Estates',
    category: Category.RealEstateAndProperty,
    subcategory: 'Luxury Homes & Villas',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 623,
    description: 'Ultra-premium luxury home specialist offering exclusive villas, estates, and high-end residences with architectural excellence and bespoke design.',
    image: 'https://images.unsplash.com/photo-1512917774080-9264f475eabf?w=800&q=80',
    phone: '+27 13 754 5678',
    email: 'villas@exclusiveestate.co.za',
    website: 'www.exclusiveestate.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Luxury Villas', 'Estates', 'Architectural Excellence'],
    logo: '👑'
  },
  {
    id: 'lhv_002',
    name: 'Prestige Luxury Homes & Residences',
    category: Category.RealEstateAndProperty,
    subcategory: 'Luxury Homes & Villas',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 512,
    description: 'High-end residential specialist featuring luxury homes, contemporary villas, and premium estates for discerning buyers.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    phone: '+27 13 737 9012',
    email: 'homes@prestigeluxury.co.za',
    website: 'www.prestigeluxury.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Luxury Homes', 'Contemporary Villas', 'Premium Estates'],
    logo: '🏰'
  }
];

// APARTMENTS & LOFTS
export const apartmentsAndLofts = [
  {
    id: 'aal_001',
    name: 'Urban Luxury Apartments & Lofts',
    category: Category.RealEstateAndProperty,
    subcategory: 'Apartments & Lofts',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 589,
    description: 'Premier urban residential specialist offering luxury apartments, designer lofts, and contemporary urban living spaces with premium amenities.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    phone: '+27 13 754 6789',
    email: 'urban@luxappartments.co.za',
    website: 'www.luxappartments.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Luxury Apartments', 'Designer Lofts', 'Urban Living'],
    logo: '🏢'
  },
  {
    id: 'aal_002',
    name: 'Metropolitan Residential Solutions',
    category: Category.RealEstateAndProperty,
    subcategory: 'Apartments & Lofts',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 478,
    description: 'Urban residential specialist providing premium apartment selections, loft conversions, and contemporary city living options with full amenities.',
    image: 'https://images.unsplash.com/photo-1515221318891-f369a822333f?w=800&q=80',
    phone: '+27 13 752 9012',
    email: 'metro@metropolitanres.co.za',
    website: 'www.metropolitanres.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Premium Apartments', 'Loft Conversions', 'City Living'],
    logo: '🏙️'
  }
];
