import React, { useState } from 'react';
import { Business } from '../types';

export default function PropertyCard({ business, onClick }: { business: Business; onClick?: () => void }) {
  const [saved, setSaved] = useState(false);
  const gold = '#C9A24D';

  const isElite = (business as any).isElite;
  const isFeatured = (business as any).isFeatured;

  const img = (business as any).image || (business.images && business.images[0]) || '';

  const priceLabel = business.pricePerNight ? `From R${business.pricePerNight.toLocaleString()} / night` : 'From R0 / night';

  const keyInfo = (() => {
    const parts: string[] = [];
    if ((business as any).maxGuests) parts.push(`${(business as any).maxGuests} guests`);
    if ((business as any).bathrooms && (business as any).bathrooms > 0) parts.push('Ensuite');
    const amen = (business.amenities || [])[0];
    if (amen) parts.push(amen.split(',')[0]);
    return parts.join(' · ');
  })();

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-[18px] overflow-hidden"
      style={{
        background: '#000000',
        border: '1px solid rgba(255,255,255,0.03)',
        transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 180ms ease',
        height: 520,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* IMAGE (≈70%) */}
      <div style={{ height: '70%', position: 'relative', overflow: 'hidden' }}>
        <img
          src={img}
          alt={business.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center', transition: 'transform 420ms ease' }}
          className="group-hover:transform group-hover:scale-105"
        />

        {/* subtle black gradient at bottom for readability */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />

        {/* Top-left small pill badge */}
        {(isElite || isFeatured) && (
          <div style={{ position: 'absolute', left: 12, top: 12 }}>
            <span style={{ display: 'inline-block', padding: '6px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700, color: isElite ? '#000' : gold, background: isElite ? gold : 'rgba(0,0,0,0.6)', border: isFeatured ? `1px solid ${gold}` : 'none' }}>{isElite ? 'ELITE' : 'FEATURED'}</span>
          </div>
        )}

        {/* Top-right wishlist (white outline heart) */}
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
          aria-label={saved ? 'Saved' : 'Save'}
          style={{ position: 'absolute', right: 12, top: 12, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', padding: 0 }}
        >
          {!saved ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21s-6.716-4.35-9.2-7.02C-0.6 9.36 3.4 4.5 7.6 6.28 9.6 7.18 11 9 12 10.44c1-1.44 2.4-3.26 4.4-4.16 4.2-1.78 8.2 3.08 4.8 7.7C18.716 16.65 12 21 12 21z" stroke="#FFFFFF" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21s-6.716-4.35-9.2-7.02C-0.6 9.36 3.4 4.5 7.6 6.28 9.6 7.18 11 9 12 10.44c1-1.44 2.4-3.26 4.4-4.16 4.2-1.78 8.2 3.08 4.8 7.7C18.716 16.65 12 21 12 21z" fill="${gold}" />
            </svg>
          )}
        </button>
      </div>

      {/* CONTENT (≈30%) */}
      <div style={{ padding: '14px 16px', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '30%' }}>
        <div>
          <div style={{ fontSize: 12, color: '#9DA0A6', marginBottom: 6 }}>{`${(business as any).type || ''}${(business as any).location ? ' • ' + (business as any).location : ''}`}</div>

          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#FFFFFF', lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{business.name}</h3>

          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={gold} />
            </svg>
            <div style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 500 }}>{(business.rating || 0).toFixed(1)}</div>
            <div style={{ fontSize: 12, color: '#CFCFCF' }}>({business.reviewCount || 0})</div>
          </div>

          <div style={{ marginTop: 8, fontSize: 13, color: '#CFCFCF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{keyInfo}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div style={{ color: '#FFFFFF', fontWeight: 700 }}>{priceLabel}</div>

          <div>
            <button
              onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
              className="cta-text"
              style={{
                background: 'transparent',
                border: 'none',
                color: gold,
                fontWeight: 700,
                cursor: 'pointer',
                padding: 6,
                transition: 'opacity 180ms ease, transform 180ms ease'
              }}
            >
              View details →
            </button>
          </div>
        </div>
      </div>

      <style>{`\n        .group:hover { transform: translateY(-6px); box-shadow: 0 6px 22px rgba(0,0,0,0.08); }\n        .group:hover img { transform: scale(1.03); }\n        .cta-text { opacity: 1; }\n        @media(min-width: 768px) {\n          .cta-text { opacity: 0; }\n          .group:hover .cta-text { opacity: 1; }\n        }\n      `}</style>
    </div>
  );
}
