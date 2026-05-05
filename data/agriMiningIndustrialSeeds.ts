import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// CROP & FARM SUPPLIERS
export const cropAndFarmSuppliers: Business[] = [
  {
    id: 'agri_crop_001',
    name: 'Mpumalanga Premium Agricultural Supplies',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'CROP & FARM SUPPLIERS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 523,
    description: 'Premium supplier of seeds, fertilizers, and crop inputs. Certified organic options, precision agriculture solutions, and farmer consultation services.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop',
    phone: '+27 13 752 5500',
    email: 'supplies@mpumalangaag.co.za',
    website: 'www.mpumalangaag.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Agricultural Supplies', 'Seeds', 'Fertilizers', 'Organic', 'Premium']
  },
  {
    id: 'agri_crop_002',
    name: 'Lowveld Farm Solutions',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'CROP & FARM SUPPLIERS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 387,
    description: 'Comprehensive farm supply distributor with quality seeds, nutrients, and equipment. Expert agronomic advice and bulk supply partnerships.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
    phone: '+27 13 774 6500',
    email: 'info@lowveldfarm.co.za',
    website: 'www.lowveldfarm.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Farm Supplies', 'Seeds', 'Nutrients', 'Equipment', 'Professional']
  }
];

// LIVESTOCK SERVICES
export const livestockServices: Business[] = [
  {
    id: 'agri_livestock_001',
    name: 'Mpumalanga Livestock & Veterinary Services',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'LIVESTOCK SERVICES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 456,
    description: 'Full-service livestock management and veterinary support. Breeding consultation, health monitoring, feed optimization, and compliance management.',
    image: 'https://images.unsplash.com/photo-1516594915202-b1b3b397c0ab?w=800&h=600&fit=crop',
    phone: '+27 13 753 7600',
    email: 'livestock@mpumalangavets.co.za',
    website: 'www.mpumalangavets.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Livestock Services', 'Veterinary', 'Breeding', 'Health', 'Management']
  },
  {
    id: 'agri_livestock_002',
    name: 'Lowveld Animal & Feed Solutions',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'LIVESTOCK SERVICES',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 334,
    description: 'Livestock nutrition and health services with premium feed formulations. Veterinary partnerships and herd management expertise.',
    image: 'https://images.unsplash.com/photo-1500595046891-dff44f2a5388?w=800&h=600&fit=crop',
    phone: '+27 13 739 8600',
    email: 'animal@lowveldfeeds.co.za',
    website: 'www.lowveldfeeds.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Livestock', 'Feed', 'Nutrition', 'Health', 'Professional']
  }
];

// AGRI-TECH & MACHINERY
export const agritechAndMachinery: Business[] = [
  {
    id: 'agri_tech_001',
    name: 'Mpumalanga Agricultural Technology Solutions',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'AGRI-TECH & MACHINERY',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 512,
    description: 'Advanced agricultural machinery and precision agri-tech solutions. IoT monitoring, drone services, GPS systems, and sustainable farming technologies.',
    image: 'https://images.unsplash.com/photo-1588702547919-06d1d6dcc4bc?w=800&h=600&fit=crop',
    phone: '+27 13 754 9700',
    email: 'agritech@mpumalangatech.co.za',
    website: 'www.mpumalangatech.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Agri-Tech', 'Machinery', 'IoT', 'Drones', 'Precision Farming']
  },
  {
    id: 'agri_tech_002',
    name: 'Lowveld Smart Farm Equipment',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'AGRI-TECH & MACHINERY',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 278,
    description: 'Smart farming equipment and machinery rental services. Modern tractors, harvesters, and precision instruments with expert operator training.',
    image: 'https://images.unsplash.com/photo-1585420237524-0df59a78ad1f?w=800&h=600&fit=crop',
    phone: '+27 13 777 0700',
    email: 'equipment@lowveldsmartfarm.co.za',
    website: 'www.lowveldsmartfarm.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Machinery', 'Equipment', 'Smart Farming', 'Rental', 'Professional']
  }
];

// MINING SUPPLIERS
export const miningSuppliers: Business[] = [
  {
    id: 'agri_mining_001',
    name: 'Mpumalanga Industrial Mining Supplies',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'MINING SUPPLIERS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 567,
    description: 'Premium mining supplies and consumables distributor. Safety equipment, drilling materials, and blasting supplies with certified compliance.',
    image: 'https://images.unsplash.com/photo-1581092160562-40038f6e0d8b?w=800&h=600&fit=crop',
    phone: '+27 13 755 1800',
    email: 'mining@mpumalanamining.co.za',
    website: 'www.mpumalanamining.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Mining Supplies', 'Safety', 'Drilling', 'Industrial', 'Premium']
  },
  {
    id: 'agri_mining_002',
    name: 'Lowveld Mining & Industrial Supplies',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'MINING SUPPLIERS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 423,
    description: 'Comprehensive mining and industrial supplies with competitive pricing. Quick delivery and expert technical support for mining operations.',
    image: 'https://images.unsplash.com/photo-1581092334652-c7cf9ab09d28?w=800&h=600&fit=crop',
    phone: '+27 13 741 2800',
    email: 'supplies@lowveldmining.co.za',
    website: 'www.lowveldmining.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Mining Supplies', 'Industrial', 'Quick Delivery', 'Support', 'Professional']
  }
];

// MINING EQUIPMENT & MACHINERY
export const miningEquipmentAndMachinery: Business[] = [
  {
    id: 'agri_mining_equip_001',
    name: 'Mpumalanga Mining Equipment & Solutions',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'MINING EQUIPMENT & MACHINERY',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 489,
    description: 'Advanced mining equipment sales and rental. Drilling rigs, excavators, crushers, and processing equipment with technical maintenance support.',
    image: 'https://images.unsplash.com/photo-1581092916029-8761a5920527?w=800&h=600&fit=crop',
    phone: '+27 13 756 3900',
    email: 'equipment@mpumalangaminingequip.co.za',
    website: 'www.mpumalangaminingequip.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Mining Equipment', 'Machinery', 'Rental', 'Drilling', 'Premium']
  },
  {
    id: 'agri_mining_equip_002',
    name: 'Lowveld Heavy Equipment & Mining Services',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'MINING EQUIPMENT & MACHINERY',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 345,
    description: 'Heavy mining equipment supply and maintenance services. Expert technicians and comprehensive warranty programs for mining operations.',
    image: 'https://images.unsplash.com/photo-1581092334656-e11ca2fadc60?w=800&h=600&fit=crop',
    phone: '+27 13 778 4900',
    email: 'equipment@lowveldheavy.co.za',
    website: 'www.lowveldheavy.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Equipment', 'Machinery', 'Maintenance', 'Mining', 'Professional']
  }
];

// INDUSTRIAL TOOLS & HEAVY MACHINERY
export const industrialToolsAndMachinery: Business[] = [
  {
    id: 'agri_industrial_001',
    name: 'Mpumalanga Industrial Tools & Equipment',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'INDUSTRIAL TOOLS & HEAVY MACHINERY',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 534,
    description: 'Premium industrial tools and heavy machinery supplier. Manufacturing equipment, hydraulics, compressors, and industrial automation solutions.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    phone: '+27 13 757 5000',
    email: 'industrial@mpumalangatools.co.za',
    website: 'www.mpumalangatools.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Industrial Tools', 'Heavy Machinery', 'Equipment', 'Manufacturing', 'Premium']
  },
  {
    id: 'agri_industrial_002',
    name: 'Lowveld Industrial Solutions',
    category: Category.ManufacturingWholesaleSuppliers,
    subcategory: 'INDUSTRIAL TOOLS & HEAVY MACHINERY',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.8,
    reviewCount: 289,
    description: 'Comprehensive industrial machinery and tools distribution. Factory equipment, compressors, power tools, and technical support services.',
    image: 'https://images.unsplash.com/photo-1581092334652-c7cf9ab09d28?w=800&h=600&fit=crop',
    phone: '+27 13 758 6000',
    email: 'solutions@lowveldindustrial.co.za',
    website: 'www.lowveldindustrial.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Industrial', 'Machinery', 'Tools', 'Equipment', 'Professional']
  }
];
