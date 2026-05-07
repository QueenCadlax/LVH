// Agent backend type
export interface Agent {
  id: number;
  userId: number;
  currentTarget: number;
  monthlyProgress: number;
  achievements: string[];
  earnings: number;
  createdAt: string;
  updatedAt: string;
}
export enum Category {
  FoodAndHospitality = 'FOOD & HOSPITALITY',
  TourismTravelAndStays = 'TOURISM, TRAVEL & HOSPITALITY',
  LuxuryAndLifestyle = 'LUXURY & LIFESTYLE',
  NightlifeAndEntertainment = 'NIGHTLIFE & ENTERTAINMENT',
  BeautyWellnessPersonalCare = 'BEAUTY, WELLNESS & PERSONAL CARE',
  HealthAndMedical = 'HEALTHCARE',
  RealEstateAndProperty = 'REAL ESTATE',
  Automotive = 'AUTOMOTIVE',
  TransportChauffeursFleet = 'TRANSPORT, CHAUFFEUR & FLEET SERVICES',
  HomeConstructionAndTrades = 'HOME, CONSTRUCTION & TRADES',
  ShoppingAndRetail = 'SHOPPING & RETAIL',
  LegalAndAdvisory = 'LEGAL & ADVISORY',
  BusinessGrowthAndConsulting = 'BUSINESS GROWTH & CONSULTING',
  FinancialServices = 'FINANCE & MONEY SERVICES',
  ProfessionalServices = 'PROFESSIONAL SERVICES',
  EducationAndSkills = 'EDUCATION & SCHOOLS',
  DigitalMediaAndTechnology = 'DIGITAL, MEDIA & TECHNOLOGY',
  ManufacturingWholesaleSuppliers = 'MANUFACTURING, WHOLESALE & SUPPLIERS',
  CommunityAndOrganisations = 'FAMILY, KIDS & COMMUNITY',
  GovernmentAndPublicServices = 'GOVERNMENT & PUBLIC SERVICES',
  EventsExperiencesAndOccasions = 'EVENTS, EXPERIENCES & OCCASIONS',
  SportsFitnessAndRecreation = 'SPORTS, FITNESS & RECREATION',
  PetsVeterinaryAndAnimalCare = 'PETS, VETERINARY & ANIMAL CARE',
  SecurityProtectionAndResponse = 'SECURITY, PROTECTION & RESPONSE',
  EnergyWaterAndSustainability = 'ENERGY, WATER & SUSTAINABILITY',
  CreatorEconomyAndTalent = 'CREATOR ECONOMY & TALENT',
  RecruitmentAndStaffing = 'RECRUITMENT & STAFFING',
  DomesticAndPersonalServices = 'DOMESTIC & PERSONAL SERVICES',
  ConvenienceAndDailyNeeds = 'CONVENIENCE & DAILY NEEDS',
  WomenHealthAndMaternal = 'WOMEN, HEALTH & MATERNAL',
  JobsAndCareers = 'JOBS & CAREERS'
}

export const MARKETPLACE_CATEGORY_GROUPS = {
  'Electronics': [
    'Laptops & Tablets',
    'Audio & Speakers',
    'Cameras & Photography',
    'Smart Devices'
  ],
  'Fashion': [
    'Men • Women • Shoes',
    'Bags & Accessories',
    'Jewelry & Watches'
  ],
  'Home & Living': [
    'Furniture & Decor',
    'Kitchen & Dining',
    'Garden & Outdoor',
    'Rugs & Textiles'
  ],
  'Beauty & Wellness': [
    'Skincare & Cosmetics',
    'Haircare',
    'Fragrance',
    'Wellness & Supplements'
  ],
  'Automotive': [
    'Car Accessories',
    'Motorbikes',
    'Tools & Equipment'
  ],
  'Food & Beverage': [
    'Gourmet & Artisan',
    'Coffee & Tea',
    'Wine & Spirits',
    'Local Produce'
  ],
  'Luxury': [
    'Designer Goods',
    'Limited Edition',
    'Collectibles & Art',
    'Artisan Crafts'
  ]
};

export const MPUMALANGA_AREAS = [
  'Acornhoek',
  'Amersfoort',
  'Amsterdam',
  'Apara',
  'Badplaas',
  'Balfour',
  'Barberton',
  'Bethal',
  'Breyten',
  'Bushbuckridge',
  'Carolina',
  'Chrissiesmeer',
  'Delmas',
  'Dullstroom',
  'Emalahleni',
  'Ermelo',
  'Evander',
  'Ga-Boelang',
  'Ga-Monlala',
  'Graskop',
  'Greylingstad',
  'Hazyview',
  'Hectorspruit',
  'Kaapmuiden',
  'Kamagugu',
  'KaNyamazane',
  'Kaapschehoop',
  'Kanyamazane',
  'Kinross',
  'Komatipoort',
  'KwaMhlanga',
  'Kwaggafontein',
  'Leslie',
  'Lydenburg',
  'Machadodorp',
  'Magudu',
  'Malalane',
  'Marble Hall',
  'Matsulu',
  'Mkhuhlu',
  'Mokhololine',
  'Moloro',
  'Moremela Village',
  'Msauli',
  'Naas',
  'Nelspruit',
  'Ohrigstad',
  'Piet Retief',
  'Pilgrim’s Rest',
  'Sabie',
  'Salubindza',
  'Secunda',
  'Siyabuswa',
  'Standerton',
  'Tonga',
  'Tshabalala',
  'Tswafeng',
  'Verena',
  'Volksrust',
  'Wakkerstroom',
  'Waterval Boven',
  'Waterval Onder',
  'White River',
  'Wolwekrans'
];

export const PRICE_FILTERS = ['$', '$$', '$$$', '$$$$'];

export const RATING_FILTERS = [
  { label: '1 Star & Up', value: 1 },
  { label: '2 Stars & Up', value: 2 },
  { label: '3 Stars & Up', value: 3 },
  { label: '4 Stars & Up', value: 4 },
  { label: '5 Stars', value: 5 }
];

export enum ListingTier {
  Trial = '7-Day Trial',
  Premium = 'Premium',
  Elite = 'Elite',
  Platinum = 'Platinum'
}

export const LISTING_TIER_FILTERS = [
  ListingTier.Premium,
  ListingTier.Elite,
  ListingTier.Platinum
];

export const SERVICE_TYPE_FILTERS = [
  'Restaurants',
  'Luxury Stays',
  'Automotive Services',
  'Beauty & Wellness',
  'Professional Services'
];

export enum SubscriptionDuration {
  Trial = '7-Day Trial',
  ThreeMonths = '3 Months',
  SixMonths = '6 Months',
  TwelveMonths = '12 Months'
}

export interface AreaDomination {
  area: string;
  tier: 'Gold' | 'Platinum';
  startDate: string;
  endDate: string;
  monthlyFee: number;
  isActive: boolean;
}

export interface SellerScore {
  quality: number; // 0-5: average product/service rating
  reliability: number; // 0-100: on-time delivery percentage
  communication: number; // 0-100: average response time in hours
  security: number; // 0-100: trust score (inverse of chargeback rate)
  overallScore: number; // weighted average (0-5)
  totalReviews: number;
  verifiedPurchaseReviews: number;
  completedTransactions: number;
  lastUpdated: string;
}

export enum TrustBadge {
  TopSeller = 'TOP_SELLER', // Top 5% overall score
  Verified = 'VERIFIED', // 4.5+ rating, 50+ verified purchases
  RisingStar = 'RISING_STAR', // New seller with 4.8+ rating
  CustomerChoice = 'CUSTOMER_CHOICE', // 95%+ reliability + 4.7+ communication
  Certified = 'CERTIFIED', // ISO, BGC, or insurance verified
  ResponsiveTeam = 'RESPONSIVE_TEAM' // <2 hour average response time
}

export interface VerificationIndicator {
  type: 'ISO' | 'BGC' | 'INSURANCE' | 'RESPONSE_TIME' | 'PAYMENT_SECURE';
  isVerified: boolean;
  verificationDate?: string;
  badge?: string;
}

export interface TrustStackData {
  badges: TrustBadge[];
  indicators: VerificationIndicator[];
  sellerScore: SellerScore;
}

export enum RFQStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Quoted = 'QUOTED',
  Accepted = 'ACCEPTED',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED'
}

export interface RequestForQuote {
  id: string;
  title: string;
  description: string;
  category: Category;
  subcategory?: string;
  area: string;
  budget: { min: number; max: number };
  timeline: string; // e.g., "2 weeks", "ASAP", "By Feb 15"
  requirements: string[];
  userId: string;
  status: RFQStatus;
  createdDate: string;
  updatedDate: string;
  imageUrl?: string;
  urgency: 'Low' | 'Medium' | 'High';
  contactPreference: 'Phone' | 'Email' | 'WhatsApp' | 'InApp';
}

export interface QuoteResponse {
  id: string;
  rfqId: string;
  businessId: string;
  businessName: string;
  quoteAmount: number;
  timeline: string;
  notes: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Negotiating';
  submittedDate: string;
  validUntil: string;
  termsAndConditions?: string;
  deliverables?: string[];
}

export interface TierPricing {
  price: number | string;
  duration: SubscriptionDuration;
  features: string[];
  visibility: 'Standard' | 'Featured' | 'Maximum Exposure' | 'Exclusive';
  commission: number | string;
  note?: string;
}

export const AREA_DOMINATION_PRICING: Record<string, { Gold: number; Platinum: number }> = {
  'Nelspruit': { Gold: 500, Platinum: 1200 },
  'Mbombela': { Gold: 500, Platinum: 1200 },
  'White River': { Gold: 400, Platinum: 1000 },
  'Hazyview': { Gold: 300, Platinum: 800 },
  'Kiepersol': { Gold: 300, Platinum: 800 },
  'Sabie': { Gold: 250, Platinum: 600 },
  'Pilgrim\'s Rest': { Gold: 250, Platinum: 600 },
  'Graskop': { Gold: 250, Platinum: 600 },
  'Hoedspruit': { Gold: 300, Platinum: 800 },
  'Bushbuckridge': { Gold: 250, Platinum: 600 }
};

export const PRICING_STRUCTURE: Record<ListingTier, TierPricing> = {
  [ListingTier.Trial]: {
    price: 0,
    duration: SubscriptionDuration.Trial,
    features: ['Business Name', 'Address', 'Contact'],
    visibility: 'Standard',
    commission: 0,
    note: 'Only available once per business; converts automatically to Paid after 7 days'
  },
  [ListingTier.Premium]: {
    price: 700,
    duration: SubscriptionDuration.SixMonths,
    features: ['Business Name', 'Address', 'Contact', 'Images', 'Description', 'Social Links'],
    visibility: 'Featured',
    commission: 100
  },
  [ListingTier.Elite]: {
    price: 1200,
    duration: SubscriptionDuration.TwelveMonths,
    features: ['All Premium Features', 'Priority Placement', 'ELITE Badge', 'Top Listing in Category', 'Highlighted Contact'],
    visibility: 'Maximum Exposure',
    commission: 150
  },
  [ListingTier.Platinum]: {
    price: 'Custom',
    duration: SubscriptionDuration.TwelveMonths,
    features: ['All Elite Features', 'Homepage Spotlight', 'Newsletter Feature', 'AI Spotlight', 'Marketing Boost'],
    visibility: 'Exclusive',
    commission: 'Negotiable / Custom'
  }
};

export const CategorySubcategories: Record<Category, string[]> = {
  [Category.FoodAndHospitality]: [
    'SHISANYAMA & BRAAI SPOTS',
    'FINE DINING',
    'CASUAL RESTAURANTS',
    'CAFÉS & COFFEE SHOPS',
    'BARS & COCKTAIL LOUNGES',
    'CATERING SERVICES',
    'BAKERIES & DESSERTS',
    'FOOD TRUCKS & POP-UPS'
  ],
  [Category.TourismTravelAndStays]: [
    'HOTELS & LODGES',
    'GUEST HOUSES & B&Bs',
    'SAFARIS & GAME RESERVES',
    'TOUR OPERATORS & GUIDES',
    'SCENIC ROUTES & ADVENTURE TRAVEL',
    'YACHT & BOAT CHARTERS',
    'PRIVATE JET / AIR CHARTER'
  ],
  [Category.LuxuryAndLifestyle]: [
    'CONCIERGE SERVICES',
    'EXCLUSIVE EXPERIENCES',
    'PERSONAL ASSISTANTS',
    'LUXURY CLUBS & MEMBERSHIPS',
    'WINE TASTING & VINEYARDS',
    'GOLF & COUNTRY CLUBS',
    'PERSONAL STYLING & WARDROBE CONSULTANTS'
  ],
  [Category.NightlifeAndEntertainment]: [
    'CLUBS & LOUNGES',
    'LIVE MUSIC & VENUES',
    'BARS & COCKTAIL LOUNGES',
    'THEATERS & CINEMAS',
    'GAMING & VR CENTERS',
    'DANCE STUDIOS & PERFORMANCES',
    'MUSIC LESSONS & TEACHERS'
  ],
  [Category.BeautyWellnessPersonalCare]: [
    'HAIR SALONS',
    'BARBER SHOPS',
    'NAIL & BEAUTY STUDIOS',
    'SPAS & MASSAGE THERAPY',
    'SKINCARE & BODY TREATMENTS',
    'NUTRITIONISTS & DIETICIANS',
    'COSMETIC SURGERY / AESTHETIC CLINICS'
  ],
  [Category.HealthAndMedical]: [
    'GENERAL PRACTITIONERS',
    'DENTISTS',
    'GYNAECOLOGISTS',
    'PAEDIATRICIANS',
    'DERMATOLOGISTS',
    'CARDIOLOGISTS',
    'ORTHODONTISTS',
    'OPTOMETRISTS',
    'OPHTHALMOLOGISTS',
    'PSYCHOLOGISTS',
    'PSYCHIATRISTS',
    'MENTAL HEALTH PROFESSIONALS',
    'PHYSIOTHERAPISTS',
    'CHIROPRACTORS',
    'DIETICIANS',
    'SPEECH THERAPISTS',
    'OCCUPATIONAL THERAPISTS',
    'FERTILITY CLINICS',
    'DAY CLINICS',
    'PRIVATE HOSPITALS',
    'DIAGNOSTIC LABS',
    'RADIOLOGY',
    'HOME CARE SERVICES',
    'OLD AGE HOMES',
    'REHABILITATION CENTRES',
    'PHARMACIES',
    'WELLNESS RETREATS',
    'YOGA RETREATS'
  ],
  [Category.RealEstateAndProperty]: [
    'ESTATE AGENTS',
    'PROPERTY RENTALS',
    'COMMERCIAL PROPERTY',
    'PROPERTY MANAGEMENT & TENANTS',
    'LAND & PLOTS',
    'LUXURY HOMES & VILLAS',
    'APARTMENTS & LOFTS'
  ],
  [Category.Automotive]: [
    'CAR DEALERSHIPS (LUXURY & EV)',
    'CAR HIRE & RENTALS',
    'SERVICE & REPAIRS',
    'CAR DETAILING & MAINTENANCE',
    'LIMOUSINES & EXOTIC CAR RENTALS',
    'MOTORCYCLE & ATV RENTALS'
  ],
  [Category.TransportChauffeursFleet]: [
    'PRIVATE DRIVERS & CHAUFFEURS',
    'AIRPORT TRANSFERS',
    'SHUTTLE & MINIBUS SERVICES',
    'LIMOUSINE & LUXURY CAR SERVICES',
    'COURIER & DELIVERY SERVICES',
    'EV CHARGING STATIONS',
    'HELICOPTER CHARTERS'
  ],
  [Category.HomeConstructionAndTrades]: [
    'BUILDERS & CONTRACTORS',
    'PLUMBING & ELECTRICAL',
    'ROOFING & RENOVATIONS',
    'INTERIOR DESIGNERS & HOME DECOR',
    'LANDSCAPING & GARDENING',
    'SMART HOME INSTALLATION',
    'CUSTOM FURNITURE MAKERS',
    'POOL & GARDEN DESIGNERS'
  ],
  [Category.ShoppingAndRetail]: [
    'BOUTIQUES & FASHION',
    'HOME & DECOR STORES',
    'GROCERS & MARKETS',
    'LUXURY PRODUCTS & GIFTS',
    'ECO & SUSTAINABLE PRODUCTS',
    'ONLINE MARKETPLACES'
  ],
  [Category.LegalAndAdvisory]: [
    'IMMIGRATION LAWYERS',
    'DIVORCE & FAMILY LAW',
    'CRIMINAL DEFENCE',
    'LABOUR & EMPLOYMENT LAW',
    'PROPERTY & CONVEYANCING',
    'CORPORATE & COMMERCIAL LAW',
    'PERSONAL INJURY LAW',
    'WILLS, ESTATES & TRUSTS',
    'NOTARIES',
    'LEGAL CONSULTANTS'
  ],
  [Category.BusinessGrowthAndConsulting]: [
    'MANAGEMENT CONSULTANTS',
    'BUSINESS COACHES & MENTORS',
    'STRATEGY & ADVISORY',
    'ACCOUNTING & TAX CONSULTING',
    'MARKETING & ADVERTISING AGENCIES',
    'ARCHITECTS & INTERIOR DESIGNERS',
    'BUSINESS BROKERS & INVESTMENT ADVISORS',
    'LIFE COACHES & MENTORS',
    'TRANSLATION & LANGUAGE SERVICES',
    'PR & MEDIA CONSULTANTS'
  ],
  [Category.EducationAndSkills]: [
    'PRIMARY & SECONDARY SCHOOLS',
    'UNIVERSITIES',
    'COLLEGES & TRAINING CENTERS',
    'TUTORS & EXTRA CLASSES',
    'ONLINE COURSES & SKILL DEVELOPMENT',
    'VOCATIONAL & TECHNICAL TRAINING'
  ],
  [Category.DigitalMediaAndTechnology]: [
    'SOFTWARE & APP DEVELOPMENT',
    'WEB & DESIGN STUDIOS',
    'DIGITAL MARKETING AGENCIES',
    'AI & DATA SCIENCE SERVICES',
    'CYBERSECURITY & IT SERVICES',
    'CLOUD & IT INFRASTRUCTURE',
    'PHOTOGRAPHY & VIDEOGRAPHY',
    'DRONE PHOTOGRAPHY / VIDEOGRAPHY',
    'GAMING & ESPORTS',
    'VIRTUAL & AUGMENTED REALITY'
  ],
  [Category.FinancialServices]: [
    'BANKS & BRANCHES',
    'LOAN PROVIDERS',
    'INSURANCE BROKERS',
    'INVESTMENT & FINANCIAL ADVISORS',
    'CRYPTOCURRENCY & BLOCKCHAIN SERVICES',
    'ESTATE PLANNING & WILLS',
    'TAX CONSULTANTS / ADVISORS'
  ],
  [Category.ManufacturingWholesaleSuppliers]: [
    'MANUFACTURING & PRODUCTION',
    'WHOLESALE SUPPLIERS',
    'INDUSTRIAL EQUIPMENT & TOOLS',
    'AGRI-TECH & MACHINERY',
    'MINING EQUIPMENT & SUPPLIERS',
    'FARM EQUIPMENT & LIVESTOCK SERVICES',
    'BUILDING MATERIALS & SUPPLIES'
  ],
  [Category.CommunityAndOrganisations]: [
    'FAMILY SERVICES',
    'CHILDCARE & SCHOOLS',
    'LOCAL COMMUNITY CENTRES',
    'RELIGIOUS CENTRES (CHURCHES & MOSQUES)',
    'PLAY CENTERS & KID ACTIVITIES',
    'AFTER-SCHOOL PROGRAMS & CLUBS',
    'FAMILY ENTERTAINMENT'
  ],
  [Category.GovernmentAndPublicServices]: [
    'MUNICIPAL SERVICES',
    'LICENSING & REGISTRATIONS',
    'PUBLIC HEALTH SERVICES'
  ],
  [Category.EventsExperiencesAndOccasions]: [
    'EVENT VENUES & HALLS',
    'WEDDING PLANNERS & COORDINATORS',
    'CORPORATE EVENTS & CONFERENCES',
    'PARTY & CELEBRATION PLANNERS',
    'DECOR & FLORISTS',
    'PHOTOGRAPHERS & VIDEOGRAPHERS',
    'DJS & LIVE ENTERTAINMENT',
    'CATERING & FOOD SERVICE',
    'EQUIPMENT & TENT RENTALS',
    'AUDIO VISUAL & LIGHT DESIGN',
    'EVENT STAFFING & COORDINATION'
  ],
  [Category.SportsFitnessAndRecreation]: [
    'GYMS & FITNESS CENTERS',
    'PERSONAL TRAINERS',
    'YOGA, PILATES & MARTIAL ARTS',
    'SPORTS CLUBS & ACADEMIES',
    'OUTDOOR & ADVENTURE SPORTS',
    'WELLNESS RETREATS'
  ],
  [Category.PetsVeterinaryAndAnimalCare]: [
    'VETERINARY CLINICS & HOSPITALS',
    'PET GROOMING & BOARDING',
    'PET TRAINING & BEHAVIOR',
    'PET SUPPLIES & STORES',
    'ANIMAL WELFARE & RESCUE',
    'LIVESTOCK VETERINARY SERVICES',
    'PET TRANSPORT & RELOCATION',
    'PET NUTRITION & WELLNESS'
  ],
  [Category.SecurityProtectionAndResponse]: [
    'ARMED RESPONSE SERVICES',
    'VIP & PERSONAL PROTECTION',
    'PRIVATE SECURITY COMPANIES',
    'CCTV & ALARM SYSTEMS',
    'ACCESS CONTROL & FENCING',
    'CYBERSECURITY SERVICES',
    'EMERGENCY RESPONSE'
  ],
  [Category.EnergyWaterAndSustainability]: [
    'SOLAR & RENEWABLE ENERGY',
    'INVERTERS & BACKUP POWER',
    'WATER SOLUTIONS & BOREHOLES',
    'WATER PURIFICATION & TREATMENT',
    'WASTE & RECYCLING SERVICES',
    'SUSTAINABLE PRODUCTS & SERVICES',
    'ENERGY EFFICIENCY CONSULTING'
  ],
  [Category.CreatorEconomyAndTalent]: [
    'INFLUENCERS & CONTENT CREATORS',
    'VIDEOGRAPHERS & CINEMATOGRAPHY',
    'PHOTOGRAPHERS',
    'HOSTS & TALENT',
    'MUSIC PRODUCERS & SOUND ENGINEERS',
    'DIGITAL CONTENT STUDIOS',
    'BRAND AMBASSADORS & TALENT MANAGEMENT'
  ],
  [Category.RecruitmentAndStaffing]: [
    'EXECUTIVE RECRUITMENT',
    'HOSPITALITY STAFFING',
    'SKILLED TRADES RECRUITMENT',
    'TEMPORARY & CONTRACT STAFFING',
    'HR CONSULTING & OUTSOURCING'
  ],
  [Category.DomesticAndPersonalServices]: [
    'CLEANING SERVICES (HOME & CORPORATE)',
    'GARDENING & LANDSCAPING',
    'HOME MAINTENANCE & HANDYMAN',
    'NANNIES & CAREGIVERS',
    'ELDERLY CARE SERVICES'
  ],
  [Category.ConvenienceAndDailyNeeds]: [
    'CONVENIENCE STORES',
    'SUPERETTES',
    'SPAZA SHOPS (VERIFIED)',
    'BUTCHERIES',
    'BAKERIES',
    'LIQUOR STORES'
  ],
  [Category.WomenHealthAndMaternal]: [
    'GYNECOLOGISTS',
    'MATERNITY CLINICS',
    'MIDWIVES & DOULAS',
    'CRECHES & DAYCARE',
    'AFTERCARE & TUTORS',
    'KIDS ACTIVITY CENTRES'
  ],
  [Category.JobsAndCareers]: [
    'JOB LISTINGS / VACANCIES',
    'JOB SEEKER PROFILES / RESUMES',
    'RECRUITMENT & HR SERVICES',
    'INTERNSHIPS & APPRENTICESHIPS',
    'CAREER COACHING & GUIDANCE'
  ],
  [Category.ProfessionalServices]: [
    'BUSINESS CONSULTING',
    'ACCOUNTING & TAX SERVICES',
    'LEGAL SERVICES',
    'ELECTRICAL SERVICES',
    'PLUMBING SERVICES',
    'IT & TECH SUPPORT',
    'MARKETING & ADVERTISING',
    'TRANSLATION & LANGUAGE SERVICES'
  ]
};

export type EateryCategory =
  | 'Shisanyama'
  | 'Fine Dining'
  | 'Casual'
  | 'Fast Food'
  | 'Café'
  | 'Lounge'
  | 'Street Food'
  | 'Bakery';

export interface MenuItem {
  id?: string;
  itemName: string;
  description?: string;
  price: string; // e.g., "R120"
  image?: string;
  category?: string; // Starters, Mains, Drinks
}

export interface Eatery {
  id: string;
  name: string;
  category: EateryCategory;
  cuisine: string[];
  location: { area: string; city?: string } | string;
  images?: string[];
  description?: string;
  menu?: MenuItem[];
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  rating?: number;
  reviews?: any[];
  contactOptions?: { call?: string; whatsapp?: string; directions?: string };
  dineIn?: boolean;
  takeaway?: boolean;
  delivery?: boolean;
  verified?: boolean;
  premiumTier?: 'Standard' | 'Elite' | 'Signature';
}

export enum ListingType {
  Standard,
  Premium,
  Gold
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  subcategory?: string;
  description: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  tier: ListingTier;
  subscriptionDuration: SubscriptionDuration;
  subscriptionStart?: string;
  isPremium?: boolean;
  isElite?: boolean;
  isPlatinum?: boolean;
  isTopRated?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  isOpenNow?: boolean;
  priceLevel?: string; // $ - $$$$
  tags?: string[];
  phone?: string;
  email?: string;
  website?: string;
  openingHours?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    tiktok?: string;
  };
  status?: 'Pending' | 'Active' | 'Rejected';
  ownerId?: string;
  subscriptionPlan?: string;
  badges?: ('VERIFIED' | 'CURATED' | 'BY_INVITATION' | 'HIGH_DEMAND' | 'FEATURED')[];
  areaDomination?: AreaDomination;
  trustStack?: TrustStackData;
}

export interface Retailer {
  id: string;
  name: string;
  subcategory: string;
  location: { area: string; city?: string } | string;
  image: string;
  description?: string;
  rating?: number;
  tier: 'Standard' | 'Premium' | 'Elite' | 'Platinum';
  tags?: string[];
  brands?: string[];
  products?: string[];
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  verified?: boolean;
  website?: string;
  contactOptions?: { call?: string; whatsapp?: string };
  onlineStore?: boolean;
}

export interface ProfessionalService {
  id: string;
  name: string;
  subcategory: string;
  location: { area: string; city?: string } | string;
  image: string;
  description?: string;
  servicesSummary?: string;
  rating?: number;
  tier: 'Standard' | 'Premium' | 'Elite' | 'Platinum';
  tags?: string[];
  expertise?: string[];
  clientTypes?: string[];
  verified?: boolean;
  website?: string;
  contactOptions?: { call?: string; whatsapp?: string; email?: string };
  consultationTypes?: ('free' | 'hourly' | 'retainer')[];
  remoteServices?: boolean;
}

export interface NightlifeVenue {
  id: string;
  name: string;
  subcategory: string;
  location: { area: string; city?: string } | string;
  image: string;
  description?: string;
  vibeDescription?: string;
  rating?: number;
  tier: 'Standard' | 'Premium' | 'Elite' | 'Platinum';
  tags?: string[];
  genres?: string[];
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  verified?: boolean;
  website?: string;
  contactOptions?: { call?: string; whatsapp?: string };
  openingHours?: string;
  features?: {
    liveMusic?: boolean;
    dj?: boolean;
    vipSection?: boolean;
    dressCode?: boolean;
    lateNight?: boolean;
    outdoorTerrace?: boolean;
    cocktails?: boolean;
    happyHour?: boolean;
    ladiesNight?: boolean;
    ticketed?: boolean;
    parking?: boolean;
    security?: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Business' | 'Creator';
  status: 'Active' | 'Pending';
  tier?: 'Essential' | 'Professional' | 'Platinum';
  rewardPoints?: number;
  savedItems?: string[];
  lastLogin?: string;
  joinedDate?: string;
  affiliateStats?: AffiliateStats;
  rewardStats?: RewardStats;
  sellerStats?: SellerStats;
}

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  area: string;
  beds: number;
  baths: number;
  parking: number;
  image: string;
  gallery?: string[];
  type: 'Sale' | 'Rent';
  isFeatured?: boolean;
  tier?: ListingTier;
  description: string;
  fullDescription?: string;
  tags: string[];
  sqm?: number;
  plotSize?: number;
  amenities?: string[];
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentImage?: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  postedAt: string;
}

export interface Stay {
  id: string;
  name: string;
  type: 'Hotel' | 'Lodge' | 'BnB' | 'Guesthouse' | 'Apartment' | 'Villa' | 'Resort' | string;
  // human-friendly summary location used in UI (e.g. "Mbombela")
  location: string;
  // structured location details
  locationDetail?: {
    city?: string;
    area?: string;
    province?: string;
  };
  pricePerNight: number;
  priceLevel?: string; 
  images?: string[];
  description?: string;
  amenities?: string[];
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  rating?: number;
  reviews?: { id: string; author: string; rating: number; comment: string; date?: string }[];
  hostOrBusiness?: string;
  availabilityCalendar?: { date: string; available: boolean }[];
  bookingEnabled?: boolean;
  contactOptions?: ('Call' | 'WhatsApp' | 'Email' | 'Website')[];
  verified?: boolean;
  premiumTier?: 'Standard' | 'Elite' | 'Signature';
  // keep some common business fields so cards/components can reuse the shape
  image?: string;
  isElite?: boolean;
  isFeatured?: boolean;
  reviewCount?: number;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount?: number;
  image: string;
  description: string;
  tags?: string[];
  pricePerPerson?: number; // From R— per person
  duration?: string; // Half day, Full day, Multi-day
  activityType?: string; // Hiking, Sightseeing, Wildlife, etc.
  experienceCategory?: string; // Nature, Wildlife, Culture, Adventure, etc.
  latitude?: number;
  longitude?: number;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  price: string;
  seller: string;
  image: string;
  category: string;
  subcategory?: string;
  location?: string;
  condition?: 'New' | 'Used';
  isSponsored?: boolean;
  description?: string;
  isVerifiedSeller?: boolean;
  isLocalVendor?: boolean;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    tiktok?: string;
  };
}

export interface LoyaltyStatus {
  points: number;
  tier: 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  nextTierPoints: number;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  description?: string;
}

export interface Creator {
  id: string;
  name: string;
  category: string;
  followers: string;
  engagement: string;
  image: string;
  tags: string[];
  area?: string;
  tagline?: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  image: string;
  description: string;
}

export interface DatingProfile {
  id: string;
  name: string;
  age: number;
  profession: string;
  bio: string;
  image: string;
  interests: string[];
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  experience: string;
  image: string;
  skills: string[];
}

export interface Campaign {
  id: string;
  title: string;
  brand: string;
  budget: string;
  requirements: string[];
  image: string;
  type?: string;
  area?: string;
  brief?: string;
  deadline?: string;
  status?: 'Open' | 'Closed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'success' | 'info';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Dealership {
  id: string;
  name: string;
  logo: string;
  banner: string;
  location: string;
  rating: number;
  contact: string;
  isPremium?: boolean;
}

export interface CarListing {
  id: string;
  title: string;
  price: string;
  mileage: string;
  year: string;
  transmission: string;
  dealer: string;
  image: string;
  location: string;
  isSponsored?: boolean;
  fuel?: string;
  isPremium?: boolean;
  isVerified?: boolean;
}

// Marketplace product and seller types
export interface Seller {
  id: string;
  name: string;
  logo?: string;
  location?: string;
  isVerified?: boolean;
  isBusiness?: boolean;
  totalListings?: number;
  description?: string;
  rating?: number;
  reviewCount?: number;
  trustScore?: number;
  contact?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

export interface Product {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  images: string[];
  description?: string;
  fullDescription?: string;
  brand?: string;
  category?: string;
  subcategory?: string;
  condition: 'New' | 'Used';
  location?: string;
  sellerId: string;
  sellerType: 'Local Seller' | 'Verified Brand' | 'Premium Partner';
  sellerName?: string;
  sellerImage?: string;
  sellerPhone?: string;
  rating: number;
  reviewCount?: number;
  inStock: boolean;
  stock?: number;
  isSponsored?: boolean;
  isFeatured?: boolean;
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  sku?: string;
  reviews?: ProductReview[];
  relatedProductIds?: string[];
}

export interface ProductReview {
  id: string;
  reviewer: string;
  rating: number;
  date: string;
  text: string;
  helpful?: number;
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  pointsPrice: number;
  features: string[];
  color: string;
}

export interface MicroTask {
  id: string;
  title: string;
  category: string;
  payout: string;
  requirements: string;
  status: 'Open' | 'Completed';
}

export interface AffiliateStats {
  clicks: number;
  signups: number;
  paidListings: number;
  commission: number;
  code: string;
  tier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalEarned?: number;
  pendingEarnings?: number;
  withdrawnEarnings?: number;
  conversionRate?: number;
  avgEarningsPerReferral?: number;
  monthlyEarnings?: number;
  referralHistory?: Array<{ date: string; businessName: string; status: 'pending' | 'approved'; commission: number }>;
  bonusThreshold?: { current: number; target: number; reward: number };
  leaderboardRank?: number;
  leaderboardPosition?: number;
  lastPayout?: { date: string; amount: number; method: string };
}

export interface SellerStats {
  totalSales: number;
  pendingBalance: number;
  withdrawableBalance: number;
  history: { id: string, date: string, amount: number, status: string }[];
}

export interface RewardStats {
  points: number;
  history: { id: string, action: string, points: number, date: string }[];
}

export interface Story {
  id: string;
  businessName: string;
  headline?: string;
  owner?: string;
  authorTitle?: string;
  authorBio?: string;
  category?: string;
  area: string;
  description: string;
  image: string;
  videoUrl?: string;
  type?: 'News' | 'Money & Finance' | 'Entertainment' | 'Entrepreneur Spotlight' | 'Property & Development';
  isFeatured?: boolean;
  isPartner?: boolean;
  isTrending?: boolean;
  isSponsored?: boolean;
  isPremium?: boolean;
  date?: string;
  businessId?: string;
  views?: number;
  readingTime?: number;
  series?: { name: string; part: number; total: number };
  images?: string[];
}

export interface WebsiteOrder {
  id: string;
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  type: string;
  description: string;
  management: boolean;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface ActivityLog {
  id: string;
  text: string;
  location: string;
  timestamp: string;
}

export interface AmplifyCampaign {
  id: string;
  businessName: string;
  title: string;
  budget: string;
  type: string;
  area: string;
}

// AI-Powered Premium Features Types

export interface BusinessMatch {
  id: string;
  name: string;
  matchReason: string;
  matchScore: number;
  image: string;
  location: string;
  tier: ListingTier;
  rating: number;
  category: string;
}

export interface AreaGuide {
  id: string;
  areaName: string;
  description: string;
  highlights: string[];
  topRestaurants: Business[];
  topAccommodations: Destination[];
  topActivities: string[];
  localTips: string[];
  distanceFromNelspruit: string;
  bestTimeToVisit: string;
  estimatedBudget: string;
}

export interface ItineraryItem {
  day: number;
  morning: string;
  afternoon: string;
  evening: string;
  suggestedBusinesses: Business[];
  estimatedCost: number;
}

export interface VIPItinerary {
  id: string;
  title: string;
  duration: number;
  budget: number;
  interests: string[];
  startArea: string;
  itinerary: ItineraryItem[];
  totalEstimatedCost: number;
  generatedAt: string;
}

export interface ConciergePreferences {
  favoriteCategories: Category[];
  favoriteAreas: string[];
  priceRange: { min: number; max: number };
  preferredTier: ListingTier | null;
  savedRecommendations: string[];
  conversationHistory: { role: string; message: string; timestamp: string }[];
}

// ============================================
// BUSINESS SUBMISSION SYSTEM TYPES
// ============================================

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
  operating_hours: Record<string, { open: string; close: string } | string>;
  services?: string;
  amenities: string[];
  menu_url?: string;
  images: string[];
  videos: string[];
  proof_of_business_url: string;
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

// ========================
// MARKETPLACE PRODUCT TYPES (SEPARATE FROM BUSINESS CATEGORIES)
// ========================

export enum ProductCategory {
  // Goods & Items (20 categories only - simplified, distinct from business categories)
  FASHION = 'Fashion & Clothing',
  ELECTRONICS = 'Electronics & Technology',
  HOME_DECOR = 'Home & Decor',
  BEAUTY = 'Beauty & Personal Care',
  FOOD = 'Food & Beverages',
  JEWELRY = 'Accessories & Jewelry',
  CRAFTS = 'Art & Crafts',
  BOOKS = 'Books & Media',
  SPORTS = 'Sports & Fitness',
  PETS = 'Pets & Pet Supplies',
  AUTOMOTIVE = 'Automotive',
  OFFICE = 'Business & Office',
  KIDS = 'Kids & Baby',
  GARDEN = 'Home & Garden',
  GAMING = 'Gaming & Hobbies',
  HEALTH = 'Health & Wellness',
  GADGETS = 'Gadgets & Accessories',
  HANDMADE = 'Handmade & Artisan',
  WINE = 'Wine & Spirits',
  LUXURY = 'Luxury Items'
}

export const PRODUCT_CATEGORIES = Object.values(ProductCategory);

// Category icon mapping for marketplace UI
export const PRODUCT_CATEGORY_ICONS: Record<string, string> = {
  'Fashion & Clothing': '👗',
  'Electronics & Technology': '📱',
  'Home & Decor': '🏠',
  'Beauty & Personal Care': '💄',
  'Food & Beverages': '🍽️',
  'Accessories & Jewelry': '💎',
  'Art & Crafts': '🎨',
  'Books & Media': '📚',
  'Sports & Fitness': '⚽',
  'Pets & Pet Supplies': '🐾',
  'Automotive': '🚗',
  'Business & Office': '💼',
  'Kids & Baby': '👶',
  'Home & Garden': '🌿',
  'Gaming & Hobbies': '🎮',
  'Health & Wellness': '💊',
  'Gadgets & Accessories': '⌚',
  'Handmade & Artisan': '🎁',
  'Wine & Spirits': '🍷',
  'Luxury Items': '✨'
};

export type ProductCondition = 'New' | 'Used' | 'Refurbished' | 'Like New';

export enum ProductPricingTier {
  ENTRY = 'entry',
  STARTER = 'starter',
  PRO = 'pro',
  ONE_OFF = 'one_off'
}

export const PRODUCT_PRICING_STRUCTURE = {
  [ProductPricingTier.ENTRY]: {
    name: 'Entry',
    monthly_price: 60,
    products_per_month: 5,
    listing_duration_days: 30,
    features: ['Basic listing', '5 products/month', '30-day duration']
  },
  [ProductPricingTier.STARTER]: {
    name: 'Starter',
    monthly_price: 150,
    products_per_month: 20,
    listing_duration_days: 90,
    features: ['20 products/month', '90-day listings', 'Product analytics']
  },
  [ProductPricingTier.PRO]: {
    name: 'Pro',
    monthly_price: 300,
    products_per_month: Infinity,
    listing_duration_days: 365,
    features: ['Unlimited products', '365-day listings', 'Analytics & featured badge', 'Priority support']
  },
  [ProductPricingTier.ONE_OFF]: {
    name: 'One-Off',
    one_time_price: 25,
    products_count: 1,
    listing_duration_days: 30,
    features: ['1 product listing', '30-day duration', 'Perfect for occasional sellers']
  }
};

export interface ProductSubmissionData {
  id?: string;
  title: string;
  description: string;
  category: ProductCategory;
  condition: ProductCondition;
  price: string; // Display price (e.g., "R 1,499")
  priceValue: number; // Numeric value for calculations
  stock: number;
  images: string[]; // URLs or base64
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerType: 'individual' | 'business';
  pricingTier: ProductPricingTier;
  createdAt?: Date;
  expiresAt?: Date;
  status?: 'active' | 'sold' | 'removed' | 'expired';
  reported_count?: number;
  report_reasons?: string[];
  is_suspended?: boolean;
  featured?: boolean;
}

export interface ProductReport {
  id?: string;
  productId: string;
  reportedBy: string;
  reporterEmail?: string;
  reason: 'Spam' | 'Scam' | 'Inappropriate' | 'Fake Item' | 'Wrong Category' | 'Other';
  description: string;
  createdAt?: Date;
  status?: 'pending' | 'reviewed' | 'resolved';
}

export const PRODUCT_REPORT_REASONS = [
  'Spam',
  'Scam',
  'Inappropriate',
  'Fake Item',
  'Wrong Category',
  'Other'
];

// Moderation threshold: Auto-flag product for admin review if >= 3 reports
export const PRODUCT_MODERATION_THRESHOLD = 3;
export const REPORT_REASONS_FOR_AUTO_SUSPEND = ['Scam', 'Fake Item'];

// Email notification (for admin when product flagged)
export interface ProductModerationAlert {
  productId: string;
  productTitle: string;
  reportCount: number;
  reportReasons: string[];
  adminReviewLink: string;
}