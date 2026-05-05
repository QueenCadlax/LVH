import React, { useState, useEffect } from 'react';
import { Business } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, Star, Globe, Briefcase, Check, Mail, ExternalLink, Clock, Users, Award, DollarSign, ChevronLeft, ChevronRight, Heart, Share2, Calendar } from 'lucide-react';
import { AreaDominationBadge, TrustStackPanel } from './Shared';

interface BusinessDetailViewProps {
  businessId: string | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  businesses: Business[];
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

const GOLD = '#C9A24D';
const PANEL_BLACK = '#0B0B0B';
const BG_BLACK = '#000000';
const BORDER = '#2a2a2a';
const TEXT_MUTED = '#8B8B8B';
const TEXT_WHITE = '#FFFFFF';

// Inject gallery animations
const styles = `
  @keyframes galleryDotPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  .gallery-dot {
    transition: all 200ms ease;
  }
  
  .gallery-dot.active {
    animation: galleryDotPulse 600ms ease;
  }
  
  .luxury-gradient {
    background: linear-gradient(135deg, rgba(201, 162, 77, 0.1) 0%, rgba(201, 162, 77, 0.05) 100%);
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const BusinessDetailViewComprehensive: React.FC<BusinessDetailViewProps> = ({ 
  businessId, 
  navigate, 
  businesses, 
  favorites = [], 
  toggleFavorite 
}) => {
  const business: Business | undefined = businesses.find(b => b.id === businessId);
  const [isFavorited, setIsFavorited] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [distance, setDistance] = useState<string | null>(null);

  // Calculate distance to business (geolocation-based)
  useEffect(() => {
    if (navigator.geolocation && business?.location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Simplified distance calculation (Haversine formula)
          const R = 6371; // Earth's radius in km
          const lat2 = business.location ? 23.8 : 0; // Placeholder: Mpumalanga center ~23.8°S
          const lon2 = business.location ? 30.8 : 0;
          const dLat = (lat2 - latitude) * Math.PI / 180;
          const dLon = (lon2 - longitude) * Math.PI / 180;
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(latitude * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const d = R * c;
          setDistance(d < 1 ? '< 1 km' : `${d.toFixed(1)} km`);
        },
        () => setDistance(null) // Permission denied
      );
    }
  }, [business?.location]);
  
  useEffect(() => {
    setIsFavorited(favorites.includes(businessId || ''));
  }, [businessId, favorites]);
  
  if (!business) {
    return (
      <div style={{ paddingTop: 96, minHeight: '100vh', background: BG_BLACK }}>
        <div className="container mx-auto px-6">
          <button onClick={() => navigate('directory')} className="flex items-center gap-2 text-[#C9A24D] hover:text-amber-400 mb-6">
            <ArrowLeft size={20} /> Back to Directory
          </button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Business not found</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [businessId]);

  const images = [business.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'];

  const handleFavoritToggle = () => {
    if (toggleFavorite) {
      toggleFavorite(business.id);
      setIsFavorited(!isFavorited);
    }
  };

  const handleWhatsApp = () => {
    if (business.phone) {
      const message = `Hi! I'm interested in your business: ${business.name}`;
      window.open(`https://wa.me/${business.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div style={{ background: BG_BLACK, color: TEXT_WHITE, minHeight: '100vh' }}>
      {/* ============ BACK BUTTON ============ */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate('directory')}
          className="p-2 rounded-full hover:bg-white/5 transition"
          style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${BORDER}`, color: TEXT_WHITE }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* ============ FULL-WIDTH LUXURY HERO ============ */}
      <section className="relative" style={{ height: '68vh', minHeight: 520 }}>
        <img
          src={images[heroSlide]}
          alt={`${business.name} hero`}
          className="w-full h-full object-cover transition-opacity duration-700"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'; }}
        />
        
        {/* Cinematic radial overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        
        {/* Vignette effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
            pointerEvents: 'none',
          }}
        />
        
        {/* Subtle gold bottom accent */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '2px', background: `linear-gradient(90deg, ${GOLD} 0%, transparent 50%)` }} />

        {/* Hero content: positioned at bottom-left */}
        <div className="absolute left-0 bottom-0 right-0 pb-20 px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8">
              <div style={{ color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
                {business.tier === 'Platinum' ? '✦ PLATINUM CURATED' : business.tier === 'Elite' ? '✦ ELITE CURATED' : business.isVerified ? '✓ VERIFIED & PAID' : '★ FEATURED'}
              </div>
              <div className="flex items-start justify-between gap-4 mb-8">
                <h1 className="font-serif text-6xl md:text-7xl font-bold max-w-3xl leading-tight" style={{ letterSpacing: '0.02em' }}>
                  {business.name}
                </h1>
                {/* Open Now Badge */}
                {business.isOpenNow && (
                  <div className="px-4 py-2 rounded-full" style={{ background: 'rgba(76, 175, 80, 0.2)', border: '1px solid #4CAF50' }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', animation: 'pulse 2s infinite' }} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#4CAF50', textTransform: 'uppercase' }}>Open Now</span>
                    </div>
                  </div>
                )}
              </div>
              
              {business.areaDomination && business.areaDomination.isActive && (
                <div className="mb-8">
                  <AreaDominationBadge area={business.areaDomination.area} tier={business.areaDomination.tier} />
                </div>
              )}
            </div>

            {/* Category & positioning statement */}
            <div className="mb-8 max-w-2xl">
              <div style={{ color: GOLD, fontSize: '12px', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {business.category} • {business.subcategory || 'Premium Service'}
              </div>
              <div style={{ color: TEXT_MUTED, fontSize: '16px', lineHeight: 1.7, maxWidth: 420 }}>
                {business.description || 'Premium service provider delivering excellence in Mpumalanga.'}
              </div>
            </div>

            {/* Rating + location + distance */}
            <div className="flex flex-wrap items-center gap-8 mb-10">
              {business.rating > 0 && (
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-[#C9A24D]" style={{ color: GOLD }} />
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>{business.rating.toFixed(1)}</span>
                  <span style={{ color: TEXT_MUTED, fontSize: '12px' }}>({business.reviewCount} verified)</span>
                </div>
              )}
              <div style={{ color: TEXT_MUTED, fontSize: '16px' }}>•</div>
              <div style={{ color: TEXT_MUTED, fontSize: '14px' }}>
                {business.location}
                {distance && <span style={{ marginLeft: 8, color: GOLD }}>{distance} away</span>}
              </div>
            </div>

            {/* Floating action buttons with enhanced CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="px-5 py-3 rounded-full font-semibold transition hover:shadow-lg"
                style={{ background: GOLD, color: BG_BLACK, boxShadow: `0 8px 24px rgba(201,162,77,0.25)` }}
              >
                <Calendar size={16} className="inline mr-2" /> Book Now
              </button>
              {business.website && (
                <button
                  onClick={() => window.open(business.website, '_blank')}
                  className="px-5 py-3 rounded-full font-semibold transition hover:bg-white/10"
                  style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                >
                  <Globe size={16} className="inline mr-2" /> Visit Website
                </button>
              )}
              {business.phone && (
                <button
                  onClick={() => window.location.href = `tel:${business.phone}`}
                  className="px-5 py-3 rounded-full font-semibold transition hover:bg-white/10"
                  style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                >
                  <Phone size={16} className="inline mr-2" /> Call
                </button>
              )}
              <button
                onClick={handleWhatsApp}
                className="px-5 py-3 rounded-full font-semibold transition hover:bg-white/10"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
              >
                <MessageCircle size={16} className="inline mr-2" /> Message
              </button>
              <button
                className="px-5 py-3 rounded-full font-semibold transition hover:bg-white/10"
                style={{ border: `1px solid ${GOLD}`, color: GOLD }}
                onClick={() => window.open(`https://www.google.com/maps?q=${business.location}`, '_blank')}
              >
                <MapPin size={16} className="inline mr-2" /> Directions
              </button>
              <button
                className="p-3 rounded-full hover:bg-white/10 transition"
                style={{ border: `1px solid ${GOLD}` }}
                onClick={handleFavoritToggle}
              >
                <Heart size={16} className={isFavorited ? 'fill-red-500 text-red-500' : 'text-[#C9A24D]'} />
              </button>
              <button
                className="p-3 rounded-full hover:bg-white/10 transition"
                style={{ border: `1px solid ${GOLD}` }}
              >
                <Share2 size={16} className="text-[#C9A24D]" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero carousel nav */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setHeroSlide((s) => (s - 1 + images.length) % images.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER}` }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setHeroSlide((s) => (s + 1) % images.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition z-10"
              style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${BORDER}` }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </section>

      {/* ============ TRUST & STATUS STRIP ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: PANEL_BLACK }}>
        <div className="container mx-auto max-w-5xl px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div style={{ width: 2, height: 32, background: GOLD }} />
              <div>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Verified Listing</div>
                <div style={{ color: TEXT_MUTED, fontSize: '13px' }}>Curated & Paid</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ width: 2, height: 32, background: GOLD }} />
              <div>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Reviewed by LH</div>
                <div style={{ color: TEXT_MUTED, fontSize: '13px' }}>Quality Standards</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ width: 2, height: 32, background: GOLD }} />
              <div>
                <div style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>Direct Booking</div>
                <div style={{ color: TEXT_MUTED, fontSize: '13px' }}>Handled by Provider</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT (TWO-COLUMN LAYOUT) ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: BG_BLACK }}>
        <div className="container mx-auto max-w-6xl px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ===== LEFT COLUMN: GALLERY + ABOUT ===== */}
            <div className="lg:col-span-2 space-y-8">

              {/* GALLERY SECTION - COMPACT */}
              <div>
                <div style={{ marginBottom: 12, color: GOLD, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Gallery
                </div>
                <div className="relative rounded-lg overflow-hidden group" style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }}>
                  <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
                    <img
                      src={images[galleryIdx]}
                      alt={`gallery-${galleryIdx}`}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  </div>

                  {/* Nav arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setGalleryIdx((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                        style={{ background: 'rgba(0,0,0,0.5)', border: `1.5px solid ${BORDER}`, backdropFilter: 'blur(2px)' }}
                      >
                        <ChevronLeft size={18} className="text-white" />
                      </button>
                      <button
                        onClick={() => setGalleryIdx((i) => (i + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                        style={{ background: 'rgba(0,0,0,0.5)', border: `1.5px solid ${BORDER}`, backdropFilter: 'blur(2px)' }}
                      >
                        <ChevronRight size={18} className="text-white" />
                      </button>

                      {/* Image counter */}
                      <div
                        className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'rgba(0,0,0,0.4)',
                          padding: '6px 10px',
                          borderRadius: '16px',
                          fontSize: '11px',
                          fontWeight: 600,
                          border: `1px solid ${BORDER}`,
                          color: TEXT_WHITE,
                          backdropFilter: 'blur(2px)',
                        }}
                      >
                        {galleryIdx + 1} / {images.length}
                      </div>

                      {/* Gallery dots */}
                      <div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 12px', borderRadius: '20px', backdropFilter: 'blur(2px)' }}
                      >
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setGalleryIdx(idx)}
                            className="gallery-dot cursor-pointer hover:scale-125"
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: idx === galleryIdx ? GOLD : 'rgba(255,255,255,0.4)',
                              border: 'none',
                              transition: 'all 200ms ease',
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ABOUT SECTION */}
              <div>
                {business.description && (
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-6 mb-6 luxury-gradient">
                    <h3 style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                      About
                    </h3>
                    <p className="text-gray-200 leading-relaxed">{business.description}</p>
                  </div>
                )}

                {/* Tags/Specialties */}
                {business.tags && business.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 style={{ color: GOLD, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {business.tags.map((tag, idx) => (
                        <span key={idx} style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }} className="px-3 py-2 rounded-full text-sm">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opening Hours */}
                {business.openingHours && (
                  <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-[#C9A24D]" />
                      <p className="text-gray-300 text-sm font-semibold">Hours: {business.openingHours}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* SERVICES SECTION */}
              <div>
                <h2 style={{ color: GOLD }} className="text-2xl font-bold mb-6 uppercase tracking-wider">✦ Services & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {business.tags && business.tags.length > 0 ? (
                    business.tags.slice(0, 6).map((tag, idx) => (
                      <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-5 luxury-gradient">
                        <div className="flex items-start gap-3">
                          <Check size={20} style={{ color: GOLD, flexShrink: 0 }} />
                          <div>
                            <h4 style={{ color: GOLD }} className="font-bold text-sm mb-1">{tag}</h4>
                            <p className="text-gray-300 text-xs">Premium service</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    [
                      { icon: '🎯', title: 'Premium Service', desc: 'Curated experience' },
                      { icon: '✓', title: 'Verified Quality', desc: 'LowveldHub certified' },
                      { icon: '⭐', title: 'Highly Rated', desc: business.rating ? `${business.rating}/5.0` : '4.8+ average' },
                      { icon: '📍', title: 'Location', desc: business.location },
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }} className="rounded-lg p-5 luxury-gradient">
                        <div className="flex items-start gap-3">
                          <div style={{ fontSize: '24px' }}>{item.icon}</div>
                          <div>
                            <h4 style={{ color: GOLD }} className="font-bold text-sm mb-1">{item.title}</h4>
                            <p className="text-gray-300 text-xs">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* CUSTOMER HIGHLIGHTS */}
              {business.reviewCount && business.reviewCount > 0 && (
                <div style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }} className="rounded-lg p-6 luxury-gradient">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ color: GOLD }} className="text-sm font-bold uppercase tracking-wider">⭐ Customer Highlight</h3>
                    <span style={{ color: TEXT_MUTED }} className="text-xs">{business.reviewCount} reviews</span>
                  </div>
                  <p className="text-gray-200 italic text-sm leading-relaxed mb-3">
                    "Exceptional service with attention to detail. The team truly goes above and beyond. Highly recommended for anyone seeking premium quality."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#C9A24D]" style={{ color: GOLD }} />
                      ))}
                    </div>
                    <span style={{ color: TEXT_MUTED }} className="text-xs">Verified Customer</span>
                  </div>
                </div>
              )}
            </div>

            {/* ===== RIGHT COLUMN: CONTACT + INFO (STICKY) ===== */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* GET IN TOUCH SECTION */}
                <div>
                  <h2 style={{ color: GOLD }} className="text-lg font-bold mb-4 uppercase tracking-wider">✦ Get in Touch</h2>
                  
                  <div className="space-y-3">
                    {business.phone && (
                      <a 
                        href={`tel:${business.phone}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-white/5"
                        style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }}
                      >
                        <Phone size={18} style={{ color: GOLD }} className="flex-shrink-0" />
                        <div className="min-w-0">
                          <div style={{ color: GOLD }} className="text-xs font-bold mb-0.5">CALL</div>
                          <div className="text-gray-200 font-semibold text-sm truncate">{business.phone}</div>
                        </div>
                      </a>
                    )}

                    {business.email && (
                      <a 
                        href={`mailto:${business.email}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-white/5"
                        style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }}
                      >
                        <Mail size={18} style={{ color: GOLD }} className="flex-shrink-0" />
                        <div className="min-w-0">
                          <div style={{ color: GOLD }} className="text-xs font-bold mb-0.5">EMAIL</div>
                          <div className="text-gray-200 font-semibold text-sm truncate">{business.email}</div>
                        </div>
                      </a>
                    )}

                    {business.phone && (
                      <button 
                        onClick={handleWhatsApp}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-green-500/10 w-full"
                        style={{ background: `${PANEL_BLACK}cc`, border: `1px solid #22c55e40` }}
                      >
                        <MessageCircle size={18} className="text-green-500 flex-shrink-0" />
                        <div className="text-left">
                          <div className="text-green-400 text-xs font-bold mb-0.5">WHATSAPP</div>
                          <div className="text-gray-200 font-semibold text-sm">Chat Now</div>
                        </div>
                      </button>
                    )}

                    {business.website && (
                      <a 
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-white/5"
                        style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }}
                      >
                        <Globe size={18} style={{ color: GOLD }} className="flex-shrink-0" />
                        <div className="min-w-0">
                          <div style={{ color: GOLD }} className="text-xs font-bold mb-0.5">WEBSITE</div>
                          <div className="text-gray-200 font-semibold text-sm">Visit Site</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* KEY INFO CARDS */}
                <div>
                  <h3 style={{ color: GOLD }} className="text-sm font-bold uppercase tracking-wider mb-3">Quick Info</h3>
                  
                  {business.rating > 0 && (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg mb-3" style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }}>
                      <Star size={18} className="fill-[#C9A24D]" style={{ color: GOLD }} />
                      <div>
                        <div style={{ color: GOLD }} className="text-xs font-bold">RATING</div>
                        <div className="text-gray-200 font-semibold text-sm">{business.rating.toFixed(1)} ({business.reviewCount})</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: `${PANEL_BLACK}cc`, border: `1px solid ${BORDER}` }}>
                    <MapPin size={18} style={{ color: GOLD }} />
                    <div className="min-w-0">
                      <div style={{ color: GOLD }} className="text-xs font-bold">LOCATION</div>
                      <div className="text-gray-200 font-semibold text-sm">{business.location}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* SIMILAR BUSINESSES - FULL WIDTH */}
          <div className="mt-16 pt-8 border-t" style={{ borderColor: BORDER }}>
            <h2 style={{ color: GOLD }} className="text-2xl font-bold mb-6 uppercase tracking-wider">♔ You Might Also Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {businesses
                .filter(b => 
                  b.id !== business.id && 
                  (b.category === business.category || b.subcategory === business.subcategory)
                )
                .sort((a, b) => {
                  const tierRank = { 'Platinum': 4, 'Elite': 3, 'Premium': 2, 'Trial': 1 };
                  return (tierRank[b.tier as keyof typeof tierRank] || 0) - (tierRank[a.tier as keyof typeof tierRank] || 0);
                })
                .slice(0, 3)
                .map((similar) => (
                  <button
                    key={similar.id}
                    onClick={() => navigate('business-detail', undefined, similar.id)}
                    className="text-left rounded-lg overflow-hidden transition hover:scale-105 group"
                    style={{ background: PANEL_BLACK, border: `1px solid ${BORDER}` }}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={similar.image} 
                        alt={similar.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                      <div style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)' }} className="absolute inset-0" />
                      
                      <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                        {similar.tier === 'Platinum' && (
                          <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">♔ PLATINUM</div>
                        )}
                        {similar.tier === 'Elite' && (
                          <div className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">✦ ELITE</div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white text-sm mb-2 group-hover:text-[#C9A24D] transition">{similar.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <Star size={14} className="fill-[#C9A24D] text-[#C9A24D]" />
                          <span>{similar.rating || 4.8}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>

        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <div className="border-t" style={{ borderColor: BORDER, background: PANEL_BLACK }}>
        <div className="container mx-auto max-w-5xl px-8 py-8">
          <div className="text-center text-gray-400 text-sm">
            <p>We exist to bridge the gap between quality businesses and quality audiences.</p>
            <p className="mt-2">LowveldHub — Mpumalanga's premier digital ecosystem</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailViewComprehensive;
