import React, { useMemo, useState } from 'react';
import { destinations as destinationsData } from '../data/seeds';
import { Destination } from '../types';
import { MapPin, Star, Map, Grid3x3, ChevronRight, MessageSquare, ChevronDown } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  emoji: string;
  filter: (d: Destination) => boolean;
}

interface Theme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  filter: (d: Destination) => boolean;
}

export default function TourismExperiencesPage({ navigate }: { navigate?: (view: string, subview?: string | undefined, id?: string) => void }) {
  const destinations = useMemo(() => destinationsData || [], []);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Category system with icons
  const CATEGORIES: Category[] = [
    { id: 'nature', label: 'Nature', emoji: '🌿', filter: (d) => d.experienceCategory === 'Nature' },
    { id: 'wildlife', label: 'Wildlife', emoji: '🐘', filter: (d) => d.experienceCategory === 'Wildlife Encounters' },
    { id: 'scenic', label: 'Scenic Views', emoji: '🏔', filter: (d) => d.experienceCategory === 'Sightseeing' },
    { id: 'adventure', label: 'Adventure', emoji: '🧗', filter: (d) => ['Hiking', 'Adventure Activities'].includes(d.experienceCategory || '') },
    { id: 'culture', label: 'Culture & Heritage', emoji: '🏛', filter: (d) => d.experienceCategory === 'Cultural Sites' },
    { id: 'food', label: 'Food & Wine', emoji: '🍷', filter: (d) => d.experienceCategory === 'Food & Wine' },
    { id: 'shopping', label: 'Shopping', emoji: '🛍', filter: (d) => d.experienceCategory === 'Shopping & Markets' },
    { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦', filter: (d) => d.experienceCategory?.includes('Family') || false },
    { id: 'boat', label: 'Boat Cruises', emoji: '🚤', filter: (d) => d.experienceCategory === 'Boat & Water' },
  ];

  // Themed experience rows
  const THEMES: Theme[] = [
    {
      id: 'wild',
      name: 'Into the Wild',
      emoji: '🌿',
      description: 'Untamed landscapes, pure nature',
      filter: (d) => ['Nature', 'Hiking', 'Scenic Views'].includes(d.experienceCategory || ''),
    },
    {
      id: 'icons',
      name: 'African Icons',
      emoji: '🐘',
      description: 'Wildlife encounters that define a continent',
      filter: (d) => d.experienceCategory === 'Wildlife Encounters',
    },
    {
      id: 'leisure',
      name: 'Luxury & Leisure',
      emoji: '🍷',
      description: 'Sophisticated experiences for discerning tastes',
      filter: (d) => ['Food & Wine', 'Shopping & Markets'].includes(d.experienceCategory || ''),
    },
    {
      id: 'vistas',
      name: 'Views Worth the Drive',
      emoji: '🏔',
      description: 'Panoramic moments that take your breath away',
      filter: (d) => d.experienceCategory === 'Sightseeing',
    },
  ];

  const areas = Array.from(new Set(destinations.map(d => d.location).filter(Boolean))) as string[];

  // Filter logic
  const filtered = destinations.filter(d => {
    if (selectedArea && d.location !== selectedArea) return false;
    if (selectedCategories.length > 0) {
      const matchesCategory = CATEGORIES.filter(cat => selectedCategories.includes(cat.id)).some(cat => cat.filter(d));
      if (!matchesCategory) return false;
    }
    return true;
  });

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff' }}>

      {/* ===== HERO: CLEAN, MINIMAL, APPLE-STYLE ===== */}
      <section style={{ background: '#000', minHeight: '55vh', paddingY: 48 }} className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: HERO CONTENT */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Category Label */}
            <div style={{ color: '#999', letterSpacing: 2, fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>
              Mpumalanga Experiences
            </div>

            {/* Main Headline: Serif, Large, White */}
            <h1 style={{
              fontSize: 'clamp(48px, 10vw, 72px)',
              fontWeight: 300,
              color: '#fff',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              fontFamily: '"Georgia", "Garamond", serif',
            }}>
              Experience Mpumalanga
            </h1>

            {/* Tagline: Gold */}
            <div style={{
              fontSize: 18,
              fontWeight: 400,
              color: '#C9A24D',
              lineHeight: 1.6,
              maxWidth: 400,
            }}>
              Curated · Private · Iconic
            </div>

            {/* Description */}
            <p style={{
              fontSize: 15,
              color: '#ccc',
              lineHeight: 1.7,
              maxWidth: 500,
            }}>
              Exclusive access to the province's most iconic destinations & adventures.
            </p>

            {/* CTAs */}
            <div className="flex gap-4 pt-4 flex-wrap">
              <button
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '14px 28px',
                  background: '#C9A24D',
                  color: '#000',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(201, 162, 77, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Explore Experiences
              </button>
            </div>
          </div>

          {/* RIGHT: KEY STATS */}
          <div className="grid grid-cols-2 gap-8">
            <div style={{ borderLeft: '1px solid rgba(201, 162, 77, 0.3)', paddingLeft: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#C9A24D', marginBottom: 4 }}>
                {destinations.length}+
              </div>
              <div style={{ fontSize: 13, color: '#999' }}>
                Curated Experiences
              </div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(201, 162, 77, 0.3)', paddingLeft: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#C9A24D', marginBottom: 4 }}>
                65+
              </div>
              <div style={{ fontSize: 13, color: '#999' }}>
                Mpumalanga Areas
              </div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(201, 162, 77, 0.3)', paddingLeft: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#C9A24D', marginBottom: 4 }}>
                4.7★
              </div>
              <div style={{ fontSize: 13, color: '#999' }}>
                Average Rating
              </div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(201, 162, 77, 0.3)', paddingLeft: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#C9A24D', marginBottom: 4 }}>
                ✓
              </div>
              <div style={{ fontSize: 13, color: '#999' }}>
                Verified Listings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY FILTERS ===== */}
      <section id="categories" style={{ background: '#0a0a0a', paddingY: 40, borderTop: '1px solid rgba(201, 162, 77, 0.1)' }} className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <h2 style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: 700,
            marginBottom: 32,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}>
            Browse by Experience
          </h2>

          {/* Category Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                style={{
                  padding: '16px 12px',
                  background: selectedCategories.includes(cat.id) ? 'rgba(201, 162, 77, 0.15)' : '#000',
                  border: selectedCategories.includes(cat.id) ? '1.5px solid #C9A24D' : '1px solid rgba(201, 162, 77, 0.2)',
                  borderRadius: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  if (!selectedCategories.includes(cat.id)) {
                    e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.5)';
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(201, 162, 77, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedCategories.includes(cat.id)) {
                    e.currentTarget.style.borderColor = '1px solid rgba(201, 162, 77, 0.2)';
                    e.currentTarget.style.background = '#fafaf8';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{ fontSize: 28 }}>{cat.emoji}</div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: selectedCategories.includes(cat.id) ? '#C9A24D' : '#666',
                  letterSpacing: '0.3px',
                  lineHeight: 1.3,
                }}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          {/* Area Filter */}
          <div style={{ marginTop: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#999' }}>Filter by Area:</label>
            <select
              value={selectedArea || ''}
              onChange={(e) => setSelectedArea(e.target.value || null)}
              style={{
                padding: '10px 14px',
                background: '#1a1a1a',
                border: '1px solid rgba(201, 162, 77, 0.3)',
                borderRadius: 8,
                color: '#fff',
                fontWeight: 500,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A24D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
              }}
            >
              <option value="">📍 All Areas</option>
              {areas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(selectedCategories.length > 0 || selectedArea) && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedArea(null);
                }}
                style={{
                  padding: '10px 14px',
                  background: 'transparent',
                  border: '1px solid rgba(201, 162, 77, 0.3)',
                  borderRadius: 8,
                  color: '#666',
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A24D';
                  e.currentTarget.style.color = '#C9A24D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                  e.currentTarget.style.color = '#666';
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE GRID ===== */}
      <section style={{ background: '#000', paddingY: 48 }} className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header with View Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2 style={{
              fontSize: 'clamp(24px, 5vw, 36px)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.5px',
            }}>
              {selectedCategories.length > 0 || selectedArea ? 'Curated Results' : 'All Experiences'}
            </h2>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '10px 16px',
                  background: viewMode === 'grid' ? '#C9A24D' : 'transparent',
                  color: viewMode === 'grid' ? '#000' : '#999',
                  border: '1px solid rgba(201, 162, 77, 0.3)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 12,
                  transition: 'all 0.3s ease',
                }}
              >
                <Grid3x3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                style={{
                  padding: '10px 16px',
                  background: viewMode === 'map' ? '#C9A24D' : 'transparent',
                  color: viewMode === 'map' ? '#000' : '#999',
                  border: '1px solid rgba(201, 162, 77, 0.3)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 12,
                  transition: 'all 0.3s ease',
                }}
              >
                <Map size={16} />
              </button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.length > 0 ? (
                filtered.map((dest) => (
                  <div key={dest.id}>
                    <ExperienceCard
                      destination={dest}
                      onPress={() => navigate?.('tourism-experience-detail', undefined, dest.id)}
                    />
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48, color: '#666' }}>
                  <p style={{ fontSize: 16 }}>No experiences found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          )}

          {/* Map View */}
          {viewMode === 'map' && (
            <div style={{
              height: 600,
              background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(201, 162, 77, 0.1)',
            }}>
              <div style={{ textAlign: 'center', color: '#666' }}>
                <Map size={48} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <p style={{ fontSize: 16 }}>Interactive map coming soon</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== THEMED EXPERIENCE ROWS ===== */}
      <section style={{ background: '#0a0a0a', paddingY: 48 }} className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {THEMES.map((theme) => {
            const themeDestinations = filtered.filter(theme.filter).slice(0, 4);
            if (themeDestinations.length === 0) return null;

            return (
              <div key={theme.id} style={{ marginBottom: 56 }}>
                {/* Theme Header */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    fontSize: 32,
                    marginBottom: 8,
                  }}>
                    {theme.emoji}
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(24px, 5vw, 32px)',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 8,
                    letterSpacing: '-0.5px',
                  }}>
                    {theme.name}
                  </h3>
                  <p style={{ color: '#999', fontSize: 14 }}>
                    {theme.description}
                  </p>
                </div>

                {/* Carousel: 3–4 Large Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {themeDestinations.map((dest) => (
                    <div key={dest.id}>
                      <ThemeCard
                        destination={dest}
                        onPress={() => navigate?.('tourism-experience-detail', undefined, dest.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== TRUST & EXCLUSIVITY BLOCK ===== */}
      <section style={{ background: 'linear-gradient(135deg, rgba(201,162,77,0.05), rgba(0,0,0,0.3))', paddingY: 40, borderY: '1px solid rgba(201, 162, 77, 0.1)' }} className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p style={{
            fontSize: 16,
            color: '#999',
            lineHeight: 1.8,
            marginBottom: 24,
          }}>
            Trusted by <span style={{ color: '#C9A24D', fontWeight: 700 }}>executives, travelers & locals</span> who value <span style={{ color: '#C9A24D', fontWeight: 700 }}>privacy, excellence & curated access</span>.
          </p>

          {/* Trust Icons Row */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#999' }}>
              <span style={{ fontSize: 20 }}>💼</span> Executive Curated
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#999' }}>
              <span style={{ fontSize: 20 }}>🔒</span> Private Access
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#999' }}>
              <span style={{ fontSize: 20 }}>✓</span> Verified Excellence
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// ===== EXPERIENCE CARD: PREMIUM BLACK/GOLD/WHITE ===== 
function ExperienceCard({ destination, onPress }: { destination: Destination; onPress: () => void }) {
  return (
    <article
      onClick={onPress}
      style={{
        borderRadius: 12,
        border: '1px solid rgba(201, 162, 77, 0.2)',
        overflow: 'hidden',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 380,
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#C9A24D';
        e.currentTarget.style.boxShadow = '0 16px 32px rgba(201, 162, 77, 0.2)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.2)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Image: 16:9 Hero */}
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '18px 16px', flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0a0a' }}>
        {/* Name: Clean, White */}
        <div style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#fff',
          marginBottom: 8,
          lineHeight: 1.3,
        }}>
          {destination.name}
        </div>

        {/* Location + Category */}
        <div className="flex items-center gap-2 mb-3" style={{ color: '#999', fontSize: 12 }}>
          <MapPin size={13} />
          <span>{destination.location}</span>
        </div>

        {/* Category Type */}
        {destination.experienceCategory && (
          <div style={{
            fontSize: 11,
            fontWeight: 500,
            color: '#666',
            textTransform: 'capitalize',
            marginBottom: 10,
          }}>
            {destination.experienceCategory}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Rating + Price Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
          paddingBottom: 14,
          borderBottom: '1px solid rgba(201, 162, 77, 0.15)',
        }}>
          {/* Rating */}
          <div className="flex items-center gap-1" style={{ color: '#C9A24D' }}>
            <Star size={13} fill="#C9A24D" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>
              {(destination.rating || 4.5).toFixed(1)}
            </span>
          </div>

          {/* Price */}
          {destination.pricePerPerson !== undefined && destination.pricePerPerson > 0 && (
            <div style={{ fontSize: 12, fontWeight: 600, color: '#C9A24D' }}>
              From R{destination.pricePerPerson.toLocaleString()}
            </div>
          )}
        </div>

        {/* Single Clean CTA */}
        <button
          style={{
            width: '100%',
            padding: '11px 16px',
            background: 'transparent',
            color: '#C9A24D',
            border: '1.5px solid #C9A24D',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 12,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
            e.currentTarget.style.borderColor = '#fff';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#C9A24D';
            e.currentTarget.style.color = '#C9A24D';
          }}
        >
          View
        </button>
      </div>
    </article>
  );
}

// ===== THEME CARD: LARGER, EDITORIAL ===== 
function ThemeCard({ destination, onPress }: { destination: Destination; onPress: () => void }) {
  return (
    <article
      onClick={onPress}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        height: 320,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 24px 48px rgba(201, 162, 77, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
      }}
    >
      {/* Full Background Image */}
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ willChange: 'transform' }}
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.7))',
      }} />

      {/* Content: Bottom Overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        background: 'linear-gradient(180deg, transparent, rgba(26,26,26,0.95))',
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 6,
        }}>
          {destination.name}
        </div>

        <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontSize: 12 }}>
          <MapPin size={13} />
          <span>{destination.location}</span>
        </div>
      </div>
    </article>
  );
}
