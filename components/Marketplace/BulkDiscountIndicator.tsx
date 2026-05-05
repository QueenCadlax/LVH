import React from 'react';
import { TrendingDown, Gift, AlertCircle } from 'lucide-react';

interface BulkDiscountIndicatorProps {
  productPrice: number;
  quantity: number;
  onQuantityChange?: (qty: number) => void;
}

// Mock bulk discount structure (can be customized per seller)
const getBulkDiscountTiers = (price: number) => {
  return [
    { min: 1, max: 4, discountPercent: 0, label: 'Regular Price' },
    { min: 5, max: 9, discountPercent: 5, label: '5+ items: 5% OFF' },
    { min: 10, max: 19, discountPercent: 10, label: '10+ items: 10% OFF' },
    { min: 20, max: Infinity, discountPercent: 15, label: '20+ items: 15% OFF' }
  ];
};

export default function BulkDiscountIndicator({ productPrice, quantity = 1, onQuantityChange }: BulkDiscountIndicatorProps) {
  const tiers = getBulkDiscountTiers(productPrice);
  const currentTier = tiers.find(tier => quantity >= tier.min && quantity <= tier.max);
  const nextTier = tiers.find(tier => quantity < tier.min);

  const currentDiscount = currentTier?.discountPercent || 0;
  const discountedPrice = productPrice * (1 - currentDiscount / 100);
  const totalSavings = (productPrice - discountedPrice) * quantity;

  return (
    <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-600/40 rounded-lg p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <TrendingDown size={20} className="text-green-400" />
          <div>
            <p className="text-sm font-bold text-green-400">Bulk Purchase Discounts</p>
            <p className="text-xs text-gray-400">Save more when you buy in bulk</p>
          </div>
        </div>
      </div>

      {/* CURRENT STATUS */}
      {currentDiscount > 0 && (
        <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-green-300">✓ Your Current Discount</p>
            <span className="text-lg font-bold text-green-400">{currentDiscount}% OFF</span>
          </div>
          <div className="space-y-1 text-xs text-green-200">
            <p>• Unit Price: R {productPrice} → R {discountedPrice.toFixed(2)}</p>
            <p>• Total Savings (Qty {quantity}): R {totalSavings.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* TIER PROGRESSION */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase">Discount Tiers</p>
        <div className="space-y-2">
          {tiers.map((tier, idx) => {
            const isActive = quantity >= tier.min && quantity <= tier.max;
            const isNextTarget = nextTier?.min === tier.min;

            return (
              <div key={idx}>
                <div
                  className={`flex items-center justify-between p-2 rounded-lg transition ${
                    isActive
                      ? 'bg-green-600/30 border border-green-600/50'
                      : isNextTarget
                      ? 'bg-yellow-600/20 border border-yellow-600/40'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && <span className="text-green-400">✓</span>}
                    {isNextTarget && <span className="text-yellow-400">→</span>}
                    <span
                      className={`text-xs font-semibold ${
                        isActive
                          ? 'text-green-300'
                          : isNextTarget
                          ? 'text-yellow-300'
                          : 'text-gray-400'
                      }`}
                    >
                      {tier.label}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      isActive
                        ? 'text-green-400'
                        : isNextTarget
                        ? 'text-yellow-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {tier.discountPercent}% OFF
                  </span>
                </div>

                {/* PROGRESS TO NEXT TIER */}
                {isNextTarget && tier.min !== 1 && (
                  <div className="ml-2 text-xs text-yellow-300 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} />
                    <span>
                      Buy {tier.min - quantity} more for {tier.discountPercent}% discount
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SAVINGS CALCULATOR */}
      {quantity > 1 && (
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-xs text-gray-400 mb-2">Total Order Value</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500 line-through">R {(productPrice * quantity).toFixed(2)}</p>
              <p className="text-lg font-bold text-white">R {(discountedPrice * quantity).toFixed(2)}</p>
            </div>
            {totalSavings > 0 && (
              <div className="text-right">
                <p className="text-xs text-green-400 font-semibold">You Save</p>
                <p className="text-lg font-bold text-green-400">R {totalSavings.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUANTITY SELECTOR */}
      {onQuantityChange && (
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded text-white font-bold transition"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="flex-1 text-center bg-transparent text-white font-bold outline-none"
            min="1"
          />
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded text-white font-bold transition"
          >
            +
          </button>
        </div>
      )}

      {/* INFO */}
      <div className="flex items-start gap-2 text-xs text-gray-400 bg-white/5 p-2 rounded-lg">
        <Gift size={14} className="mt-0.5 flex-shrink-0" />
        <p>Bulk discounts are automatically applied at checkout for qualifying orders</p>
      </div>
    </div>
  );
}
