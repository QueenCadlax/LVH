import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, Star, MapPin, Phone, MessageCircle, Mail, Grid, Users, Award, MapPinIcon, Camera } from 'lucide-react';
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

type TabType = 'overview' | 'fleet' | 'services' | 'gallery' | 'reviews' | 'location';

const TransportDetailPage: React.FC<{ id: string; navigate: (view: string, category?: string, id?: string) => void }> = ({ id, navigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [imageError, setImageError] = useState(false);

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
      <div className="min-h-screen bg-black flex items-center justify-center">
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
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-20 left-4 md:left-8 z-20">
        <button
          onClick={() => navigate('transport')}
          className="p-2 bg-black/70 backdrop-blur border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[60vh] bg-black overflow-hidden pt-20">
        {!imageError && transport.image ? (
          <img
            src={transport.image}
            alt={transport.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1E] to-[#0E0E11]">
            <div className="text-center">
              <Grid className="w-16 h-16 text-[#D4AF37]/50 mx-auto" />
              <span className="text-[#7A7A80] mt-4 block">{transport.name}</span>
            </div>
          </div>
        )}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Top Info Bar */}
        <div className="absolute top-24 left-0 right-0 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left: Name & Tier */}
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {transport.name}
                  </h1>
                  {badge && (
                    <span className="inline-block bg-black/70 backdrop-blur text-[#D4AF37] px-4 py-1 rounded-full text-sm font-bold uppercase">
                      {badge.text}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Rating & Price */}
              <div className="text-white text-right">
                <div className="flex items-center gap-2 mb-2 justify-end md:justify-start">
                  <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-2xl font-bold">{transport.rating?.toFixed(1) || '4.8'}</span>
                  <span className="text-gray-400">({transport.reviewCount || 0})</span>
                </div>
                {transport.price && (
                  <div className="text-2xl font-bold">
                    From <span className="text-[#D4AF37]">R{transport.price.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Contact CTA Bar */}
        <div className="mb-12 pb-8 border-b border-[#2A2A2E]">
          <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
          <div className="flex flex-wrap gap-3">
            {transport.whatsapp && (
              <button
                onClick={() => handleContact('whatsapp')}
                className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#E8D4A0] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
            )}
            {transport.phone && (
              <button
                onClick={() => handleContact('phone')}
                className="flex items-center gap-2 px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <Phone className="w-5 h-5" />
                Call
              </button>
            )}
            {transport.email && (
              <button
                onClick={() => handleContact('email')}
                className="flex items-center gap-2 px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <Mail className="w-5 h-5" />
                Email
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex gap-2 md:gap-4 border-b border-[#2A2A2E] mb-8 overflow-x-auto pb-4">
            {(['overview', 'fleet', 'services', 'gallery', 'reviews', 'location'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold uppercase text-sm whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                    : 'text-[#A0A0A6] hover:text-white'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'fleet' && 'Fleet'}
                {tab === 'services' && 'Services'}
                {tab === 'gallery' && 'Gallery'}
                {tab === 'reviews' && 'Reviews'}
                {tab === 'location' && 'Location'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
                  <p className="text-gray-300 leading-relaxed max-w-3xl">
                    {transport.description || `Premium ${transport.category || 'transport'} service operating across Mpumalanga. ${transport.name} is a trusted provider with a commitment to excellence, safety, and customer satisfaction. We specialize in ${transport.category?.toLowerCase() || 'professional transport solutions'} with a fleet of modern vehicles and highly trained professionals.`}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg p-6">
                    <Award className="w-8 h-8 text-[#D4AF37] mb-3" />
                    <h3 className="text-white font-bold mb-2">Verified Excellence</h3>
                    <p className="text-gray-400 text-sm">Curated by LowveldHub and verified for quality standards</p>
                  </div>
                  <div className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg p-6">
                    <Users className="w-8 h-8 text-[#D4AF37] mb-3" />
                    <h3 className="text-white font-bold mb-2">Professional Team</h3>
                    <p className="text-gray-400 text-sm">Experienced drivers and staff dedicated to your comfort</p>
                  </div>
                  <div className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg p-6">
                    <MapPin className="w-8 h-8 text-[#D4AF37] mb-3" />
                    <h3 className="text-white font-bold mb-2">Local Coverage</h3>
                    <p className="text-gray-400 text-sm">Serving {transport.location} and surrounding areas</p>
                  </div>
                </div>
              </div>
            )}

            {/* Fleet Tab */}
            {activeTab === 'fleet' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Our Fleet</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Luxury Sedan', 'Premium SUV', 'Minibus (14-seat)', 'Executive Van', 'Limousine'].map((vehicle, idx) => (
                    <div key={idx} className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg p-6">
                      <div className="h-40 bg-gradient-to-br from-[#2A2A2E] to-[#0E0E11] rounded-lg mb-4 flex items-center justify-center">
                        <Grid className="w-12 h-12 text-[#D4AF37]/30" />
                      </div>
                      <h3 className="text-white font-bold mb-2">{vehicle}</h3>
                      <ul className="space-y-1 text-gray-400 text-sm">
                        <li>✓ Air Conditioning</li>
                        <li>✓ Premium Sound System</li>
                        <li>✓ Complimentary WiFi</li>
                        <li>✓ Professional Driver</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Services Offered</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'Airport Transfers', desc: 'Professional pickup and drop-off service to/from all major airports' },
                    { title: 'Corporate Travel', desc: 'Executive transportation for business meetings and events' },
                    { title: 'Tours & Excursions', desc: 'Guided tours and sightseeing within Mpumalanga province' },
                    { title: 'Event Transport', desc: 'Comfortable group transportation for weddings and events' },
                    { title: '24/7 Availability', desc: 'Round-the-clock service for emergencies and last-minute bookings' },
                    { title: 'Hotel Transfers', desc: 'Reliable shuttle service between hotels and attractions' },
                  ].map((service, idx) => (
                    <div key={idx} className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg p-6">
                      <h3 className="text-[#D4AF37] font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-400 text-sm">{service.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="aspect-square bg-gradient-to-br from-[#2A2A2E] to-[#0E0E11] rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                      <Camera className="w-12 h-12 text-[#D4AF37]/30" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
                <div className="space-y-6">
                  {[
                    { name: 'David Mthembu', rating: 5, text: 'Exceptional service! Professional driver, clean vehicle, and punctual. Highly recommended for any transport needs.' },
                    { name: 'Sarah Johnson', rating: 5, text: 'Best transport experience in Mpumalanga. Comfortable ride, friendly staff, and fair pricing.' },
                    { name: 'James Ntuli', rating: 4, text: 'Great service overall. Driver was knowledgeable about the area and made good recommendations.' },
                  ].map((review, idx) => (
                    <div key={idx} className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                          ))}
                        </div>
                        <span className="text-white font-semibold">{review.rating}.0</span>
                      </div>
                      <p className="text-gray-300 mb-2">{review.text}</p>
                      <p className="text-[#D4AF37] text-sm font-semibold">— {review.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white">Service Location</h2>
                <div className="bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg p-8">
                  <div className="h-96 bg-gradient-to-br from-[#2A2A2E] to-[#0E0E11] rounded-lg flex items-center justify-center mb-6">
                    <MapPinIcon className="w-16 h-16 text-[#D4AF37]/30" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[#D4AF37] font-bold mb-2">Serving</h3>
                      <p className="text-white">{transport.location}</p>
                    </div>
                    <div>
                      <h3 className="text-[#D4AF37] font-bold mb-2">Coverage Area</h3>
                      <p className="text-gray-400">We operate throughout Mpumalanga with extended services to neighboring provinces</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-[#2A2A2E] pt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Book?</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {transport.whatsapp && (
              <button
                onClick={() => handleContact('whatsapp')}
                className="flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#E8D4A0] transition-all text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Contact via WhatsApp
              </button>
            )}
            {transport.phone && (
              <button
                onClick={() => handleContact('phone')}
                className="flex items-center gap-2 px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all text-lg"
              >
                <Phone className="w-6 h-6" />
                Call Now
              </button>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-6">✓ Curated by <span className="text-[#D4AF37] font-bold">LowveldHub</span></p>
        </div>
      </div>
    </div>
  );
};

export default TransportDetailPage;
