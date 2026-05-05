import React from 'react';
import { Star, MapPin, MessageCircle, Music, Clock } from 'lucide-react';
import { NightlifeVenue } from '../types';

interface NightlifeCardProps {
  venue: NightlifeVenue;
  onView: (id: string) => void;
  onContact: (venue: NightlifeVenue) => void;
}

const NightlifeCard: React.FC<NightlifeCardProps> = React.memo(({ venue, onView, onContact }) => {
  const getTierBadge = () => {
    if (venue.tier === 'Platinum') return { bg: 'bg-gold-500', text: 'text-black', label: 'PLATINUM' };
    if (venue.tier === 'Elite') return { bg: 'bg-amber-500', text: 'text-black', label: 'ELITE' };
    return null;
  };

  const getBookButtonText = () => {
    if (venue.subcategory === 'THEATERS & CINEMAS') return 'Get Tickets';
    if (venue.subcategory === 'GAMING & VR CENTERS') return 'Discover';
    if (venue.subcategory === 'DANCE STUDIOS & PERFORMANCES') return 'Explore';
    if (venue.subcategory === 'MUSIC LESSONS & TEACHERS') return 'Learn More';
    return 'Discover / Reserve';
  };

  const tierBadge = getTierBadge();
  const isLiveMusic = venue.features?.liveMusic;
  const isDJ = venue.features?.dj;
  const bookText = getBookButtonText();

  return (
    <div className="group relative">
      {/* Neon Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-gold-500/0 via-gold-500/20 to-gold-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur pointer-events-none z-0"></div>
      
      <div className="relative glass-card rounded-xl overflow-hidden cursor-pointer h-full flex flex-col border border-white/10 hover:border-gold-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/30 bg-black/40">

      {/* Image Section with Glow */}
      <div className="relative h-48 overflow-hidden bg-black/40 group-hover:shadow-inner">
        <img 
          src={venue.image} 
          alt={venue.name} 
          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

        {/* Tier Badge */}
        {tierBadge && (
          <div className={`absolute top-3 right-3 z-20 ${tierBadge.bg} ${tierBadge.text} text-xs font-bold px-2 py-1 rounded shadow-lg shadow-gold-500/30`}>
            {tierBadge.label}
          </div>
        )}

        {/* Rating */}
        {venue.rating && (
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star size={12} className="text-gold-500 fill-gold-500" />
            <span className="text-white text-sm font-semibold">{venue.rating}</span>
          </div>
        )}

        {/* Live Indicators */}
        {(isLiveMusic || isDJ) && (
          <div className="absolute top-3 left-3 z-20 flex gap-2">
            {isLiveMusic && (
              <span className="flex items-center gap-1 bg-red-500/80 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                <Music size={10} /> LIVE
              </span>
            )}
            {isDJ && (
              <span className="flex items-center gap-1 bg-blue-500/80 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                <Music size={10} /> DJ
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-4">
        {/* Venue Name & Category */}
        <h3 className="text-lg font-serif text-white group-hover:text-gold-300 transition-colors mb-1">
          {venue.name}
        </h3>
        <p className="text-sm text-gray-400 mb-3">{venue.subcategory}</p>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-300 text-xs mb-3">
          <MapPin size={13} className="text-gold-500 flex-shrink-0" />
          <span className="truncate">{typeof venue.location === 'string' ? venue.location : venue.location.area}</span>
        </div>

        {/* Vibe Description */}
        {venue.vibeDescription && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{venue.vibeDescription}</p>
        )}

        {/* Tags */}
        {venue.tags && venue.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {venue.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs bg-black/40 text-gray-300 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {venue.tags.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1">+{venue.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-white/5">
          <button
            onClick={() => onView(venue.id)}
            className="flex-1 px-3 py-2 bg-black/40 text-gray-200 text-sm rounded hover:bg-gold-500/20 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onView(venue.id)}
            className="flex-1 px-3 py-2 bg-gold-500/10 text-gold-400 text-sm rounded hover:bg-gold-500/20 transition-colors flex items-center justify-center gap-1"
          >
            <Clock size={14} /> {bookText}
          </button>
          <button
            onClick={() => onContact(venue)}
            className="flex-1 px-3 py-2 bg-black/40 text-gray-200 text-sm rounded hover:bg-black/60 transition-colors flex items-center justify-center gap-1"
          >
            <MessageCircle size={14} /> Message
          </button>
        </div>
      </div>
      </div>
    </div>
  );
});

NightlifeCard.displayName = 'NightlifeCard';
export default NightlifeCard;
