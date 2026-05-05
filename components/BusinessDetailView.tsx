import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, Star, Globe, Briefcase, Check, Mail, ExternalLink, Clock, Users, Award, DollarSign, ChevronLeft, ChevronRight, Heart, Share2, Calendar, Utensils } from 'lucide-react';
import { AreaDominationBadge, TrustStackPanel } from './Shared';
import { BusinessMatchmaker } from './BusinessMatchmaker';

interface BusinessDetailViewProps {
  businessId: string | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  businesses: Business[];
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

const GOLD = '#C9A24D';
const PANEL_BLACK = '#0B0B0B';
const BG_BLACK = '#000000';
const BORDER = '#2a2a2a';
const TEXT_MUTED = '#8B8B8B';
const TEXT_WHITE = '#FFFFFF';

// Inject gallery animations
const styles = `
  @keyframes galleryDotPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  .gallery-dot {
    transition: all 200ms ease;
  }
  
  .gallery-dot.active {
    animation: galleryDotPulse 600ms ease;
  }
  
  .luxury-gradient {
    background: linear-gradient(135deg, rgba(201, 162, 77, 0.1) 0%, rgba(201, 162, 77, 0.05) 100%);
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Helper to detect business category type
const getBusinessCategoryType = (category: string, subcategory: string): string => {
  const cat = (category || '').toLowerCase();
  const subcat = (subcategory || '').toLowerCase();
  
  if (cat.includes('beauty') || subcat.includes('hair') || subcat.includes('barber') || subcat.includes('nail')) return 'beauty';
  if (cat.includes('health') || subcat.includes('clinic') || subcat.includes('doctor') || subcat.includes('dental')) return 'health';
  if (cat.includes('real estate') || subcat.includes('estate') || subcat.includes('property') || subcat.includes('agent')) return 'realestate';
  if (cat.includes('automotive') || subcat.includes('car') || subcat.includes('dealership')) return 'automotive';
  if (cat.includes('transport') || subcat.includes('freight') || subcat.includes('courier')) return 'transport';
  if (cat.includes('education') || subcat.includes('school') || subcat.includes('university')) return 'education';
  return 'generic';
};

const BusinessDetailView: React.FC<BusinessDetailViewProps> = ({ businessId, navigate, businesses, favorites = [], toggleFavorite }) => {
  const business: Business | undefined = businesses.find(b => b.id === businessId);
  const [isFavorited, setIsFavorited] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    setIsFavorited(favorites.includes(businessId || ''));
  }, [businessId, favorites]);
  
  if (!business) {
    return (
      <div style={{ paddingTop: 96, minHeight: '100vh', background: BG_BLACK }}>
        <div className="container mx-auto px-6">
          <button onClick={() => navigate('directory')} className="flex items-center gap-2 text-[#C9A24D] hover:text-amber-400 mb-6">
            <ArrowLeft size={20} /> Back to Directory
          </button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Business not found</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [businessId]);

  const businessType = getBusinessCategoryType(business.category, business.subcategory || '');
  const isBeauty = businessType === 'beauty';
  const isHealth = businessType === 'health';
  const isRealEstate = businessType === 'realestate';
  
  const isTransport = businessType === 'transport';
  // Detect specific transport subcategories
  const isFreightHaulage = (business.subcategory || '').toUpperCase().includes('FREIGHT');
  const isLogisticsWarehouse = (business.subcategory || '').toUpperCase().includes('LOGISTICS') || (business.subcategory || '').toUpperCase().includes('WAREHOUSING');
  const isCourierDelivery = (business.subcategory || '').toUpperCase().includes('COURIER') || (business.subcategory || '').toUpperCase().includes('DELIVERY');
  const isPrivateDrivers = (business.subcategory || '').toUpperCase().includes('PRIVATE DRIVERS');
  const isAirportTransfers = (business.subcategory || '').toUpperCase().includes('AIRPORT');
  const isShuttle = (business.subcategory || '').toUpperCase().includes('SHUTTLE');
  const isTourSightseeing = (business.subcategory || '').toUpperCase().includes('TOUR');
  const isEVCharging = (business.subcategory || '').toUpperCase().includes('EV CHARGING');
  const isHelicopterCharter = (business.subcategory || '').toUpperCase().includes('HELICOPTER');
  const isShuttleMinibus = (business.subcategory || '').toUpperCase().includes('SHUTTLE');
  
  // Detect specific beauty subcategories
  const isHairSalon = (business.subcategory || '').toUpperCase().includes('HAIR');
  const isBarberShop = (business.subcategory || '').toUpperCase().includes('BARBER');
  const isNailBeauty = (business.subcategory || '').toUpperCase().includes('NAIL');
  const isCosmeticSurgery = (business.subcategory || '').toUpperCase().includes('COSMETIC');
  const isNutritionists = (business.subcategory || '').toUpperCase().includes('NUTRITIONIST');
  const isSkincare = (business.subcategory || '').toUpperCase().includes('SKINCARE');
  const isSpa = (business.subcategory || '').toUpperCase().includes('SPAS & MASSAGE');

  // Detect family/kids/community subcategories
  const isFamilyServices = (business.subcategory || '').toUpperCase().includes('FAMILY SERVICES');
  const isChildcareSchools = (business.subcategory || '').toUpperCase().includes('CHILDCARE') || (business.subcategory || '').toUpperCase().includes('SCHOOLS');
  const isCommunitycentre = (business.subcategory || '').toUpperCase().includes('COMMUNITY CENTRE');
  const isReligiouscentre = (business.subcategory || '').toUpperCase().includes('RELIGIOUS');
  const isPlaycentre = (business.subcategory || '').toUpperCase().includes('PLAY CENTER');
  const isAfterschool = (business.subcategory || '').toUpperCase().includes('AFTER-SCHOOL');
  const isFamilyentertainment = (business.subcategory || '').toUpperCase().includes('FAMILY ENTERTAINMENT');

  // Detect tourism/travel/stays subcategories
  const isHotelsLodges = (business.subcategory || '').toUpperCase().includes('HOTELS') || (business.subcategory || '').toUpperCase().includes('LODGES');
  const isGuestHousesBBs = (business.subcategory || '').toUpperCase().includes('GUEST HOUSES') || (business.subcategory || '').toUpperCase().includes('B&B');
  const isSafarisGameReserves = (business.subcategory || '').toUpperCase().includes('SAFARI') || (business.subcategory || '').toUpperCase().includes('GAME RESERVE');
  const isTourOperatorsGuides = (business.subcategory || '').toUpperCase().includes('TOUR OPERATOR') || (business.subcategory || '').toUpperCase().includes('GUIDE');
  const isScenicRoutesAdventure = (business.subcategory || '').toUpperCase().includes('SCENIC ROUTE') || (business.subcategory || '').toUpperCase().includes('ADVENTURE TRAVEL');
  const isYachtBoatCharters = (business.subcategory || '').toUpperCase().includes('YACHT') || (business.subcategory || '').toUpperCase().includes('BOAT CHARTER');
  const isPrivateJetAirCharter = (business.subcategory || '').toUpperCase().includes('PRIVATE JET') || (business.subcategory || '').toUpperCase().includes('AIR CHARTER');

  // Detect health & medical subcategories
  const isClinicSpecialists = (business.subcategory || '').toUpperCase().includes('CLINIC') || (business.subcategory || '').toUpperCase().includes('SPECIALIST');
  const isDentists = (business.subcategory || '').toUpperCase().includes('DENTIST');
  const isPharmacies = (business.subcategory || '').toUpperCase().includes('PHARMAC');
  const isMentalHealthProfessionals = (business.subcategory || '').toUpperCase().includes('MENTAL HEALTH');
  const isWellnessRetreats = (business.subcategory || '').toUpperCase().includes('WELLNESS') || (business.subcategory || '').toUpperCase().includes('YOGA');
  const isVeterinaryClinics = (business.subcategory || '').toUpperCase().includes('VETERINAR') || (business.subcategory || '').toUpperCase().includes('PETS & ANIMALS');
  
  const isBuilders = (business.subcategory || '').toUpperCase().includes('BUILDERS') || (business.subcategory || '').toUpperCase().includes('CONTRACTORS');
  const isPlumbingElectrical = (business.subcategory || '').toUpperCase().includes('PLUMBING') || (business.subcategory || '').toUpperCase().includes('ELECTRICAL');
  const isRoofingRenovations = (business.subcategory || '').toUpperCase().includes('ROOFING') || (business.subcategory || '').toUpperCase().includes('RENOVATION');
  const isInteriorDesigners = (business.subcategory || '').toUpperCase().includes('INTERIOR') || (business.subcategory || '').toUpperCase().includes('DECOR');
  const isLandscapingGardening = (business.subcategory || '').toUpperCase().includes('LANDSCAP') || (business.subcategory || '').toUpperCase().includes('GARDEN');
  const isSmartHome = (business.subcategory || '').toUpperCase().includes('SMART HOME') || (business.subcategory || '').toUpperCase().includes('AUTOMATION');
  const isCustomFurniture = (business.subcategory || '').toUpperCase().includes('FURNITURE') || (business.subcategory || '').toUpperCase().includes('CRAFTSMAN');
  const isPoolGarden = (business.subcategory || '').toUpperCase().includes('POOL') && ((business.subcategory || '').toUpperCase().includes('GARDEN') || (business.subcategory || '').toUpperCase().includes('WATER'));

  const isLegalServices = (business.subcategory || '').toUpperCase().includes('LEGAL');
  const isAccountingAndTax = (business.subcategory || '').toUpperCase().includes('ACCOUNT') || (business.subcategory || '').toUpperCase().includes('TAX');
  const isConsultants = (business.subcategory || '').toUpperCase().includes('CONSULT') && !(business.subcategory || '').toUpperCase().includes('PR');
  const isMarketingAndAdvertising = (business.subcategory || '').toUpperCase().includes('MARKET') || (business.subcategory || '').toUpperCase().includes('ADVERTIS');
  const isTechAndIT = (business.subcategory || '').toUpperCase().includes('TECH') || (business.subcategory || '').toUpperCase().includes('IT SERVICES');
  const isArchitectsDesigners = (business.subcategory || '').toUpperCase().includes('ARCHITECT') || ((business.subcategory || '').toUpperCase().includes('INTERIOR') && (business.subcategory || '').toUpperCase().includes('DESIGNER'));
  const isBusinessBrokersAdvisors = (business.subcategory || '').toUpperCase().includes('BROKER') || (business.subcategory || '').toUpperCase().includes('INVESTMENT');
  const isLifeCoachesAndMentors = (business.subcategory || '').toUpperCase().includes('COACH') || (business.subcategory || '').toUpperCase().includes('MENTOR');
  const isTranslationAndLanguage = (business.subcategory || '').toUpperCase().includes('TRANSLAT') || (business.subcategory || '').toUpperCase().includes('LANGUAGE');
  const isPRAndMedia = (business.subcategory || '').toUpperCase().includes('PR') || (business.subcategory || '').toUpperCase().includes('MEDIA');

  const isLuxuryEVDealerships = (business.subcategory || '').toUpperCase().includes('DEALERSHIP');
  const isCarHireAndRentals = (business.subcategory || '').toUpperCase().includes('HIRE') || (business.subcategory || '').toUpperCase().includes('RENTAL');
  const isServiceAndRepairs = (business.subcategory || '').toUpperCase().includes('SERVICE') || (business.subcategory || '').toUpperCase().includes('REPAIR');
  const isCarDetailingAndMaintenance = (business.subcategory || '').toUpperCase().includes('DETAIL') || (business.subcategory || '').toUpperCase().includes('MAINTENANCE');
  const isLimoAndExotic = (business.subcategory || '').toUpperCase().includes('LIMOUSINE') || (business.subcategory || '').toUpperCase().includes('EXOTIC');
  const isMotorcycleAndATV = (business.subcategory || '').toUpperCase().includes('MOTORCYCLE') || (business.subcategory || '').toUpperCase().includes('ATV');

  const isCropAndFarmSuppliers = (business.subcategory || '').toUpperCase().includes('CROP') || (business.subcategory || '').toUpperCase().includes('FARM SUPPLIER');
  const isLivestockServices = (business.subcategory || '').toUpperCase().includes('LIVESTOCK');
  const isAgritechAndMachinery = (business.subcategory || '').toUpperCase().includes('AGRI-TECH') || (business.subcategory || '').toUpperCase().includes('AGRITECH');
  const isMiningSuppliers = (business.subcategory || '').toUpperCase().includes('MINING SUPPLIER');
  const isMiningEquipmentAndMachinery = (business.subcategory || '').toUpperCase().includes('MINING EQUIPMENT');
  const isIndustrialToolsAndMachinery = (business.subcategory || '').toUpperCase().includes('INDUSTRIAL');

  const isBarsAndCocktailLounges = (business.subcategory || '').toUpperCase().includes('BARS') || (business.subcategory || '').toUpperCase().includes('COCKTAIL');
  const isClubsAndLounges = (business.subcategory || '').toUpperCase().includes('CLUBS') || (business.subcategory || '').toUpperCase().includes('LOUNGES');
  const isLiveMusicAndVenues = (business.subcategory || '').toUpperCase().includes('LIVE MUSIC') || (business.subcategory || '').toUpperCase().includes('VENUES');
  const isTheatersAndCinemas = (business.subcategory || '').toUpperCase().includes('THEATER') || (business.subcategory || '').toUpperCase().includes('CINEMA');
  const isGamingAndVRCenters = (business.subcategory || '').toUpperCase().includes('GAMING') || (business.subcategory || '').toUpperCase().includes('VR');
  const isDanceStudiosAndPerformances = (business.subcategory || '').toUpperCase().includes('DANCE') || (business.subcategory || '').toUpperCase().includes('PERFORMANCE');
  const isMusicLessonsAndTeachers = (business.subcategory || '').toUpperCase().includes('MUSIC LESSON') || (business.subcategory || '').toUpperCase().includes('MUSIC TEACHER');

  const isConciergeServices = (business.subcategory || '').toUpperCase().includes('CONCIERGE');
  const isExclusiveExperiences = (business.subcategory || '').toUpperCase().includes('EXCLUSIVE EXPERIENCE');
  const isPersonalAssistants = (business.subcategory || '').toUpperCase().includes('PERSONAL ASSISTANT');
  const isLuxuryClubsAndMemberships = (business.subcategory || '').toUpperCase().includes('LUXURY CLUB') || (business.subcategory || '').toUpperCase().includes('MEMBERSHIP');
  const isWineTastingAndVineyards = (business.subcategory || '').toUpperCase().includes('WINE') || (business.subcategory || '').toUpperCase().includes('VINEYARD');
  const isGolfAndCountryClubs = (business.subcategory || '').toUpperCase().includes('GOLF') || (business.subcategory || '').toUpperCase().includes('COUNTRY CLUB');
  const isPersonalStylingAndWardrobeConsultants = (business.subcategory || '').toUpperCase().includes('STYLING') || (business.subcategory || '').toUpperCase().includes('WARDROBE');

  const isBanksAndBranches = (business.subcategory || '').toUpperCase().includes('BANK') || (business.subcategory || '').toUpperCase().includes('BRANCHES');
  const isLoanProviders = (business.subcategory || '').toUpperCase().includes('LOAN');
  const isInsuranceBrokers = (business.subcategory || '').toUpperCase().includes('INSURANCE');
  const isInvestmentAndFinancialAdvisors = (business.subcategory || '').toUpperCase().includes('INVESTMENT') || (business.subcategory || '').toUpperCase().includes('FINANCIAL ADVISOR');
  const isCryptoAndBlockchainServices = (business.subcategory || '').toUpperCase().includes('CRYPTOCURRENCY') || (business.subcategory || '').toUpperCase().includes('BLOCKCHAIN');
  const isEstatePlanningAndWills = (business.subcategory || '').toUpperCase().includes('ESTATE') || (business.subcategory || '').toUpperCase().includes('WILLS');
  const isTaxConsultantsAndAdvisors = (business.subcategory || '').toUpperCase().includes('TAX');

  const isBoutiquesAndFashion = (business.subcategory || '').toUpperCase().includes('BOUTIQUE') || (business.subcategory || '').toUpperCase().includes('FASHION');
  const isHomeAndDecorStores = (business.subcategory || '').toUpperCase().includes('HOME') || (business.subcategory || '').toUpperCase().includes('DECOR');
  const isGrocersAndMarkets = (business.subcategory || '').toUpperCase().includes('GROCER') || (business.subcategory || '').toUpperCase().includes('MARKET') || (business.subcategory || '').toUpperCase().includes('CONVENIENCE');
  const isLuxuryProductsAndGifts = (business.subcategory || '').toUpperCase().includes('LUXURY PRODUCT') || (business.subcategory || '').toUpperCase().includes('GIFT');
  const isEcoAndSustainableProducts = (business.subcategory || '').toUpperCase().includes('ECO') || (business.subcategory || '').toUpperCase().includes('SUSTAINABLE');
  const isOnlineMarketplaces = (business.subcategory || '').toUpperCase().includes('ONLINE MARKETPLACE') || (business.subcategory || '').toUpperCase().includes('MARKETPLACE');

  const isEstateAgents = (business.subcategory || '').toUpperCase().includes('ESTATE AGENT');
  const isPropertyRentals = (business.subcategory || '').toUpperCase().includes('PROPERTY RENTAL');
  const isCommercialProperty = (business.subcategory || '').toUpperCase().includes('COMMERCIAL PROPERTY');
  const isPropertyManagementAndTenants = (business.subcategory || '').toUpperCase().includes('PROPERTY MANAGEMENT') || (business.subcategory || '').toUpperCase().includes('TENANT');
  const isLandAndPlots = (business.subcategory || '').toUpperCase().includes('LAND') || (business.subcategory || '').toUpperCase().includes('PLOT');
  const isLuxuryHomesAndVillas = (business.subcategory || '').toUpperCase().includes('LUXURY HOME') || (business.subcategory || '').toUpperCase().includes('VILLA');
  const isApartmentsAndLofts = (business.subcategory || '').toUpperCase().includes('APARTMENT') || (business.subcategory || '').toUpperCase().includes('LOFT');

  const isMunicipalServices = (business.subcategory || '').toUpperCase().includes('MUNICIPAL');
  const isLicensingAndRegistrations = (business.subcategory || '').toUpperCase().includes('LICENSING') || (business.subcategory || '').toUpperCase().includes('REGISTRATION');
  const isPublicHealthServices = (business.subcategory || '').toUpperCase().includes('PUBLIC HEALTH');

  const isSoftwareDevelopment = (business.subcategory || '').toUpperCase().includes('SOFTWARE') || (business.subcategory || '').toUpperCase().includes('DEVELOPMENT');
  const isWebAndDesignStudios = (business.subcategory || '').toUpperCase().includes('WEB') || (business.subcategory || '').toUpperCase().includes('DESIGN STUDIO');
  const isDigitalMarketingAgencies = (business.subcategory || '').toUpperCase().includes('DIGITAL MARKETING');
  const isPhotographyAndVideography = (business.subcategory || '').toUpperCase().includes('PHOTOGRAPHY') || (business.subcategory || '').toUpperCase().includes('VIDEOGRAPHY');
  const isDronePhotographyVideography = (business.subcategory || '').toUpperCase().includes('DRONE');
  const isAppDevelopmentSoftwareHouses = (business.subcategory || '').toUpperCase().includes('APP DEVELOPMENT') || (business.subcategory || '').toUpperCase().includes('SOFTWARE HOUSES');
  const isAiAndDataScienceServices = (business.subcategory || '').toUpperCase().includes('AI') || (business.subcategory || '').toUpperCase().includes('DATA SCIENCE');
  const isGamingAndEsports = (business.subcategory || '').toUpperCase().includes('GAMING') || (business.subcategory || '').toUpperCase().includes('ESPORT');
  const isVirtualAugmentedRealityServices = (business.subcategory || '').toUpperCase().includes('VIRTUAL') || (business.subcategory || '').toUpperCase().includes('AUGMENTED REALITY') || (business.subcategory || '').toUpperCase().includes('XR');

  // Jobs & Careers Detection
  const isJobListings = (business.subcategory || '').toUpperCase().includes('JOB LISTING');
  const isJobSeekerProfiles = (business.subcategory || '').toUpperCase().includes('JOB SEEKER') || (business.subcategory || '').toUpperCase().includes('TALENT');
  const isRecruitmentHRServices = (business.subcategory || '').toUpperCase().includes('RECRUITMENT') || (business.subcategory || '').toUpperCase().includes('HR');
  const isInternshipsApprenticeships = (business.subcategory || '').toUpperCase().includes('INTERNSHIP') || (business.subcategory || '').toUpperCase().includes('APPRENTICESHIP');
  const isCareerCoachingGuidance = (business.subcategory || '').toUpperCase().includes('CAREER COACHING') || (business.subcategory || '').toUpperCase().includes('CAREER GUIDANCE');

  // Wine & Spirits Detection
  const isPremiumWineHouses = (business.subcategory || '').toUpperCase().includes('PREMIUM WINE') || (business.subcategory || '').toUpperCase().includes('WINE HOUSE');
  const isCraftDistilleries = (business.subcategory || '').toUpperCase().includes('CRAFT DISTILLER') || (business.subcategory || '').toUpperCase().includes('ARTISANAL BREWERY');
  const isLuxuryCocktailBars = (business.subcategory || '').toUpperCase().includes('COCKTAIL');
  const isWineTastingExperiences = (business.subcategory || '').toUpperCase().includes('WINE TASTING') || (business.subcategory || '').toUpperCase().includes('SOMMELIER');
  const isSpiritInvestment = (business.subcategory || '').toUpperCase().includes('SPIRIT INVESTMENT') || (business.subcategory || '').toUpperCase().includes('COLLECTOR');

  const handleWhatsApp = () => {
    if (business.phone) {
      const phoneNumber = business.phone.replace(/\D/g, '');
      window.open(`https://wa.me/${phoneNumber}`);
    }
  };

  const handleFavoritToggle = () => {
    if (toggleFavorite) {
      toggleFavorite(business.id);
      setIsFavorited(!isFavorited);
    }
  };

  // Gallery images
  const images = (business as any).images && (business as any).images.length ? (business as any).images : [business.image || ''];

  // Beauty-specific data
  const beautyServices = {
    services: [
      { name: 'Hair Treatments', category: 'Hair', price: 'From R200' },
      { name: 'Manicure & Pedicure', category: 'Nails', price: 'From R150' },
      { name: 'Lash Extensions', category: 'Lashes', price: 'From R300' },
      { name: 'Brow Design', category: 'Brows', price: 'From R100' },
    ],
    amenities: ['Air-conditioned', 'Free WiFi', 'Comfortable waiting area', 'Wheelchair accessible'],
    specializations: ['Bridal', 'Color treatments', 'Protective styling', 'Natural hair care'],
  };

  // Hair Salon-specific data
  const hairSalonServices = {
    services: [
      { name: 'Luxury Hair Wash & Style', category: 'Styling', price: 'From R150', tier: 'Standard' },
      { name: 'Professional Hair Cut', category: 'Cuts', price: 'From R250', tier: 'Standard' },
      { name: 'Keratin Hair Treatment', category: 'Treatments', price: 'From R300', tier: 'Premium' },
      { name: 'Hair Extensions Install', category: 'Extensions', price: 'From R500', tier: 'Premium' },
      { name: 'Braiding & Protective Styles', category: 'Braids', price: 'From R350', tier: 'Premium' },
      { name: 'Color & Highlights', category: 'Color', price: 'From R400', tier: 'Premium' },
      { name: 'Scalp Treatment & Massage', category: 'Wellness', price: 'From R200', tier: 'Standard' },
      { name: 'Bridal Hair Package', category: 'Special', price: 'From R650', tier: 'VIP' },
    ],
    hairTypes: ['Straight Hair', 'Curly Hair', 'Coily Hair', 'Braided Hair', 'Natural Hair', 'Textured Hair'],
    certifications: ['International Hair Styling Certified', 'Natural Hair Specialist', 'Protective Styling Expert', 'Hair Health & Wellness Certified'],
    associations: ['SAHB Member', 'IFBE Certified', 'Professional Beauty Association'],
    amenities: ['Luxury seating', 'Premium WiFi', 'Complimentary beverages', 'Private washing stations', 'Air-conditioned', 'Relaxation lounge'],
    specializations: ['Women\'s Hair Care', 'Men\'s Grooming', 'Bridal Styling', 'Protective Styling', 'Hair Growth Therapy', 'Natural Hair Specialist'],
    stylists: [
      { name: 'Thandi Mkhize', specialty: 'Natural Hair', qualification: 'Master Stylist, 8 years', experience: '8 years' },
      { name: 'Zara Johnson', specialty: 'Color & Highlights', qualification: 'Color Specialist, 6 years', experience: '6 years' },
      { name: 'Precious Ndlela', specialty: 'Braiding & Extensions', qualification: 'Master Braider, 10 years', experience: '10 years' },
    ],
  };

  // Barber Shop-specific data
  const barberServices = {
    services: [
      { name: 'Classic Barbershop Cut', category: 'Cuts', price: 'From R150', tier: 'Standard' },
      { name: 'Fade Haircut', category: 'Advanced Cuts', price: 'From R180', tier: 'Standard' },
      { name: 'Beard Trim & Shape', category: 'Beard', price: 'From R120', tier: 'Standard' },
      { name: 'Executive Grooming Package', category: 'Premium', price: 'From R280', tier: 'Premium' },
      { name: 'Hot Towel Shave', category: 'Shaving', price: 'From R200', tier: 'Premium' },
      { name: 'Line Work & Design', category: 'Design', price: 'From R100', tier: 'Standard' },
      { name: 'Scalp Massage & Treatment', category: 'Wellness', price: 'From R150', tier: 'Premium' },
      { name: 'Complete Grooming Experience', category: 'Premium', price: 'From R350', tier: 'VIP' },
    ],
    specializations: ['Fade Haircuts', 'Beard Design', 'Executive Grooming', 'Hot Shave Techniques', 'Scalp Treatments', 'Line Work Design'],
    certifications: ['Master Barber Certified', 'Hygiene & Sanitation Certified', 'Advanced Beard Design Certified', 'Professional Grooming Association Member'],
    associations: ['SAHB Member', 'International Barber Federation', 'Professional Beauty Association'],
    amenities: ['Comfortable leather seating', 'Premium WiFi', 'Beverage & snack service', 'Private grooming suites', 'Walk-ins welcome', 'Appointments available'],
    barbers: [
      { name: 'Sipho Mthembu', specialty: 'Fades & Designs', qualification: 'Master Barber, 12 years', experience: '12 years' },
      { name: 'Themba Nkomo', specialty: 'Beard Sculpting', qualification: 'Professional Barber, 9 years', experience: '9 years' },
      { name: 'Kwame Adeyemi', specialty: 'Executive Grooming', qualification: 'Premium Grooming Specialist, 11 years', experience: '11 years' },
    ],
  };

  // Cosmetic Surgery-specific data
  const cosmeticSurgeryServices = {
    procedures: [
      { name: 'Breast Augmentation', category: 'Surgery', price: 'From R15,000', recovery: '2-3 weeks' },
      { name: 'Rhinoplasty (Nose Job)', category: 'Surgery', price: 'From R12,000', recovery: '3-4 weeks' },
      { name: 'Liposuction', category: 'Surgery', price: 'From R10,000', recovery: '2-4 weeks' },
      { name: 'Facelift', category: 'Surgery', price: 'From R18,000', recovery: '3-6 weeks' },
      { name: 'Botox Injections', category: 'Non-Surgical', price: 'From R2,000', recovery: 'Immediate' },
      { name: 'Dermal Fillers', category: 'Non-Surgical', price: 'From R2,500', recovery: 'Immediate' },
      { name: 'Chemical Peels', category: 'Non-Surgical', price: 'From R1,200', recovery: '3-7 days' },
      { name: 'Laser Skin Resurfacing', category: 'Non-Surgical', price: 'From R2,800', recovery: '1-2 weeks' },
    ],
    surgeons: [
      { name: 'Dr. Amelia Van Dyk', specialty: 'Breast & Body Surgery', qualification: 'FRCS, Cosmetic Surgery Specialist', experience: '15 years' },
      { name: 'Dr. James Mtshali', specialty: 'Facial Procedures', qualification: 'MD, Aesthetic Surgery Fellow', experience: '12 years' },
      { name: 'Dr. Sofia Nkosi', specialty: 'Non-Surgical Aesthetics', qualification: 'MD, Injectable & Laser Specialist', experience: '8 years' },
    ],
    certifications: ['ASAPS Member', 'SABoM Registered', 'HPCSA Accredited', 'FDA Technology Certified', 'ISO 13485 Compliant'],
    amenities: ['State-of-the-art surgical suites', 'Recovery lounges', 'Private consultation rooms', 'Advanced anesthesia', 'Post-op support'],
    specializations: ['Body Contouring', 'Facial Aesthetics', 'Anti-Aging Procedures', 'Reconstructive Surgery', 'Minimally Invasive'],
  };

  // Nutritionists & Dieticians-specific data
  const nutritionistServices = {
    services: [
      { name: 'Weight Management Programs', category: 'Wellness', price: 'From R400', duration: '12 weeks' },
      { name: 'Medical Nutrition Therapy', category: 'Clinical', price: 'From R600', duration: 'Ongoing' },
      { name: 'Sports Nutrition Coaching', category: 'Performance', price: 'From R550', duration: 'Customized' },
      { name: 'Metabolic Testing & Analysis', category: 'Diagnostic', price: 'From R800', duration: 'Single session' },
      { name: 'Diabetes Management', category: 'Chronic Disease', price: 'From R650', duration: 'Ongoing' },
      { name: 'Gut Health & IBS Programs', category: 'Specialty', price: 'From R700', duration: '8-10 weeks' },
      { name: 'Meal Planning & Prep Coaching', category: 'Lifestyle', price: 'From R450', duration: 'Monthly' },
      { name: 'Corporate Wellness Seminars', category: 'Business', price: 'From R3,000', duration: 'Per session' },
    ],
    dietitians: [
      { name: 'Dr. Thandi Khumalo', specialty: 'Clinical Nutrition & Diabetes', qualification: 'RD, MSc Nutrition Science', experience: '14 years' },
      { name: 'Naledi Mthembu', specialty: 'Sports & Performance Nutrition', qualification: 'RD, Sports Nutrition Specialist', experience: '10 years' },
      { name: 'Dr. Lerato Sekhosane', specialty: 'Functional & Gut Health', qualification: 'RD, PhD Clinical Nutrition', experience: '12 years' },
    ],
    certifications: ['ADSA Registered', 'HPCSA Accredited', 'BDA Affiliated', 'IIN Certified Health Coach', 'Medical Aid Listed'],
    specializations: ['Weight Loss', 'Medical Nutrition Therapy', 'Sports Performance', 'Pediatric Nutrition', 'Chronic Disease Management', 'Functional Nutrition'],
    amenities: ['Private consultation rooms', 'Online consultations available', 'Medical aid accepted', 'Personalized meal plans', '24-hour WhatsApp support'],
  };

  // Skincare & Body Treatments-specific data
  const skincareServices = {
    treatments: [
      { name: 'Hydrafacial', category: 'Facial', price: 'From R650', duration: '45 mins' },
      { name: 'Chemical Peels', category: 'Facial', price: 'From R550', duration: '60 mins' },
      { name: 'Microneedling', category: 'Facial', price: 'From R750', duration: '75 mins' },
      { name: 'HydraFirm Body Wrap', category: 'Body', price: 'From R850', duration: '90 mins' },
      { name: 'Swedish Full Body Massage', category: 'Body', price: 'From R700', duration: '60 mins' },
      { name: 'Lymphatic Drainage Therapy', category: 'Body', price: 'From R800', duration: '75 mins' },
      { name: 'Anti-Aging Facial', category: 'Facial', price: 'From R600', duration: '90 mins' },
      { name: 'Acne Clarity Treatment', category: 'Facial', price: 'From R500', duration: '60 mins' },
    ],
    therapists: [
      { name: 'Zandile Ndlela', specialty: 'Advanced Facials & Anti-Aging', qualification: 'Certified Esthetician, CIDESCO', experience: '11 years' },
      { name: 'Busiswa Dlamini', specialty: 'Body Treatments & Massage Therapy', qualification: 'LMT, Spa Therapist Certified', experience: '9 years' },
      { name: 'Tsholofelo Mkhize', specialty: 'Chemical Peels & Advanced Skincare', qualification: 'Certified Skincare Specialist', experience: '8 years' },
    ],
    certifications: ['CIDESCO Certified', 'ICMTB Registered', 'ITEC Qualified', 'Medical-Grade Product Training', 'Infection Control Certified'],
    specializations: ['Anti-Aging Treatments', 'Acne Management', 'Sensitive Skin Care', 'Body Contouring', 'Relaxation Therapy', 'Hydration Therapy'],
    amenities: ['Relaxation lounge', 'Organic product lines', 'Personalized treatment plans', 'Hydrotherapy facilities', 'Complimentary consultations'],
  };

  // Spas & Massage Therapy-specific data
  const spaServices = {
    treatments: [
      { name: 'Swedish Full-Body Massage', category: 'Massage', price: 'From R800', duration: '60 mins' },
      { name: 'Deep Tissue Therapeutic Massage', category: 'Massage', price: 'From R900', duration: '75 mins' },
      { name: 'Hot Stone Therapy', category: 'Massage', price: 'From R950', duration: '90 mins' },
      { name: 'Couples Wellness Package', category: 'Couples', price: 'From R1,800', duration: '90 mins' },
      { name: 'Traditional Lowveld Ritual', category: 'Specialty', price: 'From R1,100', duration: '120 mins' },
      { name: 'Aromatherapy & Reflexology', category: 'Therapy', price: 'From R700', duration: '60 mins' },
      { name: 'Detox Body Wrap', category: 'Wrap', price: 'From R850', duration: '75 mins' },
      { name: 'Holistic Healing Package', category: 'Package', price: 'From R2,500', duration: 'Customized' },
    ],
    therapists: [
      { name: 'Naledi Khoza', specialty: 'Deep Tissue & Sports Massage', qualification: 'LMT, Sports Massage Therapist', experience: '13 years' },
      { name: 'Gugu Mthembu', specialty: 'Wellness & Relaxation Therapies', qualification: 'Certified Spa Therapist, Aromatherapy', experience: '10 years' },
      { name: 'Mpumelelo Dlamini', specialty: 'Traditional & Holistic Treatments', qualification: 'Traditional Healer Certified', experience: '15 years' },
    ],
    certifications: ['LMTI Certified', 'International Spa Association Member', 'Traditional Healing Certified', 'Wellness Coach Certified', 'Health & Safety Compliant'],
    specializations: ['Therapeutic Massage', 'Relaxation & Stress Relief', 'Sports Recovery', 'Couples Wellness', 'Holistic Healing', 'Traditional Treatments'],
    amenities: ['Steam room & sauna', 'Meditation lounge', 'Organic tea bar', 'Private treatment suites', 'Tranquil garden setting'],
  };

  // Nail & Beauty Studios-specific data
  const nailBeautyServices = {
    services: [
      { name: 'Gel Manicure', category: 'Nails', price: 'From R280', duration: '45 mins', tier: 'Standard' },
      { name: 'Gel Pedicure', category: 'Nails', price: 'From R320', duration: '50 mins', tier: 'Standard' },
      { name: 'Acrylic Nail Extensions', category: 'Nails', price: 'From R350', duration: '60 mins', tier: 'Premium' },
      { name: 'Eyelash Extensions', category: 'Lashes', price: 'From R400', duration: '90 mins', tier: 'Premium' },
      { name: 'Eyebrow Design & Tint', category: 'Brows', price: 'From R150', duration: '30 mins', tier: 'Standard' },
      { name: 'Luxury Facial & Massage', category: 'Facial', price: 'From R450', duration: '75 mins', tier: 'Premium' },
      { name: 'Bridal Beauty Package', category: 'Special', price: 'From R1,200', duration: '3 hours', tier: 'VIP' },
      { name: 'Full Beauty Makeover', category: 'Special', price: 'From R950', duration: '2.5 hours', tier: 'VIP' },
    ],
    artists: [
      { name: 'Precious Mthembu', specialty: 'Nail Art & Design', qualification: 'Certified Nail Technician, INPA', experience: '8 years' },
      { name: 'Amara Khanyi', specialty: 'Lash & Brow Artistry', qualification: 'Certified Lash & Brow Specialist', experience: '6 years' },
      { name: 'Siphiwe Dlamini', specialty: 'Beauty & Skincare Services', qualification: 'Certified Beauty Therapist', experience: '7 years' },
    ],
    certifications: ['INPA Certified', 'Beauty Industry Certified', 'Lash Safety Certified', 'Health & Safety Compliant', 'Professional Indemnity Insured'],
    associations: ['SAHB Member', 'INPA Certified', 'International Beauty Association'],
    specializations: ['Nail Art & Design', 'Lash Extensions', 'Eyebrow Design', 'Bridal Beauty', 'Makeup Application', 'Special Effects Nails'],
    amenities: ['Comfortable lounge area', 'Premium product brands', 'Complimentary beverages', 'Fashion magazines', 'Relaxing music & ambiance'],
  };

  // Health-specific data
  const healthServices = {
    specialties: ['General Practice', 'Dermatology', 'Orthopedics', 'Cardiology'],
    amenities: ['Parking available', 'Extended hours', 'Online booking', 'Medical aid accepted'],
    equipment: ['Modern diagnostic tools', 'Telemedicine available', 'Emergency services'],
  };

  // Real Estate-specific data
  const realEstateServices = {
    propertyTypes: ['Residential', 'Commercial', 'Luxury Villas', 'Land/Plots'],
    services: ['Property sales', 'Property rentals', 'Property management', 'Valuations'],
    certifications: ['EAAB Certified', 'FNB Bonded', 'Professional Indemnity Insured'],
  };

  return (
    <div style={{ background: BG_BLACK, color: TEXT_WHITE, minHeight: '100vh' }}>
      {/* ============ BACK BUTTON ============ */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate('directory')}
          className="p-2 rounded-full hover:bg-white/5 transition"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${BORDER}`, color: TEXT_WHITE }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* ============ 1. FULL-WIDTH LUXURY HERO ============ */}
      <section className="relative" style={{ height: '68vh', minHeight: 520 }}>
        <img
          src={images[heroSlide]}
          alt={`${business.name} hero`}
          className="w-full h-full object-cover transition-opacity duration-700"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'; }}
        />
        
        {/* Cinematic radial overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        
        {/* Vignette effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
            pointerEvents: 'none',
          }}
        />
        
        {/* Subtle gold bottom accent */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '2px', background: `linear-gradient(90deg, ${GOLD} 0%, transparent 50%)` }} />

        {/* Hero content: positioned at bottom-left */}
        <div className="absolute left-0 bottom-0 right-0 pb-20 px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8">
              <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
                {business.tier === 'Platinum' ? '✦ PLATINUM CURATED' : business.tier === 'Elite' ? '✦ ELITE CURATED' : business.isVerified ? '✓ VERIFIED & PAID' : '★ FEATURED'}
              </div>
              <h1 className="font-serif text-6xl md:text-7xl font-bold mb-8 max-w-3xl leading-tight" style={{ letterSpacing: '0.02em' }}>
                {business.name}
              </h1>
              
              {/* Area Domination Badge */}
              {business.areaDomination && business.areaDomination.isActive && (
                <div className="mb-8">
                  <AreaDominationBadge area={business.areaDomination.area} tier={business.areaDomination.tier} />
                </div>
              )}
            </div>

            {/* Category & positioning statement */}
            <div className="mb-8 max-w-2xl">
              <div style={{ color: GOLD, fontSize: '12px', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {business.category} • {business.subcategory || 'Premium Service'}
              </div>
              <div style={{ color: TEXT_MUTED, fontSize: '16px', lineHeight: 1.7, maxWidth: 420 }}>
                {business.description || 'Premium service provider delivering excellence in Mpumalanga.'}
              </div>
            </div>

            {/* Rating + location */}
            <div className="flex flex-wrap items-center gap-8 mb-10">
              {business.rating > 0 && (
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-[#C9A24D]" style={{ color: GOLD }} />
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>{business.rating.toFixed(1)}</span>
                  <span style={{ color: TEXT_MUTED, fontSize: '12px' }}>({business.reviewCount} verified)</span>
                </div>
              )}
              <div style={{ color: TEXT_MUTED, fontSize: '16px' }}>•</div>
              <div style={{ color: TEXT_MUTED, fontSize: '14px' }}>{business.location}</div>
            </div>

            {/* Floating action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="px-5 py-3 rounded-full font-semibold transition hover:shadow-lg"
                style={{ background: GOLD, color: BG_BLACK, boxShadow: `0 8px 24px rgba(201,162,77,0.25)` }}
              >
                <Calendar size={16} className="inline mr-2" /> View Details
              </button>
              {business.website && (
                <button
                  onClick={() => window.open(business.website, '_blank')}
                  className="px-5 py-3 rounded-full font-semibold transition hover:bg-white/10"
                  style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                >
                  <Globe size={16} className="inline mr-2" /> Website
                </button>
              )}
              <button
                onClick={handleWhatsApp}
                className="px-5 py-3 rounded-full font-semibold transition hover:bg-white/10"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
              >
                <MessageCircle size={16} className="inline mr-2" /> Message
              </button>
              <button
                className="p-3 rounded-full hover:bg-white/10 transition"
                style={{ border: `1px solid ${GOLD}` }}
                onClick={handleFavoritToggle}
              >
                <Heart size={16} className={isFavorited ? 'fill-red-500 text-red-500' : 'text-[#C9A24D]'} />
              </button>
              <button
                className="p-3 rounded-full hover:bg-white/10 transition"
                style={{ border: `1px solid ${GOLD}` }}
              >
                <Share2 size={16} className="text-[#C9A24D]" />
              </button>
              {business.trustStack && (
                <button
                  onClick={() => navigate('seller-reputation', undefined, business.id)}
                  className="px-5 py-3 rounded-full font-semibold transition hover:shadow-lg"
                  style={{ background: `${GOLD}20`, border: `1px solid ${GOLD}`, color: GOLD }}
                >
                  <Award size={16} className="inline mr-2" /> View Reputation
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hero carousel nav */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setHeroSlide((s) => (s - 1 + images.length) % images.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER}` }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setHeroSlide((s) => (s + 1) % images.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER}` }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </section>

      {/* ============ 2. TRUST & STATUS STRIP ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: PANEL_BLACK }}>
        <div className="container mx-auto max-w-5xl px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div style={{ width: 2, height: 32, background: GOLD }} />
              <div>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Verified Listing</div>
                <div style={{ color: TEXT_MUTED, fontSize: '13px' }}>Curated & Paid</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ width: 2, height: 32, background: GOLD }} />
              <div>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Reviewed by LH</div>
                <div style={{ color: TEXT_MUTED, fontSize: '13px' }}>Quality Standards</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ width: 2, height: 32, background: GOLD }} />
              <div>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Direct Booking</div>
                <div style={{ color: TEXT_MUTED, fontSize: '13px' }}>Handled by Provider</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT (NO TABS - FULL PAGE) ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: BG_BLACK }}>
        <div className="container mx-auto max-w-5xl px-8 py-14">
          <div className="space-y-14">

              {/* ============ GALLERY SECTION ============ */}
              <div>
                  <>
                    <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Gallery
                    </div>
                    <div className="relative rounded-lg overflow-hidden group" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }}>
                    <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
                      <img
                        src={images[galleryIdx]}
                        alt={`gallery-${galleryIdx}`}
                        className="w-full h-full object-cover transition-opacity duration-500"
                      />
                    </div>

                    {/* Nav arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setGalleryIdx((i) => (i - 1 + images.length) % images.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                          style={{ background: 'rgba(0,0,0,0.5)', border: `1.5px solid ${BORDER}`, backdropFilter: 'blur(2px)' }}
                        >
                          <ChevronLeft size={18} className="text-white" />
                        </button>
                        <button
                          onClick={() => setGalleryIdx((i) => (i + 1) % images.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                          style={{ background: 'rgba(0,0,0,0.5)', border: `1.5px solid ${BORDER}`, backdropFilter: 'blur(2px)' }}
                        >
                          <ChevronRight size={18} className="text-white" />
                        </button>

                        {/* Image counter */}
                        <div
                          className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'rgba(0,0,0,0.4)',
                            padding: '6px 10px',
                            borderRadius: '16px',
                            fontSize: '11px',
                            fontWeight: 600,
                            border: `1px solid ${BORDER}`,
                            color: TEXT_WHITE,
                            backdropFilter: 'blur(2px)',
                          }}
                        >
                          {galleryIdx + 1} / {images.length}
                        </div>

                        {/* Gallery dots */}
                        <div
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: '20px', backdropFilter: 'blur(2px)' }}
                        >
                          {images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setGalleryIdx(idx)}
                              className="gallery-dot cursor-pointer hover:scale-125"
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: idx === galleryIdx ? GOLD : 'rgba(255,255,255,0.4)',
                                border: 'none',
                                transition: 'all 200ms ease',
                              }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  </>
              </div>

              {/* ============ BUSINESS INFO ============ */}
              <div>
                {business.description && (
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-6 mb-6 luxury-gradient">
                    <h3 style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                      About
                    </h3>
                    <p className="text-gray-200 leading-relaxed">{business.description}</p>
                  </div>
                )}

                {/* Opening Hours */}
                {business.openingHours && (
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-[#C9A24D]" />
                      <p className="text-gray-300 text-sm font-semibold">Hours: {business.openingHours}</p>
                    </div>
                  </div>
                )}

                {/* Tags/Specialties */}
                {business.tags && business.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {business.tags.map((tag, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-sm">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trust & Verification Stack */}
                {business.trustStack && (
                  <div className="mb-6">
                    <TrustStackPanel trustStack={business.trustStack} />
                  </div>
                )}
              </div>

              {/* ============ CATEGORY-SPECIFIC SECTIONS ============ */}

              {/* TRANSPORT & LOGISTICS SECTION */}
              {isTransport && (
                <div className="space-y-6">
                  {/* Freight & Haulage */}
                  {isFreightHaulage && (
                    <div>
                      <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🚚 Freight & Haulage — Fleet & Capabilities</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-6">
                          <div className="text-white font-semibold">Fleet Overview</div>
                          <div className="text-gray-400 text-sm mt-2">Flatbeds, lowbeds, tipper trucks, crane support and escort vehicles. All SABS-compliant.</div>
                        </div>
                        <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-6">
                          <div className="text-white font-semibold">Certifications & Safety</div>
                          <div className="text-gray-400 text-sm mt-2">Drivers S&HE trained, load securing, cargo insurance and cross-border permits available on request.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Logistics & Warehousing */}
                  {isLogisticsWarehouse && (
                    <div>
                      <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📦 Logistics & Warehousing — Facilities</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4">
                          <div className="font-semibold text-white">Storage Capacity</div>
                          <div className="text-gray-400 text-sm">Temperature controlled, pallet racking and secure bonded areas.</div>
                        </div>
                        <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4">
                          <div className="font-semibold text-white">Systems</div>
                          <div className="text-gray-400 text-sm">WMS & real-time inventory tracking, EDI/fulfilment integrations.</div>
                        </div>
                        <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4">
                          <div className="font-semibold text-white">Value-Adds</div>
                          <div className="text-gray-400 text-sm">Pick & pack, cross-docking, customs clearance support.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Courier & Delivery */}
                  {isCourierDelivery && (
                    <div>
                      <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📮 Courier & Delivery — Service Levels</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4">
                          <div className="font-semibold text-white">Delivery Options</div>
                          <div className="text-gray-400 text-sm">Same-day, express, scheduled pickups and e‑commerce fulfilment.</div>
                        </div>
                        <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4">
                          <div className="font-semibold text-white">Tracking & Insurance</div>
                          <div className="text-gray-400 text-sm">Real-time GPS tracking, POD signatures and parcel insurance available.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generic transport calls-to-action */}
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button onClick={() => window.alert('Explore Services')} style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">🔍 Explore</button>
                    <button onClick={() => window.alert('Contact Provider')} style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">Contact Provider</button>
                  </div>
                </div>
              )}

              {/* HAIR SALON SECTION */}
              {isBeauty && isHairSalon && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✨ Hair Services & Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {hairSalonServices.services.map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{svc.name}</div>
                              <div className="text-xs text-gray-400">{svc.category} • {svc.tier}</div>
                            </div>
                            <div style={{ color: GOLD }} className="font-bold">{svc.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">� Professional Stylists</h3>
                    <div className="space-y-3">
                      {hairSalonServices.stylists.map((stylist, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{stylist.name}</div>
                              <div className="text-xs text-gray-400">{stylist.specialty}</div>
                              <div className="text-xs text-gray-400 mt-1">{stylist.qualification}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💇 Hair Types & Specialties</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hairSalonServices.hairTypes.map((type, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          ✓ {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">� Professional Associations & Credentials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      {hairSalonServices.associations.map((assoc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span style={{ color: GOLD }} className="font-semibold">{assoc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {hairSalonServices.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Studio Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {hairSalonServices.specializations.map((spec, idx) => (
                        <span key={idx} style={{ background: `${GOLD}25`, border: `1px solid ${GOLD}50`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Studio Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {hairSalonServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Appointment
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      ✉️ Request Consultation
                    </button>
                  </div>
                </div>
              )}

              {/* BARBER SHOP SECTION */}
              {isBeauty && isBarberShop && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💈 Barbering Services & Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {barberServices.services.map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{svc.name}</div>
                              <div className="text-xs text-gray-400">{svc.category} • {svc.tier}</div>
                            </div>
                            <div style={{ color: GOLD }} className="font-bold">{svc.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👨 Master Barbers</h3>
                    <div className="space-y-3">
                      {barberServices.barbers.map((barber, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{barber.name}</div>
                              <div className="text-xs text-gray-400">{barber.specialty}</div>
                              <div className="text-xs text-gray-400 mt-1">{barber.qualification}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {barberServices.specializations.map((spec, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎓 Professional Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      {barberServices.associations.map((assoc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span style={{ color: GOLD }} className="font-semibold">{assoc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {barberServices.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Barbershop Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {barberServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Appointment
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      ✉️ Request Consultation
                    </button>
                  </div>
                </div>
              )}

              {/* COSMETIC SURGERY SECTION */}
              {isBeauty && isCosmeticSurgery && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✨ Procedures & Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {cosmeticSurgeryServices.procedures.map((proc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{proc.name}</div>
                              <div className="text-xs text-gray-400">{proc.category}</div>
                            </div>
                            <div style={{ color: GOLD }} className="font-bold text-xs">{proc.price}</div>
                          </div>
                          <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded inline-block">Recovery: {proc.recovery}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👨‍⚕️ Board-Certified Surgeons</h3>
                    <div className="space-y-3">
                      {cosmeticSurgeryServices.surgeons.map((surgeon, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{surgeon.name}</div>
                              <div className="text-xs text-gray-400">{surgeon.specialty}</div>
                            </div>
                            <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded">{surgeon.experience}</div>
                          </div>
                          <div className="text-xs text-gray-300 mt-2">{surgeon.qualification}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">📋 Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {cosmeticSurgeryServices.specializations.map((spec, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Professional Certifications</h3>
                    <div className="space-y-2">
                      {cosmeticSurgeryServices.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Surgical Facilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {cosmeticSurgeryServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* NUTRITIONISTS & DIETICIANS SECTION */}
              {isBeauty && isNutritionists && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🥗 Services & Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {nutritionistServices.services.map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{svc.name}</div>
                              <div className="text-xs text-gray-400">{svc.category}</div>
                            </div>
                            <div style={{ color: GOLD }} className="font-bold text-xs">{svc.price}</div>
                          </div>
                          <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded inline-block">Duration: {svc.duration}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👨‍⚕️ Registered Dietitians</h3>
                    <div className="space-y-3">
                      {nutritionistServices.dietitians.map((dietitian, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{dietitian.name}</div>
                              <div className="text-xs text-gray-400">{dietitian.specialty}</div>
                            </div>
                            <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded">{dietitian.experience}</div>
                          </div>
                          <div className="text-xs text-gray-300 mt-2">{dietitian.qualification}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">📋 Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {nutritionistServices.specializations.map((spec, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Professional Credentials</h3>
                    <div className="space-y-2">
                      {nutritionistServices.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Practice Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {nutritionistServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SKINCARE & BODY TREATMENTS SECTION */}
              {isBeauty && isSkincare && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✨ Signature Treatments & Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {skincareServices.treatments.map((trt, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{trt.name}</div>
                              <div className="text-xs text-gray-400">{trt.category}</div>
                            </div>
                            <div style={{ color: GOLD }} className="font-bold text-xs">{trt.price}</div>
                          </div>
                          <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded inline-block">Duration: {trt.duration}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👩‍⚕️ Certified Therapists</h3>
                    <div className="space-y-3">
                      {skincareServices.therapists.map((therapist, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{therapist.name}</div>
                              <div className="text-xs text-gray-400">{therapist.specialty}</div>
                            </div>
                            <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded">{therapist.experience}</div>
                          </div>
                          <div className="text-xs text-gray-300 mt-2">{therapist.qualification}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🌟 Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {skincareServices.specializations.map((spec, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Professional Certifications</h3>
                    <div className="space-y-2">
                      {skincareServices.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Spa Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {skincareServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SPAS & MASSAGE THERAPY SECTION */}
              {isBeauty && isSpa && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🧘 Wellness Treatments & Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {spaServices.treatments.map((trt, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{trt.name}</div>
                              <div className="text-xs text-gray-400">{trt.category}</div>
                            </div>
                            <div style={{ color: GOLD }} className="font-bold text-xs">{trt.price}</div>
                          </div>
                          <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded inline-block">Duration: {trt.duration}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👐 Master Therapists</h3>
                    <div className="space-y-3">
                      {spaServices.therapists.map((therapist, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{therapist.name}</div>
                              <div className="text-xs text-gray-400">{therapist.specialty}</div>
                            </div>
                            <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded">{therapist.experience}</div>
                          </div>
                          <div className="text-xs text-gray-300 mt-2">{therapist.qualification}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🌿 Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {spaServices.specializations.map((spec, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Professional Certifications</h3>
                    <div className="space-y-2">
                      {spaServices.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Spa Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {spaServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* NAIL & BEAUTY STUDIOS SECTION */}
              {isBeauty && isNailBeauty && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✨ Nail & Beauty Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {nailBeautyServices.services.map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{svc.name}</div>
                              <div className="text-xs text-gray-400">{svc.category} • {svc.tier}</div>
                            </div>
                            <div style={{ color: GOLD }} className="font-bold text-xs">{svc.price}</div>
                          </div>
                          <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded inline-block">Duration: {svc.duration}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💅 Expert Nail & Beauty Artists</h3>
                    <div className="space-y-3">
                      {nailBeautyServices.artists.map((artist, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{artist.name}</div>
                              <div className="text-xs text-gray-400">{artist.specialty}</div>
                            </div>
                            <div className="text-xs text-gray-300 bg-black/40 px-2 py-1 rounded">{artist.experience}</div>
                          </div>
                          <div className="text-xs text-gray-300 mt-2">{artist.qualification}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🌟 Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {nailBeautyServices.specializations.map((spec, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Professional Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      {nailBeautyServices.associations.map((assoc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span style={{ color: GOLD }} className="font-semibold">{assoc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {nailBeautyServices.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Studio Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {nailBeautyServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Appointment
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      ✉️ Request Consultation
                    </button>
                  </div>
                </div>
              )}

              {/* GENERIC BEAUTY SECTION - for other beauty categories */}
              {isBeauty && !isHairSalon && !isBarberShop && !isCosmeticSurgery && !isNutritionists && !isSkincare && !isSpa && !isNailBeauty && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✨ Services & Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {beautyServices.services.map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div style={{ color: GOLD }} className="font-bold text-sm">{svc.name}</div>
                              <div className="text-xs text-gray-400">{svc.category}</div>
                            </div>
                            <div style={{ color: GOLD }} className="font-bold">{svc.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {beautyServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {beautyServices.specializations.map((spec, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-1 rounded-full text-sm">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* HEALTH SECTION */}
              {isHealth && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏥 Medical Specialties</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {healthServices.specialties.map((spec, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{spec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏢 Facilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {healthServices.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }} className="rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Award size={18} style={{ color: GOLD }} className="flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2">Professional Credentials</h4>
                        <p className="text-xs text-gray-300">Registered medical practitioners • HPCSA verified • Continuous professional development</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PRIVATE DRIVERS & CHAUFFEURS SECTION */}
              {isTransport && isPrivateDrivers && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🚗 Chauffeur Services & Rates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Hourly Rate</div>
                            <div className="text-xs text-gray-400">Per hour with driver</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">{business.price || 'From R450'}</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Airport Transfer</div>
                            <div className="text-xs text-gray-400">Mbombela to Kruger Gate</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Corporate Package</div>
                            <div className="text-xs text-gray-400">Monthly subscription</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Wedding Day Service</div>
                            <div className="text-xs text-gray-400">Full day or as needed</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎯 Service Offerings</h3>
                    <div className="space-y-2">
                      {['Airport & Hotel Transfers', 'Corporate Events', 'Wedding Day Transport', 'Scenic Tours & Sightseeing', 'Executive Meetings', 'Multi-Day Itineraries', 'VIP Meet & Greet', 'Concierge Services'].map((svc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🚙 Vehicle Fleet</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Luxury Sedan', 'Mercedes S-Class', 'BMW 7-Series', 'Executive Van', 'SUV (Spacious)', 'Premium Comfort'].map((vtype, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          {vtype}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Why Choose Us</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Professional Chauffeurs', 'Fully Insured Vehicles', 'GPS Real-Time Tracking', 'Meet & Greet Service', 'VIP Concierge Support', 'Flexible Scheduling', 'Bilingual Drivers', 'Impeccable Fleet'].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }} className="rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Award size={18} style={{ color: GOLD }} className="flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2">Our Standards</h4>
                        <p className="text-xs text-gray-300">All chauffeurs are hand-picked, professionally trained, and background-verified. Vehicles are regularly serviced and inspected. Full insurance coverage on all trips.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Chauffeur
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      ✉️ Send Inquiry
                    </button>
                  </div>
                </div>
              )}

              {/* AIRPORT TRANSFERS SECTION */}
              {isTransport && isAirportTransfers && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✈️ Airport Transfer Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Airport Pickup</div>
                            <div className="text-xs text-gray-400">KMIA to Mbombela area</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R550</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Hotel to Airport</div>
                            <div className="text-xs text-gray-400">Guaranteed on-time</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R550</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Kruger Lodge Transfer</div>
                            <div className="text-xs text-gray-400">Airport to lodge connections</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Group Transfers</div>
                            <div className="text-xs text-gray-400">Up to 7 passengers</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎯 Service Features</h3>
                    <div className="space-y-2">
                      {['Flight Tracking & Monitoring', 'Meet & Greet at Arrivals', 'Luggage Assistance', 'Professional Drivers', 'Fully Insured Vehicles', '24/7 Availability', 'Real-Time Updates', 'Multi-Language Support', 'Corporate Rates Available', 'VIP Welcome Service'].map((svc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🚙 Vehicle Options</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Sedan (4 pax)', 'SUV (6 pax)', 'Premium Van (7+ pax)', 'Executive S-Class', 'Luxury Comfort'].map((vtype, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          {vtype}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Why Book With Us</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Flight Monitoring Systems', 'Punctual & Reliable', 'Professional Drivers', 'Clean Vehicles', 'Insurance Coverage', 'Flexible Cancellation', 'Payment Options', 'Customer Loyalty Program'].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Transfer
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      🔍 Explore
                    </button>
                  </div>
                </div>
              )}

              {/* HELICOPTER CHARTERS SECTION */}
              {isTransport && isHelicopterCharter && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🚁 Helicopter Charter Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Scenic Flights</div>
                            <div className="text-xs text-gray-400">30-60 minute tours</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R3,500</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Kruger Air Safari</div>
                            <div className="text-xs text-gray-400">2+ hour game viewing</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Private Transfers</div>
                            <div className="text-xs text-gray-400">Fast intercity travel</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Corporate/Event</div>
                            <div className="text-xs text-gray-400">Special occasions</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎯 Experience Highlights</h3>
                    <div className="space-y-2">
                      {['Stunning Aerial Views', 'Professional Pilots', 'Small Group Charters', 'Customized Routes', 'Photography Flights', 'Adventure Tours', 'Sunset Flights', 'Game Viewing Safari', 'Emergency Medical Transport', 'VIP Experience'].map((svc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🛩️ Aircraft Fleet</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Bell 206', 'Robinson R44', 'AS350 B3', '5-Seat Capacity', 'Modern Fleet'].map((aircraft, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          {aircraft}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Safety & Standards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['CAA Certified', 'Experienced Pilots', 'Modern Aircraft', 'Full Insurance', 'Safety Briefings', 'Flexible Scheduling', 'Weather Contingency', 'Professional Crew'].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Flight
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      🔍 Explore
                    </button>
                  </div>
                </div>
              )}

              {/* SHUTTLE & MINIBUS SERVICES SECTION */}
              {isTransport && isShuttleMinibus && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🚐 Shuttle & Minibus Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Corporate Transport</div>
                            <div className="text-xs text-gray-400">Group shuttle service</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R2,500</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Resort to Lodge Transfer</div>
                            <div className="text-xs text-gray-400">Scheduled service</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Event Transport</div>
                            <div className="text-xs text-gray-400">Conferences & tours</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Charter Service</div>
                            <div className="text-xs text-gray-400">Full day or weekly</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎯 Service Features</h3>
                    <div className="space-y-2">
                      {['Professional Drivers', 'Climate Control', 'Large Luggage Space', 'GPS Tracking', 'Punctual Service', 'Group Discounts', 'Flexible Scheduling', 'Multi-Stop Routes', 'Comfortable Seating', 'Insurance Coverage'].map((svc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🚐 Vehicle Fleet</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['12-Seater Minibus', '16-Seater Coach', '20-Seater Bus', 'Luxury Van', 'Accessible Vehicles'].map((vehicle, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          {vehicle}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Why Choose Our Shuttle Service</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Experienced Team', 'Well-Maintained Fleet', 'Competitive Rates', 'On-Time Service', '24/7 Availability', 'Professional Attitude', 'Safe Driving Record', 'Local Knowledge'].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Shuttle
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      🔍 Explore
                    </button>
                  </div>
                </div>
              )}

              {/* TOUR & SIGHTSEEING SECTION */}
              {isTourSightseeing && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🗺️ Tour Types & Pricing</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'Scenic Tours', price: 'R450-650/pp' },
                        { title: 'Kruger Game Drives', price: 'R650-950/pp' },
                        { title: 'Private Guided Tours', price: 'R1,200-1,800/day' },
                        { title: 'Multi-Day Safaris', price: 'R3,500-5,500/pp' }
                      ].map((tour, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{tour.title}</p>
                          <p style={{ color: GOLD }} className="text-xs font-bold mt-2">{tour.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎯 Service Features</h3>
                    <div className="space-y-2">
                      {['Professional Guides', 'Small Group Tours', 'Photography Opportunities', 'Flexible Scheduling', 'Hotel Pickup/Dropoff', 'Wildlife Expertise', 'Lunch Included', 'GPS Tracking', 'Safety Equipment', 'Customized Itineraries'].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏞️ Tour Categories</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Half-Day Tours', 'Full-Day Tours', 'Sunset Tours', 'Multi-Day', 'Private Tours', 'Group Tours', 'Photography Tours'].map((category, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Why Choose Us</h3>
                    <div className="space-y-2">
                      {['Expert Knowledge', 'Safety Record', 'Personalized Experiences', 'Luxury Transport', 'Certified Guides', 'Local Expertise', 'Competitive Pricing', 'Flexible Cancellation'].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Star size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      🗓️ Book Tour
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      � Explore
                    </button>
                  </div>
                </div>
              )}

              {/* EV CHARGING STATIONS SECTION */}
              {isEVCharging && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">⚡ Charging Types & Speed</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'Level 2 (AC)', speed: '3-8 hours' },
                        { title: 'Fast DC Charger', speed: '20-40 min' },
                        { title: 'Ultra-Fast DC', speed: '10-20 min' },
                        { title: 'Overnight Charging', speed: '8-12 hours' }
                      ].map((charge, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{charge.title}</p>
                          <p style={{ color: GOLD }} className="text-xs font-bold mt-2">{charge.speed}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🔌 Station Features</h3>
                    <div className="space-y-2">
                      {['24/7 Availability', 'Mobile App Booking', 'Real-Time Availability', 'Covered Stations', 'Secure Parking', 'WiFi Access', 'Payment Flexibility', 'Weather Protection', 'Maintenance Support', 'Trip Planning'].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🚗 Compatible Vehicles</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Tesla', 'Nissan Leaf', 'BMW i3', 'VW ID.4', 'Hyundai EV', 'All EV Models'].map((vehicle, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          {vehicle}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Why Choose Us</h3>
                    <div className="space-y-2">
                      {['Reliable Network', 'Affordable Rates', 'Green Energy', 'Quick Setup', 'Expert Support', 'Expanding Coverage', 'Loyalty Rewards', 'Emergency Assist'].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Star size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      ⚡ Book Charging
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      � Explore
                    </button>
                  </div>
                </div>
              )}

               
              {/* FAMILY SERVICES SECTION */}
              {isFamilyServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Family Support Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Family Counseling', 'Parenting Workshops', 'Family Therapy', 'Crisis Support', 'Marriage Guidance', 'Conflict Resolution'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">What We Offer</h3>
                    <div className="space-y-2">
                      {['Professional Counselors', 'Safe Environment', 'Confidential Sessions', 'Customized Plans', 'Group Programs', 'Individual Support', 'Child-Focused Care', 'Flexible Scheduling'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Session
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* CHILDCARE & SCHOOLS SECTION */}
              {isChildcareSchools && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Educational Programs</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Preschool', 'Montessori', 'Early Learning', 'Daycare', 'After School Care', 'Holiday Programs'].map((prog, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{prog}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Facilities & Features</h3>
                    <div className="space-y-2">
                      {['Qualified Educators', 'Modern Classrooms', 'Safe Playgrounds', 'Nutritious Meals', 'Learning Activities', 'Art & Music', 'Sports Programs', 'Small Class Sizes'].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Enroll Now
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* COMMUNITY CENTRE SECTION */}
              {isCommunitycentre && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Community Programs</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Fitness Classes', 'Skills Training', 'Youth Programs', 'Health Services', 'Social Events', 'Workshops'].map((prog, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{prog}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Member Benefits</h3>
                    <div className="space-y-2">
                      {['Inclusive Membership', 'All Ages Welcome', 'Affordable Rates', 'Modern Equipment', 'Professional Staff', 'Social Community', 'Flexible Programs', 'Accessible Location'].map((ben, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{ben}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Join Community
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* RELIGIOUS CENTRES SECTION */}
              {isReligiouscentre && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Spiritual Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Sunday Services', 'Prayer Groups', 'Religious Education', 'Counseling', 'Community Events', 'Youth Ministry'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Community Features</h3>
                    <div className="space-y-2">
                      {['Welcoming Community', 'Interfaith Dialogue', 'Spiritual Growth', 'Family Programs', 'Social Support', 'Educational Talks', 'Celebratory Events', 'Counseling Services'].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Join Us
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* PLAY CENTERS SECTION */}
              {isPlaycentre && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Play Activities</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Climbing Wall', 'Trampoline Park', 'Slides & Rides', 'Party Rooms', 'Obstacle Course', 'Interactive Games'].map((act, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{act}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Why Visit</h3>
                    <div className="space-y-2">
                      {['Safe Environment', 'Trained Supervisors', 'Birthday Parties', 'Group Bookings', 'Clean Facilities', 'Healthy Snacks', 'Age-Appropriate', 'Affordable Fun'].map((why, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{why}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Party
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* AFTER-SCHOOL PROGRAMS SECTION */}
              {isAfterschool && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Program Options</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Academic Tutoring', 'Sports Clubs', 'Arts & Crafts', 'STEM Programs', 'Music Lessons', 'Leadership Training'].map((prog, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{prog}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Student Success</h3>
                    <div className="space-y-2">
                      {['Expert Instructors', 'Small Groups', 'Personal Attention', 'Skill Development', 'Confidence Building', 'Safe Care', 'Flexible Hours', 'Progress Reports'].map((suc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{suc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Enroll Today
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* FAMILY ENTERTAINMENT SECTION */}
              {isFamilyentertainment && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Entertainment Options</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Go-Karts', 'Mini Golf', 'Arcade Games', 'Bowling', 'Cinema', 'Dining'].map((ent, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{ent}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Perfect For</h3>
                    <div className="space-y-2">
                      {['Family Outings', 'Birthday Parties', 'Weekend Fun', 'Group Events', 'All Ages', 'Competitive Games', 'Casual Dining', 'Photo Memories'].map((perf, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{perf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Get Tickets
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              
              {/* FAMILY SERVICES SECTION */}
              {isFamilyServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Family Support Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Family Counseling', 'Parenting Workshops', 'Family Therapy', 'Crisis Support', 'Marriage Guidance', 'Conflict Resolution'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">What We Offer</h3>
                    <div className="space-y-2">
                      {['Professional Counselors', 'Safe Environment', 'Confidential Sessions', 'Customized Plans', 'Group Programs', 'Individual Support', 'Child-Focused Care', 'Flexible Scheduling'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Session
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* CHILDCARE & SCHOOLS SECTION */}
              {isChildcareSchools && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Educational Programs</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Preschool', 'Montessori', 'Early Learning', 'Daycare', 'After School Care', 'Holiday Programs'].map((prog, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{prog}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Facilities & Features</h3>
                    <div className="space-y-2">
                      {['Qualified Educators', 'Modern Classrooms', 'Safe Playgrounds', 'Nutritious Meals', 'Learning Activities', 'Art & Music', 'Sports Programs', 'Small Class Sizes'].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Enroll Now
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* COMMUNITY CENTRE SECTION */}
              {isCommunitycentre && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Community Programs</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Fitness Classes', 'Skills Training', 'Youth Programs', 'Health Services', 'Social Events', 'Workshops'].map((prog, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{prog}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Member Benefits</h3>
                    <div className="space-y-2">
                      {['Inclusive Membership', 'All Ages Welcome', 'Affordable Rates', 'Modern Equipment', 'Professional Staff', 'Social Community', 'Flexible Programs', 'Accessible Location'].map((ben, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{ben}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Join Community
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* RELIGIOUS CENTRES SECTION */}
              {isReligiouscentre && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Spiritual Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Sunday Services', 'Prayer Groups', 'Religious Education', 'Counseling', 'Community Events', 'Youth Ministry'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Community Features</h3>
                    <div className="space-y-2">
                      {['Welcoming Community', 'Interfaith Dialogue', 'Spiritual Growth', 'Family Programs', 'Social Support', 'Educational Talks', 'Celebratory Events', 'Counseling Services'].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Join Us
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* PLAY CENTERS SECTION */}
              {isPlaycentre && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Play Activities</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Climbing Wall', 'Trampoline Park', 'Slides & Rides', 'Party Rooms', 'Obstacle Course', 'Interactive Games'].map((act, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{act}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Why Visit</h3>
                    <div className="space-y-2">
                      {['Safe Environment', 'Trained Supervisors', 'Birthday Parties', 'Group Bookings', 'Clean Facilities', 'Healthy Snacks', 'Age-Appropriate', 'Affordable Fun'].map((why, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{why}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Party
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* AFTER-SCHOOL PROGRAMS SECTION */}
              {isAfterschool && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Program Options</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Academic Tutoring', 'Sports Clubs', 'Arts & Crafts', 'STEM Programs', 'Music Lessons', 'Leadership Training'].map((prog, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{prog}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Student Success</h3>
                    <div className="space-y-2">
                      {['Expert Instructors', 'Small Groups', 'Personal Attention', 'Skill Development', 'Confidence Building', 'Safe Care', 'Flexible Hours', 'Progress Reports'].map((suc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{suc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Enroll Today
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* FAMILY ENTERTAINMENT SECTION */}
              {isFamilyentertainment && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Entertainment Options</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Go-Karts', 'Mini Golf', 'Arcade Games', 'Bowling', 'Cinema', 'Dining'].map((ent, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{ent}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Perfect For</h3>
                    <div className="space-y-2">
                      {['Family Outings', 'Birthday Parties', 'Weekend Fun', 'Group Events', 'All Ages', 'Competitive Games', 'Casual Dining', 'Photo Memories'].map((perf, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{perf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Get Tickets
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* HOTELS & LODGES SECTION */}
              {isHotelsLodges && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Luxury Accommodations</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Luxury Suites', 'Fine Dining', 'Spa Services', 'Pool & Jacuzzi', 'Concierge', 'Room Service'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Premium Amenities</h3>
                    <div className="space-y-2">
                      {['5-Star Facilities', 'Ocean/Garden Views', 'Award-Winning Chefs', 'Premium Bedding', 'En-Suite Bathrooms', 'Smart TV & WiFi', 'Mini Bar', 'Personalized Service'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Room
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* GUEST HOUSES & B&Bs SECTION */}
              {isGuestHousesBBs && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Boutique Stays</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Gourmet Breakfast', 'Private Rooms', 'Garden Views', 'Lounge Area', 'WiFi', 'Local Experience'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Intimate Features</h3>
                    <div className="space-y-2">
                      {['Warm Hospitality', 'Homemade Breakfast', 'Personal Touch', 'Local Recommendations', 'Cozy Ambiance', 'Family-Owned', 'Garden Access', 'Flexible Booking'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Reserve
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* SAFARIS & GAME RESERVES SECTION */}
              {isSafarisGameReserves && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Safari Experiences</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Big 5 Sightings', 'Guided Tours', 'Night Drives', 'Photography', 'Birding', 'Conservation'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Wildlife Adventures</h3>
                    <div className="space-y-2">
                      {['Expert Guides', 'Private Reserve', 'Game Guaranteed', 'Professional Trackers', 'Photography Equipment', 'Luxury Accommodation', 'Gourmet Meals', 'Educational Programs'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Safari
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* TOUR OPERATORS & GUIDES SECTION */}
              {isTourOperatorsGuides && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Tour Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Guided Tours', 'Cultural Experiences', 'Customized Itineraries', 'Multi-Day Trips', 'Local Expertise', 'Group Tours'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Guide Benefits</h3>
                    <div className="space-y-2">
                      {['Expert Local Knowledge', 'Personalized Service', 'Safe & Professional', 'Flexible Scheduling', 'Authentic Experiences', 'Small Groups', 'Transportation Included', 'Local Insights'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Tour
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* SCENIC ROUTES & ADVENTURE TRAVEL SECTION */}
              {isScenicRoutesAdventure && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Adventure Activities</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Hiking', 'Rock Climbing', 'Zip-Lining', 'Quad Biking', 'Canyoning', 'Scenic Drives'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Adventure Highlights</h3>
                    <div className="space-y-2">
                      {['All Fitness Levels', 'Safety Equipment', 'Expert Instructors', 'Scenic Views', 'Nature Immersion', 'Photography Ops', 'Adrenaline Rush', 'Unforgettable Memories'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Adventure
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* YACHT & BOAT CHARTERS SECTION */}
              {isYachtBoatCharters && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Water Experiences</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Luxury Yacht', 'Sunset Cruises', 'Fishing', 'Island Tours', 'Gourmet Dining', 'Private Charter'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Cruise Luxuries</h3>
                    <div className="space-y-2">
                      {['Professional Crew', 'Comfortable Vessels', 'Gourmet Catering', 'Safety First', 'Scenic Routes', 'Photography Moments', 'Cocktails & Music', 'Bespoke Service'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Reserve Charter
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* PRIVATE JET / AIR CHARTER SECTION */}
              {isPrivateJetAirCharter && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Premium Aviation</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Private Jets', 'Helicopter Tours', 'Scenic Flights', 'Air Charters', 'Business Travel', 'Emergency Services'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Aviation Excellence</h3>
                    <div className="space-y-2">
                      {['Expert Pilots', 'Luxury Interior', 'Modern Fleet', 'Flexible Schedule', 'Aerial Photography', 'Premium Service', 'Safety Certified', 'Exclusive Experience'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Flight
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* CLINICS & SPECIALISTS SECTION */}
              {isClinicSpecialists && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Medical Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['General Consultations', 'Specialist Treatments', 'Diagnostic Services', 'Preventive Care', 'Emergency Services', 'Telemedicine'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Healthcare Excellence</h3>
                    <div className="space-y-2">
                      {['Board-Certified Doctors', 'Modern Equipment', 'Quick Appointments', 'Personalized Care', 'Comprehensive Testing', '24/7 Emergency Support', 'Specialist Network', 'Patient-Focused'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Appointment
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* DENTISTS SECTION */}
              {isDentists && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Dental Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cosmetic Dentistry', 'Root Canals', 'Teeth Whitening', 'Implants', 'Orthodontics', 'General Cleaning'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Premium Dental Care</h3>
                    <div className="space-y-2">
                      {['Painless Procedures', 'Advanced Technology', 'Gentle Care', 'Same-Day Treatment', 'Premium Materials', 'Comfort-Focused', 'Expert Dentists', 'Modern Facilities'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Schedule Dental Visit
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* PHARMACIES SECTION */}
              {isPharmacies && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Pharmaceutical Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Prescription Dispensing', 'Over-The-Counter', 'Medicine Consultation', 'Delivery Service', 'Vaccination', 'Health Screening'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Pharmacy Excellence</h3>
                    <div className="space-y-2">
                      {['Licensed Pharmacists', 'Competitive Pricing', 'Fast Service', 'Reliable Supply', 'Expert Advice', 'Confidential Service', 'Home Delivery', 'Quality Assured'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Order Medication
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* MENTAL HEALTH PROFESSIONALS SECTION */}
              {isMentalHealthProfessionals && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Mental Health Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Therapy Sessions', 'Counseling', 'Psychiatric Care', 'Stress Management', 'Grief Counseling', 'Family Therapy'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Professional Support</h3>
                    <div className="space-y-2">
                      {['Licensed Professionals', 'Confidential', 'Evidence-Based', 'Flexible Scheduling', 'Compassionate Care', 'Safe Space', 'Holistic Approach', 'Proven Results'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Session
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* WELLNESS RETREATS SECTION */}
              {isWellnessRetreats && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Wellness Programs</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Yoga Classes', 'Meditation', 'Spa Treatments', 'Wellness Programs', 'Nutrition Coaching', 'Holistic Healing'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Transformative Wellness</h3>
                    <div className="space-y-2">
                      {['Expert Instructors', 'Peaceful Environment', 'All Fitness Levels', 'Personalized Programs', 'Luxury Amenities', 'Transformative Experience', 'Mind-Body Connection', 'Retreat Package'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Book Retreat
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* VETERINARY CLINICS SECTION */}
              {isVeterinaryClinics && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Veterinary Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['General Checkup', 'Surgery', 'Vaccinations', 'Emergency Care', 'Dental Care', 'Grooming'].map((svc, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient text-center">
                          <p className="text-gray-300 text-sm font-semibold">{svc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">Pet Care Excellence</h3>
                    <div className="space-y-2">
                      {['Veterinary Specialists', 'Modern Equipment', 'Compassionate Care', 'Pet-Friendly Environment', 'Emergency 24/7', 'Preventive Focus', 'Surgical Suite', 'Premium Service'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      Schedule Pet Visit
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      Explore
                    </button>
                  </div>
                </div>
              )}

              {/* BUILDERS & CONTRACTORS SECTION */}
              {isBuilders && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏗️ Construction Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Residential Construction', 'Commercial Buildings', 'Extensions & Additions', 'Renovations', 'Project Management', 'Quality Assurance'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Construction Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Award-winning project completion',
                        'Certified professional teams',
                        'On-time delivery guarantee',
                        'Premium materials sourcing',
                        'Full regulatory compliance',
                        'Comprehensive warranty coverage',
                        'Professional site management',
                        'Client satisfaction guarantee'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Get Quote</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore</button>
                  </div>
                </div>
              )}

              {/* PLUMBING & ELECTRICAL SECTION */}
              {isPlumbingElectrical && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">⚡ Service Categories</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Installations', 'Emergency Repairs', 'Maintenance Plans', 'Compliance Checks', 'Energy Audits', 'System Upgrades'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🔧 Professional Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Certified technicians',
                        '24/7 emergency service',
                        'Quality parts guaranteed',
                        'Fast response time',
                        'Preventive maintenance plans',
                        'Energy-efficient solutions',
                        'Work warranty included',
                        'Safety compliance certified'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Request Service</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore</button>
                  </div>
                </div>
              )}

              {/* ROOFING & RENOVATIONS SECTION */}
              {isRoofingRenovations && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏘️ Renovation Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Roof Repairs', 'Roof Replacements', 'Waterproofing', 'Home Renovations', 'Interior Updates', 'Structural Work'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Quality Guarantees</h3>
                    <div className="space-y-2">
                      {[
                        'Premium material selection',
                        'Expert workmanship certified',
                        'Extended warranties offered',
                        'Weather-tight guarantees',
                        'Professional finish guaranteed',
                        'Structural integrity certified',
                        'Timely project completion',
                        'Satisfaction guaranteed commitment'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Schedule Inspection</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore</button>
                  </div>
                </div>
              )}

              {/* INTERIOR DESIGNERS SECTION */}
              {isInteriorDesigners && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎨 Design Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Space Planning', 'Color Consultation', 'Furniture Selection', 'Luxury Design', 'Bespoke Interiors', 'Style Transformation'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💎 Design Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Bespoke design solutions',
                        'Luxury aesthetic expertise',
                        '3D visualization provided',
                        'Premium furniture curation',
                        'Color psychology mastery',
                        'Functional beauty balance',
                        'Trend-forward styling',
                        'Personalized consultation'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Consult Designer</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore</button>
                  </div>
                </div>
              )}

              {/* LANDSCAPING & GARDENING SECTION */}
              {isLandscapingGardening && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🌿 Garden Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Garden Design', 'Hardscaping', 'Irrigation Systems', 'Lawn Care', 'Plant Selection', 'Maintenance Plans'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🌳 Landscape Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert landscape architects',
                        'Sustainable design practices',
                        'Plant health guaranteed',
                        'Smart irrigation solutions',
                        'Native plant expertise',
                        'Year-round maintenance care',
                        'Outdoor living creation',
                        'Environmental stewardship'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Design Garden</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore</button>
                  </div>
                </div>
              )}

              {/* SMART HOME INSTALLATION SECTION */}
              {isSmartHome && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏠 Smart Home Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Home Automation', 'Security Systems', 'Energy Monitoring', 'Smart Controls', 'Tech Integration', 'System Support'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🔐 Tech Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Latest smart technology',
                        'Professional installation',
                        'Seamless integration',
                        'Remote access capability',
                        'Energy efficiency optimization',
                        'Security expertise certified',
                        'Technical support included',
                        'Future-proof systems'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Consultation</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore</button>
                  </div>
                </div>
              )}

              {/* CUSTOM FURNITURE SECTION */}
              {isCustomFurniture && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🛋️ Furniture Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Bespoke Design', 'Luxury Crafting', 'Custom Upholstery', 'Wood Mastery', 'Installation', 'Restoration'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Craftsmanship Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Master craftsmen expertise',
                        'Premium material selection',
                        'Handcrafted precision',
                        'Bespoke design consultation',
                        'Luxury finishing options',
                        'Sustainable sourcing',
                        'Lifetime quality guarantee',
                        'Artisanal heritage techniques'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Explore Designs</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Commission</button>
                  </div>
                </div>
              )}

              {/* POOL & GARDEN SECTION */}
              {isPoolGarden && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💧 Aquatic Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Pool Design', 'Water Features', 'Landscaping', 'Maintenance', 'Automation', 'Resort Styling'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🌊 Aquatic Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Resort-style pool design',
                        'Water feature mastery',
                        'Premium landscaping integration',
                        'Advanced filtration systems',
                        'Smart pool automation',
                        'Year-round maintenance',
                        'Luxury entertainment spaces',
                        'Sustainable water management'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Design Pool</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore</button>
                  </div>
                </div>
              )}

              {/* LEGAL SERVICES SECTION */}
              {isLegalServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">⚖️ Legal Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Corporate Law', 'Commercial Contracts', 'Property Law', 'Dispute Resolution', 'Compliance', 'Legal Strategy'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">📋 Legal Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert legal counsel',
                        'Years of practice experience',
                        'Corporate expertise',
                        'Commercial litigation',
                        'Regulatory compliance',
                        'Strategic legal advice',
                        'Confidentiality assured',
                        'Award-winning advocacy'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Schedule Consultation</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn More</button>
                  </div>
                </div>
              )}

              {/* ACCOUNTING & TAX SECTION */}
              {isAccountingAndTax && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💼 Financial Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Tax Planning', 'Financial Audits', 'Bookkeeping', 'CFO Services', 'Payroll Management', 'Tax Compliance'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💰 Accounting Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Strategic tax optimization',
                        'SARS compliance expertise',
                        'Financial planning guidance',
                        'Audit excellence',
                        'Bookkeeping accuracy',
                        'CFO-level insights',
                        'Cost reduction strategies',
                        'Profitability optimization'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Consultation</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Services</button>
                  </div>
                </div>
              )}

              {/* CONSULTANTS SECTION */}
              {isConsultants && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎯 Consulting Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Strategy', 'Operations', 'Transformation', 'Market Analysis', 'Growth Planning', 'Business Optimization'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Consulting Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Top-tier strategic advice',
                        'Industry expertise',
                        'Transformation expertise',
                        'Data-driven insights',
                        'Performance optimization',
                        'Revenue growth focus',
                        'Risk mitigation',
                        'Executive partnership'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Get Strategic Plan</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn More</button>
                  </div>
                </div>
              )}

              {/* MARKETING & ADVERTISING SECTION */}
              {isMarketingAndAdvertising && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📢 Marketing Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Digital Campaigns', 'Brand Strategy', 'Social Media', 'Content Marketing', 'Traditional Advertising', 'Media Buying'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎨 Marketing Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Creative campaign expertise',
                        'Brand positioning mastery',
                        'Digital transformation',
                        'ROI optimization',
                        'Audience engagement',
                        'Market penetration',
                        'Brand storytelling',
                        'Integrated campaigns'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Create Campaign</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Portfolio</button>
                  </div>
                </div>
              )}

              {/* TECH & IT SERVICES SECTION */}
              {isTechAndIT && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💻 Technology Solutions</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cloud Solutions', 'Cybersecurity', 'Software Dev', 'Network Support', 'Digital Transform', 'IT Infrastructure'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🔐 Technology Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Enterprise-grade systems',
                        'Cybersecurity expertise',
                        'Cloud infrastructure',
                        '24/7 support available',
                        'Scalable solutions',
                        'Compliance certified',
                        'Latest technologies',
                        'Digital innovation'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Request Demo</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Solutions</button>
                  </div>
                </div>
              )}

              {/* ARCHITECTS & INTERIOR DESIGNERS SECTION */}
              {isArchitectsDesigners && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏛️ Design Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Architectural Design', 'Interior Design', 'Space Planning', 'Luxury Homes', 'Commercial Spaces', 'Sustainable Design'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Design Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Award-winning designs',
                        'Iconic architecture',
                        'Luxury aesthetics',
                        'Sustainable practices',
                        'Innovation leadership',
                        'Client collaboration',
                        'Timeless elegance',
                        'Project excellence'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">View Portfolio</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Schedule Meeting</button>
                  </div>
                </div>
              )}

              {/* BUSINESS BROKERS & INVESTMENT ADVISORS SECTION */}
              {isBusinessBrokersAdvisors && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💎 Advisory Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['M&A Advisory', 'Business Valuation', 'Investment Strategy', 'Deal Facilitation', 'Financial Advisory', 'Growth Planning'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏆 Advisory Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert deal facilitation',
                        'Valuation expertise',
                        'HNW client focus',
                        'Market knowledge',
                        'Strategic guidance',
                        'Transaction success',
                        'Confidential handling',
                        'Wealth optimization'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Get Valuation</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore Deals</button>
                  </div>
                </div>
              )}

              {/* LIFE COACHES & MENTORS SECTION */}
              {isLifeCoachesAndMentors && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🚀 Coaching Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Executive Coaching', 'Life Coaching', 'Leadership Dev', 'Personal Growth', 'Career Planning', 'Success Mentoring'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Coaching Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Certified coaches',
                        'Executive expertise',
                        'Personal transformation',
                        'Goal achievement',
                        'Leadership mastery',
                        'Performance optimization',
                        'Success acceleration',
                        'Mentorship guidance'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Start Coaching</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn More</button>
                  </div>
                </div>
              )}

              {/* TRANSLATION & LANGUAGE SERVICES SECTION */}
              {isTranslationAndLanguage && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🌐 Language Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Professional Translation', 'Interpretation', 'Document Localization', 'Business Communication', 'Language Training', 'Cultural Consulting'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💬 Language Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Certified translators',
                        'Multi-language expertise',
                        'Cultural fluency',
                        'Business accuracy',
                        'Fast turnaround',
                        'Confidentiality assured',
                        'Technical expertise',
                        'Global reach'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Request Translation</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Services</button>
                  </div>
                </div>
              )}

              {/* PR & MEDIA CONSULTANTS SECTION */}
              {isPRAndMedia && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📰 PR Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Media Relations', 'Crisis Management', 'Brand Positioning', 'Press Releases', 'Communications Strategy', 'Executive Profile'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">📻 PR Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Crisis expertise',
                        'Media connections',
                        'Strategic messaging',
                        'Brand protection',
                        'Reputation management',
                        'Executive visibility',
                        'Stakeholder relations',
                        'Thought leadership'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Start Campaign</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Portfolio</button>
                  </div>
                </div>
              )}

              {/* LUXURY & EV DEALERSHIPS SECTION */}
              {isLuxuryEVDealerships && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏎️ Vehicle Selection</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Luxury Sedans', 'Sports Cars', 'Electric Vehicles', 'SUVs & Coupes', 'Custom Orders', 'Trade-In Service'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💎 Automotive Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Exclusive vehicle selection',
                        'Premium financing options',
                        'Luxury trade-in valuations',
                        'Concierge delivery service',
                        'Extended warranty coverage',
                        'VIP after-sales support',
                        'Vehicle customization available',
                        'Award-winning service team'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Browse Inventory</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Schedule Test Drive</button>
                  </div>
                </div>
              )}

              {/* CAR HIRE & RENTALS SECTION */}
              {isCarHireAndRentals && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🚗 Rental Options</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Luxury Sedans', 'Premium SUVs', 'Sports Cars', 'Airport Delivery', 'Corporate Packages', 'Event Rentals'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Rental Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Premium vehicle fleet',
                        'Airport pickup & delivery',
                        'Flexible rental terms',
                        'Comprehensive insurance',
                        'Corporate discounts',
                        '24/7 roadside support',
                        'VIP concierge service',
                        'Personalized arrangements'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Reserve Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Fleet</button>
                  </div>
                </div>
              )}

              {/* SERVICE & REPAIRS SECTION */}
              {isServiceAndRepairs && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🔧 Service Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Maintenance & Servicing', 'Diagnostics & Repairs', 'Engine Work', 'Transmission Service', 'Warranty Work', 'Fleet Maintenance'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏆 Service Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert technicians certified',
                        'Advanced diagnostic equipment',
                        'Genuine replacement parts',
                        'Warranty guaranteed work',
                        'Luxury car specialization',
                        'Concierge service available',
                        'Transparent pricing',
                        'VIP service lounge'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Service</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Services</button>
                  </div>
                </div>
              )}

              {/* CAR DETAILING & MAINTENANCE SECTION */}
              {isCarDetailingAndMaintenance && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✨ Detailing Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Exterior Detailing', 'Interior Restoration', 'Paint Protection', 'Ceramic Coating', 'Fleet Programs', 'Preventive Care'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💅 Detailing Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Premium product quality',
                        'Expert detailing teams',
                        'Paint protection mastery',
                        'Ceramic coating expertise',
                        'Interior restoration',
                        'Fleet maintenance programs',
                        'Eco-friendly practices',
                        'Concierge pick-up service'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Detailing</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Packages</button>
                  </div>
                </div>
              )}

              {/* LIMOUSINES & EXOTIC CAR RENTALS SECTION */}
              {isLimoAndExotic && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">👑 VIP Fleet</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Limousines', 'Exotic Supercars', 'Rolls-Royce', 'Professional Chauffeurs', 'Events & Occasions', 'Corporate Travel'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎭 VIP Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Ultra-luxury fleet',
                        'Professional chauffeurs',
                        'VIP concierge service',
                        'Event specialization',
                        'Discretion & privacy',
                        'Premium amenities',
                        'Executive packages',
                        'White-glove service'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Reserve VIP Fleet</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Collection</button>
                  </div>
                </div>
              )}

              {/* MOTORCYCLE & ATV RENTALS SECTION */}
              {isMotorcycleAndATV && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏍️ Adventure Fleet</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Harley-Davidson', 'Adventure Bikes', 'ATVs & Quads', 'Guided Tours', 'Safety Training', 'Rental Packages'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⛰️ Adventure Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Premium motorcycle fleet',
                        'Latest model availability',
                        'Safety equipment included',
                        'Professional safety training',
                        'Guided adventure tours',
                        'Comprehensive insurance',
                        'Off-road terrain expertise',
                        'Full rental support'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Adventure</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore Tours</button>
                  </div>
                </div>
              )}

              {/* CROP & FARM SUPPLIERS SECTION */}
              {isCropAndFarmSuppliers && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🌾 Farm Supplies</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Quality Seeds', 'Fertilizers & Nutrients', 'Pesticides & Herbicides', 'Farming Equipment', 'Organic Options', 'Consultation Services'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🌿 Agricultural Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Premium quality seeds',
                        'Certified organic options',
                        'Expert agronomic advice',
                        'Bulk supply partnerships',
                        'Competitive pricing',
                        'Reliable delivery',
                        'Crop optimization support',
                        'Sustainable farming focus'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Order Supplies</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Get Consultation</button>
                  </div>
                </div>
              )}

              {/* LIVESTOCK SERVICES SECTION */}
              {isLivestockServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🐄 Livestock Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Veterinary Services', 'Breeding Consultation', 'Feed Formulation', 'Health Monitoring', 'Herd Management', 'Compliance Support'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏆 Livestock Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Certified veterinarians',
                        'Expert breeding guidance',
                        'Nutrition optimization',
                        'Health monitoring systems',
                        'Herd productivity focus',
                        'Disease prevention',
                        'Regulatory compliance',
                        'Professional management'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Schedule Visit</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Services</button>
                  </div>
                </div>
              )}

              {/* AGRI-TECH & MACHINERY SECTION */}
              {isAgritechAndMachinery && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">⚙️ Agricultural Technology</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Smart Farming Systems', 'Drone Services', 'GPS Technology', 'IoT Monitoring', 'Machinery Rental', 'Precision Equipment'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🤖 Technology Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Precision farming systems',
                        'Advanced IoT solutions',
                        'Drone technology expertise',
                        'GPS accuracy guaranteed',
                        'Smart monitoring dashboards',
                        'Equipment training provided',
                        'Sustainable farming focus',
                        'Yield optimization support'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Schedule Demo</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore Solutions</button>
                  </div>
                </div>
              )}

              {/* MINING SUPPLIERS SECTION */}
              {isMiningSuppliers && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">⛏️ Mining Supplies</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Safety Equipment', 'Drilling Materials', 'Blasting Supplies', 'Consumables', 'PPE & Workwear', 'Compliance Materials'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🛡️ Mining Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Certified safety standards',
                        'Quality assurance guaranteed',
                        'Quick delivery systems',
                        'Bulk supply discounts',
                        'Expert technical support',
                        'Compliance expertise',
                        'Reliable supply chain',
                        'Industry partnership focus'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Order Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Get Catalog</button>
                  </div>
                </div>
              )}

              {/* MINING EQUIPMENT & MACHINERY SECTION */}
              {isMiningEquipmentAndMachinery && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏗️ Mining Equipment</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Drilling Rigs', 'Excavators & Loaders', 'Crushers & Mills', 'Processing Equipment', 'Maintenance Service', 'Technical Support'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⚡ Equipment Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Advanced machinery fleet',
                        'Rental options available',
                        'Expert maintenance teams',
                        'Technical certification',
                        'Warranty programs',
                        'Downtime prevention',
                        'Safety compliance focus',
                        'Operational support'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">View Equipment</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Schedule Rental</button>
                  </div>
                </div>
              )}

              {/* INDUSTRIAL TOOLS & HEAVY MACHINERY SECTION */}
              {isIndustrialToolsAndMachinery && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🔩 Industrial Tools</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Manufacturing Equipment', 'Hydraulics & Compressors', 'Power Tools', 'Industrial Automation', 'Factory Equipment', 'Technical Support'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏭 Industrial Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Premium quality tools',
                        'Industrial-grade standards',
                        'Comprehensive warranty',
                        'Expert technical support',
                        'Competitive pricing',
                        'Fast shipping available',
                        'Replacement parts stock',
                        'Factory partnership'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Browse Catalog</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Request Quote</button>
                  </div>
                </div>
              )}

              {/* BARS & COCKTAIL LOUNGES SECTION */}
              {isBarsAndCocktailLounges && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🍸 Cocktail Experiences</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Craft Cocktails', 'Premium Spirits', 'Expert Mixology', 'Signature Drinks', 'Wine Selection', 'Live Jazz'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🥂 Cocktail Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Master mixologists',
                        'Rare spirits collection',
                        'Signature recipes',
                        'Premium ingredients',
                        'Expert bartenders',
                        'Elegant ambiance',
                        'Live entertainment',
                        'Sophisticated experience'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Reserve Table</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Menu</button>
                  </div>
                </div>
              )}

              {/* CLUBS & LOUNGES SECTION */}
              {isClubsAndLounges && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎉 Nightlife Experience</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['DJ Entertainment', 'VIP Suites', 'Dance Floor', 'Premium Service', 'Bottle Service', 'Lounge Areas'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">⭐ Premium Nightlife</h3>
                    <div className="space-y-2">
                      {[
                        'World-class DJs',
                        'State-of-the-art sound',
                        'Exclusive VIP access',
                        'Premium bottle service',
                        'Private booths',
                        'Dynamic atmosphere',
                        'Luxury experience',
                        'International standards'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book VIP</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Events</button>
                  </div>
                </div>
              )}

              {/* LIVE MUSIC & VENUES SECTION */}
              {isLiveMusicAndVenues && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎵 Live Entertainment</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Live Bands', 'International Artists', 'Acoustic Shows', 'Seated Areas', 'Standing Room', 'Premium Sound'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎤 Music Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'World-class acoustics',
                        'International acts',
                        'Local talent showcase',
                        'Premium seating',
                        'Full bar service',
                        'Professional production',
                        'Unforgettable atmosphere',
                        'Exceptional entertainment'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Get Tickets</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Calendar</button>
                  </div>
                </div>
              )}

              {/* THEATERS & CINEMAS SECTION */}
              {isTheatersAndCinemas && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎬 Entertainment Venues</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['IMAX Screens', 'Luxury Seating', 'Premium Concessions', 'Theater Productions', 'Comedy Shows', 'Gourmet Services'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎭 Entertainment Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'State-of-the-art technology',
                        'Luxury recliners',
                        'Premium concessions',
                        'Professional productions',
                        'Diverse programming',
                        'Excellent acoustics',
                        'Premium experience',
                        'World-class venue'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Showtimes</button>
                  </div>
                </div>
              )}

              {/* GAMING & VR CENTERS SECTION */}
              {isGamingAndVRCenters && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🕹️ Gaming & VR Experience</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['VR Experiences', 'Competitive Gaming', 'Esports Tournaments', 'Arcade Games', 'Latest Technology', 'Group Events'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎮 Gaming Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Cutting-edge VR technology',
                        'Professional gaming stations',
                        'Latest game titles',
                        'Competitive tournaments',
                        'Expert support staff',
                        'Immersive experiences',
                        'Arcade entertainment',
                        'Premium facilities'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Session</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Games</button>
                  </div>
                </div>
              )}

              {/* DANCE STUDIOS & PERFORMANCES SECTION */}
              {isDanceStudiosAndPerformances && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💃 Dance & Performance</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Contemporary Dance', 'Ballroom Classes', 'Live Performances', 'Hip-Hop', 'Ballet Training', 'Performance Space'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎭 Dance Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Professional instructors',
                        'Multiple dance styles',
                        'Regular performances',
                        'State-of-the-art studio',
                        'All skill levels',
                        'Recital opportunities',
                        'Experienced choreographers',
                        'World-class training'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Enroll Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Classes</button>
                  </div>
                </div>
              )}

              {/* MUSIC LESSONS & TEACHERS SECTION */}
              {isMusicLessonsAndTeachers && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎹 Music Instruction</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Piano Lessons', 'Guitar Instruction', 'Vocal Training', 'Drum Lessons', 'Recording Studio', 'All Ages'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎵 Music Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Certified instructors',
                        'Multiple instruments',
                        'All skill levels',
                        'Flexible scheduling',
                        'Classical & contemporary',
                        'Performance opportunities',
                        'Professional training',
                        'Music theory included'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Lesson</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn More</button>
                  </div>
                </div>
              )}

              {/* CONCIERGE SERVICES SECTION */}
              {isConciergeServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎩 Concierge Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Travel Arrangements', 'Event Planning', 'Dining Reservations', '24/7 Availability', 'Personal Shopping', 'VIP Access'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👑 Concierge Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Multilingual staff',
                        'White-glove service',
                        'Exclusive network',
                        'Personalized attention',
                        '24/7 availability',
                        'Discreet professionals',
                        'Luxury connections',
                        'Impeccable service'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Request Service</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn More</button>
                  </div>
                </div>
              )}

              {/* EXCLUSIVE EXPERIENCES SECTION */}
              {isExclusiveExperiences && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✨ Exclusive Experiences</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Private Safari', 'Helicopter Tours', 'Spa Retreats', 'Gourmet Dining', 'Yacht Charters', 'Resort Access'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🌟 Experience Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Curated experiences',
                        'Personalized itineraries',
                        'World-class venues',
                        'Expert guides',
                        'VIP treatment',
                        'Unforgettable moments',
                        'Premium accommodations',
                        'Bespoke service'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Experience</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore Packages</button>
                  </div>
                </div>
              )}

              {/* PERSONAL ASSISTANTS SECTION */}
              {isPersonalAssistants && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🤝 Personal Assistance</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Schedule Management', 'Event Coordination', 'Travel Planning', 'Household Admin', 'Personal Errands', 'Executive Support'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💼 Assistant Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Professional discretion',
                        'Expert management',
                        'Dedicated support',
                        'Proactive planning',
                        'Time optimization',
                        'Trusted partner',
                        'Seamless coordination',
                        'Premium service'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Hire Assistant</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn Services</button>
                  </div>
                </div>
              )}

              {/* LUXURY CLUBS & MEMBERSHIPS SECTION */}
              {isLuxuryClubsAndMemberships && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏛️ Luxury Membership</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Private Lounge', 'Concierge Access', 'Exclusive Events', 'Fine Dining', 'Spa Facilities', 'Networking'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💎 Membership Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Exclusive access',
                        'Premium facilities',
                        'Elite community',
                        'Business lounges',
                        'Global reciprocals',
                        'VIP privileges',
                        'Curated events',
                        'Luxury experience'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Apply Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Benefits</button>
                  </div>
                </div>
              )}

              {/* WINE TASTING & VINEYARDS SECTION */}
              {isWineTastingAndVineyards && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🍷 Wine Experiences</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Wine Tasting', 'Vineyard Tours', 'Sommelier Consul', 'Wine Education', 'Cellar Services', 'Pairing Menu'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🍾 Wine Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert sommeliers',
                        'Premium selection',
                        'Private tastings',
                        'Wine education',
                        'Vineyard access',
                        'Curated collections',
                        'Pairing expertise',
                        'Luxury experience'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Tasting</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Wines</button>
                  </div>
                </div>
              )}

              {/* GOLF & COUNTRY CLUBS SECTION */}
              {isGolfAndCountryClubs && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">⛳ Golf & Country Club</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Championship Course', 'Pro Lessons', 'Country Club', 'Fine Dining', 'Spa Services', 'Member Events'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏌️ Golf Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Championship course',
                        'Professional coaching',
                        'Pro shop services',
                        'Premium facilities',
                        'Fine dining',
                        'Luxury spa',
                        'Member networking',
                        'World-class experience'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Tee Time</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Membership Info</button>
                  </div>
                </div>
              )}

              {/* PERSONAL STYLING & WARDROBE CONSULTANTS SECTION */}
              {isPersonalStylingAndWardrobeConsultants && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">👗 Personal Styling</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Wardrobe Styling', 'Color Analysis', 'Personal Shopping', 'Luxury Brands', 'Image Consulting', 'Makeover Service'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Style Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Professional stylists',
                        'Luxury brand access',
                        'Personalized curation',
                        'Color expertise',
                        'Wardrobe management',
                        'Image transformation',
                        'Fashion guidance',
                        'Premium styling'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Consultation</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Services</button>
                  </div>
                </div>
              )}

              {/* BANKS & BRANCHES SECTION */}
              {isBanksAndBranches && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏦 Banking Excellence</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Private Banking', 'Wealth Management', 'Investment Services', 'Personal Banking', 'Digital Services', 'Premium Support'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💼 Premium Banking</h3>
                    <div className="space-y-2">
                      {[
                        'Relationship managers',
                        'Exclusive privileges',
                        'Personalized service',
                        'Competitive rates',
                        'Secure platform',
                        'Investment guidance',
                        'Global banking access',
                        'Premium experience'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Open Account</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn Services</button>
                  </div>
                </div>
              )}

              {/* LOAN PROVIDERS SECTION */}
              {isLoanProviders && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💰 Financing Solutions</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Personal Loans', 'Business Lending', 'Mortgages', 'Vehicle Finance', 'Fast Approval', 'Flexible Terms'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">📊 Lending Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Competitive rates',
                        'Fast processing',
                        'Flexible terms',
                        'Expert consultants',
                        'Transparent pricing',
                        'Personalized solutions',
                        'Rapid funding',
                        'Premium service'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Apply Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Get Quote</button>
                  </div>
                </div>
              )}

              {/* INSURANCE BROKERS SECTION */}
              {isInsuranceBrokers && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🛡️ Insurance Protection</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Life Insurance', 'Property Coverage', 'Business Protection', 'Auto Insurance', 'Risk Management', 'Claims Support'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Insurance Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert advisors',
                        'Comprehensive coverage',
                        'Competitive rates',
                        'Claims assistance',
                        'Tailored solutions',
                        'Risk assessment',
                        'Premium support',
                        'Peace of mind'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Get Quote</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Explore Plans</button>
                  </div>
                </div>
              )}

              {/* INVESTMENT & FINANCIAL ADVISORS SECTION */}
              {isInvestmentAndFinancialAdvisors && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📈 Wealth Strategy</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Portfolio Management', 'Investment Strategy', 'Retirement Planning', 'Wealth Optimization', 'Market Analysis', 'Asset Allocation'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💎 Advisory Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert advisors',
                        'Personalized strategy',
                        'Market insights',
                        'Risk management',
                        'Tax optimization',
                        'Proven results',
                        'Transparent approach',
                        'Long-term focus'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Schedule Consult</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Services</button>
                  </div>
                </div>
              )}

              {/* CRYPTOCURRENCY & BLOCKCHAIN SERVICES SECTION */}
              {isCryptoAndBlockchainServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">₿ Digital Assets</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Crypto Exchange', 'Blockchain Consulting', 'Digital Wallets', 'Trading Platform', 'Asset Management', 'Security Services'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🔐 Crypto Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Secure platform',
                        'Expert guidance',
                        'Advanced security',
                        'Real-time trading',
                        'Market insights',
                        'Digital education',
                        'Institutional grade',
                        'Innovation focused'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Start Trading</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn More</button>
                  </div>
                </div>
              )}

              {/* ESTATE PLANNING & WILLS SECTION */}
              {isEstatePlanningAndWills && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📋 Legacy Planning</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Estate Planning', 'Will Drafting', 'Trust Administration', 'Probate Services', 'Asset Protection', 'Family Planning'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏠 Planning Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert advisors',
                        'Legal expertise',
                        'Personalized planning',
                        'Asset protection',
                        'Tax efficiency',
                        'Family guidance',
                        'Comprehensive service',
                        'Peace of mind'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Consultation</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Services</button>
                  </div>
                </div>
              )}

              {/* TAX CONSULTANTS & ADVISORS SECTION */}
              {isTaxConsultantsAndAdvisors && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💵 Tax Strategy</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Tax Planning', 'Compliance Services', 'Returns Preparation', 'Audit Support', 'Corporate Tax', 'Tax Optimization'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Tax Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert CPAs',
                        'Strategic planning',
                        'Minimize liability',
                        'Maximize efficiency',
                        'Compliance focus',
                        'Audit expertise',
                        'Transparent service',
                        'Premium advisory'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Schedule Consultation</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn Services</button>
                  </div>
                </div>
              )}

              {/* BOUTIQUES & FASHION SECTION */}
              {isBoutiquesAndFashion && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">👗 Fashion Excellence</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Designer Collections', 'Bespoke Tailoring', 'Personal Styling', 'Exclusive Pieces', 'Accessories', 'Trend Selection'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Style Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Premium designer brands',
                        'Expert styling advice',
                        'Bespoke customization',
                        'Exclusive collections',
                        'Personal shopping service',
                        'Quality craftsmanship',
                        'Luxury experience',
                        'Fashion expertise'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Shop Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Browse Collections</button>
                  </div>
                </div>
              )}

              {/* HOME & DECOR STORES SECTION */}
              {isHomeAndDecorStores && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏠 Interior Excellence</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Luxury Furniture', 'Designer Pieces', 'Home Styling', 'Accessories', 'Wall Art', 'Custom Design'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎨 Design Luxury</h3>
                    <div className="space-y-2">
                      {[
                        'Interior design expertise',
                        'Premium furniture selection',
                        'Bespoke customization',
                        'Professional consultation',
                        'Quality craftsmanship',
                        'Exclusive collections',
                        'Timeless elegance',
                        'Luxury aesthetics'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Get Design Consult</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Collections</button>
                  </div>
                </div>
              )}

              {/* GROCERS & MARKETS SECTION */}
              {isGrocersAndMarkets && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🥘 Gourmet Selection</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Organic Produce', 'Gourmet Foods', 'Premium Selections', 'Fresh Items', 'Imported Goods', 'Convenience'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Quality Promise</h3>
                    <div className="space-y-2">
                      {[
                        'Premium sourcing',
                        'Fresh guarantee',
                        'Organic options',
                        'Gourmet selections',
                        'Expert curation',
                        'Quality assurance',
                        'Convenience service',
                        'Satisfaction guaranteed'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Shop Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Products</button>
                  </div>
                </div>
              )}

              {/* LUXURY PRODUCTS & GIFTS SECTION */}
              {isLuxuryProductsAndGifts && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💎 Premium Gifting</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Designer Gifts', 'Collectibles', 'Jewelry', 'Luxury Items', 'Custom Packaging', 'Concierge Service'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🎁 Luxury Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Exclusive collections',
                        'Premium jewelry',
                        'Collectible pieces',
                        'Bespoke gifts',
                        'Personalized service',
                        'Luxury packaging',
                        'Gift expertise',
                        'Concierge gifting'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Find Perfect Gift</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Browse Collections</button>
                  </div>
                </div>
              )}

              {/* ECO & SUSTAINABLE PRODUCTS SECTION */}
              {isEcoAndSustainableProducts && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🌿 Conscious Living</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Sustainable Fashion', 'Organic Products', 'Eco Home', 'Zero Waste', 'Ethical Goods', 'Green Living'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">♻️ Sustainability Promise</h3>
                    <div className="space-y-2">
                      {[
                        'Eco-friendly materials',
                        'Sustainable sourcing',
                        'Ethical production',
                        'Organic certification',
                        'Zero-waste options',
                        'Carbon conscious',
                        'Environmental impact',
                        'Green future focus'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Shop Eco</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn More</button>
                  </div>
                </div>
              )}

              {/* ONLINE MARKETPLACES SECTION */}
              {isOnlineMarketplaces && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🛒 Digital Shopping</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Premium Brands', 'Curated Selection', 'Fast Delivery', 'Secure Checkout', 'Exclusive Deals', 'Easy Returns'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">📱 E-Commerce Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Premium merchants',
                        'Curated products',
                        'Secure platform',
                        'Fast delivery',
                        'Easy checkout',
                        'Customer support',
                        'Exclusive offers',
                        'Buyer protection'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Start Shopping</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Browse Stores</button>
                  </div>
                </div>
              )}

              {/* ESTATE AGENTS SECTION */}
              {isEstateAgents && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏢 Real Estate Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Property Sales', 'Buyer Matching', 'Market Analysis', 'Estate Sales', 'Consultation', 'Transaction Support'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Agency Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert market knowledge',
                        'Premium property access',
                        'Personalized service',
                        'Negotiation expertise',
                        'Market analysis',
                        'Seamless transactions',
                        'Professional support',
                        'Exclusive listings'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Find Property</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Sell Property</button>
                  </div>
                </div>
              )}

              {/* PROPERTY RENTALS SECTION */}
              {isPropertyRentals && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🔑 Rental Excellence</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Short-Term Rentals', 'Long-Term Leasing', 'Luxury Apartments', 'Villas', 'Concierge Support', 'Flexible Terms'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏠 Rental Quality</h3>
                    <div className="space-y-2">
                      {[
                        'Premium properties',
                        'Flexible terms',
                        'Verified tenants',
                        'Full maintenance',
                        'Concierge service',
                        'Competitive rates',
                        'Professional management',
                        'Peace of mind'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Browse Rentals</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">List Property</button>
                  </div>
                </div>
              )}

              {/* COMMERCIAL PROPERTY SECTION */}
              {isCommercialProperty && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💼 Commercial Solutions</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Office Spaces', 'Retail Locations', 'Industrial Units', 'Leasing', 'Acquisition', 'Management'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏗️ Business Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Prime locations',
                        'Business solutions',
                        'Flexible leasing',
                        'Professional support',
                        'Market expertise',
                        'Growth opportunities',
                        'Comprehensive service',
                        'Strategic partnerships'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Find Space</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Lease Terms</button>
                  </div>
                </div>
              )}

              {/* PROPERTY MANAGEMENT & TENANTS SECTION */}
              {isPropertyManagementAndTenants && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📋 Management Excellence</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Tenant Relations', 'Maintenance', 'Financial Reporting', 'Rent Collection', 'Lease Admin', 'Property Optimization'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🔧 Tenant Quality</h3>
                    <div className="space-y-2">
                      {[
                        'Tenant screening',
                        'Lease management',
                        'Maintenance coordination',
                        'Rent collection',
                        'Financial reporting',
                        'Problem resolution',
                        'Professional oversight',
                        'Maximum returns'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Get Started</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn Services</button>
                  </div>
                </div>
              )}

              {/* LAND & PLOTS SECTION */}
              {isLandAndPlots && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🌍 Land Solutions</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Prime Plots', 'Development Land', 'Investment Analysis', 'Zoning Advice', 'Consulting', 'Development Potential'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏞️ Land Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Prime locations',
                        'Development potential',
                        'Investment guidance',
                        'Zoning expertise',
                        'Market analysis',
                        'Growth opportunities',
                        'Professional advice',
                        'Profitable returns'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Browse Plots</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Investment Info</button>
                  </div>
                </div>
              )}

              {/* LUXURY HOMES & VILLAS SECTION */}
              {isLuxuryHomesAndVillas && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">👑 Luxury Living</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Exclusive Villas', 'Estates', 'Architectural Homes', 'Bespoke Design', 'Premium Amenities', 'Luxury Features'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏰 Villa Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Exclusive properties',
                        'Architectural excellence',
                        'Bespoke design',
                        'Premium amenities',
                        'Luxury finishes',
                        'Strategic locations',
                        'Investment potential',
                        'Sophisticated living'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">View Villas</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Schedule Viewing</button>
                  </div>
                </div>
              )}

              {/* APARTMENTS & LOFTS SECTION */}
              {isApartmentsAndLofts && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏙️ Urban Residences</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Luxury Apartments', 'Designer Lofts', 'Urban Living', 'Premium Amenities', 'Contemporary Design', 'Prime Locations'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✨ Apartment Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Premium locations',
                        'Contemporary design',
                        'Luxury finishes',
                        'Premium amenities',
                        'Urban convenience',
                        'Security features',
                        'Exclusive living',
                        'Modern sophistication'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Browse Units</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Schedule Tour</button>
                  </div>
                </div>
              )}

              {/* REAL ESTATE SECTION */}
              {isRealEstate && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏠 Property Types</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {realEstateServices.propertyTypes.map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">📋 Services Offered</h3>
                    <div className="space-y-2">
                      {realEstateServices.services.map((svc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }} className="rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Award size={18} style={{ color: GOLD }} className="flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2">Professional Certifications</h4>
                        <div className="space-y-1">
                          {realEstateServices.certifications.map((cert, idx) => (
                            <p key={idx} className="text-xs text-gray-300">✓ {cert}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* HEALTH & MEDICAL SECTION */}
              {isHealth && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏥 Services & Consultations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">General Consultation</div>
                            <div className="text-xs text-gray-400">30-45 minutes</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">R350-600</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Follow-Up Visit</div>
                            <div className="text-xs text-gray-400">Ongoing care</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Emergency Service</div>
                            <div className="text-xs text-gray-400">24/7 availability</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Preventive Care</div>
                            <div className="text-xs text-gray-400">Wellness programs</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Packages</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👨‍⚕️ Medical Team</h3>
                    <div className="space-y-2">
                      {['Qualified Medical Practitioners', 'Registered Nurses', 'Specialist Doctors', 'Licensed Therapists', 'Experienced Staff', 'Compassionate Care'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">📋 Certifications & Accreditations</h3>
                    <div className="space-y-2">
                      {['HCPC Registered', 'Medical Board Certified', 'Insurance Approved', 'OHSA Compliant', 'Quality Assured'].map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Appointment
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      ✉️ Request Consultation
                    </button>
                  </div>
                </div>
              )}

              {/* MUNICIPAL SERVICES SECTION */}
              {isMunicipalServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🏛️ Municipal Excellence</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Permits & Licenses', 'Public Facilities', 'Community Programs', 'Civic Services', 'Administration', 'Public Inquiries'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Service Quality</h3>
                    <div className="space-y-2">
                      {[
                        'Streamlined processing',
                        'Expert guidance',
                        'Transparent procedures',
                        'Community focused',
                        'Professional service',
                        'Accessible services',
                        'Efficient support',
                        'Civic engagement'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Get Permit</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn Services</button>
                  </div>
                </div>
              )}

              {/* LICENSING & REGISTRATIONS SECTION */}
              {isLicensingAndRegistrations && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📋 Registration Services</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Vehicle Registration', 'Business Licenses', 'Professional Certs', 'Compliance Docs', 'Permit Processing', 'License Renewal'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Registration Excellence</h3>
                    <div className="space-y-2">
                      {[
                        'Expert guidance',
                        'Fast processing',
                        'Compliance assured',
                        'Document support',
                        'Professional advice',
                        'Easy renewal',
                        'Verified service',
                        'Authority backed'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Register Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Check Status</button>
                  </div>
                </div>
              )}

              {/* PUBLIC HEALTH SERVICES SECTION */}
              {isPublicHealthServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">⚕️ Health Excellence</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {['Vaccinations', 'Health Screenings', 'Disease Prevention', 'Health Education', 'Wellness Programs', 'Community Health'].map((type, idx) => (
                        <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-3 luxury-gradient">
                          <p className="text-gray-300 text-sm font-semibold">{type}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🏥 Health Quality</h3>
                    <div className="space-y-2">
                      {[
                        'Professional care',
                        'Preventive focus',
                        'Community support',
                        'Health education',
                        'Quality assured',
                        'Accessible service',
                        'Expert guidance',
                        'Wellness focused'
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Schedule Visit</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Learn Programs</button>
                  </div>
                </div>
              )}

              {/* SOFTWARE & DEVELOPMENT SECTION */}
              {isSoftwareDevelopment && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💻 Software Excellence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Custom Applications</h3>
                        <p className="text-xs opacity-80">Enterprise-grade solutions</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Cloud Infrastructure</h3>
                        <p className="text-xs opacity-80">Scalable architecture</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">API Development</h3>
                        <p className="text-xs opacity-80">RESTful & GraphQL</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Database Design</h3>
                        <p className="text-xs opacity-80">Performance optimized</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">DevOps Solutions</h3>
                        <p className="text-xs opacity-80">CI/CD pipelines</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Security & Compliance</h3>
                        <p className="text-xs opacity-80">Enterprise standards</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">Why Choose Us</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Veteran development team</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Agile methodology</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Continuous innovation</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> 24/7 support included</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> On-time delivery</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Scalable solutions</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Quality assurance</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Transparent communication</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Request Quote</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Portfolio</button>
                  </div>
                </div>
              )}

              {/* WEB & DESIGN STUDIOS SECTION */}
              {isWebAndDesignStudios && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎨 Digital Artistry</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Web Design</h3>
                        <p className="text-xs opacity-80">Responsive & modern</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">UX/UI Design</h3>
                        <p className="text-xs opacity-80">User-centered approach</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Brand Identity</h3>
                        <p className="text-xs opacity-80">Logo & visual systems</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">E-Commerce Design</h3>
                        <p className="text-xs opacity-80">Conversion optimized</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Interactive Elements</h3>
                        <p className="text-xs opacity-80">Animation & engagement</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Accessibility</h3>
                        <p className="text-xs opacity-80">WCAG compliant</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">Design Excellence</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Award-winning designers</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Pixel-perfect execution</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Mobile-first approach</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Performance focused</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> SEO optimized</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Future-proof tech</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Maintenance support</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Analytics ready</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Start Project</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">See Designs</button>
                  </div>
                </div>
              )}

              {/* DIGITAL MARKETING AGENCIES SECTION */}
              {isDigitalMarketingAgencies && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📈 Marketing Growth</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">SEO Optimization</h3>
                        <p className="text-xs opacity-80">Organic visibility</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">SEM Campaigns</h3>
                        <p className="text-xs opacity-80">Paid search mastery</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Social Media</h3>
                        <p className="text-xs opacity-80">Community building</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Content Marketing</h3>
                        <p className="text-xs opacity-80">Storytelling strategy</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Email Campaigns</h3>
                        <p className="text-xs opacity-80">Conversion focused</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Analytics & Reporting</h3>
                        <p className="text-xs opacity-80">Data insights</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">Campaign Excellence</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Proven ROI track record</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Data-driven strategies</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Multi-channel approach</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Expert strategists</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Rapid optimization</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Transparent reporting</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Industry expertise</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Results guaranteed</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Start Campaign</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Case Studies</button>
                  </div>
                </div>
              )}

              {/* PHOTOGRAPHY & VIDEOGRAPHY SECTION */}
              {isPhotographyAndVideography && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📸 Visual Storytelling</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Portrait Photography</h3>
                        <p className="text-xs opacity-80">Professional headshots</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Event Coverage</h3>
                        <p className="text-xs opacity-80">Premium experiences</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Cinematography</h3>
                        <p className="text-xs opacity-80">Cinema-grade quality</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Product Photography</h3>
                        <p className="text-xs opacity-80">E-commerce ready</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Post-Production</h3>
                        <p className="text-xs opacity-80">Professional editing</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Color Grading</h3>
                        <p className="text-xs opacity-80">Cinematic look</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">Luxury Production</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Award-winning photographers</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Premium equipment</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Fast turnaround</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Unlimited revisions</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Licensed music included</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Full rights included</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Travel available</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Backup coverage</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Book Session</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Portfolio</button>
                  </div>
                </div>
              )}

              {/* DRONE PHOTOGRAPHY & VIDEOGRAPHY SECTION */}
              {isDronePhotographyVideography && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🚁 Aerial Excellence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Aerial Photography</h3>
                        <p className="text-xs opacity-80">Breathtaking perspectives</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">4K Cinematography</h3>
                        <p className="text-xs opacity-80">Stunning footage</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Property Tours</h3>
                        <p className="text-xs opacity-80">Real estate showcase</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Construction Progress</h3>
                        <p className="text-xs opacity-80">Timelapse documentation</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Event Aerial Coverage</h3>
                        <p className="text-xs opacity-80">Unique perspectives</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Inspection Services</h3>
                        <p className="text-xs opacity-80">Professional reports</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">Certified Excellence</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Platinum-certified pilots</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Latest equipment</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Fully insured</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Day/night capability</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Fast editing delivery</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Regulatory compliant</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Custom flight paths</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Weather contingency</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Schedule Flight</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Footage</button>
                  </div>
                </div>
              )}

              {/* APP DEVELOPMENT & SOFTWARE HOUSES SECTION */}
              {isAppDevelopmentSoftwareHouses && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📱 App Innovation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">iOS Development</h3>
                        <p className="text-xs opacity-80">Swift expertise</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Android Development</h3>
                        <p className="text-xs opacity-80">Kotlin mastery</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Cross-Platform Apps</h3>
                        <p className="text-xs opacity-80">React Native & Flutter</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Backend Integration</h3>
                        <p className="text-xs opacity-80">Robust APIs</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">App Store Deployment</h3>
                        <p className="text-xs opacity-80">Approval optimized</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Maintenance & Updates</h3>
                        <p className="text-xs opacity-80">Ongoing support</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">Development Excellence</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Expert development team</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Agile delivery</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Quality testing</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> User-centric design</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Performance optimized</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Security hardened</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Scalable architecture</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> 24/7 support</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Start Project</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Apps</button>
                  </div>
                </div>
              )}

              {/* AI & DATA SCIENCE SERVICES SECTION */}
              {isAiAndDataScienceServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🤖 AI Intelligence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Machine Learning</h3>
                        <p className="text-xs opacity-80">Predictive models</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Data Analytics</h3>
                        <p className="text-xs opacity-80">Insights extraction</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Natural Language Processing</h3>
                        <p className="text-xs opacity-80">Text intelligence</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Computer Vision</h3>
                        <p className="text-xs opacity-80">Image recognition</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Recommendation Engines</h3>
                        <p className="text-xs opacity-80">Personalization</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Automation Solutions</h3>
                        <p className="text-xs opacity-80">Process optimization</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">AI Transformation</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> PhD-level expertise</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Cutting-edge research</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Enterprise deployment</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Data security</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Model explainability</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> ROI guaranteed</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Team training included</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Ongoing optimization</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Consult Now</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Cases</button>
                  </div>
                </div>
              )}

              {/* GAMING & ESPORTS SECTION */}
              {isGamingAndEsports && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎮 Gaming Excellence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Game Development</h3>
                        <p className="text-xs opacity-80">Unreal & Unity</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Game Design</h3>
                        <p className="text-xs opacity-80">Gameplay mechanics</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Esports Infrastructure</h3>
                        <p className="text-xs opacity-80">Tournament systems</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Multiplayer Networking</h3>
                        <p className="text-xs opacity-80">Low-latency servers</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">VR/AR Gaming</h3>
                        <p className="text-xs opacity-80">Immersive experiences</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Game Community</h3>
                        <p className="text-xs opacity-80">Player engagement</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">Gaming Excellence</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> AAA game developers</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Proven game titles</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Esports certified</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Community focused</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Competitive tournaments</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Streaming ready</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Cross-platform play</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Regular updates</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Start Game</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Join Tournament</button>
                  </div>
                </div>
              )}

              {/* VIRTUAL & AUGMENTED REALITY SERVICES SECTION */}
              {isVirtualAugmentedRealityServices && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🥽 XR Innovation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">VR Development</h3>
                        <p className="text-xs opacity-80">Immersive worlds</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">AR Applications</h3>
                        <p className="text-xs opacity-80">Real-world overlay</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Metaverse Platforms</h3>
                        <p className="text-xs opacity-80">Virtual economies</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Spatial Computing</h3>
                        <p className="text-xs opacity-80">3D interfaces</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">Interactive Design</h3>
                        <p className="text-xs opacity-80">User engagement</p>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <h3 className="font-semibold text-sm mb-2">XR Consulting</h3>
                        <p className="text-xs opacity-80">Strategy guidance</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">XR Excellence</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Pioneer XR developers</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Multi-platform VR/AR</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Enterprise solutions</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Latest hardware support</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Performance optimized</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> User training</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Support included</div>
                      <div className="flex items-center gap-2 text-sm"><span style={{ color: GOLD }}>✓</span> Future-ready tech</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Experience XR</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">View Demos</button>
                  </div>
                </div>
              )}

              {/* JOBS & CAREERS SECTION */}
              {(isJobListings || isJobSeekerProfiles || isRecruitmentHRServices || isInternshipsApprenticeships || isCareerCoachingGuidance) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💼 Career Excellence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div style={{ color: GOLD }} className="font-bold text-sm mb-3">🎯 Premium Placements</div>
                        <div className="space-y-2 text-xs">
                          <div><span style={{ color: GOLD }}>✓</span> Executive-level positions</div>
                          <div><span style={{ color: GOLD }}>✓</span> Verified candidates</div>
                          <div><span style={{ color: GOLD }}>✓</span> Industry expertise</div>
                          <div><span style={{ color: GOLD }}>✓</span> Salary transparency</div>
                          <div><span style={{ color: GOLD }}>✓</span> Success guarantee</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div style={{ color: GOLD }} className="font-bold text-sm mb-3">🚀 Career Development</div>
                        <div className="space-y-2 text-xs">
                          <div><span style={{ color: GOLD }}>✓</span> Coaching programs</div>
                          <div><span style={{ color: GOLD }}>✓</span> Skill advancement</div>
                          <div><span style={{ color: GOLD }}>✓</span> Mentorship access</div>
                          <div><span style={{ color: GOLD }}>✓</span> Pathway planning</div>
                          <div><span style={{ color: GOLD }}>✓</span> Exclusive networks</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div style={{ color: GOLD }} className="font-bold text-sm mb-3">👥 Talent Network</div>
                        <div className="space-y-2 text-xs">
                          <div><span style={{ color: GOLD }}>✓</span> Curated professionals</div>
                          <div><span style={{ color: GOLD }}>✓</span> Background verified</div>
                          <div><span style={{ color: GOLD }}>✓</span> Specialized screening</div>
                          <div><span style={{ color: GOLD }}>✓</span> Quality assurance</div>
                          <div><span style={{ color: GOLD }}>✓</span> Compliance ready</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div style={{ color: GOLD }} className="font-bold text-sm mb-3">📊 Results Track Record</div>
                        <div className="space-y-2 text-xs">
                          <div><span style={{ color: GOLD }}>✓</span> 95% placement rate</div>
                          <div><span style={{ color: GOLD }}>✓</span> 12-month retention</div>
                          <div><span style={{ color: GOLD }}>✓</span> ROI guaranteed</div>
                          <div><span style={{ color: GOLD }}>✓</span> Performance metrics</div>
                          <div><span style={{ color: GOLD }}>✓</span> Verified testimonials</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Find My Next Role</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Schedule Consultation</button>
                  </div>
                </div>
              )}

              {/* WINE & SPIRITS SECTION */}
              {(isPremiumWineHouses || isCraftDistilleries || isLuxuryCocktailBars || isWineTastingExperiences || isSpiritInvestment) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🍷 Luxury Spirits & Wine</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div style={{ color: GOLD }} className="font-bold text-sm mb-3">🏆 Premium Collections</div>
                        <div className="space-y-2 text-xs">
                          <div><span style={{ color: GOLD }}>✓</span> Curated rare vintages</div>
                          <div><span style={{ color: GOLD }}>✓</span> Investment-grade spirits</div>
                          <div><span style={{ color: GOLD }}>✓</span> Vintage portfolio management</div>
                          <div><span style={{ color: GOLD }}>✓</span> Authentication certified</div>
                          <div><span style={{ color: GOLD }}>✓</span> Exclusive access</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div style={{ color: GOLD }} className="font-bold text-sm mb-3">🥃 Craft Mastery</div>
                        <div className="space-y-2 text-xs">
                          <div><span style={{ color: GOLD }}>✓</span> Award-winning small-batch</div>
                          <div><span style={{ color: GOLD }}>✓</span> Artisanal distillery tours</div>
                          <div><span style={{ color: GOLD }}>✓</span> Master distiller sessions</div>
                          <div><span style={{ color: GOLD }}>✓</span> Tasting room access</div>
                          <div><span style={{ color: GOLD }}>✓</span> Collaborative releases</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div style={{ color: GOLD }} className="font-bold text-sm mb-3">🍸 Mixology Excellence</div>
                        <div className="space-y-2 text-xs">
                          <div><span style={{ color: GOLD }}>✓</span> World-class mixologists</div>
                          <div><span style={{ color: GOLD }}>✓</span> Bespoke creations</div>
                          <div><span style={{ color: GOLD }}>✓</span> Membership exclusive</div>
                          <div><span style={{ color: GOLD }}>✓</span> Private booth dining</div>
                          <div><span style={{ color: GOLD }}>✓</span> Celebrity pairings</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div style={{ color: GOLD }} className="font-bold text-sm mb-3">💎 Investment Portfolio</div>
                        <div className="space-y-2 text-xs">
                          <div><span style={{ color: GOLD }}>✓</span> Portfolio management</div>
                          <div><span style={{ color: GOLD }}>✓</span> Collector guidance</div>
                          <div><span style={{ color: GOLD }}>✓</span> Secure storage vault</div>
                          <div><span style={{ color: GOLD }}>✓</span> Insurance coordination</div>
                          <div><span style={{ color: GOLD }}>✓</span> Expert authentication</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${GOLD}` }} className="rounded-lg p-4">
                    <h3 style={{ color: GOLD }} className="font-bold mb-3">🌟 Sommelier Experiences</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2"><span style={{ color: GOLD }}>✓</span> Wine masterclasses</div>
                      <div className="flex items-center gap-2"><span style={{ color: GOLD }}>✓</span> Blind tasting events</div>
                      <div className="flex items-center gap-2"><span style={{ color: GOLD }}>✓</span> Vineyard tours</div>
                      <div className="flex items-center gap-2"><span style={{ color: GOLD }}>✓</span> Gourmet wine dinners</div>
                      <div className="flex items-center gap-2"><span style={{ color: GOLD }}>✓</span> Pairing consultations</div>
                      <div className="flex items-center gap-2"><span style={{ color: GOLD }}>✓</span> Sommelier certification prep</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button style={{ background: GOLD, color: PANEL_BLACK }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition">Explore Collection</button>
                    <button style={{ border: `2px solid ${GOLD}`, color: GOLD }} className="flex-1 py-3 rounded-lg font-bold text-sm hover:opacity-80 transition bg-transparent">Membership Details</button>
                  </div>
                </div>
              )}

              {/* AUTOMOTIVE SECTION */}
              {(business.category === 'AUTOMOTIVE' || (business.category || '').toLowerCase().includes('automotive')) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🚗 Vehicles & Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Daily Rental</div>
                            <div className="text-xs text-gray-400">Unlimited mileage</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R450/day</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Weekly Rate</div>
                            <div className="text-xs text-gray-400">Discounted pricing</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Service & Repairs</div>
                            <div className="text-xs text-gray-400">All vehicle types</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Detailing & Maintenance</div>
                            <div className="text-xs text-gray-400">Premium packages</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Packages</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">🚙 Vehicle Categories</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Sedan', 'SUV', 'Luxury', 'Sports', 'Van', 'Truck'].map((cat, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Full Insurance', 'Roadside Assistance', 'GPS Navigation', 'Free Delivery', 'Flexible Pickup', 'Professional Team', 'Warranty Coverage', 'Fuel Options'].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Vehicle
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      ✉️ Get Quote
                    </button>
                  </div>
                </div>
              )}

              {/* RETAIL & SHOPPING SECTION */}
              {(business.category === 'SHOPPING & RETAIL' || (business.category || '').toLowerCase().includes('retail') || (business.category || '').toLowerCase().includes('shopping')) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🛍️ Products & Services</h2>
                    <div className="space-y-2">
                      {['Premium Selection', 'Curated Collections', 'Exclusive Brands', 'Personal Shopping Service', 'Styling Consultations', 'Custom Orders', 'Gift Wrapping', 'Delivery Available'].map((svc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">💎 Categories</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Fashion', 'Home & Decor', 'Luxury Gifts', 'Accessories', 'Sustainable', 'Premium Brands'].map((cat, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-xs font-semibold">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Shopping Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Loyalty Rewards', 'Flexible Payment', 'Easy Returns', 'Free Delivery', 'Gift Cards', 'Exclusive Access', 'VIP Service', 'Online Ordering'].map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      🛒 Shop Now
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      ✉️ Inquire
                    </button>
                  </div>
                </div>
              )}

              {/* EDUCATION & SCHOOLS SECTION */}
              {(business.category === 'EDUCATION & SCHOOLS' || (business.category || '').toLowerCase().includes('education')) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">📚 Programs & Courses</h2>
                    <div className="space-y-2">
                      {['Full-Time Programs', 'Part-Time Classes', 'Online Learning', 'Certification Courses', 'Workshops', 'Corporate Training', 'Skill Development', 'Professional Development'].map((prog, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{prog}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👨‍🎓 Faculty & Expertise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Experienced Instructors', 'Industry Experts', 'Qualified Teachers', 'Certified Trainers', 'Mentorship Program', 'Expert Guidance'].map((faculty, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{faculty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Facilities & Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Modern Classrooms', 'Computer Labs', 'Library Access', 'Student Support', 'Career Services', 'Alumni Network'].map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Enroll Now
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      📋 Request Info
                    </button>
                  </div>
                </div>
              )}

              {/* FINANCIAL SERVICES SECTION */}
              {(business.category === 'FINANCE & MONEY SERVICES' || (business.category || '').toLowerCase().includes('finance')) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💰 Services & Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Personal Loans</div>
                            <div className="text-xs text-gray-400">Flexible terms</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Investment Planning</div>
                            <div className="text-xs text-gray-400">Wealth management</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Insurance Solutions</div>
                            <div className="text-xs text-gray-400">Comprehensive coverage</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Retirement Planning</div>
                            <div className="text-xs text-gray-400">Long-term growth</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👨‍💼 Expert Team</h3>
                    <div className="space-y-2">
                      {['Certified Financial Advisors', 'Expert Investment Managers', 'Licensed Insurance Brokers', 'Tax Specialists', 'Wealth Consultants'].map((expert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{expert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Compliance & Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['FSB Registered', 'POPIA Compliant', 'Bank-Level Security', 'Audited', 'Licensed', 'Insurance Approved'].map((compliance, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{compliance}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Consultation
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      📋 Request Proposal
                    </button>
                  </div>
                </div>
              )}

              {/* EVENTS & WEDDINGS SECTION */}
              {(business.category === 'EVENTS & WEDDINGS' || (business.category || '').toLowerCase().includes('event')) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🎉 Event Services & Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Wedding Planning</div>
                            <div className="text-xs text-gray-400">Full-service coordination</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Corporate Events</div>
                            <div className="text-xs text-gray-400">Conferences & gala</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Birthday & Parties</div>
                            <div className="text-xs text-gray-400">Celebrations & events</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R5,000</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Décor & Catering</div>
                            <div className="text-xs text-gray-400">Full event solutions</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Services Included</h3>
                    <div className="space-y-2">
                      {['Planning & Coordination', 'Venue Selection', 'Catering Services', 'Décor & Styling', 'Entertainment', 'Photography', 'Lighting & Sound', 'Event Day Management'].map((svc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Schedule Consultation
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      📋 View Packages
                    </button>
                  </div>
                </div>
              )}

              {/* SPORTS & FITNESS SECTION */}
              {(business.category === 'SPORTS, FITNESS & RECREATION' || (business.category || '').toLowerCase().includes('fitness') || (business.category || '').toLowerCase().includes('sport')) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">💪 Fitness Programs & Classes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Gym Membership</div>
                            <div className="text-xs text-gray-400">Full facility access</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R299</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Personal Training</div>
                            <div className="text-xs text-gray-400">One-on-one sessions</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Group Classes</div>
                            <div className="text-xs text-gray-400">Yoga, Pilates, etc</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Packages</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Nutrition Coaching</div>
                            <div className="text-xs text-gray-400">Dietary guidance</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ Facilities & Equipment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['State-of-Art Equipment', 'Swimming Pool', 'Sauna & Steam', 'Changing Rooms', 'Parking Available', 'Café/Smoothie Bar'].map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Join Now
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      🏃 Free Trial
                    </button>
                  </div>
                </div>
              )}

              {/* PETS & VETERINARY SECTION */}
              {(business.category === 'PETS & VETERINARY' || (business.category || '').toLowerCase().includes('pet') || (business.category || '').toLowerCase().includes('vet')) && (
                <div className="space-y-6">
                  <div>
                    <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">🐾 Pet Care Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Veterinary Consultation</div>
                            <div className="text-xs text-gray-400">Health checkups</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R250</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Grooming Service</div>
                            <div className="text-xs text-gray-400">Professional care</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">From R150</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Pet Boarding</div>
                            <div className="text-xs text-gray-400">Safe & comfortable</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">POA</div>
                        </div>
                      </div>
                      <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-4 luxury-gradient">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div style={{ color: GOLD }} className="font-bold text-sm">Training Programs</div>
                            <div className="text-xs text-gray-400">Behavior & obedience</div>
                          </div>
                          <div style={{ color: GOLD }} className="font-bold">Custom</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">✓ What We Treat</h3>
                    <div className="space-y-2">
                      {['Dogs & Cats', 'Small Animals', 'Exotic Pets', 'Vaccinations', 'Surgery', 'Dental Care', 'Emergency Services'].map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: GOLD }} className="text-sm font-bold mb-3 uppercase tracking-wider">👨‍⚕️ Experienced Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['Qualified Vets', 'Certified Groomers', 'Pet Trainers', 'Compassionate Care', 'Modern Facilities', 'Emergency Ready'].map((team, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <Check size={14} style={{ color: GOLD }} className="flex-shrink-0" />
                          <span>{team}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-700">
                    <button style={{ background: `linear-gradient(135deg, ${GOLD}, #d4af37)` }} className="flex-1 text-black font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                      📞 Book Appointment
                    </button>
                    <button style={{ borderColor: GOLD }} className="flex-1 border-2 text-white font-bold py-3 rounded-lg hover:bg-black/40 transition-all">
                      🐾 Emergency Call
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ============ GALLERY TAB ============ */}
            {activeTab === 'gallery' && images.length > 0 && (
              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden group" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }}>
                  <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
                    <img
                      src={images[galleryIdx]}
                      alt={`gallery-${galleryIdx}`}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  </div>

                  {/* Navigation arrows & dots (same as before) */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setGalleryIdx((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                        style={{ background: 'rgba(0,0,0,0.5)', border: `1.5px solid ${BORDER}`, backdropFilter: 'blur(2px)' }}
                      >
                        <ChevronLeft size={18} className="text-white" />
                      </button>
                      <button
                        onClick={() => setGalleryIdx((i) => (i + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                        style={{ background: 'rgba(0,0,0,0.5)', border: `1.5px solid ${BORDER}`, backdropFilter: 'blur(2px)' }}
                      >
                        <ChevronRight size={18} className="text-white" />
                      </button>
                      <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: '20px', backdropFilter: 'blur(2px)' }}
                      >
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setGalleryIdx(idx)}
                            className="cursor-pointer hover:scale-125"
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: idx === galleryIdx ? GOLD : 'rgba(255,255,255,0.4)',
                              border: 'none',
                              transition: 'all 200ms ease',
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div style={{ color: TEXT_MUTED, fontSize: '14px' }} className="text-center">
                  {galleryIdx + 1} / {images.length}
                </div>
              </div>
            )}

            {/* ============ SERVICES TAB ============ */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                {business.description && (
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-6 luxury-gradient">
                    <h3 style={{ color: GOLD, fontSize: '14px', fontWeight: 700, marginBottom: 12 }}>Overview</h3>
                    <p className="text-gray-200 leading-relaxed">{business.description}</p>
                  </div>
                )}
                {business.price && (
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-6 luxury-gradient">
                    <h3 style={{ color: GOLD, fontSize: '14px', fontWeight: 700, marginBottom: 12 }}>Pricing</h3>
                    <p style={{ color: GOLD }} className="text-lg font-bold">{business.price}</p>
                  </div>
                )}
              </div>
            )}

            {/* ============ REVIEWS TAB ============ */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-6 luxury-gradient">
                  <div className="flex items-center gap-3 mb-4">
                    <Star size={20} className="fill-[#C9A24D]" style={{ color: GOLD }} />
                    <div>
                      <div style={{ color: GOLD }} className="font-bold text-lg">{business.rating?.toFixed(1) || 'N/A'}★</div>
                      <div style={{ color: TEXT_MUTED }} className="text-sm">{business.reviewCount || 0} reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============ CONTACT TAB ============ */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                {business.openingHours && (
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-[#C9A24D]" />
                      <p className="text-gray-300 text-sm font-semibold">Hours: {business.openingHours}</p>
                    </div>
                  </div>
                )}
                {business.location && (
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-[#C9A24D]" />
                      <p className="text-gray-300 text-sm font-semibold">{business.location}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============ SIDEBAR - CONTACT CARD ============ */}
            <div className="lg:col-span-1">
              <div style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-xl p-6 sticky top-28 space-y-3">
                <h3 className="text-lg font-semibold text-white mb-4">✨ Get in Touch</h3>

                {/* Phone */}
                {business.phone && (
                  <a 
                    href={`tel:${business.phone}`}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-gray-200 transition-colors"
                  >
                    <Phone size={18} style={{ color: GOLD }} className="flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400">Call</div>
                      <div className="font-semibold text-sm">{business.phone}</div>
                    </div>
                  </a>
                )}

                {/* WhatsApp */}
                {business.phone && (
                  <button 
                    onClick={handleWhatsApp}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-gray-200 transition-colors"
                  >
                    <MessageCircle size={18} className="text-green-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400">WhatsApp</div>
                      <div className="font-semibold text-sm">Chat Now</div>
                    </div>
                  </button>
                )}

                {/* Email */}
                {business.email && (
                  <a 
                    href={`mailto:${business.email}`}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-gray-200 transition-colors"
                  >
                    <Mail size={18} style={{ color: GOLD }} className="flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400">Email</div>
                      <div className="font-semibold text-sm truncate">{business.email}</div>
                    </div>
                  </a>
                )}

                {/* Website Button */}
                {business.website && (
                  <a 
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-gray-200 transition-colors"
                  >
                    <Globe size={18} style={{ color: GOLD }} className="flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400">Website</div>
                      <div className="font-semibold text-sm">Visit</div>
                    </div>
                  </a>
                )}

                {/* Status Badge */}
                {business.isVerified && (
                  <div style={{ background: '#22c55e15', border: '1px solid #22c55e40' }} className="mt-4 p-3 rounded-lg">
                    <div className="text-green-400 text-sm font-semibold">✓ Verified Business</div>
                  </div>
                )}

                {/* Tier Badge */}
                {(business.tier === 'Platinum' || business.tier === 'Elite') && (
                  <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40` }} className="mt-4 p-3 rounded-lg">
                    <div style={{ color: GOLD }} className="text-sm font-semibold">♔ {business.tier.toUpperCase()}</div>
                  </div>
                )}

                {/* Similar Businesses Carousel */}
                <div className="mt-8 pt-6 border-t" style={{ borderColor: BORDER }}>
                  <h3 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">Similar Businesses</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {businesses
                      .filter(b => 
                        b.id !== business.id && 
                        (b.category === business.category || b.subcategory === business.subcategory)
                      )
                      .slice(0, 3)
                      .map((similar) => (
                        <div
                          key={similar.id}
                          onClick={() => navigate('business-detail', undefined, similar.id)}
                          className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform"
                          style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }}
                        >
                          <div className="flex gap-3 p-3">
                            <img src={similar.image} alt={similar.name} className="w-16 h-16 rounded object-cover" />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <p className="text-white font-semibold text-sm">{similar.name}</p>
                                <p style={{ color: TEXT_MUTED }} className="text-xs">{similar.location}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star size={12} className="fill-[#C9A24D]" style={{ color: GOLD }} />
                                <span style={{ color: GOLD }} className="text-xs font-bold">{similar.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* AI Business Matchmaker - For Platinum & Elite */}
                {(business.tier === 'Platinum' || business.tier === 'Elite') && (
                  <div className="mt-6">
                    <BusinessMatchmaker
                      businessName={business.name}
                      businessCategory={business.category}
                      businessArea={business.location}
                      allBusinesses={businesses}
                      onSelect={(id: string) => navigate('business-detail', undefined, id)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default BusinessDetailView;


