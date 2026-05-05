import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, CheckCircle, Phone, Mail, Globe, MessageCircle, ChevronRight } from 'lucide-react';
import { MPUMALANGA_AREAS } from '../types';

interface HealthProvider {
  id: string;
  name: string;
  specialty: string;
  type: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  image: string;
  phone?: string;
  email?: string;
  website?: string;
  description: string;
}

interface HealthPageV2Props {
  navigate: (view: string, category?: string, id?: string) => void;
}

const HealthPageV2: React.FC<HealthPageV2Props> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Specialty types for filtering
  const specialties = [
    'All Specialties',
    'General Practitioner',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Gynecologist',
    'Orthopedic Surgeon',
    'Dentist',
    'Pharmacist',
    'Physiotherapist',
    'Psychiatrist',
    'Optometrist',
    'Neurologist',
    'ENT Specialist',
  ];

  // Mock health providers with detailed data
  const providers: HealthProvider[] = [
    {
      id: 'hp_smith_1',
      name: 'Dr. John Smith',
      specialty: 'General Practitioner',
      type: 'Family Medicine',
      rating: 4.9,
      reviews: 124,
      location: 'Mbombela',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e323692df62a?w=800&h=600&fit=crop',
      phone: '+27 (13) 755-1001',
      email: 'dr.smith@health.co.za',
      website: 'www.drsmith.co.za',
      description: 'General practitioner with 15+ years experience. Comprehensive family medicine care.',
    },
    {
      id: 'hp_johnson_2',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      type: 'Heart & Vascular',
      rating: 4.8,
      reviews: 89,
      location: 'Nelspruit',
      verified: true,
      image: 'https://images.unsplash.com/photo-1644714505311-a3fb305d0d5f?w=800&h=600&fit=crop',
      phone: '+27 (13) 755-1002',
      email: 'dr.johnson@cardiac.co.za',
      website: 'www.johnsoncardiology.co.za',
      description: 'Specialist in cardiovascular diseases. State-of-the-art cardiac diagnostic facilities.',
    },
    {
      id: 'hp_chen_3',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      type: 'Skin Specialist',
      rating: 4.7,
      reviews: 67,
      location: 'Hazyview',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612619142632-faf5ff2cb4b7?w=800&h=600&fit=crop',
      phone: '+27 (13) 755-1003',
      email: 'dr.chen@derma.co.za',
      website: 'www.dermacare-mpumalanga.co.za',
      description: 'Expert in dermatology and cosmetic skin treatments. Advanced laser therapy available.',
    },
    {
      id: 'hp_williams_4',
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrician',
      type: 'Child Healthcare',
      rating: 4.9,
      reviews: 156,
      location: 'White River',
      verified: true,
      image: 'https://images.unsplash.com/photo-1619883514856-fcf2315c3e90?w=800&h=600&fit=crop',
      phone: '+27 (13) 755-1004',
      email: 'dr.williams@pediatrics.co.za',
      website: 'www.pediatriccare.co.za',
      description: 'Specialized pediatric care. Experienced with newborns to adolescents.',
    },
  ];

  // Filter providers
  const filteredProviders = useMemo(() => {
    return providers.filter(provider => {
      const matchesSearch =
        searchQuery === '' ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === 'All Specialties' ||
        provider.specialty === selectedSpecialty;

      const matchesLocation =
        selectedLocation === 'All Areas' || provider.location === selectedLocation;

      return matchesSearch && matchesSpecialty && matchesLocation;
    });
  }, [searchQuery, selectedSpecialty, selectedLocation]);

  // Top rated from filtered
  const topRated = useMemo(
    () => [...filteredProviders].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4),
    [filteredProviders]
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
          <h1 className="text-3xl font-serif text-white mb-2">Find Trusted Doctors</h1>
          <p className="text-gray-300 text-sm mb-6">Verified medical professionals across Mpumalanga</p>

          {/* SEARCH BAR */}
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search doctors or specialties…"
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

              {/* Specialty Filter */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2 font-semibold uppercase tracking-wide">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec} className="bg-slate-900">
                      {spec}
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
                  setSelectedSpecialty('All Specialties');
                  setSelectedLocation('All Areas');
                }}
                className="w-full py-2 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-lg transition-colors font-semibold text-sm"
              >
                Reset Filters
              </button>

              {/* Result Count */}
              <p className="text-xs text-gray-400 mt-6 text-center">
                {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            {/* TOP RATED SECTION */}
            {topRated.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Top Rated Doctors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topRated.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all hover:shadow-lg hover:shadow-yellow-400/10 cursor-pointer group"
                      onClick={() => navigate('health-detail', undefined, provider.id)}
                    >
                      {/* Image */}
                      <div className="h-40 bg-gradient-to-br from-blue-900 to-cyan-900 relative overflow-hidden">
                        {provider.image && (
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors line-clamp-1">
                          {provider.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-3 line-clamp-1">{provider.specialty}</p>

                        {/* Rating & Reviews */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm font-semibold text-white">
                              {provider.rating?.toFixed(1) || '4.5'}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({provider.reviews || 0})
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
                            navigate('health-detail', undefined, provider.id);
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

            {/* ALL DOCTORS */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">All Doctors</h2>

              {filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-black border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/50 transition-all cursor-pointer group"
                      onClick={() => navigate('health-detail', undefined, provider.id)}
                    >
                      {/* Image */}
                      <div className="h-32 bg-gradient-to-br from-blue-900 to-cyan-900 relative overflow-hidden">
                        {provider.image && (
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors text-sm line-clamp-1">
                          {provider.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-white">{provider.rating?.toFixed(1) || '4.5'}</span>
                          <span className="text-gray-500">({provider.reviews || 0})</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="line-clamp-1">{provider.location}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{provider.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No doctors found matching your filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSpecialty('All Specialties');
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

export default HealthPageV2;
