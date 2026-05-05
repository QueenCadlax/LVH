import React, { useMemo } from 'react';
import { X, Star, MapPin, MessageSquare } from 'lucide-react';
import { Product, Seller } from '../../types';
import { marketplaceProducts } from '../../data/seeds';

interface SellerProfileModalProps {
  seller: Seller;
  onClose: () => void;
  onProductSelect?: (product: Product) => void;
}

export default function SellerProfileModal({ seller, onClose, onProductSelect }: SellerProfileModalProps) {
  const sellerProducts = useMemo(() => {
    return marketplaceProducts.filter(
      (p) => p.sellerId === seller.id && 
      p.images && 
      p.images.length > 0 && 
      !!p.images[0] && 
      p.title && 
      ((typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || 
       (p.price && p.price !== 'Price on request'))
    );
  }, [seller.id]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl bg-black rounded-2xl border border-yellow-600/20 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-yellow-600/20 p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">{seller.name}</h2>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-600" />
                <span className="text-white font-semibold">{seller.rating?.toFixed(1) || '4.8'}</span>
                <span className="text-gray-400 text-sm">({seller.reviewCount || 124} reviews)</span>
              </div>
              {seller.location && (
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span className="text-sm">{seller.location}</span>
                </div>
              )}
            </div>
            {seller.description && (
              <p className="text-gray-400 text-sm mt-3 max-w-2xl">{seller.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-yellow-600/10 rounded-lg transition-colors text-gray-400 hover:text-yellow-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Seller Info */}
        <div className="p-6 border-b border-yellow-600/10 space-y-4">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
            <div className="p-3 bg-yellow-600/5 rounded-lg border border-yellow-600/10">
              <p className="text-gray-400 text-xs uppercase mb-1">Products</p>
              <p className="text-white text-xl font-bold">{sellerProducts.length}</p>
            </div>
            <div className="p-3 bg-yellow-600/5 rounded-lg border border-yellow-600/10">
              <p className="text-gray-400 text-xs uppercase mb-1">Response Time</p>
              <p className="text-white text-lg font-bold">2-4h</p>
            </div>
            <div className="p-3 bg-yellow-600/5 rounded-lg border border-yellow-600/10">
              <p className="text-gray-400 text-xs uppercase mb-1">Trust Score</p>
              <p className="text-white text-lg font-bold">{seller.trustScore || 95}%</p>
            </div>
            <div className="p-3 bg-yellow-600/5 rounded-lg border border-yellow-600/10 hidden md:block">
              <p className="text-gray-400 text-xs uppercase mb-1">Member Since</p>
              <p className="text-white text-sm font-bold">2024</p>
            </div>
          </div>

          <button className="w-full py-3 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
            <MessageSquare size={18} />
            Contact Seller
          </button>
        </div>

        {/* Products */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-6">All Products ({sellerProducts.length})</h3>
          
          {sellerProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">This seller hasn't listed any products yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sellerProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onProductSelect?.(product);
                    onClose();
                  }}
                  className="group cursor-pointer bg-[#0a0a0a] rounded-lg border border-yellow-600/10 overflow-hidden hover:border-yellow-600/30 transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-yellow-600">
                      {product.title}
                    </h4>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-yellow-600 font-bold">{product.price}</p>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-600" />
                        <span className="text-xs text-gray-400">{product.rating?.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
