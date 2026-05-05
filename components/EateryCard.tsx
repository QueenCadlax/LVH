import React from 'react';
import { Eatery } from '../types';
import { MapPin, Star } from 'lucide-react';

const EateryCard: React.FC<{ eatery: Eatery; onView: (id: string) => void; onContact?: (eatery: Eatery) => void }> = React.memo(({ eatery, onView, onContact }) => {
  const menuTeaser = eatery.menu && eatery.menu.length ? eatery.menu.slice(0,2).map(m => `${m.itemName} • ${m.price}`).join(' | ') : '';

  return (
    <div className="group relative bg-[#000000] rounded-[14px] overflow-hidden cursor-pointer transition-all duration-400 hover:shadow-[0_24px_70px_rgba(201,162,77,0.15)] flex flex-col h-full">
      <div className="relative flex-shrink-0" style={{aspectRatio: '4 / 4'}}>
        <img src={eatery.images?.[0] || ''} alt={eatery.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          {eatery.premiumTier === 'Elite' && (
            <div className="bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black text-[8px] font-bold uppercase px-2.5 py-1 rounded-full shadow-[0_6px_20px_rgba(201,162,77,0.18)]" style={{letterSpacing: '0.08em'}}>Elite</div>
          )}
          {eatery.verified && (
            <div className="bg-[#0b0b0b] text-[#E0C36A] text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#E0C36A]/20" style={{letterSpacing: '0.03em'}}>✓ Verified</div>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 bg-[#0b0b0b] border-t border-white/5 flex flex-col">
        <div className="mb-2 flex-shrink-0">
          <h3 className="text-sm md:text-base font-serif text-white leading-tight tracking-tight">{eatery.name}</h3>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <div className="flex items-center gap-1 text-[#E0C36A] font-semibold">★ {eatery.rating?.toFixed(1) || '—'}</div>
            <div className="text-[#3a3a3a]">•</div>
            <div className="text-gray-400 text-xs">{eatery.category}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mb-2 flex-shrink-0">
          <div className="flex items-center gap-1.5"><MapPin size={11} className="text-[#C9A24D]"/> <span>{typeof eatery.location === 'string' ? eatery.location : eatery.location.area}</span></div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 flex-shrink-0">
          <button onClick={() => onView(eatery.id)} className="flex-1 bg-gradient-to-r from-[#E0C36A] to-[#C9A24D] text-black px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:shadow-[0_8px_24px_rgba(201,162,77,0.25)] hover:scale-105">View</button>
          <button onClick={() => onContact && onContact(eatery)} className="border border-[#C9A24D]/30 text-[#E0C36A] px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:border-[#C9A24D]/60 hover:bg-white/5">Info</button>
        </div>
      </div>
    </div>
  );
});

EateryCard.displayName = 'EateryCard';
export default EateryCard;
