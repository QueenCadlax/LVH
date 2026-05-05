import React, { useMemo, useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import FilterPanel from './FiltersPanel';
import ProductGrid from './ProductGrid';
import ProductDetail from './ProductDetail';
import { marketplaceProducts, sellers } from '../../data/seeds';
import { Product } from '../../types';

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'newest' | 'best-sellers';

type Filters = {
  search: string;
  category: string;
  priceMin: number | null;
  priceMax: number | null;
  brand: string;
  sellerType: string;
  rating: number;
};

interface MarketplaceLandingProps {
  navigate?: (view: string) => void;
}

const MarketplaceLanding: React.FC<MarketplaceLandingProps> = ({ navigate = () => {} }) => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: 'All',
    priceMin: null,
    priceMax: null,
    brand: '',
    sellerType: 'All',
    rating: 0
  });
  
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  // Filter and search logic
  const filteredAndSorted = useMemo(() => {
    let results = marketplaceProducts.filter(p => {
      // Search
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase()) && !p.brand?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      // Category
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      // Price range
      if (filters.priceMin !== null && p.priceValue < filters.priceMin) return false;
      if (filters.priceMax !== null && p.priceValue > filters.priceMax) return false;
      // Brand
      if (filters.brand && p.brand?.toLowerCase() !== filters.brand.toLowerCase()) return false;
      // Seller type
      if (filters.sellerType !== 'All' && p.sellerType !== filters.sellerType) return false;
      // Rating
      if (filters.rating > 0 && p.rating < filters.rating) return false;
      return true;
    });

    // Sort
    if (sortBy === 'price-low') {
      results.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'newest') {
      results.reverse();
    } else if (sortBy === 'best-sellers') {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      // recommended: sponsors first
      results.sort((a, b) => {
        if (a.isSponsored && !b.isSponsored) return -1;
        if (!a.isSponsored && b.isSponsored) return 1;
        return b.rating - a.rating;
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

    // Limit to curated count (12-20). Use 16 as default.
    return results.slice(0, 16);
  }, [filters, sortBy]);

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'newest': return 'New Arrivals';
      case 'best-sellers': return 'Best Sellers';
      default: return 'Recommended';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-[#121212] border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
          <div className="text-center mb-8 bg-gradient-to-b from-yellow-600/10 to-transparent rounded-2xl p-8 border border-yellow-600/20">
            <h1 className="text-5xl font-light text-white mb-2">Curated Gallery</h1>
            <p className="text-white/70 text-sm">Objects of distinction. Released in limited quantities.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('add-product')}
                className="px-8 py-4 bg-yellow-600 text-black font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all shadow-lg"
              >
                ✨ + List Your Product
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands, or sellers…"
                value={filters.search}
                onChange={e => setFilters({...filters, search: e.target.value})}
                className="w-full pl-12 pr-4 py-3 border border-[#d4af37]/20 rounded-lg text-white placeholder-gray-500 bg-[#121212] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters({...filters, search: ''})}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            {/* Popular Filters shortcuts - quick access */}
            <div className="mt-4 flex gap-3 justify-center flex-wrap">
              {[
                {label: 'Under R500', action: () => setFilters({...filters, priceMax: 500})},
                {label: 'Free Delivery', action: () => setFilters({...filters, sellerType: 'All', priceMin: filters.priceMin, priceMax: filters.priceMax})},
                {label: 'Top Rated', action: () => setFilters({...filters, rating: 4})},
                {label: 'New Arrivals', action: () => setSortBy('newest')}
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => chip.action()}
                  className="px-3 py-1.5 bg-[#121212] text-[#cfcfcf] border border-[#d4af37]/20 rounded-full text-sm hover:border-[#ffd700] transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </aside>

          {/* Products */}
          <main className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-white/70">
                Curated selection • <span className="font-semibold text-white">{filteredAndSorted.length}</span> items
              </p>
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-600/30 rounded-lg text-sm text-white hover:bg-black/50 transition-colors"
                >
                  {getSortLabel(sortBy)}
                  <ChevronDown size={16} />
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 mt-1 w-48 bg-black border border-yellow-600/30 rounded-lg shadow-lg z-10">
                    {(['recommended', 'price-low', 'price-high', 'newest', 'best-sellers'] as SortOption[]).map(sort => (
                      <button
                        key={sort}
                        onClick={() => { setSortBy(sort); setShowSortMenu(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-black/70 ${sortBy === sort ? 'bg-yellow-600/10 text-yellow-600 font-semibold' : 'text-white/80'}`}
                      >
                        {getSortLabel(sort)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid 
              products={filteredAndSorted} 
              sellers={sellers} 
              onView={(product) => {
                setSelected(product);
              }} 
            />
          </main>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selected && (
        <ProductDetail
          product={selected}
          seller={sellers.find(s => s.id === selected.sellerId)}
          onClose={() => setSelected(null)}
          onVisitSeller={(sellerId) => {
            setFilters((prev) => ({ ...prev, sellerType: sellerId }));
            setSelected(null);
          }}
          onSelectProduct={(p) => setSelected(p)}
        />
      )}
    </div>
  );
};

export default MarketplaceLanding;
