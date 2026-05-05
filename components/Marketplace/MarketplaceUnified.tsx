import React, { useMemo, useState, useEffect } from 'react';
import { Search, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import FilterPanel from './FiltersPanel';
import ProductGrid from './ProductGrid';
import ProductDetail from './ProductDetail';
import Breadcrumb from '../Shared/Breadcrumb';
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

interface MarketplaceUnifiedProps {
  navigate?: (view: string, category?: string, id?: string, sub?: string) => void;
  selectedProductId?: string;
  initialCategory?: string;
}

const ITEMS_PER_PAGE = 16;

const MarketplaceUnified: React.FC<MarketplaceUnifiedProps> = ({ 
  navigate,
  selectedProductId,
  initialCategory = 'All'
}) => {
  // Initialize filters from URL params or defaults
  const [filters, setFilters] = useState<Filters>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return {
        search: params.get('search') || '',
        category: params.get('category') || initialCategory,
        priceMin: params.get('priceMin') ? Number(params.get('priceMin')) : null,
        priceMax: params.get('priceMax') ? Number(params.get('priceMax')) : null,
        brand: params.get('brand') || '',
        sellerType: params.get('sellerType') || 'All',
        rating: params.get('rating') ? Number(params.get('rating')) : 0
      };
    } catch {
      return {
        search: '',
        category: initialCategory,
        priceMin: null,
        priceMax: null,
        brand: '',
        sellerType: 'All',
        rating: 0
      };
    }
  });
  
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Load selected product from ID
  useEffect(() => {
    if (selectedProductId) {
      const product = marketplaceProducts.find(p => p.id === selectedProductId);
      if (product) {
        setSelected(product);
      }
    }
  }, [selectedProductId]);

  // Filter and search logic
  const filteredAndSorted = useMemo(() => {
    let results = marketplaceProducts.filter(p => {
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase()) && !p.brand?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      if (filters.priceMin !== null && p.priceValue < filters.priceMin) return false;
      if (filters.priceMax !== null && p.priceValue > filters.priceMax) return false;
      if (filters.brand && p.brand?.toLowerCase() !== filters.brand.toLowerCase()) return false;
      if (filters.sellerType !== 'All' && p.sellerType !== filters.sellerType) return false;
      if (filters.rating > 0 && p.rating < filters.rating) return false;
      return true;
    });

    if (sortBy === 'price-low') {
      results.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'newest') {
      results.reverse();
    } else if (sortBy === 'best-sellers') {
      results.sort((a, b) => b.rating - a.rating);
    } else {
      results.sort((a, b) => {
        if (a.isSponsored && !b.isSponsored) return -1;
        if (!a.isSponsored && b.isSponsored) return 1;
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.rating - a.rating;
      });
    }

    const allowedCategories = ['Fashion','Electronics','Beauty & Health','Home & Living','Food & Beverages','Watches & Luxury'];
    results = results.filter(p => {
      const hasImage = !!p.images && p.images.length > 0 && !!p.images[0];
      const hasTitle = !!p.title;
      const hasPrice = (typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || (p.price && p.price !== 'Price on request');
      return hasImage && hasTitle && hasPrice && allowedCategories.includes(p.category || '');
    });

    return results;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Persist filters to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category !== 'All') params.set('category', filters.category);
    if (filters.priceMin !== null) params.set('priceMin', String(filters.priceMin));
    if (filters.priceMax !== null) params.set('priceMax', String(filters.priceMax));
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.sellerType !== 'All') params.set('sellerType', filters.sellerType);
    if (filters.rating > 0) params.set('rating', String(filters.rating));
    if (sortBy !== 'recommended') params.set('sort', sortBy);

    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
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

  const handleProductSelect = (product: Product) => {
    setSelected(product);
    navigate?.('marketplace-detail', '', product.id);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Breadcrumb */}
      <div className="bg-[#121212] border-b border-[#d4af37]/10 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', onClick: () => navigate?.('home', '', '') },
            { label: 'Marketplace', isActive: !selected },
            ...(selected ? [{ label: selected.title, isActive: true }] : [])
          ]} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-light text-white mb-3 tracking-wide">Curated Marketplace</h1>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mx-auto mb-4"></div>
            <p className="text-white/60 text-base">Discover premium products from trusted sellers across Mpumalanga</p>
          </div>

          {/* Seller CTA Banner */}
          <div className="mb-12 p-6 bg-gradient-to-r from-[#d4af37]/10 via-[#ffd700]/15 to-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl backdrop-blur-sm hover:border-[#ffd700]/50 transition-all group">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[#ffd700] font-semibold text-sm mb-1">SELL WITH US</p>
                <p className="text-white font-light">Have products to sell? Start listing from R25/month and reach verified buyers.</p>
              </div>
              <button
                onClick={() => navigate?.('add-product')}
                className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#ffd700] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all hover:scale-105 flex-shrink-0"
              >
                <span>List a Product</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : 'scale-100'}`}>
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${searchFocused ? 'text-[#ffd700]' : 'text-[#bfa14f]'}`} />
              <input
                type="text"
                placeholder="Search products, brands, or sellers…"
                value={filters.search}
                onChange={e => setFilters({...filters, search: e.target.value})}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full pl-12 pr-12 py-4 border rounded-xl text-white placeholder-gray-500 bg-black/40 focus:outline-none transition-all backdrop-blur-sm ${
                  searchFocused 
                    ? 'border-[#ffd700] ring-2 ring-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]' 
                    : 'border-[#d4af37]/40 focus:border-[#ffd700]'
                }`}
              />
              {filters.search && (
                <button
                  onClick={() => setFilters({...filters, search: ''})}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#d4af37] hover:scale-110 transition-all"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Search Highlight Indicator */}
            {filters.search && (
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-1 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-full text-xs text-[#ffd700]">
                  Showing {filteredAndSorted.length} result{filteredAndSorted.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            {/* Quick Filters */}
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              {[
                {label: 'Under R500', action: () => setFilters({...filters, priceMax: 500})},
                {label: 'Top Rated', action: () => setFilters({...filters, rating: 4})},
                {label: 'New Arrivals', action: () => setSortBy('newest')},
                {label: 'Best Value', action: () => setSortBy('price-low')}
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => chip.action()}
                  className="px-4 py-2 bg-black/40 text-[#cfcfcf] border border-[#d4af37]/40 rounded-full text-sm hover:border-[#ffd700] hover:text-[#ffd700] hover:bg-[#d4af37]/10 transition-all backdrop-blur-sm font-medium hover:-translate-y-1"
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
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <FilterPanel filters={filters} setFilters={setFilters} />
          </aside>

          {/* Products Section */}
          <main className="lg:col-span-3">
            {/* Sort Bar + Results Count */}
            <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-white/70">
                Showing <span className="font-semibold text-white">{paginatedProducts.length}</span> of <span className="font-semibold text-white">{filteredAndSorted.length}</span> items
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
              products={paginatedProducts} 
              sellers={sellers} 
              onView={handleProductSelect}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-[#d4af37]/20 text-white hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg border transition-all ${
                        currentPage === pageNum
                          ? 'bg-yellow-600 border-yellow-600 text-black font-semibold'
                          : 'border-[#d4af37]/20 text-white hover:bg-black/50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-[#d4af37]/20 text-white hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selected && (
        <ProductDetail
          product={selected}
          seller={sellers.find(s => s.id === selected.sellerId)}
          onClose={() => {
            setSelected(null);
            navigate?.('marketplace', '', '');
          }}
          onVisitSeller={(sellerId) => {
            setFilters((prev) => ({ ...prev, sellerType: sellerId }));
            setSelected(null);
          }}
          onSelectProduct={handleProductSelect}
        />
      )}


    </div>
  );
};

export default MarketplaceUnified;
