import { Business, ListingTier, Category, SubscriptionDuration } from '../types';

// BANKS & BRANCHES
export const banksAndBranches: Business[] = [
  {
    id: 'fin_bank_001',
    name: 'Mpumalanga Private Banking Centre',
    category: Category.FinancialServices,
    subcategory: 'BANKS & BRANCHES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 687,
    description: 'Premier private banking division offering wealth management, investment services, exclusive banking privileges, and personalized financial planning. White-glove banking experience.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=600&fit=crop',
    phone: '+27 13 752 1100',
    email: 'privatebanking@mpumalangabank.co.za',
    website: 'www.mpumalangabank.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Private Banking', 'Wealth Management', 'Investment Services', 'Premium', 'Exclusive']
  },
  {
    id: 'fin_bank_002',
    name: 'Elite Financial Banking Services',
    category: Category.FinancialServices,
    subcategory: 'BANKS & BRANCHES',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 534,
    description: 'Full-service banking with personal relationship managers, competitive rates, digital banking, and comprehensive financial solutions. Client-focused banking excellence.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    phone: '+27 13 774 2200',
    email: 'service@elitebanking.co.za',
    website: 'www.elitebanking.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Banking Services', 'Personal Banking', 'Digital Services', 'Financial Solutions', 'Premium']
  }
];

// LOAN PROVIDERS
export const loanProviders: Business[] = [
  {
    id: 'fin_loan_001',
    name: 'Capital Elite Lending Solutions',
    category: Category.FinancialServices,
    subcategory: 'LOAN PROVIDERS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 612,
    description: 'Specialized lending for personal, business, and commercial loans. Competitive rates, fast approval, flexible terms, and expert financial guidance. Discreet and professional.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop',
    phone: '+27 13 752 3300',
    email: 'loans@capitalelite.co.za',
    website: 'www.capitalelite.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Loan Provider', 'Business Lending', 'Fast Approval', 'Competitive Rates', 'Premium']
  },
  {
    id: 'fin_loan_002',
    name: 'Ascent Financing & Loan Services',
    category: Category.FinancialServices,
    subcategory: 'LOAN PROVIDERS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 467,
    description: 'Professional loan services covering mortgages, vehicle finance, personal loans, and business funding. Expert consultants, transparent process, competitive financing.',
    image: 'https://images.unsplash.com/photo-1507238691621-53ec282a0d85?w=800&h=600&fit=crop',
    phone: '+27 13 737 4400',
    email: 'financing@ascentloans.co.za',
    website: 'www.ascentloans.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Loan Services', 'Financing', 'Mortgages', 'Business Loans', 'Professional']
  }
];

// INSURANCE BROKERS
export const insuranceBrokers: Business[] = [
  {
    id: 'fin_insurance_001',
    name: 'Premier Insurance & Risk Solutions',
    category: Category.FinancialServices,
    subcategory: 'INSURANCE BROKERS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 578,
    description: 'Elite insurance brokerage offering comprehensive coverage, life insurance, business protection, and risk management. Expert advisors, tailored solutions, premium service.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    phone: '+27 13 752 5500',
    email: 'insurance@premierbrokers.co.za',
    website: 'www.premierbrokers.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Insurance Broker', 'Risk Management', 'Life Insurance', 'Business Coverage', 'Premium']
  },
  {
    id: 'fin_insurance_002',
    name: 'Guardian Insurance & Protection Services',
    category: Category.FinancialServices,
    subcategory: 'INSURANCE BROKERS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 445,
    description: 'Trusted insurance broker specializing in property, vehicle, liability, and specialized coverage. Dedicated support, claims assistance, and comprehensive protection.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    phone: '+27 13 774 6600',
    email: 'info@guardianinsurance.co.za',
    website: 'www.guardianinsurance.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Insurance Broker', 'Coverage Protection', 'Claims Support', 'Professional', 'Comprehensive']
  }
];

// INVESTMENT & FINANCIAL ADVISORS
export const investmentAndFinancialAdvisors: Business[] = [
  {
    id: 'fin_advisor_001',
    name: 'Capital Growth Financial Advisors',
    category: Category.FinancialServices,
    subcategory: 'INVESTMENT & FINANCIAL ADVISORS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 645,
    description: 'Premier financial advisory firm offering investment strategy, portfolio management, wealth optimization, and retirement planning. Expert advisors, personalized approach, proven results.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop',
    phone: '+27 13 752 7700',
    email: 'advisors@capitalgrowth.co.za',
    website: 'www.capitalgrowth.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Financial Advisory', 'Investment Strategy', 'Wealth Management', 'Portfolio Management', 'Premium']
  },
  {
    id: 'fin_advisor_002',
    name: 'Pinnacle Wealth & Investment Solutions',
    category: Category.FinancialServices,
    subcategory: 'INVESTMENT & FINANCIAL ADVISORS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 512,
    description: 'Comprehensive investment advisory providing market analysis, asset allocation, financial planning, and investment opportunities. Professional consultants, transparent advice.',
    image: 'https://images.unsplash.com/photo-1516534775068-bb57c5c5efed?w=800&h=600&fit=crop',
    phone: '+27 13 737 8800',
    email: 'wealth@pinnacleadvisory.co.za',
    website: 'www.pinnacleadvisory.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Investment Advisor', 'Financial Planning', 'Wealth Advisory', 'Asset Allocation', 'Professional']
  }
];

// CRYPTOCURRENCY & BLOCKCHAIN SERVICES
export const cryptoAndBlockchainServices: Business[] = [
  {
    id: 'fin_crypto_001',
    name: 'Quantum Blockchain & Crypto Solutions',
    category: Category.FinancialServices,
    subcategory: 'CRYPTOCURRENCY & BLOCKCHAIN SERVICES',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 534,
    description: 'Leading cryptocurrency exchange, blockchain consulting, digital asset management, and crypto investment services. Secure platform, expert guidance, institutional-grade security.',
    image: 'https://images.unsplash.com/photo-1553531088-df340cf313d8?w=800&h=600&fit=crop',
    phone: '+27 13 752 8900',
    email: 'support@quantumblockchain.co.za',
    website: 'www.quantumblockchain.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Cryptocurrency', 'Blockchain', 'Digital Assets', 'Crypto Trading', 'Secure Platform']
  },
  {
    id: 'fin_crypto_002',
    name: 'Digital Asset Management Services',
    category: Category.FinancialServices,
    subcategory: 'CRYPTOCURRENCY & BLOCKCHAIN SERVICES',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 478,
    description: 'Professional cryptocurrency services including trading, wallet management, blockchain education, and investment opportunities. Secure, transparent, expert support.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62b63ef5?w=800&h=600&fit=crop',
    phone: '+27 13 774 9900',
    email: 'info@digitalassetmgmt.co.za',
    website: 'www.digitalassetmgmt.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Digital Assets', 'Crypto Services', 'Blockchain', 'Secure Trading', 'Professional']
  }
];

// ESTATE PLANNING & WILLS
export const estatePlanningAndWills: Business[] = [
  {
    id: 'fin_estate_001',
    name: 'Legacy Estate Planning Specialists',
    category: Category.FinancialServices,
    subcategory: 'ESTATE PLANNING & WILLS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 589,
    description: 'Comprehensive estate planning, will drafting, probate management, and wealth transfer strategies. Expert legal advisors, personalized planning, family protection.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    phone: '+27 13 752 4400',
    email: 'planning@legacyestate.co.za',
    website: 'www.legacyestate.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Estate Planning', 'Wills & Trusts', 'Probate', 'Legal Advisory', 'Premium']
  },
  {
    id: 'fin_estate_002',
    name: 'Secure Future Estate & Trust Services',
    category: Category.FinancialServices,
    subcategory: 'ESTATE PLANNING & WILLS',
    tier: ListingTier.Elite,
    location: 'Hazyview',
    rating: 4.8,
    reviewCount: 445,
    description: 'Professional estate planning, will preparation, trust administration, and inheritance guidance. Experienced advisors, comprehensive solutions, family-focused approach.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    phone: '+27 13 737 5500',
    email: 'trusts@securefuture.co.za',
    website: 'www.securefuture.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Estate Planning', 'Will Services', 'Trust Administration', 'Professional', 'Comprehensive']
  }
];

// TAX CONSULTANTS / ADVISORS
export const taxConsultantsAndAdvisors: Business[] = [
  {
    id: 'fin_tax_001',
    name: 'Premium Tax Advisory & Consulting',
    category: Category.FinancialServices,
    subcategory: 'TAX CONSULTANTS / ADVISORS',
    tier: ListingTier.Platinum,
    location: 'Mbombela',
    rating: 4.9,
    reviewCount: 623,
    description: 'Elite tax consulting providing tax planning, compliance, returns preparation, and corporate tax strategies. Expert CPAs, minimizes liability, maximizes efficiency.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    phone: '+27 13 752 6600',
    email: 'tax@premiumtaxadvisory.co.za',
    website: 'www.premiumtaxadvisory.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isPlatinum: true,
    tags: ['Tax Advisor', 'Tax Planning', 'Compliance', 'Corporate Tax', 'Premium']
  },
  {
    id: 'fin_tax_002',
    name: 'Strategic Tax Solutions & Advisory',
    category: Category.FinancialServices,
    subcategory: 'TAX CONSULTANTS / ADVISORS',
    tier: ListingTier.Elite,
    location: 'White River',
    rating: 4.8,
    reviewCount: 512,
    description: 'Professional tax consulting for individuals and businesses. Expert guidance, audit support, tax optimization strategies, and regulatory compliance expertise.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    phone: '+27 13 774 7700',
    email: 'strategy@taxsolutions.co.za',
    website: 'www.taxsolutions.co.za',
    subscriptionDuration: SubscriptionDuration.TwelveMonths,
    isElite: true,
    tags: ['Tax Consultant', 'Tax Strategy', 'Audit Support', 'Compliance', 'Professional']
  }
];
