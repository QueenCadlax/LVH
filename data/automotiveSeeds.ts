import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// CAR DEALERSHIPS (LUXURY & EV)
export const luxuryEVDealerships: Business[] = [
  {
    id: 'auto_luxury_001',
    name: 'Mpumalanga Luxury Motor Group',
    category: Category.Automotive,
    subcategory: 'CAR DEALERSHIPS (LUXURY & EV)',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 567,
    description: 'Exclusive luxury and electric vehicle dealership featuring Ferrari, Porsche, Tesla, and Lucid. Premium financing, trade-ins, and concierge service.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    phone: '+27 13 752 9000',
    email: 'sales@mpumalangaluxury.co.za',
    website: 'www.mpumalangaluxury.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Luxury Cars', 'EV Vehicles', 'Tesla', 'Exotic', 'Premium']
  },
  {
    id: 'auto_luxury_002',
    name: 'Lowveld Elite Automotive',
    category: Category.Automotive,
    subcategory: 'CAR DEALERSHIPS (LUXURY & EV)',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 423,
    description: 'Premium automotive dealership specializing in luxury sedans and electric vehicles. Expert sales team with vehicle customization and warranty support.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 774 0000',
    email: 'info@lowveldelite.co.za',
    website: 'www.lowveldelite.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Luxury', 'Electric Vehicles', 'Premium Sales', 'Warranty', 'Customization']
  }
];

// CAR HIRE & RENTALS
export const carHireAndRentals: Business[] = [
  {
    id: 'auto_hire_001',
    name: 'Mpumalanga Premium Car Rentals',
    category: Category.Automotive,
    subcategory: 'CAR HIRE & RENTALS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 478,
    description: 'Luxury car rental service offering premium sedans, SUVs, and sports cars. Airport delivery, corporate packages, and personalized service.',
    image: 'https://images.unsplash.com/photo-1609708536965-5e7627ba214b?w=800&h=600&fit=crop',
    phone: '+27 13 753 1000',
    email: 'rentals@mpumalangapremium.co.za',
    website: 'www.mpumalangapremium.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Car Rental', 'Luxury Fleet', 'Airport Service', 'Corporate', 'Premium']
  },
  {
    id: 'auto_hire_002',
    name: 'Lowveld Prestige Car Hire',
    category: Category.Automotive,
    subcategory: 'CAR HIRE & RENTALS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 345,
    description: 'Professional car rental with diverse luxury fleet. Flexible packages, insurance options, and dedicated customer support for all occasions.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 739 2000',
    email: 'hire@lowveldprestige.co.za',
    website: 'www.lowveldprestige.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Car Rental', 'Premium Fleet', 'Flexible Packages', 'Insurance', 'Service']
  }
];

// SERVICE & REPAIRS
export const serviceAndRepairs: Business[] = [
  {
    id: 'auto_service_001',
    name: 'Mpumalanga Luxury Auto Service',
    category: Category.Automotive,
    subcategory: 'SERVICE & REPAIRS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 512,
    description: 'Specialized service center for luxury and sports cars. Expert technicians, genuine parts, warranty guarantee, and concierge maintenance.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 754 3000',
    email: 'service@mpumalangaluxury.co.za',
    website: 'www.mpumalangaluxury.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Auto Service', 'Luxury Cars', 'Repairs', 'Warranty', 'Expert Technicians']
  },
  {
    id: 'auto_service_002',
    name: 'Lowveld Premium Auto Repair',
    category: Category.Automotive,
    subcategory: 'SERVICE & REPAIRS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 389,
    description: 'Full-service automotive repair center for luxury and sports vehicles. Diagnostic expertise, transmission service, and engine rebuilding.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 776 4000',
    email: 'repair@lowveldpremium.co.za',
    website: 'www.lowveldpremium.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Auto Repair', 'Service Center', 'Diagnostics', 'Premium', 'Expertise']
  }
];

// CAR DETAILING & MAINTENANCE
export const carDetailingAndMaintenance: Business[] = [
  {
    id: 'auto_detail_001',
    name: 'Mpumalanga Concierge Auto Detailing',
    category: Category.Automotive,
    subcategory: 'CAR DETAILING & MAINTENANCE',
    tier: ListingTier.Platinum,
    location: 'White River',
    rating: 4.9,
    reviewCount: 434,
    description: 'Premium car detailing and maintenance service. Ceramic coating, paint protection, interior restoration, and fleet maintenance programs.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 777 5000',
    email: 'detail@mpumalangaconcierge.co.za',
    website: 'www.mpumalangaconcierge.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Detailing', 'Paint Protection', 'Ceramic Coating', 'Maintenance', 'Premium']
  },
  {
    id: 'auto_detail_002',
    name: 'Lowveld Luxury Car Care',
    category: Category.Automotive,
    subcategory: 'CAR DETAILING & MAINTENANCE',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.8,
    reviewCount: 298,
    description: 'Professional car detailing and preventive maintenance. Expert interior and exterior care with eco-friendly products and techniques.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 755 6000',
    email: 'care@lowveldluxury.co.za',
    website: 'www.lowveldluxury.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Detailing', 'Car Care', 'Maintenance', 'Eco-Friendly', 'Professional']
  }
];

// LIMOUSINES & EXOTIC CAR RENTALS
export const limoAndExoticRentals: Business[] = [
  {
    id: 'auto_limo_001',
    name: 'Mpumalanga Executive Limousine Service',
    category: Category.Automotive,
    subcategory: 'LIMOUSINES & EXOTIC CAR RENTALS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 501,
    description: 'Premium limousine and exotic car rental service. Lamborghini, Ferrari, Rolls-Royce available. Professional drivers and VIP concierge.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 756 7000',
    email: 'executive@mpumalangalimo.co.za',
    website: 'www.mpumalangalimo.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Limousine', 'Exotic Cars', 'VIP Service', 'Executive', 'Premium']
  },
  {
    id: 'auto_limo_002',
    name: 'Lowveld Prestige Limousine Services',
    category: Category.Automotive,
    subcategory: 'LIMOUSINES & EXOTIC CAR RENTALS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 367,
    description: 'Luxury limousine and exotic car rentals for special occasions and corporate events. Professional chauffeurs and premium fleet.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 778 8000',
    email: 'limo@lowveldprestige.co.za',
    website: 'www.lowveldprestige.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Limousine', 'Exotic Rental', 'Chauffeur', 'Events', 'Premium']
  }
];

// MOTORCYCLE & ATV RENTALS
export const motorcycleAndATVRentals: Business[] = [
  {
    id: 'auto_moto_001',
    name: 'Mpumalanga Adventure Motorcycle Rentals',
    category: Category.Automotive,
    subcategory: 'MOTORCYCLE & ATV RENTALS',
    tier: ListingTier.Platinum,
    location: 'White River',
    rating: 4.9,
    reviewCount: 389,
    description: 'Premium motorcycle and ATV rental service. Harley-Davidson, adventure bikes, and ATVs for rent. Guided tours and safety training available.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 779 9000',
    email: 'adventure@mpumalangamoto.co.za',
    website: 'www.mpumalangamoto.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Motorcycle Rental', 'ATV', 'Adventure', 'Harley-Davidson', 'Tours']
  },
  {
    id: 'auto_moto_002',
    name: 'Lowveld Bike & ATV Rental',
    category: Category.Automotive,
    subcategory: 'MOTORCYCLE & ATV RENTALS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 267,
    description: 'Motorcycle and ATV rental service with diverse fleet. Safety equipment, insurance, and professional guidance for adventure enthusiasts.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 741 0000',
    email: 'rentals@lowveldbike.co.za',
    website: 'www.lowveldbike.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Motorcycle', 'ATV Rental', 'Adventure', 'Safety', 'Professional']
  }
];
