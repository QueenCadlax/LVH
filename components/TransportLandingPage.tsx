import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, MapPin, Zap, Users, Clock, Wifi, Wind, Baby, Heart, Plane, AlertCircle, Star, Menu, X, Filter, Search } from 'lucide-react';
import { MPUMALANGA_AREAS } from '../types';
import {
  freightHaulageCompanies,
  logisticsWarehousingCompanies,
  courierDeliveryCompanies,
  privateDriversCompanies,
  airportTransfersCompanies,
  shuttleMinibusCompanies,
  tourSightseeingCompanies,
  evChargingStations,
  helicopterCharters,
} from '../data/transportSeeds';

interface Transport {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount?: number;
  tier?: string;
  location: string;
  category?: string;
  price?: number;
  phone?: string;
  email?: string;
  whatsapp?: string;
  featured?: boolean;
}

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
      isActive
        ? 'bg-gradient-to-r from-[#D4AF37] to-[#E8D4A0] text-black shadow-lg'
        : 'bg-[#2A2A2E] text-[#A0A0A6] hover:bg-[#3A3A3E]'
    }`}
  >
    {label}
  </button>
);

interface TransportCardProps {
  transport: Transport;
  onContact: (t: Transport) => void;
}

const TransportListingCard: React.FC<TransportCardProps> = React.memo(({ transport, onContact, onViewDetail }) => {
  const [imageError, setImageError] = useState(false);

  const getBadge = () => {
    if (transport.tier === 'Platinum') return { text: '👑 PLATINUM', color: '#C9A24D' };
    if (transport.tier === 'Elite') return { text: '✨ ELITE', color: '#C9A24D' };
    if (transport.featured) return { text: '⭐ FEATURED', color: '#C9A24D' };
    return null;
  };

  const badge = getBadge();

  return (
    <div 
      onClick={() => onViewDetail(transport.id)}
      className="group relative h-80 bg-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.02]"
    >
      {/* Image */}
      {!imageError && transport.image ? (
        <img
          src={transport.image}
          alt={transport.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1E] to-[#0E0E11]">
          <Plane className="w-16 h-16 text-[#D4AF37]/50" />
        </div>
      )}

      {/* Black Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4">
          <span className="bg-black/70 backdrop-blur text-[#D4AF37] px-3 py-1 rounded-full text-xs font-bold uppercase">
            {badge.text}
          </span>
        </div>
      )}

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {/* Service Name */}
        <h3 className="text-2xl font-bold mb-2 line-clamp-2">{transport.name}</h3>

        {/* Type & Location */}
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
          <span>{transport.category || 'Premium Transport'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {transport.location}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
          <span className="text-[#D4AF37] font-semibold">{transport.rating?.toFixed(1) || '4.8'}</span>
          <span className="text-gray-400 text-xs">({transport.reviewCount || 0})</span>
        </div>

        {/* Price */}
        {transport.price && (
          <div className="mb-4 text-lg font-bold">
            From <span className="text-[#D4AF37]">R{transport.price.toLocaleString()}</span>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail(transport.id);
          }}
          className="w-full py-2 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all"
        >
          View Profile
        </button>
      </div>
    </div>
  );
});

TransportListingCard.displayName = 'TransportListingCard';

const TransportLandingPage: React.FC<{ navigate: (view: string, category?: string, id?: string, sub?: string) => void }> = ({ navigate }) => {
  const [filters, setFilters] = useState({
    serviceType: [] as string[],
    vehicleType: [] as string[],
    area: 'All Areas',
    priceMin: 0,
    priceMax: 50000,
    amenities: [] as string[],
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  // Combine all transport data
  const allTransport = useMemo(() => [
    ...freightHaulageCompanies,
    ...logisticsWarehousingCompanies,
    ...courierDeliveryCompanies,
    ...privateDriversCompanies,
    ...airportTransfersCompanies,
    ...shuttleMinibusCompanies,
    ...tourSightseeingCompanies,
    ...evChargingStations,
    ...helicopterCharters,
  ], []);

  // Filter logic
  const filteredTransport = useMemo(() => {
    let results = [...allTransport];

    // Search term filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      results = results.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q) ||
        (t.services || []).some((s: string) => s.toLowerCase().includes(q))
      );
    }

    // Service type filter
    if (filters.serviceType.length > 0) {
      results = results.filter(t => 
        filters.serviceType.some(svc => t.category?.toLowerCase().includes(svc.toLowerCase()))
      );
    }

    // Vehicle type filter
    if (filters.vehicleType.length > 0) {
      results = results.filter(t => {
        const category = t.category?.toLowerCase() || '';
        return filters.vehicleType.some(vtype => category.includes(vtype.toLowerCase()));
      });
    }

    // Area filter
    if (filters.area !== 'All Areas') {
      results = results.filter(t => t.location === filters.area);
    }

    // Price filter
    if (filters.priceMax < 50000) {
      results = results.filter(t => {
        const price = t.price || 0;
        return price <= filters.priceMax;
      });
    }

    // Prioritize Elite/Platinum
    return results.sort((a, b) => {
      const tierPriority = { 'Platinum': 4, 'Elite': 3, 'Premium': 2, 'Trial': 1 };
      const aTier = tierPriority[a.tier as keyof typeof tierPriority] || 1;
      const bTier = tierPriority[b.tier as keyof typeof tierPriority] || 1;
      return bTier - aTier;
    });
  }, [allTransport, filters, searchTerm]);


  const handleContact = useCallback((transport: Transport) => {
    const subject = `Enquiry: ${transport.name}`;
    const body = `Hi, I'm interested in your transport services: ${transport.name}`;

    if (transport.whatsapp) {
      window.open(`https://wa.me/${transport.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(body)}`);
    } else if (transport.phone) {
      window.location.href = `tel:${transport.phone}`;
    } else if (transport.email) {
      window.location.href = `mailto:${transport.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      alert(`Contact ${transport.name} directly for more information`);
    }
  }, []);

  const handleViewDetail = useCallback((id: string) => {
    navigate('transport-detail', undefined, id);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black">
      {/* HERO SECTION */}
      <div className="relative pt-20 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Gradient Background */}
          <div className="absolute inset-0 top-0 bottom-32 bg-gradient-to-b from-[#D4AF37]/5 to-transparent" />
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Transport Services
            </h1>
            <p className="text-xl text-gold-500 mb-8 max-w-2xl mx-auto">
              Mpumalanga's curated luxury transport — private transfers, chauffeurs, and bespoke mobility solutions.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by service, vehicle, or company..."
                  className="w-full px-4 py-3 pl-11 rounded-lg bg-white/10 border border-gold-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <button className="px-8 py-3 border-2 border-gold-500 text-gold-500 font-semibold rounded-lg hover:bg-gold-500 hover:text-black transition-all">
              Explore Services
            </button>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* LEFT: FILTER PANEL */}
          <div>
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full py-3 mb-6 bg-[#1A1A1E] text-white border border-[#D4AF37] rounded-lg flex items-center justify-center gap-2 hover:bg-[#2A2A2E]"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Filter Container */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-6 pb-8`}>
              {/* Service Type */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Service Type</h3>
                <button
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                  className="w-full px-4 py-3 bg-[#1A1A1E] text-white rounded-lg flex items-center justify-between hover:bg-[#2A2A2E] border border-[#2A2A2E]"
                >
                  <span className="text-sm">Select Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showServiceDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showServiceDropdown && (
                  <div className="mt-2 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] p-3 space-y-2">
                    {['Airport Transfer', 'Private Chauffeur', 'Lodge Shuttle', 'VIP Transport', 'Limousine', 'Bus Hire'].map(service => (
                      <label key={service} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.serviceType.includes(service)}
                          onChange={() => {
                            setFilters(prev => ({
                              ...prev,
                              serviceType: prev.serviceType.includes(service)
                                ? prev.serviceType.filter(s => s !== service)
                                : [...prev.serviceType, service],
                            }));
                          }}
                          className="w-4 h-4 rounded accent-[#D4AF37]"
                        />
                        <span className="text-white text-sm hover:text-[#D4AF37]">{service}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Vehicle Type */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Vehicle Type</h3>
                <button
                  onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
                  className="w-full px-4 py-3 bg-[#1A1A1E] text-white rounded-lg flex items-center justify-between hover:bg-[#2A2A2E] border border-[#2A2A2E]"
                >
                  <span className="text-sm">Select Vehicles</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showVehicleDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showVehicleDropdown && (
                  <div className="mt-2 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] p-3 space-y-2">
                    {['Sedan', 'SUV', 'Minibus', 'Luxury Van', 'Limousine'].map(vehicle => (
                      <label key={vehicle} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.vehicleType.includes(vehicle)}
                          onChange={() => {
                            setFilters(prev => ({
                              ...prev,
                              vehicleType: prev.vehicleType.includes(vehicle)
                                ? prev.vehicleType.filter(v => v !== vehicle)
                                : [...prev.vehicleType, vehicle],
                            }));
                          }}
                          className="w-4 h-4 rounded accent-[#D4AF37]"
                        />
                        <span className="text-white text-sm hover:text-[#D4AF37]">{vehicle}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Location</h3>
                <button
                  onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                  className="w-full px-4 py-3 bg-[#1A1A1E] text-white rounded-lg flex items-center justify-between hover:bg-[#2A2A2E] border border-[#2A2A2E]"
                >
                  <span className="text-sm">{filters.area}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAreaDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showAreaDropdown && (
                  <div className="mt-2 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, area: 'All Areas' }));
                        setShowAreaDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#2A2A2E] text-white text-sm"
                    >
                      All Areas
                    </button>
                    {MPUMALANGA_AREAS.map(area => (
                      <button
                        key={area}
                        onClick={() => {
                          setFilters(prev => ({ ...prev, area }));
                          setShowAreaDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#2A2A2E] text-[#A0A0A6] text-sm"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="500"
                    value={filters.priceMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceMax: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-[#2A2A2E] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                  <div className="flex justify-between text-xs text-[#A0A0A6]">
                    <span>R{filters.priceMin.toLocaleString()}</span>
                    <span>R{filters.priceMax.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-[#D4AF37] uppercase text-sm font-bold mb-3">Amenities</h3>
                <div className="space-y-2">
                  {['WiFi', 'Air Conditioning', 'Mini Bar', 'Phone Charger', 'Premium Sound'].map(amenity => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            amenities: prev.amenities.includes(amenity)
                              ? prev.amenities.filter(a => a !== amenity)
                              : [...prev.amenities, amenity],
                          }));
                        }}
                        className="w-4 h-4 rounded accent-[#D4AF37]"
                      />
                      <span className="text-white text-sm hover:text-[#D4AF37]">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => setFilters({
                  serviceType: [],
                  vehicleType: [],
                  area: 'All Areas',
                  priceMin: 0,
                  priceMax: 50000,
                  amenities: [],
                })}
                className="w-full py-3 border border-white text-white hover:text-black hover:bg-white rounded-lg transition-all font-semibold text-sm"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* RIGHT: LISTINGS FEED */}
          <div className="space-y-6">
            {filteredTransport.length > 0 ? (
              <>
                <div className="text-sm text-[#A0A0A6] mb-6">
                  Showing <span className="text-[#D4AF37] font-bold">{filteredTransport.length}</span> services
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTransport.map((transport) => (
                    <TransportListingCard
                      key={transport.id}
                      transport={transport}
                      onContact={handleContact}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-8" />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No Services Found</h3>
                <p className="text-[#A0A0A6] mb-6">Try adjusting your filters to discover available transport options</p>
              </div>
            )}

            {/* Curated Badge */}
            {filteredTransport.length > 0 && (
              <div className="text-center mt-12 pt-8 border-t border-[#2A2A2E]">
                <p className="text-sm text-[#A0A0A6]">✓ Curated by <span className="text-[#D4AF37] font-bold">LowveldHub</span></p>
                <p className="text-xs text-[#7A7A80] mt-1">All operators verified and excellence-rated</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportLandingPage;
