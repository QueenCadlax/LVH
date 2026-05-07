import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, CheckCircle, ChevronRight, Filter } from 'lucide-react';
import { Business, Category, ListingTier, MPUMALANGA_AREAS } from '../types';

interface EducationPremiumProps {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  businesses: Business[];
}

const EducationPremium: React.FC<EducationPremiumProps> = ({ navigate, businesses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState('All Types');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Institution types for filtering (moved to filter sidebar)
  const institutionTypes = [
    'All Types',
    'Private Schools',
    'Public Schools',
    'Universities',
    'Colleges & TVETs',
    'Early Childhood Dev.',
    'Training & Skills',
    'Driving Schools',
    'Online Learning',
  ];

  // Get all education institutions
  const allInstitutions = useMemo(() =>
    businesses.filter(b => b.category === Category.EducationAndSkills),
    [businesses]
  );

  // Filter institutions
  const filteredInstitutions = useMemo(() => {
    return allInstitutions.filter(institution => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institution.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType =
        activeTypeFilter === 'All Types' || 
        institution.description?.toLowerCase().includes(activeTypeFilter.toLowerCase()) ||
        institution.name.toLowerCase().includes(activeTypeFilter.toLowerCase());

      // Location filter
      const matchesLocation =
        selectedLocation === 'All Areas' || institution.location.includes(selectedLocation);

      // Verified filter
      const matchesVerified = !showOnlyVerified || institution.tier === ListingTier.Elite || institution.tier === ListingTier.Platinum;

      return matchesSearch && matchesType && matchesLocation && matchesVerified;
    });
  }, [allInstitutions, searchQuery, activeTypeFilter, selectedLocation, showOnlyVerified]);

  // Top featured institutions (highest rated)
  const featuredInstitutions = useMemo(() =>
    [...filteredInstitutions]
      .filter(i => i.tier === ListingTier.Elite || i.tier === ListingTier.Platinum)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4),
    [filteredInstitutions]
  );

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuickFilter = (type: string) => {
    setActiveTypeFilter(type);
  };

  const handleReset = () => {
    setSearchQuery('');
    setActiveTypeFilter('All Types');
    setSelectedLocation('All Areas');
    setShowOnlyVerified(false);
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-16">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-black border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
              <span className="text-yellow-400">Find Trusted Education Institutions</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Explore verified schools, colleges, and training centres across Mpumalanga.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search schools, colleges, universities…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED INSTITUTIONS ===== */}
      {featuredInstitutions.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 py-16">
          <div className="mb-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              Top Rated Institutions
            </h2>
            <p className="text-slate-400">Verified and highly-rated education providers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInstitutions.map((institution) => (
              <div
                key={institution.id}
                className="bg-black/60 border border-yellow-400/30 rounded-lg overflow-hidden hover:border-yellow-400/80 hover:shadow-lg hover:shadow-yellow-400/30 transition-all cursor-pointer group"
                onClick={() => navigate('education-detail', Category.EducationAndSkills, institution.id)}
              >
                {/* Image */}
                <div className="h-40 bg-gradient-to-br from-yellow-600/10 to-black overflow-hidden relative">
                  {institution.image && (
                    <img
                      src={institution.image}
                      alt={institution.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {(institution.tier === ListingTier.Elite || institution.tier === ListingTier.Platinum) && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verified
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors mb-1">
                    {institution.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{institution.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-white">{institution.rating || 'N/A'}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('education-detail', Category.EducationAndSkills, institution.id);
                      }}
                      className="text-yellow-400 hover:text-yellow-300 font-medium text-sm flex items-center gap-1"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== EDUCATION CATEGORIES GRID REMOVED ===== */}

      {/* ===== FULL DIRECTORY SECTION ===== */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full mb-4 py-3 px-4 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Filters Container */}
            <div
              className={`${
                showMobileFilters ? 'block' : 'hidden'
              } lg:block bg-black/60 border border-white/10 rounded-lg p-6 sticky top-24 h-fit`}
            >
              <h3 className="font-bold text-white text-lg mb-6">Filters</h3>

              {/* Institution Type Filter */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
                  Institution Type
                </label>
                <select
                  value={activeTypeFilter}
                  onChange={(e) => setActiveTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 rounded-lg bg-black/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                >
                  {institutionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 rounded-lg bg-black/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                >
                  {['All Areas', ...MPUMALANGA_AREAS].map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verified Only Toggle */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyVerified}
                    onChange={(e) => setShowOnlyVerified(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 text-yellow-400"
                  />
                  <span className="text-sm font-medium text-gray-300">Verified Only</span>
                </label>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full py-2 px-4 border border-white/10 text-gray-300 font-medium rounded-lg hover:bg-white/5 transition-colors"
              >
                Reset All Filters
              </button>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  Found <span className="font-bold text-white">{filteredInstitutions.length}</span> institutions
                </p>
              </div>
            </div>
          </div>

          {/* Directory Grid */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-1">
                All Institutions
              </h2>
              <p className="text-slate-400">4 featured institutions</p>
            </div>

            {filteredInstitutions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredInstitutions.slice(0, 4).map((institution) => (
                  <div
                    key={institution.id}
                    className="bg-black/60 border border-yellow-400/30 rounded-lg overflow-hidden hover:border-yellow-400/80 hover:shadow-lg hover:shadow-yellow-400/30 transition-all cursor-pointer group"
                    onClick={() => navigate('education-detail', Category.EducationAndSkills, institution.id)}
                  >
                    {/* Image */}
                    <div className="h-32 bg-gradient-to-br from-yellow-600/10 to-black relative overflow-hidden">
                      {institution.image && (
                        <img
                          src={institution.image}
                          alt={institution.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      {(institution.tier === ListingTier.Elite || institution.tier === ListingTier.Platinum) && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors mb-2">
                        {institution.name}
                      </h3>

                      <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{institution.location}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-white text-sm">{institution.rating || 'N/A'}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('education-detail', Category.EducationAndSkills, institution.id);
                          }}
                          className="text-yellow-400 hover:text-yellow-300 font-medium text-xs"
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-black/50 rounded-lg border border-white/10">
                <div className="text-gray-500 mb-4 text-5xl">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No Institutions Found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== LIST YOUR INSTITUTION CTA ===== */}
      <section className="bg-black/80 border-t border-white/10 text-white py-16 mt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              List Your <span className="text-yellow-400">Institution</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join LowveldHub and connect with parents and students across Mpumalanga.
            </p>
            <button
              onClick={() => navigate('list-business')}
              className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
            >
              Apply for Listing <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationPremium;
