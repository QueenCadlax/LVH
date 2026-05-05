import React, { useState, useMemo } from 'react';
import { MapPin, Filter, Search, Grid, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Category, CategorySubcategories, MPUMALANGA_AREAS, Business, ListingTier } from '../types';
import { Sparkles } from 'lucide-react';
import { LuxuryCard } from './Shared';

interface CategoryGridDirectoryProps {
  businesses: Business[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  navigate: (view: string, category?: string, id?: string, subcategory?: string) => void;
}

// Category metadata for icons & display
const CATEGORY_METADATA: Record<Category, { icon: string; color: string; description: string }> = {
  [Category.FoodAndHospitality]: { icon: '🍽️', color: 'from-orange-500 to-red-500', description: 'Restaurants & Dining' },
  [Category.TourismTravelAndStays]: { icon: '✈️', color: 'from-blue-500 to-cyan-500', description: 'Travel & Accommodation' },
  [Category.LuxuryAndLifestyle]: { icon: '💎', color: 'from-purple-500 to-pink-500', description: 'Luxury Experiences' },
  [Category.NightlifeAndEntertainment]: { icon: '🎭', color: 'from-indigo-500 to-purple-500', description: 'Entertainment' },
  [Category.BeautyWellnessPersonalCare]: { icon: '💆', color: 'from-pink-500 to-rose-500', description: 'Beauty & Wellness' },
  [Category.HealthAndMedical]: { icon: '⚕️', color: 'from-green-500 to-emerald-500', description: 'Medical Services' },
  [Category.PetsAndVeterinary]: { icon: '🐾', color: 'from-yellow-500 to-amber-500', description: 'Pets & Animals' },
  [Category.RealEstateAndProperty]: { icon: '🏠', color: 'from-amber-600 to-yellow-500', description: 'Real Estate' },
  [Category.Automotive]: { icon: '🚗', color: 'from-gray-600 to-gray-700', description: 'Automotive' },
  [Category.TransportAndLogistics]: { icon: '🚚', color: 'from-blue-600 to-blue-700', description: 'Transport' },
  [Category.HomeConstructionAndTrades]: { icon: '🔨', color: 'from-orange-600 to-amber-600', description: 'Construction' },
  [Category.ShoppingAndRetail]: { icon: '🛍️', color: 'from-red-500 to-pink-500', description: 'Retail & Shopping' },
  [Category.BusinessAndProfessional]: { icon: '💼', color: 'from-slate-600 to-slate-700', description: 'Business & Law' },
  [Category.FinancialServices]: { icon: '💰', color: 'from-green-600 to-emerald-600', description: 'Financial Services' },
  [Category.EducationAndSkills]: { icon: '📚', color: 'from-indigo-600 to-blue-600', description: 'Education' },
  [Category.ITMediaAndCreative]: { icon: '💻', color: 'from-cyan-600 to-blue-600', description: 'Tech & Media' },
  [Category.AgricultureAndIndustry]: { icon: '🌾', color: 'from-green-700 to-emerald-700', description: 'Agriculture' },
  [Category.CommunityAndOrganisations]: { icon: '👥', color: 'from-blue-500 to-blue-600', description: 'Community' },
  [Category.GovernmentAndPublicServices]: { icon: '🏛️', color: 'from-slate-600 to-slate-800', description: 'Government' },
  [Category.EventsAndWeddings]: { icon: '🎉', color: 'from-pink-500 to-purple-500', description: 'Events & Weddings' },
  [Category.SportsFitnessAndRecreation]: { icon: '⚽', color: 'from-orange-500 to-yellow-500', description: 'Sports & Fitness' },
  [Category.SecuritySafetyAndProtection]: { icon: '🛡️', color: 'from-red-600 to-red-700', description: 'Security' },
  [Category.EnergyUtilitiesAndGreenSolutions]: { icon: '⚡', color: 'from-yellow-600 to-yellow-700', description: 'Energy & Green' },
  [Category.RecruitmentAndStaffing]: { icon: '👔', color: 'from-blue-600 to-indigo-600', description: 'Recruitment' },
  [Category.DomesticAndPersonalServices]: { icon: '🏠', color: 'from-amber-500 to-orange-500', description: 'Domestic Services' },
  [Category.ConvenienceAndDailyNeeds]: { icon: '🏪', color: 'from-purple-500 to-pink-500', description: 'Daily Needs' },
  [Category.WomenHealthAndMaternal]: { icon: '👩‍⚕️', color: 'from-red-500 to-pink-500', description: 'Women\'s Health' },
  [Category.JobsAndCareers]: { icon: '💼', color: 'from-indigo-600 to-blue-600', description: 'Jobs & Careers' }
};

export const CategoryGridDirectory: React.FC<CategoryGridDirectoryProps> = ({
  businesses,
  favorites,
  toggleFavorite,
  navigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Changed to show all items at once (no pagination)
  const ITEMS_PER_PAGE = 10000;

  // Smart search suggestions
  const searchSuggestions = [
    { text: 'Best Fine Dining Near You', icon: '🍽️' },
    { text: 'Top-Rated Spas & Wellness', icon: '💆' },
    { text: 'Luxury Chauffeurs & Transport', icon: '🚗' },
    { text: 'Premium Real Estate Agents', icon: '🏠' },
    { text: 'Verified Medical Specialists', icon: '⚕️' },
    { text: 'Exclusive Event Venues', icon: '🎉' }
  ];

  // Get business count per area
  const areaBusinessCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Areas': businesses.length };
    MPUMALANGA_AREAS.forEach(area => {
      counts[area] = businesses.filter(b => b.location.includes(area)).length;
    });
    return counts;
  }, [businesses]);

  // Detect scroll for sticky search
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter businesses based on all criteria
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      if (selectedCategory && b.category !== selectedCategory) return false;
      if (selectedSubcategory && b.subcategory !== selectedSubcategory) return false;
      if (selectedArea !== 'All Areas' && !b.location.includes(selectedArea)) return false;
      if (verifiedOnly && b.tier === 'Trial') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return b.name.toLowerCase().includes(q) || b.description?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [businesses, selectedCategory, selectedSubcategory, selectedArea, verifiedOnly, searchQuery]);

  // Get subcategories for selected category
  const subcategories = selectedCategory ? CategorySubcategories[selectedCategory] : [];

  // All categories for grid
  const allCategories = Object.values(Category);

  // Pagination
  const totalPages = Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE);
  const paginatedBusinesses = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBusinesses.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredBusinesses, currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Discover Mpumalanga's Elite Network</h1>
          <p className="text-amber-100 text-lg mb-6">
            Find verified luxury businesses instantly. Premium access to the Lowveld's best.
          </p>
          
          {/* Social Proof Metrics */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold">{businesses.length}+</p>
              <p className="text-amber-100 text-sm">Verified Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.8★</p>
              <p className="text-amber-100 text-sm">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-amber-100 text-sm">Positive Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Search Bar (Mobile) */}
      {isScrolled && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-lg z-40 md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search businesses..."
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & Quick Filters */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            {/* Smart Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                placeholder="Try: Fine Dining, Luxury Chauffeurs, Top Spas..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && !searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <p className="px-4 pt-3 text-xs uppercase text-gray-500 font-semibold">Popular Searches</p>
                  {searchSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(suggestion.text);
                        setShowSearchSuggestions(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-amber-50 flex items-center gap-3 text-gray-700 transition border-t border-gray-100"
                    >
                      <span className="text-xl">{suggestion.icon}</span>
                      <span className="text-sm">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Search CTA Button */}
            <button
              onClick={() => navigate('concierge')}
              className="px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span className="text-lg">✨</span>
              AI Search
            </button>
          </div>

          {/* Area Filter Pills */}
          <div className="border-b pb-4 mb-4">
            <p className="text-xs uppercase text-gray-500 font-semibold mb-3">Filter by Area</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedArea('All Areas')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedArea === 'All Areas'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Areas ({areaBusinessCounts['All Areas']})
              </button>
              {MPUMALANGA_AREAS.slice(0, 5).map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedArea === area
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {area} ({areaBusinessCounts[area]})
                </button>
              ))}
            </div>
          </div>

          {/* Filter Button & Toggle Filters */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter size={18} /> Filters {showFilters ? '−' : '+'}
            </button>

            {selectedArea !== 'All Areas' && (
              <button
                onClick={() => setSelectedArea('All Areas')}
                className="px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 rounded-lg text-sm font-bold flex items-center gap-2 border border-amber-300 shadow-sm"
              >
                <MapPin size={16} /> {selectedArea} <span className="ml-1 cursor-pointer">✕</span>
              </button>
            )}

            {selectedCategory && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium"
              >
                {CATEGORY_METADATA[selectedCategory].description} ✕
              </button>
            )}

            {selectedSubcategory && (
              <button
                onClick={() => setSelectedSubcategory(null)}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
              >
                {selectedSubcategory} ✕
              </button>
            )}

            {verifiedOnly && (
              <button
                onClick={() => setVerifiedOnly(false)}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium"
              >
                Verified Only ✕
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option>All Areas</option>
                  {MPUMALANGA_AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Trust Level</label>
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                    verifiedOnly
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ✓ Verified & Premium Only
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Results</label>
                <p className="px-4 py-2 text-lg font-bold text-amber-700">
                  {filteredBusinesses.length} found
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Trust & Verification Section */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-gray-200">
          <div className="text-center">
            <div className="text-4xl mb-3 flex justify-center">🔐</div>
            <h3 className="font-bold text-gray-900 mb-2">Bank-Level Verification</h3>
            <p className="text-sm text-gray-600">Background checks, business registration verification, and compliance audits</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3 flex justify-center">⭐</div>
            <h3 className="font-bold text-gray-900 mb-2">Quality Ratings</h3>
            <p className="text-sm text-gray-600">Only 4.5+ rated listings shown. Curated for excellence and customer satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3 flex justify-center">🏆</div>
            <h3 className="font-bold text-gray-900 mb-2">Premium Badge System</h3>
            <p className="text-sm text-gray-600">Verified → Premium → Elite → Platinum. Know the tier of every business at a glance</p>
          </div>
        </div>

        {/* Category Grid (Always Visible) */}
        {!selectedCategory ? (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Premium Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {allCategories.map(cat => {
                const meta = CATEGORY_METADATA[cat];
                const count = businesses.filter(b => b.category === cat).length;
                const eliteCount = businesses.filter(b => b.category === cat && (b.tier === ListingTier.Elite || b.tier === ListingTier.Platinum)).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="p-4 rounded-2xl border border-gray-200/80 bg-white transition-all duration-300 text-left group overflow-hidden hover:border-amber-300 hover:-translate-y-1 hover:shadow-lg hover:bg-amber-50/30"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{meta.icon}</div>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-amber-700 transition-colors">{meta.description}</h3>
                    <p className="text-xs text-gray-500 mt-2">{count} verified</p>
                    
                    {/* Quick Elite Badge */}
                    {eliteCount > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 px-2 py-1 rounded-full font-semibold">👑 {eliteCount} Elite</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mb-12">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
              }}
              className="mb-6 text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-2"
            >
              ← Back to Categories
            </button>

            {/* Subcategory Filter (if selected category) */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {CATEGORY_METADATA[selectedCategory].icon} {CATEGORY_METADATA[selectedCategory].description}
              </h2>
              
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    !selectedSubcategory
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({businesses.filter(b => b.category === selectedCategory).length})
                </button>
                {subcategories.map(sub => {
                  const subCount = businesses.filter(
                    b => b.category === selectedCategory && b.subcategory === sub
                  ).length;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedSubcategory === sub
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {sub} ({subCount})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory
                  ? `${CATEGORY_METADATA[selectedCategory].description}`
                  : '✨ Featured Services'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{filteredBusinesses.length} results • Verified & Premium only</p>
            </div>
          </div>

          {filteredBusinesses.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
              <p className="text-gray-600 font-medium text-lg">No services match your filters</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or selecting a different category</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {paginatedBusinesses.map(business => (
                  <LuxuryCard
                    key={business.id}
                    id={business.id}
                    title={business.name}
                    image={business.image}
                    rating={business.rating}
                    reviewCount={business.reviewCount}
                    location={business.location}
                    isFavorite={favorites.includes(business.id)}
                    onToggleFavorite={() => toggleFavorite(business.id)}
                    onPress={() => navigate('business-detail', business.category, business.id)}
                    isPlatinum={business.tier === ListingTier.Platinum}
                    isElite={business.tier === ListingTier.Elite}
                    trustBadges={business.trustStack?.badges || []}
                    compact={true}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
