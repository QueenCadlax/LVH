import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, Menu, X, Globe, Briefcase, Home, Calendar, Map, 
  ShoppingBag, CreditCard, User, Utensils, Sparkles, Car, 
    MessageSquare, ChevronRight, ChevronLeft, Mic, Bell, Send, LayoutDashboard, Plus, MapPin, Crown, Gift, Rocket, Check, CheckCircle, Heart, Users, Zap, Briefcase as BriefcaseIcon, Camera, Hammer, Phone, Mail, Award, Gauge, Settings, Activity, Bed, Plane, Star, Filter, Quote, Copy, DollarSign, List, BarChart3, ArrowUpRight, ArrowDownLeft, TrendingUp, Play, Clock, Facebook, Instagram, Linkedin, Twitter, LogIn, Upload, Image as ImageIcon, Video, Youtube, Share2, AlertCircle, Sun, Moon, Music,
  GraduationCap, Stethoscope, Scale, Scissors, Truck, Wrench, Tractor, Shield, Grid, MoreHorizontal, Tag, ChevronDown as ChevronDownIcon, ArrowLeft, RefreshCw,
  Building2, ShieldCheck, Banknote, Cpu, Droplets, PlaneLanding, FileText, Wind, 
  Store, Shirt, Smartphone, Armchair, Laptop, Pill, Smile, Hospital, Dog,
  Info, Coffee, Wine, Landmark, HardHat, Gavel, Calculator, BookOpen, Warehouse, Gem, MessageCircle
} from 'lucide-react';
import { businesses, properties, destinations, stays, transportServices, marketplaceItems, marketplaceProducts, events, creators, communityGroups, datingProfiles, jobCandidates, campaigns, notifications, subscriptionPlans, dealerships, carListings, boostPackages, microTasks, sellerStats, rewardStats, stories, amplifyCampaigns, requestsForQuoteData, quoteResponsesData } from './data/seeds';
import { missingBusinesses } from './data/missingSeeds';
import { additionalPremiumBusinesses } from './data/additionalPremiumSeeds';
import { retailers, retailersBusinesses, retailers_expanded, allRetailers } from './data/retailSeeds';
import { professionals } from './data/businessSeeds';
import { nightlifeVenues } from './data/nightlifeSeeds';
import { freightHaulageCompanies, logisticsWarehousingCompanies, courierDeliveryCompanies, privateDriversCompanies, airportTransfersCompanies, shuttleMinibusCompanies, tourSightseeingCompanies, evChargingStations, helicopterCharters } from './data/transportSeeds';
import { familyServices, childcareSchools, communitycentres, religiouscentres, playcenters, afterschoolprograms, familyentertainment } from './data/familyKidsSeeds';
import { hotelsLodges, guestHousesBBs, safarisGameReserves, tourOperatorsGuides, scenicRoutesAdventure, yachtBoatCharters, privateJetAirCharter } from './data/tourismTravelSeeds';
import { clinicsSpecialists, dentists, pharmacies, mentalHealthProfessionals, wellnessRetreats, veterinaryClinics } from './data/healthMedicalSeeds';
import { gynaecologists, paediatricians, orthopaedicSurgeons, dermatologists, cardiologists, fertilityClinics, optometristsOphthalmologists } from './data/specialistMedicalSeeds';
import { generalPractioners, paediatricians as paeds, dermatologists as derms, cardiologists as cards, fertilityClinics as fcs, physiotherapists, psychologists, psychiatrists, dieticians, diagnosticLabs, radiology, homeCarServices, oldAgeHomes, rehabilitationCentres, optometrists, chiropractors } from './data/expandedMedicalSeeds';
import { executiveRecruitment, hospitalityStaffing, skilledTradesRecruitment, temporaryContractStaffing, hrConsultingOutsourcing } from './data/recruitmentAndStaffingSeeds';
import { cleaningServices, gardeningLandscaping, homeMaintenanceHandyman, nanniesCaregiverss, elderlyCareServices } from './data/domesticAndPersonalServicesSeeds';
import { convenienceStores, superettes, spazaShops, butcheries, bakeries, liquorStores } from './data/convenienceAndDailyNeedsSeeds';
import { gynecologists, maternityClinics, midwivesDoulas, creches, aftercareTutors, kidsActivityCentres } from './data/womenHealthAndMaternalSeeds';
import { buildersContractors, plumbingElectrical, roofingRenovations, interiorDesigners, landscapingGardening, smartHomeInstallation, customFurnitureMakers, poolGardenDesigners } from './data/homeConstructionTradesSeeds';
import { legalServices, accountingAndTax, consultants, marketingAndAdvertising, techAndITServices, architectsAndDesigners, businessBrokersAndAdvisors, lifeCoachesAndMentors, translationAndLanguageServices, prAndMediaConsultants } from './data/businessProfessionalSeeds';
import { luxuryEVDealerships, carHireAndRentals, serviceAndRepairs, carDetailingAndMaintenance, limoAndExoticRentals, motorcycleAndATVRentals } from './data/automotiveSeeds';
import { cropAndFarmSuppliers, livestockServices, agritechAndMachinery, miningSuppliers, miningEquipmentAndMachinery, industrialToolsAndMachinery } from './data/agriMiningIndustrialSeeds';
import { barsAndCocktailLounges, clubsAndLounges, liveMusicAndVenues, theatersAndCinemas, gamingAndVRCenters, danceStudiosAndPerformances, musicLessonsAndTeachers } from './data/nightlifeEntertainmentSeeds';
import { conciergeServices, exclusiveExperiences, personalAssistants, luxuryClubsAndMemberships, wineTastingAndVineyards, golfAndCountryClubs, personalStylingAndWardrobeConsultants } from './data/luxuryLifestyleSeeds';
import { banksAndBranches, loanProviders, insuranceBrokers, investmentAndFinancialAdvisors, cryptoAndBlockchainServices, estatePlanningAndWills, taxConsultantsAndAdvisors } from './data/financeMoneyServicesSeeds';
import { boutiquesAndFashion, homeAndDecorStores, grocersAndMarkets, luxuryProductsAndGifts, ecoAndSustainableProducts, onlineMarketplaces } from './data/shoppingRetailSeeds';
import { estateAgents, propertyRentals, commercialProperty, propertyManagementAndTenants, landAndPlots, luxuryHomesAndVillas, apartmentsAndLofts } from './data/realEstatePropertySeeds';
import { municipalServices, licensingAndRegistrations, publicHealthServices } from './data/governmentPublicServicesSeeds';
import { softwareDevelopment, webAndDesignStudios, digitalMarketingAgencies, photographyAndVideography, dronePhotographyVideography, appDevelopmentSoftwareHouses, aiAndDataScienceServices, gamingAndEsports, virtualAugmentedRealityServices } from './data/itMediaCreativeSeeds';
import { jobListings, jobSeekerProfiles, recruitmentHRServices, internshipsApprenticeships, careerCoachingGuidance } from './data/jobsAndCareersSeeds';
import { premiumWineHouses, craftDistilleries, luxurycocktailBars, wineTastingExperiences, spiritsInvestment } from './data/wineAndSpiritsSeeds';
import { professionalServices } from './data/professionalServicesSeeds';
import { Business, Category, CategorySubcategories, ListingTier, SubscriptionDuration, PRICING_STRUCTURE, Property, Job, Destination, MarketplaceItem, LoyaltyStatus, Event, Creator, CommunityGroup, DatingProfile, Candidate, Campaign, Notification, SubscriptionPlan, Dealership, CarListing, BoostPackage, MicroTask, MPUMALANGA_AREAS, Story, Retailer, ProfessionalService, NightlifeVenue } from './types';
import { SectionTitle, LuxuryCard, CategoryCard, PrimaryButton, MarketButton, HeroFilterHeader, SponsoredBanner, AdvancedFilterPanel, FilterState, AuthModal } from './components/Shared';
import PremiumAddBusinessView from './components/PremiumAddBusinessView';
import BusinessSubmissionFormV2 from './components/BusinessSubmissionFormV2';
import ListYourBusinessPage from './components/ListYourBusinessPage';
import {
    FoodIcon,
    TourismIcon,
    LuxuryIcon,
    BeautyIcon,
    HealthIcon,
    RealEstateIcon,
    AutomotiveIcon,
    HomeTradesIcon,
    ShoppingIcon,
    BusinessIcon,
    ITIcon,
    FinancialIcon
} from './components/CategoryIcons';
import { EducationIcon, TransportIcon, NightlifeIcon, GovIcon, AgricultureIcon, FamilyIcon, RecruitmentIcon, DomesticServicesIcon, ConvenienceIcon, WomenHealthIcon, EventIcon, SportsIcon, PetsIcon, SecurityIcon, EnergyIcon, CreatorIcon, DomesticIcon, JobsIcon, ProfessionalIcon } from './components/CategoryIcons';
import { getSmartRecommendations, chatWithConcierge, chatWithConciergeEnhanced, generateListingDescription, generateCarImage, generateLuxuryPlaceholder, performSmartSearch, generateReviewSummary, generateAIListingDetails, enhanceCampaignBrief, getPropertyRecommendations, performSmartMedicalSearch } from './services/aiService';
import { AreaSelector, ActivityTicker, WebsiteBuilderSection, LowveldStoriesSection, FeaturedProductsSection, BeFeaturedSection, CreatorBusinessSpotlight, LifestyleCommunitySection, LowveldStoryCard, EntrepreneurSpotlightCard } from './components/NewFeatures';
import StoriesTab from './components/StoriesTab';
import StoryDetailClean from './components/StoryDetailClean';
import VehicleCard from './components/VehicleCard';
import ExperienceDetail from './components/ExperienceDetail';
import StayDetail from './components/PropertyDetail';
import { MarketplaceLanding } from './components/Marketplace';
import MarketplaceUnified from './components/Marketplace/MarketplaceUnified';
import { AIReviewSummary } from './components/BusinessExtras';
import ConciergeAnimated from './components/ConciergeAnimated';
import HealthPageV2 from './components/HealthPageV2';
import HealthDetailV2 from './components/HealthDetailV2';
import ServicesPage from './components/ServicesPage';
import EducationPremium from './components/EducationPremium';
import EducationDetail from './components/EducationDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import AdminApp from './AdminApp';
import ProductSubmissionFormV2 from './components/Marketplace/ProductSubmissionFormV2';
import { ProductPricingTier } from './types';

// ===== CRITICAL FIX #1: Error Boundary for global error handling =====
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    (this as any).state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error) {
    console.error('🔴 App Error Caught:', error);
  }
  
  render() {
    const state = (this as any).state as ErrorBoundaryState;
    
    if (state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
              <AlertCircle size={40} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-serif text-white mb-4">Oops!</h1>
            <p className="text-gray-400 mb-2 text-sm">An unexpected error occurred</p>
            <p className="text-gray-500 mb-8 text-xs">{state.error?.message || 'Please refresh the page'}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

// ===== CRITICAL FIX #2: 404 Component for missing routes =====
const NotFoundView = ({ navigate }: { navigate: (view: string) => void }) => (
  <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-24">
    <div className="text-center max-w-md">
      <h1 className="text-6xl font-bold text-gold-500 mb-4">404</h1>
      <h2 className="text-3xl font-serif text-white mb-4">Not Found</h2>
      <p className="text-gray-400 mb-8">This page doesn't exist in Lowveld Hub.</p>
      <button
        onClick={() => navigate('home')}
        className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all"
      >
        Back to Home
      </button>
    </div>
  </div>
);

// ===== PREMIUM EMPTY STATES (Curation Over Apology) =====
interface EmptyStateProps {
  headline: string;
  subtext: string;
  cta?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
  minimal?: boolean;
}

const CuratedEmptyState: React.FC<EmptyStateProps> = ({ headline, subtext, cta, icon, minimal = false }) => (
  <div className="py-20 md:py-32 flex items-center justify-center px-4 bg-black/40 rounded-2xl border border-gold-500/10">
    <div className="text-center max-w-lg">
      {icon && !minimal && (
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-500/5 border border-gold-500/20 flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-2xl md:text-3xl font-serif text-white mb-3 tracking-tight">
        {headline}
      </h3>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
        {subtext}
      </p>
      {cta && (
        <button
          onClick={cta.onClick}
          className="group inline-flex items-center gap-2 border border-gold-500/60 text-gold-400 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300"
        >
          {cta.label}
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  </div>
);

const CategoryEmptyState: React.FC<{ navigate: (view: string, category?: string) => void }> = ({ navigate }) => (
  <div className="container mx-auto px-4 py-20">
    <CuratedEmptyState
      headline="This category is being curated."
      subtext="We're reviewing and onboarding businesses that meet our standard. Discovery here is intentional, not rushed."
      cta={{
        label: 'Suggest a business',
        onClick: () => navigate('contact-us')
      }}
      icon={<Sparkles size={24} className="text-gold-400" />}
    />
  </div>
);

const FeaturedEmptyState: React.FC = () => (
  <div className="py-20 bg-[#050505] border-t border-gold-500/10">
    <div className="container mx-auto px-4">
      <CuratedEmptyState
        headline="Curation in progress."
        subtext="The Inner Circle highlights businesses that reflect excellence across the Lowveld. Features appear once they meet our editorial criteria."
        minimal={true}
        icon={<Crown size={24} className="text-gold-400" />}
      />
    </div>
  </div>
);

const StoriesEmptyState: React.FC<{ navigate: (view: string) => void }> = ({ navigate }) => (
  <div className="container mx-auto px-4 py-20">
    <CuratedEmptyState
      headline="Stories worth the wait."
      subtext="We're crafting editorial features on the people, ideas, and industries shaping Mpumalanga."
      cta={{
        label: 'Notify me when stories go live',
        onClick: () => navigate('contact-us')
      }}
      icon={<BookOpen size={24} className="text-gold-400" />}
    />
  </div>
);

const MarketplaceEmptyState: React.FC<{ navigate: (view: string) => void }> = ({ navigate }) => (
  <div className="container mx-auto px-4 py-20">
    <CuratedEmptyState
      headline="A curated marketplace is coming."
      subtext="We're onboarding makers and sellers whose work reflects quality, craft, and character."
      cta={{
        label: 'Apply as a seller',
        onClick: () => navigate('business-signup')
      }}
      icon={<ShoppingBag size={24} className="text-gold-400" />}
    />
  </div>
);

const SearchEmptyState: React.FC<{ navigate: (view: string) => void }> = ({ navigate }) => (
  <div className="container mx-auto px-4 py-20">
    <CuratedEmptyState
      headline="No matches found."
      subtext="Try refining your search or explore curated categories across the platform."
      cta={{
        label: 'Browse the Directory',
        onClick: () => navigate('directory')
      }}
      icon={<Search size={24} className="text-gold-400" />}
    />
  </div>
);

// ===== FALLBACK BEHAVIOR RULES (LOCK THESE) 🔒 =====
/**
 * BUSINESS PROFILE FALLBACKS:
 * - No images → show brand-style placeholder (gold gradient + company initials)
 * - No description → hide description block entirely (not visible)
 * - Not verified → no badge shown (silent fallback)
 * - No products → hide marketplace tab completely
 * - No contact info → show "Details available after verification"
 *
 * CATEGORY RULES:
 * - Fewer than 3 listings → do NOT feature on Home page
 * - Zero listings → show CuratedEmptyState (this category is being curated)
 * - Hidden categories → never appear in search or navigation
 *
 * TONE RULES (CRITICAL):
 * - Never use: "Oops", "Sorry", "We're fixing this", "Coming soon!"
 * - Always feel: Calm, Intentional, Premium, Unbothered
 * - Position absence as curation, not failure
 */

// Utility: Check if business has minimum required fields
const isBusinessVerified = (business: Business): boolean => {
  return !!(business && business.image && business.name && business.location);
};

// Utility: Check if category has sufficient listings
const shouldFeatureCategory = (listings: Business[]): boolean => {
  return listings.length >= 3;
};

// Utility: Get placeholder image for business with no image
const getBusinessPlaceholder = (name: string): string => {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  // Return gradient background with text overlay (CSS-based or image URL)
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%232a2a2a' width='400' height='300'/%3E%3Crect fill='url(%23grad)' width='400' height='300'/%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23B8923A;stop-opacity:0.3' /%3E%3Cstop offset='100%25' style='stop-color:%23000000;stop-opacity:0.8' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='200' y='150' font-size='60' font-weight='bold' text-anchor='middle' dominant-baseline='middle' fill='%23B8923A' font-family='serif'%3E${initials}%3C/text%3E%3C/svg%3E`;
};

// ===== INTEGRATION GUIDE FOR EMPTY STATES =====
/**
 * HOW TO USE EMPTY STATES IN EXISTING COMPONENTS:
 *
 * 1. DIRECTORY VIEW:
 *    if (filteredByCategory.length === 0) {
 *      return <CategoryEmptyState navigate={navigate} />;
 *    }
 *
 * 2. FEATURED/INNER CIRCLE (HOME):
 *    if (featuredItems.length === 0) {
 *      return <FeaturedEmptyState />;
 *    }
 *
 * 3. STORIES VIEW:
 *    if (stories.length === 0) {
 *      return <StoriesEmptyState navigate={navigate} />;
 *    }
 *
 * 4. MARKETPLACE:
 *    if (products.length === 0) {
 *      return <MarketplaceEmptyState navigate={navigate} />;
 *    }
 *
 * 5. SEARCH RESULTS:
 *    if (searchResults.length === 0) {
 *      return <SearchEmptyState navigate={navigate} />;
 *    }
 *
 * BUSINESS PROFILE FALLBACKS:
 *    - Image: business.image || getBusinessPlaceholder(business.name)
 *    - Description: {business.description && <p>{business.description}</p>}
 *    - Verification: {isBusinessVerified(business) && <Badge>Verified</Badge>}
 *    - Contact: business.contactInfo || "Details available after verification"
 */

// ===== PERFORMANCE OPTIMIZATION: Direct imports for instant loading =====
// All components imported directly (no lazy/Suspense boundaries) for fastest load times
// Pattern: Real Estate & Auto pages load instantly - apply to ALL pages
import EatsPage from './components/EatsPage';
import RetailPage from './components/RetailPage';
import RetailDetailView from './components/RetailDetailView';
import BusinessPage from './components/BusinessPage';
import BusinessDetailViewComprehensive from './components/BusinessDetailViewComprehensive';
import ProfessionalServiceDetail from './components/ProfessionalServiceDetail';
import LegalFinancePageV2 from './components/LegalFinancePageV2';
import LegalFinanceDetail from './components/LegalFinanceDetail';
import SellerReputationDashboard from './components/SellerReputationDashboard';
import NightlifePage from './components/NightlifePage';
import NightlifeDetailView from './components/NightlifeDetailView';
import EateryDetail from './components/EateryDetail';
import SubcategoryPage from './components/SubcategoryPage';
import StaysPage from './components/StaysPage';
import TourismExperiencesPage from './components/TourismExperiencesPage';
import TourismLandingPremium from './components/TourismLandingPremium';
import DestinationDetail from './components/DestinationDetail';
import TourismDestinationDetail from './components/TourismDestinationDetail';
import TransportPagePremium from './components/TransportPagePremium';
import TransportLandingPage from './components/TransportLandingPage';
import TransportDetailPage from './components/TransportDetailPage';
import TransportDetailPremium from './components/TransportDetailPremium';
import StaysDetailPremium from './components/StaysDetailPremium';
import EatsPagePremium from './components/EatsPagePremium';
import { RFQPage } from './components/RFQPage';
import VIPItineraryPlanner from './components/VIPItineraryPlanner';
import AreaGuideLanding from './components/AreaGuideLanding';
import AreaGuide from './components/AreaGuide';
import TourismExperienceDetailView from './components/TourismExperienceDetailView';
import ExperienceDetailPremium from './components/ExperienceDetailPremium';

const DealershipCard: React.FC<{ dealership: Dealership }> = ({ dealership }) => (
    <div className="group relative glass-card rounded-xl overflow-hidden cursor-pointer h-72 w-full md:w-80 flex-shrink-0 border border-white/10 hover:border-gold-500/50 transition-all">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>
        <div className="absolute inset-0">
            <img src={dealership.banner} alt={dealership.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        {dealership.isPremium && (
             <div className="absolute top-0 right-0 p-3 z-20">
                 <div className="bg-gold-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-gold-500/20 flex items-center gap-1">
                     <Crown size={10} /> PREMIUM PARTNER
                 </div>
             </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center z-20 transition-transform duration-300 group-hover:-translate-y-2">
            <div className="w-16 h-16 rounded-full border-2 border-gold-500/50 overflow-hidden mb-3 bg-black shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300">
                <img src={dealership.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>

            

            
            <h3 className="text-xl font-serif text-white group-hover:text-gold-400 transition-colors relative z-10">{dealership.name}</h3>
            <div className="flex items-center gap-1 text-gold-500 text-xs mb-1">
                 <MapPin size={10} /> {dealership.location}
            </div>
            <div className="flex gap-1 text-gray-300 text-[10px] tracking-widest uppercase mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                <Car size={10} /> View Details
            </div>
        </div>
    </div>
);

const ListingGridView = ({ title, items, type, favorites, toggleFavorite, navigate, category, medicalBusinesses }: any) => {
  // Mock distance calculation based on location
  const getDistanceFromLocation = (location: string) => {
    const baseDistance: {[key: string]: number} = {
      'Nelspruit': 0,
      'Mbombela': 0.5,
      'Hazyview': 15,
      'Phalaborwa': 60,
      'Hoedspruit': 75,
      'Kruger': 90,
      'White River': 30,
      'Sabie': 45,
      'Mpumalanga': 25
    };
    
    for (const [key, dist] of Object.entries(baseDistance)) {
      if (location && location.includes(key)) return dist;
    }
    return Math.random() * 80 + 5; // Default 5-85 km
  };

  return (
    <>
    <SectionTitle title={title} />
    
    {/* AI Medical Search - only for Health & Medical category */}
    {category === Category.HealthAndMedical && medicalBusinesses && medicalBusinesses.length > 0 && (
      <section className="mb-4">
        <AIMedicalSearchPanel businesses={medicalBusinesses} navigate={navigate} />
      </section>
    )}
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {items.map((item: any) => (
        <div key={item.id} className="h-auto">
            <LuxuryCard 
                id={item.id}
                title={item.name || item.title}
                image={item.image}
                logo={(item as any).logo || item.image}
                subtitle={item.subcategory || item.location || item.company || item.seller}
                rating={item.rating}
                price={item.price || item.priceLevel || item.salary}
                location={item.location}
                distance={getDistanceFromLocation(item.location)}
                badge={item.tier === ListingTier.Platinum ? 'Platinum' : item.tier === ListingTier.Elite ? 'Elite' : item.tier === ListingTier.Premium ? 'Premium' : undefined}
                verified={item.tier !== ListingTier.Trial}
                isElite={item.tier === ListingTier.Elite}
                isPlatinum={item.tier === ListingTier.Platinum}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
                onPress={() => item.id && navigate(type === 'business' ? 'business-detail' : type === 'car' ? 'cars' : 'directory', undefined, item.id)}
                phone={item.phone}
                email={item.email}
                facebookUrl={item.socialLinks?.facebook}
                instagramUrl={item.socialLinks?.instagram}
                twitterUrl={item.socialLinks?.twitter}
                linkedinUrl={item.socialLinks?.linkedin}
                tiktokUrl={item.socialLinks?.tiktok}
                tier={item.tier}
            />
        </div>
      ))}
    </div>
    </>
  );
};

// OLD ListYourBusinessView REMOVED - Now using PremiumAddBusinessView from components/PremiumAddBusinessView.tsx
// This function is no longer used but kept as reference
const REMOVED_ListYourBusinessView = ({ navigate, onAddBusiness }: { navigate: any, onAddBusiness: (b: Business) => void }) => {
    // FUNCTION REMOVED - see PremiumAddBusinessView.tsx
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: Category.FoodAndHospitality,
        subcategory: '',
        area: 'Mbombela (Nelspruit)',
        description: '',
        tags: [] as string[],
        phone: '',
        email: '',
        membership: ListingTier.Trial,
        aiContext: '',
        image: ''
    });

    const categories = Object.values(Category);
    const areas = MPUMALANGA_AREAS;
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('lh_user');

    const handleStartApplication = (membership?: ListingTier) => {
        if (membership) setFormData(prev => ({ ...prev, membership }));
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.category || !formData.area) {
                setError('Please fill in the required fields.');
                return;
            }

            setError(null);
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1600));

            const tierDetails = PRICING_STRUCTURE[formData.membership];

            const newBusiness: Business = {
                id: `b-${Date.now()}`,
                name: formData.name,
                category: formData.category,
                subcategory: formData.subcategory || 'General',
                description: formData.description,
                location: formData.area,
                image: formData.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', 
                rating: 4.5,
                reviewCount: 1,
                tier: formData.membership,
                subscriptionDuration: tierDetails.duration,
                isPremium: formData.membership === ListingTier.Premium,
                isElite: formData.membership === ListingTier.Elite,
                isPlatinum: formData.membership === ListingTier.Platinum,
                priceLevel: '$$',
                tags: formData.tags.length > 0 ? formData.tags : ['New Listing'],
                phone: formData.phone,
                email: formData.email
            };

            onAddBusiness(newBusiness);
            setLoading(false);
            setStep(4);
        } catch (e) {
            setLoading(false);
            setError('We\'re preparing the application experience. Please refresh or try again in a moment.');
        }
    };

    // Packages UI
    const renderPackages = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {['Essential','Professional','Platinum'].map((label) => {
                const tier = label === 'Essential' ? ListingTier.Premium /* map Starter to Premium as default */ : label === 'Professional' ? ListingTier.Elite : ListingTier.Platinum;
                const tierData = PRICING_STRUCTURE[tier];
                return (
                    <div key={label} className="bg-white/3 border border-white/8 rounded-2xl p-6 flex flex-col justify-between">
                        <div>
                            <div className="text-sm text-gray-300 uppercase tracking-widest mb-2">{label === 'Platinum' ? 'Platinum (invitation only)' : label}</div>
                            <h3 className={`text-2xl font-serif mb-3 ${label === 'Platinum' ? 'text-purple-300' : 'text-white'}`}>{label}</h3>
                            <ul className="text-sm text-gray-300 space-y-2 mb-4">
                                {tierData.features.slice(0,5).map((f: string, i: number) => <li key={i} className="flex items-center gap-2"><Check size={12} className="text-gold-500" />{f}</li>)}
                            </ul>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                <div className="text-xl font-bold">R{tierData.price}</div>
                                <div className="text-xs text-gray-500">{tierData.duration}</div>
                            </div>
                            <div>
                                {label !== 'Platinum' ? (
                                    <button onClick={() => handleStartApplication(tier)} className="bg-gold-500 text-black px-4 py-2 rounded-full font-bold">Apply – {label}</button>
                                ) : (
                                    <button onClick={() => handleStartApplication(tier)} className="bg-transparent border border-white/10 text-gray-200 px-4 py-2 rounded-full font-semibold">Request Platinum Review</button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="pt-28 pb-20 container mx-auto px-4 min-h-screen">
            <SectionTitle title="List Your Business" subtitle="Join the Lowveld Hub Network" />

            {!showForm ? (
                <div className="max-w-5xl mx-auto space-y-12">
                    {/* HERO */}
                    <section className="bg-gradient-to-b from-black/60 to-black/40 rounded-2xl p-10 text-center text-white">
                        <h1 className="text-3xl md:text-4xl font-serif mb-4">List Your Business on LowveldHub</h1>
                        <p className="text-gray-300 max-w-xl mx-auto">Join Mpumalanga’s trusted digital ecosystem. Every listing is reviewed. Quality is protected.</p>
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <button onClick={() => handleStartApplication()} className="bg-white text-black px-6 py-3 rounded-full font-bold">Start Application</button>
                            <button onClick={() => { /* smooth scroll to packages */ const el = document.getElementById('packages'); if(el) el.scrollIntoView({behavior:'smooth'}); }} className="text-gray-300 underline text-sm">View Listing Packages</button>
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
                            <div>Verified Listings Only</div>
                            <div>•</div>
                            <div>AI Concierge Support</div>
                            <div>•</div>
                            <div>Trusted by Locals</div>
                        </div>
                    </section>

                    {/* HOW IT WORKS */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {[
                            { title: 'Apply for Listing', icon: '1', desc: 'Submit your business details for review' },
                            { title: 'Verification', icon: '2', desc: 'We review quality, legitimacy, and category fit' },
                            { title: 'Go Live', icon: '3', desc: 'Your business appears across search and concierge' }
                        ].map((s, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 bg-white/3 border border-white/6 rounded-xl">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-lg font-bold mb-3">{s.icon}</div>
                                <div className="text-white font-bold mb-2">{s.title}</div>
                                <div className="text-sm text-gray-300">{s.desc}</div>
                            </div>
                        ))}
                    </section>

                    {/* PACKAGES */}
                    <section id="packages">
                        <h2 className="text-xl font-serif text-white mb-4">Packages</h2>
                        {renderPackages()}
                    </section>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
                    <div className="w-full md:w-1/3 bg-white/5 p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                        <h3 className="text-xl font-serif text-white mb-6">Listing Process</h3>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-white/10 z-0"></div>
                            {[
                                { n: 1, label: 'Business Details', desc: 'Basic info & location' },
                                { n: 2, label: 'Media & Branding', desc: 'Images & contacts' },
                                { n: 3, label: 'Membership', desc: 'Select your plan' }
                            ].map((s) => (
                                <div key={s.n} className={`relative z-10 flex gap-4 ${step >= s.n ? 'opacity-100' : 'opacity-40'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${step > s.n ? 'bg-green-500 border-green-500 text-black' : step === s.n ? 'bg-gold-500 border-gold-500 text-black' : 'bg-black border-white/20 text-white'}`}>
                                        {step > s.n ? <Check size={16} /> : s.n}
                                    </div>
                                    <div>
                                        <div className={`text-sm font-bold ${step === s.n ? 'text-gold-400' : 'text-white'}`}>{s.label}</div>
                                        <div className="text-xs text-gray-500">{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 p-8 bg-[#0a0a0a]">
                        {!isLoggedIn && <div className="mb-4 p-3 bg-white/5 rounded flex items-center justify-between text-sm text-gray-200"> <div>Please sign in to apply for a listing.</div> <button onClick={() => navigate('login')} className="text-white underline">Sign In</button> </div>}
                        {error && <div className="mb-4 p-3 bg-white/3 rounded text-gray-200">{error}</div>}
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-2xl font-serif text-white mb-4">Tell us about your business</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gold-400 font-bold uppercase tracking-widest mb-2">Business Name <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            placeholder="e.g. Lowveld Logistics" 
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-colors"
                                        />
                                        <select 
                                            value={formData.subcategory}
                                            onChange={e => setFormData({...formData, subcategory: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-colors appearance-none mt-3"
                                        >
                                            <option value="" className="bg-black">Select Subcategory</option>
                                            {(CategorySubcategories[formData.category] || []).map(sub => (
                                              <option key={sub} value={sub} className="bg-black">{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <PrimaryButton onClick={() => setStep(2)}>Next Step <ChevronRight size={16}/></PrimaryButton>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-2xl font-serif text-white mb-4">Media & Contact</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gold-400 font-bold uppercase tracking-widest mb-2">Phone</label>
                                        <input 
                                            type="tel" 
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                            placeholder="+27..." 
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gold-400 font-bold uppercase tracking-widest mb-2">Email</label>
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                            placeholder="info@..." 
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold-500 outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4">
                                    <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white font-bold uppercase text-xs">Back</button>
                                    <PrimaryButton onClick={() => setStep(3)}>Next Step <ChevronRight size={16}/></PrimaryButton>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                                <h3 className="text-2xl font-serif text-white mb-4">Select Membership</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {Object.values(ListingTier).map((tier) => {
                                        const tierData = PRICING_STRUCTURE[tier];
                                        const isSelected = formData.membership === tier;
                                        return (
                                            <div 
                                                key={tier}
                                                onClick={() => setFormData({...formData, membership: tier})}
                                                className={`p-6 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${isSelected ? 'border-gold-500 bg-gold-500/10' : 'border-white/10 bg-transparent hover:border-gold-500/30'}`}
                                            >
                                                {isSelected && <div className="absolute top-0 right-0 bg-gold-500 text-black text-[10px] font-bold px-2 py-1">SELECTED</div>}
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className={`text-xl font-bold ${tier === ListingTier.Platinum ? 'text-purple-400' : tier === ListingTier.Elite ? 'text-gold-400' : 'text-white'} flex items-center gap-2`}>
                                                            {tier === ListingTier.Elite && <Crown size={18}/>}
                                                            {tier === ListingTier.Platinum && <Award size={18}/>}
                                                            {tier}
                                                        </h4>
                                                    </div>
                                                    {isSelected && <CheckCircle size={20} className="text-gold-500" />}
                                                </div>
                                                <div className="mb-4">
                                                  <div className="text-[10px] text-gold-500 font-bold uppercase tracking-widest mb-1">Visibility: {tierData.visibility}</div>
                                                  <div className="text-[10px] text-gray-500 italic">{tierData.note}</div>
                                                </div>
                                                <ul className="space-y-1.5 text-xs text-gray-300 mb-6">
                                                    {tierData.features.map((f, i) => (
                                                      <li key={i} className="flex items-center gap-2"><Check size={12} className="text-gold-500 flex-shrink-0" /> {f}</li>
                                                    ))}
                                                </ul>
                                                <div className="flex items-baseline gap-2">
                                                  <div className="text-2xl font-bold text-white">R{tierData.price}</div>
                                                  <div className="text-xs font-normal text-gray-500">/ {tierData.duration}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-between pt-6">
                                    <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white font-bold uppercase text-xs">Back</button>
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-sm shadow-[0_0_20_rgba(34,197,94,0.3)] transition-all flex items-center gap-2"
                                    >
                                        {loading ? 'Submitting...' : (formData.membership === ListingTier.Platinum ? 'Request Review' : 'Complete Listing')} {loading && <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-10">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                    <CheckCircle size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-4">Application Received!</h3>
                                <p className="text-gray-400 max-w-md mb-8">
                                    Your listing for <span className="text-white font-bold">{formData.name}</span> has been submitted as <span className="text-gold-400">{formData.membership}</span>. 
                                    {formData.membership === ListingTier.Trial ? ' It will convert to Premium automatically after 7 days.' : ' Our team will verify your details within 24–72 hours.'}
                                </p>
                                <PrimaryButton onClick={() => navigate('home')}>Back to Home</PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- FIX: MISSING RippleChar COMPONENT FOR HomeView ---
const RippleChar: React.FC<{ char: string; delay: number }> = ({ char, delay }) => (
  <span 
    className="inline-block hover:text-gold-500 transition-colors duration-300" 
    style={{ animation: `wave 2s ease-in-out infinite ${delay}ms` }}
  >
    {char}
  </span>
);

// --- FIX: MISSING CarsView COMPONENT FOR renderView ---
import CarFilters, { defaultFilters } from './components/CarFilters';
import CarModal from './components/CarModal';

const CarsView = ({ navigate, favorites, toggleFavorite, onChat, activeArea, setActiveArea }: any) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'dealerships'>('listings');
    const [filters, setFilters] = useState(defaultFilters);
    const [openCar, setOpenCar] = useState<any | null>(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredCars = useMemo(() => {
        return carListings.filter(car => {
            // Search term filter
            if (searchTerm.trim()) {
              const q = searchTerm.toLowerCase();
              const matchesSearch = car.title.toLowerCase().includes(q) || 
                                    car.dealer?.toLowerCase().includes(q) ||
                                    car.fuel?.toLowerCase().includes(q) ||
                                    car.transmission?.toLowerCase().includes(q);
              if (!matchesSearch) return false;
            }
            if (activeArea !== 'All Areas' && car.location !== activeArea) return false;
            if (filters.brand && !car.title.startsWith(filters.brand)) return false;
            if (filters.model && !car.title.toLowerCase().includes(filters.model.toLowerCase())) return false;
            if (filters.yearMin && Number(car.year) < filters.yearMin) return false;
            if (filters.yearMax && Number(car.year) > filters.yearMax) return false;
            if (filters.priceMin) {
                const p = Number((car.price || '').replace(/[^0-9]/g, ''));
                if (!isNaN(p) && p < filters.priceMin) return false;
            }
            if (filters.priceMax) {
                const p = Number((car.price || '').replace(/[^0-9]/g, ''));
                if (!isNaN(p) && p > filters.priceMax) return false;
            }
            if (filters.dealerTypes && filters.dealerTypes.length > 0) {
                const dealerType = car.isPremium ? 'Premium' : car.isVerified ? 'Verified' : 'Local';
                if (!filters.dealerTypes.includes(dealerType)) return false;
            }
            if (filters.mileageMax && car.mileage) {
                const m = Number((car.mileage || '').replace(/[^0-9]/g, ''));
                if (!isNaN(m) && m > filters.mileageMax) return false;
            }
            // fuel & transmission filters naive matching
            if (filters.fuel && filters.fuel.length > 0 && car.fuel && !filters.fuel.includes(car.fuel)) return false;
            if (filters.transmission && filters.transmission.length > 0 && car.transmission && !filters.transmission.includes(car.transmission)) return false;
            return true;
        });
    }, [carListings, activeArea, filters, searchTerm]);
  const filteredDealers = dealerships.filter(d => activeArea === 'All Areas' || d.location === activeArea);

  return (
    <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
      <SectionTitle title="Automotive" subtitle="Mpumalanga's Premier Showroom" />
      
      {/* Search Bar */}
      <div className="mb-8 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by brand, model, fuel type, transmission..."
            className="w-full px-4 py-3 pl-11 rounded-lg bg-white/10 border border-gold-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab('listings')}
            className={`px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'listings' ? 'bg-gold-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Vehicle Listings
          </button>
          <button 
            onClick={() => setActiveTab('dealerships')}
            className={`px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'dealerships' ? 'bg-gold-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Elite Dealerships
          </button>
        </div>
        <AreaSelector activeArea={activeArea} onChange={setActiveArea} />
      </div>

            {activeTab === 'listings' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="hidden lg:block lg:col-span-3">
                        <CarFilters cars={carListings} filters={filters} setFilters={setFilters} onApply={() => { setMobileFiltersOpen(false); }} />
                    </div>

                    <div className="col-span-1 lg:col-span-9">
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-sm text-gray-400">{filteredCars.length} Cars</div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setMobileFiltersOpen(true)} className="lg:hidden px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-white">Filters</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCars.map(car => (
                                <div key={car.id}>
                                    <VehicleCard car={{
                                        id: car.id,
                                        title: car.title,
                                        image: car.image,
                                        gallery: car.gallery,
                                        year: car.year,
                                        mileage: car.mileage,
                                        price: car.price,
                                        location: car.location,
                                        dealer: car.dealer,
                                        isPremium: car.isPremium,
                                        isSponsored: car.isSponsored,
                                        isVerified: car.isVerified,
                                        transmission: car.transmission,
                                        fuel: car.fuel,
                                        engine: car.engine
                                    }} isFavorite={favorites.includes(car.id)} onToggleFavorite={toggleFavorite} onView={(id) => setOpenCar(car)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {mobileFiltersOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 p-4">
                            <div className="max-w-md mx-auto">
                                <CarFilters cars={carListings} filters={filters} setFilters={setFilters} onApply={() => setMobileFiltersOpen(false)} />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {filteredDealers.map(dealer => (
            <DealershipCard key={dealer.id} dealership={dealer} />
          ))}
        </div>
      )}

            <CarModal open={!!openCar} onClose={() => setOpenCar(null)} car={openCar} />
    </div>
  );
};

// --- FIX: MISSING LowveldStoriesView COMPONENT FOR renderView ---
const LowveldStoriesView = ({ navigate, activeArea, setActiveArea }: any) => {
  // CLEAN CATEGORY SET - 4 premium categories only
  const categories = ['All', 'Business & Finance', 'Entertainment & Culture', 'News', 'Food, Travel & Leisure'];
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter stories by category
  const filteredStories = useMemo(() => {
    return stories.filter(s => {
      const areaMatch = activeArea === 'All Areas' || s.area === activeArea;
      
      // Map story types to clean categories
      let storyCategory = 'News'; // default
      if (s.type === 'Entrepreneur Spotlight' || s.category === 'Business & Finance' || s.category?.includes('Business')) {
        storyCategory = 'Business & Finance';
      } else if (s.category === 'Entertainment & Culture' || s.category?.includes('Entertainment') || s.category?.includes('Lifestyle') || s.category?.includes('Arts')) {
        storyCategory = 'Entertainment & Culture';
      } else if (s.category === 'Food, Travel & Leisure' || s.category?.includes('Food') || s.category?.includes('Travel') || s.category?.includes('Tourism')) {
        storyCategory = 'Food, Travel & Leisure';
      } else {
        storyCategory = 'News';
      }
      
      const categoryMatch = activeCategory === 'All' || storyCategory === activeCategory;
      return areaMatch && categoryMatch;
    });
  }, [activeArea, activeCategory]);

  // Separate entrepreneur spotlights from regular stories
  const spotlights = filteredStories.filter(s => s.type === 'Entrepreneur Spotlight');
  const regularStories = filteredStories.filter(s => s.type !== 'Entrepreneur Spotlight');

  return (
    <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-3 tracking-wide">The Lowveld Journal</h1>
          <p className="text-gray-400 text-base">Stories that shape the Lowveld — business, culture, and opportunity</p>
        </div>
        <AreaSelector activeArea={activeArea} onChange={setActiveArea} />
      </div>

      {/* Clean Navigation - 4 Categories Only */}
      <div className="mb-16 pb-8 border-b border-[#d4af37]/20">
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#d4af37] text-black border border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'text-gray-300 border border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Overall empty state if no stories match filters */}
      {filteredStories.length === 0 ? (
        <StoriesEmptyState navigate={navigate} />
      ) : (
        <>
      {/* Featured Entrepreneur Spotlight Section */}
      {spotlights.length > 0 && (
        <div className="mb-20 pb-16 border-b border-[#d4af37]/20">
          {/* Label instead of category */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40">
              <Crown size={16} className="text-[#ffd700]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffd700]">Entrepreneur Spotlight</span>
            </div>
          </div>
          
          <div className="space-y-8 mt-8">
            {spotlights.slice(0, 3).map(s => (
              <div key={s.id} className="group relative bg-[#121212] border border-[#d4af37]/30 rounded-2xl overflow-hidden hover:border-[#ffd700]/50 transition-all duration-300 cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                  {/* Featured image */}
                  {s.image && (
                    <div className="md:col-span-1">
                      <div className="h-48 md:h-full rounded-lg overflow-hidden">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                  )}
                  {/* Content */}
                  <div className="md:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-[#ffd700] font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span>Business & Finance</span>
                        <span>·</span>
                        <span>Entrepreneur Spotlight</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-[#ffd700] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {s.description || s.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#d4af37]/20">
                      <div className="text-xs text-gray-500">
                        {s.author && <span>{s.author}</span>}
                        {s.date && <span> · {s.date}</span>}
                      </div>
                      <ChevronRight size={18} className="text-[#d4af37] group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Stories Grid */}
      {regularStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularStories.map(s => (
            <div 
              key={s.id}
              onClick={() => navigate('story-detail', undefined, s.id)}
              className="group relative bg-[#121212] border border-[#d4af37]/20 rounded-xl overflow-hidden hover:border-[#ffd700]/50 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              {s.image && (
                <div className="h-40 overflow-hidden bg-[#0a0a0a]">
                  <img 
                    src={s.image} 
                    alt={s.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-5">
                {/* Category label */}
                <div className="text-xs text-[#d4af37] font-bold uppercase tracking-wider mb-2">
                  {s.category || activeCategory}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-[#ffd700] transition-colors">
                  {s.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {s.description || s.content}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#d4af37]/10">
                  <div className="text-xs text-gray-600">
                    {s.date && <span>{s.date}</span>}
                  </div>
                  <ChevronRight size={16} className="text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <StoriesEmptyState navigate={navigate} />
      )}
      </>
      )}
      
      {/* Be Featured Section */}
      <div className="mt-20">
        <BeFeaturedSection />
      </div>
    </div>
  );
};

// --- WHY PEOPLE USE SECTION (NEW) ---
const WhyPeopleUseSection = () => (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <SectionTitle 
                title="Why People Use LowveldHub" 
                subtitle="The Region's Most Trusted Digital Companion" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {[
                    {
                        title: "Verified Excellence",
                        desc: "Every business is vetted for quality.",
                        icon: ShieldCheck
                    },
                    {
                        title: "The Super App",
                        desc: "One trusted platform instead of 10 different apps.",
                        icon: Grid
                    },
                    {
                        title: "AI Concierge",
                        desc: "Local knowledge, powered by intelligent AI.",
                        icon: Sparkles
                    },
                    {
                        title: "Community Trust",
                        desc: "Real reviews from real locals.",
                        icon: Users
                    }
                ].map((item, idx) => (
                    <div key={idx} className="group relative bg-white/[0.02] backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] text-center transition-all duration-500 hover:border-gold-500/30 hover:shadow-[0_20px_50px_-20px_rgba(227,185,44,0.1)] animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="w-16 h-16 rounded-2xl bg-gold-500/5 border border-gold-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-gold-500/10 group-hover:border-gold-500/20">
                            <item.icon className="text-gold-500" size={28} strokeWidth={1.5} />
                        </div>
                        <h4 className="text-white font-serif text-2xl mb-3 tracking-tight">{item.title}</h4>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const MarketplaceView = ({ navigate, favorites, toggleFavorite, onChat, activeArea, setActiveArea }: any) => {
    const [selectedMarketCategory, setSelectedMarketCategory] = useState('All Products');
    const [marketSearch, setMarketSearch] = useState('');
    const [isAiSearching, setIsAiSearching] = useState(false);
    const [aiResults, setAiResults] = useState<string[] | null>(null);
    
    // Exact requested categories + All Products
    const marketCategories = [
        'All Products', 'Electronics', 'Fashion', 'Beauty & Personal Care', 
        'Home & Living', 'Art & Collectibles', 'Jewellery & Accessories', 
        'Outdoor & Garden', 'Local Handmade'
    ];

    const handleAiSearch = async () => {
        if (!marketSearch.trim()) return;
        setIsAiSearching(true);
        try {
            const results = await performSmartSearch(marketSearch);
            setAiResults(results);
        } catch (e) {
            console.error("AI Search Error:", e);
        } finally {
            setIsAiSearching(false);
        }
    };

    const filteredItems = useMemo(() => {
        let base = marketplaceItems;
        
        // Semantic prioritize from AI results if present
        if (aiResults && marketSearch) {
            base = [...base].sort((a, b) => {
                const aIn = aiResults.includes(a.id) ? 1 : 0;
                const bIn = aiResults.includes(b.id) ? 1 : 0;
                return bIn - aIn;
            });
        }

        return base.filter(item => {
            const areaMatch = activeArea === 'All Areas' || item.location === activeArea;
            const categoryMatch = selectedMarketCategory === 'All Products' || item.category === selectedMarketCategory;
            const searchMatch = !marketSearch || 
                               item.name.toLowerCase().includes(marketSearch.toLowerCase()) ||
                               item.seller.toLowerCase().includes(marketSearch.toLowerCase()) ||
                               (item.description && item.description.toLowerCase().includes(marketSearch.toLowerCase()));
            return areaMatch && categoryMatch && searchMatch;
        });
    }, [activeArea, selectedMarketCategory, marketSearch, aiResults]);

    return (
        <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <SectionTitle title="Marketplace" subtitle="Regional Luxury & Handpicked Gems" />
                    <button onClick={() => onChat("Find something unique in the marketplace")} className="text-gold-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mt-2 group bg-gold-500/5 px-3 py-1.5 rounded-full border border-gold-500/20 hover:bg-gold-500/10 transition-all">
                        <Sparkles size={12} className="group-hover:animate-pulse text-gold-500" /> Shopping Assistant
                    </button>
                </div>
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                    {/* Area Select */}
                    <AreaSelector activeArea={activeArea} onChange={setActiveArea} />
                </div>
            </div>

            {/* Keyword Search Bar with AI Integration */}
            <div className="mb-10 relative max-w-2xl mx-auto">
                <div className={`absolute -inset-1 bg-gradient-to-r from-gold-500/20 via-gold-500/5 to-transparent rounded-2xl blur-md transition-opacity duration-700 ${isAiSearching ? 'opacity-100 animate-pulse' : 'opacity-30 group-hover:opacity-60'}`}></div>
                <div className="relative flex items-center bg-[#0d0d0d] border border-white/10 rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300 focus-within:border-gold-500/50 focus-within:bg-[#121212]">
                    <Search className={`mr-4 transition-colors ${isAiSearching ? 'text-gold-400' : 'text-gold-500'}`} size={24} strokeWidth={1.5} />
                    <input 
                        type="text" 
                        value={marketSearch}
                        onChange={(e) => { setMarketSearch(e.target.value); if(aiResults) setAiResults(null); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                        placeholder="Search products: 'headphones', 'leather bag', 'rug'..." 
                        className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 font-sans text-lg"
                    />
                    <div className="flex items-center gap-3">
                        {marketSearch && (
                            <button onClick={() => { setMarketSearch(''); setAiResults(null); }} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>
                
            </div>

            {/* Sub-navigation for Categories */}
            <div className="mb-10 overflow-x-auto pb-4 no-scrollbar">
                <div className="flex gap-3">
                    {marketCategories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedMarketCategory(cat)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-500 whitespace-nowrap ${
                                selectedMarketCategory === cat 
                                ? 'bg-gold-500 border-gold-500 text-black shadow-xl shadow-gold-500/20 scale-105' 
                                : 'bg-white/5 border-white/10 text-gray-400 hover:border-gold-500/30 hover:text-gold-400'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {filteredItems.map(item => (
                    <div key={item.id} className="h-auto">
                        <LuxuryCard 
                            id={item.id}
                            title={item.name}
                            image={item.image}
                            logo={(item as any).logo || item.image}
                            subtitle={`${item.category} • ${item.seller}`}
                            price={item.price}
                            location={item.location}
                            badge={item.isSponsored ? 'Featured' : undefined}
                            isFeatured={item.isSponsored}
                            isFavorite={favorites.includes(item.id)}
                            onToggleFavorite={toggleFavorite}
                            isVerifiedSeller={item.isVerifiedSeller}
                            isLocalVendor={item.isLocalVendor}
                            facebookUrl={item.socialLinks?.facebook}
                            instagramUrl={item.socialLinks?.instagram}
                            twitterUrl={item.socialLinks?.twitter}
                            linkedinUrl={item.socialLinks?.linkedin}
                            tiktokUrl={item.socialLinks?.tiktok}
                            compact={true}
                            onPress={() => {}}
                        />
                    </div>
                ))}
                
                {filteredItems.length === 0 && (
                    <div className="col-span-full text-center py-32 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/5">
                        <div className="w-24 h-24 bg-gold-500/5 border border-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag size={40} className="text-gold-500/30" />
                        </div>
                        <h3 className="text-3xl text-white font-serif mb-4">No treasures found</h3>
                        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                            We couldn't find any products matching your criteria in <span className="text-white font-bold">{activeArea}</span>. Try adjusting your search or exploring other categories.
                        </p>
                        <button 
                            onClick={() => { setSelectedMarketCategory('All Products'); setActiveArea('All Areas'); setMarketSearch(''); setAiResults(null); }}
                            className="mt-10 text-gold-500 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-all flex items-center gap-2 mx-auto border border-gold-500/20 px-6 py-3 rounded-full hover:bg-gold-500/5"
                        >
                            <RefreshCw size={14} /> Clear All Filters
                        </button>
                    </div>
                )}
            </div>
            
            <div className="mt-24 p-16 rounded-[3rem] bg-gradient-to-br from-[#0c0c0c] to-[#050505] border border-white/5 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-gold-500/10 transition-all duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 relative z-10">Exclusive Digital Storefronts</h2>
                <p className="text-gray-400 text-base max-w-2xl mx-auto mb-12 relative z-10 leading-relaxed uppercase tracking-widest">
                    Mpumalanga's most discerning audience is waiting for your quality products. <br/> From tech innovation to artisanal fashion — claim your space.
                </p>
                <div className="flex justify-center relative z-10">
                    <button 
                        onClick={() => navigate('list-your-business')}
                        className="bg-white hover:bg-gold-500 text-black px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.25em] transition-all transform hover:-translate-y-2 shadow-2xl shadow-white/5 hover:shadow-gold-500/20"
                    >
                        Launch Your Store
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- ADDITIONAL COMPONENTS & MAIN APP ---

const BusinessSignupView = ({ navigate }: any) => (
    <div className="pt-28 pb-20 container mx-auto px-4 text-center">
        <SectionTitle title="Partner with Us" subtitle="Business Signup" />
        <p className="text-gray-400 mb-8">Ready to take your business to the next level? Join the Lowveld's premier digital directory.</p>
        <PrimaryButton onClick={() => navigate('list-your-business')}>Get Started</PrimaryButton>
    </div>
);

const CreatorBusinessView = ({ navigate }: any) => (
    <div className="pt-28 pb-20 container mx-auto px-4">
        <CreatorBusinessSpotlight />
    </div>
);

const AboutUsView = () => (
    <div style={{ background: '#000000', color: '#ffffff', minHeight: '100vh' }} className="pb-20">
        {/* Hero Section - Clean & Luxurious */}
        <div style={{ background: '#000000', paddingTop: '100px', paddingBottom: '80px' }}>
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '300', letterSpacing: '0.05em', marginBottom: '24px', fontFamily: 'Georgia, serif' }} className="text-white leading-tight">
                    Elevating Mpumalanga
                </h1>
                <p style={{ fontSize: '18px', fontWeight: '300', lineHeight: '1.8', letterSpacing: '0.01em' }} className="text-gray-300 max-w-3xl mx-auto">
                    LowveldHub curates Africa's finest experiences and businesses in Mpumalanga. We believe in quality over noise, authenticity over algorithms, and excellence as the only standard.
                </p>
            </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
            {/* Mission Statement - Minimal, Clean */}
            <div style={{ paddingTop: '60px', paddingBottom: '60px', borderTop: '1px solid rgba(201, 162, 77, 0.3)', borderBottom: '1px solid rgba(201, 162, 77, 0.3)' }}>
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Mission */}
                    <div>
                        <h3 style={{ color: '#C9A24D', fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                            MISSION
                        </h3>
                        <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.8', color: '#ffffff' }}>
                            Connect discerning customers with Mpumalanga's most exceptional businesses—uncompromising in quality, transparent in purpose.
                        </p>
                    </div>

                    {/* Vision */}
                    <div>
                        <h3 style={{ color: '#C9A24D', fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                            VISION
                        </h3>
                        <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.8', color: '#ffffff' }}>
                            To position Mpumalanga as Africa's premier destination for luxury experiences and verified excellence in every category.
                        </p>
                    </div>

                    {/* Promise */}
                    <div>
                        <h3 style={{ color: '#C9A24D', fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                            PROMISE
                        </h3>
                        <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.8', color: '#ffffff' }}>
                            Every business verified. Every recommendation worthy. Every customer treated as discerning. We never compromise on standards.
                        </p>
                    </div>
                </div>
            </div>

            {/* What Sets Us Apart - Minimal List */}
            <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '300', letterSpacing: '0.02em', marginBottom: '50px', fontFamily: 'Georgia, serif' }} className="text-white text-center">
                    What Sets Us Apart
                </h2>

                <div className="space-y-12">
                    {/* Feature 1 */}
                    <div className="flex gap-6">
                        <div style={{ color: '#C9A24D', fontSize: '24px', minWidth: '30px', fontWeight: '300' }}>✦</div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }} className="text-white">
                                Curated, Not Crowded
                            </h4>
                            <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.7', color: '#d4d4d8' }}>
                                We don't list every business. We invite the exceptional ones. Every listing passes rigorous verification. No spam. No mediocrity.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex gap-6">
                        <div style={{ color: '#C9A24D', fontSize: '24px', minWidth: '30px', fontWeight: '300' }}>✦</div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }} className="text-white">
                                AI-Powered Intelligence
                            </h4>
                            <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.7', color: '#d4d4d8' }}>
                                Our concierge learns your preferences and delivers truly personalized recommendations. Technology that understands, not overwhelms.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex gap-6">
                        <div style={{ color: '#C9A24D', fontSize: '24px', minWidth: '30px', fontWeight: '300' }}>✦</div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }} className="text-white">
                                Verified Excellence
                            </h4>
                            <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.7', color: '#d4d4d8' }}>
                                We assess quality, authenticity, and credibility. Your trust is sacred. Every recommendation is legitimate.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex gap-6">
                        <div style={{ color: '#C9A24D', fontSize: '24px', minWidth: '30px', fontWeight: '300' }}>✦</div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }} className="text-white">
                                Zero Commission Model
                            </h4>
                            <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.7', color: '#d4d4d8' }}>
                                Pay once, list forever. No percentage extraction. Business and customer connect directly. Fairness by design.
                            </p>
                        </div>
                    </div>

                    {/* Feature 5 */}
                    <div className="flex gap-6">
                        <div style={{ color: '#C9A24D', fontSize: '24px', minWidth: '30px', fontWeight: '300' }}>✦</div>
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }} className="text-white">
                                Community-First Philosophy
                            </h4>
                            <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.7', color: '#d4d4d8' }}>
                                We celebrate Mpumalanga. Every business tells a story worth experiencing. We're not just a platform—we're stewards of authenticity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two-Column Ecosystem - No Boxes */}
            <div style={{ paddingTop: '60px', paddingBottom: '60px', borderTop: '1px solid rgba(201, 162, 77, 0.3)' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '300', letterSpacing: '0.02em', marginBottom: '50px', fontFamily: 'Georgia, serif' }} className="text-white text-center">
                    For Everyone
                </h2>

                <div className="grid md:grid-cols-2 gap-16">
                    {/* For Businesses */}
                    <div>
                        <h4 style={{ color: '#C9A24D', fontSize: '14px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
                            Businesses
                        </h4>
                        <ul className="space-y-4">
                            <li style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.6', color: '#d4d4d8' }}>
                                Be discovered by discerning customers actively seeking premium experiences
                            </li>
                            <li style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.6', color: '#d4d4d8' }}>
                                Skip the middleman. No commissions. Direct customer relationships.
                            </li>
                            <li style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.6', color: '#d4d4d8' }}>
                                Join a community of verified excellence in your category
                            </li>
                            <li style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.6', color: '#d4d4d8' }}>
                                Grow authentically. No extraction. No selling out.
                            </li>
                        </ul>
                    </div>

                    {/* For Customers */}
                    <div>
                        <h4 style={{ color: '#C9A24D', fontSize: '14px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
                            Customers
                        </h4>
                        <ul className="space-y-4">
                            <li style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.6', color: '#d4d4d8' }}>
                                Discover verified, authentic experiences curated for quality
                            </li>
                            <li style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.6', color: '#d4d4d8' }}>
                                Get personalized recommendations that actually understand you
                            </li>
                            <li style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.6', color: '#d4d4d8' }}>
                                Support local businesses directly. No intermediaries.
                            </li>
                            <li style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.6', color: '#d4d4d8' }}>
                                Experience Mpumalanga's finest, without the noise
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Philosophy - Centered, No Box */}
            <div style={{ paddingTop: '80px', paddingBottom: '80px', borderTop: '1px solid rgba(201, 162, 77, 0.3)' }}>
                <div className="text-center">
                    <p style={{ fontSize: '28px', fontWeight: '300', lineHeight: '1.8', letterSpacing: '0.01em', marginBottom: '32px', fontFamily: 'Georgia, serif' }} className="text-white">
                        In a world drowning in noise, <span style={{ color: '#C9A24D' }}>clarity wins</span>.
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.8', color: '#d4d4d8', maxWidth: '600px', margin: '0 auto' }}>
                        We believe the best experiences come from trusted recommendations. Businesses deserve freedom, not extraction. And Mpumalanga's culture deserves a platform that honors its authenticity—not algorithms optimized for engagement.
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.8', color: '#d4d4d8', maxWidth: '600px', margin: '24px auto 0' }}>
                        LowveldHub is built on three principles: <span style={{ color: '#C9A24D' }}>Quality matters. Trust is earned. Excellence is non-negotiable.</span>
                    </p>
                </div>
            </div>

            {/* Stats - Simple, Clean */}
            <div style={{ paddingTop: '60px', paddingBottom: '60px', borderTop: '1px solid rgba(201, 162, 77, 0.3)' }}>
                <div className="grid md:grid-cols-4 gap-12 text-center">
                    <div>
                        <div style={{ color: '#C9A24D', fontSize: '42px', fontWeight: '300', marginBottom: '12px' }}>65+</div>
                        <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af' }}>Areas</p>
                    </div>
                    <div>
                        <div style={{ color: '#C9A24D', fontSize: '42px', fontWeight: '300', marginBottom: '12px' }}>28</div>
                        <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af' }}>Categories</p>
                    </div>
                    <div>
                        <div style={{ color: '#C9A24D', fontSize: '42px', fontWeight: '300', marginBottom: '12px' }}>1000+</div>
                        <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af' }}>Listings</p>
                    </div>
                    <div>
                        <div style={{ color: '#C9A24D', fontSize: '42px', fontWeight: '300', marginBottom: '12px' }}>∞</div>
                        <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af' }}>Possibilities</p>
                    </div>
                </div>
            </div>

            {/* Final CTA - Minimal */}
            <div style={{ paddingTop: '80px', paddingBottom: '40px', borderTop: '1px solid rgba(201, 162, 77, 0.3)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '32px', fontWeight: '300', marginBottom: '20px', fontFamily: 'Georgia, serif' }} className="text-white">
                    Ready to Experience Excellence?
                </h3>
                <p style={{ fontSize: '15px', fontWeight: '300', lineHeight: '1.8', color: '#d4d4d8', maxWidth: '500px', margin: '0 auto 40px' }}>
                    Whether you're a business seeking premium exposure or a customer discovering authentic experiences—LowveldHub is your platform.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <button style={{ background: '#C9A24D', color: '#000000', padding: '14px 48px', borderRadius: '0px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s ease', boxShadow: '0 8px 24px rgba(201, 162, 77, 0.25)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(201, 162, 77, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 162, 77, 0.25)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        List Your Business
                    </button>
                    <button style={{ background: 'transparent', color: '#C9A24D', border: '1px solid #C9A24D', padding: '14px 48px', borderRadius: '0px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201, 162, 77, 0.05)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                        Explore Directory
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const MicroTasksView = () => (
    <div className="pt-28 pb-20 container mx-auto px-4">
        <SectionTitle title="Micro Tasks" subtitle="" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {microTasks.map(task => (
                <div key={task.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex justify-between items-center">
                    <div>
                        <h4 className="text-white font-bold">{task.title}</h4>
                        <p className="text-gray-500 text-xs">{task.category}</p>
                    </div>
                    <div className="text-gold-500 font-bold">{task.payout}</div>
                </div>
            ))}
        </div>
    </div>
);

const SellerEarningsView = () => (
    <div className="pt-28 pb-20 container mx-auto px-4">
        <SectionTitle title="Seller Center" subtitle="Manage Your Earnings" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Total Sales</div>
                <div className="text-2xl font-serif text-white">R {sellerStats.totalSales}</div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Pending</div>
                <div className="text-2xl font-serif text-white">R {sellerStats.pendingBalance}</div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Withdrawable</div>
                <div className="text-2xl font-serif text-gold-500">R {sellerStats.withdrawableBalance}</div>
            </div>
        </div>
    </div>
);

const RewardsView = () => (
    <div className="pt-28 pb-20 container mx-auto px-4">
        <SectionTitle title="Rewards" subtitle="Loyalty Program" />
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-12 flex items-center justify-between">
            <div>
                <div className="text-gray-400 text-sm mb-1">Current Points</div>
                <div className="text-4xl font-serif text-gold-400">{rewardStats.points}</div>
            </div>
            <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Next Tier</div>
                <div className="bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded">PLATINUM</div>
            </div>
        </div>
    </div>
);

const SellOnMarketplaceView = ({ navigate }: { navigate: Function }) => (
    <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
            {/* Page Title & Intro */}
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Sell on LowveldHub Marketplace</h1>
                <p className="text-xl text-gray-400 mb-4">Reach customers who value quality</p>
                <div className="max-w-2xl mx-auto space-y-3 text-gray-300">
                    <p>LowveldHub Marketplace is designed for businesses that take pride in what they offer.</p>
                    <p>We connect you with a refined audience actively looking for trusted products and services across Mpumalanga.</p>
                </div>
            </div>

            {/* Why Sell With Us */}
            <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                    <h3 className="text-white font-serif text-lg mb-3">Curated Exposure</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Your products are showcased in a premium environment — not lost in clutter
                    </p>
                </div>
                <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                    <h3 className="text-white font-serif text-lg mb-3">High-Intent Customers</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        We attract buyers who value quality, not just price
                    </p>
                </div>
                <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                    <h3 className="text-white font-serif text-lg mb-3">Built for Growth</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        From small sellers to established brands, we scale with you
                    </p>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center">Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Entry */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                        <div className="mb-4">
                            <h3 className="text-white font-serif text-lg mb-1">Entry — 30 Days</h3>
                            <p className="text-gray-400 text-sm">5 products/month • Basic listing</p>
                        </div>
                        <div className="text-gold-400 text-2xl font-semibold">R60/month</div>
                    </div>

                    {/* Starter */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                        <div className="mb-4">
                            <h3 className="text-white font-serif text-lg mb-1">Starter — 90 Days</h3>
                            <p className="text-gray-400 text-sm">20 products/month • Product analytics</p>
                        </div>
                        <div className="text-gold-400 text-2xl font-semibold">R150/quarter</div>
                    </div>

                    {/* Pro */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                        <div className="mb-4">
                            <h3 className="text-white font-serif text-lg mb-1">Pro — 365 Days</h3>
                            <p className="text-gray-400 text-sm">Unlimited products • Featured badge • Priority support</p>
                        </div>
                        <div className="text-gold-400 text-2xl font-semibold">R300/year</div>
                    </div>

                    {/* One-Off */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                        <div className="mb-4">
                            <h3 className="text-white font-serif text-lg mb-1">One-Off — 30 Days</h3>
                            <p className="text-gray-400 text-sm">1 product only</p>
                        </div>
                        <div className="text-gold-400 text-2xl font-semibold">R25 once-off</div>
                    </div>
                </div>
            </div>

            {/* How to Get Started */}
            <div className="mb-16 bg-gradient-to-br from-gold-500/10 to-white/5 border border-gold-500/20 rounded-xl p-12">
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">How to Get Started</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    We keep our marketplace curated to maintain quality.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                    To apply, email us with your business details:
                </p>

                {/* Email CTA */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-8 mb-8">
                    <p className="text-gray-400 text-sm mb-2">Email Application To:</p>
                    <a 
                        href="mailto:info@lowveldhub.co.za" 
                        className="text-gold-400 hover:text-gold-300 transition font-semibold text-lg block mb-6"
                    >
                        info@lowveldhub.co.za
                    </a>
                    <p className="text-gray-400 text-sm mb-4 font-semibold">Include:</p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Business name</li>
                        <li>• What you sell</li>
                        <li>• Photos (if available)</li>
                        <li>• Contact details</li>
                    </ul>
                </div>

                {/* Action Button */}
                <a 
                    href="mailto:info@lowveldhub.co.za"
                    className="inline-block w-full md:w-auto bg-gradient-to-r from-gold-500 to-gold-400 text-black px-8 py-4 rounded-lg font-bold hover:shadow-[0_8px_24px_rgba(212,175,55,0.4)] transition-all duration-300 text-center"
                >
                    Email Application
                </a>
            </div>

            {/* Closing Line */}
            <div className="text-center border-t border-white/10 pt-12">
                <p className="text-lg text-white font-serif italic">
                    We don't accept every seller — only those who meet our standards.
                </p>
            </div>
        </div>
    </div>
);

const ContactUsView = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [contactLoading, setContactLoading] = useState(false);
    const [contactError, setContactError] = useState('');
    const [contactSuccess, setContactSuccess] = useState(false);

    const handleContactChange = (field: string, value: string) => {
        setContactForm(prev => ({ ...prev, [field]: value }));
    };

    const handleContactSubmit = async () => {
        setContactError('');
        if (!contactForm.name.trim()) { setContactError('Name is required'); return; }
        if (!contactForm.email.trim()) { setContactError('Email is required'); return; }
        if (!contactForm.subject.trim()) { setContactError('Subject is required'); return; }
        if (!contactForm.message.trim()) { setContactError('Message is required'); return; }
        
        setContactLoading(true);
        try {
            // Backend API call would go here
            console.log('Contact form submitted:', contactForm);
            setContactSuccess(true);
            setContactForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setContactSuccess(false), 5000);
        } catch (err) {
            setContactError('Failed to send message. Please try again.');
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Page Title */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Get in Touch</h1>
                </div>

                {/* Let's Connect Section */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                        Whether you have a question, feedback, or you're ready to partner with us — we'd love to hear from you.
                    </p>
                    <p className="text-gray-400 italic">
                        Every message is handled with care and intention.
                    </p>
                </div>

                {/* Contact Details Section */}
                <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Email */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                        <h3 className="text-white font-serif text-lg mb-1">Email</h3>
                        <p className="text-gray-400 text-sm mb-4">Best for detailed inquiries and partnership opportunities</p>
                        <a href="mailto:info@lowveldhub.co.za" className="text-gold-400 hover:text-gold-300 transition font-semibold text-base block mb-2">
                            info@lowveldhub.co.za
                        </a>
                        <p className="text-gray-500 text-xs">Response time: 24–48 hours</p>
                    </div>

                    {/* Phone */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                        <h3 className="text-white font-serif text-lg mb-1">Phone</h3>
                        <p className="text-gray-400 text-sm mb-4">For urgent matters and direct conversations</p>
                        <a href="tel:+27664555888" className="text-gold-400 hover:text-gold-300 transition font-semibold text-base block mb-2">
                            +27 66 455 5888
                        </a>
                        <p className="text-gray-500 text-xs">Monday – Friday, 9 AM – 5 PM (SAST)</p>
                    </div>

                    {/* Location */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                        <h3 className="text-white font-serif text-lg mb-1">Location</h3>
                        <p className="text-gray-400 text-sm mb-4">Rooted in Mpumalanga, serving the entire region</p>
                        <p className="text-gray-300 font-semibold text-base mb-1">Nelspruit, Mpumalanga</p>
                        <p className="text-gray-500 text-xs">South Africa</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center">Frequently Asked</h2>
                    <div className="space-y-8">
                        {/* Q&A 1 */}
                        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                            <h3 className="text-white font-serif text-lg mb-4">How long does it take for my business to be listed?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Our review process typically takes 24–72 hours. We carefully assess quality, presentation, and alignment with our standards.
                            </p>
                        </div>

                        {/* Q&A 2 */}
                        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                            <h3 className="text-white font-serif text-lg mb-4">What's included in each listing package?</h3>
                            <div className="text-gray-300 leading-relaxed space-y-3">
                                <p><span className="text-gold-400 font-semibold">Essential (R799)</span> — Business profile, contact details, images, and description</p>
                                <p><span className="text-gold-400 font-semibold">Professional (R1,299)</span> — Priority placement, ELITE badge, top category ranking</p>
                                <p><span className="text-gold-400 font-semibold">Platinum (R1,999)</span> — Homepage spotlight, newsletter feature, and AI-powered promotion</p>
                            </div>
                        </div>

                        {/* Q&A 3 */}
                        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                            <h3 className="text-white font-serif text-lg mb-4">Can I update my listing after it goes live?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Yes. You can update your business information, images, and details anytime from your dashboard. Changes reflect instantly.
                            </p>
                        </div>

                        {/* Q&A 4 */}
                        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                            <h3 className="text-white font-serif text-lg mb-4">Is there a commission on transactions?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                No. We charge a one-time listing fee — you keep 100% of your revenue.
                            </p>
                        </div>

                        {/* Q&A 5 */}
                        <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8">
                            <h3 className="text-white font-serif text-lg mb-4">What if my business isn't approved?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                We'll provide clear feedback. Most applications are declined due to incomplete information or low-quality visuals — both can be improved and resubmitted.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Still Have Questions Section */}
                <div className="text-center mb-16 bg-gradient-to-br from-gold-500/10 to-white/5 border border-gold-500/20 rounded-xl p-12">
                    <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">Still Have Questions</h2>
                    <p className="text-gray-300 text-lg">
                        We're here to help — and to guide you toward building a stronger presence on LowveldHub.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-8 mb-16">
                    <h3 className="text-white font-serif text-xl mb-6">Send a Message</h3>
                    {contactSuccess && (
                        <div className="mb-4 bg-green-500/20 border border-green-500/40 rounded-lg px-4 py-3 text-green-300 text-sm font-semibold">
                            ✓ Message sent successfully! We'll be in touch soon.
                        </div>
                    )}
                    {contactError && (
                        <div className="mb-4 bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-3 text-red-300 text-sm font-semibold">
                            ✕ {contactError}
                        </div>
                    )}
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            value={contactForm.name}
                            onChange={(e) => handleContactChange('name', e.target.value)}
                            className="w-full bg-black border border-white/30 px-4 py-3 rounded-lg text-white placeholder-white/40 focus:border-gold-500 focus:outline-none transition-colors duration-200 hover:border-white/50" 
                        />
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            value={contactForm.email}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                            className="w-full bg-black border border-white/30 px-4 py-3 rounded-lg text-white placeholder-white/40 focus:border-gold-500 focus:outline-none transition-colors duration-200 hover:border-white/50" 
                        />
                        <input 
                            type="text" 
                            placeholder="Subject" 
                            value={contactForm.subject}
                            onChange={(e) => handleContactChange('subject', e.target.value)}
                            className="w-full bg-black border border-white/30 px-4 py-3 rounded-lg text-white placeholder-white/40 focus:border-gold-500 focus:outline-none transition-colors duration-200 hover:border-white/50" 
                        />
                        <textarea 
                            placeholder="Your Message" 
                            rows={5} 
                            value={contactForm.message}
                            onChange={(e) => handleContactChange('message', e.target.value)}
                            className="w-full bg-black border border-white/30 px-4 py-3 rounded-lg text-white placeholder-white/40 focus:border-gold-500 focus:outline-none transition-colors duration-200 hover:border-white/50 resize-none" 
                        ></textarea>
                        <button 
                            onClick={handleContactSubmit}
                            disabled={contactLoading}
                            className="w-full bg-gradient-to-r from-gold-500 to-gold-400 text-black px-6 py-3 rounded-lg font-bold hover:shadow-[0_8px_24px_rgba(212,175,55,0.4)] transition-all duration-300 disabled:opacity-60"
                        >
                            {contactLoading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </div>

                {/* Closing Line */}
                <div className="text-center text-gray-400 text-sm border-t border-white/10 pt-12">
                    <p className="text-lg text-white font-serif">LowveldHub is curated. Listings are verified. Excellence is the standard.</p>
                </div>
            </div>
        </div>
    );
};

const Footer = ({ navigate, onLogin }: any) => {
  const [email, setEmail] = useState('');
  const [newsSubStatus, setNewsSubStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setNewsSubStatus('error');
      setTimeout(() => setNewsSubStatus('idle'), 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setNewsSubStatus('success');
        localStorage.setItem('lh-newsletter-' + email, 'true');
        setTimeout(() => { setNewsSubStatus('idle'); setEmail(''); }, 3000);
      } else {
        setNewsSubStatus('error');
        setTimeout(() => setNewsSubStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setNewsSubStatus('error');
      setTimeout(() => setNewsSubStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-[#0f0f0f] border-t border-gold-500/20 pt-24 pb-12">
        <div className="container mx-auto px-4">

                <div className="mb-8 text-center">
                    <p className="text-gray-400 text-sm leading-relaxed">We exist to bridge the gap between quality businesses and quality audiences.</p>
                </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
                <div className="col-span-2">
                    <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate('home')}>
                        <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center font-serif font-bold text-black">LH</div>
                        <span className="text-lg font-serif tracking-widest text-white uppercase">LOWVELD<span className="text-gold-500">HUB</span></span>
                    </div>
                    <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                        LowveldHub — Mpumalanga's premier digital ecosystem, connecting discerning consumers with the region's most trusted businesses and experiences.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.15em] mb-8 text-gold-400">Explore</h4>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li><button onClick={() => navigate('directory')} className="hover:text-gold-400 transition-colors duration-300">Directory</button></li>
                        <li><button onClick={() => navigate('marketplace')} className="hover:text-gold-400 transition-colors duration-300">Marketplace</button></li>
                        <li><button onClick={() => navigate('real-estate')} className="hover:text-gold-400 transition-colors duration-300">Real Estate</button></li>
                        <li><button onClick={() => navigate('cars')} className="hover:text-gold-400 transition-colors duration-300">Automotive</button></li>
                        <li><button onClick={() => navigate('stays')} className="hover:text-gold-400 transition-colors duration-300">Stays</button></li>
                        <li><button onClick={() => navigate('lowveld-stories')} className="hover:text-gold-400 transition-colors duration-300">Stories</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.15em] mb-8 text-gold-400">Platform</h4>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li><button onClick={() => navigate('list-your-business')} className="hover:text-gold-400 transition-colors duration-300">Add Listing</button></li>
                        <li><button onClick={() => navigate('add-product')} className="hover:text-gold-400 transition-colors duration-300">Sell on Marketplace</button></li>
                        <li><button onClick={() => navigate('contact-us')} className="hover:text-gold-400 transition-colors duration-300">Contact Us</button></li>

                        <li><button onClick={() => navigate('about')} className="hover:text-gold-400 transition-colors duration-300">About Us</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.15em] mb-8 text-gold-400">Social</h4>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/lowveldhub" target="_blank" rel="noopener noreferrer">
                            <Facebook size={20} className="text-gray-500 hover:text-gold-400 cursor-pointer transition-colors duration-300" />
                        </a>
                        <a href="https://www.instagram.com/lowveldhub" target="_blank" rel="noopener noreferrer">
                            <Instagram size={20} className="text-gray-500 hover:text-gold-400 cursor-pointer transition-colors duration-300" />
                        </a>
                        <a href="https://www.twitter.com/lowveldhub" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} className="text-gray-500 hover:text-gold-400 cursor-pointer transition-colors duration-300" />
                        </a>
                        <a href="https://www.tiktok.com/@lowveldhub" target="_blank" rel="noopener noreferrer">
                            <Music size={20} className="text-gray-500 hover:text-gold-400 cursor-pointer transition-colors duration-300" />
                        </a>
                        <a href="https://www.youtube.com/@lowveldhub" target="_blank" rel="noopener noreferrer">
                            <Youtube size={20} className="text-gray-500 hover:text-gold-400 cursor-pointer transition-colors duration-300" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/5 pt-12">
              {/* Newsletter Signup */}
              <div className="mb-12 max-w-lg mx-auto">
                <h4 className="text-white font-semibold text-center mb-3">Stay Updated</h4>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNewsletterSubscribe()}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-gold-500"
                  />
                  <button 
                    onClick={handleNewsletterSubscribe}
                    className="bg-gold-500 hover:bg-gold-600 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                  >
                    {newsSubStatus === 'success' ? '✓' : 'Join'}
                  </button>
                </div>
                {newsSubStatus === 'success' && <p className="text-green-400 text-xs mt-2 text-center">Thanks for subscribing!</p>}
                {newsSubStatus === 'error' && <p className="text-red-400 text-xs mt-2 text-center">Please enter a valid email</p>}
              </div>
              <div className="text-center border-t border-white/5 pt-8">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">&copy; 2026 LowveldHub Mpumalanga. All Rights Reserved.</p>
              </div>
            </div>
        </div>
    </footer>
  );
};

const DirectoryView = ({ navigate, favorites, toggleFavorite, businesses, initialCategory, initialSubcategory, activeArea, setActiveArea }: any) => {
    // ✅ OPTIMIZED: Initialize with ALL categories visible (not lazy-load by category)
    const [filteredItems, setFilteredItems] = useState(businesses);
    const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'All');
    const [activeSub, setActiveSub] = useState<string>(initialSubcategory || 'All');
    const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(true); // ✅ Force show all cards on mount

    useEffect(() => {
        // ✅ Show all categories on mount, then allow filtering
        if (showAllCategories) {
            const timer = setTimeout(() => setShowAllCategories(false), 100);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if(initialCategory) setActiveCategory(initialCategory);
        if(initialSubcategory) setActiveSub(initialSubcategory);
    }, [initialCategory, initialSubcategory]);

    const categories = [
        { label: Category.FoodAndHospitality, icon: FoodIcon },
        { label: Category.TourismTravelAndStays, icon: TourismIcon },
        { label: Category.LuxuryAndLifestyle, icon: LuxuryIcon },
        { label: Category.NightlifeAndEntertainment, icon: NightlifeIcon },
        { label: Category.BeautyWellnessPersonalCare, icon: BeautyIcon },
        { label: Category.HealthAndMedical, icon: HealthIcon },
        { label: Category.RealEstateAndProperty, icon: RealEstateIcon },
        { label: Category.Automotive, icon: AutomotiveIcon },
        { label: Category.TransportChauffeursFleet, icon: TransportIcon },
        { label: Category.HomeConstructionAndTrades, icon: HomeTradesIcon },
        { label: Category.LegalAndAdvisory, icon: BusinessIcon },
        { label: Category.BusinessGrowthAndConsulting, icon: BusinessIcon },
        { label: Category.DigitalMediaAndTechnology, icon: ITIcon },
        { label: Category.FinancialServices, icon: FinancialIcon },
        { label: Category.EducationAndSkills, icon: EducationIcon },
        { label: Category.ManufacturingWholesaleSuppliers, icon: AgricultureIcon },
        { label: Category.CommunityAndOrganisations, icon: FamilyIcon },
        { label: Category.GovernmentAndPublicServices, icon: GovIcon },
        { label: Category.EventsExperiencesAndOccasions, icon: EventIcon },
        { label: Category.SportsFitnessAndRecreation, icon: SportsIcon },
        { label: Category.PetsVeterinaryAndAnimalCare, icon: PetsIcon },
        { label: Category.SecurityProtectionAndResponse, icon: SecurityIcon },
        { label: Category.EnergyWaterAndSustainability, icon: EnergyIcon },
        { label: Category.CreatorEconomyAndTalent, icon: CreatorIcon },
        { label: Category.RecruitmentAndStaffing, icon: RecruitmentIcon },
        { label: Category.DomesticAndPersonalServices, icon: DomesticIcon },
        { label: Category.ConvenienceAndDailyNeeds, icon: ConvenienceIcon },
        { label: Category.WomenHealthAndMaternal, icon: HealthIcon },
        { label: Category.JobsAndCareers, icon: JobsIcon }
    ];

    const categoryDescriptions: Record<string,string> = {
        All: 'Explore curated categories',
        [Category.FoodAndHospitality]: 'Restaurants, cafés, bakeries and shisanyama',
        [Category.LuxuryAndLifestyle]: 'Lounges, spas and exclusive experiences',
        [Category.ShoppingAndRetail]: 'Boutiques, markets and specialty stores',
        [Category.BeautyWellnessPersonalCare]: 'Salons, spas & wellness',
        [Category.HealthAndMedical]: 'Clinics, specialists & pharmacies',
        [Category.RealEstateAndProperty]: 'Agents, rentals & property services',
        [Category.Automotive]: 'Dealerships, rentals & services',
        [Category.TransportChauffeursFleet]: 'Freight, logistics & transport services',
        [Category.TourismTravelAndStays]: 'Stays, lodges, and travel experiences',
        [Category.LegalAndAdvisory]: 'Legal, advisory and professional services',
        [Category.BusinessGrowthAndConsulting]: 'Business consulting, accounting & strategy',
        [Category.DigitalMediaAndTechnology]: 'Tech, creative agencies & studios',
        [Category.HomeConstructionAndTrades]: 'Builders, trades and home services',
        [Category.FinancialServices]: 'Banks, advisors & lenders',
        [Category.EducationAndSkills]: 'Schools, colleges & training',
        [Category.ManufacturingWholesaleSuppliers]: 'Manufacturing, wholesale & suppliers',
        [Category.CommunityAndOrganisations]: 'Clubs, NGOs and community services',
        [Category.GovernmentAndPublicServices]: 'Government offices & public services',
        [Category.EventsExperiencesAndOccasions]: 'Event venues, experiences & celebrations',
        [Category.SportsFitnessAndRecreation]: 'Gyms, sports facilities & recreation',
        [Category.PetsVeterinaryAndAnimalCare]: 'Veterinary, pet care & animal services',
        [Category.SecurityProtectionAndResponse]: 'Security, protection & emergency response',
        [Category.EnergyWaterAndSustainability]: 'Energy, water & sustainable solutions',
        [Category.CreatorEconomyAndTalent]: 'Creators, talent & freelance services',
        [Category.RecruitmentAndStaffing]: 'Recruitment, staffing & HR solutions',
        [Category.DomesticAndPersonalServices]: 'Domestic help, cleaning & personal care',
        [Category.ConvenienceAndDailyNeeds]: 'Convenience stores, groceries & daily needs',
        [Category.WomenHealthAndMaternal]: 'Women\'s health, maternal care & childcare',
        [Category.JobsAndCareers]: 'Job listings & career opportunities'
    };

    useEffect(() => {
        // ✅ OPTIMIZED: Load ALL cards upfront, then apply filters (not lazy-load by category)
        const results = businesses.filter((b: Business) => {
            // ✅ When directory first opens: show ALL categories regardless of activeCategory
            // This prevents perceived slowness from lazy-loading by category
            if (!showAllCategories && activeCategory !== 'All' && b.category !== activeCategory) return false;
            
            // 2. Subcategory filter (only apply if actively filtering)
            if (!showAllCategories && activeSub !== 'All' && b.subcategory !== activeSub) return false;
            
            // 3. Area filter
            if (activeArea !== 'All Areas' && b.location !== activeArea) return false;
            
            // 4. Advanced filters
            if (activeFilters) {
                if (activeFilters.search) {
                    const term = activeFilters.search.toLowerCase();
                    const matchesSearch = b.name.toLowerCase().includes(term) || 
                        b.description.toLowerCase().includes(term) ||
                        (b.tags && b.tags.some(t => t.toLowerCase().includes(term)));
                    if (!matchesSearch) return false;
                }
                if (activeFilters.areas.length > 0 && !activeFilters.areas.includes(b.location)) return false;
                if (activeFilters.prices.length > 0 && (!b.priceLevel || !activeFilters.prices.includes(b.priceLevel))) return false;
                if (activeFilters.minRating > 0 && (b.rating || 0) < activeFilters.minRating) return false;
                if (activeFilters.listingTiers.length > 0 && !activeFilters.listingTiers.includes(b.tier)) return false;
                if (activeFilters.serviceTypes.length > 0) {
                    const matchesService = activeFilters.serviceTypes.some(st => 
                        b.category.includes(st) || (b.subcategory && b.subcategory.includes(st))
                    );
                    if (!matchesService) return false;
                }
                if (activeFilters.verifiedOnly && (!b.tier || b.tier === ListingTier.Trial)) return false;
                if (activeFilters.onlyOpenNow && b.isOpenNow !== true) return false;
            }
            
            return true;
        });

        setFilteredItems(results);
    }, [activeCategory, activeSub, activeArea, activeFilters, businesses, showAllCategories]);

    const handleAdvancedFilter = (filters: FilterState) => {
        setActiveFilters(filters);
    };

    const handleSearchSubmit = async () => {
        if (!searchInput.trim()) return;
        setIsSearching(true);
        try {
            const recs = await getSmartRecommendations(searchInput.trim());
            if (recs && recs.length > 0) {
                const first = recs[0];
                navigate('directory', first);
            } else {
                // fallback: keep on directory landing
                navigate('directory');
            }
        } catch (e) {
            navigate('directory');
        } finally {
            setIsSearching(false);
        }
    };

    // OPTIMIZED: Memoize sorting to avoid re-sorting on every render
    const displayItems = useMemo(() => {
        const tierPriority: Record<string, number> = {
            [ListingTier.Platinum]: 4,
            [ListingTier.Elite]: 3,
            [ListingTier.Premium]: 2,
            [ListingTier.Trial]: 1
        } as any;

        return filteredItems.slice().sort((a: any, b: any) => {
            const pa = tierPriority[a.tier] || 0;
            const pb = tierPriority[b.tier] || 0;
            if (pb !== pa) return pb - pa;
            return (b.rating || 0) - (a.rating || 0);
        });
    }, [filteredItems]);

    return (
        <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen relative">
            <SectionTitle title="Directory" subtitle="Find Premium Businesses • Trusted in Mpumalanga" />

            {/* Landing: AI Search + Category Grid only */}
            {activeCategory === 'All' && activeSub === 'All' && (
                <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 mb-12 shadow-2xl animate-fade-in relative z-40">
                    <div className="flex flex-col gap-8">
                        <div className="max-w-3xl mx-auto">
                            <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 shadow-2xl transition-all duration-300 focus-within:border-gold-500/40 focus-within:shadow-[0_0_24px_rgba(227,185,44,0.08)]">
                                <Search className="text-gold-400 ml-4" size={22} />
                                <input
                                    value={searchInput}
                                    onChange={e => setSearchInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') handleSearchSubmit(); }}
                                    placeholder={"🔍 Ask Lowveld AI… (e.g. \"Luxury lodges in Hazyview\")"}
                                    className="w-full bg-transparent border-none outline-none text-white px-4 py-4 font-sans placeholder-gray-400 text-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <h3 className="text-white font-bold uppercase tracking-[0.08em] text-sm">Explore Categories</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 will-change-auto">
                                {categories.map((cat, idx) => (
                                    <CategoryCard
                                        key={idx}
                                        Icon={cat.icon}
                                        label={cat.label}
                                        description={(CategorySubcategories as any)[cat.label as any]?.slice(0,3).join(' • ') || categoryDescriptions[cat.label] || ''}
                                        onClick={() => { setActiveCategory(cat.label); setActiveSub('All'); }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Page: show subcategory cards only */}
            {activeCategory !== 'All' && activeSub === 'All' && (
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 rounded-full bg-gold-500 shadow-lg" />
                        <h3 className="text-white font-bold uppercase tracking-[0.1em] text-sm">Explore Categories</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {(CategorySubcategories[activeCategory as Category] || []).map((sub: string) => (
                            <button key={sub} onClick={() => { setActiveSub(sub); setActiveFilters(null); }} className="group bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-left hover:shadow-[0_10px_30px_-10px_rgba(227,185,44,0.25)] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-black/60 flex items-center justify-center text-gold-400"><Tag size={18} /></div>
                                    <div>
                                        <div className="text-lg font-semibold text-white">{sub}</div>
                                        <div className="text-sm text-gray-400 mt-1">Find top {sub.toLowerCase()} in Mpumalanga</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Featured Highlights - Premium Black Background */}
            {activeCategory === 'All' && activeSub === 'All' && (
                <div className="my-16">
                    {/* Header Section */}
                    <div className="mb-10">
                        {/* Top accent line */}
                        <div className="h-0.5 w-16 bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4"></div>
                        
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Featured Highlights</h2>
                            <p className="text-gray-400 text-base max-w-2xl">Discover our most exclusive and highly-rated luxury experiences across Mpumalanga</p>
                        </div>

                        {/* Decorative divider */}
                        <div className="h-px bg-gradient-to-r from-yellow-400/40 via-yellow-400/20 to-transparent mt-6"></div>
                    </div>
                    
                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Card 1: Kuka Café */}
                        <div className="group bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 cursor-pointer" onClick={() => navigate('business-detail', undefined, 'b_kuka_cafe')}>
                            <div className="relative h-40 overflow-hidden bg-gray-900">
                                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop" alt="Kuka Café" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full">Elite</div>
                            </div>
                            <div className="p-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
                                <h3 className="text-white font-bold text-base mb-1 group-hover:text-yellow-400 transition-colors">Kuka Café</h3>
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                                    <span>📍 Hazyview</span>
                                    <span className="text-yellow-400 font-semibold">⭐ 4.8</span>
                                </div>
                                <p className="text-gray-400 text-xs line-clamp-1 mb-3">Cocktails, coffee & cuisine</p>
                                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold py-1.5 rounded transition-all duration-300">Explore</button>
                            </div>
                        </div>

                        {/* Card 2: Blue Moon Bistro */}
                        <div className="group bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 cursor-pointer" onClick={() => navigate('business-detail', undefined, 'b_blue_moon')}>
                            <div className="relative h-40 overflow-hidden bg-gray-900">
                                <img src="https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=500&fit=crop" alt="Blue Moon Bistro" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full">Elite</div>
                            </div>
                            <div className="p-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
                                <h3 className="text-white font-bold text-base mb-1 group-hover:text-yellow-400 transition-colors">Blue Moon Bistro</h3>
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                                    <span>📍 Mbombela</span>
                                    <span className="text-yellow-400 font-semibold">⭐ 4.9</span>
                                </div>
                                <p className="text-gray-400 text-xs line-clamp-1 mb-3">Fine dining with Lowveld views</p>
                                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold py-1.5 rounded transition-all duration-300">Explore</button>
                            </div>
                        </div>

                        {/* Card 3: Veranda Fine Dining */}
                        <div className="group bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 cursor-pointer" onClick={() => navigate('business-detail', undefined, 'b_veranda')}>
                            <div className="relative h-40 overflow-hidden bg-gray-900">
                                <img src="https://images.unsplash.com/photo-1552566626-52f8b29e368c?w=500&h=500&fit=crop" alt="Veranda Fine Dining" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full">Elite</div>
                            </div>
                            <div className="p-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
                                <h3 className="text-white font-bold text-base mb-1 group-hover:text-yellow-400 transition-colors">Veranda Fine Dining</h3>
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                                    <span>📍 Mbombela</span>
                                    <span className="text-yellow-400 font-semibold">⭐ 4.9</span>
                                </div>
                                <p className="text-gray-400 text-xs line-clamp-1 mb-3">Modern gastronomy & curated wines</p>
                                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold py-1.5 rounded transition-all duration-300">Explore</button>
                            </div>
                        </div>

                        {/* Card 4: The Gold Plate - Platinum */}
                        <div className="group bg-[#0a0a0a] border border-purple-500/40 rounded-lg overflow-hidden hover:border-purple-400/70 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer" onClick={() => navigate('business-detail', undefined, 'b_gold_plate')}>
                            <div className="relative h-40 overflow-hidden bg-gray-900">
                                <img src="https://images.unsplash.com/photo-1504674900152-b8b29e94345e?w=500&h=500&fit=crop" alt="The Gold Plate" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent"></div>
                                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">⭐ Platinum</div>
                            </div>
                            <div className="p-4 bg-gradient-to-b from-[#1a0f2e] to-[#0a0a0a]">
                                <h3 className="text-white font-bold text-base mb-1 group-hover:text-purple-300 transition-colors">The Gold Plate</h3>
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                                    <span>📍 White River</span>
                                    <span className="text-purple-300 font-semibold">⭐ 5.0</span>
                                </div>
                                <p className="text-gray-400 text-xs line-clamp-1 mb-3">Bespoke tasting menus & wines</p>
                                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-xs font-bold py-1.5 rounded transition-all duration-300">Explore</button>
                            </div>
                        </div>
                    </div>

                    {/* Footer accent */}
                    <div className="mt-12 h-0.5 w-16 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-40"></div>
                </div>
            )}

            {/* Listings Page: show filters + listings */}
            {activeSub !== 'All' && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setActiveSub('All')} className="text-gray-400 hover:text-white flex items-center gap-2"><ArrowLeft size={16} /> Back to {activeCategory}</button>
                            <h2 className="text-2xl font-serif text-white">{activeSub}</h2>
                            <div className="text-sm text-gray-400">{(categoryDescriptions[activeCategory] || '')}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <AreaSelector activeArea={activeArea} onChange={setActiveArea} />
                            <button onClick={() => navigate('list-your-business')} className="text-gold-400 text-xs font-bold uppercase tracking-widest">List Your Business</button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <AdvancedFilterPanel type="directory" onFilter={handleAdvancedFilter} />
                    </div>

                    {displayItems.length === 0 ? (
                        <CategoryEmptyState navigate={navigate} category={activeSub} />
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {displayItems.map((item: any) => (
                            <div key={item.id} className="h-auto">
                                <LuxuryCard
                                    id={item.id}
                                    title={item.name}
                                    image={item.image}
                                    logo={(item as any).logo || item.image}
                                    subtitle={item.subcategory}
                                    rating={item.rating}
                                    price={item.priceLevel}
                                    location={item.location}
                                    badge={item.tier === ListingTier.Platinum ? 'Platinum' : item.tier === ListingTier.Elite ? 'Elite' : item.tier === ListingTier.Premium ? 'Premium' : undefined}
                                    verified={item.tier !== ListingTier.Trial}
                                    isElite={item.tier === ListingTier.Elite}
                                    isPlatinum={item.tier === ListingTier.Platinum}
                                    isFavorite={favorites.includes(item.id)}
                                    onToggleFavorite={toggleFavorite}
                                    onPress={() => navigate('business-detail', undefined, item.id)}
                                    phone={item.phone}
                                    email={item.email}
                                    compact={true}
                                    facebookUrl={item.socialLinks?.facebook}
                                    instagramUrl={item.socialLinks?.instagram}
                                    twitterUrl={item.socialLinks?.twitter}
                                    linkedinUrl={item.socialLinks?.linkedin}
                                    tiktokUrl={item.socialLinks?.tiktok}
                                />
                            </div>
                        ))}

                        {displayItems.length === 0 && (
                            <div className="col-span-full text-center py-24 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                                <div className="w-20 h-20 bg-gold-500/5 border border-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search size={32} className="text-gold-500/50" />
                                </div>
                                <h3 className="text-2xl text-white font-serif mb-2">No matches found</h3>
                                <p className="text-gray-500 text-sm max-w-xs mx-auto">Try loosening your filters or exploring a different area in Mpumalanga.</p>
                                <button onClick={() => { setActiveArea('All Areas'); setActiveCategory('All'); setActiveSub('All'); setActiveFilters(null); }} className="mt-8 text-gold-500 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors flex items-center gap-2 mx-auto">Reset All Filters <RefreshCw size={12} /></button>
                            </div>
                        )}
                    </div>
                    )}
                </div>
            )}
        </div>
    );
};

const QuickAccessSection = ({ navigate }: { navigate: (view: string) => void }) => {
    const [activeView, setActiveView] = useState<string | null>(null);

    const handleNavigation = (view: string) => {
        setActiveView(view);
        navigate(view);
    };

    return (
    <div className="container mx-auto px-4 -mt-12 relative z-20 mb-16">
        <div className="bg-black/100 rounded-3xl p-6 shadow-[0_16px_60px_rgba(0,0,0,0.85)] border border-white/6">
            <div className="grid grid-cols-2 md:flex md:gap-8 md:justify-center md:flex-wrap gap-3">
                {[
                    { icon: FoodIcon, label: "Eats", view: "eats" },
                    { icon: RealEstateIcon, label: "Estates", view: "real-estate" },
                    { icon: AutomotiveIcon, label: "Autos", view: "cars" },
                    { icon: HomeTradesIcon, label: "Stays", view: "stays" },
                    { icon: HealthIcon, label: "Health", view: "health" },
                    { icon: ProfessionalIcon, label: "Legal & Finance", view: "legal-finance" },
                    { icon: Wrench, label: "Services", view: "services" },
                    { icon: EducationIcon, label: "Education", view: "education" },
                ].map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleNavigation(item.view)}
                        className={`flex items-center justify-center md:justify-start gap-2 md:gap-4 rounded-2xl px-3 md:px-6 py-3 md:py-4 transform transition-all duration-700 ease-out relative group w-full md:w-auto ${
                            activeView === item.view
                                ? 'bg-black/70 border border-gold-500/60 shadow-[0_30px_60px_rgba(201,162,77,0.14)]'
                                : 'bg-black/70 border border-white/6 hover:scale-102 hover:shadow-[0_18px_45px_rgba(0,0,0,0.6)]'
                        }`}
                    >
                        <div className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-lg text-gold-400 flex-shrink-0">
                            <item.icon className="w-4 md:w-5 h-4 md:h-5" />
                        </div>
                        <span className="text-xs md:text-sm font-bold text-gray-100 tracking-wide">{item.label}</span>
                        {activeView === item.view && (
                            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    </div>
    );
};

const SponsoredSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { name: "The Velvet Lounge", desc: "A spotlight on Mpumalanga's most exclusive cigar and whiskey lounge. Experience true luxury.", image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=1600", cta: "View Feature" },
        { name: "Lion Sands Game Reserve", desc: "The ultimate luxury safari experience in the Sabi Sand.", image: "https://images.unsplash.com/photo-1470173274384-c4e8e2f9ea4c?auto=format&fit=crop&q=80&w=1600", cta: "View Feature" },
        { name: "Nelspruit Medi-Clinic", desc: "World-class private healthcare and specialized wellness services.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600", cta: "View Feature" },
        { name: "Westvaal Mercedes-Benz", desc: "A spotlight on the pinnacle of automotive engineering and luxury.", image: "https://images.unsplash.com/photo-1553440291-6e7e4640875b?auto=format&fit=crop&q=1600", cta: "View Feature" },
        { name: "Shandon Eco Estate", desc: "Modern architectural masterpieces set in untamed nature.", image: "https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&q=800", cta: "View Feature" }
    ];
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    return (
        <div className="container mx-auto px-4 mb-20 relative group">
            <div className="relative rounded-2xl overflow-hidden h-96 md:h-[500px] border border-gold-500/20 shadow-2xl">
               {slides.map((slide, index) => (
                   <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'} group`}> 
                       <div className="absolute inset-0 overflow-hidden">
                         <img src={slide.image} alt={slide.name} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                       </div>
                       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

                       {/* Gold corner accent */}
                       <div className="absolute top-0 right-0 pointer-events-none">
                         <div className="w-10 h-10 -translate-y-4 translate-x-4 rotate-45 bg-gradient-to-br from-[#C9A24D] to-[#B8923A] shadow-lg opacity-95 border border-gold-500/30"></div>
                       </div>

                      <div className="absolute top-0 left-0 p-6 md:p-8">
                                   <span className="text-[#B8923A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm border border-gold-500/20 bg-transparent">Trusted by the Exceptional</span>
                               </div>
                           <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
                           <h3 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight drop-shadow-lg tracking-tight">{slide.name}</h3>
                           <p className="text-gray-300 text-lg mb-6 leading-relaxed font-light max-w-[56ch] line-clamp-2">{slide.desc}</p>
                           <button className="bg-white text-black px-8 md:px-10 py-3 md:py-4 rounded-full font-bold uppercase text-xs tracking-widest transition-all shadow-[0_0_20px_rgba(227,185,44,0.08)] hover:bg-gold-500 hover:text-black flex items-center gap-3 group-hover:shadow-[0_20px_60px_rgba(227,185,44,0.12)]">
                               <span>View Feature</span>
                               <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                           </button>
                       </div>
                   </div>
               ))}
               <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors opacity-0 group-hover:opacity-100"><ChevronLeft size={24} /></button>
               <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md border border-white/10 transition-colors opacity-0 group-hover:opacity-100"><ChevronRight size={24} /></button>
               <div className="absolute bottom-8 right-8 z-20 flex gap-3">
                   {slides.map((_, i) => (
                       <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-gold-500' : 'w-2 bg-white/30 hover:bg-white/50'}`} />
                   ))}
               </div>
            </div>
        </div>
    );
};

const PremiumExperienceSection = ({ navigate, favorites, toggleFavorite, businesses }: any) => {
    // Explicit Gold Standard items (replaces older dynamic selection)
    const items = [
        {
            id: 'gs1',
            name: 'Veranda Fine Dining Mbombela',
            image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1400',
            logo: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?auto=format&fit=crop&q=80&w=400',
            subcategory: 'FINE DINING',
            rating: 4.9,
            reviewCount: 214,
            location: 'Mbombela',
            tier: ListingTier.Elite,
            phone: '+27 13 000 1111'
        },
        {
            id: 'gs2',
            name: 'Hazyview River Lodge',
            image: 'https://images.unsplash.com/photo-1501117716987-c8e5d2f0b3f8?auto=format&fit=crop&q=80&w=1400',
            logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400',
            subcategory: 'HOTELS & LODGES',
            rating: 4.9,
            reviewCount: 403,
            location: 'Hazyview',
            tier: ListingTier.Platinum,
            phone: '+27 13 000 2222'
        },
        {
            id: 'gs3',
            name: 'Sabie Falls Spa & Retreat',
            image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&q=80&w=1400',
            logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
            subcategory: 'SPAS & MASSAGE THERAPY',
            rating: 4.8,
            reviewCount: 156,
            location: 'Sabie',
            tier: ListingTier.Elite,
            phone: '+27 13 000 3333'
        },
        {
            id: 'gs4',
            name: 'White River Wedding Gardens',
            image: 'https://images.unsplash.com/photo-1505765056297-1f2c9c3f9f9f?auto=format&fit=crop&q=80&w=1400',
            logo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400',
            subcategory: 'EVENT VENUES & HALLS',
            rating: 4.8,
            reviewCount: 88,
            location: 'White River',
            tier: ListingTier.Elite,
            phone: '+27 13 000 4444'
        }
    ];

    return (
        <section className="py-24 bg-[#080808]">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <div className="text-[#B8923A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm border border-gold-500/20 bg-transparent inline-block mb-4">Featured for editorial inspiration</div>
                </div>
                <SectionTitle title="Editorial Features" subtitle="Trusted by the Exceptional" />
                <p className="text-gray-400 text-sm mt-2 mb-6">A spotlight on Mpumalanga experiences.</p>

                <div className="overflow-x-auto no-scrollbar py-6">
                    <div className="flex gap-6 items-stretch px-2">
                        {items.map((item: any) => (
                            <div key={item.id} onClick={() => navigate('business-detail', undefined, item.id)} className="min-w-[360px] md:min-w-[440px] rounded-2xl overflow-hidden cursor-pointer group border border-white/6 shadow-xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(227,185,44,0.15)] hover:-translate-y-2">
                                <div className="relative h-60 md:h-72 w-full overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute top-3 right-3 text-[10px] text-gold-400 font-semibold uppercase tracking-widest border border-gold-500/60 bg-black/50 px-2.5 py-1 rounded-lg shadow-[0_0_12px_rgba(227,185,44,0.2)]">{item.tier === ListingTier.Platinum ? 'PLATINUM' : item.tier === ListingTier.Elite ? 'ELITE' : ''}</div>
                                </div>
                                <div className="p-4 bg-[#070707]">
                                    <h3 className="text-xl md:text-2xl font-serif text-white leading-tight mb-1">{item.name}</h3>
                                    <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                                        <div>{item.subcategory} • {item.location}</div>
                                        <div className="text-gold-400 font-semibold">★ {item.rating.toFixed(1)}</div>
                                    </div>
                                    <div className="text-[11px] text-gold-300 font-medium">Curated by LowveldHub</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
      </div>
    </section>
);
};

// === LUXURY MARKETPLACE DISCOVERY CARDS (DRAMATIC OPTION A) ===
const MarketplaceStoryCards = ({ navigate }: any) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [];

  return (
    <>
      {/* DIRECTORY SECTION - Premium & Exclusive */}
      <section className="py-20 bg-[#050505] relative overflow-hidden border-t border-gold-500/10">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gold-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-gold-400 mb-4 tracking-tight font-light">
              Premium Directory
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
          </div>

          {/* Copy */}
          <div className="mb-8 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-light mb-2">Discover the finest businesses in Mpumalanga.</p>
            <p className="text-gray-300 text-sm font-light mb-8">Curated. Premium. Exclusive.</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('directory')}
              className="group px-8 py-3 border-2 border-gold-500/60 text-gold-400 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-gold-500/20 hover:border-gold-400 transition-all duration-500 hover:shadow-[0_0_30px_rgba(227,185,44,0.3)]"
            >
              Explore Directory
            </button>
          </div>
        </div>
      </section>

      {/* LOCAL LEGENDS SECTION - Marketplace */}
      <section className="py-20 bg-[#050505] relative overflow-hidden border-t border-gold-500/10">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gold-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-gold-400 mb-4 tracking-tight font-light">
            Local Legends
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
        </div>

        {/* Hero Quote - Minimal & Elegant */}
        <div className="mb-8 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-light mb-2">Support trusted local sellers in the Lowveld.</p>
          <p className="text-gray-300 text-sm font-light mb-8">Authentic products. Verified sellers.</p>
        </div>

        {/* CTA Buttons - Simple & Direct */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => navigate('marketplace')}
            className="group px-8 py-3 border-2 border-gold-500/60 text-gold-400 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-gold-500/20 hover:border-gold-400 transition-all duration-500 hover:shadow-[0_0_30px_rgba(227,185,44,0.3)]"
          >
            Explore Marketplace
          </button>
          <button 
            onClick={() => navigate('business-submission')}
            className="group px-8 py-3 bg-gold-500/20 border-2 border-gold-500/40 text-gold-300 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-gold-500/30 hover:border-gold-400 transition-all duration-500"
          >
            Become a Seller
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
    </>
  );
};

const GoldStandardSection = ({ navigate }: any) => {
    const goldStandardItems = [
        {
            id: 'gs1',
            name: 'Veranda Fine Dining',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1400',
            tagline: 'An elevated dining experience in the heart of Mbombela',
            category: 'FINE DINING',
            location: 'Mbombela',
            rating: 4.9,
            tier: ListingTier.Elite,
        },
        {
            id: 'gs2',
            name: 'Hazyview River Lodge',
            image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcb3ef8?auto=format&fit=crop&q=80&w=1400',
            tagline: 'Luxury lodge living where nature sets the pace',
            category: 'HOTELS & LODGES',
            location: 'Hazyview',
            rating: 4.9,
            tier: ListingTier.Platinum,
        },
        {
            id: 'gs3',
            name: 'Sabie Falls Spa & Retreat',
            image: 'https://images.unsplash.com/photo-1578654377249-e3b30286e8d0?auto=format&fit=crop&q=80&w=1400',
            tagline: 'A sanctuary of wellness surrounded by waterfalls',
            category: 'SPA & WELLNESS',
            location: 'Sabie',
            rating: 4.8,
            tier: ListingTier.Elite,
        },
        {
            id: 'gs4',
            name: 'White River Wedding Gardens',
            image: 'https://images.unsplash.com/photo-1519167758993-a01a6dac0beb?auto=format&fit=crop&q=80&w=1400',
            tagline: 'Timeless celebrations in an elegant garden setting',
            category: 'EVENT VENUES',
            location: 'White River',
            rating: 4.8,
            tier: ListingTier.Elite,
        }
    ];

    return (
        <section className="py-20 bg-[#0a0a0a] relative" style={{ display: 'none' }}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 tracking-tight">
                        The Gold Standard
                    </h2>
                    <div className="w-36 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-3"></div>
                    <p className="text-base md:text-lg text-white font-medium tracking-wide mb-2">Only businesses that redefine excellence earn this mark.</p>
                    <p className="text-sm text-gray-500 italic">Exceptional Experiences. Verified Excellence.</p>
                </div>

                {/* 4-Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6">
                    {goldStandardItems.map((item: any) => (
                        <div 
                            key={item.id}
                            onClick={() => navigate('business-detail', undefined, item.id)}
                            className="group cursor-pointer"
                        >
                            {/* Card Container */}
                            <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-[#111] border border-white/5 transition-all duration-700 hover:shadow-[0_30px_80px_rgba(201,162,77,0.18)] hover:-translate-y-2">
                                
                                {/* Image Section */}
                                <div className="relative w-full h-48 overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-900 group-hover:scale-105"
                                    />
                                    {/* Dark Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                                    
                                    {/* Status Badge (Top-Left) */}
                                    <div className="absolute top-4 left-4">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-400 border border-gold-500/60 bg-transparent px-2.5 py-1 rounded-full shadow-[0_0_18px_rgba(227,185,44,0.18)] transition-transform duration-700 group-hover:scale-105">
                                            {item.tier === ListingTier.Platinum ? 'PLATINUM' : 'ELITE'}
                                        </div>
                                    </div>

                                    {/* Business Name (Over Image, Bottom) */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">
                                            {item.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-grow p-3 md:p-4 flex flex-col">
                                    
                                    {/* Tagline */}
                                    <p className="text-xs text-gray-200 leading-relaxed mb-3 font-medium">
                                        {item.tagline}
                                    </p>

                                    {/* Meta Line */}
                                    <div className="flex items-center justify-between text-[11px] text-gray-400 mb-3 mt-auto">
                                        <span className="uppercase tracking-widest font-semibold">{item.category} • {item.location}</span>
                                        <span className="text-gold-400 font-bold">★ {item.rating.toFixed(1)}</span>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('business-detail', undefined, item.id);
                                        }}
                                        className="w-full border border-gold-500/50 text-white py-2 rounded-lg uppercase text-xs font-semibold tracking-wide transition-all duration-300 hover:bg-gold-500 hover:text-black hover:border-gold-500"
                                    >
                                        Explore
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section CTA */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('directory', 'Premium Experiences')}
                        className="text-white hover:text-gold-400 transition-colors duration-300 group flex items-center gap-2 mx-auto"
                    >
                        <span className="uppercase text-sm font-semibold tracking-wider">View All Gold Standard Experiences</span>
                        <span className="text-gold-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

const RealEstateView = ({ navigate, favorites, toggleFavorite }: any) => {
    const [filters, setFilters] = useState({
        type: 'All',
        bedrooms: 'All',
        bathrooms: 'All',
        priceMin: '',
        priceMax: '',
        area: 'All Areas',
        tier: 'All',
        amenities: [] as string[],
        sortBy: 'Featured'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showConcierge, setShowConcierge] = useState(false);
    const [conciergeQuery, setConciergeQuery] = useState('');
    const [conciergeResponse, setConciergeResponse] = useState('');
    const [loadingConcierge, setLoadingConcierge] = useState(false);

    const filterProperties = () => {
        let filtered = [...properties];

        if (filters.type !== 'All') {
            filtered = filtered.filter(p => p.type === filters.type);
        }
        if (filters.bedrooms !== 'All') {
            const beds = parseInt(filters.bedrooms);
            filtered = filtered.filter(p => p.beds === beds);
        }
        if (filters.bathrooms !== 'All') {
            const baths = parseInt(filters.bathrooms);
            filtered = filtered.filter(p => p.baths >= baths);
        }
        if (filters.area !== 'All Areas') {
            filtered = filtered.filter(p => p.area === filters.area);
        }
        if (filters.tier !== 'All') {
            filtered = filtered.filter(p => p.tier === filters.tier);
        }

        // Sort
        if (filters.sortBy === 'Featured') {
            filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        } else if (filters.sortBy === 'Price: Low to High') {
            filtered.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
                const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
                return priceA - priceB;
            });
        } else if (filters.sortBy === 'Price: High to Low') {
            filtered.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
                const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
                return priceB - priceA;
            });
        } else if (filters.sortBy === 'Newest') {
            // Properties already in newest order from seeds
        }

        return filtered;
    };

    const handleConciergeSearch = async () => {
        if (!conciergeQuery.trim()) return;
        setLoadingConcierge(true);
        try {
            const recommendations = await getPropertyRecommendations(conciergeQuery);
            setConciergeResponse(recommendations.message);
            
            // Auto-apply suggested areas if provided
            if (recommendations.suggestions.length > 0) {
                setFilters(prev => ({...prev, area: recommendations.suggestions[0]}));
            }
        } catch (error) {
            setConciergeResponse('I apologize, I could not process your request. Please try again.');
        }
        setLoadingConcierge(false);
    };

    const filteredProperties = filterProperties();

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section - TIGHTENED */}
            <div className="relative h-[350px] overflow-hidden pt-24">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&q=80&w=1200" 
                    alt="Luxury homes" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif text-gold-400 mb-2 tracking-tight">
                        Luxury Properties
                    </h1>
                    <p className="text-base text-gray-300 mb-6 max-w-2xl">
                        Luxury homes, estates & investment properties across Mpumalanga.
                    </p>
                    
                    {/* Quick Search Bar */}
                    <div className="flex flex-col md:flex-row gap-3 max-w-2xl w-full">
                        <div className="flex-1 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-gold-500/30 rounded-lg px-4 py-3 hover:border-gold-500/60 transition-colors">
                            <Search size={18} className="text-gold-500" />
                            <input 
                                type="text"
                                placeholder="Describe your ideal property..."
                                value={conciergeQuery}
                                onChange={(e) => setConciergeQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1 text-sm"
                                onKeyPress={(e) => e.key === 'Enter' && handleConciergeSearch()}
                            />
                        </div>
                        <button
                            onClick={handleConciergeSearch}
                            disabled={loadingConcierge}
                            className="bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold px-6 py-3 rounded-lg hover:from-gold-400 hover:to-gold-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                        >
                            <Sparkles size={16} />
                            {loadingConcierge ? 'Searching...' : 'Ask AI'}
                        </button>
                    </div>

                    {conciergeResponse && (
                        <div className="mt-4 bg-black/80 backdrop-blur-md border border-gold-500/30 rounded-lg p-4 max-w-2xl text-left">
                            <p className="text-gold-300 text-sm">{conciergeResponse}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Filter Panel - IMPROVED HIERARCHY */}
            <div className="sticky top-24 z-40 bg-black/95 backdrop-blur-lg border-b border-white/5">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap text-sm"
                        >
                            <Filter size={16} /> Filters
                        </button>

                        {/* Main Quick Filters - Hierarchy */}
                        <select 
                            value={filters.type}
                            onChange={(e) => setFilters({...filters, type: e.target.value})}
                            className="bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg text-xs outline-none hover:bg-white/10 transition-colors"
                        >
                            <option>Property Type</option>
                            <option>All Types</option>
                            <option>Sale</option>
                            <option>Rent</option>
                        </select>

                        <select 
                            value={filters.area}
                            onChange={(e) => setFilters({...filters, area: e.target.value})}
                            className="bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg text-xs outline-none hover:bg-white/10 transition-colors"
                        >
                            <option>Location</option>
                            <option>All Areas</option>
                            {MPUMALANGA_AREAS.map(a => <option key={a}>{a}</option>)}
                        </select>

                        <select 
                            value={filters.sortBy}
                            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                            className="bg-white/5 border border-white/10 text-white px-3 py-2 rounded-lg text-xs outline-none hover:bg-white/10 transition-colors"
                        >
                            <option>Price Range</option>
                            <option>Featured</option>
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>

                        <span className="text-xs text-gray-400 whitespace-nowrap ml-auto">{filteredProperties.length} Properties</span>
                    </div>

                    {/* Expanded Filter Panel */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4 border-t border-white/5">
                            <div>
                                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Bedrooms</label>
                                <select 
                                    value={filters.bedrooms}
                                    onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none"
                                >
                                    <option>All</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6+</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Bathrooms</label>
                                <select 
                                    value={filters.bathrooms}
                                    onChange={(e) => setFilters({...filters, bathrooms: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none"
                                >
                                    <option>All</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5+</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Tier</label>
                                <select 
                                    value={filters.tier}
                                    onChange={(e) => setFilters({...filters, tier: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none"
                                >
                                    <option>All</option>
                                    <option value={ListingTier.Premium}>{ListingTier.Premium}</option>
                                    <option value={ListingTier.Elite}>{ListingTier.Elite}</option>
                                    <option value={ListingTier.Platinum}>{ListingTier.Platinum}</option>
                                </select>
                            </div>
                            <div className="md:col-span-3">
                                <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Price Range (R)</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text"
                                        placeholder="Min"
                                        value={filters.priceMin}
                                        onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
                                        className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none placeholder-gray-600"
                                    />
                                    <input 
                                        type="text"
                                        placeholder="Max"
                                        value={filters.priceMax}
                                        onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
                                        className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded outline-none placeholder-gray-600"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Properties Grid */}
            <div className="container mx-auto px-4 py-12 pb-24">
                {filteredProperties.length === 0 ? (
                    <div className="py-24 text-center">
                        <p className="text-gray-400 text-lg mb-4">No properties match your filters</p>
                        <button
                            onClick={() => setFilters({
                                type: 'All',
                                bedrooms: 'All',
                                bathrooms: 'All',
                                priceMin: '',
                                priceMax: '',
                                area: 'All Areas',
                                tier: 'All',
                                amenities: [],
                                sortBy: 'Featured'
                            })}
                            className="text-gold-400 hover:text-gold-300 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Featured Properties Section - CURATED ONLY */}
                        {filteredProperties.some(p => p.isFeatured) && (
                            <div className="mb-16">
                        <h2 className="text-2xl font-serif text-gold-400 mb-1">Featured Properties</h2>
                                <p className="text-sm text-gray-400 mb-8">Curated selection of exceptional properties</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {filteredProperties.filter(p => p.isFeatured).slice(0, 4).map(item => (
                                        <div key={item.id} className="h-auto">
                                            <div className="group relative bg-black/80 border border-gold-400 rounded-2xl overflow-hidden h-full flex flex-col hover:border-gold-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                                                onClick={() => navigate('property-detail', undefined, item.id)}>
                                                
                                                {/* Image Section */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                                    
                                                    {/* Favorite Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleFavorite(item.id);
                                                        }}
                                                        className="absolute top-3 left-3 bg-black/60 hover:bg-gold-500 text-white hover:text-black p-2 rounded-full transition-all duration-300"
                                                    >
                                                        <Heart size={16} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                                                    </button>
                                                </div>

                                                {/* Content Section */}
                                                <div className="flex-1 p-6 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-serif text-white group-hover:text-gold-400 transition-colors line-clamp-2 mb-2">
                                                            {item.title}
                                                        </h3>
                                                        <div className="flex items-center gap-1 text-gold-400 text-xs mb-4">
                                                            <MapPin size={12} />
                                                            <span>{item.area}</span>
                                                        </div>
                                                        <p className="text-xl font-bold text-white mb-4">{item.price}</p>
                                                        
                                                        {/* Specs */}
                                                        <div className="flex gap-4 text-xs text-gray-400">
                                                            <div className="flex items-center gap-1">
                                                                <Bed size={14} />
                                                                <span>{item.beds} Beds</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Droplets size={14} />
                                                                <span>{item.baths} Baths</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Agent Info */}
                                                    <div className="border-t border-white/5 pt-4 mt-4">
                                                        <div className="flex items-center gap-2">
                                                            {item.agentImage && (
                                                                <img 
                                                                    src={item.agentImage} 
                                                                    alt={item.agentName}
                                                                    className="w-8 h-8 rounded-full object-cover"
                                                                />
                                                            )}
                                                            <span className="text-xs text-gray-400">{item.agentName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Properties Section */}
                        <div>
                            <h2 className="text-2xl font-serif text-white mb-1">All Properties</h2>
                            <p className="text-sm text-gray-400 mb-8">{filteredProperties.length} available</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {filteredProperties.slice(0, 4).map(item => (
                                    <div key={item.id} className="h-auto">
                                        <div className="group relative bg-black/80 border border-gold-400 rounded-lg overflow-hidden h-full flex flex-col hover:border-gold-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                                            onClick={() => navigate('property-detail', undefined, item.id)}>
                                            
                                            {/* Image Section */}
                                            <div className="relative h-32 overflow-hidden">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                                
                                                {/* Favorite Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(item.id);
                                                    }}
                                                    className="absolute top-2 left-2 bg-black/60 hover:bg-gold-500 text-white hover:text-black p-1.5 rounded-full transition-all duration-300"
                                                >
                                                    <Heart size={14} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                                                </button>
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex-1 p-4 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-sm font-serif text-white group-hover:text-gold-400 transition-colors line-clamp-2 mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-gold-400 text-xs mb-2">
                                                        <MapPin size={11} />
                                                        <span className="line-clamp-1">{item.area}</span>
                                                    </div>
                                                    <p className="text-base font-bold text-white mb-3">{item.price}</p>
                                                    
                                                    {/* Specs */}
                                                    <div className="flex gap-3 text-xs text-gray-400">
                                                        <div className="flex items-center gap-0.5">
                                                            <Bed size={12} />
                                                            <span>{item.beds}</span>
                                                        </div>
                                                        <div className="flex items-center gap-0.5">
                                                            <Droplets size={12} />
                                                            <span>{item.baths}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Agent Info */}
                                                <div className="border-t border-white/5 pt-3 mt-3">
                                                    <div className="flex items-center gap-1.5">
                                                        {item.agentImage && (
                                                            <img 
                                                                src={item.agentImage} 
                                                                alt={item.agentName}
                                                                className="w-6 h-6 rounded-full object-cover"
                                                            />
                                                        )}
                                                        <span className="text-xs text-gray-400 truncate">{item.agentName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Concierge Floating Button */}
            {!showConcierge && (
                <button
                    onClick={() => setShowConcierge(true)}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-gold-600 to-gold-500 text-black p-4 rounded-full shadow-2xl hover:shadow-gold-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-2 font-bold"
                >
                    <Sparkles size={20} />
                    <span className="hidden md:inline">Concierge</span>
                </button>
            )}
        </div>
    );
};

const PropertyDetailView = ({ navigate, favorites, toggleFavorite, propertyId }: any) => {
    const property = properties.find(p => p.id === propertyId);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [showFloatingConcierge, setShowFloatingConcierge] = useState(false);

    if (!property) return (
        <div className="pt-32 pb-12 container mx-auto px-4 text-center">
            <p className="text-gray-400">Property not found</p>
            <button onClick={() => navigate('real-estate')} className="text-gold-400 mt-4">Back to Real Estate</button>
        </div>
    );

    const gallery = property.gallery || [property.image];
    const similarProperties = properties.filter(p => p.area === property.area && p.id !== property.id).slice(0, 4);

    return (
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('real-estate')}
                    className="flex items-center gap-2 text-gold-400 hover:text-gold-300 mb-8"
                >
                    <ArrowLeft size={18} /> Back to Real Estate
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Gallery Section */}
                    <div className="lg:col-span-2">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden group mb-4">
                            <img 
                                src={gallery[currentImageIndex]} 
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setCurrentImageIndex((currentImageIndex - 1 + gallery.length) % gallery.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-gold-500 text-white p-3 rounded-full transition-all z-10"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => setCurrentImageIndex((currentImageIndex + 1) % gallery.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-gold-500 text-white p-3 rounded-full transition-all z-10"
                            >
                                <ChevronRight size={24} />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {gallery.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'w-8 bg-gold-500' : 'w-2 bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {gallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        idx === currentImageIndex ? 'border-gold-500' : 'border-white/20 hover:border-white/40'
                                    }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Property Details */}
                        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8">
                            <h1 className="text-4xl font-serif text-white mb-4">{property.title}</h1>
                            <div className="flex items-center gap-2 text-gold-400 mb-6">
                                <MapPin size={18} />
                                <span className="text-lg">{property.area}, {property.location}</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-white/10">
                                <div>
                                    <p className="text-gray-500 text-sm uppercase mb-2">Bedrooms</p>
                                    <p className="text-2xl font-bold text-white">{property.beds}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm uppercase mb-2">Bathrooms</p>
                                    <p className="text-2xl font-bold text-white">{property.baths}</p>
                                </div>
                                {property.sqm && (
                                    <div>
                                        <p className="text-gray-500 text-sm uppercase mb-2">Size</p>
                                        <p className="text-2xl font-bold text-white">{property.sqm} m²</p>
                                    </div>
                                )}
                                {property.plotSize && (
                                    <div>
                                        <p className="text-gray-500 text-sm uppercase mb-2">Plot Size</p>
                                        <p className="text-2xl font-bold text-white">{property.plotSize} m²</p>
                                    </div>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">Price</p>
                                <p className="text-5xl font-bold text-gold-500">{property.price}</p>
                                <p className="text-gray-400 text-sm mt-2">{property.type}</p>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif text-white mb-4">Overview</h2>
                                <p className="text-gray-300 leading-relaxed mb-4">{property.fullDescription || property.description}</p>
                            </div>

                            {/* Amenities */}
                            {property.amenities && property.amenities.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-serif text-white mb-4">Amenities & Features</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {property.amenities.map((amenity, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-lg">
                                                <CheckCircle size={18} className="text-gold-500" />
                                                <span className="text-white text-sm">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {property.tags && property.tags.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {property.tags.map((tag, idx) => (
                                            <span key={idx} className="bg-gold-500/20 text-gold-400 px-3 py-1 rounded-full text-xs border border-gold-500/30">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Map Section */}
                        {property.latitude && property.longitude && (
                            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-8">
                                <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-2">
                                    <Globe size={24} /> Location Map
                                </h2>
                                <div className="bg-black/50 rounded-lg h-80 flex items-center justify-center border border-white/10">
                                    <div className="text-center">
                                        <MapPin size={32} className="text-gold-500 mx-auto mb-2" />
                                        <p className="text-gray-400">Coordinates: {property.latitude}, {property.longitude}</p>
                                        <p className="text-sm text-gray-500 mt-2">Interactive map integration available</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Price Card */}
                        <div className="bg-gradient-to-b from-gold-500/20 to-gold-500/10 border border-gold-500/30 rounded-2xl p-8 mb-8">
                            <p className="text-gold-400 text-sm uppercase tracking-widest mb-2">Listed For</p>
                            <p className="text-4xl font-bold text-gold-500 mb-6">{property.price}</p>
                            <button 
                                onClick={() => setShowContactForm(!showContactForm)}
                                className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3 rounded-lg hover:from-gold-500 hover:to-gold-400 transition-all mb-3"
                            >
                                Book a Viewing
                            </button>
                            <button 
                                onClick={() => window.open(`https://wa.me/${property.agentPhone?.replace(/\D/g, '')}?text=I'm interested in ${property.title}`)}
                                className="w-full border border-gold-500 text-gold-400 font-bold py-3 rounded-lg hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2"
                            >
                                <Phone size={18} /> WhatsApp Agent
                            </button>
                        </div>

                        {/* Agent Card */}
                        {property.agentName && (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                                <h3 className="text-xl font-serif text-white mb-6">Your Agent</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    {property.agentImage && (
                                        <img 
                                            src={property.agentImage}
                                            alt={property.agentName}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="text-white font-semibold text-lg">{property.agentName}</p>
                                        <p className="text-gray-400 text-sm">Luxury Properties Specialist</p>
                                    </div>
                                </div>
                                {property.agentPhone && (
                                    <div className="mb-3 pb-3 border-b border-white/10">
                                        <p className="text-gray-500 text-xs uppercase mb-1">Phone</p>
                                        <a href={`tel:${property.agentPhone}`} className="text-gold-400 hover:text-gold-300 font-semibold">
                                            {property.agentPhone}
                                        </a>
                                    </div>
                                )}
                                {property.agentEmail && (
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase mb-1">Email</p>
                                        <a href={`mailto:${property.agentEmail}`} className="text-gold-400 hover:text-gold-300 font-semibold break-all">
                                            {property.agentEmail}
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Contact Form */}
                        {showContactForm && (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                                <h3 className="text-xl font-serif text-white mb-6">Schedule a Viewing</h3>
                                <form className="space-y-4">
                                    <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-gold-500" />
                                    <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-gold-500" />
                                    <input type="tel" placeholder="Your Phone" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-gold-500" />
                                    <textarea placeholder="Your Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-gold-500 resize-none"></textarea>
                                    <button type="submit" className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3 rounded-lg hover:from-gold-500 hover:to-gold-400 transition-all">
                                        Send Inquiry
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Favorite */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleFavorite(property.id)}
                                className={`flex-1 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                                    favorites.includes(property.id)
                                        ? 'bg-gold-500 text-black'
                                        : 'bg-white/5 border border-white/10 text-white hover:border-gold-500/50'
                                }`}
                            >
                                <Heart size={18} fill={favorites.includes(property.id) ? 'currentColor' : 'none'} />
                                {favorites.includes(property.id) ? 'Saved' : 'Save'}
                            </button>
                            <button className="py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white hover:border-gold-500/50 transition-all">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Similar Properties */}
                {similarProperties.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-white/10">
                        <h2 className="text-3xl font-serif text-white mb-8">Similar Properties in {property.area}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {similarProperties.map(prop => (
                                <div 
                                    key={prop.id}
                                    onClick={() => navigate('property-detail', undefined, prop.id)}
                                    className="group bg-black/80 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="relative h-32 overflow-hidden">
                                        <img src={prop.image} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-serif text-white line-clamp-1 group-hover:text-gold-400">{prop.title}</h3>
                                        <p className="text-gold-500 font-bold text-sm mb-2">{prop.price}</p>
                                        <p className="text-xs text-gray-500">{prop.beds} Beds • {prop.baths} Baths</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const JobsView = ({ navigate, favorites, toggleFavorite }: any) => (
    // Legacy route alias - render stays page to ensure users never see job listings here
    <StaysPage />
);

const EventsView = ({ favorites, toggleFavorite }: any) => (
    <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
        <SectionTitle title="Transport / Mobility" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map(item => (
                <div key={item.id} className="h-auto">
                    <LuxuryCard 
                        id={item.id}
                        title={item.name}
                        image={item.image}
                        logo={(item as any).logo || item.image}
                        subtitle={`${item.date} • ${item.time}`}
                        price={item.price}
                        location={item.location}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={toggleFavorite}
                        onPress={() => {}}
                    />
                </div>
            ))}
        </div>
    </div>
);

const DashboardView = ({ favorites, toggleFavorite, navigate }: any) => (
    <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
        <SectionTitle title="Dashboard" subtitle="Welcome back, John" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Rewards Points</div>
                <div className="text-3xl font-serif text-gold-400">{rewardStats.points}</div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Saved Items</div>
                <div className="text-3xl font-serif text-white">{favorites.length}</div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Messages</div>
                <div className="text-3xl font-serif text-white">2</div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Status</div>
                <div className="text-3xl font-serif text-green-500">Active</div>
            </div>
        </div>
    </div>
);

// AI Smart Medical Search Component
const AIMedicalSearchPanel = ({ businesses, navigate }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [explanation, setExplanation] = useState('');

  const handleSmartSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await performSmartMedicalSearch(searchQuery, businesses);
      setSearchResults(results.results);
      setExplanation(results.explanation);
    } catch (error) {
      console.error('Search error:', error);
      setExplanation('Search temporarily unavailable.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-black via-black/95 to-black/90 border border-gold-400/20 rounded-2xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Stethoscope size={24} className="text-gold-400" />
        <h3 className="text-2xl font-serif text-white">AI Medical Search</h3>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">Describe what you need: "I need a gynaecologist near Nelspruit" or "Find cardiologists in Mbombela"</p>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="I need a specialist near..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSmartSearch()}
          className="flex-1 bg-white/10 border border-gold-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
        />
        <button
          onClick={handleSmartSearch}
          disabled={isSearching || !searchQuery.trim()}
          className="bg-gold-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-gold-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSearching ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search size={18} />
              Search
            </>
          )}
        </button>
      </div>

      {explanation && (
        <div className="text-xs text-gray-400 mb-4 p-3 bg-black/50 rounded-lg border-l-2 border-gold-400">
          💡 {explanation}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.slice(0, 6).map((result: any) => (
            <div
              key={result.id}
              onClick={() => navigate('business-detail', undefined, result.id)}
              className="bg-black/60 border border-white/10 rounded-xl p-4 hover:border-gold-400 cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-bold text-sm group-hover:text-gold-400 transition-colors">{result.name}</h4>
                  <p className="text-xs text-gray-400">{result.subcategory}</p>
                </div>
                {result.verified && <CheckCircle size={16} className="text-green-500 flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                <MapPin size={12} />
                {result.location}
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-gold-400 fill-gold-400" />
                <span className="text-gold-400 font-bold">{result.rating}</span>
                <span className="text-gray-500">({result.reviewCount})</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HomeView = ({ navigate, favorites, toggleFavorite, businesses, activeArea, setActiveArea }: { navigate: (view: string, category?: string, id?: string) => void, favorites: string[], toggleFavorite: (id: string) => void, businesses: Business[], activeArea: string, setActiveArea: (area: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{text: string, type: 'category' | 'business' | 'car' | 'dealership'}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isSmartSearching, setIsSmartSearching] = useState(false);
  const heroSlides = [
    { url: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=2560&auto=format&fit=crop", location: "Mpumalanga's Digital Home", subtitle: "The All-in-One Platform", title: "LOWVELD", highlight: "HUB", desc: "Mpumalanga's definitive digital ecosystem. Discover premium businesses, verified services, and local opportunities in one place." },
    { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2560&auto=format&fit=crop", location: "Smart Regional Search", subtitle: "Find Everything Locally", title: "SMART", highlight: "DISCOVERY", desc: "Connect with exactly what you need. From medical specialists to luxury real estate, our AI-powered directory puts the region in your palm." },
    { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2560&auto=format&fit=crop", location: "Quality Excellence", subtitle: "Verified Quality", title: "Explore More", highlight: "VENDORS", desc: "Only the best make it onto our hub. Explore a curated selection of top-tier services and products in a sophisticated environment." }
  ];
    useEffect(() => {
        const timer = setInterval(() => { setCurrentSlide((prev) => (prev + 1) % heroSlides.length); }, 7000);
        return () => clearInterval(timer);
    }, []);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleDeepSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSmartSearching(true);
    setShowSuggestions(false);
    navigate('directory', searchTerm);
    setIsSmartSearching(false);
  };
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const term = value.toLowerCase();
      const matches: {text: string, type: 'category' | 'business' | 'car' | 'dealership'}[] = [];
            // prefer main categories first
            Object.values(Category).forEach(cat => { if ((cat as string).toLowerCase().includes(term)) matches.push({ text: cat as string, type: 'category' }); });
            // then subcategories
            Object.values(CategorySubcategories).flat().forEach(sub => { if ((sub as string).toLowerCase().includes(term)) matches.push({ text: sub as string, type: 'category' }); });
      businesses.forEach(b => { if (b.name.toLowerCase().includes(term)) matches.push({ text: b.name, type: 'business' }); });
      const uniqueMatches = Array.from(new Set(matches.map(m => m.text))).map(text => matches.find(m => m.text === text)!).slice(0, 6);
      setSuggestions(uniqueMatches);
      setShowSuggestions(uniqueMatches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  const handleSuggestionClick = (suggestion: { text: string, type: string }) => {
      setSearchTerm(suggestion.text);
      setShowSuggestions(false);
      if (suggestion.type === 'category') navigate('directory', suggestion.text);
      else navigate('directory'); 
  };
    return (
        <div className="w-full">
            <style>{`@keyframes slowFloat { 0% { transform: translateY(0px); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0px); } } .animate-slow-float { animation: slowFloat 14s ease-in-out infinite; }`}</style>
      <style>{`@keyframes wave { 0%, 100% { transform: translateY(0); color: inherit; } 50% { transform: translateY(-10px); color: #E3B92C; } }`}</style>
                        <section className="relative h-[56vh] min-h-[320px] flex items-center justify-center overflow-hidden bg-black">
                                <div className="absolute inset-0 z-0">
                                        <img src={heroSlides[currentSlide].url} className="w-full h-full object-cover grayscale-[10%] blur-sm opacity-30" alt="Hero" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-black/95 pointer-events-none"></div>
                                </div>
                                <div className="relative z-10 container mx-auto px-4 text-center">
                                        <div className="max-w-4xl mx-auto">
                                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 tracking-tight font-black leading-tight">Discover the Best of the Lowveld</h1>
                                                <p className="text-gray-300 text-sm md:text-base mb-8 opacity-80">A curated digital ecosystem connecting people to trusted businesses, premium services, and standout local experiences across Mpumalanga.</p>

                                                <div className="flex flex-col items-center justify-center gap-4">
                                                    <button onClick={() => navigate('directory')} className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-2xl hover:bg-gold-500 hover:text-black transition-colors duration-500">Browse the Directory</button>
                                                </div>
                                        </div>
                                </div>
                        </section>
            <QuickAccessSection navigate={navigate} />

            <ActivityTicker />
            <SponsoredSection />
            <section className="py-20 bg-[#050505] border-t border-white/5">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Our Standard of Trust</h2>
                <p className="text-gray-400 text-base mb-8 max-w-2xl mx-auto">We verify businesses, protect quality, and keep discovery honest — without pay-to-play rankings.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-6">
                  <div className="bg-black/60 rounded-xl p-6 flex flex-col items-center justify-center gap-3 border border-white/6">
                    <div className="text-gold-400 font-bold uppercase tracking-widest text-sm">Verified Only</div>
                    <p className="text-xs text-gray-400 text-center">Every listing meets our review criteria</p>
                  </div>
                  <div className="bg-black/60 rounded-xl p-6 flex flex-col items-center justify-center gap-3 border border-white/6">
                    <div className="text-gold-400 font-bold uppercase tracking-widest text-sm">One Ecosystem</div>
                    <p className="text-xs text-gray-400 text-center">Discover, shop, book, and engage in one place</p>
                  </div>
                  <div className="bg-black/60 rounded-xl p-6 flex flex-col items-center justify-center gap-3 border border-white/6">
                    <div className="text-gold-400 font-bold uppercase tracking-widest text-sm">AI Concierge</div>
                    <p className="text-xs text-gray-400 text-center">Smart recommendations tailored to you</p>
                  </div>
                  <div className="bg-black/60 rounded-xl p-6 flex flex-col items-center justify-center gap-3 border border-white/6">
                    <div className="text-gold-400 font-bold uppercase tracking-widest text-sm">Trusted by Locals</div>
                    <p className="text-xs text-gray-400 text-center">Built for the Lowveld, trusted by those who live here</p>
                  </div>
                </div>
              </div>
            </section>
      
      <MarketplaceStoryCards navigate={navigate} />
      <LowveldStoriesSection />
    </div>
  );
}

function App() {
  // ===== ADMIN ROUTING: Detect /admin paths and conditionally render AdminApp =====
  const [isAdminApp, setIsAdminApp] = useState(false);
  
  // ===== CRITICAL FIX #3: Restore auth state from localStorage on mount =====
  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return !!localStorage.getItem('lh_user');
    } catch {
      return false;
    }
  });
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const stored = localStorage.getItem('lh_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  
  // Restore auth state on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lh_user');
      if (stored) {
        const user = JSON.parse(stored);
        setIsAuthenticated(true);
        setCurrentUser(user);
      }
    } catch (e) {
      console.error('Failed to restore auth:', e);
    }
  }, []);

  // ===== ADMIN ROUTING: Detect /admin paths on mount =====
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      setIsAdminApp(true);
    }
  }, []);
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [activeArea, setActiveArea] = useState('All Areas');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: 'user' | 'ai', text: string}[]>([{ sender: 'ai', text: 'Welcome to LowveldHub. I am your Lowveld AI Concierge. How can I assist you today?' }]);
  const [chatInput, setChatInput] = useState('');
  const [conciergePrefs, setConciergePrefs] = useState<any>(() => { try { const s = localStorage.getItem('lh_concierge_prefs'); return s ? JSON.parse(s) : { favoriteCategories: [], favoriteAreas: [], priceRange: { min: 0, max: 0 }, preferredTier: null, savedRecommendations: [], conversationHistory: [] }; } catch { return { favoriteCategories: [], favoriteAreas: [], priceRange: { min: 0, max: 0 }, preferredTier: null, savedRecommendations: [], conversationHistory: [] }; } });
  const [isConciergePrefsOpen, setIsConciergePrefsOpen] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  // OPTIMIZED: Memoize seed data merging to prevent recalculation on every render
  const localBusinesses = useMemo(() => [
    ...businesses,
    ...missingBusinesses,
    ...freightHaulageCompanies,
    ...logisticsWarehousingCompanies,
    ...courierDeliveryCompanies,
    ...privateDriversCompanies,
    ...airportTransfersCompanies,
    ...shuttleMinibusCompanies,
    ...tourSightseeingCompanies,
    ...evChargingStations,
    ...helicopterCharters,
    ...familyServices,
    ...childcareSchools,
    ...communitycentres,
    ...religiouscentres,
    ...playcenters,
    ...afterschoolprograms,
    ...familyentertainment,
    ...hotelsLodges,
    ...guestHousesBBs,
    ...safarisGameReserves,
    ...tourOperatorsGuides,
    ...scenicRoutesAdventure,
    ...yachtBoatCharters,
    ...privateJetAirCharter,
    ...clinicsSpecialists,
    ...dentists,
    ...pharmacies,
    ...mentalHealthProfessionals,
    ...wellnessRetreats,
    ...veterinaryClinics,
    ...generalPractioners,
    ...paeds,
    ...derms,
    ...cards,
    ...fcs,
    ...physiotherapists,
    ...psychologists,
    ...psychiatrists,
    ...dieticians,
    ...diagnosticLabs,
    ...radiology,
    ...homeCarServices,
    ...oldAgeHomes,
    ...rehabilitationCentres,
    ...optometrists,
    ...chiropractors,
    ...buildersContractors,
    ...plumbingElectrical,
    ...roofingRenovations,
    ...interiorDesigners,
    ...landscapingGardening,
    ...smartHomeInstallation,
    ...customFurnitureMakers,
    ...poolGardenDesigners,
    ...legalServices,
    ...accountingAndTax,
    ...consultants,
    ...marketingAndAdvertising,
    ...techAndITServices,
    ...architectsAndDesigners,
    ...businessBrokersAndAdvisors,
    ...lifeCoachesAndMentors,
    ...translationAndLanguageServices,
    ...prAndMediaConsultants,
    ...luxuryEVDealerships,
    ...carHireAndRentals,
    ...serviceAndRepairs,
    ...carDetailingAndMaintenance,
    ...limoAndExoticRentals,
    ...motorcycleAndATVRentals,
    ...cropAndFarmSuppliers,
    ...livestockServices,
    ...agritechAndMachinery,
    ...miningSuppliers,
    ...miningEquipmentAndMachinery,
    ...industrialToolsAndMachinery,
    ...barsAndCocktailLounges,
    ...clubsAndLounges,
    ...liveMusicAndVenues,
    ...theatersAndCinemas,
    ...gamingAndVRCenters,
    ...danceStudiosAndPerformances,
    ...musicLessonsAndTeachers,
    ...conciergeServices,
    ...exclusiveExperiences,
    ...personalAssistants,
    ...luxuryClubsAndMemberships,
    ...wineTastingAndVineyards,
    ...golfAndCountryClubs,
    ...personalStylingAndWardrobeConsultants,
    ...banksAndBranches,
    ...loanProviders,
    ...insuranceBrokers,
    ...investmentAndFinancialAdvisors,
    ...cryptoAndBlockchainServices,
    ...estatePlanningAndWills,
    ...taxConsultantsAndAdvisors,
    ...allRetailers,
    ...boutiquesAndFashion,
    ...homeAndDecorStores,
    ...grocersAndMarkets,
    ...luxuryProductsAndGifts,
    ...ecoAndSustainableProducts,
    ...onlineMarketplaces,
    ...estateAgents,
    ...propertyRentals,
    ...commercialProperty,
    ...propertyManagementAndTenants,
    ...landAndPlots,
    ...luxuryHomesAndVillas,
    ...apartmentsAndLofts,
    ...municipalServices,
    ...licensingAndRegistrations,
    ...publicHealthServices,
    ...softwareDevelopment,
    ...webAndDesignStudios,
    ...digitalMarketingAgencies,
    ...photographyAndVideography,
    ...dronePhotographyVideography,
    ...appDevelopmentSoftwareHouses,
    ...aiAndDataScienceServices,
    ...gamingAndEsports,
    ...virtualAugmentedRealityServices,
    ...jobListings,
    ...jobSeekerProfiles,
    ...recruitmentHRServices,
    ...internshipsApprenticeships,
    ...careerCoachingGuidance,
    ...premiumWineHouses,
    ...craftDistilleries,
    ...luxurycocktailBars,
    ...wineTastingExperiences,
    ...spiritsInvestment,
    ...executiveRecruitment,
    ...hospitalityStaffing,
    ...skilledTradesRecruitment,
    ...temporaryContractStaffing,
    ...hrConsultingOutsourcing,
    ...cleaningServices,
    ...gardeningLandscaping,
    ...homeMaintenanceHandyman,
    ...nanniesCaregiverss,
    ...elderlyCareServices,
    ...convenienceStores,
    ...superettes,
    ...spazaShops,
    ...butcheries,
    ...bakeries,
    ...liquorStores,
    ...gynecologists,
    ...maternityClinics,
    ...midwivesDoulas,
    ...creches,
    ...aftercareTutors,
    ...kidsActivityCentres,
    ...gynaecologists,
    ...paediatricians,
    ...orthopaedicSurgeons,
    ...dermatologists,
    ...cardiologists,
    ...fertilityClinics,
    ...optometristsOphthalmologists,
    ...professionalServices,
    ...additionalPremiumBusinesses,
  ], []);

  // OPTIMIZED: Memoize frequently-used filtered lists to avoid recalculation
  const categoryListings = useMemo(() => 
    localBusinesses.filter(b => (!activeCategory || b.category === activeCategory) && (!activeSub || b.subcategory === activeSub) && (activeArea === 'All Areas' || b.location.includes(activeArea))),
    [localBusinesses, activeCategory, activeSub, activeArea]
  );

  const medicalListings = useMemo(() => 
    localBusinesses.filter(b => b.category === Category.HealthAndMedical),
    [localBusinesses]
  );

  const premiumListings = useMemo(() => 
    localBusinesses.filter(b => b.tier !== ListingTier.Trial),
    [localBusinesses]
  );

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [favorites, setFavorites] = useState<string[]>(() => { try { const saved = localStorage.getItem('lh_favorites'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; } });
  
  // MVP Cart System (localStorage persisted)
  const [cartItems, setCartItems] = useState<Array<{id: string; quantity: number; title: string; price: number}>>(() => {
    try {
      const saved = localStorage.getItem('lh_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  
  useEffect(() => { 
    localStorage.setItem('lh_favorites', JSON.stringify(favorites)); 
  }, [favorites]);

  useEffect(() => { 
    localStorage.setItem('lh_cart', JSON.stringify(cartItems)); 
  }, [cartItems]);

    // Enquiries & Bookings (basic data model + persistence)
    const [enquiries, setEnquiries] = useState<any[]>(() => { try { const s = localStorage.getItem('lh_enquiries'); return s ? JSON.parse(s) : []; } catch { return []; } });
    const [bookings, setBookings] = useState<any[]>(() => { try { const s = localStorage.getItem('lh_bookings'); return s ? JSON.parse(s) : []; } catch { return []; } });
    useEffect(() => { try { localStorage.setItem('lh_enquiries', JSON.stringify(enquiries)); } catch {} }, [enquiries]);
    useEffect(() => { try { localStorage.setItem('lh_bookings', JSON.stringify(bookings)); } catch {} }, [bookings]);

    // Slide-over panel state
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panelMode, setPanelMode] = useState<'enquiry' | 'booking' | null>(null);
    const [panelBusinessId, setPanelBusinessId] = useState<string | null>(null);

    // Panel form state
    const [panelName, setPanelName] = useState('');
    const [panelContact, setPanelContact] = useState('');
    const [panelMessage, setPanelMessage] = useState('');
    const [panelDate, setPanelDate] = useState('');
    const [panelTime, setPanelTime] = useState('');
    const [panelSuccess, setPanelSuccess] = useState(false);

    const openPanel = (mode: 'enquiry' | 'booking', bizId: string) => { setPanelMode(mode); setPanelBusinessId(bizId); setIsPanelOpen(true); };
    const closePanel = () => { setIsPanelOpen(false); setPanelBusinessId(null); setPanelMode(null); };

    const sendEnquiry = (payload: { businessId: string, userId?: string | null, name: string, contact: string, message: string, preferred?: string | null }) => {
        const now = new Date().toISOString();
        const e = { id: `enq-${Date.now()}`, businessId: payload.businessId, userId: payload.userId || null, contact: payload.contact, name: payload.name, message: payload.message, source: 'Directory', timestamp: now, status: 'New' };
        setEnquiries(prev => [e, ...prev]);
        // Email notification (opens mail client for owner's address)
        const biz = localBusinesses.find(b => b.id === payload.businessId);
        if (biz && biz.email) {
            const subject = `New enquiry from LowveldHub for ${biz.name}`;
            const body = `Name: ${payload.name}%0D%0AContact: ${payload.contact}%0D%0AMessage:%0D%0A${payload.message}%0D%0A%0D%0AReply via LowveldHub`;
            window.location.href = `mailto:${biz.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
        }
    };

    const requestBooking = (payload: { businessId: string, userId?: string | null, name: string, contact: string, date: string, time: string }) => {
        const now = new Date().toISOString();
        const b = { id: `bk-${Date.now()}`, businessId: payload.businessId, userId: payload.userId || null, name: payload.name, contact: payload.contact, date: payload.date, time: payload.time, source: 'Directory', timestamp: now, status: 'New' };
        setBookings(prev => [b, ...prev]);
        const biz = localBusinesses.find(bb => bb.id === payload.businessId);
        if (biz && biz.email) {
            const subject = `New booking request from LowveldHub for ${biz.name}`;
            const body = `Name: ${payload.name}%0D%0AContact: ${payload.contact}%0D%0ARequested:%20${payload.date}%20at%20${payload.time}%0D%0A%0D%0AReply via LowveldHub`;
            window.location.href = `mailto:${biz.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
        }
    };

  const toggleFavorite = (id: string) => { 
    setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]); 
  };

    useEffect(() => {
        if (!isPanelOpen) return;
        // prefill from localStorage user if available
        try {
            const u = localStorage.getItem('lh_user');
            if (u) {
                const user = JSON.parse(u);
                if (user.name) setPanelName(user.name);
                if (user.contact) setPanelContact(user.contact);
            }
        } catch {}
        setPanelMessage('Hi, I would like more information about your services.');
        setPanelSuccess(false);
    }, [isPanelOpen]);

  const handleLogin = (email: string, name: string) => {
    const user = {
      id: `user_${Date.now()}`,
      name: name,
      email: email,
      role: 'User',
      status: 'Active',
      tier: 'Essential',
      rewardPoints: 2450,
      savedItems: [],
      joinedDate: new Date().toISOString()
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('lh_user', JSON.stringify(user));
    } catch {}
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    try {
      localStorage.removeItem('lh_user');
    } catch {}
    setCurrentView('home');
  };

  const handleRegister = () => {
    setCurrentView('signup');
  };

  // Check if user is logged in on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lh_user');
      if (saved) {
        const user = JSON.parse(saved);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  // ===== CRITICAL FIX #7: Add debounce protection for rapid navigation clicks =====
  const navigationLockRef = useRef(false);
  const handleNavigate = (view: string, category?: string, id?: string, sub?: string) => {
    if (navigationLockRef.current) return; // Debounce: ignore rapid clicks
    navigationLockRef.current = true;
    setTimeout(() => { navigationLockRef.current = false; }, 300);
    
    // Require login for protected routes
    const protectedRoutes = ['dashboard'];
    if (protectedRoutes.includes(view) && !isAuthenticated) {
      setCurrentView('login');
      return;
    }
    setCurrentView(view);
    if (category) setActiveCategory(category);
    if (sub) setActiveSub(sub);
    if (id) setSelectedBusinessId(id);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  // MVP Cart Handler
  const handleAddToCart = (productId: string, quantity: number, title: string, price: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, quantity, title, price }];
    });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => { setAuthMode(mode); setIsAuthOpen(true); setIsMenuOpen(false); };
  const handleAddBusiness = (newBusiness: Business) => { 
    // Note: localBusinesses is re-initialized from seeds on each render
    // To persist new businesses, use backend API instead
    console.log('New business:', newBusiness);
  };
    const handleChatSend = async (msg?: string) => {
            const userMsg = msg || chatInput;
            if (!userMsg.trim()) return;
            // Append user message
            setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
            setChatInput('');
            if(msg) setIsChatOpen(true);

            // Build context with area
            const prompt = activeArea !== 'All Areas' ? `[User Location Context: ${activeArea}] ${userMsg}` : userMsg;

            try {
                // Call enhanced concierge which can return updated preferences
                const historyForAI = (conciergePrefs?.conversationHistory || []).slice(-10).map((h: any) => ({ role: h.role, message: h.message }));
                const result = await chatWithConciergeEnhanced(prompt, conciergePrefs, historyForAI);
                const aiResp = result.response || "I'm sorry, I couldn't process that right now.";

                // Update preferences if AI returned any
                if (result.updatedPreferences) {
                    const updated = { ...conciergePrefs, ...result.updatedPreferences };
                    setConciergePrefs(updated);
                    try { localStorage.setItem('lh_concierge_prefs', JSON.stringify(updated)); } catch {}
                }

                // Save to conversation history
                const timestamp = new Date().toISOString();
                const newHistoryEntryUser = { role: 'user', message: userMsg, timestamp };
                const newHistoryEntryAI = { role: 'ai', message: aiResp, timestamp };
                const updatedHistory = [...(conciergePrefs.conversationHistory || []), newHistoryEntryUser, newHistoryEntryAI].slice(-100);
                const prefsWithHistory = { ...conciergePrefs, conversationHistory: updatedHistory };
                setConciergePrefs(prefsWithHistory);
                try { localStorage.setItem('lh_concierge_prefs', JSON.stringify(prefsWithHistory)); } catch {}

                setChatMessages(prev => [...prev, { sender: 'ai', text: aiResp }]);
            } catch (e) {
                // Fallback to basic concierge
                const response = await chatWithConcierge(prompt, []);
                setChatMessages(prev => [...prev, { sender: 'ai', text: response }]);
            }
    };

  const navItems = [
    { id: 'home', label: 'Home' }, 
    { id: 'directory', label: 'Directory' }, 
    { id: 'marketplace', label: 'Marketplace' }, 
    { id: 'lowveld-stories', label: 'Stories' }
  ];

    const renderView = () => {
        const BusinessDashboardView: React.FC<{ businessId?: string }> = ({ businessId }) => {
            const bizId = businessId || selectedBusinessId || '';
            const myEnquiries = enquiries.filter(e => e.businessId === bizId);
            const myBookings = bookings.filter(b => b.businessId === bizId);
            return (
                <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen bg-[#050505] text-white">
                    <SectionTitle title="Business Dashboard" subtitle="Enquiries & Bookings" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg text-white font-semibold mb-4">Enquiries</h3>
                            {myEnquiries.length === 0 ? <div className="text-gray-400">No enquiries yet.</div> : myEnquiries.map((q:any) => (
                                <div key={q.id} className="p-3 mb-3 bg-black/40 rounded-md border border-white/5">
                                    <div className="flex items-start justify-between"><div>
                                        <div className="text-white font-semibold">{q.name}</div>
                                        <div className="text-sm text-gray-400">{q.contact}</div>
                                    </div>
                                    <div className="text-xs text-gray-300 uppercase">{q.status}</div></div>
                                    <div className="mt-2 text-gray-300">{q.message}</div>
                                    <div className="mt-3 flex gap-2">
                                        <button onClick={() => { window.location.href = `mailto:${q.contact}?subject=Re:%20Your%20enquiry%20to%20${localBusinesses.find((b:any)=>b.id===q.businessId)?.name || ''}`; }} className="px-3 py-2 bg-white/5 rounded">Respond</button>
                                        <button onClick={() => { setEnquiries(prev => prev.map((item:any) => item.id===q.id?{...item,status:'Responded'}:item)); }} className="px-3 py-2 bg-gold-500 text-black rounded">Mark Responded</button>
                                        <button onClick={() => { setEnquiries(prev => prev.map((item:any) => item.id===q.id?{...item,status:'Closed'}:item)); }} className="px-3 py-2 border rounded">Close</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg text-white font-semibold mb-4">Bookings</h3>
                            {myBookings.length === 0 ? <div className="text-gray-400">No booking requests yet.</div> : myBookings.map((bk:any) => (
                                <div key={bk.id} className="p-3 mb-3 bg-black/40 rounded-md border border-white/5">
                                    <div className="flex items-start justify-between"><div>
                                        <div className="text-white font-semibold">{bk.name}</div>
                                        <div className="text-sm text-gray-400">{bk.contact} • {bk.date} {bk.time}</div>
                                    </div>
                                    <div className="text-xs text-gray-300 uppercase">{bk.status}</div></div>
                                    <div className="mt-3 flex gap-2">
                                        <button onClick={() => { window.location.href = `mailto:${bk.contact}?subject=Re:%20Your%20booking%20request%20to%20${localBusinesses.find((b:any)=>b.id===bk.businessId)?.name || ''}`; }} className="px-3 py-2 bg-white/5 rounded">Respond</button>
                                        <button onClick={() => { setBookings(prev => prev.map((item:any) => item.id===bk.id?{...item,status:'Confirmed'}:item)); }} className="px-3 py-2 bg-gold-500 text-black rounded">Confirm</button>
                                        <button onClick={() => { setBookings(prev => prev.map((item:any) => item.id===bk.id?{...item,status:'Closed'}:item)); }} className="px-3 py-2 border rounded">Close</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };
        const Breadcrumbs: React.FC<{ parts: { label: string, view?: string, category?: string, sub?: string, id?: string }[] }> = ({ parts }) => (
            <nav className="mb-6 pt-4" aria-label="Breadcrumb">
                <div className="flex items-center gap-3 text-sm">
                    {parts.map((p, i) => (
                        <span key={i} className="flex items-center gap-3">
                            {i > 0 && <ChevronRight size={14} className="text-gray-500" />}
                            {p.view ? (
                                <button 
                                    onClick={() => handleNavigate(p.view!, p.category, p.id, p.sub)} 
                                    className="text-gold-400 hover:text-gold-300 transition-colors font-medium whitespace-nowrap"
                                >
                                    {p.label}
                                </button>
                            ) : (
                                <span className="text-gray-400 font-medium whitespace-nowrap">{p.label}</span>
                            )}
                        </span>
                    ))}
                </div>
            </nav>
        );

        const DirectoryView: React.FC<any> = ({ navigate, businesses, activeArea, setActiveArea, initialCategory, initialSubcategory }) => {
            const [query, setQuery] = useState('');
            useEffect(() => {
                if (initialCategory && !initialSubcategory) {
                    handleNavigate('subcategory', initialCategory);
                }
                if (initialCategory && initialSubcategory) {
                    handleNavigate('category-listings', initialCategory, undefined, initialSubcategory);
                }
            }, []);

            const categories = [
                { label: Category.FoodAndHospitality, icon: FoodIcon },
                { label: Category.TourismTravelAndStays, icon: TourismIcon },
                { label: Category.LuxuryAndLifestyle, icon: LuxuryIcon },
                { label: Category.NightlifeAndEntertainment, icon: NightlifeIcon },
                { label: Category.BeautyWellnessPersonalCare, icon: BeautyIcon },
                { label: Category.HealthAndMedical, icon: HealthIcon },
                { label: Category.RealEstateAndProperty, icon: RealEstateIcon },
                { label: Category.Automotive, icon: AutomotiveIcon },
                { label: Category.TransportChauffeursFleet, icon: TransportIcon },
                { label: Category.HomeConstructionAndTrades, icon: HomeTradesIcon },
                { label: Category.ShoppingAndRetail, icon: ShoppingIcon },
                { label: Category.LegalAndAdvisory, icon: BusinessIcon },
                { label: Category.EducationAndSkills, icon: EducationIcon },
                { label: Category.DigitalMediaAndTechnology, icon: ITIcon },
                { label: Category.FinancialServices, icon: FinancialIcon },
                { label: Category.ManufacturingWholesaleSuppliers, icon: AgricultureIcon },
                { label: Category.CommunityAndOrganisations, icon: FamilyIcon },
                { label: Category.GovernmentAndPublicServices, icon: GovIcon },
                { label: Category.EventsExperiencesAndOccasions, icon: FoodIcon },
                { label: Category.SportsFitnessAndRecreation, icon: HealthIcon },
                { label: Category.PetsVeterinaryAndAnimalCare, icon: HealthIcon },
                { label: Category.SecurityProtectionAndResponse, icon: BusinessIcon },
                { label: Category.EnergyWaterAndSustainability, icon: FinancialIcon },
                { label: Category.RecruitmentAndStaffing, icon: RecruitmentIcon },
                { label: Category.DomesticAndPersonalServices, icon: DomesticServicesIcon },
                { label: Category.ConvenienceAndDailyNeeds, icon: ConvenienceIcon },
                { label: Category.WomenHealthAndMaternal, icon: WomenHealthIcon },
                { label: Category.JobsAndCareers, icon: BusinessIcon },
                { label: Category.BusinessGrowthAndConsulting, icon: BusinessIcon },
                { label: Category.CreatorEconomyAndTalent, icon: ITIcon }
            ];

            const handleSearch = () => {
                const q = query.trim().toLowerCase();
                if (!q) return;
                const catMatch = categories.find((c: any) => (c.label as string).toLowerCase().includes(q));
                if (catMatch) return handleNavigate('category-listings', catMatch.label);
                const biz = businesses.find((b: any) => b.name.toLowerCase().includes(q));
                if (biz) return handleNavigate('business-detail', undefined, biz.id);
                handleNavigate('directory');
            };

            React.useEffect(() => {
                // Add scroll-animate class only when JS runs so cards remain visible if JS is disabled
                const cards = Array.from(document.querySelectorAll('.category-card')) as HTMLElement[];
                if (!cards.length) return;

                cards.forEach(c => c.classList.add('scroll-animate'));

                if (!('IntersectionObserver' in window)) {
                    cards.forEach(c => c.classList.add('is-visible'));
                    return;
                }

                const observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const el = entry.target as HTMLElement;
                                el.classList.add('is-visible');
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
                );

                cards.forEach(c => observer.observe(c));
                return () => observer.disconnect();
            }, []);

            return (
                <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
                    <div className="mb-8">
                        <div className="text-left">
                            <h2 className="text-2xl md:text-3xl font-semibold text-white" style={{letterSpacing: '-0.3px'}}>Directory</h2>
                            <p className="mt-2 text-[0.95rem]" style={{color: '#A6A6A6'}}>A curated index of the Lowveld's most trusted businesses</p>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="Search verified businesses, services or experiences"
                                        className="w-full rounded-[14px] px-4 py-3 text-white placeholder-[#6F6F6F] outline-none"
                                        style={{background: '#141414', border: 'none', boxShadow: '0 0 0 1px rgba(255,215,0,0.08)'}}
                                    />
                                    <button onClick={handleSearch} className="absolute right-1 top-1 bottom-1 px-4 py-2 rounded-[12px] mr-1 text-black" style={{background: '#C9A24D'}}>Search</button>
                                </div>

                                <div className="mt-2">
                                    <p className="text-[0.85rem]" style={{color: '#C9A24D', fontWeight: 500, letterSpacing: '0.4px', opacity: 0.95}}>Only vetted listings. Quality first.</p>
                                    <p className="text-[0.85rem]" style={{color: '#C9A24D', fontWeight: 500, letterSpacing: '0.4px', opacity: 0.95}}>Powered by intelligent local discovery</p>
                                </div>
                            </div>

                            <div className="ml-4 inline-block bg-[#141414] p-2 rounded-lg">
                                <AreaSelector activeArea={activeArea} onChange={setActiveArea} />
                            </div>
                        </div>
                    </div>

                                        <style>{`
                                                @keyframes fadeUp {
                                                    from { opacity: 0; transform: translateY(24px); }
                                                    to { opacity: 1; transform: translateY(0); }
                                                }
                                                @keyframes goldPulse {
                                                    0%,100%{ border-left-color: rgba(201,162,77,0.4); }
                                                    50%{ border-left-color: rgba(201,162,77,0.8); }
                                                }
                                                /* Base card: visible by default, graceful transitions */
                                                .category-card { opacity: 1; transform: translateY(0); position: relative; z-index: 1; height: auto; min-height: unset; transition: transform 0.45s ease, box-shadow 0.45s ease, border-left-color 0.3s ease; cursor: pointer; }

                                                /* Scroll-ready state is added via JS so cards remain visible if JS fails */
                                                .category-card.scroll-animate { opacity: 0; transform: translateY(24px); }

                                                .category-card.scroll-animate.is-visible { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease; transition-delay: var(--delay, 0s); }

                                                .category-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,162,77,0.35), 0 0 18px rgba(201,162,77,0.15); z-index: 5; }
                                                .category-card .left-accent { background: rgba(201,162,77,0.6); transition: background 0.3s ease, border-left-color 0.3s ease; }
                                                .category-card:hover .left-accent { background: #C9A24D; }
                                                .gold-pulse { animation: goldPulse 6s ease-in-out infinite; }
                                                .muted-card:hover { box-shadow: none; }

                                                @media (prefers-reduced-motion: reduce) {
                                                    .category-card.scroll-animate, .category-card.scroll-animate.is-visible { opacity: 1 !important; transform: none !important; transition: none !important; }
                                                }
                                        `}</style>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-visible">
                                            {categories.map((cat: any, i: number) => {
                            const labelText = String(cat.label || '');
                            let luxuryTag: string | null = null;
                            if (/luxury/i.test(labelText) || /Lifestyle/i.test(labelText)) luxuryTag = 'ELITE';
                            if (/automotive/i.test(labelText)) luxuryTag = 'LUXURY & EV';
                            if (/real estate|property/i.test(labelText)) luxuryTag = 'PREMIUM';
                            if (/food|hospitality|dining/i.test(labelText)) luxuryTag = 'CURATED';
                            const isGovernment = /government|public services/i.test(labelText);

                            return (
                                <button
                                    key={cat.label}
                                    onClick={() => handleNavigate('subcategory', cat.label)}
                                    className={`category-card ${luxuryTag && !isGovernment ? 'gold-pulse' : ''} ${isGovernment ? 'muted-card' : ''} relative text-left`}
                                    style={{background: 'linear-gradient(180deg, #121212 0%, #0D0D0D 100%)', borderRadius: '20px', padding: '1.8rem', ['--delay' as any]: `${i * 0.08}s`}} 
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] left-accent rounded-r" style={{background: 'rgba(201,162,77,0.6)'}}></div>

                                    <div className="pl-4">
                                        <div className={`flex items-center gap-2`}> 
                                            <div className="text-[0.95rem] uppercase tracking-[1.5px] font-medium" style={{color: '#FFFFFF'}}>{cat.label}</div>
                                            {luxuryTag && !isGovernment && (
                                                <span style={{color: '#C9A24D', fontSize: '0.7rem', letterSpacing: '1.8px', marginLeft: '0.5rem'}} className="font-semibold">{luxuryTag}</span>
                                            )}
                                        </div>
                                        <div className="mt-2 text-[0.85rem]" style={{color: '#9B9B9B', lineHeight: '1.6'}}>{(CategorySubcategories as any)[cat.label as any]?.slice(0,3).join(' • ')}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        };

        const SubcategoryView: React.FC<any> = ({ navigate }: any) => {
            const category = activeCategory;
            const subs = (category && CategorySubcategories[category]) ? CategorySubcategories[category] : [];
            const featuredListings = localBusinesses
                .filter(b => b.category === category && (b.tier === ListingTier.Platinum || b.tier === ListingTier.Elite))
                .slice(0, 3);
            
            const categoryIntro = {
                [Category.RecruitmentAndStaffing]: 'Find vetted recruitment partners, staffing experts, and HR consultants across Mpumalanga.',
                [Category.DomesticAndPersonalServices]: 'Premium domestic services from cleaning to elder care, all verified professionals.',
                [Category.ConvenienceAndDailyNeeds]: 'Your daily essentials: stores, fuel, pharmacy, and more — all trusted vendors.',
                [Category.WomenHealthAndMaternal]: 'Specialized women\'s health, maternity care, and family services by certified professionals.',
                [Category.HealthAndMedical]: 'World-class medical care with specialists, clinics, and wellness centers.',
                [Category.FoodAndHospitality]: 'Curated dining experiences from fine dining to casual comfort food.',
            }[category as Category] || `Explore curated ${(category || '').toLowerCase()} services in Mpumalanga.`;

            return (
                <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
                    <Breadcrumbs parts={[{ label: 'Directory', view: 'directory' }, { label: category || 'Category' }]} />
                    
                    {/* Category Intro */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-serif text-white mb-3">{category}</h1>
                        <p className="text-lg text-gray-400 max-w-2xl">{categoryIntro}</p>
                    </div>

                    {/* Featured Listings */}
                    {featuredListings.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-serif text-white mb-6">Featured Listings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {featuredListings.map(listing => (
                                    <button
                                        key={listing.id}
                                        onClick={() => handleNavigate('business-detail', undefined, listing.id)}
                                        className="group bg-black/40 border border-gold-500/30 rounded-xl overflow-hidden hover:border-gold-400 transition-all"
                                    >
                                        <img src={listing.image} alt={listing.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform" />
                                        <div className="p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-white font-semibold text-left">{listing.name}</h3>
                                                {listing.tier === ListingTier.Platinum && <Crown size={16} className="text-purple-400" />}
                                                {listing.tier === ListingTier.Elite && <Star size={16} className="text-gold-400" />}
                                            </div>
                                            <p className="text-sm text-gray-400">{listing.location}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <Star size={14} fill="currentColor" className="text-gold-400" />
                                                <span className="text-sm text-gray-300">{listing.rating} ({listing.reviewCount})</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Subcategories Grid */}
                    <div>
                        <h2 className="text-2xl font-serif text-white mb-6">Browse Subcategories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {subs.map((s: any) => (
                                <button key={s} onClick={() => handleNavigate('category-listings', category || undefined, undefined, s)} className="group bg-black/60 p-5 rounded-xl border border-white/10 hover:shadow-xl hover:border-gold-500 transition-all text-left">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-md bg-gold-500/10 flex items-center justify-center text-gold-400 font-bold text-sm">{(s as string)[0]}</div>
                                        <div>
                                            <div className="text-white font-semibold">{s}</div>
                                            <div className="text-xs text-gray-400 mt-1">View all</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

        switch (currentView) {
      case 'login': return <LoginPage onLogin={handleLogin} onRegister={handleRegister} />;
      case 'signup': return <SignupPage onSignup={() => handleNavigate('login')} onLoginRedirect={() => handleNavigate('login')} />;
      case 'dashboard': return isAuthenticated && currentUser ? <Dashboard user={currentUser} onLogout={handleLogout} navigate={handleNavigate} favorites={favorites} businesses={localBusinesses} /> : <LoginPage onLogin={handleLogin} onRegister={handleRegister} />;
      case 'home': return <HomeView navigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} businesses={localBusinesses} activeArea={activeArea} setActiveArea={setActiveArea} />;
      case 'directory': return <DirectoryView navigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} businesses={localBusinesses} activeArea={activeArea} setActiveArea={setActiveArea} initialCategory={activeCategory} initialSubcategory={activeSub} />;
      case 'list-your-business': return <ListYourBusinessPage onNavigate={handleNavigate} />;
      case 'business-application': return <BusinessSubmissionFormV2 onClose={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    case 'category-listings': return <ListingGridView title={activeCategory || "Directory"} items={categoryListings} type="business" favorites={favorites} toggleFavorite={toggleFavorite} navigate={handleNavigate} category={activeCategory} medicalBusinesses={medicalListings} />;
        case 'subcategory': return (
                <SubcategoryPage
                    categoryName={activeCategory || ''}
                    subCategoryName={activeSub || ''}
                    listings={localBusinesses}
                    heroImage={undefined}
                    navigate={handleNavigate}
                    selectedId={selectedBusinessId}
                    onSelectSubcategory={(name: string) => handleNavigate('subcategory', activeCategory || undefined, undefined, name)}
                />
        );
    case 'eats': return <EatsPagePremium navigate={handleNavigate} />;
    case 'eatery-detail': return <EateryDetail eateryId={selectedBusinessId} navigate={handleNavigate} listings={localBusinesses} />;
    case 'retail': return <RetailPage navigate={handleNavigate} />;
    case 'retail-detail': return <RetailDetailView retailerId={selectedBusinessId} navigate={handleNavigate} />;
    case 'business-professional': return <BusinessPage navigate={handleNavigate} />;
    case 'business-professional-detail': return <BusinessDetailViewComprehensive businessId={selectedBusinessId} navigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} businesses={localBusinesses} />;
    case 'nightlife': return <NightlifePage navigate={handleNavigate} />;
    case 'nightlife-detail': return <NightlifeDetailView venueId={selectedBusinessId} navigate={handleNavigate} />;
    case 'premium': return <ListingGridView title="Luxury Partners" items={premiumListings} type="business" favorites={favorites} toggleFavorite={toggleFavorite} navigate={handleNavigate} />;
      case 'real-estate': return <RealEstateView navigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} />;
    case 'property-detail': return <PropertyDetailView navigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} propertyId={selectedBusinessId} />;
    case 'stays': return <StaysPage navigate={handleNavigate} businesses={localBusinesses} />;
    case 'stays-detail': {
      const stay = localBusinesses.find(b => b.id === selectedBusinessId);
      if (!stay) return <NotFoundView navigate={handleNavigate} />;
      return <StaysDetailPremium stay={stay as any} navigate={handleNavigate} />;
    }
    case 'tourism': return <TourismLandingPremium navigate={handleNavigate} />;
    case 'destination-detail': {
      const destination = localBusinesses.find(d => d.id === selectedBusinessId);
      if (!destination) return <NotFoundView navigate={handleNavigate} />;
      return <TourismDestinationDetail destination={destination as any} navigate={handleNavigate} />;
    }
    case 'tourism-experience-detail': return <TourismExperienceDetailView navigate={handleNavigate} onClose={() => handleNavigate('tourism')} />;
    case 'experience-detail': return <ExperienceDetailPremium id={selectedBusinessId} navigate={handleNavigate} businesses={localBusinesses} />;
    case 'health': return <HealthPageV2 navigate={handleNavigate} />;
    case 'health-detail': return <HealthDetailV2 id={selectedBusinessId} navigate={handleNavigate} />;
    case 'legal-finance': return <LegalFinancePageV2 navigate={handleNavigate} />;
    case 'legal-finance-detail': {
      return <LegalFinanceDetail id={selectedBusinessId} navigate={handleNavigate} businesses={localBusinesses} />;
    }
    case 'services': return <ServicesPage navigate={handleNavigate} businesses={localBusinesses} />;
    case 'education': return <EducationPremium navigate={handleNavigate} businesses={localBusinesses} />;
    case 'education-detail': {
      const education = localBusinesses.find(e => e.id === selectedBusinessId);
      return education ? (
        <EducationDetail 
          institution={education} 
          navigate={handleNavigate} 
          businesses={localBusinesses}
        />
      ) : (
        <div className="flex items-center justify-center h-screen text-lg text-slate-600">
          Institution not found
        </div>
      );
    }
    case 'service-detail': {
      const service = localBusinesses.find(s => s.id === selectedBusinessId);
      return service ? (
        <ProfessionalServiceDetail 
          service={service} 
          navigate={handleNavigate} 
          favorites={favorites} 
          toggleFavorite={toggleFavorite} 
        />
      ) : (
        <NotFoundView navigate={handleNavigate} />
      );
    }
    case 'professional': return <TourismLandingPremium navigate={handleNavigate} />;
    case 'jobs': return <StaysPage navigate={handleNavigate} />;
    case 'stay-detail': {
      const stay = localBusinesses.find(s => s.id === selectedBusinessId);
      return stay ? <StayDetail business={stay as any} onClose={() => handleNavigate('stays')} /> : <NotFoundView navigate={handleNavigate} />;
    }
    case 'transport': return <TransportPagePremium navigate={handleNavigate} />;
    case 'transport-detail': return <TransportDetailPremium id={selectedBusinessId || ''} navigate={handleNavigate} />;
    case 'marketplace': return <MarketplaceUnified navigate={handleNavigate} selectedProductId={selectedBusinessId} cartItems={cartItems} onAddToCart={handleAddToCart} />;
    case 'marketplace-detail': return <MarketplaceUnified navigate={handleNavigate} selectedProductId={selectedBusinessId} cartItems={cartItems} onAddToCart={handleAddToCart} />;
    case 'add-product': return <SellOnMarketplaceView navigate={handleNavigate} />;
      case 'business-signup': return <BusinessSignupView navigate={handleNavigate} />;
      case 'events': return <EventsView favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'cars': return <CarsView navigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} onChat={handleChatSend} activeArea={activeArea} setActiveArea={setActiveArea} />;
    case 'business-detail': {
      // ===== CRITICAL FIX #4: Fallback for missing business data =====
      const biz = localBusinesses.find(b => b.id === selectedBusinessId);
      if (!biz) return <NotFoundView navigate={handleNavigate} />;
      return <BusinessDetailViewComprehensive businessId={selectedBusinessId || 'b1'} navigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} businesses={localBusinesses} />;
    }
    case 'seller-reputation': return <SellerReputationDashboard business={localBusinesses.find(b => b.id === selectedBusinessId)} navigate={handleNavigate} />;
    case 'rfq': return <RFQPage rfqs={requestsForQuoteData} quotes={quoteResponsesData} navigate={handleNavigate} />;
    case 'vip-itinerary': return <VIPItineraryPlanner businesses={localBusinesses} destinations={destinations} navigate={handleNavigate} />;
    case 'area-guides': return <AreaGuideLanding navigate={handleNavigate} />;
    case 'area-guide': return <AreaGuide areaName={selectedBusinessId || 'Nelspruit'} businesses={localBusinesses} destinations={destinations} />;
    case 'business-dashboard': return <BusinessDashboardView businessId={selectedBusinessId || undefined} enquiries={enquiries} bookings={bookings} setEnquiries={setEnquiries} setBookings={setBookings} businesses={localBusinesses} />;
    case 'lowveld-stories': return <StoriesTab navigate={handleNavigate} />;
    case 'story-detail': return <StoryDetailClean storyId={selectedBusinessId} navigate={handleNavigate} />;
      case 'creator-business': return <CreatorBusinessView navigate={handleNavigate} />;
      case 'about': return <AboutUsView />;
      case 'contact-us': return <ContactUsView />;
      case 'micro-tasks': return <MicroTasksView />;
      case 'seller-earnings': return <SellerEarningsView />;
      case 'rewards': return <RewardsView />;
      default: return <HomeView navigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} businesses={localBusinesses} activeArea={activeArea} setActiveArea={setActiveArea} />;
    }
  };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans">
            {/* First-Time Visitor Onboarding Hint */}
            {typeof window !== 'undefined' && !localStorage.getItem('lh_visited') && currentView === 'home' && (
              <div className="fixed top-24 left-4 z-40 animate-fade-in">
                <div className="bg-gold-500 text-black px-4 py-3 rounded-lg shadow-lg border border-gold-600 max-w-xs">
                  <p className="text-sm font-semibold">Welcome to LowveldHub! 👋</p>
                  <p className="text-xs text-black/80 mt-1">Discover premium businesses across Mpumalanga. Use filters or our AI Concierge to find exactly what you need.</p>
                  <button 
                    onClick={() => localStorage.setItem('lh_visited', 'true')}
                    className="mt-2 text-xs underline font-bold hover:opacity-80"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/5">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('home')}>
                                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center font-serif font-bold text-black">
                                  LH
                                </div>
                                <h1 className="text-base font-serif tracking-wide uppercase">LOWVELD<span className="text-gold-500">HUB</span></h1>
                        </div>
            
                        {/* Desktop Navigation */}
                        <div className="hidden xl:flex items-center gap-6">
                            {navItems.map(item => (
                                <button 
                                    key={item.id} 
                                    onClick={() => handleNavigate(item.id)} 
                                    className={`text-xs uppercase relative group pb-1 ${currentView === item.id ? 'text-gold-500' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {item.label}
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${currentView === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </button>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                                {/* Dark Mode Toggle */}
                                <button 
                                  onClick={() => { 
                                    const isDark = document.documentElement.classList.toggle('light-mode');
                                    localStorage.setItem('lh-dark-mode', isDark ? 'false' : 'true');
                                  }} 
                                  className="p-2 rounded-lg hover:bg-white/10 transition-colors" 
                                  title="Toggle dark mode"
                                >
                                  <Sun size={18} className="hidden light-mode:block text-gold-400" />
                                  <Moon size={18} className="light-mode:hidden text-gray-400" />
                                </button>

                                {/* Auth Buttons */}
                                {isAuthenticated ? (
                                  <>
                                    <button onClick={() => handleNavigate('dashboard')} className="hidden md:block text-xs uppercase text-white hover:text-gold-400 transition-colors">Account</button>
                                    <button onClick={handleLogout} className="hidden md:block text-xs uppercase text-red-400">Logout</button>
                                  </>
                                ) : (
                                  <>
                                    <button onClick={() => handleNavigate('login')} className="hidden md:block text-xs uppercase text-white hover:text-gold-400 transition-colors">Login</button>
                                  </>
                                )}

                                {/* Add Business CTA */}
                                <button 
                                  onClick={() => handleNavigate('list-your-business')} 
                                  className="hidden md:block text-xs uppercase text-black bg-gold-500 px-4 py-2 rounded hover:bg-gold-600 transition-colors font-bold"
                                >
                                  + List Business
                                </button>

                                {/* Mobile Menu Toggle */}
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden"><Menu size={20} /></button>
                        </div>
                </div>
            </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col p-4 md:hidden pt-20">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-serif text-white uppercase">LOWVELDHUB</h2>
              <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
           </div>
           <div className="flex flex-col gap-3">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { handleNavigate(item.id); setIsMenuOpen(false); }} className="text-lg text-white text-left">{item.label}</button>
              ))}
              <div className="h-[1px] bg-white/10 my-3"></div>
              {isAuthenticated ? (
                <>
                  <button onClick={() => { handleNavigate('dashboard'); setIsMenuOpen(false); }} className="text-white text-left">Account</button>
                  <button onClick={handleLogout} className="text-red-400">Logout</button>
                </>
              ) : (
                <button onClick={() => { handleNavigate('login'); setIsMenuOpen(false); }} className="text-white text-left">Login</button>
              )}
              <button onClick={() => { handleNavigate('list-your-business'); setIsMenuOpen(false); }} className="text-black bg-white px-4 py-2 rounded text-center font-bold mt-2">+ List Business</button>
           </div>
        </div>
      )}

      <main>{renderView()}</main>
            {/* Slide-over panel for Enquiry / Booking */}
            {isPanelOpen && panelBusinessId && (
                <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-end md:justify-end">
                    <div className="absolute inset-0 bg-black/50" onClick={() => closePanel()} />
                    <div className={`relative w-full md:w-[420px] bg-[#070707] border-l border-white/5 p-6 rounded-t-xl md:rounded-l-xl md:rounded-tr-none`}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="text-sm text-gray-400">{panelMode === 'booking' ? 'Booking Request' : 'Send Enquiry'}</div>
                                <div className="text-lg font-serif text-white">{localBusinesses.find(b => b.id === panelBusinessId)?.name}</div>
                            </div>
                            <button onClick={() => closePanel()} className="text-white/60 p-2">Close</button>
                        </div>
                        {!panelSuccess ? (
                            <div>
                                <div className="space-y-3">
                                    <input value={panelName} onChange={(e) => setPanelName(e.target.value)} placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                    <input value={panelContact} onChange={(e) => setPanelContact(e.target.value)} placeholder="Phone or Email" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                    <textarea value={panelMessage} onChange={(e) => setPanelMessage(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" rows={4} />
                                </div>
                                <div className="mt-4">
                                    <button onClick={() => { if (panelBusinessId) { sendEnquiry({ businessId: panelBusinessId, name: panelName, contact: panelContact, message: panelMessage }); setPanelSuccess(true); } }} className="w-full py-3 bg-gold-500 text-black rounded-lg font-semibold">Send Enquiry</button>
                                </div>
                                <div className="mt-3 text-xs text-gray-400">Your details are protected. LowveldHub buyer protection applies. Verified businesses only.</div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-2xl font-semibold text-white mb-2">Request sent</div>
                                <div className="text-sm text-gray-300 mb-4">The business has been notified. Expect a response within 24 hours.</div>
                                <button onClick={() => { closePanel(); }} className="px-4 py-2 bg-white/5 rounded">Done</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Footer navigate={handleNavigate} onLogin={() => handleOpenAuth('login')} />
      
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)} 
            className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
          >
            <Sparkles className="text-black group-hover:animate-pulse" size={28} />
          </button>
        ) : (
            <div className="w-80 md:w-96 h-[500px] bg-black/90 backdrop-blur-xl border border-gold-500/30 rounded-2xl flex flex-col overflow-hidden animate-slide-up shadow-2xl">
                <div className="bg-gold-500 p-4 flex justify-between items-center"><h3 className="font-serif font-bold text-black flex items-center gap-2"><Sparkles size={18} /> Lowveld AI</h3><button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-black/10 rounded"><X size={20} /></button></div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-gold-500/10 text-white border border-gold-500/20' : 'bg-white/5 text-gray-200 border border-white/10'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/10 flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()} 
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-gold-500 transition-colors" 
                    placeholder="Ask AI..." 
                  />
                  <button onClick={() => handleChatSend()} className="bg-gold-500 text-black p-2.5 rounded-lg hover:bg-white transition-colors shadow-lg"><Send size={18} /></button>
                </div>
            </div>
        )}
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialMode={authMode} />
    </div>
  );
}

export default function AppWithErrorBoundary() {
  // ===== ADMIN ROUTING: Check if we should render AdminApp based on current path =====
  const [renderingAdmin, setRenderingAdmin] = React.useState(false);
  
  React.useEffect(() => {
    const path = window.location.pathname;
    setRenderingAdmin(path.startsWith('/admin'));
  }, []);
  
  // If rendering admin app, return it directly
  if (renderingAdmin) {
    return (
      <ErrorBoundary>
        <AdminApp />
      </ErrorBoundary>
    );
  }
  
  // Otherwise render main app
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

