import React from 'react';
import { Star, MapPin, MessageCircle, Briefcase } from 'lucide-react';
import { ProfessionalService } from '../types';

interface BusinessCardProps {
  professional: ProfessionalService;
  onView: (id: string) => void;
  onContact: (professional: ProfessionalService) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = React.memo(({ professional, onView, onContact }) => {
  const getTierBadge = () => {
    if (professional.tier === 'Platinum') return { bg: 'bg-gold-500', text: 'text-black', label: 'PLATINUM' };
    if (professional.tier === 'Elite') return { bg: 'bg-amber-500', text: 'text-black', label: 'ELITE' };
    return null;
  };

  const tierBadge = getTierBadge();

  return (
    <div className="group relative glass-card rounded-xl overflow-hidden cursor-pointer h-full flex flex-col border border-white/10 hover:border-gold-500/50 transition-all hover:shadow-lg hover:shadow-gold-500/10">
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10"></div>

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-black/40">
        <img 
          src={professional.image} 
          alt={professional.name} 
          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

        {/* Tier Badge */}
        {tierBadge && (
          <div className={`absolute top-3 right-3 z-20 ${tierBadge.bg} ${tierBadge.text} text-xs font-bold px-2 py-1 rounded shadow-lg`}>
            {tierBadge.label}
          </div>
        )}

        {/* Rating */}
        {professional.rating && (
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star size={12} className="text-gold-500 fill-gold-500" />
            <span className="text-white text-sm font-semibold">{professional.rating}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-4">
        {/* Firm Name & Category */}
        <h3 className="text-lg font-serif text-white group-hover:text-gold-300 transition-colors mb-1">
          {professional.name}
        </h3>
        <p className="text-sm text-gray-400 mb-3">{professional.subcategory}</p>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-300 text-xs mb-3">
          <MapPin size={13} className="text-gold-500 flex-shrink-0" />
          <span className="truncate">{typeof professional.location === 'string' ? professional.location : professional.location.area}</span>
        </div>

        {/* Service Summary */}
        {professional.servicesSummary && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{professional.servicesSummary}</p>
        )}

        {/* Tags */}
        {professional.tags && professional.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {professional.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs bg-black/40 text-gray-300 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {professional.tags.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1">+{professional.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-white/5">
          <button
            onClick={() => onView(professional.id)}
            className="flex-1 px-3 py-2 bg-black/40 text-gray-200 text-sm rounded hover:bg-gold-500/20 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onView(professional.id)}
            className="flex-1 px-3 py-2 bg-gold-500/10 text-gold-400 text-sm rounded hover:bg-gold-500/20 transition-colors flex items-center justify-center gap-1"
          >
            <Briefcase size={14} /> Consult
          </button>
          <button
            onClick={() => onContact(professional)}
            className="flex-1 px-3 py-2 bg-black/40 text-gray-200 text-sm rounded hover:bg-black/60 transition-colors flex items-center justify-center gap-1"
          >
            <MessageCircle size={14} />
          </button>
        </div>
      </div>
    </div>
  );
});

BusinessCard.displayName = 'BusinessCard';
export default BusinessCard;
