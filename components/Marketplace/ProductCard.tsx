import React from 'react';
import { Product, PRODUCT_CATEGORY_ICONS } from '../../types';
import { Star, Heart, Eye, ShoppingCart, Check } from 'lucide-react';
import { MarketButton } from '../Shared';

interface ProductCardProps {
  product: Product;
  onView?: (p: Product) => void;
}

export default function ProductCard({ product, onView }: ProductCardProps) {
  const firstImage = product.images?.[0] || '';

  // HARD RENDER RULE: only render marketplace product cards when essential data exists
  const hasImage = !!firstImage;
  const hasTitle = !!product.title;
  const hasPrice = (typeof product.priceValue === 'number' && !Number.isNaN(product.priceValue)) || (product.price && product.price !== 'Price on request');
  if (!hasImage || !hasTitle || !hasPrice || product.price === 'Price on request') return null;

  const formatPrice = (p?: number, raw?: string) => {
    try {
      if (typeof p === 'number' && !Number.isNaN(p)) {
        return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(p);
      }
    } catch (e) {}
    return raw || 'Price on request';
  };

  const priceLabel = formatPrice(product.priceValue, product.price);

  // Determine trust badge (ONE only)
  const getTrustBadge = () => {
    if (product.isVerified) return { label: 'Verified Brand', icon: <Check size={12} />, color: 'yellow' };
    if (product.sellerType === 'premium') return { label: 'Premium Partner', icon: <Check size={12} />, color: 'yellow' };
    if (product.sellerType === 'local') return { label: 'Local Seller', icon: <Check size={12} />, color: 'gold' };
    return null;
  };

  const trustBadge = getTrustBadge();

  return (
    <article
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onView?.(product)}
      onClick={() => onView?.(product)}
      className="group bg-black rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_24px_80px_rgba(212,175,55,0.25)] hover:-translate-y-2 hover:border-[#ffd700] cursor-pointer border border-[#d4af37]/50 flex flex-col h-[440px]"
    >
      {/* ===== 1. HERO IMAGE ===== */}
      <div className="relative w-full h-56 bg-[#070707] overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={firstImage} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

        {/* Trust Badge (TOP-RIGHT, PROMINENT) - ONE ONLY */}
        {trustBadge && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 rounded-full border border-[#ffd700]/60 backdrop-blur">
            {trustBadge.icon && <span className="text-[#ffd700]">{trustBadge.icon}</span>}
            <span className="text-xs font-semibold text-[#ffd700]">{trustBadge.label}</span>
          </div>
        )}

        {/* Favorite Button (TOP-LEFT) */}
        <button 
          onClick={(e) => e.stopPropagation()} 
          className="absolute top-3 left-3 p-2 rounded-full bg-black/60 text-[#ffd700] border border-[#d4af37]/40 hover:bg-black/80 hover:border-[#ffd700] transition-all"
        >
          <Heart size={14} />
        </button>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onView?.(product); }} 
            className="px-6 py-2 bg-[#ffd700] text-black font-bold text-sm rounded-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
          >
            View Product
          </button>
        </div>
      </div>

      {/* ===== CLEAN CONTENT SECTION ===== */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        {/* Top Section: Product Name & Price */}
        <div className="space-y-3">
          {/* 2. PRODUCT NAME (appears ONE TIME ONLY) */}
          <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">{product.title}</h3>

          {/* 3. PRICE (PROMINENT) */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#ffd700]">{priceLabel}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Middle Section: Seller & Rating */}
        <div className="space-y-2 py-2 border-t border-white/5">
          {/* 4. SELLER/BRAND (ONE LABEL ONLY) */}
          {product.sellerName && (
            <p className="text-xs text-gray-400">
              <span className="text-gray-500">By</span> <span className="text-white font-semibold">{product.sellerName}</span>
            </p>
          )}

          {/* 5. RATING (appears ONE TIME ONLY - clean format) */}
          {product.rating !== undefined && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star size={12} className="text-[#ffd700] fill-[#ffd700]" />
                <span className="text-xs font-semibold text-white">{product.rating.toFixed(1)}</span>
              </div>
              {product.reviewCount && product.reviewCount > 0 && (
                <span className="text-xs text-gray-500">({product.reviewCount} reviews)</span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Section: CTA */}
        <button 
          onClick={(e: any) => { e.stopPropagation(); onView?.(product); }}
          className="w-full mt-auto px-4 py-2.5 text-sm font-bold bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-black rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105"
          title="View full product details"
        >
          View Product
        </button>
      </div>
    </article>
  );
}

