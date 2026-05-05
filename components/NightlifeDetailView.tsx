import React, { useState, useEffect } from 'react';
import { nightlifeVenues } from '../data/nightlifeSeeds';
import { NightlifeVenue } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, Star, Globe, Music, Clock, Check } from 'lucide-react';

const NightlifeDetailView: React.FC<{ venueId: string | null; navigate: (view: string, cat?: string, id?: string) => void }> = ({ venueId, navigate }) => {
  const venue: NightlifeVenue | undefined = nightlifeVenues.find(v => v.id === venueId);
  const [bookingRequested, setBookingRequested] = useState(false);
  
  if (!venue) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-black">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate('nightlife')} className="flex items-center gap-2 text-gold-500 hover:text-gold-400 mb-6">
            <ArrowLeft size={20} /> Back to Nightlife
          </button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Venue not found</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [venueId]);

  const handleContact = () => {
    if (venue.contactOptions?.whatsapp) {
      window.open(`https://wa.me/${venue.contactOptions.whatsapp.replace(/\D/g, '')}`);
    } else if (venue.contactOptions?.call) {
      window.location.href = `tel:${venue.contactOptions.call}`;
    }
  };

  const handleBooking = () => {
    setBookingRequested(true);
    setTimeout(() => setBookingRequested(false), 3000);
  };

  const location = typeof venue.location === 'string' ? venue.location : `${venue.location.area}${venue.location.city ? ', ' + venue.location.city : ''}`;

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('nightlife')} 
          className="flex items-center gap-2 text-gold-500 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Nightlife
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image with Glow */}
            <div className="relative h-96 rounded-xl overflow-hidden mb-8 border border-white/10 shadow-lg shadow-gold-500/10">
              <img 
                src={venue.image} 
                alt={venue.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* Tier Badge */}
              {(venue.tier === 'Platinum' || venue.tier === 'Elite') && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
                  venue.tier === 'Platinum' 
                    ? 'bg-gold-500 text-black shadow-gold-500/50' 
                    : 'bg-amber-500 text-black shadow-amber-500/50'
                }`}>
                  {venue.tier.toUpperCase()}
                </div>
              )}

              {/* Live Indicators */}
              {(venue.features?.liveMusic || venue.features?.dj) && (
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                  {venue.features.liveMusic && (
                    <span className="flex items-center gap-1 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      <Music size={12} /> LIVE
                    </span>
                  )}
                  {venue.features.dj && (
                    <span className="flex items-center gap-1 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      <Music size={12} /> DJ
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Venue Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-serif text-white mb-2">{venue.name}</h1>
                  <p className="text-lg text-gray-400">{venue.subcategory}</p>
                </div>
                {venue.rating && (
                  <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg border border-white/10">
                    <Star size={18} className="text-gold-500 fill-gold-500" />
                    <span className="text-white font-semibold">{venue.rating}</span>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <MapPin size={18} className="text-gold-500 flex-shrink-0" />
                <span>{location}</span>
              </div>

              {/* Opening Hours */}
              {venue.openingHours && (
                <div className="flex items-center gap-2 text-gray-300 mb-6">
                  <Clock size={18} className="text-gold-500 flex-shrink-0" />
                  <span>{venue.openingHours}</span>
                </div>
              )}

              {/* Description */}
              {venue.description && (
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 mb-6">
                  <p className="text-gray-200 leading-relaxed">{venue.description}</p>
                </div>
              )}

              {/* Vibe Description */}
              {venue.vibeDescription && (
                <div className="bg-gold-500/10 border border-gold-500/20 rounded-lg p-6 mb-6">
                  <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wide mb-2">The Vibe</h3>
                  <p className="text-gray-200">{venue.vibeDescription}</p>
                </div>
              )}

              {/* Tags */}
              {venue.tags && venue.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">What's On Offer</h3>
                  <div className="flex flex-wrap gap-2">
                    {venue.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-300 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Genres */}
              {venue.genres && venue.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Music & Entertainment</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {venue.genres.map((genre, idx) => (
                      <div key={idx} className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-gray-300 text-sm flex items-center gap-2">
                        <Music size={14} className="text-gold-500 flex-shrink-0" />
                        {genre}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {venue.features && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Venue Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {venue.features.liveMusic && <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"><Check size={14} /> Live Music</div>}
                    {venue.features.dj && <div className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm flex items-center gap-2"><Check size={14} /> DJ Nights</div>}
                    {venue.features.vipSection && <div className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm flex items-center gap-2"><Check size={14} /> VIP Section</div>}
                    {venue.features.cocktails && <div className="px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm flex items-center gap-2"><Check size={14} /> Craft Cocktails</div>}
                    {venue.features.happyHour && <div className="px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2"><Check size={14} /> Happy Hour</div>}
                    {venue.features.lateNight && <div className="px-3 py-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm flex items-center gap-2"><Check size={14} /> Late Night</div>}
                    {venue.features.outdoorTerrace && <div className="px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2"><Check size={14} /> Outdoor Terrace</div>}
                    {venue.features.parking && <div className="px-3 py-2 rounded-lg bg-gray-500/10 border border-gray-500/20 text-gray-400 text-sm flex items-center gap-2"><Check size={14} /> Parking</div>}
                  </div>
                </div>
              )}

              {/* Price Range */}
              {venue.priceRange && (
                <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">Price Range: <span className="text-gold-400 font-semibold">{venue.priceRange}</span></p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-6 sticky top-28">
              <h3 className="text-lg font-semibold text-white mb-4">Book Your Spot</h3>

              {/* Call */}
              {venue.contactOptions?.call && (
                <a 
                  href={`tel:${venue.contactOptions.call}`}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-gray-200 mb-3 transition-colors"
                >
                  <Phone size={18} className="text-gold-500" />
                  <div>
                    <div className="text-xs text-gray-400">Call</div>
                    <div className="font-semibold">{venue.contactOptions.call}</div>
                  </div>
                </a>
              )}

              {/* WhatsApp */}
              {venue.contactOptions?.whatsapp && (
                <button 
                  onClick={handleContact}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-gray-200 mb-3 transition-colors"
                >
                  <MessageCircle size={18} className="text-green-500" />
                  <div>
                    <div className="text-xs text-gray-400">WhatsApp</div>
                    <div className="font-semibold">Message Us</div>
                  </div>
                </button>
              )}

              {/* Website */}
              {venue.website && (
                <a 
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-gray-200 mb-4 transition-colors"
                >
                  <Globe size={18} className="text-gold-500" />
                  <div>
                    <div className="text-xs text-gray-400">Website</div>
                    <div className="font-semibold text-sm truncate">{venue.website}</div>
                  </div>
                </a>
              )}

              {/* Booking Button */}
              <button 
                onClick={handleBooking}
                className={`w-full mt-4 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                  bookingRequested 
                    ? 'bg-green-500/20 border border-green-500 text-green-400' 
                    : 'bg-gold-500 text-black hover:bg-gold-400'
                }`}
              >
                <Clock size={18} />
                {bookingRequested ? 'Booking Sent!' : 'Book Table / Tickets'}
              </button>

              {/* Verified Badge */}
              {venue.verified && (
                <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-green-400 text-sm font-semibold">✓ Verified Venue</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightlifeDetailView;
