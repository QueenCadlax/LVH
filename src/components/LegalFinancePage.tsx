import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Check, Phone, ChevronRight, AlertCircle, Shield, Lock, TrendingUp } from 'lucide-react';

interface Professional {
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
}

interface Service {
  id: string;
  name: string;
  count: number;
  category: 'legal' | 'finance' | 'business';
  icon: React.ReactNode;
}

interface Props {
  navigate: (view: string, category?: string, id?: string, sub?: string) => void;
}

const professionals: Professional[] = [
  {
    id: 'lf_1',
    name: 'Mokoena & Partners',
    type: 'Corporate Law Firm',
    specialization: 'Corporate Law',
    rating: 4.9,
    reviews: 127,
    location: 'Mbombela',
    verified: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    phone: '+27 (13) 755-1234',
  },
  {
    id: 'lf_2',
    name: 'Thulani & Associates',
    type: 'Criminal Defense',
    specialization: 'Criminal Law',
    rating: 4.8,
    reviews: 95,
    location: 'Nelspruit',
    verified: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
    phone: '+27 (13) 752-5678',
  },
  {
    id: 'lf_3',
    name: 'De Jager Accounting',
    type: 'Accounting Firm',
    specialization: 'Tax & Audit',
    rating: 4.9,
    reviews: 156,
    location: 'White River',
    verified: true,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
    phone: '+27 (13) 750-9012',
  },
  {
    id: 'lf_4',
    name: 'Apex Financial Advisors',
    type: 'Wealth Management',
    specialization: 'Financial Advisory',
    rating: 4.7,
    reviews: 112,
    location: 'Hazyview',
    verified: true,
    image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=300&fit=crop',
    phone: '+27 (13) 748-3456',
  },
  {
    id: 'lf_5',
    name: 'Matsimela Family Law',
    type: 'Family Law Specialists',
    specialization: 'Family Law',
    rating: 4.8,
    reviews: 84,
    location: 'Mbombela',
    verified: true,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    phone: '+27 (13) 753-7890',
  },
  {
    id: 'lf_6',
    name: 'Sovereign Insurance Solutions',
    type: 'Insurance Brokerage',
    specialization: 'Insurance Broking',
    rating: 4.6,
    reviews: 78,
    location: 'Nelspruit',
    verified: true,
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop',
    phone: '+27 (13) 751-2345',
  },
];

const services: Service[] = [
  // Legal Services
  { id: 'svc_1', name: 'Corporate Lawyers', count: 24, category: 'legal', icon: <Shield className="w-6 h-6" /> },
  { id: 'svc_2', name: 'Criminal Lawyers', count: 18, category: 'legal', icon: <Lock className="w-6 h-6" /> },
  { id: 'svc_3', name: 'Family Lawyers', count: 16, category: 'legal', icon: <Shield className="w-6 h-6" /> },
  { id: 'svc_4', name: 'Property Lawyers', count: 22, category: 'legal', icon: <Shield className="w-6 h-6" /> },
  { id: 'svc_5', name: 'Immigration Lawyers', count: 14, category: 'legal', icon: <Shield className="w-6 h-6" /> },
  { id: 'svc_6', name: 'Labour Lawyers', count: 20, category: 'legal', icon: <Shield className="w-6 h-6" /> },
  
  // Finance Services
  { id: 'svc_7', name: 'Accountants', count: 31, category: 'finance', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'svc_8', name: 'Tax Consultants', count: 19, category: 'finance', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'svc_9', name: 'Auditors', count: 13, category: 'finance', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'svc_10', name: 'Financial Advisors', count: 27, category: 'finance', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'svc_11', name: 'Wealth Managers', count: 9, category: 'finance', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'svc_12', name: 'Insurance Brokers', count: 17, category: 'finance', icon: <TrendingUp className="w-6 h-6" /> },
  
  // Business Services
  { id: 'svc_13', name: 'Business Consultants', count: 25, category: 'business', icon: <Shield className="w-6 h-6" /> },
  { id: 'svc_14', name: 'Company Registration', count: 11, category: 'business', icon: <Shield className="w-6 h-6" /> },
  { id: 'svc_15', name: 'Compliance Services', count: 15, category: 'business', icon: <Shield className="w-6 h-6" /> },
];

const locations = ['All Areas', 'Mbombela', 'Nelspruit', 'Hazyview', 'White River', 'Sabie', 'Pilgrim\'s Rest'];

const serviceTypes = ['All Services', 'Corporate Lawyers', 'Accountants', 'Financial Advisors', 'Family Lawyers', 'Tax Consultants'];

export default function LegalFinancePage({ navigate }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('All Services');
  const [selectedLocation, setSelectedLocation] = useState('All Areas');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter professionals based on all criteria
  const filteredProfessionals = useMemo(() => {
    return professionals.filter(prof => {
      const matchesSearch = 
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesService = selectedService === 'All Services' || 
        prof.type.toLowerCase().includes(selectedService.toLowerCase()) ||
        prof.specialization.toLowerCase().includes(selectedService.toLowerCase());
      
      const matchesLocation = selectedLocation === 'All Areas' || 
        prof.location === selectedLocation;
      
      const matchesVerified = !verifiedOnly || prof.verified;
      
      const matchesRating = prof.rating >= minRating;

      return matchesSearch && matchesService && matchesLocation && matchesVerified && matchesRating;
    });
  }, [searchTerm, selectedService, selectedLocation, verifiedOnly, minRating]);

  // Get top rated professionals
  const topRated = professionals.slice().sort((a, b) => b.rating - a.rating).slice(0, 4);

  // Get professionals near you (from filtered results)
  const nearYou = filteredProfessionals.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* HERO SECTION */}
      <section className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-4 tracking-tight">
            Legal & Financial Expertise,
            <span className="block font-semibold text-blue-900">Trusted.</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl">
            Connect with verified lawyers, accountants, and financial professionals in Mpumalanga. 
            Expert guidance for your business and personal needs.
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search lawyers, accountants, services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3">
            {['Lawyers', 'Accountants', 'Financial Advisors', 'Consultants'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedService(filter)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 text-sm font-medium rounded-full transition"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROFESSIONALS */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-2">Featured Professionals</h2>
            <div className="w-16 h-1 bg-blue-900 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.slice(0, 6).map((prof) => (
              <div
                key={prof.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition duration-300"
              >
                {/* Image */}
                <div className="h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{prof.name}</h3>
                      <p className="text-sm text-slate-600">{prof.type}</p>
                    </div>
                    {prof.verified && (
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                          <Check className="w-5 h-5 text-green-700" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-semibold text-slate-900">{prof.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({prof.reviews} reviews)</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4 text-slate-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    {prof.location}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition">
                      View
                    </button>
                    <button className="flex-1 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-2">Browse Services</h2>
            <div className="w-16 h-1 bg-blue-900 rounded-full"></div>
          </div>

          {/* Legal Services */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-900" />
              Legal Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {services.filter(s => s.category === 'legal').map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.name)}
                  className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-900 hover:shadow-lg transition text-center group"
                >
                  <div className="flex justify-center mb-3 text-slate-600 group-hover:text-blue-900 transition">
                    {service.icon}
                  </div>
                  <p className="text-sm font-medium text-slate-900 mb-2">{service.name}</p>
                  <p className="text-xs text-slate-500">{service.count} professionals</p>
                </button>
              ))}
            </div>
          </div>

          {/* Finance Services */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-900" />
              Finance Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {services.filter(s => s.category === 'finance').map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.name)}
                  className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-900 hover:shadow-lg transition text-center group"
                >
                  <div className="flex justify-center mb-3 text-slate-600 group-hover:text-blue-900 transition">
                    {service.icon}
                  </div>
                  <p className="text-sm font-medium text-slate-900 mb-2">{service.name}</p>
                  <p className="text-xs text-slate-500">{service.count} professionals</p>
                </button>
              ))}
            </div>
          </div>

          {/* Business Services */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-900" />
              Business Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {services.filter(s => s.category === 'business').map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.name)}
                  className="p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-900 hover:shadow-lg transition text-center group"
                >
                  <div className="flex justify-center mb-3 text-slate-600 group-hover:text-blue-900 transition">
                    {service.icon}
                  </div>
                  <p className="text-sm font-medium text-slate-900 mb-2">{service.name}</p>
                  <p className="text-xs text-slate-500">{service.count} professionals</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-8 px-4 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Service Type</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
              >
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Rating</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-slate-900 min-w-[2.5rem]">{minRating}+</span>
              </div>
            </div>

            {/* Verified Only Toggle */}
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-900 focus:ring-2 focus:ring-blue-900"
                />
                <span className="text-sm font-medium text-slate-700">Verified Only</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ALL PROFESSIONALS LISTING */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-light text-slate-900 mb-2">
              {filteredProfessionals.length > 0 ? 'Available Professionals' : 'No Results'}
            </h2>
            <div className="w-16 h-1 bg-blue-900 rounded-full"></div>
          </div>

          {filteredProfessionals.length > 0 ? (
            <div className="space-y-4">
              {filteredProfessionals.map((prof) => (
                <div
                  key={prof.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition flex flex-col md:flex-row gap-6"
                >
                  {/* Image */}
                  <div className="w-full md:w-24 h-24 flex-shrink-0">
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-900">{prof.name}</h3>
                          {prof.verified && (
                            <Check className="w-5 h-5 text-green-700" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{prof.type}</p>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-slate-900">{prof.rating}</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        {prof.location}
                      </div>
                      <div className="text-slate-600">
                        {prof.reviews} reviews
                      </div>
                      <div className="text-slate-600">
                        {prof.specialization}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 md:flex-col md:w-auto">
                    <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition whitespace-nowrap">
                      View Profile
                    </button>
                    <button className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition whitespace-nowrap flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg text-slate-600">No professionals found matching your criteria.</p>
              <p className="text-sm text-slate-500 mt-2">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* TOP RATED FIRMS */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-2">Top Rated Experts</h2>
            <div className="w-16 h-1 bg-blue-900 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRated.map((prof) => (
              <div
                key={prof.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition"
              >
                <div className="h-40 bg-slate-200 overflow-hidden">
                  <img
                    src={prof.image}
                    alt={prof.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900 mb-1 truncate">{prof.name}</h3>
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">{prof.type}</p>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-slate-900">{prof.rating}</span>
                    <span className="text-xs text-slate-500">({prof.reviews})</span>
                  </div>
                  <button className="w-full px-3 py-2 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEAR YOU SECTION */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-2">Services Near You</h2>
            <div className="w-16 h-1 bg-blue-900 rounded-full"></div>
          </div>

          {nearYou.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearYou.map((prof) => (
                <div
                  key={prof.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition"
                >
                  <div className="h-48 bg-slate-200 overflow-hidden">
                    <img
                      src={prof.image}
                      alt={prof.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{prof.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{prof.type}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span className="text-sm text-slate-600">{prof.location}</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-lg transition">
                        View
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-lg transition">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
              <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg text-slate-600">No professionals found in your area.</p>
            </div>
          )}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-light text-white mb-4">
            Verified Professionals You Can Trust
          </h2>
          
          <p className="text-lg text-blue-100 mb-8 leading-relaxed">
            Every professional on LowveldHub is verified and vetted. Our quality assurance process ensures 
            you're connecting with legitimate, experienced experts in legal and financial services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
              <Check className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Verified Credentials</h3>
              <p className="text-blue-100 text-sm">All professionals have verified qualifications and licenses.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
              <Star className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Client Reviews</h3>
              <p className="text-blue-100 text-sm">Transparent ratings and feedback from verified clients.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6">
              <Shield className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Quality Assured</h3>
              <p className="text-blue-100 text-sm">Ongoing monitoring ensures consistent professional standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-3xl mx-auto text-center border border-slate-300 rounded-2xl p-12 bg-white shadow-lg">
          <h2 className="text-3xl font-light text-slate-900 mb-4">
            Are you a legal or financial professional?
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Join LowveldHub and connect with high-value clients seeking your expertise. 
            Showcase your credentials, manage inquiries, and grow your practice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2">
              Join as a Partner
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-slate-300 hover:border-blue-900 text-slate-900 font-semibold rounded-xl transition">
              Learn More
            </button>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            Premium features • Verified badge • Client management tools
          </p>
        </div>
      </section>
    </div>
  );
}
