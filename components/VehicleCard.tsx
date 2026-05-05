import React, { useState } from 'react';
import { Heart, MapPin, Phone, Eye, Share2 } from 'lucide-react';

type Car = {
  id: string;
  title: string;
  image: string;
  gallery?: string[];
  year?: number;
  mileage?: string;
  price?: string;
  location?: string;
  dealer?: string;
  isPremium?: boolean;
  isSponsored?: boolean;
  isVerified?: boolean;
};

const VehicleCard: React.FC<{ car: Car; isFavorite?: boolean; onToggleFavorite?: (id: string) => void; onView?: (id: string) => void }> = ({ car, isFavorite, onToggleFavorite, onView }) => {
  const gold = '#C9A24D';
  const [hoverUnderline, setHoverUnderline] = useState(false);

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)]" style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a0a' }}>
      {/* IMAGE SECTION - Fixed 4:3 aspect ratio */}
      <div className="relative w-full overflow-hidden" style={{ height: '240px' }}>
        <img 
          src={car.image} 
          alt={car.title} 
          className="w-full h-full object-cover transition-transform duration-500" 
          style={{ transform: hoverUnderline ? 'scale(1.1)' : 'scale(1)' }}
        />
        
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)' }} />
        
        {/* BADGES - Top left */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {car.isPremium && (
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: gold, color: '#000000' }}>
              ELITE
            </div>
          )}
        </div>
        
        {/* SAVE ICON - Top right */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite && onToggleFavorite(car.id); }} 
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ 
            background: isFavorite ? gold : 'rgba(255,255,255,0.1)', 
            color: isFavorite ? '#000000' : 'white',
            border: isFavorite ? 'none' : `1px solid ${gold}`,
            backdropFilter: 'blur(4px)'
          }}
        >
          <Heart size={18} fill={isFavorite ? gold : 'none'} />
        </button>
        
        {/* IMAGE COUNT BADGE - Bottom right */}
        {car.gallery && car.gallery.length > 1 && (
          <div className="absolute bottom-4 right-4 px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: 'rgba(0,0,0,0.7)', color: gold }}>
            {car.gallery.length} photos
          </div>
        )}
      </div>

      {/* CONTENT SECTION - Fixed height, flex grow */}
      <div className="flex flex-col flex-grow p-3 gap-2" style={{ background: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)' }}>
        {/* TITLE - 1 line max */}
        <div>
          <h3 className="text-sm font-serif font-bold line-clamp-1" style={{ color: '#FFFFFF' }}>
            {car.title}
          </h3>
        </div>

        {/* META - 1 line max */}
        <div className="text-xs line-clamp-1" style={{ color: '#999999' }}>
          {car.year} • {car.mileage}
        </div>

        {/* LOCATION - Full Display */}
        <div className="flex items-center gap-1 text-xs" style={{ color: '#CFCFCF' }}>
          <MapPin size={12} style={{ color: gold }} />
          <span className="line-clamp-1">{car.location}</span>
        </div>

        {/* PRICE - Strong */}
        <div className="text-base font-semibold" style={{ color: gold }}>
          {car.price}
        </div>

        {/* SPACING - Flexible spacer */}
        <div className="flex-grow" />

        {/* CTA BUTTON - Always at bottom, full width */}
        <button
          onClick={() => onView && onView(car.id)}
          onMouseEnter={() => setHoverUnderline(true)}
          onMouseLeave={() => setHoverUnderline(false)}
          className="w-full py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
          style={{
            border: `1px solid ${gold}`,
            color: gold,
            background: hoverUnderline ? `${gold}15` : 'transparent'
          }}
        >
          View Details
          <span style={{ transform: hoverUnderline ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s' }}>→</span>
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
