import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, CheckCircle, Phone, MessageSquare, ChevronRight, X } from 'lucide-react';
import { Business, Category, ListingTier, MPUMALANGA_AREAS } from '../types';

interface ServicesPageProps {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
  businesses: Business[];
}

const ServicesPage: React.FC<ServicesPageProps> = ({ navigate, businesses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('All Services');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Service types for filtering
  const serviceTypes = [
    'All Services',
    'Electricians',
    'Plumbers',
    'Builders / Contractors',
    'Painters',
    'Cleaning Services',
    'Security Services',
    'Garden Services / Landscaping',
    'Appliance Repair',
    'HVAC / Air Conditioning',
    'IT Support',
    'CCTV Installation',
    'Hairdressers',
    'Barbers',
    'Makeup Artists',
  ];

  // Get all professional services
  const allServices = useMemo(() =>
    businesses.filter(b => b.category === Category.ProfessionalServices),
    [businesses]
  );

  // Filter services based on all criteria
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesServiceType =
        selectedServiceType === 'All Services' ||
        service.description?.includes(selectedServiceType) ||
        service.name.toLowerCase().includes(selectedServiceType.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All Areas' || service.location.includes(selectedLocation);

      return matchesSearch && matchesServiceType && matchesLocation;
    });
  }, [allServices, searchQuery, selectedServiceType, selectedLocation]);

  // Top rated from filtered results
  const topRated = useMemo(() =>
    [...filteredServices].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6),
    [filteredServices]
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
          <h1 className="text-3xl font-serif text-white mb-2">Find Trusted Service Professionals</h1>
          <p className="text-gray-300 text-sm mb-6">Electricians, plumbers, cleaners, barbers, and more...</p>

          {/* SEARCH BAR */}
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services or providers…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 text-gray-200 placeholder-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
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

              {/* Service Type Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">
                  Service Type
                </label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {serviceTypes.map((type) => (
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
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                  setSelectedServiceType('All Services');
                  setSelectedLocation('All Areas');
                }}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors border border-white/20"
              >
                Reset Filters
              </button>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  Found <span className="text-white font-bold">{filteredServices.length}</span> providers
                </p>
              </div>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            {/* TOP RATED SECTION */}
            {topRated.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Top Rated Providers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topRated.slice(0, 4).map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all hover:shadow-lg hover:shadow-yellow-400/10 cursor-pointer group"
                      onClick={() => navigate('service-detail', Category.ProfessionalServices, provider.id)}
                    >
                      {/* Image */}
                      <div className="h-32 bg-gradient-to-br from-amber-900 to-yellow-900 relative overflow-hidden">
                        {provider.image && (
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                        {provider.tier === ListingTier.Elite && (
                          <div className="absolute top-2 right-2 bg-yellow-400/90 text-slate-900 px-2 py-1 rounded-full text-xs font-bold">
                            ⭐ ELITE
                          </div>
                        )}
                        {provider.tier === ListingTier.Premium && (
                          <div className="absolute top-2 right-2 bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ★ PREMIUM
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                          {provider.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                          {provider.description}
                        </p>

                        {/* Rating & Location */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-semibold text-white">
                              {provider.rating?.toFixed(1) || '4.5'}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({provider.reviewCount || 0})
                            </span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center text-xs text-gray-400 mb-3">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          {provider.location}
                        </div>

                        {/* Verified */}
                        <div className="flex items-center mb-3">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          <span className="text-xs text-green-400 font-medium">Verified</span>
                        </div>

                        {/* Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('service-detail', Category.ProfessionalServices, provider.id);
                          }}
                          className="w-full py-2 bg-yellow-400/80 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors text-sm"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ALL PROVIDERS LIST */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">All Providers</h2>

              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredServices.slice(0, 4).map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/50 transition-all cursor-pointer group"
                      onClick={() => navigate('service-detail', Category.ProfessionalServices, provider.id)}
                    >
                      {/* Image */}
                      <div className="h-24 bg-gradient-to-br from-amber-900 to-yellow-900 relative overflow-hidden">
                        {provider.image && (
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>
                      
                      {/* Info */}
                      <div className="p-3">
                        <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors text-sm line-clamp-1">
                          {provider.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-white">{provider.rating?.toFixed(1) || '4.5'}</span>
                          <span className="text-gray-500">({provider.reviewCount || 0})</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="line-clamp-1">{provider.location}</span>
                        </div>
                        {provider.tier === ListingTier.Elite && (
                          <span className="inline-block text-xs bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded mt-2">
                            Elite
                          </span>
                        )}
                        {provider.tier === ListingTier.Premium && (
                          <span className="inline-block text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded mt-2">
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No providers found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedServiceType('All Services');
                      setSelectedLocation('All Areas');
                    }}
                    className="mt-4 px-6 py-2 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-lg transition-colors font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* CTA SECTION */}
            <div className="mt-16 bg-gradient-to-r from-amber-900 to-yellow-900 rounded-2xl px-8 py-12 text-center border border-yellow-400/20">
              <h2 className="text-3xl font-serif font-bold text-white mb-3">Grow Your Service Business</h2>
              <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
                Get discovered by customers near you. List your business on Lowveld Hub today.
              </p>
              <button
                onClick={() => navigate('premium-add-business')}
                className="px-8 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Apply for Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
