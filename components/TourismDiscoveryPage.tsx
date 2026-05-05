import React, { useMemo, useState } from 'react';
import { destinations as destinationsData } from '../data/seeds';
import { Destination } from '../types';
import { MapPin, Star, Search, Map, Grid3x3, ChevronRight, MessageSquare } from 'lucide-react';

export default function TourismDiscoveryPage({ navigate }: { navigate?: (view: string, subview?: string | undefined, id?: string) => void }) {
  const destinations = useMemo(() => destinationsData || [], []);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Quick filter categories
  const QUICK_FILTERS = ['Nature', 'Wildlife', 'Culture & Heritage', 'Adventure', 'Shopping', 'Scenic Views'];
  const areas = Array.from(new Set(destinations.map(d => d.location).filter(Boolean))) as string[];

  // Filter destinations
  const filtered = destinations.filter(d => {
    if (selectedCategory && d.experienceCategory !== selectedCategory) return false;
    if (selectedArea && d.location !== selectedArea) return false;
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Top rated featured
  const featured = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff' }}>
      {/* ===== HERO SECTION — SHORT & POWERFUL ===== */}
      <section 
        style={{
          background: 'linear-gradient(135deg, rgba(201,162,77,0.05), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600) center/cover',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'flex-end',
          position: 'relative',
          borderBottom: '1px solid rgba(201, 162, 77, 0.2)'
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.8))' }} />
        
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          {/* Overline */}
          <div style={{ color: '#C9A24D', letterSpacing: 2, fontWeight: 600, fontSize: 12, marginBottom: 16 }}>
            MPUMALANGA EXPERIENCES
          </div>

          {/* Main Headline */}
          <h1 style={{ fontSize: 'clamp(36px, 8vw, 72px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 12 }}>
            Where do you want to go?
          </h1>

          {/* Subline */}
          <p style={{ color: '#C9A24D', fontSize: 18, fontWeight: 600 }}>
            Iconic places. Curated destinations.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              style={{
                padding: '14px 28px',
                background: '#C9A24D',
                color: '#000',
                borderRadius: 8,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Explore Destinations
            </button>
            <button
              style={{
                padding: '14px 28px',
                background: 'transparent',
                color: '#C9A24D',
                borderRadius: 8,
                fontWeight: 700,
                border: '1px solid #C9A24D',
                cursor: 'pointer',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Map size={16} /> Map View
            </button>
          </div>
        </div>
      </section>

      {/* ===== STICKY FILTER BAR ===== */}
      <section 
        style={{
          position: 'sticky',
          top: 80,
          zIndex: 40,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201, 162, 77, 0.1)',
          padding: '16px 0',
        }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {/* Search */}
          <div style={{ minWidth: 220, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#C9A24D' }} />
            <input
              type="text"
              placeholder="Search destination"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201, 162, 77, 0.3)',
                borderRadius: 6,
                color: '#fff',
                fontSize: 13,
              }}
            />
          </div>

          {/* Area Selector */}
          <select
            value={selectedArea || ''}
            onChange={(e) => setSelectedArea(e.target.value || null)}
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(201, 162, 77, 0.3)',
              borderRadius: 6,
              color: '#CFCFCF',
              fontSize: 13,
              cursor: 'pointer',
              minWidth: 140,
            }}
          >
            <option value="">📍 All Areas</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>

          {/* Category Selector */}
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            style={{
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(201, 162, 77, 0.3)',
              borderRadius: 6,
              color: '#CFCFCF',
              fontSize: 13,
              cursor: 'pointer',
              minWidth: 140,
            }}
          >
            <option value="">🏷 Category</option>
            {QUICK_FILTERS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '10px 12px',
                background: viewMode === 'grid' ? 'rgba(201, 162, 77, 0.15)' : 'transparent',
                border: viewMode === 'grid' ? '1px solid #C9A24D' : '1px solid rgba(255,255,255,0.1)',
                color: viewMode === 'grid' ? '#C9A24D' : '#CFCFCF',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Grid3x3 size={14} /> Grid
            </button>
            <button
              onClick={() => setViewMode('map')}
              style={{
                padding: '10px 12px',
                background: viewMode === 'map' ? 'rgba(201, 162, 77, 0.15)' : 'transparent',
                border: viewMode === 'map' ? '1px solid #C9A24D' : '1px solid rgba(255,255,255,0.1)',
                color: viewMode === 'map' ? '#C9A24D' : '#CFCFCF',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Map size={14} /> Map
            </button>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY QUICK ACCESS ===== */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {QUICK_FILTERS.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(prev => prev === cat ? null : cat)}
              style={{
                padding: '12px 20px',
                background: selectedCategory === cat ? 'rgba(201, 162, 77, 0.15)' : 'rgba(255,255,255,0.03)',
                border: selectedCategory === cat ? '1px solid #C9A24D' : '1px solid rgba(255,255,255,0.1)',
                color: selectedCategory === cat ? '#C9A24D' : '#CFCFCF',
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {viewMode === 'grid' ? (
          <>
            {/* Featured Section */}
            {featured.length > 0 && (
              <section className="mb-16">
                <div style={{ color: '#C9A24D', fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 16 }} className="uppercase">
                  ✦ Featured Experiences
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featured.map(d => (
                    <div key={d.id}>
                      <DestinationCard 
                        destination={d} 
                        onPress={() => navigate?.('destination-detail', undefined, d.id)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* All Destinations */}
            {filtered.length > 0 && (
              <section>
                <div style={{ color: '#C9A24D', fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 16 }} className="uppercase">
                  All Destinations ({filtered.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map(d => (
                    <div key={d.id}>
                      <DestinationCard 
                        destination={d} 
                        onPress={() => navigate?.('destination-detail', undefined, d.id)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#CFCFCF' }}>
                <MapPin size={48} style={{ margin: '0 auto 16px', color: '#C9A24D', opacity: 0.5 }} />
                <p className="text-lg font-semibold mb-4">No destinations found</p>
                <p style={{ color: '#999', marginBottom: 20 }}>Try adjusting your filters or search query</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedArea(null);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(201, 162, 77, 0.1)',
                    border: '1px solid #C9A24D',
                    color: '#C9A24D',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        ) : (
          // Map View Placeholder
          <div style={{
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '100px 40px',
            textAlign: 'center',
            color: '#CFCFCF',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <Map size={56} style={{ margin: '0 auto 24px', color: '#C9A24D', opacity: 0.6 }} />
            <p className="text-xl font-semibold mb-2">Interactive Map View</p>
            <p style={{ color: '#999' }}>Showing {filtered.length} destinations across Mpumalanga</p>
            <p style={{ color: '#666', fontSize: 12, marginTop: 16 }}>(Full integration coming soon)</p>
          </div>
        )}
      </div>

      {/* ===== FOOTER CTA ===== */}
      <section style={{
        marginTop: 80,
        borderTop: '1px solid rgba(201, 162, 77, 0.1)',
        padding: '60px 20px',
        textAlign: 'center',
        color: '#CFCFCF',
      }}>
        <p className="text-lg mb-6">Some places are better experienced with local insight.</p>
        <button
          style={{
            padding: '14px 32px',
            background: '#C9A24D',
            color: '#000',
            borderRadius: 8,
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            margin: '0 auto',
          }}
        >
          <MessageSquare size={16} /> Speak to Concierge
        </button>
      </section>
    </div>
  );
}

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
}

function DestinationCard({ destination, onPress }: DestinationCardProps) {
  return (
    <article
      onClick={onPress}
      className="rounded-xl overflow-hidden cursor-pointer group"
      style={{
        border: '1.5px solid rgba(201, 162, 77, 0.25)',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 100%)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201, 162, 77, 0.15)',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.7)';
        e.currentTarget.style.boxShadow = '0 25px 50px rgba(201, 162, 77, 0.2), inset 0 1px 0 rgba(201, 162, 77, 0.25)';
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
        e.currentTarget.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #141414 100%)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.25)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201, 162, 77, 0.15)';
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 100%)';
      }}
    >
      {/* Image Hero */}
      <div style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120"
          style={{ willChange: 'transform' }}
        />
        {/* Premium Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%)',
          transition: 'background 0.6s ease',
        }} className="group-hover:bg-gradient-to-b group-hover:from-black/30 group-hover:via-black/20 group-hover:to-black/90" />
        
        {/* Premium Tier Badge */}
        {destination.rating && destination.rating >= 4.7 && (
          <div style={{
            position: 'absolute',
            top: 14,
            left: 14,
            padding: '8px 14px',
            background: 'linear-gradient(135deg, #C9A24D 0%, #D4B86C 100%)',
            color: '#000',
            borderRadius: 999,
            fontWeight: 900,
            fontSize: 10,
            letterSpacing: '0.5px',
            boxShadow: '0 8px 16px rgba(201, 162, 77, 0.4), inset 0 1px 2px rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}>
            ⭐ ICONIC
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Name */}
        <div style={{
          fontSize: 17,
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: 10,
          lineHeight: 1.3,
          letterSpacing: '-0.3px',
        }}>
          {destination.name}
        </div>

        {/* Meta */}
        <div style={{ flex: 1, color: '#CFCFCF', fontSize: 13 }}>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} style={{ color: '#C9A24D', flexShrink: 0, opacity: 0.9 }} />
            <span style={{ color: '#D9D9D9' }}>{destination.location}</span>
          </div>
          {destination.experienceCategory && (
            <div style={{
              color: '#C9A24D',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.5px',
              opacity: 0.85,
              textTransform: 'uppercase',
            }}>
              {destination.experienceCategory}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 14,
          paddingTop: 14,
          borderTop: '1px solid rgba(201, 162, 77, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Price */}
          <div style={{ fontWeight: 800, color: '#C9A24D', fontSize: 13, letterSpacing: '-0.2px' }}>
            {destination.pricePerPerson !== undefined && destination.pricePerPerson > 0
              ? `From R${destination.pricePerPerson.toLocaleString()}`
              : 'Free'
            }
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5" style={{ color: '#C9A24D' }}>
            <Star size={14} fill="currentColor" style={{ opacity: 0.95 }} />
            <span style={{ fontSize: 12, fontWeight: 800 }}>
              {(destination.rating || 4.5).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Premium CTA Button */}
        <button
          style={{
            marginTop: 16,
            padding: '11px 16px',
            background: 'transparent',
            border: '1.5px solid rgba(201, 162, 77, 0.6)',
            color: '#C9A24D',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.3px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
            textTransform: 'uppercase',
            boxShadow: 'inset 0 1px 2px rgba(201, 162, 77, 0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 77, 0.12)';
            e.currentTarget.style.borderColor = '#C9A24D';
            e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(201, 162, 77, 0.15), 0 4px 12px rgba(201, 162, 77, 0.15)';
            e.currentTarget.style.transform = 'translateX(2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.6)';
            e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(201, 162, 77, 0.1)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Explore <ChevronRight size={13} />
        </button>
      </div>
    </article>
  );
}
