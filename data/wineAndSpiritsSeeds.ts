import { Category, ListingTier, SubscriptionDuration } from '@/types';

// PREMIUM WINE HOUSES & CELLARS
export const premiumWineHouses = [
  {
    id: 'wine_ph_001',
    name: 'Mpumalanga Platinum Wine Collective',
    category: Category.FinancialServices,
    subcategory: 'Wine & Spirits Boutiques',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 678,
    description: 'Curated collection of vintage wines and rare spirits. Expert sommeliers, private tastings, and investment-grade wine portfolio management for connoisseurs.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=800&h=600&fit=crop',
    phone: '+27 13 752 1111',
    email: 'concierge@mpwc.co.za',
    website: 'www.mpwc.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Wine Investment', 'Rare Spirits', 'Sommelier Services', 'Private Tastings', 'Vintage Collections'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  },
  {
    id: 'wine_ph_002',
    name: 'Hazyview Spirits & Wine Reserve',
    category: Category.FinancialServices,
    subcategory: 'Wine & Spirits Boutiques',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 545,
    description: 'Premium wine and spirits importer specializing in South African and international selections. Personal wine pairing consultations and exclusive member events.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=800&h=600&fit=crop',
    phone: '+27 13 767 2222',
    email: 'selection@hzwr.co.za',
    website: 'www.hzwr.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Wine Selection', 'Spirits Import', 'Pairing Services', 'Exclusive Members', 'Tasting Events'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  }
];

// CRAFT DISTILLERIES & BREWERIES
export const craftDistilleries = [
  {
    id: 'wine_cd_001',
    name: 'Mpumalanga Premium Craft Distillery',
    category: Category.FinancialServices,
    subcategory: 'Craft Distilleries & Breweries',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 612,
    description: 'Award-winning craft distillery producing small-batch spirits using locally-sourced ingredients. Distillery tours, tastings, and limited-edition releases for collectors.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&h=600&fit=crop',
    phone: '+27 13 752 3333',
    email: 'distillery@mpcd.co.za',
    website: 'www.mpcd.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Craft Spirits', 'Distillery Tours', 'Small Batch', 'Limited Edition', 'Local Ingredients'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  },
  {
    id: 'wine_cd_002',
    name: 'White River Artisanal Brewery & Taproom',
    category: Category.FinancialServices,
    subcategory: 'Craft Distilleries & Breweries',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 489,
    description: 'Craft brewery showcasing small-batch beers and unique flavor profiles. Tasting room, brewery tours, and limited collaborative releases with international brewers.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&h=600&fit=crop',
    phone: '+27 13 750 4444',
    email: 'taproom@wrab.co.za',
    website: 'www.wrab.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Craft Beer', 'Brewery Tours', 'Taproom', 'Artisanal Brews', 'Limited Releases'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  }
];

// LUXURY COCKTAIL BARS & LOUNGES
export const luxurycocktailBars = [
  {
    id: 'wine_cb_001',
    name: 'Mbombela Platinum Mixology Lounge',
    category: Category.FinancialServices,
    subcategory: 'Luxury Cocktail Bars & Lounges',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 645,
    description: 'Ultra-premium cocktail lounge with world-class mixologists. Bespoke creations, rare spirit collections, and membership-exclusive events for discerning clientele.',
    image: 'https://images.unsplash.com/photo-1521017516367-7a4e5be5e2ab?w=800&h=600&fit=crop',
    phone: '+27 13 752 5555',
    email: 'reservations@mpml.co.za',
    website: 'www.mpml.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Craft Cocktails', 'Rare Spirits', 'Mixology', 'Premium Lounge', 'Membership Only'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  },
  {
    id: 'wine_cb_002',
    name: 'Hazyview Moonlight Spirits Bar',
    category: Category.FinancialServices,
    subcategory: 'Luxury Cocktail Bars & Lounges',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 523,
    description: 'Sophisticated cocktail bar featuring award-winning mixologists and curated spirit selection. Private booths, exclusive pairings, and bespoke cocktail consultations.',
    image: 'https://images.unsplash.com/photo-1521017516367-7a4e5be5e2ab?w=800&h=600&fit=crop',
    phone: '+27 13 767 6666',
    email: 'moonlight@hzmsb.co.za',
    website: 'www.hzmsb.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Cocktail Bar', 'Mixology', 'Private Booths', 'Spirit Selection', 'Bespoke Pairings'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  }
];

// WINE TASTING EXPERIENCES & EVENTS
export const wineTastingExperiences = [
  {
    id: 'wine_wt_001',
    name: 'Mpumalanga Sommelier Society & Wine Academy',
    category: Category.FinancialServices,
    subcategory: 'Wine Tasting Experiences & Events',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 567,
    description: 'Curated wine experiences and sommelier education. Masterclasses, blind tastings, vineyard tours, and private wine dinners paired with Michelin-trained chefs.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=800&h=600&fit=crop',
    phone: '+27 13 752 7777',
    email: 'tastings@msws.co.za',
    website: 'www.msws.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Wine Tastings', 'Sommelier Training', 'Wine Dinners', 'Masterclasses', 'Vineyard Tours'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  },
  {
    id: 'wine_wt_002',
    name: 'White River Wine & Culinary Experiences',
    category: Category.FinancialServices,
    subcategory: 'Wine Tasting Experiences & Events',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 434,
    description: 'Premium wine tasting events and food pairing experiences. Expert sommeliers guide intimate tastings with locally-sourced gourmet cuisine.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=800&h=600&fit=crop',
    phone: '+27 13 750 8888',
    email: 'experiences@wrwce.co.za',
    website: 'www.wrwce.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Wine Pairing', 'Culinary Events', 'Tasting Menus', 'Chef Collaborations', 'Expert Sommelier'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  }
];

// SPIRITS INVESTMENT & COLLECTIBLES
export const spiritsInvestment = [
  {
    id: 'wine_si_001',
    name: 'Mpumalanga Rare Spirits Investment Group',
    category: Category.FinancialServices,
    subcategory: 'Spirits Investment & Collectibles',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 589,
    description: 'Investment-grade rare spirits and collectible whiskeys. Portfolio management, authentication services, and expert guidance for collectors and investors.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&h=600&fit=crop',
    phone: '+27 13 752 9999',
    email: 'investment@mrsig.co.za',
    website: 'www.mrsig.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Spirits Investment', 'Rare Whiskey', 'Collectibles', 'Portfolio Management', 'Authentication'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  },
  {
    id: 'wine_si_002',
    name: 'Hazyview Collector\'s Spirit Vault',
    category: Category.FinancialServices,
    subcategory: 'Spirits Investment & Collectibles',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 456,
    description: 'Premium vault storage and investment management for collectible spirits. Secure climate-controlled storage, insurance, and investment advisory services.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&h=600&fit=crop',
    phone: '+27 13 767 0000',
    email: 'vault@hcsv.co.za',
    website: 'www.hcsv.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    tags: ['Spirits Vault', 'Storage Services', 'Collectible Spirits', 'Investment Advisory', 'Insurance'],
    logo: 'https://images.unsplash.com/photo-1608270861620-7c90e69a51b8?w=200&h=200&fit=crop'
  }
];
