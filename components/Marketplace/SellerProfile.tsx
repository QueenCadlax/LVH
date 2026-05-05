import React from 'react';
import { Seller, Product } from '../../types';
import { marketplaceProducts } from '../../data/seeds';

const SellerProfile: React.FC<{ seller: Seller }> = ({ seller }) => {
  const listings: Product[] = marketplaceProducts.filter(p => p.sellerId === seller.id && p.images && p.images.length > 0 && !!p.images[0] && p.title && ((typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || (p.price && p.price !== 'Price on request')));

  return (
    <div className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
      <div className="bg-[#0a0a0a] p-8 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 flex-shrink-0 border-2 border-gold-500/30">
          <img src={seller.logo} alt={seller.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <h2 className="text-4xl font-bold text-white mb-1 uppercase tracking-wider">{seller.name}</h2>
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">{seller.isBusiness ? 'Business' : 'Individual'} Seller {seller.isVerified && '• Verified'}</p>
          <p className="text-gray-300 text-sm mb-2">{seller.location}</p>
          <p className="text-gray-400 text-sm">{seller.description}</p>
        </div>
        <div className="md:text-right">
          <div className="text-gold-500 font-bold text-lg">{seller.totalListings || listings.length}</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest">Total Listings</div>
        </div>
      </div>

      <section>
        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Seller's Listings</h3>
        <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-transparent mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map(l => (
            <div key={l.id} className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-white/10 hover:border-gold-500/30 transition-all duration-200 group">
              <div className="relative overflow-hidden h-36 bg-gray-900">
                <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {l.isSponsored && <div className="absolute top-2 left-2 bg-gold-500 text-black text-[10px] font-black px-2 py-1 rounded">SPONSORED</div>}
                {l.isFeatured && !l.isSponsored && <div className="absolute top-2 left-2 bg-gold-500 text-black text-[10px] font-bold px-2 py-1 rounded">FEATURED</div>}
              </div>
              <div className="p-3">
                <h4 className="text-white font-semibold text-sm line-clamp-2 mb-1">{l.title}</h4>
                <p className="text-gold-400 font-bold text-sm">{l.price}</p>
                <p className="text-gray-500 text-xs mt-1">{l.condition}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SellerProfile;
