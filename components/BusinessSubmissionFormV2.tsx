import React, { useState, useEffect } from 'react';
import { ChevronLeft, Upload, Check, Sparkles, FileText, Shield, Plus, Lightbulb, AlertCircle, Eye, Zap, Target } from 'lucide-react';
import { Category } from '../types';

interface BusinessSubmissionFormV2Props {
  onClose: () => void;
  onNavigate?: (view: string) => void;
}

type Step = 'info' | 'media' | 'services' | 'package' | 'submit';

// ===== CATEGORY-SPECIFIC CONFIGURATION =====
const CATEGORY_CONFIG: Record<string, {
  label: string;
  color: string;
  icon: string;
  requiresRegistration: boolean;
  requiredFields: string[];
  optionalDocuments: string[];
  specificFields: Array<{name: string; label: string; type: string; placeholder: string}>;
}> = {
  'FOOD & HOSPITALITY': {
    label: 'Food & Hospitality',
    color: '#FF6B35',
    icon: '🍽️',
    requiresRegistration: true,
    requiredFields: ['businessName', 'location', 'operatingHours', 'cuisine', 'seatingCapacity'],
    optionalDocuments: ['Health Certificate', 'Liquor License', 'Catering Permit'],
    specificFields: [
      { name: 'cuisine', label: 'Cuisine Type(s)', type: 'text', placeholder: 'e.g., Italian, Fusion, Traditional African' },
      { name: 'seatingCapacity', label: 'Seating Capacity', type: 'number', placeholder: 'Number of seats' },
      { name: 'diningType', label: 'Dining Experience', type: 'select', placeholder: 'Fine Dining, Casual, Quick Bites' }
    ]
  },
  'BEAUTY, WELLNESS & PERSONAL CARE': {
    label: 'Beauty & Personal Care',
    color: '#E91E63',
    icon: '💅',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours', 'serviceTypes'],
    optionalDocuments: ['Health & Safety Certificate', 'Product Certifications'],
    specificFields: [
      { name: 'serviceTypes', label: 'Services Offered', type: 'text', placeholder: 'e.g., Hair Styling, Manicure, Facials, Massage' },
      { name: 'staffCount', label: 'Number of Staff', type: 'number', placeholder: 'How many stylists/therapists?' },
      { name: 'productLines', label: 'Product Brands Used', type: 'text', placeholder: 'e.g., Schwarzkopf, OPI, Dermalogica' }
    ]
  },
  'REAL ESTATE & PROPERTY': {
    label: 'Real Estate',
    color: '#1976D2',
    icon: '🏠',
    requiresRegistration: true,
    requiredFields: ['businessName', 'location', 'operatingHours', 'propertyTypes', 'specialization'],
    optionalDocuments: ['EAAB License', 'Professional Indemnity Insurance', 'Company Certification'],
    specificFields: [
      { name: 'propertyTypes', label: 'Property Types Handled', type: 'text', placeholder: 'e.g., Residential, Commercial, Land, Rentals' },
      { name: 'specialization', label: 'Market Specialization', type: 'text', placeholder: 'e.g., Luxury Homes, Budget Properties, Commercial' },
      { name: 'areasCovered', label: 'Areas Covered', type: 'text', placeholder: 'e.g., Nelspruit, Hazyview, Mbombela' }
    ]
  },
  'AUTOMOTIVE': {
    label: 'Automotive',
    color: '#FF5722',
    icon: '🚗',
    requiresRegistration: true,
    requiredFields: ['businessName', 'location', 'operatingHours', 'vehicleTypes', 'services'],
    optionalDocuments: ['Motor Dealership License', 'Roadworthy Test Approval', 'Insurance License'],
    specificFields: [
      { name: 'vehicleTypes', label: 'Vehicle Types', type: 'text', placeholder: 'e.g., Sedans, SUVs, Bakkies, Luxury Vehicles' },
      { name: 'vehicleCondition', label: 'Condition of Vehicles', type: 'select', placeholder: 'New, Pre-owned, Both' },
      { name: 'services', label: 'Services Offered', type: 'text', placeholder: 'e.g., Sales, Service, Repairs, Rentals, Financing' },
      { name: 'vehicleCount', label: 'Current Inventory', type: 'number', placeholder: 'Number of vehicles available' }
    ]
  },
  'LEGAL & ADVISORY': {
    label: 'Legal Services',
    color: '#8B4513',
    icon: '⚖️',
    requiresRegistration: true,
    requiredFields: ['businessName', 'location', 'operatingHours', 'specializations', 'qualifications'],
    optionalDocuments: ['Law Society Registration', 'Practice License', 'Professional Insurance'],
    specificFields: [
      { name: 'specializations', label: 'Legal Specializations', type: 'text', placeholder: 'e.g., Corporate, Real Estate, Criminal, Family Law' },
      { name: 'qualifications', label: 'Qualifications', type: 'text', placeholder: 'e.g., B.A. (Law), LLB, Admitted Attorney' },
      { name: 'yearsExperience', label: 'Years of Experience', type: 'number', placeholder: 'Years practicing' },
      { name: 'caseTypes', label: 'Case Types Handled', type: 'text', placeholder: 'e.g., Litigation, Consultation, Document Drafting' }
    ]
  },
  'TOURISM, TRAVEL & STAYS': {
    label: 'Tourism & Travel',
    color: '#4CAF50',
    icon: '✈️',
    requiresRegistration: true,
    requiredFields: ['businessName', 'location', 'operatingHours', 'accommodationType', 'amenitiesOffered'],
    optionalDocuments: ['Tourism Board Registration', 'Health & Safety Certificate', 'Star Grading'],
    specificFields: [
      { name: 'accommodationType', label: 'Type of Accommodation', type: 'text', placeholder: 'e.g., Lodge, Guesthouse, Safari Camp, Resort' },
      { name: 'roomCount', label: 'Number of Rooms/Units', type: 'number', placeholder: 'Total capacity' },
      { name: 'amenitiesOffered', label: 'Key Amenities', type: 'text', placeholder: 'e.g., Pool, Restaurant, Spa, Wi-Fi, Game Drives' },
      { name: 'attractions', label: 'Nearby Attractions', type: 'text', placeholder: 'e.g., Kruger National Park, Canyon, Waterfalls' }
    ]
  },
  'HEALTH & MEDICAL': {
    label: 'Health & Medical',
    color: '#E53935',
    icon: '🏥',
    requiresRegistration: true,
    requiredFields: ['businessName', 'location', 'operatingHours', 'serviceTypes', 'qualifications'],
    optionalDocuments: ['Medical License', 'Health Registration', 'Insurance Accreditation'],
    specificFields: [
      { name: 'serviceTypes', label: 'Medical Services', type: 'text', placeholder: 'e.g., General Practice, Dentistry, Pharmacy, Physio' },
      { name: 'qualifications', label: 'Practitioner Qualifications', type: 'text', placeholder: 'e.g., HPCSA Registered, Degree in Medicine' },
      { name: 'specializations', label: 'Specializations', type: 'text', placeholder: 'e.g., Dental Implants, Orthodontics, Root Canals' },
      { name: 'emergencyAvailable', label: 'Emergency Services', type: 'select', placeholder: 'Yes, No' }
    ]
  },
  'SHOPPING & RETAIL': {
    label: 'Retail',
    color: '#7B1FA2',
    icon: '🛍️',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours', 'productCategories'],
    optionalDocuments: ['Trading License', 'Stock Certificate'],
    specificFields: [
      { name: 'productCategories', label: 'Product Categories', type: 'text', placeholder: 'e.g., Clothing, Electronics, Groceries, Home Goods' },
      { name: 'brands', label: 'Major Brands Stocked', type: 'text', placeholder: 'e.g., Nike, Samsung, Nestlé' },
      { name: 'storeType', label: 'Store Type', type: 'select', placeholder: 'Boutique, Supermarket, General Store' }
    ]
  },
  'EDUCATION & SCHOOLS': {
    label: 'Education',
    color: '#0277BD',
    icon: '📚',
    requiresRegistration: true,
    requiredFields: ['businessName', 'location', 'operatingHours', 'educationLevel', 'subjects'],
    optionalDocuments: ['Education Department Registration', 'Teacher Qualifications', 'Curriculum Plan'],
    specificFields: [
      { name: 'educationLevel', label: 'Education Levels', type: 'text', placeholder: 'e.g., Pre-school, High School, University, Training' },
      { name: 'subjects', label: 'Subjects/Programs Offered', type: 'text', placeholder: 'e.g., Mathematics, Languages, STEM, Business' },
      { name: 'studentCapacity', label: 'Student Capacity', type: 'number', placeholder: 'Maximum number of students' }
    ]
  },
  'TRANSPORT, CHAUFFEUR & FLEET SERVICES': {
    label: 'Transport Services',
    color: '#FF6F00',
    icon: '🚌',
    requiresRegistration: true,
    requiredFields: ['businessName', 'location', 'operatingHours', 'vehicleTypes', 'routesCovered'],
    optionalDocuments: ['Operating License', 'Fleet Insurance', 'Safety Certificate'],
    specificFields: [
      { name: 'vehicleTypes', label: 'Vehicle Types', type: 'text', placeholder: 'e.g., Minibus, Sedan, Truck, Coach' },
      { name: 'fleetSize', label: 'Fleet Size', type: 'number', placeholder: 'Number of vehicles' },
      { name: 'routesCovered', label: 'Routes/Areas Covered', type: 'text', placeholder: 'e.g., Nelspruit to Hazyview, Long Distance' }
    ]
  },
  'DIGITAL, MEDIA & TECHNOLOGY': {
    label: 'Digital & Tech',
    color: '#00BCD4',
    icon: '💻',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'serviceTypes'],
    optionalDocuments: ['Portfolio', 'Client References'],
    specificFields: [
      { name: 'serviceTypes', label: 'Services Offered', type: 'text', placeholder: 'e.g., Web Design, App Development, Social Media, SEO' },
      { name: 'expertise', label: 'Areas of Expertise', type: 'text', placeholder: 'e.g., WordPress, React, Python, AWS' },
      { name: 'portfolioLink', label: 'Portfolio/Website URL', type: 'text', placeholder: 'https://yourportfolio.com' }
    ]
  },
  'BUSINESS GROWTH & CONSULTING': {
    label: 'Consulting',
    color: '#4CAF50',
    icon: '📊',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'consultationTypes', 'expertise'],
    optionalDocuments: ['Certifications', 'Case Studies'],
    specificFields: [
      { name: 'consultationTypes', label: 'Consultation Types', type: 'text', placeholder: 'e.g., Business Strategy, Marketing, Financial Planning' },
      { name: 'expertise', label: 'Industry Expertise', type: 'text', placeholder: 'e.g., SMEs, Startups, Tourism, Retail' },
      { name: 'yearsExperience', label: 'Years of Consulting Experience', type: 'number', placeholder: 'Years' }
    ]
  },
  'LUXURY & LIFESTYLE': {
    label: 'Luxury & Lifestyle',
    color: '#FFD700',
    icon: '👑',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location'],
    optionalDocuments: [],
    specificFields: [
      { name: 'specialization', label: 'Specialization', type: 'text', placeholder: 'e.g., Luxury Concierge, High-End Retail' }
    ]
  },
  'NIGHTLIFE & ENTERTAINMENT': {
    label: 'Nightlife & Entertainment',
    color: '#FF1493',
    icon: '🎉',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Entertainment License', 'Safety Certificate'],
    specificFields: [
      { name: 'venueType', label: 'Venue Type', type: 'text', placeholder: 'e.g., Nightclub, Bar, Lounge, Entertainment Venue' }
    ]
  },
  'FINANCE & MONEY SERVICES': {
    label: 'Finance & Money Services',
    color: '#2E7D32',
    icon: '💰',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Financial License', 'Professional Registration'],
    specificFields: [
      { name: 'services', label: 'Financial Services', type: 'text', placeholder: 'e.g., Banking, Investment, Insurance' }
    ]
  },
  'MANUFACTURING, WHOLESALE & SUPPLIERS': {
    label: 'Manufacturing & Wholesale',
    color: '#455A64',
    icon: '🏭',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Trade License', 'Manufacturing Certificate'],
    specificFields: [
      { name: 'productCategory', label: 'Product Category', type: 'text', placeholder: 'e.g., Textiles, Electronics, Food Products' }
    ]
  },
  'FAMILY, KIDS & COMMUNITY': {
    label: 'Family, Kids & Community',
    color: '#F57C00',
    icon: '👨‍👩‍👧‍👦',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Safety Certification', 'Child Care License'],
    specificFields: [
      { name: 'services', label: 'Services Offered', type: 'text', placeholder: 'e.g., Childcare, Education, Community Programs' }
    ]
  },
  'GOVERNMENT & PUBLIC SERVICES': {
    label: 'Government & Public Services',
    color: '#1565C0',
    icon: '🏛️',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: [],
    specificFields: [
      { name: 'serviceType', label: 'Service Type', type: 'text', placeholder: 'e.g., Public Services, Government Offices' }
    ]
  },
  'EVENTS, EXPERIENCES & OCCASIONS': {
    label: 'Events, Experiences & Occasions',
    color: '#D32F2F',
    icon: '🎊',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location'],
    optionalDocuments: ['Event License', 'Insurance'],
    specificFields: [
      { name: 'eventType', label: 'Event Types', type: 'text', placeholder: 'e.g., Weddings, Corporate Events, Parties' }
    ]
  },
  'SPORTS, FITNESS & RECREATION': {
    label: 'Sports, Fitness & Recreation',
    color: '#FF6F00',
    icon: '⚽',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Facility Safety Certificate'],
    specificFields: [
      { name: 'sports', label: 'Sports/Activities', type: 'text', placeholder: 'e.g., Gym, Tennis, Swimming, Yoga' }
    ]
  },
  'PETS, VETERINARY & ANIMAL CARE': {
    label: 'Pets & Veterinary Care',
    color: '#D4A574',
    icon: '🐕',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Veterinary License', 'Animal Care Certificate'],
    specificFields: [
      { name: 'services', label: 'Services', type: 'text', placeholder: 'e.g., Veterinary Care, Grooming, Pet Boarding' }
    ]
  },
  'SECURITY, PROTECTION & RESPONSE': {
    label: 'Security & Protection',
    color: '#263238',
    icon: '🛡️',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Security License', 'Safety Certification'],
    specificFields: [
      { name: 'services', label: 'Security Services', type: 'text', placeholder: 'e.g., Security Guards, Surveillance, Alarms' }
    ]
  },
  'ENERGY, WATER & SUSTAINABILITY': {
    label: 'Energy & Sustainability',
    color: '#00695C',
    icon: '♻️',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location'],
    optionalDocuments: ['Environmental Certification'],
    specificFields: [
      { name: 'services', label: 'Services', type: 'text', placeholder: 'e.g., Solar Energy, Water Treatment, Waste Management' }
    ]
  },
  'CREATOR ECONOMY & TALENT': {
    label: 'Creator Economy & Talent',
    color: '#E91E63',
    icon: '🎭',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location'],
    optionalDocuments: [],
    specificFields: [
      { name: 'talentType', label: 'Talent Type', type: 'text', placeholder: 'e.g., Content Creator, Influencer, Artist' }
    ]
  },
  'RECRUITMENT & STAFFING': {
    label: 'Recruitment & Staffing',
    color: '#424242',
    icon: '👔',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Recruitment License'],
    specificFields: [
      { name: 'specialization', label: 'Specialization', type: 'text', placeholder: 'e.g., Executive Search, IT Recruitment, General Staffing' }
    ]
  },
  'DOMESTIC & PERSONAL SERVICES': {
    label: 'Domestic & Personal Services',
    color: '#7CB342',
    icon: '🧹',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location'],
    optionalDocuments: [],
    specificFields: [
      { name: 'services', label: 'Services', type: 'text', placeholder: 'e.g., Cleaning, Laundry, Personal Assistance' }
    ]
  },
  'CONVENIENCE & DAILY NEEDS': {
    label: 'Convenience & Daily Needs',
    color: '#0277BD',
    icon: '🏪',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: [],
    specificFields: [
      { name: 'productType', label: 'Product Type', type: 'text', placeholder: 'e.g., Groceries, Convenience Items, Pharmacy' }
    ]
  },
  'WOMEN, HEALTH & MATERNAL': {
    label: 'Women, Health & Maternal',
    color: '#C2185B',
    icon: '👩‍⚕️',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location', 'operatingHours'],
    optionalDocuments: ['Medical Registration', 'Health Certification'],
    specificFields: [
      { name: 'services', label: 'Services', type: 'text', placeholder: 'e.g., Maternal Care, Gynecology, Women\'s Health' }
    ]
  },
  'JOBS & CAREERS': {
    label: 'Jobs & Careers',
    color: '#1976D2',
    icon: '💼',
    requiresRegistration: false,
    requiredFields: ['businessName', 'location'],
    optionalDocuments: [],
    specificFields: [
      { name: 'jobType', label: 'Job Type', type: 'text', placeholder: 'e.g., Employment Agency, Career Counseling' }
    ]
  }
};

// SERVICES TEMPLATE BY CATEGORY
const SERVICE_TEMPLATES: Record<string, string[]> = {
  'FOOD & HOSPITALITY': [
    'Dine-in Service',
    'Takeaway Orders',
    'Catering & Events',
    'Private Dining',
    'Delivery Service',
    'Happy Hour Specials',
    'Reservation System',
    'Wine Pairing'
  ],
  'BEAUTY, WELLNESS & PERSONAL CARE': [
    'Hair Styling',
    'Hair Coloring',
    'Hair Treatment',
    'Manicure & Pedicure',
    'Facial Treatments',
    'Body Massage',
    'Waxing Service',
    'Makeup Application',
    'Bridal Packages'
  ],
  'REAL ESTATE & PROPERTY': [
    'Property Sales',
    'Property Rental',
    'Property Valuation',
    'Investment Advisory',
    'Lease Management',
    'Property Inspection',
    'Market Analysis',
    'Virtual Tours'
  ],
  'AUTOMOTIVE': [
    'Vehicle Sales',
    'Vehicle Repairs',
    'Maintenance Service',
    'Vehicle Rentals',
    'Financing Options',
    'Trade-in Accepted',
    'Roadworthy Testing',
    'Customization Service'
  ],
  'LEGAL & ADVISORY': [
    'Legal Consultation',
    'Document Drafting',
    'Contract Review',
    'Business Registration',
    'Litigation Support',
    'Property Conveyancing',
    'Family Law',
    'Corporate Advisory'
  ],
  'TOURISM, TRAVEL & STAYS': [
    'Room Booking',
    'Group Packages',
    'Adventure Tours',
    'Meal Plans',
    'Transport Services',
    'Activity Bookings',
    'Corporate Events',
    'Wedding Venue'
  ],
  'HEALTH & MEDICAL': [
    'Medical Consultation',
    'Emergency Services',
    'Pharmacy Dispensary',
    'Dental Services',
    'Surgical Procedures',
    'Health Screening',
    'Home Visits',
    'Prescription Refills'
  ],
  'SHOPPING & RETAIL': [
    'In-store Shopping',
    'Online Shopping',
    'Delivery Service',
    'Bulk Orders',
    'Gift Wrapping',
    'Loyalty Program',
    'Price Matching',
    'Custom Orders'
  ],
  'EDUCATION & SCHOOLS': [
    'Classroom Instruction',
    'Tutoring Sessions',
    'Online Classes',
    'Exam Preparation',
    'Workshop Training',
    'Certificate Programs',
    'Mentorship',
    'Career Counseling'
  ],
  'TRANSPORT, CHAUFFEUR & FLEET SERVICES': [
    'Regular Routes',
    'Charter Services',
    'Airport Transfers',
    'Shuttle Service',
    'Long Distance Travel',
    'Corporate Transport',
    'VIP Chauffeur',
    'Group Bookings'
  ],
  'DIGITAL, MEDIA & TECHNOLOGY': [
    'Website Development',
    'App Development',
    'Graphic Design',
    'Social Media Management',
    'SEO & SEM',
    'Content Creation',
    'IT Support',
    'E-commerce Solutions'
  ],
  'BUSINESS GROWTH & CONSULTING': [
    'Business Planning',
    'Financial Advisory',
    'Marketing Strategy',
    'Human Resources',
    'Operational Efficiency',
    'Digital Transformation',
    'Market Research',
    'Training & Development'
  ]
};

// PACKAGE PRICING WITH DURATION
const PACKAGE_TIERS = [
  {
    id: 'essential',
    name: 'ESSENTIAL',
    color: 'from-blue-600 to-blue-700',
    icon: '⭐',
    duration: '6 MONTHS ONLY',
    price: 'R 799',
    priceNum: 799,
    features: [
      '✓ Logo & Business Details',
      '✓ Photo Gallery',
      '✓ Contact Information',
      '✓ Opening Hours Display',
      '✓ Reviews & Ratings System',
      '✓ Basic Analytics',
      '✓ Single Phone Number'
    ]
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    color: 'from-yellow-600 to-yellow-700',
    icon: '💎',
    duration: '12 MONTHS',
    price: 'R 1,299',
    priceNum: 1299,
    features: [
      '✓ Everything in Essential',
      '✓ Premium Profile Badge',
      '✓ Up to 50 High-Res Photos',
      '✓ Video Showcase (30 sec)',
      '✓ Multiple Phone Numbers',
      '✓ Advanced Analytics',
      '✓ Customer Messaging',
      '✓ Featured Listing (Monthly)'
    ]
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    color: 'from-purple-600 to-purple-700',
    icon: '👑',
    duration: '12 MONTHS',
    price: 'R 1,999',
    priceNum: 1999,
    features: [
      '✓ Everything in Professional',
      '✓ Premium Purple Badge',
      '✓ Unlimited Photos & Videos',
      '✓ Virtual Tours Support',
      '✓ Priority Customer Support',
      '✓ Custom Business Website Link',
      '✓ Social Media Integration',
      '✓ Featured (Weekly)',
      '✓ Advanced Marketing Tools'
    ]
  }
];

// Helper function for AI suggestions
const getAISuggestions = (field: string, category: string): string => {
  const suggestions: Record<string, Record<string, string>> = {
    'description': {
      'FOOD & HOSPITALITY': '💡 Mention: cuisine specialty, signature dish, dining atmosphere, chef background, price range',
      'BEAUTY, WELLNESS & PERSONAL CARE': '💡 Highlight: experience level, product brands used, specialty treatments, therapist credentials',
      'REAL ESTATE & PROPERTY': '💡 Include: years in business, property types, market coverage, success stories, certifications',
      'AUTOMOTIVE': '💡 Showcase: inventory quality, after-sales service, financing options, warranty details',
      'LEGAL & ADVISORY': '💡 Emphasize: legal expertise, experience years, specializations, success cases, bar association membership',
      'TOURISM, TRAVEL & STAYS': '💡 Highlight: unique experiences, facilities, nearby attractions, group capacity, booking ease'
    },
    'services': {
      'FOOD & HOSPITALITY': '💡 List: dine-in, takeout, catering, reservations, delivery, special diets accommodated',
      'BEAUTY, WELLNESS & PERSONAL CARE': '💡 Include: all treatments offered, product lines, appointment flexibility, group bookings',
      'REAL ESTATE & PROPERTY': '💡 Specify: sales, rentals, valuations, property management, investment advisory',
      'AUTOMOTIVE': '💡 Detail: sales, service, repairs, rentals, financing, trade-in, roadworthy testing',
      'LEGAL & ADVISORY': '💡 Define: consultation, document drafting, litigation, corporate, property conveyancing',
      'TOURISM, TRAVEL & STAYS': '💡 Include: accommodation types, activities, meals, transfers, group packages'
    }
  };

  return suggestions[field]?.[category] || '💡 Be descriptive and specific about your offerings.';
};

export default function BusinessSubmissionFormV2({ onClose, onNavigate }: BusinessSubmissionFormV2Props) {
  const DRAFT_KEY = 'businessSubmissionDraft';
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showAIHelp, setShowAIHelp] = useState<string | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // STEP 1: BUSINESS INFO
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  
  // STEP 2: MEDIA & DOCUMENTS
  const [images, setImages] = useState<{name: string; size: string}[]>([]);
  const [businessRegistration, setBusinessRegistration] = useState<{name: string; size: string} | null>(null);
  const [ownerIdPassport, setOwnerIdPassport] = useState<{name: string; size: string} | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<{name: string; size: string}[]>([]);

  // STEP 3: SERVICES
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customServices, setCustomServices] = useState('');
  const [operatingHours, setOperatingHours] = useState({
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '09:00', close: '14:00' },
    sunday: { open: 'Closed', close: 'Closed' }
  });
  const [categorySpecificData, setCategorySpecificData] = useState<Record<string, string>>({});

  // STEP 4: PACKAGE
  const [selectedPackage, setSelectedPackage] = useState<'essential' | 'professional' | 'platinum'>('professional');

  // Auto-save to localStorage on any form change
  React.useEffect(() => {
    const formData = {
      businessName, category, location, address, contactEmail, contactPhone, description, websiteUrl,
      images, businessRegistration, ownerIdPassport, additionalDocs,
      selectedServices, customServices, operatingHours, categorySpecificData, selectedPackage, currentStep
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [businessName, category, location, address, contactEmail, contactPhone, description, websiteUrl, 
      images, businessRegistration, ownerIdPassport, additionalDocs, selectedServices, customServices, 
      operatingHours, categorySpecificData, selectedPackage, currentStep]);

  // Load draft on mount
  React.useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      setHasDraft(true);
      try {
        const data = JSON.parse(draft);
        setBusinessName(data.businessName || '');
        setCategory(data.category || '');
        setLocation(data.location || '');
        setAddress(data.address || '');
        setContactEmail(data.contactEmail || '');
        setContactPhone(data.contactPhone || '');
        setDescription(data.description || '');
        setWebsiteUrl(data.websiteUrl || '');
      } catch (err) {
        console.error('Failed to load draft:', err);
      }
    }
  }, []);

  // CATEGORY CONFIGURATION
  const currentConfig = CATEGORY_CONFIG[category] || CATEGORY_CONFIG['FOOD & HOSPITALITY'];
  const categoryServices = SERVICE_TEMPLATES[category] || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadError(null);
      const maxSize = 10 * 1024 * 1024; // 10MB
      Array.from(files).forEach((file: File) => {
        if (file.size > maxSize) {
          setUploadError(`${file.name} exceeds 10MB limit. File kept - please try again.`);
          return;
        }
        try {
          setImages(prev => [...prev, { name: file.name, size: `${(file.size / 1024).toFixed(2)} KB` }]);
        } catch (err) {
          setUploadError(`Failed to upload ${file.name}. Your form data has been preserved. Please try again.`);
          console.error('Upload error:', err);
        }
      });
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: 'registration' | 'ownerId' | 'additional') => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadError(null);
      const maxSize = 50 * 1024 * 1024; // 50MB for documents
      if ((file as File).size > maxSize) {
        setUploadError(`${(file as File).name} exceeds 50MB limit. Your form data has been preserved.`);
        return;
      }
      try {
        const fileInfo = { name: (file as File).name, size: `${((file as File).size / 1024).toFixed(2)} KB` };
        if (docType === 'registration') setBusinessRegistration(fileInfo);
        else if (docType === 'ownerId') setOwnerIdPassport(fileInfo);
        else setAdditionalDocs(prev => [...prev, fileInfo]);
      } catch (err) {
        setUploadError(`Failed to upload ${(file as File).name}. Your form data has been preserved. Please try again.`);
        console.error('Document upload error:', err);
      }
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 'info':
        if (!businessName || !category || !location || !contactPhone) {
          setError('Please complete: Business Name, Category, Location, Phone');
          return false;
        }
        break;
      case 'media':
        if (images.length === 0) {
          setError('Please upload at least one business image');
          return false;
        }
        if (currentConfig.requiresRegistration && !businessRegistration) {
          setError('Business Registration Certificate is required for this category');
          return false;
        }
        break;
      case 'services':
        if (selectedServices.length === 0) {
          setError('Please select at least one service');
          return false;
        }
        break;
      case 'package':
        if (!selectedPackage) {
          setError('Please select a package tier');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const formData = {
        businessName,
        category,
        location,
        address,
        contactEmail,
        contactPhone,
        description,
        websiteUrl,
        images,
        businessRegistration,
        ownerIdPassport,
        additionalDocs,
        selectedServices,
        customServices,
        operatingHours,
        selectedPackage,
        categorySpecificData,
        submittedAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit business');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        if (onNavigate) onNavigate('home');
      }, 3000);
    } catch (err) {
      setError(`Submission failed: ${err instanceof Error ? err.message : 'Network error. Please check backend is running on port 5000'}`);
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      const steps: Step[] = ['info', 'media', 'services', 'package', 'submit'];
      const nextIdx = steps.indexOf(currentStep) + 1;
      if (nextIdx < steps.length) {
        setCurrentStep(steps[nextIdx]);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrevious = () => {
    const steps: Step[] = ['info', 'media', 'services', 'package', 'submit'];
    const prevIdx = steps.indexOf(currentStep) - 1;
    if (prevIdx >= 0) {
      setCurrentStep(steps[prevIdx]);
      window.scrollTo(0, 0);
    }
  };

  const progressPercent = {
    info: 20,
    media: 40,
    services: 60,
    package: 80,
    submit: 100
  }[currentStep];

  // ===== SUCCESS SCREEN =====
  if (submitSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-black rounded-2xl p-6 max-w-md text-center border border-yellow-600/50 shadow-2xl">
          <div className="text-5xl mb-3 animate-bounce">✓</div>
          <h2 className="text-2xl font-bold text-white mb-1.5">LISTING SUBMITTED!</h2>
          <p className="text-white/80 mb-4 text-sm">Your business listing has been received successfully.</p>
          
          {/* VERIFICATION TIMELINE */}
          <div className="space-y-3 text-left bg-white/5 p-4 rounded-lg border border-yellow-600/30 mb-4">
            <h3 className="text-xs font-semibold text-yellow-600 uppercase mb-3">📅 Verification Timeline</h3>
            
            {/* Day 1 */}
            <div className="flex space-x-3 pb-3 border-b border-white/10">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-600/20 border border-green-600">
                  <span className="text-xs text-green-400">✓</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-white">Today</p>
                <p className="text-xs text-gray-400">Listing received & confirmed</p>
              </div>
            </div>

            {/* Day 2-3 */}
            <div className="flex space-x-3 pb-3 border-b border-white/10">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-600/20 border border-yellow-600">
                  <span className="text-xs text-yellow-400">⏳</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-white">Days 2-3</p>
                <p className="text-xs text-gray-400">Documents & details verification</p>
              </div>
            </div>

            {/* Day 4-5 */}
            <div className="flex space-x-3 pb-3 border-b border-white/10">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600/20 border border-blue-600">
                  <span className="text-xs text-blue-400">📧</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-white">Days 4-5</p>
                <p className="text-xs text-gray-400">Payment invoice sent via email</p>
              </div>
            </div>

            {/* Day 6 */}
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-600/20 border border-purple-600">
                  <span className="text-xs text-purple-400">🎉</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-white">Upon Payment</p>
                <p className="text-xs text-gray-400">Listing goes live instantly</p>
              </div>
            </div>
          </div>

          {/* ACTION ITEMS */}
          <div className="bg-white/5 p-3 rounded-lg border border-white/10 mb-4 text-left">
            <p className="text-xs font-semibold text-yellow-600 mb-2">📋 What to expect:</p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>✓ Confirmation email received</li>
              <li>✓ Review ID in email for tracking</li>
              <li>✓ Payment invoice link sent by Day 5</li>
              <li>✓ Live immediately after payment</li>
            </ul>
          </div>

          <p className="text-xs text-gray-500">Auto-closing in 3 seconds...</p>
        </div>
      </div>
    );
  }

  // ===== MAIN FORM =====
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="w-full max-w-2xl bg-black rounded-xl shadow-2xl flex flex-col border border-yellow-600/50">
        
        {/* LUXURY MINIMAL HEADER */}
        <div className="bg-black shadow-lg p-4 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 flex items-center space-x-3">
              <div className="flex-1">
                <h1 className="text-xl font-light text-white capitalize tracking-tight">
                  {currentStep === 'info' && 'Business Details'}
                  {currentStep === 'media' && 'Media & Documents'}
                  {currentStep === 'services' && 'Services & Hours'}
                  {currentStep === 'package' && 'Choose Your Plan'}
                  {currentStep === 'submit' && 'Review & Confirm'}
                </h1>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl transition"
            >
              ×
            </button>
          </div>

          {/* SUBTLE PROGRESS BAR */}
          <div className="space-y-1">
            <div className="w-full bg-white/10 rounded-full h-0.5 overflow-hidden">
              <div
                className="h-full bg-yellow-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/50 font-light">
              <span>Step {['info', 'media', 'services', 'package', 'submit'].indexOf(currentStep) + 1} of 5</span>
              <span>{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black">
          
          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-900/10 text-red-400 p-4 rounded-lg flex items-start space-x-3 border border-red-600/20">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Missing information</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* UPLOAD ERROR MESSAGE */}
          {uploadError && (
            <div className="bg-yellow-900/10 text-yellow-400 p-4 rounded-lg flex items-start space-x-3 border border-yellow-600/20">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Upload Issue</p>
                <p className="text-sm mt-1">{uploadError}</p>
                <button
                  onClick={() => setUploadError(null)}
                  className="text-xs text-yellow-300 underline hover:text-yellow-200 mt-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* DRAFT RECOVERY PROMPT */}
          {hasDraft && currentStep === 'info' && !businessName && (
            <div className="bg-blue-900/20 text-blue-300 p-4 rounded-lg border border-blue-600/30 flex items-start space-x-3">
              <span className="text-lg flex-shrink-0">💾</span>
              <div className="flex-1">
                <p className="text-sm font-semibold">Draft saved!</p>
                <p className="text-xs text-blue-200 mt-1">Your form data was automatically saved. Continue filling it out.</p>
              </div>
            </div>
          )}

          {/* REQUIRED FIELDS CHECKLIST */}
          {currentStep === 'info' && (
            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-200 mb-2">✓ STEP 1 CHECKLIST:</p>
              <div className="space-y-2 text-xs text-blue-100">
                <div className="flex items-center space-x-2">
                  <span className={category ? '✓' : '○'} style={{color: category ? '#22c55e' : '#9ca3af'}}>✓</span>
                  <span>Category selected: <span className="font-bold">{category || 'Not selected'}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span style={{color: businessName ? '#22c55e' : '#9ca3af'}}>✓</span>
                  <span>Business name: <span className="font-bold">{businessName || 'Not entered'}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span style={{color: location ? '#22c55e' : '#9ca3af'}}>✓</span>
                  <span>Location: <span className="font-bold">{location || 'Not entered'}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span style={{color: contactPhone ? '#22c55e' : '#9ca3af'}}>✓</span>
                  <span>Phone: <span className="font-bold">{contactPhone || 'Not entered'}</span></span>
                </div>
              </div>
            </div>
          )}

          {/* ===== STEP 1: BUSINESS INFO ===== */}
          {currentStep === 'info' && (
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="text-sm font-medium text-white mb-2.5 block">Business Type *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black rounded-xl p-3.5 text-white text-sm focus:ring-1 focus:ring-yellow-600 outline-none transition backdrop-blur-sm border border-white/10"
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                >
                  <option value="" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Select a category...</option>
                  {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                    <option key={key} value={key} style={{ backgroundColor: '#000000', color: '#ffffff' }}>{config.label}</option>
                  ))}
                </select>
                {category && (
                  <p className="text-xs text-white/50 mt-2">
                    ✓ {currentConfig.label}
                  </p>
                )}
              </div>

              {category && (
                <>
                  {/* Business Name */}
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="text-sm font-medium text-white">Business Name *</label>
                      <button
                        onClick={() => setShowAIHelp(showAIHelp === 'name' ? null : 'name')}
                        className="text-yellow-600 hover:text-yellow-500 flex items-center space-x-1 text-sm"
                      >
                        <Sparkles size={14} />
                        <span>Suggest</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Enter business name"
                      className="w-full bg-white/5 rounded-xl p-3.5 text-white text-sm focus:ring-1 focus:ring-yellow-600 outline-none transition placeholder-white/30 backdrop-blur-sm"
                    />
                    {showAIHelp === 'name' && (
                      <div className="mt-3 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded text-yellow-100 text-sm">
                        {getAISuggestions('description', category)}
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium text-white mb-2.5 block">Location *</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City or area in Mpumalanga"
                      className="w-full bg-white/5 rounded-xl p-3.5 text-white text-sm focus:ring-1 focus:ring-yellow-600 outline-none transition placeholder-white/30 backdrop-blur-sm"
                    />
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="text-sm font-medium text-white mb-2.5 block">Contact Number *</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+27 13 123 4567"
                      className="w-full bg-white/5 rounded-xl p-3.5 text-white text-sm focus:ring-1 focus:ring-yellow-600 outline-none transition placeholder-white/30 backdrop-blur-sm"
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="text-sm font-medium text-white mb-2.5 block">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="manager@business.co.za"
                      className="w-full bg-white/5 rounded-xl p-3.5 text-white text-sm focus:ring-1 focus:ring-yellow-600 outline-none transition placeholder-white/30 backdrop-blur-sm"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="text-sm font-medium text-white">Your Story *</label>
                      <button
                        onClick={() => setShowAIHelp(showAIHelp === 'desc' ? null : 'desc')}
                        className="text-yellow-600 hover:text-yellow-500 flex items-center space-x-1 text-sm"
                      >
                        <Sparkles size={14} />
                        <span>Suggest</span>
                      </button>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What makes your business unique?"
                      rows={3}
                      className="w-full bg-white/5 rounded-xl p-3.5 text-white text-sm focus:ring-1 focus:ring-yellow-600 outline-none transition placeholder-white/30 resize-none backdrop-blur-sm"
                    />
                    {showAIHelp === 'desc' && (
                      <div className="mt-3 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded text-yellow-100 text-sm">
                        {getAISuggestions('description', category)}
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                    <label className="text-xs font-bold text-white mb-1.5 block uppercase">Street Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="42 Main Street"
                      className="w-full bg-black border border-yellow-600/50 rounded-lg p-2 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-white/40 text-sm"
                    />
                  </div>

                  {/* Website */}
                  <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                    <label className="text-xs font-bold text-white mb-1.5 block uppercase">Website URL</label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-black border border-yellow-600/50 rounded-lg p-2 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-white/40 text-sm"
                    />
                  </div>

                  {/* EMAIL SUPPORT DISCLAIMER */}
                  {category && (
                    <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 flex items-start space-x-3 mt-4">
                      <AlertCircle size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-200">
                        <p className="font-semibold mb-1">Can't find your category?</p>
                        <p>Email us at <a href="mailto:support@lowveldhub.co.za" className="text-yellow-400 hover:underline font-medium">support@lowveldhub.co.za</a> with your details and we'll add them manually!</p>
                      </div>
                    </div>
                  )}

                  {/* READY TO PROCEED MESSAGE */}
                  {category && businessName && location && contactPhone && (
                    <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4 flex items-start space-x-3">
                      <Check size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-green-400">✓ Step 1 Complete!</p>
                        <p className="text-sm text-green-300 mt-1">All required information entered. You can now proceed to Step 2.</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ===== STEP 2: MEDIA & DOCUMENTS ===== */}
          {currentStep === 'media' && (
            <div className="space-y-3">
              {/* Images Upload */}
              <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                <label className="text-xs font-bold text-white mb-2 flex items-center space-x-2 uppercase">
                  <Upload size={14} />
                  <span>Business Photos *</span>
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full"
                />
                {images.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {images.map((img, idx) => (
                      <div key={idx} className="text-xs text-yellow-600/80 flex justify-between p-1.5 bg-white/5 rounded">
                        <span>📷 {img.name}</span>
                        <span className="text-white/60">{img.size}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-yellow-600/80 mt-1">💡 Include storefront, team, products in action</p>
              </div>

              {/* Business Registration - OPTIONAL/REQUIRED BASED ON CATEGORY */}
              {currentConfig.requiresRegistration && (
                <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                  <label className="text-xs font-bold text-white mb-1.5 flex items-center space-x-2 uppercase">
                    <FileText size={14} className="text-yellow-600" />
                    <span>Registration Cert *</span>
                  </label>
                  <p className="text-xs text-white/60 mb-2">CIPC or registration certificate</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleDocumentUpload(e, 'registration')}
                    className="w-full"
                  />
                  {businessRegistration && (
                    <div className="mt-1.5 p-1.5 bg-green-900/20 border border-green-600/30 rounded text-green-400 text-xs flex items-center space-x-2">
                      <Check size={12} />
                      <span>{businessRegistration.name}</span>
                    </div>
                  )}
                </div>
              )}

              {!currentConfig.requiresRegistration && (
                <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                  <label className="text-xs font-bold text-white mb-1.5 flex items-center space-x-2 uppercase">
                    <FileText size={14} className="text-yellow-600" />
                    <span>Registration (Optional)</span>
                  </label>
                  <p className="text-xs text-white/60 mb-2">Not required - helps build trust</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleDocumentUpload(e, 'registration')}
                    className="w-full"
                  />
                  {businessRegistration && (
                    <div className="mt-2 p-2 bg-green-900/20 border border-green-600/30 rounded text-green-400 text-xs flex items-center space-x-2">
                      <Check size={14} />
                      <span>{businessRegistration.name} ({businessRegistration.size})</span>
                    </div>
                  )}
                </div>
              )}

              {/* Owner ID / Passport */}
              <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                <label className="text-xs font-bold text-white mb-1.5 flex items-center space-x-2 uppercase">
                  <Shield size={14} className="text-yellow-600" />
                  <span>Owner ID / Passport</span>
                </label>
                <p className="text-xs text-white/60 mb-2">Valid ID Book, License, or Passport (clear scan)</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleDocumentUpload(e, 'ownerId')}
                  className="w-full"
                />
                {ownerIdPassport && (
                  <div className="mt-1.5 p-1.5 bg-green-900/20 border border-green-600/30 rounded text-green-400 text-xs flex items-center space-x-2">
                    <Check size={12} />
                    <span>{ownerIdPassport.name}</span>
                  </div>
                )}
              </div>

              {/* Additional Documents */}
              <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                <label className="text-xs font-bold text-white mb-1.5 flex items-center space-x-2 uppercase">
                  <Plus size={14} className="text-yellow-600" />
                  <span>Docs (Optional)</span>
                </label>
                <p className="text-xs text-white/60 mb-2">
                  {currentConfig.optionalDocuments.length > 0
                    ? `e.g., ${currentConfig.optionalDocuments.slice(0, 2).join(', ')}`
                    : 'Tax Certificate, License, etc'}
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      Array.from(files).forEach((file) => {
                        handleDocumentUpload(
                          { target: { files: [file] } } as any,
                          'additional'
                        );
                      });
                    }
                  }}
                  className="w-full"
                />
                {additionalDocs.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {additionalDocs.map((doc, idx) => (
                      <div key={idx} className="p-2 bg-green-900/20 border border-green-600/30 rounded text-green-400 text-xs flex items-center space-x-2">
                        <Check size={14} />
                        <span>{doc.name} ({doc.size})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Document Summary */}
              <div className="bg-gray-900 border border-yellow-600/20 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-300 mb-2">📋 DOCUMENT STATUS:</p>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    {images.length > 0 ? <span className="text-green-500">✓</span> : <span className="text-gray-600">○</span>}
                    <span>Images: {images.length} uploaded</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {currentConfig.requiresRegistration && !businessRegistration ? <span className="text-red-500">✗</span> : <span className="text-green-500">✓</span>}
                    <span>Registration: {businessRegistration ? 'Uploaded' : currentConfig.requiresRegistration ? 'REQUIRED' : 'Optional'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {ownerIdPassport ? <span className="text-green-500">✓</span> : <span className="text-gray-600">○</span>}
                    <span>Owner ID: {ownerIdPassport ? 'Uploaded' : 'Optional'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Additional: {additionalDocs.length} uploaded</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== STEP 3: SERVICES & HOURS ===== */}
          {currentStep === 'services' && (
            <div className="space-y-3">
              {/* Service Selection */}
              <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-white uppercase">Services Offered *</label>
                  <button
                    onClick={() => setShowAIHelp(showAIHelp === 'services' ? null : 'services')}
                    className="text-yellow-600 hover:text-yellow-500 flex items-center space-x-1"
                  >
                    <Sparkles size={14} />
                    <span className="text-xs">AI</span>
                  </button>
                </div>

                {showAIHelp === 'services' && (
                  <div className="mb-2 p-2 bg-yellow-600/10 border border-yellow-600/30 rounded text-yellow-100 text-xs">
                    {getAISuggestions('services', category)}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2">
                  {categoryServices.map((service) => (
                    <label key={service} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition border border-yellow-600/50">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="w-4 h-4 accent-yellow-600"
                      />
                      <span className="text-sm text-white">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Services */}
              <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                <label className="text-xs font-bold text-white mb-1.5 block uppercase">Additional Services</label>
                <textarea
                  value={customServices}
                  onChange={(e) => setCustomServices(e.target.value)}
                  placeholder="List any services not shown above..."
                  rows={2}
                  className="w-full bg-black border border-yellow-600/50 rounded-lg p-2 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-white/40 resize-none text-sm"
                />
              </div>

              {/* Operating Hours */}
              <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                <label className="text-xs font-bold text-white mb-2 block uppercase">Operating Hours</label>
                <div className="space-y-2">
                  {Object.entries(operatingHours).map(([day, hours]) => {
                    const hoursData = hours as any;
                    return (
                    <div key={day} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg border border-yellow-600/50">
                      <span className="text-xs font-medium text-white w-20 capitalize">{day}</span>
                      {typeof hours === 'string' ? (
                        <span className="text-xs text-white/70 flex-1">{hours}</span>
                      ) : (
                        <>
                          <input
                            type="time"
                            value={hoursData.open || '09:00'}
                            onChange={(e) =>
                              setOperatingHours(prev => ({
                                ...prev,
                                [day]: { ...prev[day as keyof typeof prev] as any, open: e.target.value }
                              }))
                            }
                            className="w-20 bg-black border border-yellow-600/50 rounded px-1.5 py-1 text-xs text-white"
                          />
                          <span className="text-white/40">—</span>
                          <input
                            type="time"
                            value={hoursData.close || '17:00'}
                            onChange={(e) =>
                              setOperatingHours(prev => ({
                                ...prev,
                                [day]: { ...prev[day as keyof typeof prev] as any, close: e.target.value }
                              }))
                            }
                            className="w-20 bg-black border border-yellow-600/50 rounded px-1.5 py-1 text-xs text-white"
                          />
                        </>
                      )}
                    </div>
                    );
                  })}
                </div>
              </div>

              {/* Category-Specific Fields */}
              {Object.values(CATEGORY_CONFIG).find(c => c.label === currentConfig.label)?.specificFields.map((field) => (
                <div key={field.name} className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                  <label className="text-xs font-bold text-white mb-1.5 block uppercase">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={categorySpecificData[field.name] || ''}
                      onChange={(e) =>
                        setCategorySpecificData(prev => ({
                          ...prev,
                          [field.name]: e.target.value
                        }))
                      }
                      className="w-full bg-black border border-yellow-600/50 rounded-lg p-2 focus:ring-2 focus:ring-yellow-600 outline-none text-white text-sm"
                    >
                      <option value="">-- SELECT --</option>
                      {field.placeholder.split(', ').map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      value={categorySpecificData[field.name] || ''}
                      onChange={(e) =>
                        setCategorySpecificData(prev => ({
                          ...prev,
                          [field.name]: e.target.value
                        }))
                      }
                      placeholder={field.placeholder}
                      className="w-full bg-black border border-yellow-600/50 rounded-lg p-2 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-white/40 text-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={categorySpecificData[field.name] || ''}
                      onChange={(e) =>
                        setCategorySpecificData(prev => ({
                          ...prev,
                          [field.name]: e.target.value
                        }))
                      }
                      placeholder={field.placeholder}
                      className="w-full bg-black border border-yellow-600/50 rounded-lg p-2 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-white/40 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ===== STEP 4: PACKAGE SELECTION ===== */}
          {currentStep === 'package' && (
            <div className="space-y-3">
              <p className="text-white/80 text-center text-sm">Choose the perfect package for your business growth</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PACKAGE_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedPackage(tier.id as any)}
                    className={`relative p-4 rounded-xl cursor-pointer transition transform hover:scale-105 ${
                      selectedPackage === tier.id
                        ? `bg-gradient-to-br ${tier.color} border-2 border-white shadow-2xl`
                        : 'bg-black border border-yellow-600/50 hover:border-yellow-600'
                    }`}
                  >
                    {/* Tier Badge */}
                    <div className="text-2xl mb-2">{tier.icon}</div>
                    
                    {/* Title & Duration */}
                    <h3 className={`font-bold text-sm mb-0.5 ${selectedPackage === tier.id ? 'text-white' : 'text-white'}`}>
                      {tier.name}
                    </h3>
                    <div className={`text-xs font-semibold mb-2 ${selectedPackage === tier.id ? 'text-white/90' : 'text-yellow-600'}`}>
                      {tier.duration}
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <div className={`text-2xl font-bold ${selectedPackage === tier.id ? 'text-white' : 'text-yellow-600'}`}>
                        {tier.price}
                      </div>
                      <p className={`text-xs ${selectedPackage === tier.id ? 'text-white/70' : 'text-white/60'}`}>per {tier.duration.toLowerCase()}</p>
                    </div>

                    {/* Features */}
                    <ul className={`space-y-1 ${selectedPackage === tier.id ? 'text-white/90' : 'text-white'}`}>
                      {tier.features.map((feature) => (
                        <li key={feature} className="text-xs">{feature}</li>
                      ))}
                    </ul>

                    {/* Selection Checkmark */}
                    {selectedPackage === tier.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-white text-black rounded-full flex items-center justify-center">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Payment Flow Notice */}
              <div className="bg-yellow-600/10 border border-yellow-600/50 rounded-lg p-3">
                <p className="text-xs text-yellow-100 font-semibold mb-1.5">💳 Payment Info:</p>
                <ol className="text-xs text-yellow-100/80 space-y-0.5 ml-4">
                  <li>1. Submit your business listing</li>
                  <li>2. Our team verifies your documents (2-5 business days)</li>
                  <li>3. You'll receive a payment invoice via email</li>
                  <li>4. After payment, your listing goes live immediately!</li>
                </ol>
              </div>
            </div>
          )}

          {/* ===== STEP 5: REVIEW & SUBMIT ===== */}
          {currentStep === 'submit' && (
            <div className="space-y-3">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Business Card */}
                <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                      <span>🏢</span>
                      <span>Business Details</span>
                    </h3>
                    <button
                      onClick={() => setCurrentStep('info')}
                      className="text-yellow-600 text-xs hover:text-yellow-500 underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><span className="text-gray-500">Name:</span> {businessName}</p>
                    <p><span className="text-gray-500">Category:</span> {currentConfig.label}</p>
                    <p><span className="text-gray-500">Location:</span> {location}</p>
                    <p><span className="text-gray-500">Phone:</span> {contactPhone}</p>
                  </div>
                </div>

                {/* Media Card */}
                <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                      <span>📸</span>
                      <span>Media & Docs</span>
                    </h3>
                    <button
                      onClick={() => setCurrentStep('media')}
                      className="text-yellow-600 text-xs hover:text-yellow-500 underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-0.5 text-xs text-white/70">
                    <p><span className="text-white/50">Photos:</span> {images.length}</p>
                    <p><span className="text-white/50">Cert:</span> {businessRegistration ? '✓' : '○'}</p>
                    <p><span className="text-white/50">ID:</span> {ownerIdPassport ? '✓' : '○'}</p>
                  </div>
                </div>

                {/* Services Card */}
                <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                      <span>✨</span>
                      <span>Services & Hours</span>
                    </h3>
                    <button
                      onClick={() => setCurrentStep('services')}
                      className="text-yellow-600 text-xs hover:text-yellow-500 underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-0.5 text-xs text-white/70">
                    <p><span className="text-white/50">Services:</span> {selectedServices.length} selected</p>
                    <p className="text-xs text-white/50 mt-1">{selectedServices.slice(0, 2).join(', ')}</p>
                  </div>
                </div>

                {/* Package Card */}
                <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-sm flex items-center space-x-2">
                      <span>👑</span>
                      <span>Your Package</span>
                    </h3>
                    <button
                      onClick={() => setCurrentStep('package')}
                      className="text-yellow-600 text-xs hover:text-yellow-500 underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-0.5 text-xs text-white/70">
                    <p className="font-bold text-yellow-600">
                      {PACKAGE_TIERS.find(t => t.id === selectedPackage)?.name}
                    </p>
                    <p><span className="text-white/50">Price:</span> {PACKAGE_TIERS.find(t => t.id === selectedPackage)?.price}</p>
                    <p><span className="text-white/50">Duration:</span> {PACKAGE_TIERS.find(t => t.id === selectedPackage)?.duration}</p>
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="border border-yellow-600/50 rounded-lg p-3 bg-black">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-yellow-600 mt-0.5"
                  />
                  <span className="text-xs text-white/80">
                    I confirm all information is accurate. This listing will be reviewed before publication.
                  </span>
                </label>
              </div>

              {/* What Happens Next */}
              <div className="bg-gradient-to-r from-yellow-600/10 to-yellow-600/5 border border-yellow-600/20 rounded-lg p-6">
                <h3 className="font-bold text-white mb-3 flex items-center space-x-2">
                  <Lightbulb size={20} className="text-yellow-600" />
                  <span>What Happens Next</span>
                </h3>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li><span className="text-yellow-600 font-bold">1. Email Confirmation</span> - We'll send a verification email within 1 hour</li>
                  <li><span className="text-yellow-600 font-bold">2. Document Review</span> - Our team verifies your business (2-5 business days)</li>
                  <li><span className="text-yellow-600 font-bold">3. Payment Invoice</span> - Receive your payment link via email</li>
                  <li><span className="text-yellow-600 font-bold">4. Go Live!</span> - Your listing appears on LowveldHub immediately after payment</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER NAVIGATION - BLACK & GOLD */}
        <div className="border-t border-yellow-600/50 p-3 bg-black rounded-b-xl flex gap-2 justify-between flex-shrink-0 flex-wrap">
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 'info'}
              className="px-4 py-2 border border-yellow-600/50 text-yellow-600 rounded-lg hover:bg-yellow-600/10 disabled:opacity-30 disabled:cursor-not-allowed transition text-sm font-medium"
            >
              ← Previous
            </button>

            <button
              onClick={() => {
                alert('Draft saved automatically! You can close and return later to continue.');
                setUploadError(null);
              }}
              className="px-4 py-2 border border-green-600/50 text-green-400 rounded-lg hover:bg-green-600/10 transition text-sm font-medium"
              title="Your form is automatically saved to your browser"
            >
              💾 Draft Saved
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/30 text-white rounded-lg hover:bg-white/10 transition text-sm font-medium"
          >
            Close
          </button>

          {currentStep !== 'submit' ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg transition font-bold shadow-lg text-sm"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-black rounded-lg transition font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? 'Submitting...' : '✓ Complete'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
