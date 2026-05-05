import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, CheckCircle, Phone, Mail, Globe, MessageCircle, ChevronRight } from 'lucide-react';
import { MPUMALANGA_AREAS } from '../types';

interface LegalFinanceProfessional {
  id: string;
  name: string;
  type: string;
  specialization: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
  phone?: string;
  email?: string;
  description: string;
}

interface LegalFinancePageV2Props {
  navigate: (view: string, category?: string, id?: string) => void;
}

const LegalFinancePageV2: React.FC<LegalFinancePageV2Props> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('All Services');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Service types for filtering
  const serviceTypes = [
    'All Services',
    'Corporate Lawyers',
    'Criminal Lawyers',
    'Family Lawyers',
    'Property Lawyers',
    'Immigration Lawyers',
    'Labour Lawyers',
    'Accountants',
    'Tax Consultants',
    'Auditors',
    'Financial Advisors',
    'Wealth Managers',
    'Insurance Brokers',
  ];

  // Mock professionals with better descriptions
  const professionals: LegalFinanceProfessional[] = [
    {
      id: 'lf_mokoena_1',
      name: 'Mokoena & Associates',
      type: 'Corporate Law Firm',
      specialization: 'Corporate Law',
      rating: 4.9,
      reviews: 127,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      phone: '+27 (13) 755-1234',
      email: 'info@mokoena.co.za',
      description: 'Experienced corporate law firm specializing in mergers, acquisitions, and business contracts.',
    },
    {
      id: 'lf_thulani_2',
      name: 'Thulani & Associates',
      type: 'Criminal Defense',
      specialization: 'Criminal Law',
      rating: 4.8,
      reviews: 95,
      location: 'Nelspruit',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=800&h=600&fit=crop',
      phone: '+27 (13) 755-2345',
      email: 'contact@thulani-law.co.za',
      description: 'Specialized in criminal defense with over 15 years of courtroom experience.',
    },
    {
      id: 'lf_dejager_3',
      name: 'De Jager Accounting',
      type: 'Accounting Firm',
      specialization: 'Tax & Audit',
      rating: 4.9,
      reviews: 156,
      location: 'Hazyview',
      verified: true,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      phone: '+27 (13) 755-3456',
      email: 'audit@dejager.co.za',
      description: 'Full-service accounting firm offering tax planning, audits, and compliance services.',
    },
    {
      id: 'lf_wealth_4',
      name: 'Wealth Management Solutions',
      type: 'Financial Advisory',
      specialization: 'Investment Planning',
      rating: 4.8,
      reviews: 102,
      location: 'White River',
      verified: true,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      phone: '+27 (13) 755-4567',
      email: 'contact@wealthmgmt.co.za',
      description: 'Investment advisory and wealth management for high-net-worth individuals.',
    },
  ];

  // Filter professionals
  const filteredProfessionals = useMemo(() => {
    return professionals.filter(prof => {
      const matchesSearch =
        searchQuery === '' ||
        prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prof.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesServiceType =
        selectedServiceType === 'All Services' ||
        prof.specialization.includes(selectedServiceType) ||
        prof.type.toLowerCase().includes(selectedServiceType.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All Areas' || prof.location.includes(selectedLocation);

      return matchesSearch && matchesServiceType && matchesLocation;
    });
  }, [searchQuery, selectedServiceType, selectedLocation]);

  // Top rated from filtered
  const topRated = useMemo(
    () => [...filteredProfessionals].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4),
    [filteredProfessionals]
  );

  // Scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* HERO SECTION */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2">Legal & Finance Experts</h1>
          <p className="text-gray-300 text-sm mb-6">Lawyers, accountants, tax consultants, and financial advisors across Mpumalanga</p>

          {/* SEARCH BAR */}
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search professionals or services…"
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
                className="w-full py-2 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-lg transition-colors font-semibold text-sm"
              >
                Reset Filters
              </button>

              {/* Result Count */}
              <p className="text-xs text-gray-400 mt-6 text-center">
                {filteredProfessionals.length} professional{filteredProfessionals.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            {/* TOP RATED SECTION */}
            {topRated.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Top Rated Professionals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topRated.map((prof) => (
                    <div
                      key={prof.id}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all hover:shadow-lg hover:shadow-yellow-400/10 cursor-pointer group"
                      onClick={() => navigate('legal-finance-detail', undefined, prof.id)}
                    >
                      {/* Image */}
                      <div className="h-32 bg-gradient-to-br from-amber-900 to-yellow-900 relative overflow-hidden">
                        {prof.image && (
                          <img
                            src={prof.image}
                            alt={prof.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors line-clamp-1">
                          {prof.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-3 line-clamp-2">{prof.type}</p>

                        {/* Rating & Location */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-semibold text-white">
                              {prof.rating?.toFixed(1) || '4.5'}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({prof.reviews || 0})
                            </span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center text-xs text-gray-400 mb-3">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          {prof.location}
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
                            navigate('legal-finance-detail', undefined, prof.id);
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

            {/* ALL PROFESSIONALS */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">All Professionals</h2>

              {filteredProfessionals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredProfessionals.map((prof) => (
                    <div
                      key={prof.id}
                      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/50 transition-all cursor-pointer group"
                      onClick={() => navigate('legal-finance-detail', undefined, prof.id)}
                    >
                      {/* Image */}
                      <div className="h-24 bg-gradient-to-br from-amber-900 to-yellow-900 relative overflow-hidden">
                        {prof.image && (
                          <img
                            src={prof.image}
                            alt={prof.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors text-sm line-clamp-1">
                          {prof.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-white">{prof.rating?.toFixed(1) || '4.5'}</span>
                          <span className="text-gray-500">({prof.reviews || 0})</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="line-clamp-1">{prof.location}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{prof.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No professionals found matching your filters.</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFinancePageV2;
