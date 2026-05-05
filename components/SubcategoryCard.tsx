import React, { useState } from 'react';
import { Business } from '../types';
import { MapPin, Star, Heart } from 'lucide-react';

type Props = {
  business: Business;
  onClick?: (b: Business) => void;
  primaryCTA?: string;
  secondaryCTA?: string;
  isCompact?: boolean;
};

const SubcategoryCard: React.FC<Props> = ({ business, onClick, primaryCTA, secondaryCTA, isCompact = false }) => {
  const [saved, setSaved] = useState(false);
  const img = (business as any).image || (business.images && business.images[0]) || '';
  const isElite = (business as any).isElite || business.tier === 'Elite';
  const isPlatinum = (business as any).isPlatinum || business.tier === 'Platinum';

  const handleClick = (e?: React.MouseEvent) => {
    e && e.stopPropagation();
    onClick && onClick(business);
  };

  // AIRBNB-STYLE COMPACT FORMAT FOR FEATURED HIGHLIGHTS
  if (isCompact) {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br from-white/8 to-white/3 border border-white/15 transition-all duration-400 hover:border-[#E0C36A]/60 hover:shadow-xl hover:shadow-[#E0C36A]/20 hover:from-white/12 hover:to-white/6"
      >
        {/* IMAGE */}
        <div className="relative w-full h-44 md:h-52 overflow-hidden bg-black/50">
          <img
            src={img}
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505691723518-36a5f3b2c74b?auto=format&fit=crop&q=80&w=1200'; }}
          />
          {/* OVERLAY GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          
          {/* FAVORITE BUTTON */}
          <button
            onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
            aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute right-3 top-3 w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <Heart size={13} className={`${saved ? 'fill-[#E0C36A] text-[#E0C36A]' : 'text-white'}`} />
          </button>

          {/* TIER BADGE - TOP LEFT */}
          {(isPlatinum || isElite) && (
            <div className="absolute left-3 top-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E0C36A]/40">
              <span className="text-[10px] font-semibold text-[#E0C36A] uppercase tracking-wider">
                {isPlatinum ? '✦ Platinum' : '◆ Elite'}
              </span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-2.5" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
          {/* LOCATION */}
          <div className="flex items-center gap-1.5 text-xs text-gray-300">
            <MapPin size={11} className="text-[#E0C36A] flex-shrink-0" />
            <span className="line-clamp-1 font-light">{business.location || 'Mpumalanga'}</span>
          </div>

          {/* TITLE */}
          <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
            {business.name}
          </h3>

          {/* RATING */}
          {business.rating && (
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Star size={11} className="text-[#E0C36A] fill-[#E0C36A]" />
                <span className="font-semibold text-white">{(business.rating || 0).toFixed(1)}</span>
              </div>
              <span className="text-gray-500">({business.reviewCount || 0})</span>
            </div>
          )}

          {/* DESCRIPTION */}
          <p className="text-xs text-[#E0C36A] line-clamp-2 leading-relaxed font-light">
            {business.description ? business.description.substring(0, 70) : (business.tags && business.tags[0]) || ''}
          </p>
        </div>
      </div>
    );
  }

  // STANDARD CARD (NON-COMPACT)
  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-[18px] overflow-hidden bg-[#0b0b0b] border border-white/5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative" style={{ aspectRatio: '3 / 4' }}>
        <img
          src={img}
          alt={business.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505691723518-36a5f3b2c74b?auto=format&fit=crop&q=80&w=1200'; }}
        />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        <div className="absolute top-2 left-2 flex gap-1.5">
          {isPlatinum && (
            <div className="bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-[0_6px_20px_rgba(201,162,77,0.18)]">PLATINUM</div>
          )}
          {isElite && !isPlatinum && (
            <div className="bg-[#111] text-[#E0C36A] text-[11px] font-medium px-2 py-1 rounded-full border border-[#E0C36A]/10">ELITE</div>
          )}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
          aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm border border-white/6"
        >
          <Heart size={16} className={`${saved ? 'text-[#C9A24D]' : 'text-white'}`} />
        </button>
      </div>

      <div className="p-4 bg-[#0b0b0b]">
        <div className="mb-2">
          <h3 className="text-lg md:text-xl font-serif text-white leading-tight line-clamp-2">{business.name}</h3>

          <div className="flex items-center gap-3 mt-2 text-sm text-gray-300">
            {business.rating ? (
              <div className="flex items-center gap-1 text-[#E0C36A] font-semibold">
                <Star size={14} className="text-[#E0C36A]" /> <span className="text-xs">{(business.rating || 0).toFixed(1)}</span>
                <span className="text-gray-400 text-[10px]">({business.reviewCount || 0})</span>
              </div>
            ) : (
              <div className="text-xs text-gray-400">{(business.tags && business.tags[0]) || (business.subcategory || 'Popular')}</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
          <div className="flex items-center gap-2"><MapPin size={14} className="text-[#C9A24D]"/> <span>{business.location || 'Mpumalanga'}</span></div>
        </div>

        <div className="text-sm text-gray-300 mb-3 line-clamp-2">{business.description || business.tags?.join(' · ') || ''}</div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400 uppercase tracking-wider">{isPlatinum ? 'Platinum' : isElite ? 'Elite' : 'Featured'}</div>

          <div className="flex gap-2">
            <button onClick={() => handleClick()} className="bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black px-3 py-2 rounded-lg text-sm font-semibold">{primaryCTA || 'Discover'}</button>
            <button onClick={(e) => { e.stopPropagation(); /* secondary action placeholder */ }} className="border border-[#C9A24D]/20 text-[#E0C36A] px-3 py-2 rounded-lg text-sm">{secondaryCTA || 'Inquire'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCard;
