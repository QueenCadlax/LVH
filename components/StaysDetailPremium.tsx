import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Heart, MapPin, Star, Phone, MessageSquare, Mail, ChevronLeft, ChevronRight, Bed, Users, Bath, Map, Calendar, AlertCircle } from 'lucide-react';
import { Stay } from '../types';

interface StaysDetailPremiumProps {
  stay: Stay;
  navigate?: (view: string, category?: string, id?: string) => void;
}

export default React.memo(function StaysDetailPremium({ stay, navigate }: StaysDetailPremiumProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'reviews' | 'location' | 'host'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const gallery = useMemo(() => {
    if (stay.images && stay.images.length > 0) return stay.images;
    if (stay.image) return [stay.image, stay.image, stay.image, stay.image, stay.image, stay.image];
    return ['https://via.placeholder.com/1200x800'];
  }, [stay.images, stay.image]);

  const nextImage = useCallback(() => setGalleryIndex((p) => (p + 1) % gallery.length), [gallery.length]);
  const prevImage = useCallback(() => setGalleryIndex((p) => (p - 1 + gallery.length) % gallery.length), [gallery.length]);

  const getTierBadge = () => {
    const tier = (stay as any).tier || 'Premium';
    if (tier === 'Platinum') return { icon: '👑', label: 'PLATINUM', color: '#9D4EDD' };
    if (tier === 'Elite') return { icon: '✨', label: 'ELITE', color: '#D4AF37' };
    return { icon: '⭐', label: 'FEATURED', color: '#D4AF37' };
  };

  const tier = getTierBadge();
  const starDisplay = Math.round((stay.rating || 4.9) * 10) / 10;
  const reviewCount = (stay.reviews?.length || 0) || 89;
  const price = stay.pricePerNight || 7400;
  const bedrooms = stay.bedrooms || 4;
  const bathrooms = stay.bathrooms || 3;
  const capacity = stay.maxGuests || 8;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E11] text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={gallery[0]}
          alt={stay.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />

        {/* Quick Navigation Buttons */}
        <div className="absolute top-8 right-8 flex gap-3 z-20">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all"
          >
            <Heart size={20} fill={isFavorite ? '#D4AF37' : 'none'} color={isFavorite ? '#D4AF37' : '#000'} />
          </button>
        </div>

        {/* Hero Content: Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 to-transparent">
          <div className="max-w-6xl mx-auto">
            {/* Tier Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/70 backdrop-blur-sm border border-[#D4AF37]/30">
                <span className="text-lg">{tier.icon}</span>
                <span className="text-xs font-bold tracking-wide" style={{ color: tier.color }}>{tier.label}</span>
              </span>
            </div>

            {/* Title & Location */}
            <h1 className="text-5xl font-bold mb-3 text-white" style={{ fontFamily: '"Georgia", serif' }}>
              {stay.name}
            </h1>
            <p className="text-lg flex items-center gap-2 text-[#D4AF37]">
              <MapPin size={18} />
              {stay.type} • {stay.location}
            </p>

            {/* Rating & Price Row */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={i < Math.floor(stay.rating || 4.9) ? '#D4AF37' : 'none'}
                        color={i < Math.floor(stay.rating || 4.9) ? '#D4AF37' : '#A0A0A6'}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{starDisplay}</span>
                  <span className="text-xs text-[#A0A0A6]">({reviewCount} verified stays)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#D4AF37]">R{price.toLocaleString()}</p>
                <p className="text-sm text-[#A0A0A6]">per night</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK STATS BAR ===== */}
      <section className="sticky top-0 z-40 bg-[#1A1A1E] border-b border-[#2A2A2E] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex gap-12">
            <div className="flex items-center gap-2">
              <Bed size={20} className="text-[#D4AF37]" />
              <div>
                <p className="text-xs text-[#A0A0A6]">Bedrooms</p>
                <p className="font-semibold">{bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-[#D4AF37]" />
              <div>
                <p className="text-xs text-[#A0A0A6]">Guests</p>
                <p className="font-semibold">{capacity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={20} className="text-[#D4AF37]" />
              <div>
                <p className="text-xs text-[#A0A0A6]">Bathrooms</p>
                <p className="font-semibold">{bathrooms}</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-sm rounded-lg hover:bg-[#E5C158] transition-colors">
              💬 WhatsApp
            </button>
            <button className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-sm rounded-lg hover:bg-[#E5C158] transition-colors">
              📞 Call
            </button>
            <button className="px-4 py-2 bg-[#D4AF37] text-black font-bold text-sm rounded-lg hover:bg-[#E5C158] transition-colors">
              ✉️ Email
            </button>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <section className="max-w-6xl mx-auto px-8 py-8 border-b border-[#2A2A2E]">
        <div className="flex gap-8 overflow-x-auto">
          {(['overview', 'gallery', 'reviews', 'location', 'host'] as const).map(tab => (
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
          <div className="space-y-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About This Stay</h2>
              <p className="text-[#A0A0A6] leading-7 text-lg">{stay.description || 'Cliff-top lodge with sweeping canyon views and refined, local cuisine.'}</p>
            </div>

            {/* Highlights Grid */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Signature Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {((stay as any).highlights || ['Luxury Suites', 'Private Boma', 'Big 5 Territory', 'Private Chef'])?.map((highlight, i) => (
                  <div key={i} className="p-4 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E] hover:border-[#D4AF37]/50 transition-colors">
                    <p className="text-[#D4AF37] font-semibold">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Amenities & Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(stay.amenities || ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Pet Friendly', 'Mountain View'])?.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <span className="text-[#D4AF37]">✓</span>
                    <span className="text-white">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiences */}
            {((stay as any).experiences && (stay as any).experiences.length > 0) && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Curated Experiences</h3>
                <div className="space-y-4">
                  {((stay as any).experiences || []).map((exp, i) => (
                    <div key={i} className="p-6 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                      <p className="text-white font-semibold mb-2">{exp}</p>
                      <p className="text-sm text-[#A0A0A6]">Premium service included with your stay</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            {/* Main Gallery */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
              <div className="relative h-[600px] bg-[#1A1A1E] rounded-xl overflow-hidden group">
                <img
                  src={gallery[galleryIndex]}
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={24} color="#D4AF37" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={24} color="#D4AF37" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-2 bg-black/70 backdrop-blur-sm rounded-lg text-sm text-white">
                  {galleryIndex + 1} / {gallery.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={`h-32 rounded-lg overflow-hidden border-2 transition-all ${
                    i === galleryIndex ? 'border-[#D4AF37]' : 'border-[#2A2A2E] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Guest Reviews</h2>
            <div className="space-y-6">
              {(stay.reviews || []).map((review, i) => (
                <div key={i} className="p-6 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{(review as any).title || 'Amazing Stay'}</p>
                      <p className="text-xs text-[#A0A0A6]">by {(review as any).author} • {(review as any).type || 'Couple'}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={16} fill={j < review.rating ? '#D4AF37' : 'none'} color={j < review.rating ? '#D4AF37' : '#A0A0A6'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#A0A0A6] leading-6">{(review as any).comment || (review as any).text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOCATION TAB */}
        {activeTab === 'location' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Where You'll Be</h2>
            <div className="bg-[#1A1A1E] rounded-xl p-8 border border-[#2A2A2E]">
              <div className="h-[400px] bg-[#2A2A2E] rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Map size={48} className="text-[#D4AF37] mx-auto mb-3" />
                  <p className="text-[#A0A0A6]">Exact location shared after booking confirmation</p>
                </div>
              </div>
              <p className="text-lg text-white mb-4">📍 {stay.location}</p>
              <p className="text-[#A0A0A6]">Nestled within a private reserve, this location offers serene surroundings and authentic African wilderness experiences.</p>
            </div>
          </div>
        )}

        {/* HOST TAB */}
        {activeTab === 'host' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Host Information</h2>
            <div className="bg-[#1A1A1E] rounded-xl p-8 border border-[#2A2A2E]">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A0A0A6] flex items-center justify-center text-3xl font-bold">
                  {((stay as any).host?.name || 'Blyde Canyon Cliff Lodge')?.[0]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{((stay as any).host?.name || 'Blyde Canyon Cliff Lodge')}</h3>
                  <p className="text-[#D4AF37] font-semibold mb-3">✓ Verified Host • Hosting since {((stay as any).host?.since || 2012)}</p>
                  <p className="text-[#A0A0A6]">Responds in {((stay as any).host?.responseTime || '24 hours')}</p>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-[#2A2A2E]">
                <p className="text-[#A0A0A6] leading-7">{((stay as any).host?.bio || 'Curated collection of premium safari properties across Mpumalanga')}</p>
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#E5C158] transition-colors">
                    💬 Message Host
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== SIMILAR PROPERTIES CAROUSEL ===== */}
      <section className="max-w-6xl mx-auto px-8 py-12 mb-12">
        <h2 className="text-2xl font-bold text-white mb-8">Guests Also Love These Stays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="group rounded-xl overflow-hidden border border-[#2A2A2E] hover:border-[#D4AF37]/50 transition-all cursor-pointer">
              <div className="relative h-48 bg-[#1A1A1E] overflow-hidden">
                <img src={stay.image} alt="Similar" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 rounded text-xs font-bold text-[#D4AF37]">✨ ELITE</div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-white line-clamp-1">Similar Property</p>
                <p className="text-xs text-[#A0A0A6] mb-3">Lodge • Graskop</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                  <p className="font-bold text-[#D4AF37]">R7,400</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STICKY BOOKING BAR ===== */}
      <section className="fixed bottom-0 left-0 right-0 bg-[#1A1A1E] border-t border-[#2A2A2E] backdrop-blur-sm z-30">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-[#A0A0A6] text-sm">From R{price.toLocaleString()}</p>
            <p className="text-white font-bold">per night • Verified availability</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-colors">
              🖤 Wishlist
            </button>
            <button className="px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#E5C158] transition-colors">
              Request to Book
            </button>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES FOOTER ===== */}
      <section className="bg-[#1A1A1E] border-t border-[#2A2A2E] py-16 mt-24">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">Why Book Here?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '✓', title: 'Handpicked Luxury', desc: 'Personally curated properties' },
              { icon: '✓', title: 'Transparent Pricing', desc: 'No hidden fees ever' },
              { icon: '✓', title: '24/7 Concierge', desc: 'Dedicated support always' },
              { icon: '✓', title: 'Secure Booking', desc: 'Payment guarantees included' },
            ].map((badge, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl text-[#D4AF37] mb-3">{badge.icon}</p>
                <p className="font-bold text-white mb-2">{badge.title}</p>
                <p className="text-sm text-[#A0A0A6]">{badge.desc}</p>
              </div>
            ))}
          </div>

          {/* Final Trust Message */}
          <div className="mt-16 p-8 bg-black/50 rounded-lg border border-[#2A2A2E] text-center">
            <p className="text-[#D4AF37] font-bold mb-2">✓ LowveldHub Verified</p>
            <p className="text-[#A0A0A6]">Curated for excellence. Your privacy, protected.</p>
            <p className="text-xs text-[#7A7A80] mt-4">We are a curated digital ecosystem. Listings are verified. Excellence is expected.</p>
          </div>
        </div>
      </section>
    </div>
  );
});
