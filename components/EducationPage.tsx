import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { Business, Category, ListingTier, MPUMALANGA_AREAS } from '../types';

interface EducationPageProps {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  businesses: Business[];
}

const EducationPage: React.FC<EducationPageProps> = ({ navigate, businesses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEducationType, setSelectedEducationType] = useState('All Institutions');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Education types for filtering
  const educationTypes = [
    'All Institutions',
    'Schools',
    'Colleges',
    'Universities',
    'Technical Training',
    'Skill Development',
    'Online Learning',
    'Tutoring Services',
    'Test Preparation',
    'Language Training',
  ];

  // Get all education institutions
  const allInstitutions = useMemo(() =>
    businesses.filter(b => b.category === Category.EducationAndSkills),
    [businesses]
  );

  // Filter institutions based on all criteria
  const filteredInstitutions = useMemo(() => {
    return allInstitutions.filter(institution => {
      const matchesSearch =
        searchQuery === '' ||
        institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        institution.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEducationType =
        selectedEducationType === 'All Institutions' ||
        institution.description?.includes(selectedEducationType) ||
        institution.name.toLowerCase().includes(selectedEducationType.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All Areas' || institution.location.includes(selectedLocation);

      return matchesSearch && matchesEducationType && matchesLocation;
    });
  }, [allInstitutions, searchQuery, selectedEducationType, selectedLocation]);

  // Top rated from filtered results
  const topRated = useMemo(() =>
    [...filteredInstitutions].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6),
    [filteredInstitutions]
  );

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* HERO SECTION */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2">Quality Education Institutions</h1>
          <p className="text-gray-300 text-sm mb-6">Schools, universities, colleges, training centers & skill development programs across Mpumalanga</p>

          {/* SEARCH BAR */}
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search schools, universities, courses…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 text-gray-200 placeholder-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
            />
          </div>
        </div>

        {/* MAIN CONTENT - Filter + Results */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTER SIDEBAR */}
          <div className="lg:col-span-1">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="lg:hidden w-full mb-4 py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-white font-semibold hover:bg-white/10 transition-colors"
            >
              {showMobileFilter ? '✕ Close Filters' : '⊕ Show Filters'}
            </button>

            {/* Filter Container */}
            <div
              className={`${
                showMobileFilter ? 'block' : 'hidden'
              } lg:block bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24 h-fit`}
            >
              <h3 className="text-white font-bold text-lg mb-6">Filters</h3>

              {/* Institution Type Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">
                  Institution Type
                </label>
                <select
                  value={selectedEducationType}
                  onChange={(e) => setSelectedEducationType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  {educationTypes.map((type) => (
                    <option key={type} value={type} className="bg-slate-900">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  {MPUMALANGA_AREAS.map((area) => (
                    <option key={area} value={area} className="bg-slate-900">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedEducationType('All Institutions');
                  setSelectedLocation('All Areas');
                }}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors border border-white/20"
              >
                Reset Filters
              </button>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  Found <span className="text-white font-bold">{filteredInstitutions.length}</span> institutions
                </p>
              </div>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            {/* TOP RATED SECTION */}
            {topRated.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Top Rated Institutions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topRated.slice(0, 4).map((institution) => (
                    <div
                      key={institution.id}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-gold-400/50 transition-all hover:shadow-lg hover:shadow-gold-400/10 cursor-pointer group"
                      onClick={() => navigate('education-detail', Category.EducationAndSkills, institution.id)}
                    >
                      {/* Image */}
                      <div className="h-32 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
                        {institution.image && (
                          <img
                            src={institution.image}
                            alt={institution.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                        {institution.tier === ListingTier.Elite && (
                          <div className="absolute top-2 right-2 bg-gold-400/90 text-black px-2 py-1 rounded-full text-xs font-bold">
                            ⭐ ELITE
                          </div>
                        )}
                        {institution.tier === ListingTier.Platinum && (
                          <div className="absolute top-2 right-2 bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ★ PLATINUM
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <h3 className="text-sm font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-2">
                          {institution.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gold-400 mt-1 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{institution.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                            <span className="text-xs text-white font-semibold">{institution.rating || 'N/A'}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gold-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ALL INSTITUTIONS SECTION */}
            {filteredInstitutions.length > 0 ? (
              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-6">
                  All Institutions ({filteredInstitutions.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredInstitutions.map((institution) => (
                    <div
                      key={institution.id}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-gold-400/50 transition-all hover:shadow-lg hover:shadow-gold-400/10 cursor-pointer group"
                      onClick={() => navigate('education-detail', Category.EducationAndSkills, institution.id)}
                    >
                      {/* Image */}
                      <div className="h-40 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
                        {institution.image && (
                          <img
                            src={institution.image}
                            alt={institution.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                        {(institution.tier === ListingTier.Elite || institution.tier === ListingTier.Platinum) && (
                          <div className="absolute top-3 right-3 bg-gold-400/90 text-black px-2.5 py-1.5 rounded-full text-xs font-bold">
                            ⭐ {institution.tier === ListingTier.Platinum ? 'PLATINUM' : 'ELITE'}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-2 mb-2">
                          {institution.name}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2 mb-3">{institution.description || 'Quality education provider'}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                            <span className="text-xs text-white font-semibold">{institution.rating || 'N/A'}</span>
                            {institution.reviewCount && (
                              <span className="text-xs text-gray-400">({institution.reviewCount})</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gold-400">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{institution.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Institutions Found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters to find educational institutions</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedEducationType('All Institutions');
                    setSelectedLocation('All Areas');
                  }}
                  className="px-6 py-2 bg-gold-400 text-black font-semibold rounded-lg hover:bg-gold-300 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
