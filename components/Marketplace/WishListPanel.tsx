import React from 'react';
import { X, Heart, Share2, Bell } from 'lucide-react';
import { MarketplaceItem } from '../../types';

interface WishListPanelProps {
  wishListItems: MarketplaceItem[];
  onClose: () => void;
  onRemove: (productId: string) => void;
  onShare?: (product: MarketplaceItem) => void;
  onPriceAlert?: (productId: string) => void;
}

export default function WishListPanel({ wishListItems, onClose, onRemove, onShare, onPriceAlert }: WishListPanelProps) {
  const [priceAlerts, setPriceAlerts] = React.useState<Record<string, boolean>>({});
  
  const totalValue = wishListItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const averageRating = wishListItems.length > 0
    ? (wishListItems.reduce((sum, item) => sum + (item.rating || 0), 0) / wishListItems.length).toFixed(1)
    : '0';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-black rounded-xl border border-yellow-600/50 w-full max-w-2xl my-6">
        {/* HEADER */}
        <div className="border-b border-yellow-600/50 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">My Wish List</h2>
            <p className="text-sm text-gray-400 mt-1">{wishListItems.length} items saved</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl transition"
          >
            ×
          </button>
        </div>

        {/* STATS BAR */}
        {wishListItems.length > 0 && (
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Total Value</p>
              <p className="text-xl font-bold text-yellow-400">R {totalValue.toLocaleString()}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Avg Rating</p>
              <p className="text-xl font-bold text-yellow-400">⭐ {averageRating}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Saved Since</p>
              <p className="text-xl font-bold text-yellow-400">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {wishListItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-white text-lg font-semibold mb-2">Your wish list is empty</p>
              <p className="text-gray-400 text-sm">Add products by clicking the heart icon</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishListItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-yellow-600/30 rounded-lg p-4 hover:bg-white/10 transition"
                >
                  <div className="flex gap-4">
                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* DETAILS */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <h3 className="text-white font-semibold line-clamp-2">{item.name}</h3>
                          <p className="text-xs text-gray-400 mt-1">{item.seller}</p>
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-gray-400 hover:text-red-400 transition flex-shrink-0"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* RATING & PRICE */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-yellow-400">★</span>
                          <span className="text-white font-semibold">{item.rating || 'N/A'}</span>
                          <span className="text-gray-500">({item.reviewCount || 0})</span>
                        </div>
                        <span className="text-lg font-bold text-yellow-400">R {item.price?.toLocaleString()}</span>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onPriceAlert?.(item.id);
                            setPriceAlerts(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                            priceAlerts[item.id]
                              ? 'bg-green-600/30 text-green-400 border border-green-600/50'
                              : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
                          }`}
                        >
                          <Bell size={14} />
                          {priceAlerts[item.id] ? 'Alert On' : 'Price Alert'}
                        </button>

                        <button
                          onClick={() => onShare?.(item)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 text-gray-300 border border-white/20 rounded-lg hover:bg-white/20 transition text-xs font-semibold"
                        >
                          <Share2 size={14} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {wishListItems.length > 0 && (
          <div className="border-t border-yellow-600/50 p-6 flex gap-3 justify-between">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white/20 font-bold transition"
            >
              Continue Shopping
            </button>
            <button
              className="flex-1 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg font-bold transition"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
