import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Business, Category, CategorySubcategories, MPUMALANGA_AREAS } from '../types';
import categoryConfig from './categoryConfig';
import SubcategoryCard from './SubcategoryCard';
import { ChevronDown, Settings } from 'lucide-react';

interface Props {
  categoryName: string; // e.g., 'FOOD & HOSPITALITY'
  subCategoryName: string; // e.g., 'FINE DINING'
  listings: Business[];
  heroImage?: string;
  navigate?: (view: string, category?: string, id?: string, subcategory?: string) => void;
  selectedId?: string | null;
  onSelectSubcategory?: (name: string) => void;
}

const PAGE_SIZE = 12;

// **MODULE-LEVEL CACHE**: Pre-compute all subcategory category detection logic
const getCategoryDetectionFlags = (subCategoryName: string, categoryKey?: Category) => {
  const isShisa = /^SHISANYAMA & BRAAI SPOTS$/.test(subCategoryName);
  const isCasual = /^CASUAL RESTAURANTS$/.test(subCategoryName);
  const isCafe = /^CAFÉS & COFFEE SHOPS$|^CAFES & COFFEE SHOPS$/.test(subCategoryName);
  const isBars = /^BARS & COCKTAIL LOUNGES$/.test(subCategoryName);
  const isBakery = /^BAKERIES & DESSERTS$/.test(subCategoryName);
  const isFoodTruck = /^FOOD TRUCKS & POP-UPS$/.test(subCategoryName);
  const isCatering = /^CATERING SERVICES$/.test(subCategoryName);
  const isFineDining = /^FINE DINING$/.test(subCategoryName);
  const isHairSalons = /^HAIR SALONS$/.test(subCategoryName);
  const isBarberShops = /^BARBER SHOPS$/.test(subCategoryName);
  const isNailBeauty = /^NAIL & BEAUTY STUDIOS$/.test(subCategoryName);
  const isCosmeticSurgery = /^COSMETIC SURGERY \/ AESTHETIC CLINICS$/.test(subCategoryName);
  const isNutritionists = /^NUTRITIONISTS & DIETICIANS$/.test(subCategoryName);
  const isSkincare = /^SKINCARE & BODY TREATMENTS$/.test(subCategoryName);
  const isSpa = /^SPAS & MASSAGE THERAPY$/.test(subCategoryName);
  const isHealth = categoryKey === Category.HealthAndMedical || /CLINIC|HEALTH|DENTIST|PHARMAC|VETERINARY|MENTAL|WELLNESS/i.test(subCategoryName);
  const isEducation = categoryKey === Category.EducationAndSkills || /SCHOOL|UNIVERSITY|COLLEGE|TUTOR|EDUCATION|TVET|VOCATIONAL/i.test(subCategoryName);
  const isFamily = categoryKey === Category.CommunityAndOrganisations || /FAMILY|CHILDCARE|COMMUNITY|CHILDREN|KIDS|CHURCH|MOSQUE|PLAYCENTRE|PLAY CENTRE|AFTERSCHOOL|RELIGIOUS/i.test(subCategoryName);
  const isRealEstate = categoryKey === Category.RealEstateAndProperty || /ESTATE|PROPERTY|RENTAL|COMMERCIAL|LAND|VILLA|APARTMENT|LOFT|AGENT/i.test(subCategoryName);
  const isTransport = categoryKey === Category.TransportChauffeursFleet || /FREIGHT|LOGISTICS|COURIER|DRIVER|TRANSFER|SHUTTLE|CHARTER|EV CHARGE|HELICOPTER/i.test(subCategoryName);
  const isFreightHaulage = /FREIGHT|HAULAGE/i.test(subCategoryName);
  const isLogisticsWarehouse = /LOGISTICS|WAREHOUSE|WAREHOUSING/i.test(subCategoryName);
  const isCourierDelivery = /COURIER|DELIVERY|EXPRESS/i.test(subCategoryName);
  const isPrivateDrivers = /PRIVATE DRIVERS|CHAUFFEURS/i.test(subCategoryName);
  const isAirportTransfers = /AIRPORT TRANSFER/i.test(subCategoryName);
  const isShuttleMinibus = /SHUTTLE|MINIBUS/i.test(subCategoryName);
  const isTourSightseeing = /TOUR|SIGHTSEEING/i.test(subCategoryName);
  const isEVCharging = /EV CHARGING/i.test(subCategoryName);
  const isHelicopter = /HELICOPTER/i.test(subCategoryName);
  const isFamilyServices = /FAMILY SERVICES/i.test(subCategoryName);
  const isChildcareSchools = /CHILDCARE|SCHOOLS/i.test(subCategoryName);
  const isCommunitycentre = /COMMUNITY CENTRE/i.test(subCategoryName);
  const isReligiouscentre = /RELIGIOUS/i.test(subCategoryName);
  const isPlaycentre = /PLAY CENTER/i.test(subCategoryName);
  const isAfterschool = /AFTER-SCHOOL/i.test(subCategoryName);
  const isFamilyentertainment = /FAMILY ENTERTAINMENT/i.test(subCategoryName);
  const isHotelsLodges = /HOTELS|LODGES/i.test(subCategoryName);
  const isGuestHousesBBs = /GUEST HOUSES|B&B/i.test(subCategoryName);
  const isSafarisGameReserves = /SAFARI|GAME RESERVE/i.test(subCategoryName);
  const isTourOperatorsGuides = /TOUR OPERATOR|GUIDE/i.test(subCategoryName);
  const isScenicRoutesAdventure = /SCENIC ROUTE|ADVENTURE TRAVEL/i.test(subCategoryName);
  const isYachtBoatCharters = /YACHT|BOAT CHARTER/i.test(subCategoryName);
  const isPrivateJetAirCharter = /PRIVATE JET|AIR CHARTER/i.test(subCategoryName);
  const isClinicSpecialists = /CLINIC|SPECIALIST/i.test(subCategoryName);
  const isDentists = /DENTIST/i.test(subCategoryName);
  const isPharmacies = /PHARMAC/i.test(subCategoryName);
  const isMentalHealthProfessionals = /MENTAL HEALTH/i.test(subCategoryName);
  const isWellnessRetreats = /WELLNESS|YOGA/i.test(subCategoryName);
  const isVeterinaryClinics = /VETERINAR|PETS & ANIMALS/i.test(subCategoryName);
  const isBuilders = /BUILDERS|CONTRACTORS/i.test(subCategoryName);
  const isPlumbingElectrical = /PLUMBING|ELECTRICAL/i.test(subCategoryName);
  const isRoofingRenovations = /ROOFING|RENOVATION/i.test(subCategoryName);
  const isInteriorDesigners = /INTERIOR|DECOR/i.test(subCategoryName);
  const isLandscapingGardening = /LANDSCAP|GARDEN/i.test(subCategoryName);
  const isSmartHome = /SMART HOME|AUTOMATION/i.test(subCategoryName);
  const isCustomFurniture = /FURNITURE|CRAFTSMAN/i.test(subCategoryName);
  const isPoolGarden = /POOL.*GARDEN|WATER.*GARDEN/i.test(subCategoryName);
  const isLegalServices = /LEGAL/i.test(subCategoryName);
  const isAccountingAndTax = /ACCOUNT|TAX/i.test(subCategoryName);
  const isConsultants = /CONSULT(?!.*PR)/i.test(subCategoryName);
  const isMarketingAndAdvertising = /MARKET|ADVERTIS/i.test(subCategoryName);
  const isTechAndIT = /TECH|IT SERVICES/i.test(subCategoryName);
  const isArchitectsDesigners = /ARCHITECT|(?:INTERIOR.*DESIGNER)/i.test(subCategoryName);
  const isBusinessBrokersAdvisors = /BROKER|INVESTMENT/i.test(subCategoryName);
  const isLifeCoachesAndMentors = /COACH|MENTOR/i.test(subCategoryName);
  const isTranslationAndLanguage = /TRANSLAT|LANGUAGE/i.test(subCategoryName);
  const isPRAndMedia = /\bPR\b|MEDIA/i.test(subCategoryName);
  const isLuxuryEVDealerships = /DEALERSHIP/i.test(subCategoryName);
  const isCarHireAndRentals = /HIRE|RENTAL/i.test(subCategoryName);
  const isServiceAndRepairs = /SERVICE|REPAIR/i.test(subCategoryName);
  const isCarDetailingAndMaintenance = /DETAIL|MAINTENANCE/i.test(subCategoryName);
  const isLimoAndExotic = /LIMOUSINE|EXOTIC/i.test(subCategoryName);
  const isMotorcycleAndATV = /MOTORCYCLE|ATV/i.test(subCategoryName);
  const isCropAndFarmSuppliers = /CROP|FARM SUPPLIER/i.test(subCategoryName);
  const isLivestockServices = /LIVESTOCK/i.test(subCategoryName);
  const isAgritechAndMachinery = /AGRI-TECH|AGRITECH/i.test(subCategoryName);
  const isMiningSuppliers = /MINING SUPPLIER/i.test(subCategoryName);
  const isMiningEquipmentAndMachinery = /MINING EQUIPMENT/i.test(subCategoryName);
  const isIndustrialToolsAndMachinery = /INDUSTRIAL/i.test(subCategoryName);
  const isBarsAndCocktailLounges = /BARS|COCKTAIL/i.test(subCategoryName);
  const isClubsAndLounges = /CLUBS|LOUNGES/i.test(subCategoryName);
  const isLiveMusicAndVenues = /LIVE MUSIC|VENUES/i.test(subCategoryName);
  const isTheatersAndCinemas = /THEATER|CINEMA/i.test(subCategoryName);
  const isGamingAndVRCenters = /GAMING|VR/i.test(subCategoryName);
  const isDanceStudiosAndPerformances = /DANCE|PERFORMANCE/i.test(subCategoryName);
  const isMusicLessonsAndTeachers = /MUSIC LESSON|MUSIC TEACHER/i.test(subCategoryName);
  const isConciergeServices = /CONCIERGE/i.test(subCategoryName);
  const isExclusiveExperiences = /EXCLUSIVE EXPERIENCE/i.test(subCategoryName);
  const isPersonalAssistants = /PERSONAL ASSISTANT/i.test(subCategoryName);
  const isLuxuryClubsAndMemberships = /LUXURY CLUB|MEMBERSHIP/i.test(subCategoryName);
  const isWineTastingAndVineyards = /WINE|VINEYARD/i.test(subCategoryName);
  const isGolfAndCountryClubs = /GOLF|COUNTRY CLUB/i.test(subCategoryName);
  const isPersonalStylingAndWardrobeConsultants = /STYLING|WARDROBE/i.test(subCategoryName);
  const isBanksAndBranches = /BANK|BRANCHES/i.test(subCategoryName);
  const isLoanProviders = /LOAN/i.test(subCategoryName);
  const isInsuranceBrokers = /INSURANCE/i.test(subCategoryName);
  const isInvestmentAndFinancialAdvisors = /INVESTMENT|FINANCIAL ADVISOR/i.test(subCategoryName);
  const isCryptoAndBlockchainServices = /CRYPTOCURRENCY|BLOCKCHAIN/i.test(subCategoryName);
  const isEstatePlanningAndWills = /ESTATE|WILLS/i.test(subCategoryName);
  const isTaxConsultantsAndAdvisors = /TAX/i.test(subCategoryName);
  const isBoutiquesAndFashion = /BOUTIQUE|FASHION/i.test(subCategoryName);
  const isHomeAndDecorStores = /HOME|DECOR/i.test(subCategoryName);
  const isGrocersAndMarkets = /GROCER|MARKET|CONVENIENCE/i.test(subCategoryName);
  const isLuxuryProductsAndGifts = /LUXURY PRODUCT|GIFT/i.test(subCategoryName);
  const isEcoAndSustainableProducts = /ECO|SUSTAINABLE/i.test(subCategoryName);
  const isOnlineMarketplaces = /ONLINE MARKETPLACE|MARKETPLACE/i.test(subCategoryName);
  const isEstateAgents = /ESTATE AGENT/i.test(subCategoryName);
  const isPropertyRentals = /PROPERTY RENTAL/i.test(subCategoryName);
  const isCommercialProperty = /COMMERCIAL PROPERTY/i.test(subCategoryName);
  const isPropertyManagementAndTenants = /PROPERTY MANAGEMENT|TENANT/i.test(subCategoryName);
  const isLandAndPlots = /LAND|PLOT/i.test(subCategoryName);
  const isLuxuryHomesAndVillas = /LUXURY HOME|VILLA/i.test(subCategoryName);
  const isApartmentsAndLofts = /APARTMENT|LOFT/i.test(subCategoryName);
  const isMunicipalServices = /MUNICIPAL/i.test(subCategoryName);
  const isLicensingAndRegistrations = /LICENSING|REGISTRATION/i.test(subCategoryName);
  const isPublicHealthServices = /PUBLIC HEALTH/i.test(subCategoryName);
  const isSoftwareDevelopment = /SOFTWARE|DEVELOPMENT/i.test(subCategoryName);
  const isWebAndDesignStudios = /WEB|DESIGN STUDIO/i.test(subCategoryName);
  const isDigitalMarketingAgencies = /DIGITAL MARKETING/i.test(subCategoryName);
  const isPhotographyAndVideography = /PHOTOGRAPHY|VIDEOGRAPHY/i.test(subCategoryName);
  const isDronePhotographyVideography = /DRONE/i.test(subCategoryName);
  const isAppDevelopmentSoftwareHouses = /APP DEVELOPMENT|SOFTWARE HOUSES/i.test(subCategoryName);
  const isAiAndDataScienceServices = /AI|DATA SCIENCE/i.test(subCategoryName);
  const isGamingAndEsports = /GAMING|ESPORT/i.test(subCategoryName);
  const isVirtualAugmentedRealityServices = /VIRTUAL|AUGMENTED REALITY|XR/i.test(subCategoryName);
  const isJobListings = /JOB LISTING/i.test(subCategoryName);
  const isJobSeekerProfiles = /JOB SEEKER|TALENT/i.test(subCategoryName);
  const isRecruitmentHRServices = /RECRUITMENT|HR/i.test(subCategoryName);
  const isInternshipsApprenticeships = /INTERNSHIP|APPRENTICESHIP/i.test(subCategoryName);
  const isCareerCoachingGuidance = /CAREER COACHING|CAREER GUIDANCE/i.test(subCategoryName);
  const isPremiumWineHouses = /PREMIUM WINE|WINE HOUSE/i.test(subCategoryName);
  const isCraftDistilleries = /CRAFT DISTILLER|ARTISANAL BREWERY/i.test(subCategoryName);
  const isLuxuryCocktailBars = /COCKTAIL/i.test(subCategoryName);
  const isWineTastingExperiences = /WINE TASTING|SOMMELIER/i.test(subCategoryName);
  const isSpiritInvestment = /SPIRIT INVESTMENT|COLLECTOR/i.test(subCategoryName);
  const isBeauty = categoryKey === Category.BeautyWellnessPersonalCare || /HAIR|BARBER|NAIL|SPA|SKINCARE|AESTHETIC|BEAUTY|WELLNESS|NUTRITION|COSMETIC/i.test(subCategoryName);

  return {
    isShisa, isCasual, isCafe, isBars, isBakery, isFoodTruck, isCatering, isFineDining, isHairSalons, isBarberShops,
    isNailBeauty, isCosmeticSurgery, isNutritionists, isSkincare, isSpa, isHealth, isEducation, isFamily, isRealEstate,
    isTransport, isFreightHaulage, isLogisticsWarehouse, isCourierDelivery, isPrivateDrivers, isAirportTransfers,
    isShuttleMinibus, isTourSightseeing, isEVCharging, isHelicopter, isFamilyServices, isChildcareSchools,
    isCommunitycentre, isReligiouscentre, isPlaycentre, isAfterschool, isFamilyentertainment, isHotelsLodges,
    isGuestHousesBBs, isSafarisGameReserves, isTourOperatorsGuides, isScenicRoutesAdventure, isYachtBoatCharters,
    isPrivateJetAirCharter, isClinicSpecialists, isDentists, isPharmacies, isMentalHealthProfessionals,
    isWellnessRetreats, isVeterinaryClinics, isBuilders, isPlumbingElectrical, isRoofingRenovations,
    isInteriorDesigners, isLandscapingGardening, isSmartHome, isCustomFurniture, isPoolGarden, isLegalServices,
    isAccountingAndTax, isConsultants, isMarketingAndAdvertising, isTechAndIT, isArchitectsDesigners,
    isBusinessBrokersAdvisors, isLifeCoachesAndMentors, isTranslationAndLanguage, isPRAndMedia,
    isLuxuryEVDealerships, isCarHireAndRentals, isServiceAndRepairs, isCarDetailingAndMaintenance,
    isLimoAndExotic, isMotorcycleAndATV, isCropAndFarmSuppliers, isLivestockServices, isAgritechAndMachinery,
    isMiningSuppliers, isMiningEquipmentAndMachinery, isIndustrialToolsAndMachinery, isBarsAndCocktailLounges,
    isClubsAndLounges, isLiveMusicAndVenues, isTheatersAndCinemas, isGamingAndVRCenters,
    isDanceStudiosAndPerformances, isMusicLessonsAndTeachers, isConciergeServices, isExclusiveExperiences,
    isPersonalAssistants, isLuxuryClubsAndMemberships, isWineTastingAndVineyards, isGolfAndCountryClubs,
    isPersonalStylingAndWardrobeConsultants, isBanksAndBranches, isLoanProviders, isInsuranceBrokers,
    isInvestmentAndFinancialAdvisors, isCryptoAndBlockchainServices, isEstatePlanningAndWills,
    isTaxConsultantsAndAdvisors, isBoutiquesAndFashion, isHomeAndDecorStores, isGrocersAndMarkets,
    isLuxuryProductsAndGifts, isEcoAndSustainableProducts, isOnlineMarketplaces, isEstateAgents,
    isPropertyRentals, isCommercialProperty, isPropertyManagementAndTenants, isLandAndPlots,
    isLuxuryHomesAndVillas, isApartmentsAndLofts, isMunicipalServices, isLicensingAndRegistrations,
    isPublicHealthServices, isSoftwareDevelopment, isWebAndDesignStudios, isDigitalMarketingAgencies,
    isPhotographyAndVideography, isDronePhotographyVideography, isAppDevelopmentSoftwareHouses,
    isAiAndDataScienceServices, isGamingAndEsports, isVirtualAugmentedRealityServices, isJobListings,
    isJobSeekerProfiles, isRecruitmentHRServices, isInternshipsApprenticeships, isCareerCoachingGuidance,
    isPremiumWineHouses, isCraftDistilleries, isLuxuryCocktailBars, isWineTastingExperiences,
    isSpiritInvestment, isBeauty,
  };
};

const SubcategoryPage: React.FC<Props> = ({ categoryName, subCategoryName, listings, heroImage, navigate, selectedId, onSelectSubcategory }) => {
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [location, setLocation] = useState<string>('All Areas');
  const [features, setFeatures] = useState<Record<string, boolean>>({ wifi: false, outdoor: false, veg: false, parking: false });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [extendedFeatures, setExtendedFeatures] = useState<Record<string, boolean>>({ wifi: false, outdoor: false, veg: false, parking: false, family: false, takeaway: false, pet: false, live: false, vip: false, smoking: false, event: false, buffet: false, privateChef: false, corporate: false, glutenFree: false, vegan: false, customOrders: false, cakes: false, chocolate: false, cuisine: false, dessert: false, streetFood: false, international: false, medicalAid: false, emergency: false, wheelchair: false, service24: false, onlineBooking: false, public: false, private: false, boarding: false, onlineLearning: false, accredited: false, nsc_ieb: false, tvet: false, higherEducation: false, scholarships: false, childFriendly: false, familyOwned: false, licensed: false, faithBased: false, afterSchoolCare: false, weekendActivities: false, educational: false, indoorPlay: false, outdoorPlay: false, forSale: false, toRent: false, commercial: false, residential: false, luxury: false, newDevelopment: false, petFriendly: false, furnished: false, unfurnished: false, secureEstate: false, swimmingPool: false, garden: false });
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`filters_${categoryName}`);
      if (saved) {
        const { query: q, minRating: mr, priceFilter: pf, location: loc, sortBy: sb } = JSON.parse(saved);
        if (q !== undefined) setQuery(q);
        if (mr !== undefined) setMinRating(mr);
        if (pf !== undefined) setPriceFilter(pf);
        if (loc !== undefined) setLocation(loc);
        if (sb !== undefined) setSortBy(sb);
      }
    } catch (e) {
      console.error('Failed to load saved filters', e);
    }
  }, [categoryName]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(`filters_${categoryName}`, JSON.stringify({ query, minRating, priceFilter, location, sortBy }));
    } catch (e) {
      console.error('Failed to save filters', e);
    }
  }, [query, minRating, priceFilter, location, sortBy, categoryName]);

  useEffect(() => {
    setPage(1);
  }, [categoryName, subCategoryName, query, minRating, priceFilter]);

  const categoryKey = useMemo(() => {
    const val = Object.values(Category).find((v) => v === categoryName);
    return val as Category | undefined;
  }, [categoryName]);

  // **CACHE FLAGS**: Call module-level function once per categoryKey + subCategoryName
  const flags = useMemo(() => getCategoryDetectionFlags(subCategoryName, categoryKey), [subCategoryName, categoryKey]);

  const {
    isShisa, isCasual, isCafe, isBars, isBakery, isFoodTruck, isCatering, isFineDining, isHairSalons, isBarberShops,
    isNailBeauty, isCosmeticSurgery, isNutritionists, isSkincare, isSpa, isHealth, isEducation, isFamily, isRealEstate,
    isTransport, isFreightHaulage, isLogisticsWarehouse, isCourierDelivery, isPrivateDrivers, isAirportTransfers,
    isShuttleMinibus, isTourSightseeing, isEVCharging, isHelicopter, isFamilyServices, isChildcareSchools,
    isCommunitycentre, isReligiouscentre, isPlaycentre, isAfterschool, isFamilyentertainment, isHotelsLodges,
    isGuestHousesBBs, isSafarisGameReserves, isTourOperatorsGuides, isScenicRoutesAdventure, isYachtBoatCharters,
    isPrivateJetAirCharter, isClinicSpecialists, isDentists, isPharmacies, isMentalHealthProfessionals,
    isWellnessRetreats, isVeterinaryClinics, isBuilders, isPlumbingElectrical, isRoofingRenovations,
    isInteriorDesigners, isLandscapingGardening, isSmartHome, isCustomFurniture, isPoolGarden, isLegalServices,
    isAccountingAndTax, isConsultants, isMarketingAndAdvertising, isTechAndIT, isArchitectsDesigners,
    isBusinessBrokersAdvisors, isLifeCoachesAndMentors, isTranslationAndLanguage, isPRAndMedia,
    isLuxuryEVDealerships, isCarHireAndRentals, isServiceAndRepairs, isCarDetailingAndMaintenance,
    isLimoAndExotic, isMotorcycleAndATV, isCropAndFarmSuppliers, isLivestockServices, isAgritechAndMachinery,
    isMiningSuppliers, isMiningEquipmentAndMachinery, isIndustrialToolsAndMachinery, isBarsAndCocktailLounges,
    isClubsAndLounges, isLiveMusicAndVenues, isTheatersAndCinemas, isGamingAndVRCenters,
    isDanceStudiosAndPerformances, isMusicLessonsAndTeachers, isConciergeServices, isExclusiveExperiences,
    isPersonalAssistants, isLuxuryClubsAndMemberships, isWineTastingAndVineyards, isGolfAndCountryClubs,
    isPersonalStylingAndWardrobeConsultants, isBanksAndBranches, isLoanProviders, isInsuranceBrokers,
    isInvestmentAndFinancialAdvisors, isCryptoAndBlockchainServices, isEstatePlanningAndWills,
    isTaxConsultantsAndAdvisors, isBoutiquesAndFashion, isHomeAndDecorStores, isGrocersAndMarkets,
    isLuxuryProductsAndGifts, isEcoAndSustainableProducts, isOnlineMarketplaces, isEstateAgents,
    isPropertyRentals, isCommercialProperty, isPropertyManagementAndTenants, isLandAndPlots,
    isLuxuryHomesAndVillas, isApartmentsAndLofts, isMunicipalServices, isLicensingAndRegistrations,
    isPublicHealthServices, isSoftwareDevelopment, isWebAndDesignStudios, isDigitalMarketingAgencies,
    isPhotographyAndVideography, isDronePhotographyVideography, isAppDevelopmentSoftwareHouses,
    isAiAndDataScienceServices, isGamingAndEsports, isVirtualAugmentedRealityServices, isJobListings,
    isJobSeekerProfiles, isRecruitmentHRServices, isInternshipsApprenticeships, isCareerCoachingGuidance,
    isPremiumWineHouses, isCraftDistilleries, isLuxuryCocktailBars, isWineTastingExperiences,
    isSpiritInvestment, isBeauty
  } = flags;

  const filtered = useMemo(() => {
    const base = listings.filter((b) => {
      // match category if provided
      const categoryMatch = categoryKey ? b.category === categoryKey : true;
      // If subCategoryName is provided, match it; otherwise show all in category
      const subMatch = subCategoryName && subCategoryName.trim() 
        ? (b.subcategory ? b.subcategory.toUpperCase() === subCategoryName.toUpperCase() : false)
        : true; // Show all if no subcategory specified
      return categoryMatch && subMatch;
    });
    return base.filter((b) => {
      if (query) {
        const q = query.toLowerCase();
        if (!(b.name.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q) || (b.tags || []).join(' ').toLowerCase().includes(q))) return false;
      }
      if (minRating && (b.rating || 0) < minRating) return false;
      if (priceFilter && b.priceLevel !== priceFilter) return false;
      if (location && location !== 'All Areas' && b.location && !b.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (extendedFeatures.wifi && !(b.tags || []).map(t => t.toLowerCase()).includes('wifi')) return false;
      if (extendedFeatures.outdoor && !(b.tags || []).map(t => t.toLowerCase()).includes('outdoor')) return false;
      if (extendedFeatures.veg && !(b.tags || []).map(t => t.toLowerCase()).includes('vegetarian')) return false;
      if (extendedFeatures.parking && !(b.tags || []).map(t => t.toLowerCase()).includes('parking')) return false;
      // Education-specific filters
      if (extendedFeatures.public && !((b.tags || []).map(t => t.toLowerCase()).includes('public'))) return false;
      if (extendedFeatures.private && !((b.tags || []).map(t => t.toLowerCase()).includes('private'))) return false;
      if (extendedFeatures.boarding && !((b.tags || []).map(t => t.toLowerCase()).includes('boarding') || (b.tags || []).map(t => t.toLowerCase()).includes('boarding available'))) return false;
      if (extendedFeatures.onlineLearning && !((b.tags || []).map(t => t.toLowerCase()).includes('online') || (b.tags || []).map(t => t.toLowerCase()).includes('online learning'))) return false;
      if (extendedFeatures.accredited && !((b.tags || []).map(t => t.toLowerCase()).includes('accredited') || (b.tags || []).map(t => t.toLowerCase()).includes('accreditation'))) return false;
      if (extendedFeatures.nsc_ieb && !((b.tags || []).map(t => t.toLowerCase()).includes('nsc') || (b.tags || []).map(t => t.toLowerCase()).includes('ieb') || (b.tags || []).map(t => t.toLowerCase()).includes('nsc / ieb') )) return false;
      if (extendedFeatures.tvet && !((b.tags || []).map(t => t.toLowerCase()).includes('tvet') || (b.tags || []).map(t => t.toLowerCase()).includes('vocational'))) return false;
      if (extendedFeatures.higherEducation && !((b.tags || []).map(t => t.toLowerCase()).includes('higher education') || (b.tags || []).map(t => t.toLowerCase()).includes('university') || (b.tags || []).map(t => t.toLowerCase()).includes('postgraduate') || (b.tags || []).map(t => t.toLowerCase()).includes('undergraduate'))) return false;
      if (extendedFeatures.scholarships && !((b.tags || []).map(t => t.toLowerCase()).includes('scholarship') || (b.tags || []).map(t => t.toLowerCase()).includes('scholarships'))) return false;
      if (extendedFeatures.family && !(b.tags || []).map(t => t.toLowerCase()).includes('family')) return false;
      if (extendedFeatures.takeaway && !(b.tags || []).map(t => t.toLowerCase()).includes('takeaway')) return false;
      if (extendedFeatures.pet && !(b.tags || []).map(t => t.toLowerCase()).includes('pet-friendly') && !(b.tags || []).map(t => t.toLowerCase()).includes('pet')) return false;
      if (extendedFeatures.live && !(b.tags || []).map(t => t.toLowerCase()).includes('live music') && !(b.tags || []).map(t => t.toLowerCase()).includes('live')) return false;
      if (extendedFeatures.vip && !(b.tags || []).map(t => t.toLowerCase()).includes('vip') && !(b.tags || []).map(t => t.toLowerCase()).includes('vip lounges') && !(b.tags || []).map(t => t.toLowerCase()).includes('vip lounge')) return false;
      if (extendedFeatures.smoking && !(b.tags || []).map(t => t.toLowerCase()).includes('smoking') && !(b.tags || []).map(t => t.toLowerCase()).includes('smoking section')) return false;
      if (extendedFeatures.event && !((b.tags || []).map(t => t.toLowerCase()).includes('wedding') || (b.tags || []).map(t => t.toLowerCase()).includes('corporate') || (b.tags || []).map(t => t.toLowerCase()).includes('private') || (b.tags || []).map(t => t.toLowerCase()).includes('event'))) return false;
      if (extendedFeatures.buffet && !(b.tags || []).map(t => t.toLowerCase()).includes('buffet')) return false;
      if (extendedFeatures.privateChef && !((b.tags || []).map(t => t.toLowerCase()).includes('private chef') || (b.tags || []).map(t => t.toLowerCase()).includes('privatechef') || (b.tags || []).map(t => t.toLowerCase()).includes('private'))) return false;
      if (extendedFeatures.corporate && !((b.tags || []).map(t => t.toLowerCase()).includes('corporate') || (b.tags || []).map(t => t.toLowerCase()).includes('corporate packages'))) return false;
      // Bakery specific filters
      if (extendedFeatures.glutenFree && !((b.tags || []).map(t => t.toLowerCase()).includes('gluten-free') || (b.tags || []).map(t => t.toLowerCase()).includes('gluten'))) return false;
      if (extendedFeatures.vegan && !((b.tags || []).map(t => t.toLowerCase()).includes('vegan') || (b.tags || []).map(t => t.toLowerCase()).includes('vegan options'))) return false;
      if (extendedFeatures.customOrders && !((b.tags || []).map(t => t.toLowerCase()).includes('custom orders') || (b.tags || []).map(t => t.toLowerCase()).includes('custom'))) return false;
      if (extendedFeatures.cakes && !((b.tags || []).map(t => t.toLowerCase()).includes('cakes & pastries') || (b.tags || []).map(t => t.toLowerCase()).includes('cakes') || (b.tags || []).map(t => t.toLowerCase()).includes('pastries'))) return false;
      if (extendedFeatures.chocolate && !((b.tags || []).map(t => t.toLowerCase()).includes('chocolate specialties') || (b.tags || []).map(t => t.toLowerCase()).includes('chocolates') || (b.tags || []).map(t => t.toLowerCase()).includes('chocolate'))) return false;
      // Food truck filters
      if (extendedFeatures.dessert && !((b.tags || []).map(t => t.toLowerCase()).includes('dessert') || (b.tags || []).map(t => t.toLowerCase()).includes('dessert specialties') || (b.tags || []).map(t => t.toLowerCase()).includes('dessert truck'))) return false;
      if (extendedFeatures.streetFood && !((b.tags || []).map(t => t.toLowerCase()).includes('street food') || (b.tags || []).map(t => t.toLowerCase()).includes('street'))) return false;
      if (extendedFeatures.international && !((b.tags || []).map(t => t.toLowerCase()).includes('international') || (b.tags || []).map(t => t.toLowerCase()).includes('international cuisine'))) return false;
      // Health-specific filters
      if (extendedFeatures.medicalAid && !((b.tags || []).map(t => t.toLowerCase()).includes('medical aid') || (b.tags || []).map(t => t.toLowerCase()).includes('medical aid accepted') || (b.tags || []).map(t => t.toLowerCase()).includes('medical-aid'))) return false;
      if (extendedFeatures.emergency && !((b.tags || []).map(t => t.toLowerCase()).includes('emergency') || (b.tags || []).map(t => t.toLowerCase()).includes('emergency services'))) return false;
      if (extendedFeatures.wheelchair && !((b.tags || []).map(t => t.toLowerCase()).includes('wheelchair') || (b.tags || []).map(t => t.toLowerCase()).includes('wheelchair access') || (b.tags || []).map(t => t.toLowerCase()).includes('accessible'))) return false;
      if (extendedFeatures.service24 && !((b.tags || []).map(t => t.toLowerCase()).includes('24-hour') || (b.tags || []).map(t => t.toLowerCase()).includes('24 hour') || (b.tags || []).map(t => t.toLowerCase()).includes('24/7') || (b.tags || []).map(t => t.toLowerCase()).includes('open 24'))) return false;
      if (extendedFeatures.onlineBooking && !((b.tags || []).map(t => t.toLowerCase()).includes('online booking') || (b.tags || []).map(t => t.toLowerCase()).includes('book online') || (b.tags || []).map(t => t.toLowerCase()).includes('online booking available'))) return false;
      return true;
    });
  }, [listings, categoryKey, subCategoryName, query, minRating, priceFilter]);

  // Default curated datasets for the landing (when no subcategory & no filters)
  const featuredFoodListings = useMemo(() => {
    // enforce category filtering
    return listings.filter(l => l.category === categoryKey && (l.isPlatinum || l.isElite)).slice(0, 8);
  }, [listings, categoryKey]);

  const popularFoodListings = useMemo(() => {
    return listings.filter(l => l.category === categoryKey).slice().sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 12);
  }, [listings, categoryKey]);

  const elitePlatinumListings = useMemo(() => {
    return listings.filter(l => l.category === categoryKey && (l.isPlatinum || l.isElite)).slice(0, 4);
  }, [listings, categoryKey]);

  // Determine whether any filters are active
  const hasActiveFilters = useMemo(() => {
    if (query) return true;
    if (minRating && minRating > 0) return true;
    if (priceFilter) return true;
    if (location && location !== 'All Areas') return true;
    if (Object.values(features || {}).some(Boolean)) return true;
    if (Object.values(extendedFeatures || {}).some(Boolean)) return true;
    return false;
  }, [query, minRating, priceFilter, location, features, extendedFeatures]);

  const hasSelectedSubcategory = Boolean(subCategoryName && subCategoryName.trim());

  const isDefaultView = !hasSelectedSubcategory && !hasActiveFilters;

  const listingsToShow = isDefaultView ? popularFoodListings : filtered;

  const sortedListings = useMemo(() => {
    const sorted = [...listingsToShow];
    if (sortBy === 'rating') {
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
      return sorted.reverse();
    } else if (sortBy === 'price-asc') {
      const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
      return sorted.sort((a, b) => (priceOrder[a.priceLevel as keyof typeof priceOrder] || 0) - (priceOrder[b.priceLevel as keyof typeof priceOrder] || 0));
    } else if (sortBy === 'price-desc') {
      const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
      return sorted.sort((a, b) => (priceOrder[b.priceLevel as keyof typeof priceOrder] || 0) - (priceOrder[a.priceLevel as keyof typeof priceOrder] || 0));
    }
    return sorted;
  }, [listingsToShow, sortBy]);

  const visible = useMemo(() => sortedListings.slice(0, page * PAGE_SIZE), [sortedListings, page]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && visible.length < sortedListings.length) {
          setPage((p) => p + 1);
        }
      });
    });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [sortedListings.length, visible.length]);

  const related = categoryKey ? CategorySubcategories[categoryKey] || [] : [];

  const config = categoryKey ? categoryConfig[categoryKey] : undefined;

  const heroTagline = useMemo(() => isShisa
    ? 'Savor Mpumalanga’s best shisanyama & braai spots, curated for authentic local flavor.'
    : isCasual
    ? 'Enjoy Mpumalanga’s finest casual dining spots – relaxed settings, delicious flavors, and a curated experience for every taste.'
    : isCafe
    ? 'Savor the finest cafés and coffee experiences – from cozy artisanal spots to chic urban coffee bars, curated for every coffee lover.'
    : isBars
    ? 'Sip, unwind, and experience Mpumalanga’s most exclusive bars and cocktail lounges – curated for the discerning night owl.'
    : isBakery
    ? 'Indulge in the region’s finest baked goods and desserts – curated for the sweet-toothed connoisseur.'
    : isFoodTruck
    ? 'Discover the region’s trendiest food trucks and pop-up culinary experiences – curated for the adventurous palate.'
    : isCatering
    ? 'Exceptional catering services for weddings, corporate events, and private gatherings – curated for the discerning palate.'
    : isHairSalons
    ? 'Discover Mpumalanga\'s premier hair salons – expert stylists, luxury treatments, and transformative care for every hair type.'
    : isBarberShops
    ? 'Experience precision barbering and elite grooming – from classic cuts to signature styles, curated for the discerning gentleman.'
    : isNailBeauty
    ? 'Indulge in luxury nail and beauty studios – manicures, pedicures, lashes, brows, and artisan treatments, curated for your glow.'
    : isCosmeticSurgery
    ? 'Premier cosmetic surgery and aesthetic clinics – board-certified surgeons delivering transformative procedures and non-invasive treatments.'
    : isNutritionists
    ? 'Expert nutritionists and registered dietitians providing personalized wellness plans, clinical nutrition therapy, and specialized dietary guidance across the Lowveld.'
    : isSkincare
    ? 'Luxurious skincare and body treatments – facials, peels, massages, and rejuvenation therapies for radiant, healthy skin.'
    : isSpa
    ? 'Premium spa and massage therapy – world-class wellness treatments, relaxation rituals, and rejuvenation experiences in serene settings.'
    : isHealth
    ? (config?.title || 'Discover trusted healthcare providers, premium clinics, and specialist care across the Lowveld.')
    : isEducation
    ? (config?.title || 'Discover trusted schools, universities, colleges and education providers shaping the future of the Lowveld.')
    : isFamily
    ? (config?.title || 'Discover trusted family services, childcare, community spaces and kid-friendly experiences across the Lowveld.')
    : isRealEstate
    ? (config?.title || 'Discover premium homes, rentals, commercial properties and land across the Lowveld.')
    : isFreightHaulage
    ? 'Industrial-grade freight, bulk transport & specialized haulage — verified operators with modern fleets, certified drivers & full insurance coverage.'
    : isLogisticsWarehouse
    ? 'Complete logistics & warehousing solutions — climate-controlled facilities, real-time tracking, inventory management & customs expertise.'
    : isCourierDelivery
    ? 'Fast, secure courier & same-day delivery services — tracked shipments, insured parcels & professional handling across the Lowveld.'
    : isPrivateDrivers
    ? 'Executive chauffeur & private driver services — professional, discreet & fully insured. VIP transfers, airport liaison, hourly charters & event transport.'
    : isAirportTransfers
    ? 'Reliable airport transfer services with flight monitoring, meet & greet, and punctual pickups at Kruger Mpumalanga International Airport.'
    : isShuttleMinibus
    ? 'Group shuttle & minibus services for resorts, lodges, corporate transfers and event transport across the Lowveld.'
    : isTourSightseeing
    ? 'Curated sightseeing tours with private guides, luxury vehicles, and custom itineraries showcasing Mpumalanga\'s natural beauty.'
    : isEVCharging
    ? 'Public EV charging stations across the Lowveld — fast charging, convenient payment and shelter for electric vehicle owners.'
    : isHelicopter
    ? 'Luxury helicopter charters and scenic flights over Blyde Canyon and the Lowveld. VIP transfers and bespoke routes available.'
    : isTransport
    ? 'Freight, courier, executive transport, warehousing and specialised logistics — verified, insured and operationally ready.'
    : isBeauty
    ? (config?.title || 'Premium salons, barbers, spas and beauty professionals delivering exceptional personal care across the Lowveld.')
    : isJobListings
    ? 'Discover exclusive executive positions and verified job placements - curated career opportunities for accomplished professionals.'
    : isJobSeekerProfiles
    ? 'Access premium talent networks featuring vetted professionals, MVAs, and industry experts ready for career advancement.'
    : isRecruitmentHRServices
    ? 'Partner with elite recruitment specialists providing executive search, staffing, and organizational development services across the Lowveld.'
    : isInternshipsApprenticeships
    ? 'Premium internship and apprenticeship programs - accelerate your career through mentorship, skill-building, and direct placement pathways.'
    : isCareerCoachingGuidance
    ? 'Elite career coaching and professional development - from C-suite mentoring to interview coaching by certified experts.'
    : isPremiumWineHouses
    ? 'Curate your luxury wine collection - rare vintages, investment-grade spirits, and exclusive access to the Lowveld finest wine houses.'
    : isCraftDistilleries
    ? 'Discover award-winning craft distilleries and artisanal breweries - small-batch spirits and distillery experiences from master distillers.'
    : isLuxuryCocktailBars
    ? 'World-class mixology at Mpumalanga most exclusive cocktail lounges - bespoke creations by award-winning mixologists, membership privileges, private booths.'
    : isWineTastingExperiences
    ? 'Premium wine masterclasses and sommelier-led experiences - blind tastings, vineyard tours, wine dinners, and expert certification prep.'
    : isSpiritInvestment
    ? 'Investment-grade spirits and collector vault services - portfolio management, authentication, secure storage, and investment advisory by experts.'
    : isMunicipalServices
    ? 'Premier municipal services and government facilities - licensing, permits, public health, and administrative services across Mpumalanga.'
    : isLicensingAndRegistrations
    ? 'Expedited licensing and registration services - vehicle licensing, business registration, and compliance assistance from certified operators.'
    : isPublicHealthServices
    ? 'Comprehensive public health services and medical facilities - vaccination clinics, health screening, disease prevention, and community wellness programs.'
    : isSoftwareDevelopment
    ? 'Cutting-edge software development agencies - custom applications, enterprise solutions, and bespoke digital transformation by expert developers.'
    : isWebAndDesignStudios
    ? 'Premier web design and digital studios - responsive websites, UX/UI design, e-commerce platforms, and digital strategy by award-winning designers.'
    : isDigitalMarketingAgencies
    ? 'Elite digital marketing agencies - SEO, social media, content strategy, paid advertising, and brand amplification by certified specialists.'
    : isPhotographyAndVideography
    ? 'Professional photography and videography services - corporate shoots, events, product photography, and cinematic content by acclaimed creatives.'
    : isDronePhotographyVideography
    ? 'Drone photography and aerial videography services - stunning aerial perspectives for events, real estate, surveys, and corporate projects.'
    : isAppDevelopmentSoftwareHouses
    ? 'Bespoke app development and software houses - iOS/Android apps, SaaS platforms, and digital solutions by experienced development teams.'
    : isAiAndDataScienceServices
    ? 'AI and data science consultancy - machine learning solutions, predictive analytics, data strategy, and AI implementation by specialist teams.'
    : isGamingAndEsports
    ? 'Gaming studios and esports venues - game development, esports tournaments, streaming facilities, and competitive gaming experiences.'
    : isVirtualAugmentedRealityServices
    ? 'Immersive VR and AR experiences - virtual events, training simulations, interactive installations, and cutting-edge extended reality solutions.'
    : isFamilyServices
    ? 'Premier family services and childcare facilities - tutoring, nanny services, family counseling, and comprehensive child development programs.'
    : isChildcareSchools
    ? 'Top-rated educational institutions - schools, universities, colleges, and specialized education providers shaping young minds in Mpumalanga.'
    : isHotelsLodges
    ? 'Luxury hotels and lodges - 5-star accommodations, world-class amenities, fine dining, and unforgettable hospitality experiences.'
    : isSafarisGameReserves
    ? 'Premier game reserves and safari lodges - exclusive wildlife experiences, guided game drives, and luxury bush accommodations in pristine reserves.'
    : isGolfAndCountryClubs
    ? 'Elite golf courses and country clubs - championship fairways, private memberships, fine dining, and prestigious golf experiences.'
    : isPersonalStylingAndWardrobeConsultants
    ? 'Executive personal styling and wardrobe consultancy - bespoke fashion curation, image consulting, and luxury styling by expert stylists.'
    : isBanksAndBranches
    ? 'Premier banking institutions - full-service financial solutions, wealth management, investment services, and personalized banking.'
    : isInvestmentAndFinancialAdvisors
    ? 'Elite investment and financial advisors - portfolio management, wealth advisory, investment planning, and financial strategy by certified professionals.'
    : isBoutiquesAndFashion
    ? 'Luxury boutiques and fashion houses - exclusive designer collections, haute couture, and premium fashion retail from world-renowned brands.'
    : isEstateAgents
    ? 'Premier real estate agencies - luxury property sales, exclusive listings, land development, and investment property services.'
    : isLuxuryHomesAndVillas
    ? 'Exclusive luxury homes and villas - high-end residential estates, architectural masterpieces, and premium properties with premium amenities.'
    : isLegalServices
    ? 'Elite legal services and law firms - corporate law, litigation, property law, and specialized legal advisory by experienced attorneys.'
    : isAccountingAndTax
    ? 'Premier accounting and tax services - financial audits, tax planning, bookkeeping, and comprehensive accounting by certified professionals.'
    : isConsultants
    ? 'Business consulting firms - strategic consulting, management advisory, organizational development, and business transformation services.'
    : isTechAndIT
    ? 'Information technology services - IT infrastructure, system administration, network security, and technology solutions for businesses.'
    : isClinicSpecialists
    ? 'Premier medical clinics and specialists - world-class healthcare, specialist doctors, advanced diagnostics, and cutting-edge medical treatments.'
    : isDentists
    ? 'Elite dental clinics - cosmetic dentistry, implants, orthodontics, and comprehensive dental care by experienced dentists.'
    : isWellnessRetreats
    ? 'Luxury wellness retreats and yoga centers - holistic wellness programs, spa treatments, yoga, and rejuvenation experiences.'
    : isHotelsLodges
    ? 'Luxury accommodations - 5-star hotels, boutique lodges, and premium stays with exceptional service across Mpumalanga.'
    : 'Discover the most exclusive restaurants, curated for the discerning palate.', [flags]);

  const heroSearchPlaceholder = useMemo(() => isShisa
    ? 'Search shisanyama, braai spots, or locations...'
    : isCasual
    ? 'Search casual restaurants, cuisines, or locations...'
    : isCafe
    ? 'Search cafés, coffee shops, or locations...'
    : isBars
    ? 'Search bars, lounges, or locations...'
    : isBakery
    ? 'Search bakeries, patisseries, or desserts...'
    : isFoodTruck
    ? 'Search food trucks, street eats, or pop-ups...'
    : isCatering
    ? 'Search catering services, cuisines, or locations...'
    : isHairSalons
    ? 'Search hair salons, stylists, treatments or locations...'
    : isBarberShops
    ? 'Search barber shops, grooming, styles or locations...'
    : isNailBeauty
    ? 'Search nail studios, beauty treatments, lashes or locations...'
    : isCosmeticSurgery
    ? 'Search cosmetic surgeons, procedures, clinics or locations...'
    : isNutritionists
    ? 'Search nutritionists, dietitians, wellness programs or locations...'
    : isSkincare
    ? 'Search skincare clinics, treatments, facials, massages or locations...'
    : isSpa
    ? 'Search spas, massage therapists, wellness treatments or locations...'
    : isHealth
    ? 'Search doctors, clinics, pharmacies, or locations...'
    : isEducation
    ? 'Search schools, universities, colleges, tutors or locations...'
    : isFamily
    ? 'Search family services, childcare, play centres, churches or locations...'
    : isRealEstate
    ? 'Search properties, estate agents, locations or property types...'
    : isPrivateDrivers
    ? 'Search chauffeurs, private drivers, vip services or locations...'
    : isAirportTransfers
    ? 'Search airport transfers, meet & greet, shuttle services or locations...'
    : isShuttleMinibus
    ? 'Search shuttle services, minibus, group transport or locations...'
    : isTourSightseeing
    ? 'Search tours, sightseeing guides, experiences or locations...'
    : isEVCharging
    ? 'Search EV charging stations, fast chargers, locations...'
    : isHelicopter
    ? 'Search helicopter charters, scenic flights, aerial tours...'
    : isTransport
    ? 'Search freight, couriers, drivers, routes or locations...'
    : isBeauty
    ? 'Search salons, barbers, spas, treatments or locations...'
    : isJobListings
    ? 'Search jobs, positions, companies or locations...'
    : isJobSeekerProfiles
    ? 'Search talent, professionals, skills or locations...'
    : isRecruitmentHRServices
    ? 'Search recruitment, staffing, HR services or locations...'
    : isInternshipsApprenticeships
    ? 'Search internships, apprenticeships, programs or locations...'
    : isCareerCoachingGuidance
    ? 'Search career coaches, mentors, programs or locations...'
    : isPremiumWineHouses
    ? 'Search wines, vintages, collections or locations...'
    : isCraftDistilleries
    ? 'Search distilleries, breweries, crafted spirits or locations...'
    : isLuxuryCocktailBars
    ? 'Search cocktail bars, lounges, mixologists or locations...'
    : isWineTastingExperiences
    ? 'Search wine tastings, sommelier experiences, tours or locations...'
    : isSpiritInvestment
    ? 'Search investment spirits, collectors, vaults or locations...'
    : isMunicipalServices
    ? 'Search municipal services, licenses, permits or locations...'
    : isLicensingAndRegistrations
    ? 'Search licensing, registration services or locations...'
    : isPublicHealthServices
    ? 'Search public health clinics, services or locations...'
    : isSoftwareDevelopment
    ? 'Search software companies, developers or locations...'
    : isWebAndDesignStudios
    ? 'Search web designers, studios or locations...'
    : isDigitalMarketingAgencies
    ? 'Search digital marketing, SEO, agencies or locations...'
    : isPhotographyAndVideography
    ? 'Search photographers, videographers or locations...'
    : isDronePhotographyVideography
    ? 'Search drone services, aerial photography or locations...'
    : isAppDevelopmentSoftwareHouses
    ? 'Search app developers, software houses or locations...'
    : isAiAndDataScienceServices
    ? 'Search AI services, data science, ML or locations...'
    : isGamingAndEsports
    ? 'Search game studios, esports, gaming venues or locations...'
    : isVirtualAugmentedRealityServices
    ? 'Search VR, AR, XR experiences or locations...'
    : isFamilyServices
    ? 'Search childcare, tutoring, family services or locations...'
    : isChildcareSchools
    ? 'Search schools, universities, education providers or locations...'
    : isHotelsLodges
    ? 'Search hotels, lodges, accommodations or locations...'
    : isSafarisGameReserves
    ? 'Search game reserves, safaris, wildlife tours or locations...'
    : isGolfAndCountryClubs
    ? 'Search golf clubs, courses, country clubs or locations...'
    : isPersonalStylingAndWardrobeConsultants
    ? 'Search stylists, fashion consultants, wardrobe services or locations...'
    : isBanksAndBranches
    ? 'Search banks, financial institutions, branches or locations...'
    : isInvestmentAndFinancialAdvisors
    ? 'Search financial advisors, investment services or locations...'
    : isBoutiquesAndFashion
    ? 'Search boutiques, fashion, designers or locations...'
    : isEstateAgents
    ? 'Search real estate agents, properties, developments or locations...'
    : isLuxuryHomesAndVillas
    ? 'Search luxury homes, villas, estates or locations...'
    : isLegalServices
    ? 'Search law firms, attorneys, legal services or locations...'
    : isAccountingAndTax
    ? 'Search accountants, tax services, auditors or locations...'
    : isConsultants
    ? 'Search consultants, business advisors, consulting firms or locations...'
    : isTechAndIT
    ? 'Search IT services, tech companies, software or locations...'
    : isClinicSpecialists
    ? 'Search medical clinics, specialists, doctors or locations...'
    : isDentists
    ? 'Search dentists, dental clinics, treatments or locations...'
    : isWellnessRetreats
    ? 'Search wellness centers, yoga, spas, retreats or locations...'
    : 'Search restaurants, cuisines, or locations...'
  , [flags]);

  const scrollFeatured = (dir: 'left' | 'right') => {
    if (!featuredRef.current) return;
    const el = featuredRef.current;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <header className="border-b border-white/5 py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-sm font-bold text-gold-300">LH</div>
            <div className="text-sm font-semibold">LOWVELDHUB</div>
            <nav className="ml-6 flex gap-4 text-sm text-gray-300">
              <button className="hover:text-white">Home</button>
              <button className="hover:text-white">Directory</button>
              <button className="hover:text-white">Marketplace</button>
              <button className="hover:text-white">Stories</button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-300 hover:text-white">Login</button>
            <button className="text-sm bg-gold-500 text-black px-3 py-1 rounded">Add Business</button>
          </div>
        </div>
      </header>
      <section className="relative py-12 md:py-28 overflow-hidden">
        {/* Dynamic Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-10"></div>
        <img 
          src={
            isShisa ? 'https://images.unsplash.com/photo-1555939594-58d7cb561cea?auto=format&fit=crop&q=80&w=1600' :
            isCasual ? 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600' :
            isCafe ? 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1600' :
            isBars ? 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?auto=format&fit=crop&q=80&w=1600' :
            isBakery ? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1600' :
            isFoodTruck ? 'https://images.unsplash.com/photo-1565123409695-7b5ef63df2efauto=format&fit=crop&q=80&w=1600' :
            isCatering ? 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=1600' :
            isFreightHaulage ? 'https://images.unsplash.com/photo-1519390026850-d1d87d8b8fe3?auto=format&fit=crop&q=80&w=1600' :
            isLogisticsWarehouse ? 'https://images.unsplash.com/photo-1594642645006-4fc75fc88da7?auto=format&fit=crop&q=80&w=1600' :
            isCourierDelivery ? 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1600' :
            isCosmeticSurgery ? 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600' :
            isNutritionists ? 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1600' :
            isSkincare ? 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1600' :
            isSpa ? 'https://images.unsplash.com/photo-1570172176411-0dd88da19653?auto=format&fit=crop&q=80&w=1600' :
            'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1600'
          }
          alt={subCategoryName}
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-gold-400 font-serif uppercase text-sm md:text-base tracking-widest opacity-90">IN MPUMALANGA</div>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-tight drop-shadow-lg">
              {!hasSelectedSubcategory ? 'Premium ' + (categoryName || 'Experiences') : subCategoryName}
            </h1>
            <p className="mt-6 text-white/95 text-lg md:text-xl leading-relaxed drop-shadow-md max-w-2xl mx-auto">{heroTagline}</p>
            
            {/* Category-Specific Stats/Info */}
            {!hasActiveFilters && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-2xl md:text-3xl font-bold text-gold-400">4.7★</div>
                  <div className="text-xs text-gold-200">Avg Rating</div>
                </div>
                <div className="h-10 w-px bg-gold-500/30"></div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl md:text-3xl font-bold text-gold-400">{elitePlatinumListings.length}+</div>
                  <div className="text-xs text-gold-200">Premium Picks</div>
                </div>
                <div className="h-10 w-px bg-gold-500/30"></div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl md:text-3xl font-bold text-gold-400">🔥</div>
                  <div className="text-xs text-gold-200">Trending Now</div>
                </div>
              </div>
            )}

            <div className="mt-10 flex items-center justify-center gap-4">
              <button onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold shadow-lg hover:shadow-[0_20px_50px_rgba(227,185,44,0.3)] transition transform hover:scale-105">Explore Now</button>
              <button className="px-8 py-3 rounded-lg border-2 border-gold-400 text-gold-300 font-semibold hover:bg-gold-400 hover:text-black transition">Filter Results</button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Search + Horizontal Subcategories */}
      <div className="container mx-auto px-4 -mt-6 relative z-20 mb-8">
        <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-4 border border-gold-500/10">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={heroSearchPlaceholder} className="w-full p-3 rounded-lg bg-black/60 border border-gold-500/20 text-white placeholder-gray-400" />
        </div>
      </div>

      {/* Horizontal Subcategory Navigation (Landing Page Only) */}
      {hasSelectedSubcategory === false && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-3">
            <span className="text-xs text-gray-400 uppercase tracking-wider flex-shrink-0">Explore:</span>
            {(() => {
              const preferred = config?.subcategories || [
                'SHISANYAMA & BRAAI SPOTS',
                'FINE DINING',
                'CASUAL RESTAURANTS',
                'CAFÉS & COFFEE SHOPS',
                'BARS & COCKTAIL LOUNGES',
                'CATERING SERVICES',
                'BAKERIES & DESSERTS',
                'FOOD TRUCKS & POP-UPS'
              ];
              const related = categoryKey ? CategorySubcategories[categoryKey] || [] : [];
              const remaining = related.filter(r => !preferred.includes(r));
              const ordered = preferred.filter(p => related.includes(p)).concat(remaining);
              return ordered.map(s => (
                <button key={s} onClick={() => onSelectSubcategory?.(s)} className="flex-shrink-0 px-4 py-2 bg-black border border-gold-500/30 text-gold-300 rounded-full text-xs font-medium hover:border-gold-500 hover:bg-gold-500/10 transition whitespace-nowrap">
                  {s}
                </button>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Tier Highlight Section (Landing Page Only) */}
      {hasSelectedSubcategory === false && elitePlatinumListings.length > 0 && (
        <section className="container mx-auto px-4 mb-16">
          {/* PREMIUM SECTION HEADER */}
          <div className="mb-8">
            {/* Top accent line */}
            <div className="h-0.5 w-16 bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4"></div>
            
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                Featured Highlights
              </h2>
              <p className="text-sm md:text-base text-gray-400 max-w-2xl">
                Discover our most exclusive and highly-rated luxury experiences
              </p>
            </div>

            {/* Decorative divider */}
            <div className="h-px bg-gradient-to-r from-yellow-400/40 via-yellow-400/20 to-transparent mt-4"></div>
          </div>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {elitePlatinumListings.map(item => {
              const isFoodCategory = categoryKey === Category.FoodAndHospitality || isShisa || isCasual || isCafe || isBars || isBakery || isFoodTruck || isCatering;
              const detailView = isFoodCategory ? 'eatery-detail' : 'business-detail';
              return (
                <SubcategoryCard
                  key={item.id}
                  business={item}
                  isCompact={true}
                  onClick={(business) => navigate?.(detailView, categoryName, business.id)}
                />
              );
            })}
          </div>

          {/* FOOTER ACCENT */}
          <div className="mt-12 h-0.5 w-16 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-40"></div>
        </section>
      )}

      {/* Collapsible Filter Bar */}
      <div className="container mx-auto px-4 mb-8">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-black/40 border border-gold-500/20 hover:border-gold-500/40 transition"
        >
          <div className="flex items-center gap-2 text-gold-300">
            <Settings size={18} />
            <span className="text-sm font-medium uppercase">Filters</span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>



        {isFilterOpen && (
          <div className="mt-2 p-4 rounded-lg bg-black/60 border border-gold-500/10 space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <input 
                type="text" 
                placeholder="Search..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                className="p-3 rounded bg-black/60 border border-gold-500/20 text-white placeholder-gray-400 text-sm" 
              />
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="p-3 rounded bg-black/60 border border-gold-500/20 text-white text-sm">
                <option>All Areas</option>
                {MPUMALANGA_AREAS.map(area => (
                  <option key={area}>{area}</option>
                ))}
              </select>
              <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="p-3 rounded bg-black/60 border border-gold-500/20 text-white text-sm">
                <option value={0}>Any Rating</option>
                <option value={3}>3★+</option>
                <option value={4}>4★+</option>
                <option value={4.5}>4.5★+</option>
              </select>
              <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="p-2.5 rounded bg-black/60 border border-gold-500/20 text-white text-xs">
                <option value="">Any Price</option>
                <option value="$">R - Budget</option>
                <option value="$$">R R - Moderate</option>
                <option value="$$$">R R R - Premium</option>
                <option value="$$$$">R R R R - Luxury</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2.5 rounded bg-black/60 border border-gold-500/20 text-white text-xs">
                <option value="rating">Rating ↓</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* OLD STICKY FILTER BAR - REMOVED */}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">

          {/* Full Width Grid - No Sidebar */}
          <div ref={gridRef} className={isShisa || isCasual || isCafe || isBars || isCatering || isBakery || isFoodTruck || isFineDining || isHairSalons || isBarberShops || isNailBeauty || isCosmeticSurgery || isNutritionists || isSkincare || isSpa || isFreightHaulage || isLogisticsWarehouse || isCourierDelivery || isPrivateDrivers || isAirportTransfers || isShuttleMinibus || isTourSightseeing || isEVCharging || isHelicopter || isFamilyServices || isChildcareSchools || isCommunitycentre || isReligiouscentre || isPlaycentre || isAfterschool || isFamilyentertainment || isHotelsLodges || isGuestHousesBBs || isSafarisGameReserves || isTourOperatorsGuides || isScenicRoutesAdventure || isYachtBoatCharters || isPrivateJetAirCharter || isClinicSpecialists || isDentists || isPharmacies || isMentalHealthProfessionals || isWellnessRetreats || isVeterinaryClinics || isBuilders || isPlumbingElectrical || isRoofingRenovations || isInteriorDesigners || isLandscapingGardening || isSmartHome || isCustomFurniture || isPoolGarden || isLegalServices || isAccountingAndTax || isConsultants || isMarketingAndAdvertising || isTechAndIT || isArchitectsDesigners || isBusinessBrokersAdvisors || isLifeCoachesAndMentors || isTranslationAndLanguage || isPRAndMedia || isLuxuryEVDealerships || isCarHireAndRentals || isServiceAndRepairs || isCarDetailingAndMaintenance || isLimoAndExotic || isMotorcycleAndATV || isCropAndFarmSuppliers || isLivestockServices || isAgritechAndMachinery || isMiningSuppliers || isMiningEquipmentAndMachinery || isIndustrialToolsAndMachinery || isBarsAndCocktailLounges || isClubsAndLounges || isLiveMusicAndVenues || isTheatersAndCinemas || isGamingAndVRCenters || isDanceStudiosAndPerformances || isMusicLessonsAndTeachers || isConciergeServices || isExclusiveExperiences || isPersonalAssistants || isLuxuryClubsAndMemberships || isWineTastingAndVineyards || isGolfAndCountryClubs || isPersonalStylingAndWardrobeConsultants || isJobListings || isJobSeekerProfiles || isRecruitmentHRServices || isInternshipsApprenticeships || isCareerCoachingGuidance || isPremiumWineHouses || isCraftDistilleries || isLuxuryCocktailBars || isWineTastingExperiences || isSpiritInvestment || isSoftwareDevelopment || isWebAndDesignStudios || isDigitalMarketingAgencies || isPhotographyAndVideography || isDronePhotographyVideography || isAppDevelopmentSoftwareHouses || isAiAndDataScienceServices || isGamingAndEsports || isVirtualAugmentedRealityServices || isDefaultView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6"}>
            {visible.filter((b:any)=> b && b.category === categoryKey).map((b) => {
              const isFoodCategory = categoryKey === Category.FoodAndHospitality || isShisa || isCasual || isCafe || isBars || isBakery || isFoodTruck || isCatering;
              const detailView = isFoodCategory ? 'eatery-detail' : 'business-detail';
              const isCompactCategory = isShisa || isCasual || isCafe || isBars || isCatering || isBakery || isFoodTruck || isFineDining || isHairSalons || isBarberShops || isNailBeauty || isCosmeticSurgery || isNutritionists || isSkincare || isSpa || isFreightHaulage || isLogisticsWarehouse || isCourierDelivery || isPrivateDrivers || isAirportTransfers || isShuttleMinibus || isTourSightseeing || isEVCharging || isHelicopter || isFamilyServices || isChildcareSchools || isCommunitycentre || isReligiouscentre || isPlaycentre || isAfterschool || isFamilyentertainment || isHotelsLodges || isGuestHousesBBs || isSafarisGameReserves || isTourOperatorsGuides || isScenicRoutesAdventure || isYachtBoatCharters || isPrivateJetAirCharter || isClinicSpecialists || isDentists || isPharmacies || isMentalHealthProfessionals || isWellnessRetreats || isVeterinaryClinics || isBuilders || isPlumbingElectrical || isRoofingRenovations || isInteriorDesigners || isLandscapingGardening || isSmartHome || isCustomFurniture || isPoolGarden || isLegalServices || isAccountingAndTax || isConsultants || isMarketingAndAdvertising || isTechAndIT || isArchitectsDesigners || isBusinessBrokersAdvisors || isLifeCoachesAndMentors || isTranslationAndLanguage || isPRAndMedia || isLuxuryEVDealerships || isCarHireAndRentals || isServiceAndRepairs || isCarDetailingAndMaintenance || isLimoAndExotic || isMotorcycleAndATV || isCropAndFarmSuppliers || isLivestockServices || isAgritechAndMachinery || isMiningSuppliers || isMiningEquipmentAndMachinery || isIndustrialToolsAndMachinery || isBarsAndCocktailLounges || isClubsAndLounges || isLiveMusicAndVenues || isTheatersAndCinemas || isGamingAndVRCenters || isDanceStudiosAndPerformances || isMusicLessonsAndTeachers || isConciergeServices || isExclusiveExperiences || isPersonalAssistants || isLuxuryClubsAndMemberships || isWineTastingAndVineyards || isGolfAndCountryClubs || isPersonalStylingAndWardrobeConsultants || isBanksAndBranches || isLoanProviders || isInsuranceBrokers || isInvestmentAndFinancialAdvisors || isCryptoAndBlockchainServices || isEstatePlanningAndWills || isTaxConsultantsAndAdvisors || isBoutiquesAndFashion || isHomeAndDecorStores || isGrocersAndMarkets || isLuxuryProductsAndGifts || isEcoAndSustainableProducts || isOnlineMarketplaces || isEstateAgents || isPropertyRentals || isCommercialProperty || isPropertyManagementAndTenants || isLandAndPlots || isLuxuryHomesAndVillas || isApartmentsAndLofts || isMunicipalServices || isLicensingAndRegistrations || isPublicHealthServices || isJobListings || isJobSeekerProfiles || isRecruitmentHRServices || isInternshipsApprenticeships || isCareerCoachingGuidance || isPremiumWineHouses || isCraftDistilleries || isLuxuryCocktailBars || isWineTastingExperiences || isSpiritInvestment || isSoftwareDevelopment || isWebAndDesignStudios || isDigitalMarketingAgencies || isPhotographyAndVideography || isDronePhotographyVideography || isAppDevelopmentSoftwareHouses || isAiAndDataScienceServices || isGamingAndEsports || isVirtualAugmentedRealityServices || isDefaultView;            })}
          </div>

          <div ref={sentinelRef} className="h-6" />

          {visible.length < filtered.length && (
            <div className="mt-8 text-center">
              <button onClick={() => setPage((p) => p + 1)} className="px-5 py-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 text-sm font-semibold rounded hover:bg-gold-500/30 transition">Load more</button>
            </div>
          )}

          {!isDefaultView && listingsToShow.length === 0 && (
            <div className="mt-12 text-center py-16 px-4 rounded-lg bg-gradient-to-br from-black/40 to-black/20 border border-gold-500/20">
              {isBeauty ? (
                <>
                  <div className="text-4xl mb-4">✨</div>
                  <div className="text-gold-300 font-serif text-2xl">Curated providers coming soon.</div>
                  <div className="mt-3 text-gold-200 max-w-xl mx-auto mb-6">Be among the first to list your premium beauty services in the Lowveld.</div>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button onClick={() => window.alert('Apply to list your business')} className="px-5 py-3 rounded bg-gold-500 text-black font-bold hover:shadow-[0_14px_40px_rgba(227,185,44,0.22)]">Apply to List</button>
                  </div>
                </>
              ) : (
                <>
                  {isEducation ? (
                    <>
                      <div className="text-4xl mb-4">🎓</div>
                      <div className="text-gold-300 font-serif text-2xl">No education institutions found.</div>
                      <div className="mt-3 text-gold-200 max-w-xl mx-auto mb-6">Try broadening your search criteria or explore all available schools and universities in Mpumalanga.</div>
                      <div className="mt-8 pt-6 border-t border-gold-500/20">
                        <div className="text-sm text-gold-200 mb-3">💡 Try these alternatives:</div>
                        <div className="flex flex-wrap justify-center gap-2">
                          <button onClick={() => { setQuery('online learning'); setMinRating(0); }} className="px-3 py-2 rounded text-xs bg-gold-500/10 border border-gold-500/30 text-gold-200 hover:bg-gold-500/20 transition">Online Learning</button>
                          <button onClick={() => { setQuery('tutor'); setMinRating(0); }} className="px-3 py-2 rounded text-xs bg-gold-500/10 border border-gold-500/30 text-gold-200 hover:bg-gold-500/20 transition">Tutors</button>
                          <button onClick={() => { setQuery('vocational'); setMinRating(0); }} className="px-3 py-2 rounded text-xs bg-gold-500/10 border border-gold-500/30 text-gold-200 hover:bg-gold-500/20 transition">Vocational</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl mb-4">🔍</div>
                      <div className="text-gold-300 font-serif text-2xl">No listings match your filters.</div>
                      <div className="mt-3 text-gold-200 max-w-xl mx-auto mb-6">Adjust your search criteria to discover more premium businesses in Mpumalanga.</div>
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded bg-black/30 border border-gold-500/10">
                          <div className="text-sm text-gold-200 mb-3">📍 Try different location:</div>
                          <select onChange={(e) => { setLocation(e.target.value); setMinRating(0); }} className="w-full p-2 rounded bg-black/60 border border-gold-500/20 text-white text-xs">
                            <option>All Areas</option>
                            {MPUMALANGA_AREAS.slice(0, 5).map(area => (
                              <option key={area}>{area}</option>
                            ))}
                          </select>
                        </div>
                        <div className="p-4 rounded bg-black/30 border border-gold-500/10">
                          <div className="text-sm text-gold-200 mb-3">⭐ Browse by rating:</div>
                          <div className="flex gap-2">
                            <button onClick={() => { setMinRating(0); setPriceFilter(''); }} className="flex-1 px-2 py-2 rounded text-xs bg-gold-500/10 border border-gold-500/30 text-gold-200 hover:bg-gold-500/20 transition">All</button>
                            <button onClick={() => { setMinRating(4); setPriceFilter(''); }} className="flex-1 px-2 py-2 rounded text-xs bg-gold-500/10 border border-gold-500/30 text-gold-200 hover:bg-gold-500/20 transition">4★+</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="mt-8 flex items-center justify-center gap-3 pt-6 border-t border-gold-500/20">
                    <button onClick={() => {
                      setQuery('');
                      setLocation('All Areas');
                      setMinRating(0);
                      setPriceFilter('');
                      setFeatures({ wifi: false, outdoor: false, veg: false, parking: false });
                      setExtendedFeatures({ wifi: false, outdoor: false, veg: false, parking: false, family: false, takeaway: false, pet: false, live: false, vip: false, smoking: false, event: false, buffet: false, privateChef: false, corporate: false, glutenFree: false, vegan: false, customOrders: false, cakes: false, chocolate: false, cuisine: false, dessert: false, streetFood: false, international: false, medicalAid: false, emergency: false, wheelchair: false, service24: false, onlineBooking: false, public: false, private: false, boarding: false, onlineLearning: false, accredited: false, nsc_ieb: false, tvet: false, higherEducation: false, scholarships: false, childFriendly: false, familyOwned: false, licensed: false, faithBased: false, afterSchoolCare: false, weekendActivities: false, educational: false, indoorPlay: false, outdoorPlay: false, forSale: false, toRent: false, commercial: false, residential: false, luxury: false, newDevelopment: false, petFriendly: false, furnished: false, unfurnished: false, secureEstate: false, swimmingPool: false, garden: false });
                    }} className="px-5 py-3 rounded border border-gold-500 text-gold-300 hover:bg-gold-500/10 transition">Reset All Filters</button>

                    <button onClick={() => setIsFilterOpen(true)} className="px-5 py-3 rounded bg-gold-500 text-black font-bold hover:shadow-[0_14px_40px_rgba(227,185,44,0.22)]">Adjust Filters</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;
