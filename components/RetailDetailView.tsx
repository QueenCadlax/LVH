import React, { useState, useEffect } from 'react';
import { retailers } from '../data/retailSeeds';
import { Retailer } from '../types';
import { ArrowLeft, Phone, MessageCircle, MapPin, Star, Globe, ShoppingBag } from 'lucide-react';

const RetailDetailView: React.FC<{ retailerId: string | null; navigate: (view: string, cat?: string, id?: string) => void }> = ({ retailerId, navigate }) => {
  const retailer: Retailer | undefined = retailers.find(r => r.id === retailerId);
  
  if (!retailer) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-black">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate('retail')} className="flex items-center gap-2 text-gold-500 hover:text-gold-400 mb-6">
            <ArrowLeft size={20} /> Back to Retail
          </button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Retail store not found</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [retailerId]);

  const handleContact = () => {
    if (retailer.contactOptions?.whatsapp) {
      window.open(`https://wa.me/${retailer.contactOptions.whatsapp.replace(/\D/g, '')}`);
    } else if (retailer.contactOptions?.call) {
      window.location.href = `tel:${retailer.contactOptions.call}`;
    }
  };

  const location = typeof retailer.location === 'string' ? retailer.location : `${retailer.location.area}${retailer.location.city ? ', ' + retailer.location.city : ''}`;

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={() => navigate('retail')} 
          className="flex items-center gap-2 text-gold-500 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Retail
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative h-96 rounded-xl overflow-hidden mb-8 border border-white/10">
              <img 
                src={retailer.image} 
                alt={retailer.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* Tier Badge */}
              {(retailer.tier === 'Platinum' || retailer.tier === 'Elite') && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${
                  retailer.tier === 'Platinum' 
                    ? 'bg-gold-500 text-black' 
                    : 'bg-amber-500 text-black'
                }`}>
                  {retailer.tier.toUpperCase()}
                </div>
              )}
            </div>

            {/* Store Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-serif text-white mb-2">{retailer.name}</h1>
                  <p className="text-lg text-gray-400">{retailer.subcategory}</p>
                </div>
                {retailer.rating && (
                  <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg border border-white/10">
                    <Star size={18} className="text-gold-500 fill-gold-500" />
                    <span className="text-white font-semibold">{retailer.rating}</span>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <MapPin size={18} className="text-gold-500 flex-shrink-0" />
                <span>{location}</span>
              </div>

              {/* Price Range */}
              {retailer.priceRange && (
                <div className="text-gray-400 mb-6">
                  Price Range: <span className="text-gold-400 font-semibold">{retailer.priceRange}</span>
                </div>
              )}

              {/* Description */}
              {retailer.description && (
                <div className="bg-black/40 border border-white/10 rounded-lg p-6 mb-6">
                  <p className="text-gray-200 leading-relaxed">{retailer.description}</p>
                </div>
              )}

              {/* Tags */}
              {retailer.tags && retailer.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Store Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {retailer.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-300 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {retailer.products && retailer.products.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Available Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {retailer.products.map((product, idx) => (
                      <div key={idx} className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-gray-300 text-sm flex items-center gap-2">
                        <ShoppingBag size={14} className="text-gold-500" />
                        {product}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands */}
              {retailer.brands && retailer.brands.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">Brands & Collections</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {retailer.brands.map((brand, idx) => (
                      <div key={idx} className="px-3 py-2 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gray-300 text-sm">
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-6 sticky top-28">
              <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>

              {/* Call */}
              {retailer.contactOptions?.call && (
                <a 
                  href={`tel:${retailer.contactOptions.call}`}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-gray-200 mb-3 transition-colors"
                >
                  <Phone size={18} className="text-gold-500" />
                  <div>
                    <div className="text-xs text-gray-400">Call</div>
                    <div className="font-semibold">{retailer.contactOptions.call}</div>
                  </div>
                </a>
              )}

              {/* WhatsApp */}
              {retailer.contactOptions?.whatsapp && (
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
              {retailer.website && (
                <a 
                  href={retailer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-gray-200 transition-colors"
                >
                  <Globe size={18} className="text-gold-500" />
                  <div>
                    <div className="text-xs text-gray-400">Website</div>
                    <div className="font-semibold text-sm truncate">{retailer.website}</div>
                  </div>
                </a>
              )}

              {/* Shop Button */}
              {retailer.onlineStore && retailer.website && (
                <button 
                  onClick={() => window.open(retailer.website, '_blank')}
                  className="w-full mt-4 px-4 py-3 rounded-lg bg-gold-500 text-black font-semibold hover:bg-gold-400 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Shop Online
                </button>
              )}

              {/* Verified Badge */}
              {retailer.verified && (
                <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-green-400 text-sm font-semibold">✓ Verified Store</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailDetailView;
