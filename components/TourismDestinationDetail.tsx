import React, { useMemo, useState } from 'react';
import { Destination } from '../types';
import { MapPin, Star, Heart, MessageSquare, ChevronLeft, ChevronRight, Phone, MapPin as MapIcon, X, ZoomIn } from 'lucide-react';

interface TourismDestinationDetailProps {
  destination: Destination;
  navigate?: (view: string, subview?: string | undefined, id?: string) => void;
  onClose?: () => void;
}

export default function TourismDestinationDetail({ destination, navigate, onClose }: TourismDestinationDetailProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandTransport, setExpandTransport] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Mock gallery images (in real app, would come from destination data)
  const gallery = useMemo(() => {
    const base = destination.image || 'https://via.placeholder.com/1200x600';
    return [base, base, base, base]; // In production, would be destination.images
  }, [destination.image]);

  // Mock nearby stays
  const nearbyStays = useMemo(() => [
    { id: 1, name: 'Graskop Hotel', distance: '0.5 km', rating: 4.6, price: 'From R950' },
    { id: 2, name: 'The Pinnacles', distance: '1.2 km', rating: 4.8, price: 'From R1,200' },
    { id: 3, name: 'Harrie\'s Pancakes Lodge', distance: '2.1 km', rating: 4.7, price: 'From R800' },
  ], []);

  // Mock dining options
  const nearbyDining = useMemo(() => [
    { id: 1, name: 'The Escarpment Bistro', distance: '0.3 km', rating: 4.5, cuisine: 'Modern African' },
    { id: 2, name: 'Harrie\'s Pancakes', distance: '0.4 km', rating: 4.6, cuisine: 'Local Favorites' },
    { id: 3, name: 'Highlands Sun', distance: '1.5 km', rating: 4.4, cuisine: 'Fine Dining' },
  ], []);

  // Transport options
  const transportOptions = [
    { icon: '🚗', label: 'Private Transfers', desc: 'Luxury sedan transfers' },
    { icon: '🚌', label: 'Shuttle Services', desc: 'Group transport available' },
    { icon: '🚁', label: 'Helicopter Charters', desc: 'Scenic aerial views' },
  ];

  // Mock reviews
  const reviews = [
    {
      name: 'Catherine M.',
      date: '2 weeks ago',
      rating: 5,
      comment: 'Absolutely breathtaking views. The golden hour experience was unforgettable. Highly recommend.',
    },
    {
      name: 'James T.',
      date: '1 month ago',
      rating: 4.5,
      comment: 'Spectacular viewpoint. The escarpment stretches forever. Perfect for photographers.',
    },
    {
      name: 'Sarah & David',
      date: '6 weeks ago',
      rating: 5,
      comment: 'The most romantic spot in Mpumalanga. We took our engagement photos here!',
    },
  ];

  const nextImage = () => setCarouselIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setCarouselIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % gallery.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <div style={{ background: '#000', color: '#fff' }} className="min-h-screen">

      {/* ===== HERO SECTION ===== */}
      <section style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <img
          src={gallery[0]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
        }} />

        {/* Close Button (if modal) */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 20,
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        )}

        {/* Content Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '40px 24px',
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.8))',
          zIndex: 10,
        }}>
          <div className="max-w-6xl mx-auto">
            {/* Title & Location */}
            <h1 style={{
              fontSize: 'clamp(36px, 8vw, 56px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 8,
              fontFamily: '"Georgia", serif',
              letterSpacing: '-1px',
            }}>
              {destination.name}
            </h1>

            {/* Location & Rating */}
            <div className="flex items-center gap-4 flex-wrap" style={{ marginBottom: 16 }}>
              <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontSize: 14 }}>
                <MapPin size={16} />
                <span>{destination.location}</span>
              </div>

              <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontSize: 14 }}>
                <Star size={16} fill="currentColor" />
                <span>{(destination.rating || 4.5).toFixed(1)}</span>
                <span style={{ color: '#999', fontSize: 12 }}>({destination.reviewCount || 3200} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <p style={{
              color: '#ddd',
              fontSize: 15,
              lineHeight: 1.6,
              maxWidth: 600,
              marginBottom: 24,
            }}>
              {destination.description || 'A magnificent destination offering unforgettable experiences and panoramic beauty.'}
            </p>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <button
                style={{
                  padding: '12px 28px',
                  background: 'transparent',
                  border: '1.5px solid #C9A24D',
                  color: '#C9A24D',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Heart size={14} /> Add to Trip
              </button>

              <button
                onClick={() => navigate?.('concierge')}
                style={{
                  padding: '12px 28px',
                  background: '#C9A24D',
                  color: '#000',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
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
                <MessageSquare size={14} /> Chat with Concierge
              </button>
            </div>
          </div>
        </div>

        {/* Verified Badge */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(201, 162, 77, 0.9)',
          color: '#000',
          padding: '8px 14px',
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.5px',
          zIndex: 10,
        }}>
          ✓ VERIFIED BY LOWVELDHUB
        </div>
      </section>

      {/* ===== IMAGE GALLERY CAROUSEL ===== */}
      <section style={{ background: '#0a0a0a', padding: '32px 24px' }} className="py-8">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Gallery</h2>

          {/* Carousel */}
          <div style={{ position: 'relative', height: 320, overflow: 'hidden', borderRadius: 12 }}>
            <img
              src={gallery[carouselIndex]}
              alt={`${destination.name} ${carouselIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer transition-opacity"
              onClick={() => {
                setLightboxIndex(carouselIndex);
                setShowLightbox(true);
              }}
              style={{ opacity: 1 }}
            />

            {/* Overlay on hover */}
            <div
              onClick={() => {
                setLightboxIndex(carouselIndex);
                setShowLightbox(true);
              }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0)';
              }}
            >
              <ZoomIn size={32} style={{ color: '#C9A24D', opacity: 0 }} className="transition-opacity" />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(201, 162, 77, 0.3)',
                color: '#C9A24D',
                borderRadius: '50%',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(201, 162, 77, 0.3)',
                color: '#C9A24D',
                borderRadius: '50%',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Counter */}
            <div style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              background: 'rgba(0,0,0,0.7)',
              color: '#C9A24D',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
            }}>
              {carouselIndex + 1} / {gallery.length}
            </div>
          </div>

          {/* Thumbnail Row */}
          <div className="flex gap-2 mt-4">
            {gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: carouselIndex === idx ? '2px solid #C9A24D' : '1px solid rgba(201, 162, 77, 0.2)',
                  transition: 'all 0.3s ease',
                  opacity: carouselIndex === idx ? 1 : 0.6,
                }}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INFO GRID ===== */}
      <section style={{ background: '#000', padding: '40px 24px' }} className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: '#fff' }}>Key Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Category', value: destination.experienceCategory || 'Sightseeing' },
              { label: 'Location', value: destination.location },
              { label: 'Rating', value: `${(destination.rating || 4.5).toFixed(1)}★ (${destination.reviewCount || 3200} reviews)` },
              { label: 'Access', value: 'Public / Guided' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: 20,
                  background: '#0a0a0a',
                  border: '1px solid rgba(201, 162, 77, 0.1)',
                  borderRadius: 10,
                }}
              >
                <div style={{ color: '#999', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase' }}>
                  {item.label}
                </div>
                <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Price & Activities */}
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#C9A24D', marginBottom: 16, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Nearby Activities
            </h3>
            <div className="flex gap-3 flex-wrap">
              {['Hiking', 'Photography', 'Sunset Viewing', 'Nature Walk', 'Picnic'].map((activity) => (
                <div
                  key={activity}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(201, 162, 77, 0.1)',
                    border: '1px solid rgba(201, 162, 77, 0.2)',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#C9A24D',
                  }}
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEARBY STAYS ===== */}
      <section style={{ background: '#0a0a0a', padding: '40px 24px' }} className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: '#fff' }}>Nearby Accommodations</h2>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {nearbyStays.map((stay) => (
              <div
                key={stay.id}
                style={{
                  minWidth: 280,
                  background: '#1a1a1a',
                  border: '1px solid rgba(201, 162, 77, 0.1)',
                  borderRadius: 10,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src="https://via.placeholder.com/280x160"
                  alt={stay.name}
                  className="w-full h-40 object-cover"
                />
                <div style={{ padding: 16 }}>
                  <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>
                    {stay.name}
                  </h4>
                  <div style={{ color: '#999', fontSize: 12, marginBottom: 8 }}>
                    {stay.distance} away
                  </div>
                  <div className="flex justify-between items-center">
                    <div style={{ color: '#C9A24D', fontWeight: 700, fontSize: 13 }}>
                      ⭐ {stay.rating}
                    </div>
                    <div style={{ color: '#C9A24D', fontWeight: 700, fontSize: 13 }}>
                      {stay.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSPORT OPTIONS ===== */}
      <section style={{ background: '#000', padding: '40px 24px' }} className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: '#fff' }}>How to Get There</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setExpandTransport(expandTransport === idx ? null : idx)}
                style={{
                  padding: 24,
                  background: '#0a0a0a',
                  border: '1px solid rgba(201, 162, 77, 0.1)',
                  borderRadius: 10,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.1)';
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{option.icon}</div>
                <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 4, fontSize: 14 }}>
                  {option.label}
                </h4>
                <p style={{ color: '#999', fontSize: 12 }}>
                  {option.desc}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate?.('concierge')}
            style={{
              marginTop: 24,
              padding: '12px 28px',
              background: '#C9A24D',
              color: '#000',
              border: 'none',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              width: '100%',
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
            Request Transport Arrangements
          </button>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {showLightbox && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowLightbox(false)}
        >
          <button
            onClick={() => setShowLightbox(false)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <X size={20} />
          </button>

          <img
            src={gallery[lightboxIndex]}
            alt={`Lightbox ${lightboxIndex + 1}`}
            className="max-w-4xl max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            style={{
              position: 'absolute',
              left: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            style={{
              position: 'absolute',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
