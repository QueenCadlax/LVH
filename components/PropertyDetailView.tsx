import React, { useMemo, useState } from 'react';
import { RealEstateProperty } from '../types';
import { MapPin, Star, Heart, ChevronLeft, ChevronRight, Bed, Bath, Ruler, Home, Phone, Mail, X, ZoomIn } from 'lucide-react';

interface PropertyDetailViewProps {
  property: RealEstateProperty;
  navigate?: (view: string, subview?: string | undefined, id?: string) => void;
  onClose?: () => void;
}

export default function PropertyDetailView({ property, navigate, onClose }: PropertyDetailViewProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock gallery images
  const gallery = useMemo(() => {
    const base = property.image || 'https://via.placeholder.com/1200x800';
    return [base, base, base, base];
  }, [property.image]);

  const nextImage = () => setCarouselIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setCarouselIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % gallery.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <div style={{ background: '#000', color: '#fff' }} className="min-h-screen">

      {/* ===== HERO: FULL-WIDTH IMAGE ===== */}
      <section style={{ position: 'relative', height: '65vh', overflow: 'hidden' }}>
        <img
          src={gallery[0]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
        }} />

        {/* Close Button */}
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

        {/* Content Overlay: Bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '40px 24px',
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.95))',
          zIndex: 10,
        }}>
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(32px, 7vw, 52px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 12,
              fontFamily: '"Georgia", serif',
              letterSpacing: '-0.5px',
            }}>
              {property.name}
            </h1>

            {/* Location & Price Row */}
            <div className="flex items-center justify-between flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontSize: 15, fontWeight: 600 }}>
                <MapPin size={18} />
                <span>{property.location}</span>
              </div>
              <div style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, color: '#C9A24D' }}>
                R{property.price?.toLocaleString() || 'POA'}
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="flex gap-8 flex-wrap" style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(201, 162, 77, 0.2)' }}>
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-2" style={{ color: '#fff' }}>
                  <Bed size={16} style={{ color: '#C9A24D' }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-2" style={{ color: '#fff' }}>
                  <Bath size={16} style={{ color: '#C9A24D' }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.squareFeet !== undefined && (
                <div className="flex items-center gap-2" style={{ color: '#fff' }}>
                  <Ruler size={16} style={{ color: '#C9A24D' }} />
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{property.squareFeet?.toLocaleString()} m²</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                style={{
                  padding: '13px 24px',
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Heart size={14} fill={isFavorite ? '#C9A24D' : 'none'} /> Save
              </button>

              <button
                style={{
                  padding: '13px 24px',
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
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(201, 162, 77, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Schedule Tour
              </button>
            </div>
          </div>
        </div>

        {/* Verified Badge */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(201, 162, 77, 0.95)',
          color: '#000',
          padding: '8px 14px',
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.5px',
          zIndex: 10,
        }}>
          ✓ VERIFIED LISTING
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section style={{ background: '#0a0a0a', padding: '32px 24px' }} className="py-8">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Gallery</h2>

          {/* Main Carousel */}
          <div style={{ position: 'relative', height: 400, overflow: 'hidden', borderRadius: 12, marginBottom: 16 }}>
            <img
              src={gallery[carouselIndex]}
              alt={`${property.name} ${carouselIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer transition-opacity"
              onClick={() => {
                setLightboxIndex(carouselIndex);
                setShowLightbox(true);
              }}
            />

            {/* Zoom Overlay */}
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
                e.currentTarget.querySelector('svg')!.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0)';
                e.currentTarget.querySelector('svg')!.style.opacity = '0';
              }}
            >
              <ZoomIn size={36} style={{ color: '#C9A24D', opacity: 0, transition: 'opacity 0.3s' }} />
            </div>

            {/* Navigation */}
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
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A24D';
                e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
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
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A24D';
                e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.3)';
                e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
              }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Counter */}
            <div style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              background: 'rgba(0,0,0,0.7)',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 12,
              color: '#C9A24D',
              fontWeight: 600,
            }}>
              {carouselIndex + 1} / {gallery.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                style={{
                  width: 80,
                  height: 60,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: carouselIndex === idx ? '2px solid #C9A24D' : '1px solid rgba(201, 162, 77, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROPERTY DETAILS GRID ===== */}
      <section style={{ background: '#000', padding: '40px 24px' }} className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: '#fff' }}>Property Details</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Type */}
            <div style={{ padding: 16, background: '#0a0a0a', borderRadius: 8, border: '1px solid rgba(201, 162, 77, 0.1)' }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>Property Type</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Luxury Residence</div>
            </div>

            {/* Status */}
            <div style={{ padding: 16, background: '#0a0a0a', borderRadius: 8, border: '1px solid rgba(201, 162, 77, 0.1)' }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>Status</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#C9A24D' }}>Available</div>
            </div>

            {/* Area */}
            <div style={{ padding: 16, background: '#0a0a0a', borderRadius: 8, border: '1px solid rgba(201, 162, 77, 0.1)' }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>Area</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{property.location}</div>
            </div>

            {/* Rating */}
            <div style={{ padding: 16, background: '#0a0a0a', borderRadius: 8, border: '1px solid rgba(201, 162, 77, 0.1)' }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>Rating</div>
              <div className="flex items-center gap-2">
                <Star size={14} fill="#C9A24D" style={{ color: '#C9A24D' }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{(property.rating || 4.7).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESCRIPTION ===== */}
      <section style={{ background: '#0a0a0a', padding: '40px 24px' }} className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#fff' }}>About This Property</h2>
          <p style={{ color: '#ccc', fontSize: 14, lineHeight: 1.8 }}>
            {property.description || 'Discover this exceptional property featuring premium finishes, modern amenities, and stunning views. Perfect for discerning buyers seeking luxury and tranquility in Mpumalanga\'s most coveted locations.'}
          </p>
        </div>
      </section>

      {/* ===== AMENITIES ===== */}
      <section style={{ background: '#000', padding: '40px 24px' }} className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: '#fff' }}>Key Amenities</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Swimming Pool', 'Home Cinema', 'Wine Cellar', 'Garden', 'Spa', 'Gym', 'Heated Driveway', 'Smart Home'].map((amenity, idx) => (
              <div
                key={idx}
                style={{
                  padding: 14,
                  background: '#0a0a0a',
                  borderRadius: 8,
                  border: '1px solid rgba(201, 162, 77, 0.1)',
                  fontSize: 13,
                  color: '#fff',
                  fontWeight: 600,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✓ {amenity}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AGENT CONTACT ===== */}
      <section style={{ background: '#0a0a0a', padding: '40px 24px' }} className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: '#fff' }}>Contact Agent</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 24,
            padding: 24,
            background: '#000',
            borderRadius: 12,
            border: '1px solid rgba(201, 162, 77, 0.1)',
          }}>
            {/* Agent Avatar */}
            <div style={{
              width: 100,
              height: 100,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #C9A24D, #8b7d3a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
            }}>
              👨‍💼
            </div>

            {/* Agent Info */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>James Thornton</h3>
              <p style={{ color: '#C9A24D', fontSize: 13, marginBottom: 12, fontWeight: 600 }}>Luxury Property Specialist</p>
              <p style={{ color: '#999', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
                Expert in Mpumalanga's premium real estate market with 12+ years experience. Specializing in luxury properties and high-net-worth clients.
              </p>

              <div className="flex gap-4">
                <button
                  style={{
                    padding: '10px 20px',
                    background: '#C9A24D',
                    color: '#000',
                    border: 'none',
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Phone size={13} /> Call
                </button>

                <button
                  style={{
                    padding: '10px 20px',
                    background: 'transparent',
                    color: '#C9A24D',
                    border: '1.5px solid #C9A24D',
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Mail size={13} /> Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {showLightbox && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
          onClick={() => setShowLightbox(false)}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90vh' }}>
            <img
              src={gallery[lightboxIndex]}
              alt={`${property.name} ${lightboxIndex + 1}`}
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close */}
            <button
              onClick={() => setShowLightbox(false)}
              style={{
                position: 'absolute',
                top: -40,
                right: 0,
                background: 'transparent',
                border: 'none',
                color: '#C9A24D',
                cursor: 'pointer',
              }}
            >
              <X size={28} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              style={{
                position: 'absolute',
                left: -60,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#C9A24D',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              style={{
                position: 'absolute',
                right: -60,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#C9A24D',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={32} />
            </button>

            {/* Counter */}
            <div style={{
              position: 'absolute',
              bottom: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#C9A24D',
              fontSize: 14,
              fontWeight: 600,
            }}>
              {lightboxIndex + 1} / {gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
