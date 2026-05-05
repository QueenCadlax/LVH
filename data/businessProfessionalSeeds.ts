import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// LEGAL SERVICES - Category.LegalAndAdvisory
export const legalServices: Business[] = [
  {
    id: 'bps_legal_001',
    name: 'Mpumalanga Premier Legal Solutions',
    category: Category.LegalAndAdvisory,
    subcategory: 'Legal Services',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 445,
    description: 'Elite law firm specializing in corporate, commercial, and property law. Expert legal counsel for businesses and individuals with 20+ years expertise.',
    image: 'https://images.unsplash.com/photo-1589829545856-d2540cbd3a3d?w=800&h=600&fit=crop',
    phone: '+27 13 752 6000',
    email: 'counsel@mpumalangalegal.co.za',
    website: 'www.mpumalangalegal.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Legal', 'Corporate', 'Commercial', 'Property Law', 'Premium Counsel']
  },
  {
    id: 'bps_legal_002',
    name: 'Lowveld Justice & Associates',
    category: Category.LegalAndAdvisory,
    subcategory: 'Legal Services',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 312,
    description: 'Professional legal services for business disputes, contracts, and compliance. Trusted advisors for corporate matters and legal strategy.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    phone: '+27 13 765 7000',
    email: 'info@lowveldjustice.co.za',
    website: 'www.lowveldjustice.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Legal Services', 'Contracts', 'Compliance', 'Business Law', 'Professional']
  }
];

// ACCOUNTING & TAX - Category.BusinessGrowthAndConsulting
export const accountingAndTax: Business[] = [
  {
    id: 'bps_account_001',
    name: 'Mpumalanga Premium Accounting',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Accounting & Tax',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 523,
    description: 'Full-service accounting firm with tax optimization expertise. CFO services, audits, and strategic financial planning for businesses.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 752 4500',
    email: 'accounts@mpumalangapremium.co.za',
    website: 'www.mpumalangapremium.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Accounting', 'Tax', 'Financial Planning', 'Audits', 'CFO Services']
  },
  {
    id: 'bps_account_002',
    name: 'Lowveld Financial Management',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Accounting & Tax',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 389,
    description: 'Professional accounting and tax services for SMEs and corporates. Bookkeeping, payroll, and tax compliance expertise.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    phone: '+27 13 737 5500',
    email: 'financial@lowveldmanagement.co.za',
    website: 'www.lowveldmanagement.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Accounting', 'Payroll', 'Tax Compliance', 'Bookkeeping', 'SME Services']
  }
];

// CONSULTANTS
export const consultants: Business[] = [
  {
    id: 'bps_consult_001',
    name: 'Mpumalanga Strategic Consulting Group',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Consultants',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 467,
    description: 'Top-tier business consulting with expertise in strategy, operations, and transformation. Serving Fortune 500 companies and regional leaders.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 753 8000',
    email: 'strategy@mpumalangaconsulting.co.za',
    website: 'www.mpumalangaconsulting.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Consulting', 'Strategy', 'Operations', 'Transformation', 'Executive']
  },
  {
    id: 'bps_consult_002',
    name: 'Lowveld Business Solutions',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Consultants',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 334,
    description: 'Business consulting for SMEs and startups. Operational efficiency, market analysis, and growth strategy consulting.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 770 9000',
    email: 'consult@lowveldbusiness.co.za',
    website: 'www.lowveldbusiness.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Consulting', 'Business Strategy', 'Growth', 'Market Analysis', 'SME']
  }
];

// MARKETING & ADVERTISING
export const marketingAndAdvertising: Business[] = [
  {
    id: 'bps_marketing_001',
    name: 'Mpumalanga Luxury Marketing Agency',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Marketing & Advertising',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 489,
    description: 'Award-winning marketing agency specializing in luxury brand positioning. Digital, traditional, and experiential campaigns for premium clients.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 752 3200',
    email: 'creative@mpumalangaluxury.co.za',
    website: 'www.mpumalangaluxury.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Marketing', 'Advertising', 'Branding', 'Digital Campaign', 'Luxury']
  },
  {
    id: 'bps_marketing_002',
    name: 'Lowveld Creative Studio',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Marketing & Advertising',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 256,
    description: 'Full-service marketing agency with social media, content, and brand strategy expertise. Helping businesses build strong market presence.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 738 4200',
    email: 'creative@lowveldstudio.co.za',
    website: 'www.lowveldstudio.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Marketing', 'Social Media', 'Content', 'Branding', 'Creative']
  }
];

// TECH & IT SERVICES
export const techAndITServices: Business[] = [
  {
    id: 'bps_tech_001',
    name: 'Mpumalanga Enterprise IT Solutions',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Tech & IT Services',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 512,
    description: 'Enterprise-grade IT services including cloud solutions, cybersecurity, and digital transformation. Trusted by major corporations.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 754 2000',
    email: 'enterprise@mpumalangait.co.za',
    website: 'www.mpumalangait.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['IT Services', 'Cloud', 'Cybersecurity', 'Enterprise', 'Digital Transform']
  },
  {
    id: 'bps_tech_002',
    name: 'Lowveld Tech Innovations',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'Tech & IT Services',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 378,
    description: 'IT support, software development, and digital solutions for businesses. Network management, cybersecurity, and tech consulting.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 771 3000',
    email: 'support@lowveldtech.co.za',
    website: 'www.lowveldtech.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['IT Support', 'Development', 'Network', 'Security', 'Tech Solutions']
  }
];

// ARCHITECTS & INTERIOR DESIGNERS
export const architectsAndDesigners: Business[] = [
  {
    id: 'bps_arch_001',
    name: 'Mpumalanga Luxury Architects Studio',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Architects & Interior Designers',
    tier: ListingTier.Platinum,
    location: 'White River',
    rating: 4.9,
    reviewCount: 421,
    description: 'Award-winning architecture firm specializing in luxury residential and commercial design. Innovative, sustainable, and iconic structures.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 767 1000',
    email: 'design@mpumalangaarch.co.za',
    website: 'www.mpumalangaarch.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Architecture', 'Design', 'Luxury', 'Sustainable', 'Award-Winning']
  },
  {
    id: 'bps_arch_002',
    name: 'Lowveld Design Architects',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Architects & Interior Designers',
    tier: ListingTier.Elite,
    location: 'Mbombela',
    rating: 4.8,
    reviewCount: 298,
    description: 'Professional architectural and interior design services. Residential projects, commercial spaces, and complete design solutions.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 755 2000',
    email: 'architects@lowvelddesign.co.za',
    website: 'www.lowvelddesign.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Architecture', 'Interior Design', 'Residential', 'Commercial', 'Design']
  }
];

// BUSINESS BROKERS & INVESTMENT ADVISORS
export const businessBrokersAndAdvisors: Business[] = [
  {
    id: 'bps_broker_001',
    name: 'Mpumalanga Premium Business Advisory',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Business Brokers & Investment Advisors',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 434,
    description: 'Elite business brokerage and investment advisory services. M&A transactions, business valuations, and investment strategies for high-net-worth clients.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 752 7800',
    email: 'advisory@mpumalangabusiness.co.za',
    website: 'www.mpumalangabusiness.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Business Brokerage', 'M&A', 'Investment', 'Valuation', 'Advisory']
  },
  {
    id: 'bps_broker_002',
    name: 'Lowveld Investment Partners',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Business Brokers & Investment Advisors',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 312,
    description: 'Business brokerage and investment advisory with focus on SME acquisitions and growth financing. Expert market knowledge and deal facilitation.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 768 8800',
    email: 'invest@lowveldpartners.co.za',
    website: 'www.lowveldpartners.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Business Brokerage', 'Investment', 'SME', 'Acquisitions', 'Financing']
  }
];

// LIFE COACHES & MENTORS
export const lifeCoachesAndMentors: Business[] = [
  {
    id: 'bps_coach_001',
    name: 'Mpumalanga Elite Life Coaching',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Life Coaches & Mentors',
    tier: ListingTier.Platinum,
    location: 'White River',
    rating: 4.9,
    reviewCount: 389,
    description: 'Premium life coaching and executive mentoring for high achievers. Personal development, leadership, and strategic life planning expertise.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 769 5500',
    email: 'coaching@mpumalangaelite.co.za',
    website: 'www.mpumalangaelite.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Life Coaching', 'Executive Mentoring', 'Leadership', 'Personal Development', 'Premium']
  },
  {
    id: 'bps_coach_002',
    name: 'Lowveld Success Coaching',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Life Coaches & Mentors',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 267,
    description: 'Professional life and business coaching. Career development, personal growth, and success coaching for individuals and entrepreneurs.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 740 6500',
    email: 'coach@lowveldSuccess.co.za',
    website: 'www.lowveldSuccess.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Coaching', 'Mentoring', 'Career', 'Personal Growth', 'Business']
  }
];

// TRANSLATION & LANGUAGE SERVICES
export const translationAndLanguageServices: Business[] = [
  {
    id: 'bps_translate_001',
    name: 'Mpumalanga Premier Translation Services',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Translation & Language Services',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 356,
    description: 'Professional translation services for business, legal, and technical documents. Multi-language expertise including African languages and global languages.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 756 4000',
    email: 'translate@mpumalangapremier.co.za',
    website: 'www.mpumalangapremier.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Translation', 'Language Services', 'Business Documents', 'Legal', 'Multi-Language']
  },
  {
    id: 'bps_translate_002',
    name: 'Lowveld Language Solutions',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'Translation & Language Services',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 234,
    description: 'Professional translation, interpretation, and language training services. Certified translators and cultural expertise for business communications.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 772 5000',
    email: 'language@lowveldsolutions.co.za',
    website: 'www.lowveldsolutions.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Translation', 'Interpretation', 'Language Training', 'Certified', 'Professional']
  }
];

// PR & MEDIA CONSULTANTS
export const prAndMediaConsultants: Business[] = [
  {
    id: 'bps_pr_001',
    name: 'Mpumalanga Strategic PR & Media',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'PR & Media Consultants',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 401,
    description: 'Top-tier PR and media consulting firm. Crisis management, brand positioning, and media relations expertise for corporate and celebrity clients.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 753 3000',
    email: 'pr@mpumalangastratégic.co.za',
    website: 'www.mpumalangastratégic.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['PR', 'Media Relations', 'Crisis Management', 'Brand Positioning', 'Executive']
  },
  {
    id: 'bps_pr_002',
    name: 'Lowveld Communications Experts',
    category: Category.BusinessGrowthAndConsulting,
    subcategory: 'PR & Media Consultants',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 289,
    description: 'Professional PR, media relations, and communications strategy. Press releases, media placement, and public relations management for businesses.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 741 4000',
    email: 'comms@lowveldexpertise.co.za',
    website: 'www.lowveldexpertise.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['PR', 'Communications', 'Media Relations', 'Public Relations', 'Professional']
  }
];

