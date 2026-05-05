import { RequestForQuote, QuoteResponse, Category, RFQStatus } from '../types';

// OPEN RFQs (awaiting quotes from businesses)
export const requestsForQuote: RequestForQuote[] = [
  {
    id: 'rfq_001',
    title: 'Medical Check-ups for 50 Employees',
    description: 'Looking for a trusted medical facility to conduct annual health check-ups for our 50 employees in Nelspruit. Need basic screening including BP, blood work, and general health assessment. Prefer morning slots on weekdays.',
    category: Category.HealthAndMedical,
    subcategory: 'GENERAL PRACTITIONERS',
    area: 'Nelspruit',
    budget: { min: 3000, max: 7500 },
    timeline: 'By February 15, 2026',
    requirements: [
      'ISO certified facility',
      'Experienced medical team',
      'Bulk pricing for groups',
      'Same-day results for blood work',
      'After-hours availability',
      'Comprehensive report for each employee'
    ],
    userId: 'user_company_001',
    status: RFQStatus.Published,
    createdDate: '2026-01-20',
    updatedDate: '2026-01-22',
    urgency: 'High',
    contactPreference: 'Email',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop'
  },
  {
    id: 'rfq_002',
    title: 'Website Design & Development',
    description: 'Small tech startup in Mbombela needs a professional website redesign. Current site is outdated. Need modern, responsive design with e-commerce integration. Must include CMS for easy content updates.',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'WEB & DESIGN STUDIOS',
    area: 'Mbombela',
    budget: { min: 5000, max: 15000 },
    timeline: 'ASAP - 4 weeks preferred',
    requirements: [
      'Responsive mobile design',
      'SEO optimized',
      'Payment gateway integration',
      'Admin dashboard',
      'Fast loading times',
      'Ongoing support for 3 months',
      'Portfolio of similar projects'
    ],
    userId: 'user_startup_001',
    status: RFQStatus.Quoted,
    createdDate: '2026-01-15',
    updatedDate: '2026-01-22',
    urgency: 'High',
    contactPreference: 'WhatsApp',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop'
  },
  {
    id: 'rfq_003',
    title: 'Corporate Event Catering for 200 Guests',
    description: 'Executive team looking for premium catering service for our annual corporate retreat. Expected 200+ guests. Want Mpumalanga local dishes with international flair. Dinner and breakfast service needed.',
    category: Category.FoodAndHospitality,
    subcategory: 'RESTAURANTS & FINE DINING',
    area: 'White River',
    budget: { min: 25000, max: 50000 },
    timeline: '3 weeks',
    requirements: [
      'Menu customization available',
      'Experienced event catering team',
      'Professional servers & bartenders',
      'Dietary accommodations (vegan, halal, gluten-free)',
      'Full table setup & decoration',
      'Wine pairing suggestions',
      'Vegetarian options must be premium quality'
    ],
    userId: 'user_corporate_001',
    status: RFQStatus.Published,
    createdDate: '2026-01-18',
    updatedDate: '2026-01-22',
    urgency: 'Medium',
    contactPreference: 'Phone',
    imageUrl: 'https://images.unsplash.com/photo-1554244933-ccbf4e236286?w=400&h=300&fit=crop'
  },
  {
    id: 'rfq_004',
    title: 'Home Renovation - Kitchen & Bathroom',
    description: 'Homeowner in Hazyview wants to renovate kitchen (15m²) and master bathroom (10m²). Want modern, luxury finishes. Supply materials required. Timeline flexible but prefer before April.',
    category: Category.HomeConstructionAndTrades,
    subcategory: 'HOME RENOVATION & INTERIOR DESIGN',
    area: 'Hazyview',
    budget: { min: 40000, max: 80000 },
    timeline: '6-8 weeks',
    requirements: [
      'Licensed contractor with insurance',
      'Project manager assigned',
      'Detailed timeline & milestones',
      'Quality materials (no cheap finishes)',
      'Daily cleanup expected',
      'Warranty on workmanship',
      'References from similar projects'
    ],
    userId: 'user_homeowner_001',
    status: RFQStatus.Published,
    createdDate: '2026-01-19',
    updatedDate: '2026-01-22',
    urgency: 'Medium',
    contactPreference: 'Email',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
  },
  {
    id: 'rfq_005',
    title: 'Digital Marketing Campaign - Q1 2026',
    description: 'E-commerce business seeking comprehensive digital marketing campaign. Focus on Google Ads, Facebook/Instagram ads, and content marketing. Target: increase online sales by 30%.',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'DIGITAL MARKETING AGENCIES',
    area: 'Nelspruit',
    budget: { min: 8000, max: 20000 },
    timeline: '3 months (Jan-Mar 2026)',
    requirements: [
      'Google Ads & Facebook Ads expertise',
      'Content creation (blogs, graphics)',
      'Monthly performance reports',
      'A/B testing & optimization',
      'Social media management',
      'Conversion tracking setup',
      'Competitive analysis included'
    ],
    userId: 'user_ecommerce_001',
    status: RFQStatus.Published,
    createdDate: '2026-01-21',
    updatedDate: '2026-01-22',
    urgency: 'High',
    contactPreference: 'InApp',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-adf4e2a946e8?w=400&h=300&fit=crop'
  },
  {
    id: 'rfq_006',
    title: 'Executive Photography - Corporate Headshots',
    description: 'Need professional headshots for 15 company executives. High-resolution, suitable for LinkedIn & print materials. Prefer studio setup with backdrop options.',
    category: Category.DigitalMediaAndTechnology,
    subcategory: 'PHOTOGRAPHY & VIDEOGRAPHY',
    area: 'Mbombela',
    budget: { min: 2500, max: 5000 },
    timeline: 'By February 5, 2026',
    requirements: [
      'Professional photography studio',
      'Natural & studio lighting options',
      'Hair & makeup artist included',
      'Digital copies + USB delivery',
      'Retouching included',
      'Print-ready files (300 DPI)',
      'Social media optimized versions'
    ],
    userId: 'user_corp_hr_001',
    status: RFQStatus.Published,
    createdDate: '2026-01-22',
    updatedDate: '2026-01-22',
    urgency: 'Medium',
    contactPreference: 'Email',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  },
  {
    id: 'rfq_007',
    title: 'Vehicle Fleet Maintenance Contract',
    description: 'Logistics company with 25-vehicle fleet seeking annual maintenance contract. Vehicles: 20 light trucks + 5 heavy-duty. Need preventative maintenance + breakdown assistance.',
    category: Category.Automotive,
    subcategory: 'DEALERSHIPS & SERVICE CENTERS',
    area: 'Nelspruit',
    budget: { min: 15000, max: 30000 },
    timeline: 'Annual contract starting February 1',
    requirements: [
      'Breakdown assistance 24/7',
      'Scheduled maintenance program',
      'Spare parts discount (20%+)',
      'Monthly maintenance reports',
      'Roadside assistance included',
      'Vehicle tracking integration',
      'Workshop reliability score 95%+'
    ],
    userId: 'user_logistics_001',
    status: RFQStatus.Published,
    createdDate: '2026-01-20',
    updatedDate: '2026-01-22',
    urgency: 'High',
    contactPreference: 'Phone',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop'
  }
];

// QUOTE RESPONSES from businesses
export const quoteResponses: QuoteResponse[] = [
  {
    id: 'quote_001',
    rfqId: 'rfq_002',
    businessId: 'gp_001', // Dr. Mkhize (repurposed for this example)
    businessName: 'Dr. Thabo Mkhize Family Medicine',
    quoteAmount: 12000,
    timeline: '3 weeks',
    notes: 'We offer end-to-end web development with modern stack (React, Node.js). Includes SEO optimization, mobile-responsive design, and 3 months of post-launch support. Can start immediately.',
    status: 'Pending',
    submittedDate: '2026-01-21',
    validUntil: '2026-02-04',
    deliverables: [
      'Custom responsive website design',
      'E-commerce functionality',
      'Admin dashboard CMS',
      'SEO optimization',
      'Performance testing',
      'Deployment & hosting setup',
      '3 months maintenance support'
    ]
  },
  {
    id: 'quote_002',
    rfqId: 'rfq_002',
    businessId: 'gp_002',
    businessName: 'Mbombela Medical Centre',
    quoteAmount: 14500,
    timeline: '2.5 weeks',
    notes: 'Full-stack development with advanced features. Includes unlimited revisions during development, performance optimization, and 6 months of free support. Premium option with dedicated project manager.',
    status: 'Pending',
    submittedDate: '2026-01-22',
    validUntil: '2026-02-05',
    deliverables: [
      'Responsive website design',
      'Payment gateway (Payfast, Stripe)',
      'Product inventory management',
      'Customer accounts & order history',
      'SEO & speed optimization',
      'Security audit',
      '6 months technical support'
    ]
  },
  {
    id: 'quote_003',
    rfqId: 'rfq_001',
    businessId: 'gp_001',
    businessName: 'Dr. Thabo Mkhize Family Medicine',
    quoteAmount: 5500,
    timeline: '2 weeks',
    notes: 'Our facility offers complete health screening packages. We have experienced medical professionals, ISO 9001 certification, and can handle large groups. Can accommodate 50 employees with flexible scheduling.',
    status: 'Pending',
    submittedDate: '2026-01-21',
    validUntil: '2026-02-07',
    deliverables: [
      'Full health screening packages',
      'Blood work & analysis',
      'Vital signs monitoring',
      'Health reports per employee',
      'Personalized health recommendations',
      'Follow-up consultation option'
    ]
  },
  {
    id: 'quote_004',
    rfqId: 'rfq_001',
    businessId: 'gp_002',
    businessName: 'Mbombela Medical Centre',
    quoteAmount: 6200,
    timeline: '1 week',
    notes: 'We specialize in corporate wellness programs. Fast turnaround, same-day blood results, comprehensive health assessments. Can organize multiple sessions if needed.',
    status: 'Accepted',
    submittedDate: '2026-01-20',
    validUntil: '2026-02-03',
    deliverables: [
      'Corporate health screening',
      'Individual health reports',
      'Group statistics summary',
      'Wellness recommendations',
      'Follow-up consultations available',
      'Flexible scheduling options'
    ]
  }
];
