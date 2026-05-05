import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, Star, MapPin, Phone, MessageCircle, Mail, Users, Award, Truck, Clock, MapPinIcon, AlertCircle, ChevronRight, ChevronDown } from 'lucide-react';
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
  description?: string;
}

type TabType = 'overview' | 'fleet' | 'services' | 'pricing' | 'gallery' | 'reviews' | 'location';

const TransportDetailPremium: React.FC<{ id: string; navigate: (view: string, category?: string, id?: string) => void }> = ({ id, navigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [imageError, setImageError] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get all transport services
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

  const transport = allTransport.find(t => t.id === id);

  if (!transport) {
    return (
      <div className="min-h-screen bg-[#0E0E11] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate('transport')}
            className="px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg"
          >
            Back to Transport
          </button>
        </div>
      </div>
    );
  }

  const handleContact = (method: 'whatsapp' | 'phone' | 'email') => {
    const subject = `Enquiry: ${transport.name}`;
    const body = `Hi, I'm interested in your transport services: ${transport.name}`;

    if (method === 'whatsapp' && transport.whatsapp) {
      window.open(`https://wa.me/${transport.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(body)}`);
    } else if (method === 'phone' && transport.phone) {
      window.location.href = `tel:${transport.phone}`;
    } else if (method === 'email' && transport.email) {
      window.location.href = `mailto:${transport.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  const getTierBadge = () => {
    if (transport.tier === 'Platinum') return { text: '👑 PLATINUM', color: '#D4AF37' };
    if (transport.tier === 'Elite') return { text: '✨ ELITE', color: '#D4AF37' };
    if (transport.featured) return { text: '⭐ FEATURED', color: '#D4AF37' };
    return null;
  };

  const badge = getTierBadge();

  return (
    <div className="min-h-screen bg-[#0E0E11] text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[65vh] overflow-hidden">
        {!imageError && transport.image ? (
          <img
            src={transport.image}
            alt={transport.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1E] to-[#0E0E11]">
            <Truck className="w-24 h-24 text-[#D4AF37]/50" />
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />

        {/* Back Button */}
        <button
          onClick={() => navigate('transport')}
          className="absolute top-8 left-8 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center z-10 transition-all"
        >
          <ChevronLeft size={24} color="#D4AF37" />
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 to-transparent">
          <div className="max-w-6xl mx-auto">
            {/* Tier Badge */}
            {badge && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 backdrop-blur-sm border border-[#D4AF37]/30">
                  <span className="text-sm font-bold" style={{ color: badge.color }}>{badge.text}</span>
                </span>
              </div>
            )}

            {/* Title & Location */}
            <h1 className="text-5xl font-bold mb-3 text-white" style={{ fontFamily: '"Georgia", serif' }}>
              {transport.name}
            </h1>
            <p className="text-lg flex items-center gap-2 text-[#D4AF37]">
              <MapPin size={18} />
              {transport.category || 'Premium Transport'} • {transport.location}
            </p>

            {/* Rating & Meta */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(transport.rating) ? '#D4AF37' : 'none'}
                      color={i < Math.floor(transport.rating) ? '#D4AF37' : '#A0A0A6'}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{transport.rating?.toFixed(1) || '4.8'}</span>
                <span className="text-xs text-[#A0A0A6]">({transport.reviewCount || 0} reviews)</span>
              </div>
              {transport.price && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#D4AF37]">From R{transport.price?.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK STATS BAR ===== */}
      <section className="sticky top-0 z-40 bg-[#1A1A1E] border-b border-[#2A2A2E] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Truck size={20} className="text-[#D4AF37]" />
            <div>
              <p className="text-xs text-[#A0A0A6]">Fleet</p>
              <p className="font-semibold">12 Vehicles</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-[#D4AF37]" />
            <div>
              <p className="text-xs text-[#A0A0A6]">Coverage</p>
              <p className="font-semibold">All Mpumalanga</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-[#D4AF37]" />
            <div>
              <p className="text-xs text-[#A0A0A6]">Response</p>
              <p className="font-semibold">15 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award size={20} className="text-[#D4AF37]" />
            <div>
              <p className="text-xs text-[#A0A0A6]">Operating</p>
              <p className="font-semibold">Since 2015</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="border-t border-[#2A2A2E] px-8 py-4 flex gap-3 flex-wrap">
          <button
            onClick={() => setShowQuoteForm(!showQuoteForm)}
            className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#E5C158] transition-colors"
          >
            Get Instant Quote
          </button>
          <button
            onClick={() => handleContact('whatsapp')}
            className="px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
          >
            💬 WhatsApp
          </button>
          <button
            onClick={() => handleContact('phone')}
            className="px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
          >
            📞 Call
          </button>
          <button
            onClick={() => handleContact('email')}
            className="px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
          >
            ✉️ Email
          </button>
        </div>
      </section>

      {/* ===== QUOTE FORM (Collapsible) ===== */}
      {showQuoteForm && (
        <section className="bg-[#1A1A1E] border-b border-[#2A2A2E] px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Get a Quick Quote</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input type="date" placeholder="Start Date" className="px-4 py-3 bg-[#2A2A2E] border border-[#3A3A3E] rounded-lg text-white placeholder-[#A0A0A6]" />
              <input type="date" placeholder="End Date" className="px-4 py-3 bg-[#2A2A2E] border border-[#3A3A3E] rounded-lg text-white placeholder-[#A0A0A6]" />
              <button className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#E5C158] transition-colors">
                Calculate Quote
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB NAVIGATION ===== */}
      <section className="max-w-6xl mx-auto px-8 py-8 border-b border-[#2A2A2E]">
        <div className="flex gap-8 overflow-x-auto">
          {(['overview', 'fleet', 'services', 'pricing', 'gallery', 'reviews', 'location'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-colors capitalize whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#D4AF37] border-[#D4AF37]'
                  : 'text-[#A0A0A6] border-transparent hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ===== TAB CONTENT ===== */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
              <p className="text-[#A0A0A6] leading-7 text-lg">
                {transport.description || 'Premium transport service offering reliable, professional mobility solutions across Mpumalanga with fully verified operators and comprehensive insurance coverage.'}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Service Highlights</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Professional Drivers', 'Modern Fleet', 'GPS Tracking', 'Insurance Included', 'Available 24/7', 'On-Time Guarantee', 'Flexible Pricing', 'Premium Comfort'].map((item, i) => (
                  <div key={i} className="p-4 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] hover:border-[#D4AF37]/50 transition-colors">
                    <p className="text-[#D4AF37] font-semibold text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Insurance & Verification</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                  <Award size={20} className="text-[#D4AF37]" />
                  <div>
                    <p className="font-semibold text-white">✓ Fully Insured</p>
                    <p className="text-sm text-[#A0A0A6]">Comprehensive liability coverage up to R5M</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                  <Award size={20} className="text-[#D4AF37]" />
                  <div>
                    <p className="font-semibold text-white">✓ Verified Drivers</p>
                    <p className="text-sm text-[#A0A0A6]">All operators background-checked and licensed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                  <Award size={20} className="text-[#D4AF37]" />
                  <div>
                    <p className="font-semibold text-white">✓ Safety Certified</p>
                    <p className="text-sm text-[#A0A0A6]">Meets all industry safety standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FLEET TAB */}
        {activeTab === 'fleet' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Our Fleet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { type: 'Sedan', count: 4, capacity: '4 passengers', amenities: 'WiFi, AC, Phone charger' },
                { type: 'SUV', count: 3, capacity: '7 passengers', amenities: 'WiFi, AC, Mini bar' },
                { type: 'Minibus', count: 3, capacity: '14 passengers', amenities: 'WiFi, AC, Premium sound' },
                { type: 'Luxury Coach', count: 2, capacity: '50 passengers', amenities: 'WiFi, Entertainment, Catering' },
              ].map((vehicle, i) => (
                <div key={i} className="p-6 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{vehicle.type}</h3>
                      <p className="text-sm text-[#D4AF37] font-semibold">{vehicle.count} vehicles available</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-[#A0A0A6]"><strong>Capacity:</strong> {vehicle.capacity}</p>
                    <p className="text-sm text-[#A0A0A6]"><strong>Amenities:</strong> {vehicle.amenities}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Airport Transfers', desc: 'Professional pickup & drop-off to/from all major airports' },
                { name: 'Corporate Transport', desc: 'Executive mobility solutions for businesses' },
                { name: 'Event Transportation', desc: 'Full-scale transport for conferences, weddings, tours' },
                { name: 'Logistics & Freight', desc: 'Secure cargo transport and delivery services' },
                { name: 'Private Touring', desc: 'Guided tours with premium comfort and expertise' },
                { name: 'Group Travel', desc: 'Customized itineraries for groups up to 50 people' },
              ].map((service, i) => (
                <div key={i} className="p-6 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                  <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-[#A0A0A6]">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRICING TAB */}
        {activeTab === 'pricing' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Pricing & Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                <h3 className="text-lg font-bold text-white mb-6">Hourly Rates</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2E]">
                    <span className="text-[#A0A0A6]">Sedan (per hour)</span>
                    <span className="text-[#D4AF37] font-bold">R450</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2E]">
                    <span className="text-[#A0A0A6]">SUV (per hour)</span>
                    <span className="text-[#D4AF37] font-bold">R650</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2E]">
                    <span className="text-[#A0A0A6]">Minibus (per hour)</span>
                    <span className="text-[#D4AF37] font-bold">R1,200</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                <h3 className="text-lg font-bold text-white mb-6">Fixed Routes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2E]">
                    <span className="text-[#A0A0A6]">Airport (Nelspruit)</span>
                    <span className="text-[#D4AF37] font-bold">R850</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2E]">
                    <span className="text-[#A0A0A6]">Kruger Gate (all routes)</span>
                    <span className="text-[#D4AF37] font-bold">From R1,500</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2E]">
                    <span className="text-[#A0A0A6]">City to City Tour</span>
                    <span className="text-[#D4AF37] font-bold">From R2,500</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-[#A0A0A6]">* Rates exclude toll fees and fuel surcharges. Contact for corporate volume discounts.</p>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] flex items-center justify-center">
                  <div className="text-center">
                    <Truck size={32} className="text-[#D4AF37]/50 mx-auto mb-2" />
                    <p className="text-xs text-[#A0A0A6]">Gallery Image {i + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
            <div className="space-y-6">
              {[
                { name: 'James van der Merwe', type: 'Business', rating: 5, text: 'Professional service, on-time every time. Highly recommended!' },
                { name: 'Sarah Nkosi', type: 'Tourist', rating: 5, text: 'Amazing tour experience! Knowledgeable driver and comfortable vehicles.' },
                { name: 'Michael Peterson', type: 'Corporate', rating: 5, text: 'Reliable transport partner for our team. Excellent value.' },
              ].map((review, i) => (
                <div key={i} className="p-6 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="text-xs text-[#A0A0A6]">{review.type}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={16} fill="#D4AF37" color="#D4AF37" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#A0A0A6]">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOCATION TAB */}
        {activeTab === 'location' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Service Coverage</h2>
            <div className="bg-[#1A1A1E] rounded-xl p-8 border border-[#2A2A2E]">
              <div className="h-[400px] bg-[#2A2A2E] rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-[#D4AF37] mx-auto mb-3" />
                  <p className="text-[#A0A0A6]">Service Coverage Map</p>
                </div>
              </div>
              <p className="text-lg text-white mb-4">📍 Coverage: All Mpumalanga Province</p>
              <p className="text-[#A0A0A6] leading-7">We operate across all major areas including Mbombela, Nelspruit, Hazyview, Sabie, Graskop, White River, and all Kruger National Park entry points. Contact us for routes outside this area.</p>
            </div>
          </div>
        )}
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="bg-[#1A1A1E] border-t border-[#2A2A2E] py-16 mt-16">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '✓', title: 'Verified Operators', desc: 'Background-checked & licensed' },
              { icon: '✓', title: 'Fully Insured', desc: 'Up to R5M coverage included' },
              { icon: '✓', title: 'Modern Fleet', desc: 'Regularly maintained vehicles' },
              { icon: '✓', title: '24/7 Available', desc: 'Always ready to serve' },
            ].map((trust, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl text-[#D4AF37] mb-3">{trust.icon}</p>
                <p className="font-bold text-white mb-2">{trust.title}</p>
                <p className="text-sm text-[#A0A0A6]">{trust.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-black/50 rounded-lg border border-[#2A2A2E] text-center">
            <p className="text-[#D4AF37] font-bold mb-2">✓ LowveldHub Verified</p>
            <p className="text-[#A0A0A6]">Curated for excellence. Your safety, our priority.</p>
            <p className="text-xs text-[#7A7A80] mt-4">We are a curated digital ecosystem. Listings are verified. Excellence is expected.</p>
          </div>
        </div>
      </section>

      {/* ===== SIMILAR SERVICES ===== */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">Similar Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTransport.slice(0, 4).map((service) => (
            <div
              key={service.id}
              onClick={() => navigate('transport-detail', undefined, service.id)}
              className="group rounded-lg overflow-hidden border border-[#2A2A2E] hover:border-[#D4AF37]/50 transition-all cursor-pointer"
            >
              <div className="relative h-48 bg-[#1A1A1E] overflow-hidden">
                {!imageError && service.image ? (
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Truck className="w-12 h-12 text-[#D4AF37]/30" />
                  </div>
                )}
                {service.tier === 'Platinum' && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 rounded text-xs font-bold text-[#D4AF37]">👑 PLATINUM</div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-white line-clamp-1">{service.name}</p>
                <p className="text-xs text-[#A0A0A6] mb-3">{service.category || 'Transport'} • {service.location}</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                  {service.price && <p className="font-bold text-[#D4AF37] text-sm">R{service.price}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TransportDetailPremium;
