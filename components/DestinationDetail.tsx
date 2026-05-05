import React, { useEffect } from 'react';
import { Destination } from '../types';
import { ArrowLeft, MapPin, Star, Share2, Heart, Hotel, Utensils, Navigation, Map as MapIcon, MessageSquare } from 'lucide-react';

interface DestinationDetailProps {
  destination: Destination;
  navigate?: (view: string) => void;
  onBack?: () => void;
}

export default function DestinationDetail({ destination, navigate, onBack }: DestinationDetailProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [destination]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#000', color: '#fff' }}>
        <div>
          <div style={{ color: '#C9A24D' }} className="text-lg font-semibold">Destination not found</div>
          <button
            onClick={() => navigate?.('tourism')}
            className="mt-4 px-6 py-2 rounded"
            style={{ border: '1px solid #C9A24D', color: '#C9A24D' }}
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff' }}>
      {/* HERO IMAGE — FULL HEIGHT */}
      <div
        style={{
          height: 'calc(100vh - 80px)',
          backgroundImage: `url(${destination.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        {/* Back button */}
        <div style={{ padding: 24, position: 'relative', zIndex: 10 }}>
          <button
            onClick={() => navigate?.('tourism')}
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(201, 162, 77, 0.5)',
              color: '#C9A24D',
              padding: '10px 16px',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Content overlay (bottom) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 40,
            zIndex: 5,
          }}
          className="max-w-5xl mx-auto w-full px-6"
        >
          <div style={{ fontSize: 12, color: '#C9A24D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            {destination.activityType || destination.experienceCategory}
          </div>
          <h1 className="mt-4 text-6xl font-bold" style={{ color: '#FFFFFF', lineHeight: 1.1 }}>
            {destination.name}
          </h1>
          <div className="flex items-center gap-4 flex-wrap mt-6">
            <div className="flex items-center gap-2" style={{ color: '#CFCFCF' }}>
              <MapPin size={16} style={{ color: '#C9A24D' }} />
              <span className="text-lg">{destination.location}</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#C9A24D' }}>
              <Star size={16} fill="currentColor" />
              <span style={{ fontWeight: 700, fontSize: 18 }}>{(destination.rating || 4.5).toFixed(1)}</span>
              {destination.reviewCount && (
                <span style={{ color: '#CFCFCF', fontSize: 14 }}>({destination.reviewCount.toLocaleString()})</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MINIMAL DETAILS — NO ESSAYS ===== */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        {destination.description && (
          <div className="mb-16">
            <p style={{ color: '#CFCFCF', fontSize: 18, lineHeight: 1.7 }}>
              {destination.description}
            </p>
          </div>
        )}

        {/* KEY INFO GRID — ICONS + TEXT ONLY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Nearby Stays */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#C9A24D', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <Hotel size={32} />
            </div>
            <div style={{ color: '#CFCFCF', fontSize: 13, fontWeight: 600 }}>Nearby Stays</div>
          </div>

          {/* Nearby Restaurants */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#C9A24D', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <Utensils size={32} />
            </div>
            <div style={{ color: '#CFCFCF', fontSize: 13, fontWeight: 600 }}>Restaurants</div>
          </div>

          {/* Transport */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#C9A24D', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <Navigation size={32} />
            </div>
            <div style={{ color: '#CFCFCF', fontSize: 13, fontWeight: 600 }}>Transport</div>
          </div>

          {/* Map */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#C9A24D', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <MapIcon size={32} />
            </div>
            <div style={{ color: '#CFCFCF', fontSize: 13, fontWeight: 600 }}>Map</div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {/* View Nearby */}
          <button
            style={{
              padding: '16px 20px',
              background: 'transparent',
              border: '1px solid #C9A24D',
              color: '#C9A24D',
              borderRadius: 8,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            View Nearby
          </button>

          {/* Add to Trip */}
          <button
            style={{
              padding: '16px 20px',
              background: 'transparent',
              border: '1px solid #C9A24D',
              color: '#C9A24D',
              borderRadius: 8,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Heart size={16} /> Add to Trip
          </button>

          {/* Open in Map */}
          <button
            style={{
              padding: '16px 20px',
              background: '#C9A24D',
              color: '#000',
              borderRadius: 8,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(201, 162, 77, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <MapIcon size={16} /> Open in Map
          </button>
        </div>

        {/* FOOTER CTA */}
        <div style={{
          textAlign: 'center',
          paddingTop: 40,
          borderTop: '1px solid rgba(201, 162, 77, 0.1)',
        }}>
          <p style={{ color: '#CFCFCF', marginBottom: 16, fontSize: 16 }}>
            Want personalized recommendations for this destination?
          </p>
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
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              margin: '0 auto',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <MessageSquare size={16} /> Chat with Concierge
          </button>
        </div>
      </section>
    </div>
  );
}
