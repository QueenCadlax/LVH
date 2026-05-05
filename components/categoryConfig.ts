import { Category } from '../types';

export const categoryConfig: Record<string, any> = {
  [String(Category.HealthAndMedical)]: {
    title: 'Discover trusted healthcare providers, premium clinics, and specialist care across the Lowveld.',
    featuredLabel: 'Featured Healthcare Providers',
    subcategories: [
      'CLINICS & SPECIALISTS',
      'DENTISTS',
      'PHARMACIES',
      'VETERINARY CLINICS',
      'MENTAL HEALTH PROFESSIONALS',
      'WELLNESS RETREATS & YOGA RETREATS'
    ],
    filters: ['medicalAid','emergency','wheelchair','parking','service24','onlineBooking'],
    ctas: { primary: 'Book Appointment', secondary: 'Message' },
  }
  ,
  [String(Category.TransportAndLogistics)]: {
    title: 'Freight, courier, executive transport, warehousing and specialised logistics — verified, insured and operationally ready.',
    featuredLabel: 'Featured Transport Providers',
    subcategories: [
      'FREIGHT & HAULAGE',
      'LOGISTICS & WAREHOUSING',
      'COURIER & DELIVERY SERVICES',
      'PRIVATE DRIVERS & CHAUFFEURS',
      'AIRPORT TRANSFERS',
      'SHUTTLE & MINIBUS SERVICES',
      'TOUR & SIGHTSEEING SERVICES',
      'EV CHARGING STATIONS',
      'HELICOPTER RIDES / CHARTERS'
    ],
    filters: ['sameDay','crossBorder','refrigerated','heavyDuty','warehousing','fleetTracking','licensed','service24'],
    ctas: { primary: 'Request Quote', secondary: 'Message' },
    badge: ['VERIFIED','COMMERCIAL','INSURED','OPERATIONAL']
  }
  ,
  [String(Category.BeautyWellnessPersonalCare)]: {
    title: 'Premium salons, barbers, spas and beauty professionals delivering exceptional personal care across the Lowveld.',
    featuredLabel: 'Featured Beauty & Wellness Providers',
    subcategories: [
      'HAIR SALONS',
      'BARBER SHOPS',
      'NAIL & BEAUTY STUDIOS',
      'SPAS & MASSAGE THERAPY',
      'SKINCARE & BODY TREATMENTS',
      'NUTRITIONISTS & DIETICIANS',
      'COSMETIC SURGERY / AESTHETIC CLINICS'
    ],
    filters: ['womenOwned','luxury','walkins','appointmentsOnly','bridal','mobile','naturalProducts','parking'],
    ctas: { primary: 'Discover', secondary: 'Inquire' },
    badge: ['VERIFIED','LUXURY','PROFESSIONAL','HYGIENE CERTIFIED']
  }
  ,
  [String(Category.EducationAndSkills)]: {
    title: 'Discover trusted schools, universities, colleges and education providers shaping the future of the Lowveld.',
    featuredLabel: 'Featured Education Institutions',
    subcategories: [
      'PRIMARY & SECONDARY SCHOOLS',
      'UNIVERSITIES',
      'COLLEGES & TRAINING CENTERS',
      'TUTORS & EXTRA CLASSES',
      'ONLINE COURSES & SKILL DEVELOPMENT',
      'VOCATIONAL & TECHNICAL TRAINING'
    ],
    filters: ['public','private','boarding','onlineLearning','accredited','nsc_ieb','tvet','higherEducation','scholarships','parking'],
    ctas: { primary: 'Apply', secondary: 'Enquire' }
  }
  ,
  [String(Category.CommunityAndOrganisations)]: {
    title: 'Discover trusted family services, childcare, community spaces and kid-friendly experiences across the Lowveld.',
    featuredLabel: 'Featured Family & Community Listings',
    subcategories: [
      'FAMILY SERVICES',
      'CHILDCARE & SCHOOLS',
      'LOCAL COMMUNITY CENTRES',
      'RELIGIOUS CENTRES (CHURCHES & MOSQUES)',
      'PLAY CENTERS & KID ACTIVITIES',
      'AFTER-SCHOOL PROGRAMS & CLUBS',
      'FAMILY ENTERTAINMENT'
    ],
    filters: ['childFriendly','familyOwned','licensed','faithBased','afterSchoolCare','weekendActivities','educational','indoorPlay','outdoorPlay','parking'],
    ctas: { primary: 'Enquire', secondary: 'Visit' }
  }
  ,
  [String(Category.RealEstateAndProperty)]: {
    title: 'Discover premium homes, rentals, commercial properties and land across the Lowveld.',
    featuredLabel: 'Featured Properties & Estate Agents',
    subcategories: [
      'ESTATE AGENTS',
      'PROPERTY RENTALS',
      'COMMERCIAL PROPERTY',
      'PROPERTY MANAGEMENT & TENANTS',
      'LAND & PLOTS',
      'LUXURY HOMES & VILLAS',
      'APARTMENTS & LOFTS'
    ],
    filters: ['forSale','toRent','commercial','residential','luxury','newDevelopment','petFriendly','furnished','unfurnished','secureEstate','parking','swimmingPool','garden'],
    ctas: { primary: 'Book Viewing', secondary: 'Contact Agent' }
  }
};

export default categoryConfig;
