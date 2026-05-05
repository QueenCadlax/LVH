import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Business } from '../types';

export default function PropertyDetail({ business, onClose }: { business: Business; onClose: () => void }) {
  const gold = '#C9A24D';
  const gallery = useMemo(() => (business as any).images && (business as any).images.length ? (business as any).images : [business.image], [business]);
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showGalleryFull, setShowGalleryFull] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [expandAbout, setExpandAbout] = useState(false);
  const autoplay = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [business.id]);

  useEffect(() => {
    autoplay.current = window.setInterval(() => setIndex(i => (i + 1) % gallery.length), 5000);
    return () => { if (autoplay.current) window.clearInterval(autoplay.current); };
  }, [gallery.length]);

  // Get emotional tagline based on property type
  const getEmotionalLine = () => {
    const desc = (business as any).emotionalLine || business.description || '';
    if (desc.includes('safari') || desc.includes('game')) return 'A private safari retreat designed for quiet luxury and wild moments.';
    if (desc.includes('wellness') || desc.includes('retreat')) return 'Where modern comfort meets serene natural beauty, curated for total escape.';
    if (desc.includes('city') || desc.includes('urban')) return 'Urban elegance with a touch of Lowveld soul, designed for discerning guests.';
    return 'Crafted for those who seek authentic luxury and genuine experiences.';
  };

  // Amenity icons mapping
  const getAmenityIcon = (amenity: string): string => {
    const lower = amenity.toLowerCase();
    if (lower.includes('bed') || lower.includes('suite')) return '🛏';
    if (lower.includes('pool')) return '🏊';
    if (lower.includes('spa') || lower.includes('wellness')) return '💆';
    if (lower.includes('game') || lower.includes('drive')) return '🚙';
    if (lower.includes('chef') || lower.includes('dining') || lower.includes('kitchen')) return '👨‍🍳';
    if (lower.includes('boma') || lower.includes('fire')) return '🔥';
    if (lower.includes('big 5') || lower.includes('elephant') || lower.includes('wildlife')) return '🐘';
    if (lower.includes('wifi') || lower.includes('internet')) return '📡';
    if (lower.includes('air') || lower.includes('conditioning')) return '❄️';
    if (lower.includes('housekeeping') || lower.includes('service')) return '🧹';
    if (lower.includes('transfer') || lower.includes('parking')) return '🚗';
    if (lower.includes('bath')) return '🛁';
    return '✓';
  };

  // Group amenities by category
  const groupedAmenities = useMemo(() => {
    const tags = (business as any).tags || (business as any).amenities || [];
    const groups: {[key: string]: string[]} = {
      'Comfort & Living': [],
      'Wellness & Leisure': [],
      'Services': [],
      'Safari Experiences': []
    };

    tags.forEach((tag: string) => {
      const lower = tag.toLowerCase();
      if (lower.includes('bed') || lower.includes('suite') || lower.includes('housekeeping') || lower.includes('wifi') || lower.includes('air')) {
        groups['Comfort & Living'].push(tag);
      } else if (lower.includes('pool') || lower.includes('spa') || lower.includes('wellness')) {
        groups['Wellness & Leisure'].push(tag);
      } else if (lower.includes('transfer') || lower.includes('parking') || lower.includes('service')) {
        groups['Services'].push(tag);
      } else if (lower.includes('game') || lower.includes('drive') || lower.includes('safari') || lower.includes('wildlife')) {
        groups['Safari Experiences'].push(tag);
      } else {
        groups['Comfort & Living'].push(tag);
      }
    });

    return groups;
  }, [business]);

  // Quick facts (max 6) - LIMITED ICONS
  const quickFacts = useMemo(() => {
    return [
      { icon: '🛏', label: 'Luxury Suites' },
      { icon: '🔥', label: 'Private Boma' },
      { icon: '🐘', label: 'Big 5 Territory' },
      { icon: '👨‍🍳', label: 'Private Chef' },
      { icon: '🚙', label: 'Game Drives' },
      { icon: '🛁', label: 'Ensuite Bathrooms' }
    ];
  }, []);

  return (
    <div style={{ background: '#000000' }} className="min-h-screen text-white">
      {/* HERO SECTION: Premium minimalist layout */}
      <section className="w-full" style={{ minHeight: '60vh', background: '#000000' }}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: HERO CONTENT - Apple-like clean hierarchy */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Property type & location - minimal, uppercase */}
            <div className="text-xs tracking-widest" style={{ color: '#999999', letterSpacing: 1.2 }}>
              {(business as any).type || 'Luxury Lodge'} • {business.location}
            </div>

            {/* Name - premium serif, generous size */}
            <h1 className="text-6xl lg:text-7xl font-serif leading-tight" style={{ color: '#FFFFFF', fontWeight: 300 }}>
              {business.name}
            </h1>

            {/* Rating - clean design */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 20, color: gold }}>{'★'.repeat(Math.round(business.rating || 5))}</span>
                <span className="text-2xl font-semibold" style={{ color: '#FFFFFF' }}>{(business.rating || 5).toFixed(1)}</span>
              </div>
              <span className="text-sm" style={{ color: '#999999' }}>
                {business.reviewCount || 0} verified stays
              </span>
            </div>

            {/* Price - subtle, premium */}
            <div className="pt-4" style={{ color: gold, fontSize: 18, fontWeight: 300, letterSpacing: 0.5 }}>
              {business.priceLevel || 'From R12,800'} / night
            </div>

            {/* EMOTIONAL LINE - Premium copy */}
            <p className="text-lg leading-relaxed pt-6" style={{ color: '#DDDDDD', fontWeight: 300, maxWidth: '90%' }}>
              {getEmotionalLine()}
            </p>

            {/* HERO CTAs - Minimal, premium buttons */}
            <div className="flex items-center gap-4 pt-8">
              <button className="px-8 py-3 rounded-lg" style={{ background: gold, color: '#000000', fontWeight: 600, fontSize: 15, border: 'none', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                Request to Book
              </button>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-lg" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = `${gold}20`; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                  💬
                </button>
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-lg" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = `${gold}20`; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                  📞
                </button>
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-lg" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = `${gold}20`; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                  ✉️
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: IMAGE STACK - Airbnb-like gallery preview */}
          <div className="relative hidden lg:block" style={{ height: '500px' }}>
            {/* Main hero image - premium shadow and border */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <img src={gallery[index]} alt={business.name} className="w-full h-full object-cover" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 100%)' }} />
            </div>

            {/* Stacked preview thumbnails - premium grid */}
            <div className="absolute bottom-4 right-4 space-y-2" style={{ width: '110px' }}>
              {gallery.slice(0, 3).map((g, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    if (autoplay.current) window.clearInterval(autoplay.current);
                  }}
                  className="w-full h-20 rounded-lg overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300 border"
                  style={{ borderColor: i === index ? gold : 'rgba(255,255,255,0.1)', boxShadow: i === index ? `0 0 12px ${gold}40` : '0 2px 8px rgba(0,0,0,0.3)' }}
                >
                  <img src={g} className="w-full h-full object-cover" />
                </button>
              ))}
              <button 
                onClick={() => setShowGalleryFull(true)}
                className="w-full py-2 rounded-lg text-xs font-semibold hover:opacity-80 transition-all"
                style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }}
              >
                View All ({gallery.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS STRIP - Premium spacing and clean design */}
      <section className="mt-16 py-16 border-t border-b" style={{ borderColor: 'rgba(201,162,77,0.15)', background: 'rgba(201,162,77,0.01)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {quickFacts.map((fact, i) => (
              <div key={i} className="flex items-start gap-4">
                <div style={{ fontSize: 28 }}>{fact.icon}</div>
                <div className="text-sm font-medium leading-tight" style={{ color: '#FFFFFF' }}>
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTIONS - Premium luxury cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN: Main Content - Apple minimalist spacing */}
          <div className="lg:col-span-2 space-y-16">
            {/* ABOUT THIS STAY - Clean typography + emotional line */}
            <article>
              <h2 className="text-4xl font-serif" style={{ color: '#FFFFFF', fontWeight: 300 }}>About this stay</h2>
              <div style={{ width: 40, height: 1, background: gold, marginTop: 16, marginBottom: 24 }} />
              
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#DDDDDD', fontWeight: 300 }}>
                <p>{business.description || 'A refined luxury property offering world-class hospitality and unforgettable experiences.'}</p>
                
                {/* EMOTIONAL LINE */}
                <p style={{ color: gold, fontStyle: 'italic', fontWeight: 300 }}>
                  Designed for guests seeking privacy, space, and an authentic connection to the African wilderness.
                </p>
                
                {expandAbout && (
                  <p style={{ color: '#DDDDDD' }}>
                    Set within pristine Lowveld wilderness, this property offers an intimate escape where modern comfort meets untamed beauty. Every detail is curated for effortless luxury and genuine connection to nature.
                  </p>
                )}
                
                {!expandAbout && (
                  <button
                    onClick={() => setExpandAbout(true)}
                    className="text-sm font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: gold, background: 'transparent', border: 'none', padding: 0 }}
                  >
                    Show more →
                  </button>
                )}
              </div>
            </article>

            {/* AMENITIES - Premium grouped with visual section cards */}
            <article>
              <h2 className="text-4xl font-serif" style={{ color: '#FFFFFF', fontWeight: 300 }}>Amenities & Features</h2>
              <div style={{ width: 40, height: 1, background: gold, marginTop: 16, marginBottom: 24 }} />
              
              <div className="space-y-12">
                {Object.entries(groupedAmenities).map(([group, items]) => (
                  items.length > 0 && (
                    <div key={group} className="rounded-xl p-6" style={{ border: `1px solid rgba(201,162,77,0.1)`, background: 'rgba(201,162,77,0.02)' }}>
                      <h3 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: gold, letterSpacing: 1 }}>
                        {group}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                        {items.map((item, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div style={{ fontSize: 24, minWidth: 24 }}>{getAmenityIcon(item)}</div>
                            <span style={{ color: '#DDDDDD', fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </article>

            {/* SIGNATURE EXPERIENCES - Premium cards with spacing */}
            <article>
              <h2 className="text-4xl font-serif" style={{ color: '#FFFFFF', fontWeight: 300 }}>Signature Experiences</h2>
              <div style={{ width: 40, height: 1, background: gold, marginTop: 16, marginBottom: 24 }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: 'Morning & Sunset Game Drives', desc: 'Two guided drives daily with expert guides in private vehicles.' },
                  { title: 'Bush Dining', desc: 'Intimate boma dining experiences under the stars.' },
                  { title: 'Spa & Wellness', desc: 'Private treatments in natural settings.' },
                  { title: 'Private Chef Service', desc: 'Personalized menus crafted to your preferences.' }
                ].slice(0, 4).map((exp: any, i: number) => (
                  <div key={i} className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg" style={{ border: `1px solid rgba(201,162,77,0.15)`, background: 'rgba(201,162,77,0.03)', boxShadow: 'hover' }}>
                    <h3 className="font-semibold text-lg" style={{ color: '#FFFFFF', marginBottom: 12 }}>{exp.title}</h3>
                    <p style={{ color: '#DDDDDD', fontSize: 15, lineHeight: 1.6 }}>{exp.desc}</p>
                  </div>
                ))}
              </div>
            </article>
            <article>
              <h2 className="text-4xl font-serif" style={{ color: '#FFFFFF', fontWeight: 300 }}>Where You'll Be</h2>
              <div style={{ width: 40, height: 1, background: gold, marginTop: 16, marginBottom: 24 }} />
              
              <p className="text-lg leading-relaxed" style={{ color: '#DDDDDD', marginBottom: 24, fontWeight: 300 }}>
                Nestled within a private reserve near {business.location}.
              </p>
              
              <div className="w-full rounded-2xl overflow-hidden" style={{ height: '350px', background: '#0A0A0A', border: '1px solid rgba(201,162,77,0.15)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}>
                <div className="w-full h-full flex items-center justify-center" style={{ color: '#CFCFCF', fontSize: 14 }}>
                  📍 Map — Exact location shared after booking confirmation
                </div>
              </div>
            </article>

            {/* HOST PROFILE - Premium trust signals */}
            <article>
              <h2 className="text-4xl font-serif" style={{ color: '#FFFFFF', fontWeight: 300 }}>Hosted by</h2>
              <div style={{ width: 40, height: 1, background: gold, marginTop: 16, marginBottom: 24 }} />
              
              <div className="rounded-2xl p-8 transition-all duration-300" style={{ border: `1px solid rgba(201,162,77,0.15)`, background: 'rgba(201,162,77,0.02)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                <div className="flex items-start justify-between gap-8">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)', border: '1px solid rgba(201,162,77,0.2)' }}>
                      <img src={business.logo || gallery[0]} alt="Host" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 18, marginBottom: 6 }}>
                        {(business as any).hostName || business.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <span style={{ color: gold }}>✓ Verified</span>
                        <span style={{ color: '#999999' }}>•</span>
                        <span style={{ color: '#DDDDDD' }}>Hosting since 2012</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <span style={{ color: '#DDDDDD' }}>Responds in {(business as any).hostResponseTime || '24 hours'}</span>
                      </div>
                      <p style={{ color: '#CFCFCF', fontSize: 14, lineHeight: 1.6 }}>
                        Curated collection of premium safari properties across Mpumalanga
                      </p>
                    </div>
                  </div>
                  <button className="px-6 py-3 rounded-lg text-sm font-semibold hidden sm:block transition-all duration-300" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }}>
                    Contact
                  </button>
                </div>
              </div>
            </article>

            {/* REVIEWS - Premium featured quotes (no star icons inside) */}
            <article>
              <h2 className="text-4xl font-serif" style={{ color: '#FFFFFF', fontWeight: 300 }}>Guest Reviews</h2>
              <div style={{ width: 40, height: 1, background: gold, marginTop: 16, marginBottom: 24 }} />
              
              {/* RATING HEADER - Once at top */}
              <div className="mb-12 pb-8 border-b" style={{ borderColor: 'rgba(201,162,77,0.15)' }}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ fontSize: 18, color: gold }}>★</span>
                    ))}
                  </div>
                  <span className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>5.0</span>
                  <span style={{ color: '#999999', fontSize: 14 }}>112 verified stays</span>
                </div>
              </div>
              
              <div className="space-y-8">
                {[
                  { quote: 'An unforgettable private safari that redefined our expectations of luxury.', name: 'A. van der Merwe', type: 'Couple' },
                  { quote: 'Impeccable service, thoughtful design, and breathtaking views. Truly world-class.', name: 'L. Nkosi', type: 'Family' },
                  { quote: 'Seamless, intimate and wild. Everything a safari should be.', name: 'M. Petersen', type: 'Friends' }
                ].slice(0, 3).map((review: any, i: number) => (
                  <div key={i} className="py-8 border-b" style={{ borderColor: 'rgba(201,162,77,0.1)' }}>
                    <p className="text-lg italic leading-relaxed" style={{ color: '#FFFFFF', marginBottom: 12, fontWeight: 300 }}>
                      "{review.quote}"
                    </p>
                    <p className="text-sm" style={{ color: gold, fontWeight: 600 }}>
                      — {review.name} · {review.type}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* RIGHT COLUMN: STICKY BOOKING SIDEBAR - Premium luxury panel */}
          <aside className="lg:col-span-1">
            <div style={{ position: 'sticky', top: 120 }}>
              {/* BOOKING CARD */}
              <div className="rounded-2xl p-8 text-center transition-all duration-300" style={{ border: `1px solid rgba(201,162,77,0.2)`, background: 'rgba(201,162,77,0.04)', boxShadow: '0 12px 32px rgba(0,0,0,0.25)' }}>
                <div style={{ color: gold, fontSize: 24, fontWeight: 600, marginBottom: 6 }}>
                  {business.priceLevel || 'From R12,800'}
                </div>
                <div className="text-sm mb-8" style={{ color: '#999999', fontWeight: 300 }}>
                  per night • Verified availability
                </div>
                
                <button className="w-full px-6 py-4 rounded-lg text-sm font-semibold transition-all duration-300" style={{ background: gold, color: '#000000', marginBottom: 12, fontSize: 15 }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  🖤 Request to Book
                </button>
                
                <div className="space-y-3">
                  <button className="w-full py-3 rounded-lg text-sm font-semibold transition-all" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }}>
                    💬 WhatsApp
                  </button>
                  <button className="w-full py-3 rounded-lg text-sm font-semibold transition-all" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }}>
                    📞 Call
                  </button>
                  <button className="w-full py-3 rounded-lg text-sm font-semibold transition-all" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }}>
                    ✉️ Message
                  </button>
                </div>
              </div>

              {/* TRUST & VERIFICATION BADGE */}
              <div className="mt-8 p-6 rounded-2xl text-center text-xs" style={{ border: '1px solid rgba(201,162,77,0.15)', background: 'rgba(201,162,77,0.02)' }}>
                <div style={{ color: gold, fontWeight: 600, marginBottom: 8, fontSize: 13 }}>
                  ✓ LowveldHub Verified
                </div>
                <div style={{ color: '#CFCFCF', lineHeight: 1.6, fontSize: 13 }}>
                  Curated for excellence. Your privacy, protected.
                </div>
              </div>

              {/* FLEXIBLE BOOKING INFO */}
              <div className="mt-6 p-6 rounded-2xl" style={{ border: '1px solid rgba(201,162,77,0.1)', background: 'rgba(15,15,15,0.5)' }}>
                <h4 style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Why Book Here?</h4>
                <ul className="space-y-3 text-xs" style={{ color: '#DDDDDD' }}>
                  <li className="flex gap-3">
                    <span style={{ color: gold }}>✓</span>
                    <span>Handpicked luxury properties</span>
                  </li>
                  <li className="flex gap-3">
                    <span style={{ color: gold }}>✓</span>
                    <span>Transparent pricing, no hidden fees</span>
                  </li>
                  <li className="flex gap-3">
                    <span style={{ color: gold }}>✓</span>
                    <span>24/7 dedicated concierge support</span>
                  </li>
                  <li className="flex gap-3">
                    <span style={{ color: gold }}>✓</span>
                    <span>Secure payment & guarantees</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FANCY GALLERY MODAL */}
      {showGalleryFull && (
        <div className="fixed inset-0 z-50" style={{ background: '#000000' }}>
          {/* Close button */}
          <button
            onClick={() => setShowGalleryFull(false)}
            className="absolute top-8 right-8 z-10 text-3xl hover:opacity-70 transition"
            style={{ color: gold }}
          >
            ✕
          </button>

          {/* Gallery header */}
          <div className="absolute top-0 left-0 right-0 p-8 border-b z-10" style={{ borderColor: 'rgba(201,162,77,0.2)', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))' }}>
            <h2 className="text-3xl font-serif" style={{ color: '#FFFFFF' }}>Gallery</h2>
            <p className="text-sm mt-2" style={{ color: '#CFCFCF' }}>{gallery.length} photographs</p>
          </div>

          {/* Grid view - scrollable */}
          <div className="w-full h-full overflow-y-auto pt-32 pb-12" style={{ background: '#000000' }}>
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setLightboxIndex(i);
                      setShowLightbox(true);
                    }}
                    className="group relative overflow-hidden rounded-lg aspect-square transition-all duration-300 hover:shadow-2xl"
                    style={{ 
                      border: '1px solid rgba(201,162,77,0.2)',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-sm font-semibold" style={{ color: gold }}>View Full Size</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX FULL SCREEN VIEWER */}
      {showLightbox && (
        <div className="fixed inset-0 z-50" style={{ background: '#000000' }}>
          {/* Navigation - Top Bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-8 z-10" style={{ borderBottom: '1px solid rgba(201,162,77,0.2)' }}>
            <button
              onClick={() => setShowLightbox(false)}
              className="text-2xl hover:opacity-70 transition"
              style={{ color: gold }}
            >
              ← Back
            </button>
            <span className="text-sm" style={{ color: '#CFCFCF' }}>
              {lightboxIndex + 1} / {gallery.length}
            </span>
            <button
              onClick={() => setShowLightbox(false)}
              className="text-3xl hover:opacity-70 transition"
              style={{ color: gold }}
            >
              ✕
            </button>
          </div>

          {/* Main image display */}
          <div className="w-full h-full flex items-center justify-center p-8 pt-24">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={gallery[lightboxIndex]}
                alt={`Full ${lightboxIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Side navigation */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)}
                className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl hover:opacity-70 transition"
                style={{ color: gold }}
              >
                ‹
              </button>
              <button
                onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-4xl hover:opacity-70 transition"
                style={{ color: gold }}
              >
                ›
              </button>
            </div>
          </div>

          {/* Bottom thumbnail strip */}
          <div className="absolute bottom-0 left-0 right-0 p-8 overflow-x-auto" style={{ borderTop: '1px solid rgba(201,162,77,0.2)', background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))' }}>
            <div className="flex gap-4 justify-center">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className="flex-shrink-0 transition-all duration-300 rounded-lg overflow-hidden hover:opacity-100 opacity-50"
                  style={{
                    width: 80,
                    height: 80,
                    border: i === lightboxIndex ? `2px solid ${gold}` : '1px solid rgba(201,162,77,0.2)',
                  }}
                >
                  <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
