import React, { useMemo, useState } from 'react';
import { destinations as destinationsData } from '../data/seeds';
import { Destination } from '../types';
import { MapPin, Star, Map, Grid3x3, ChevronRight, MessageSquare, Zap } from 'lucide-react';

interface CollectionGroup {
  id: string;
  name: string;
  description: string;
  emoji: string;
  filter: (d: Destination) => boolean;
}

export default function TourismDiscoveryPageLuxury({ navigate }: { navigate?: (view: string, subview?: string | undefined, id?: string) => void }) {
  const destinations = useMemo(() => destinationsData || [], []);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string | null>(null);

  // Editorial Collections (NOT filters - these tell a story)
  const COLLECTIONS: CollectionGroup[] = [
    {
      id: 'wild',
      name: 'Into the Wild',
      description: 'Untamed landscapes, pure nature',
      emoji: '🌿',
      filter: (d) => ['Nature', 'Hiking', 'Scenic Views'].includes(d.experienceCategory || ''),
    },
    {
      id: 'icons',
      name: 'African Icons',
      description: 'Wildlife encounters that define a continent',
      emoji: '🐘',
      filter: (d) => d.experienceCategory === 'Wildlife Encounters',
    },
    {
      id: 'leisure',
      name: 'Luxury & Leisure',
      description: 'Sophisticated experiences for discerning tastes',
      emoji: '🍷',
      filter: (d) => ['Food & Wine', 'Shopping & Markets'].includes(d.experienceCategory || ''),
    },
    {
      id: 'vistas',
      name: 'Views Worth the Drive',
      description: 'Panoramic moments that take your breath away',
      emoji: '🏔',
      filter: (d) => d.experienceCategory === 'Sightseeing',
    },
    {
      id: 'culture',
      name: 'Culture & Craft',
      description: 'Heritage, artistry, and local stories',
      emoji: '🎨',
      filter: (d) => d.experienceCategory === 'Cultural Sites',
    },
  ];

  const areas = Array.from(new Set(destinations.map(d => d.location).filter(Boolean))) as string[];
  const accessLevels = ['Public', 'Curated', 'Concierge Only'];

  // Signatures: Only top 6 across all, unfiltered
  const signatures = destinations
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  // All Experiences: filtered by area + access level only (NOT category)
  const allExperiences = destinations.filter(d => {
    if (selectedArea && d.location !== selectedArea) return false;
    // Access level filtering would go here if data had it
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: '#fafaf8', color: '#1a1a1a' }}>

      {/* ===== HERO: EMOTIONAL, NOT FUNCTIONAL ===== */}
      <section 
        style={{
          background: 'linear-gradient(135deg, rgba(201,162,77,0.08), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600) center/cover',
          minHeight: '55vh',
          display: 'flex',
          alignItems: 'flex-end',
          position: 'relative',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.7))' }} />
        
        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 w-full">
          {/* Overline */}
          <div style={{ color: '#C9A24D', letterSpacing: 2.5, fontWeight: 700, fontSize: 11, marginBottom: 20, textTransform: 'uppercase' }}>
            Mpumalanga Experiences
          </div>

          {/* Main Headline: EMOTIONAL */}
          <h1 style={{ 
            fontSize: 'clamp(42px, 9vw, 76px)', 
            fontWeight: 700, 
            lineHeight: 1.1, 
            marginBottom: 20,
            color: '#fff',
            letterSpacing: '-1px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            Experience Mpumalanga<br />Curated, Not Crowded
          </h1>

          {/* Subline: INVITATION, NOT PITCH */}
          <p style={{ 
            color: '#e0e0e0', 
            fontSize: 18, 
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 500,
            marginBottom: 32,
          }}>
            Iconic destinations, private access, and experiences reserved for those who know.
          </p>

          {/* CTA: Simple, Dual Option */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => {
                document.getElementById('signatures')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '14px 32px',
                background: '#C9A24D',
                color: '#000',
                borderRadius: 6,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(201, 162, 77, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Explore Experiences
            </button>
            <button
              onClick={() => navigate?.('concierge')}
              style={{
                padding: '14px 32px',
                background: 'transparent',
                color: '#C9A24D',
                borderRadius: 6,
                fontWeight: 700,
                border: '1.5px solid #C9A24D',
                cursor: 'pointer',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201, 162, 77, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MessageSquare size={16} /> Speak to Concierge
            </button>
          </div>
        </div>
      </section>

      {/* ===== SIGNATURES: THE CROWN JEWELS (4–6 ONLY) ===== */}
      <section id="signatures" style={{ maxWidth: '100%', paddingX: 24, py: 48 }} className="mx-auto px-6 py-20">
        {/* Section Header: SERIF / ELEGANT */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#C9A24D', letterSpacing: 2.5, fontWeight: 700, fontSize: 11, marginBottom: 12, textTransform: 'uppercase' }}>
            ✦ LowveldHub Signatures
          </div>
          <h2 style={{ 
            fontSize: 'clamp(28px, 6vw, 48px)', 
            fontWeight: 700, 
            lineHeight: 1.2,
            marginBottom: 16,
            color: '#1a1a1a',
          }}>
            Reserved for the Discerning
          </h2>
          <p style={{ color: '#666', fontSize: 16, maxWidth: 500, lineHeight: 1.6 }}>
            Handpicked destinations. Verified excellence. Private access prioritized.
          </p>
        </div>

        {/* Signatures Grid: Taller, More Image, Less Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatures.map((dest) => (
            <div key={dest.id}>
              <SignatureCard 
                destination={dest}
                onPress={() => navigate?.('destination-detail', undefined, dest.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== CURATED COLLECTIONS ===== */}
      <section style={{ background: '#fff', paddingY: 48 }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ marginBottom: 48 }}>
            <div style={{ color: '#C9A24D', letterSpacing: 2.5, fontWeight: 700, fontSize: 11, marginBottom: 12, textTransform: 'uppercase' }}>
              Collections
            </div>
            <h2 style={{ 
              fontSize: 'clamp(28px, 6vw, 48px)', 
              fontWeight: 700, 
              lineHeight: 1.2,
              color: '#1a1a1a',
            }}>
              Themed Experiences
            </h2>
          </div>

          {/* Collection Cards: Editorial */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {COLLECTIONS.map((collection) => (
              <div
                key={collection.id}
                onClick={() => {
                  // Filter to show items from this collection
                  document.getElementById('all-experiences')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: 24,
                  background: '#fafaf8',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.6)';
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(201, 162, 77, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.2)';
                  e.currentTarget.style.background = '#fafaf8';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{collection.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' }}>
                  {collection.name}
                </h3>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                  {collection.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALL EXPERIENCES: SECONDARY BROWSING ===== */}
      <section id="all-experiences" style={{ background: '#fafaf8', paddingY: 48 }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: '#C9A24D', letterSpacing: 2.5, fontWeight: 700, fontSize: 11, marginBottom: 12, textTransform: 'uppercase' }}>
                Browse
              </div>
              <h2 style={{ 
                fontSize: 'clamp(28px, 6vw, 48px)', 
                fontWeight: 700, 
                lineHeight: 1.2,
                color: '#1a1a1a',
              }}>
                All Experiences
              </h2>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '10px 16px',
                  background: viewMode === 'grid' ? '#C9A24D' : 'transparent',
                  color: viewMode === 'grid' ? '#000' : '#666',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  borderRadius: 6,
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
                  color: viewMode === 'map' ? '#000' : '#666',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  borderRadius: 6,
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

          {/* MINIMAL FILTERS: Area + Access Level Only */}
          <div className="flex gap-4 mb-8 flex-wrap">
            {/* Area Filter */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedArea || ''}
                onChange={(e) => setSelectedArea(e.target.value || null)}
                style={{
                  padding: '10px 16px',
                  background: '#fff',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  borderRadius: 6,
                  color: '#1a1a1a',
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <option value="">📍 All Areas</option>
                {areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Access Level Filter */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedAccessLevel || ''}
                onChange={(e) => setSelectedAccessLevel(e.target.value || null)}
                style={{
                  padding: '10px 16px',
                  background: '#fff',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  borderRadius: 6,
                  color: '#1a1a1a',
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <option value="">🔓 All Access Levels</option>
                {accessLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allExperiences.map((dest) => (
                <div key={dest.id}>
                  <ExperienceCard 
                    destination={dest}
                    onPress={() => navigate?.('destination-detail', undefined, dest.id)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Map View Placeholder */}
          {viewMode === 'map' && (
            <div style={{
              height: 500,
              background: 'linear-gradient(135deg, #f5f5f3, #efefec)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(201, 162, 77, 0.1)',
            }}>
              <div style={{ textAlign: 'center', color: '#999' }}>
                <Map size={48} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                <p style={{ fontSize: 14 }}>Map view coming soon</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section style={{ background: '#fff', paddingY: 48 }} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ color: '#666', fontSize: 16, marginBottom: 24 }}>
              Trusted by travellers, executives & locals who value <span style={{ color: '#C9A24D', fontWeight: 700 }}>privacy, excellence & access</span>.
            </p>
          </div>

          {/* Testimonial Grid (Minimal) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Not just a directory—a membership to better.", author: "—Luxury Traveler" },
              { quote: "Finally, a platform that understands exclusivity.", author: "—Executive" },
              { quote: "Mpumalanga curated for those who know.", author: "—Repeat Guest" },
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: 24,
                background: '#fafaf8',
                borderLeft: '3px solid #C9A24D',
                borderRadius: 6,
              }}>
                <p style={{ fontSize: 14, color: '#1a1a1a', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 12 }}>
                  "{item.quote}"
                </p>
                <p style={{ fontSize: 12, color: '#999', fontWeight: 500 }}>
                  {item.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POWER CLOSE ===== */}
      <section style={{ background: 'linear-gradient(135deg, rgba(201,162,77,0.08), rgba(0,0,0,0.3))', paddingY: 48, borderTop: '1px solid rgba(201, 162, 77, 0.2)' }} className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 style={{ 
            fontSize: 'clamp(28px, 6vw, 48px)', 
            fontWeight: 700, 
            lineHeight: 1.2,
            color: '#1a1a1a',
            marginBottom: 20,
          }}>
          </h2>
          <p style={{ 
            fontSize: 16, 
            color: '#666', 
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 600,
          }}>
            Access is curated. Listings are verified. Excellence is expected.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate?.('concierge')}
              style={{
                padding: '14px 32px',
                background: '#C9A24D',
                color: '#000',
                borderRadius: 6,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(201, 162, 77, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Speak to Concierge
            </button>
            <button
              style={{
                padding: '14px 32px',
                background: 'transparent',
                color: '#C9A24D',
                borderRadius: 6,
                fontWeight: 700,
                border: '1.5px solid #C9A24D',
                cursor: 'pointer',
                fontSize: 14,
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201, 162, 77, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Apply for Listing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===== SIGNATURE CARD: LARGER, MORE IMAGE ===== 
function SignatureCard({ destination, onPress }: { destination: Destination; onPress: () => void }) {
  return (
    <article
      onClick={onPress}
      style={{
        borderRadius: 12,
        border: '1.5px solid rgba(201, 162, 77, 0.3)',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fff 0%, #fafaf8 100%)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 420,
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.7)';
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(201, 162, 77, 0.12)';
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.background = '#fff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background = 'linear-gradient(135deg, #fff 0%, #fafaf8 100%)';
      }}
    >
      {/* Large Image */}
      <div style={{ height: 280, overflow: 'hidden', position: 'relative' }}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ willChange: 'transform' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
        }} />
      </div>

      {/* Minimal Content */}
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: 8,
          lineHeight: 1.3,
        }}>
          {destination.name}
        </div>

        <div className="flex items-center gap-2 mb-3" style={{ color: '#666' }}>
          <MapPin size={14} style={{ color: '#C9A24D' }} />
          <span style={{ fontSize: 13 }}>{destination.location}</span>
        </div>

        {/* Category as tag */}
        {destination.experienceCategory && (
          <div style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            color: '#C9A24D',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 12,
          }}>
            {destination.experienceCategory}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Rating only, no price */}
        {destination.rating && (
          <div className="flex items-center gap-1.5" style={{ color: '#C9A24D', marginBottom: 12 }}>
            <Star size={14} fill="currentColor" />
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              {destination.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Simple CTA */}
        <button
          style={{
            padding: '11px 16px',
            background: 'transparent',
            border: '1.5px solid rgba(201, 162, 77, 0.6)',
            color: '#C9A24D',
            borderRadius: 6,
            fontWeight: 700,
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'all 0.4s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 77, 0.12)';
            e.currentTarget.style.borderColor = '#C9A24D';
            e.currentTarget.style.transform = 'translateX(2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.6)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Request Access <ChevronRight size={13} />
        </button>
      </div>
    </article>
  );
}

// ===== EXPERIENCE CARD: SECONDARY GRID ===== 
function ExperienceCard({ destination, onPress }: { destination: Destination; onPress: () => void }) {
  return (
    <article
      onClick={onPress}
      style={{
        borderRadius: 10,
        border: '1px solid rgba(201, 162, 77, 0.15)',
        overflow: 'hidden',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 300,
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.5)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(201, 162, 77, 0.08)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.15)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Image */}
      <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ willChange: 'transform' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.25))',
        }} />
      </div>

      {/* Content: Compact */}
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontSize: 14,
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: 6,
        }}>
          {destination.name}
        </div>

        <div className="flex items-center gap-1.5 mb-2" style={{ color: '#999', fontSize: 12 }}>
          <MapPin size={12} style={{ color: '#C9A24D' }} />
          <span>{destination.location}</span>
        </div>

        {/* Rating: Small, Muted */}
        {destination.rating && (
          <div style={{ fontSize: 12, color: '#C9A24D', marginTop: 'auto', marginBottom: 8 }}>
            ⭐ {destination.rating.toFixed(1)}
          </div>
        )}

        {/* Price: MUTED, SMALL */}
        {destination.pricePerPerson !== undefined && destination.pricePerPerson > 0 && (
          <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>
            From R{destination.pricePerPerson.toLocaleString()}
          </div>
        )}
      </div>
    </article>
  );
}
