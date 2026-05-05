import React, { useMemo, useState } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import CategoryStrip from './CategoryStrip';
import FiltersPanel from './FiltersPanel';
import ProductGrid from './ProductGrid';
import ProductDetail from './ProductDetail';
import { marketplaceProducts, sellers as seedSellers } from '../../data/seeds';
import { Product, Seller } from '../../types';

export default function MarketplacePage() {
  const [filters, setFilters] = useState<any>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const sellersById = useMemo(() => {
    const map: Record<string, Seller> = {};
    seedSellers.forEach((s) => (map[s.id] = s));
    return map;
  }, []);

  const filtered = useMemo(() => {
    let results = marketplaceProducts.filter((p) => {
      // Search filter
      if (
        searchQuery &&
        !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (filters.category && p.category !== filters.category) return false;

      // Condition filter
      if (filters.condition && p.condition !== filters.condition) return false;

      // Seller type filter
      if (filters.sellerType && p.sellerType !== filters.sellerType) return false;

      // Price range filter
      if (filters.minPrice && p.priceValue < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.priceValue > Number(filters.maxPrice)) return false;

      // Rating filter
      if (filters.minRating && p.rating < filters.minRating) return false;

      // Seller filter
      if (filters.sellerId && p.sellerId !== filters.sellerId) return false;

      return true;
    });

    // Apply sorting
    if (sortBy === 'price-low') {
      results.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'best-sellers') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      results.reverse(); // Reverse to show newest first
    } else {
      // Default: recommended (sponsored first)
      results.sort((a, b) => {
        if (a.isSponsored && !b.isSponsored) return -1;
        if (!a.isSponsored && b.isSponsored) return 1;
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
    }

    // Enforce marketplace-only categories and required fields
    const allowedCategories = ['Fashion','Electronics','Beauty & Health','Home & Living','Food & Beverages','Watches & Luxury'];
    results = results.filter(p => {
      const hasImage = !!p.images && p.images.length > 0 && !!p.images[0];
      const hasTitle = !!p.title;
      const hasPrice = (typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || (p.price && p.price !== 'Price on request');
      return hasImage && hasTitle && hasPrice && allowedCategories.includes(p.category || '');
    });

    // Limit to curated set
    return results.slice(0, 16);
  }, [filters, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - Minimal Luxury */}
      <div className="bg-[#121212] border-b border-[#d4af37]/20 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light text-white mb-2">Marketplace</h1>
          <p className="text-[#cfcfcf] text-sm mb-6">Discover curated products from trusted local & national sellers</p>

          {/* Gold divider */}
          <div className="h-0.5 bg-[#ffd700] w-12 mb-6 shadow-lg shadow-[#ffd700]/50" />

          {/* Search Bar - Amazon Style */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bfa14f]" />
            <input
              type="text"
              placeholder="Search products, brands, or sellers…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#d4af37]/30 focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/50 transition-all bg-[#1c1c1c] text-white placeholder-gray-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#cfcfcf] transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Strip */}
        <CategoryStrip
          selectedCategory={filters.category}
          onSelect={(c) => setFilters({ ...filters, category: c })}
        />

        <div className="mt-8 flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block">
            <FiltersPanel filters={filters} setFilters={setFilters} />
          </div>

          {/* Mobile Filter Button */}
            <div className="md:hidden mb-4 w-full">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center gap-2 px-4 py-3 bg-black text-[#ffd700] rounded-lg font-semibold transition-all hover:bg-[#ffd700] hover:text-black duration-300 border border-[#d4af37]/20"
            >
              <Menu size={18} />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Mobile Slide-out Filters */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setShowMobileFilters(false)}>
              <div
                className="fixed left-0 top-0 bottom-0 w-80 bg-[#121212] border-r border-[#d4af37]/20 overflow-y-auto animate-slide-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 p-4 border-b border-[#d4af37]/20 flex justify-between items-center bg-[#121212]">
                  <h3 className="font-semibold text-white">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="text-[#cfcfcf] hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <FiltersPanel filters={filters} setFilters={setFilters} />
                </div>
              </div>
            </div>
          )}

          <main className="flex-1">
            {/* Sort Bar */}
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#d4af37]/10">
              <p className="text-sm text-[#cfcfcf] font-medium">{filtered.length} curated products</p>

              {/* Simple Select for Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[#121212] border border-[#d4af37]/30 rounded-lg text-sm text-white focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/50 transition-all cursor-pointer hover:border-[#ffd700]/50"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="best-sellers">Best Sellers</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filtered} onView={(p) => setSelected(p)} sellers={seedSellers} />
          </main>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selected && (
        <ProductDetail
          product={selected}
          seller={sellersById[selected.sellerId]}
          onClose={() => setSelected(null)}
          onVisitSeller={(sellerId) => {
            setFilters((prev: any) => ({ ...prev, sellerId }));
            setSelected(null);
          }}
          onSelectProduct={(p: any) => setSelected(p)}
        />
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
