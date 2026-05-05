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

  const allInstitutions = useMemo(() =>
    businesses.filter(b => b.category === Category.EducationAndSkills),
    [businesses]
  );

  const filteredInstitutions = useMemo(() => {
    return allInstitutions.filter(institution => {
      const matchesSearch =
        searchQuery === '' ||
        institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institution.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        activeTypeFilter === 'All Types' || 
        institution.description?.toLowerCase().includes(activeTypeFilter.toLowerCase()) ||
        institution.name.toLowerCase().includes(activeTypeFilter.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All Areas' || institution.location.includes(selectedLocation);

      const matchesVerified = !showOnlyVerified || institution.tier === ListingTier.Elite || institution.tier === ListingTier.Platinum;

      return matchesSearch && matchesType && matchesLocation && matchesVerified;
    });
  }, [allInstitutions, searchQuery, activeTypeFilter, selectedLocation, showOnlyVerified]);

  const featuredInstitutions = useMemo(() =>
    [...filteredInstitutions]
      .filter(i => i.tier === ListingTier.Elite || i.tier === ListingTier.Platinum)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4),
    [filteredInstitutions]
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReset = () => {
    setSearchQuery('');
    setActiveTypeFilter('All Types');
    setSelectedLocation('All Areas');
    setShowOnlyVerified(false);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* Floating Search */}
        <div className="relative max-w-4xl mx-auto mb-6">
          <div className="absolute inset-x-0 -top-10 flex justify-center">
            <div className="w-full max-w-3xl bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 flex items-center gap-3 shadow-lg">
              <Search className="text-gray-300" />
              <input 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search institutions, courses, types..." 
                className="bg-transparent outline-none flex-1 text-gray-200 placeholder-gray-500" 
              />
            </div>
          </div>
        </div>

        {/* Page Title with Gold Accent */}
        <div className="max-w-4xl mx-auto text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            <span className="text-yellow-400">Education</span>
          </h2>
          <p className="text-gray-300 mt-2">Discover trusted schools, colleges, and training institutions across Mpumalanga.</p>
          <div className="mt-4 flex justify-center gap-2">
            <button className="text-sm bg-black/60 px-3 py-1 rounded-full text-gray-200 hover:bg-yellow-500/20 transition">Top Rated</button>
            <button className="text-sm bg-black/60 px-3 py-1 rounded-full text-gray-200 hover:bg-yellow-500/20 transition">Verified</button>
            <button className="text-sm bg-black/60 px-3 py-1 rounded-full text-gray-200 hover:bg-yellow-500/20 transition">New Listings</button>
          </div>
        </div>

        {/* Primary Filter Bar - pill style (matching Eats page) */}
        <div className="container mx-auto px-6 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`px-4 py-2 rounded-full shadow-sm ${activeTypeFilter !== 'All Types' ? 'bg-yellow-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Type: {activeTypeFilter !== 'All Types' ? activeTypeFilter : 'All'}
              </button>
            </div>

            <div className="relative">
              <button 
                onClick={() => {}}
                className={`px-4 py-2 rounded-full shadow-sm ${selectedLocation !== 'All Areas' ? 'bg-yellow-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Area: {selectedLocation !== 'All Areas' ? selectedLocation : 'All Mpumalanga'}
              </button>
            </div>

            <div className="flex-1" />

            <button 
              onClick={handleReset}
              className="px-3 py-2 rounded-full text-sm text-gray-300 hover:text-white transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Featured Section - 4 columns */}
        {featuredInstitutions.length > 0 && (
          <div className="mb-16">
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold text-white">Top Rated Institutions</h3>
              <p className="text-gray-400">Verified and highly-rated providers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredInstitutions.map((institution) => (
                <div
                  key={institution.id}
                  className="bg-black/60 border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20 transition-all cursor-pointer group"
                  onClick={() => navigate('education-detail', Category.EducationAndSkills, institution.id)}
                >
                  <div className="h-40 bg-gradient-to-br from-yellow-600/20 to-black overflow-hidden relative">
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

                  <div className="p-4">
                    <h4 className="font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors mb-2">
                      {institution.name}
                    </h4>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
                      <MapPin className="w-4 h-4" />
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
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Directory - 4 columns on desktop */}
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-serif font-bold text-white">All Institutions</h3>
            <p className="text-gray-400">{filteredInstitutions.length} results</p>
          </div>

          {filteredInstitutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredInstitutions.slice(0, 4).map((institution) => (
                <div
                  key={institution.id}
                  className="bg-black/60 border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/20 transition-all cursor-pointer group"
                  onClick={() => navigate('education-detail', Category.EducationAndSkills, institution.id)}
                >
                  <div className="h-32 bg-gradient-to-br from-yellow-600/20 to-black relative overflow-hidden">
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

                  <div className="p-4">
                    <h4 className="font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors mb-2">
                      {institution.name}
                    </h4>

                    <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{institution.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-white text-xs">{institution.rating || 'N/A'}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('education-detail', Category.EducationAndSkills, institution.id);
                        }}
                        className="text-yellow-400 hover:text-yellow-300 font-medium text-xs"
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-black/60 rounded-lg border border-white/10">
              <p className="text-gray-400 mb-2">No institutions found matching your criteria.</p>
              <button
                onClick={handleReset}
                className="text-yellow-400 hover:text-yellow-300 font-medium text-sm"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Filter Sidebar Modal (mobile) */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 flex items-end lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileFilters(false)} />
            <div className="relative w-full max-h-[70vh] bg-black/95 border-t border-white/10 rounded-t-2xl p-6 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-white font-semibold">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="text-gray-300">Close</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 block mb-2">Institution Type</label>
                  <select
                    value={activeTypeFilter}
                    onChange={(e) => {
                      setActiveTypeFilter(e.target.value);
                      setShowMobileFilters(false);
                    }}
                    className="w-full px-3 py-2 bg-black/80 border border-white/10 rounded-lg text-white text-sm"
                  >
                    {institutionTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 block mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setShowMobileFilters(false);
                    }}
                    className="w-full px-3 py-2 bg-black/80 border border-white/10 rounded-lg text-white text-sm"
                  >
                    {['All Areas', ...MPUMALANGA_AREAS].map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-200">
                    <input
                      type="checkbox"
                      checked={showOnlyVerified}
                      onChange={(e) => setShowOnlyVerified(e.target.checked)}
                    />
                    Verified Only
                  </label>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                  <button onClick={handleReset} className="px-4 py-2 rounded bg-black/40 text-gray-300">Clear All</button>
                  <button onClick={() => setShowMobileFilters(false)} className="px-4 py-2 rounded bg-yellow-500 text-black font-semibold">Apply</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationPremium;
