import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, X, MapPin, Star, Phone, MapPinIcon, Check } from 'lucide-react';
import { Business, MPUMALANGA_AREAS } from '../types';
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

interface TransportFilters {
  serviceType: string[];
  luxuryLevel: string[];
  area: string;
  priceMin: number;
  priceMax: number;
  features: string[];
}

const TRANSPORT_CATEGORIES = {
  'Airport Transfers': 'airport-transfer',
  'Chauffeur': 'chauffeur',
  'Shuttle': 'shuttle',
  'Bus': 'bus',
  'Helicopter': 'helicopter',
  'Freight': 'freight',
  'Delivery': 'delivery',
  'Tour Guide': 'tour',
  'Car Hire': 'car-hire',
  'Work Transport': 'work-transport',
  'School Transport': 'school-transport',
  'Driver Services': 'driver-services',
};

const LUXURY_LEVELS = ['Elite', 'Platinum', 'Featured', 'New Listing'];

const ADVANCED_FEATURES = [
  'Air Conditioning',
  'WiFi',
  'Child Seat',
  'Pet Friendly',
  '24-Hour Service',
  'Luxury Amenities',
];

const PRICE_PRESETS = [
  { label: 'Under R500', min: 0, max: 500 },
  { label: 'R500–1000', min: 500, max: 1000 },
  { label: 'R1000–2000', min: 1000, max: 2000 },
  { label: 'POA', min: 0, max: 999999 },
];

const TransportCard: React.FC<{
  transport: Business;
  onContact: (t: Business) => void;
  onView: (id: string) => void;
}> = React.memo(({ transport, onContact, onView }) => {
  const getBadge = () => {
    if (transport.tier === 'Platinum') return { bg: 'bg-gradient-to-r from-gold-500 to-gold-400', text: 'text-black', label: 'PLATINUM' };
    if (transport.tier === 'Elite') return { bg: 'bg-gradient-to-r from-amber-500 to-amber-400', text: 'text-black', label: 'ELITE' };
    if (transport.isFeatured) return { bg: 'bg-gradient-to-r from-gold-400 to-gold-300', text: 'text-black', label: 'FEATURED' };
    return null;
  };

  const badge = getBadge();
  const location = typeof transport.location === 'string' ? transport.location : transport.location?.area || 'Mpumalanga';

  return (
    <div className="group relative bg-black border border-gold-500/30 rounded-[18px] overflow-hidden hover:shadow-[0_0_30px_rgba(201,162,77,0.3)] transition-all duration-300 hover:border-gold-500/60">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-black">
        <img
          src={transport.image || 'https://images.unsplash.com/photo-1519390026850-d1d87d8b8fe3?auto=format&fit=crop&q=80&w=600'}
          alt={transport.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        {badge && (
          <div className={`absolute top-4 left-4 px-4 py-2 rounded-full ${badge.bg} ${badge.text} text-xs font-bold uppercase tracking-wider shadow-lg`}>
            {badge.label}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 truncate">{transport.name}</h3>

        {/* Rating & Type */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-gold-500 font-semibold">
              ★ {(transport.rating || 0).toFixed(1)}
            </div>
            <span className="text-white/60">({transport.reviewCount || 0})</span>
          </div>
          <span className="text-white/70 font-medium">{transport.subcategory || 'Transport'}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs text-white/70 mb-3">
          <MapPin size={14} className="text-gold-500 flex-shrink-0" />
          <span>{location}</span>
        </div>

        {/* Price */}
        <div className="mb-4 text-gold-400 font-bold text-sm">
          {transport.price ? `From ${transport.price}` : 'Contact for pricing'}
        </div>

        {/* Contact Button */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(transport.id)}
            className="flex-1 bg-gradient-to-r from-gold-500 to-gold-400 text-black py-2 rounded-lg font-semibold text-sm hover:from-gold-400 hover:to-gold-300 transition-all hover:shadow-lg"
          >
            View Details
          </button>
          <button
            onClick={() => onContact(transport)}
            className="flex-1 border-2 border-gold-500 text-gold-400 py-2 rounded-lg font-semibold text-sm hover:bg-gold-500/10 transition-all"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
});

TransportCard.displayName = 'TransportCard';

const FilterChip: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
      active
        ? 'bg-gold-500 text-black shadow-[0_0_20px_rgba(201,162,77,0.3)]'
        : 'bg-black border border-gold-500/30 text-white hover:border-gold-500/60'
    }`}
  >
    {label}
  </button>
);

interface TransportPagePremiumProps {
  navigate: (view: string, category?: string, id?: string) => void;
}

const TransportPagePremium: React.FC<TransportPagePremiumProps> = ({ navigate }) => {
  const [filters, setFilters] = useState<TransportFilters>({
    serviceType: [],
    luxuryLevel: [],
    area: 'All Areas',
    priceMin: 0,
    priceMax: 50000,
    features: [],
  });

  const [areaOpen, setAreaOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  // Combine all transport data
  const allTransport = useMemo(
    () => [
      ...freightHaulageCompanies,
      ...logisticsWarehousingCompanies,
      ...courierDeliveryCompanies,
      ...privateDriversCompanies,
      ...airportTransfersCompanies,
      ...shuttleMinibusCompanies,
      ...tourSightseeingCompanies,
      ...evChargingStations,
      ...helicopterCharters,
    ],
    []
  );

  // Filter logic
  const filtered = useMemo(() => {
    return allTransport.filter((t) => {
      // Area
      if (filters.area !== 'All Areas') {
        const tLocation = typeof t.location === 'string' ? t.location : t.location?.area || '';
        if (tLocation !== filters.area) return false;
      }

      // Service type
      if (filters.serviceType.length > 0) {
        const typeMatch = filters.serviceType.some((st) => {
          const subcat = (t.subcategory || '').toLowerCase();
          if (st === 'airport-transfer') return subcat.includes('airport');
          if (st === 'chauffeur') return subcat.includes('chauffeur');
          if (st === 'shuttle') return subcat.includes('shuttle');
          if (st === 'helicopter') return subcat.includes('helicopter');
          if (st === 'freight') return subcat.includes('freight');
          if (st === 'delivery') return subcat.includes('delivery') || subcat.includes('courier');
          if (st === 'tour') return subcat.includes('tour') || subcat.includes('sightseeing');
          return true;
        });
        if (!typeMatch) return false;
      }

      // Luxury level
      if (filters.luxuryLevel.length > 0) {
        const tierMatch = filters.luxuryLevel.some((ll) => {
          if (ll === 'Elite') return t.tier === 'Elite';
          if (ll === 'Platinum') return t.tier === 'Platinum';
          if (ll === 'Featured') return t.isFeatured;
          return false;
        });
        if (!tierMatch) return false;
      }

      // Price range
      const price = parseInt((t.price || '').replace(/\D/g, '') || '0');
      if (price < filters.priceMin || price > filters.priceMax) return false;

      // Advanced features
      if (filters.features.length > 0) {
        const featureMatch = filters.features.every((f) => {
          const tags = (t.tags || []).map((tag) => String(tag).toLowerCase());
          return tags.some((tag) => tag.includes(f.toLowerCase()));
        });
        if (!featureMatch) return false;
      }

      return true;
    });
  }, [filters, allTransport]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      serviceType: [],
      luxuryLevel: [],
      area: 'All Areas',
      priceMin: 0,
      priceMax: 50000,
      features: [],
    });
  }, []);

  const handleContact = useCallback((t: Business) => {
    // Try contactOptions first (for some data types), then fall back to phone/email
    const contact = t as any;
    if (contact.contactOptions?.whatsapp) {
      window.open(`https://wa.me/${contact.contactOptions.whatsapp.replace(/\D/g, '')}`);
    } else if (contact.contactOptions?.call) {
      window.location.href = `tel:${contact.contactOptions.call}`;
    } else if (t.phone) {
      window.location.href = `tel:${t.phone}`;
    } else if (t.email) {
      window.location.href = `mailto:${t.email}`;
    } else {
      alert('Contact information not available');
    }
  }, []);

  const handleView = useCallback(
    (id: string) => {
      navigate('transport-detail', undefined, id);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-serif text-white mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
              Premium Transport
            </span>
          </h1>
          <p className="text-gray-400">Airport transfers, chauffeurs, freight & logistics across Mpumalanga</p>
        </div>

        {/* Main Layout: Filters Left + Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT: FILTER PANEL (320-360px) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 z-40 bg-black rounded-2xl p-6 border border-gold-500/20 space-y-6 h-fit">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Filters</h3>
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-white/60 hover:text-white transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Service Type */}
              <div>
                <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-3">Service Type</label>
                <div className="space-y-2">
                  {Object.entries(TRANSPORT_CATEGORIES).map(([label, key]) => (
                    <FilterChip
                      key={key}
                      label={label}
                      active={filters.serviceType.includes(key)}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          serviceType: prev.serviceType.includes(key)
                            ? prev.serviceType.filter((s) => s !== key)
                            : [...prev.serviceType, key],
                        }))
                      }
                    />
                  ))}
                </div>
              </div>



              {/* Area / Route */}
              <div>
                <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-3">Area / Route</label>
                <button
                  onClick={() => setAreaOpen(!areaOpen)}
                  className="w-full flex items-center justify-between bg-black border border-gold-500/20 rounded-lg px-4 py-3 text-white hover:border-gold-500/50 transition-colors"
                >
                  <span>{filters.area}</span>
                  <ChevronDown size={16} className={`transition-transform ${areaOpen ? 'rotate-180' : ''}`} />
                </button>
                {areaOpen && (
                  <div className="mt-2 bg-black border border-gold-500/20 rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                    {['All Areas', ...MPUMALANGA_AREAS].map((area) => (
                      <button
                        key={area}
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, area }));
                          setAreaOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gold-500/20 transition-colors ${
                          filters.area === area ? 'bg-gold-500/30 text-gold-300 font-semibold' : 'text-white'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div>
                <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-3">Price Range (R)</label>
                <div className="space-y-2">
                  {PRICE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          priceMin: preset.min,
                          priceMax: preset.max,
                        }))
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.priceMin === preset.min && filters.priceMax === preset.max
                          ? 'bg-gold-500 text-black'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Features */}
              <div>
                <button
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-white/70 uppercase tracking-wider py-2"
                >
                  Advanced Features
                  <ChevronDown size={14} className={`transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>
                {featuresOpen && (
                  <div className="mt-3 space-y-2">
                    {ADVANCED_FEATURES.map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center gap-2 cursor-pointer text-sm text-white/80 hover:text-white transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={filters.features.includes(feature)}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              features: e.target.checked
                                ? [...prev.features, feature]
                                : prev.features.filter((f) => f !== feature),
                            }))
                          }
                          className="w-4 h-4 rounded bg-black border-gold-500/20 accent-gold-500"
                        />
                        {feature}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Results Count */}
              <div className="pt-4 border-t border-gold-500/20">
                <p className="text-xs text-white/70">{filtered.length} transport services available</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CARDS GRID (2-3 columns desktop, 1-2 tablet, 1 mobile) */}
          <div className="lg:col-span-3">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((transport) => (
                  <TransportCard
                    key={transport.id}
                    transport={transport}
                    onView={handleView}
                    onContact={handleContact}
                  />
                ))}
              </div>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <MapPinIcon size={48} className="text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No services found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters</p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-gold-500 text-black rounded-lg font-semibold hover:bg-gold-400 transition-all"
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

export default TransportPagePremium;
