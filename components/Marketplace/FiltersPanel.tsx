import React, { useMemo, useState } from 'react';
import { ChevronDown, Search, X, DollarSign, UserCheck } from 'lucide-react';
import { MARKETPLACE_CATEGORY_GROUPS } from '../../types';

interface FiltersPanelProps {
  filters: Record<string, any>;
  setFilters: (f: Record<string, any>) => void;
}

export default function FiltersPanel({ filters, setFilters }: FiltersPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    {
      price: true,
      sellerType: true,
      condition: false,
      rating: false
    }
  );
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    Object.keys(MARKETPLACE_CATEGORY_GROUPS).forEach((k, i) => {
      map[k] = i < 2; // expand first two groups by default
    });
    return map;
  });
  const [categorySearch, setCategorySearch] = useState('');

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Grouped categories filtered by search
  const groupedCategories = useMemo<Record<string, string[]>>(() => {
    const groups: Record<string, string[]> = {};
    Object.entries(MARKETPLACE_CATEGORY_GROUPS).forEach(([group, items]) => {
      const arr = Array.isArray(items) ? items as string[] : [];
      groups[group] = arr.filter((cat) =>
        !categorySearch || cat.toLowerCase().includes(categorySearch.toLowerCase())
      );
    });
    return groups;
  }, [categorySearch]);

  const sellerTypes = ['Local Seller', 'Verified Brand', 'Premium Partner'];
  const conditions = ['New', 'Used'];
  const ratings = [
    { label: '⭐⭐⭐⭐⭐', value: 5 },
    { label: '⭐⭐⭐⭐ & up', value: 4 },
    { label: '⭐⭐⭐ & up', value: 3 }
  ];

  return (
    <aside className="w-72 bg-[#121212] rounded-lg border border-[#1c1c1c]/30 p-4 space-y-4 hidden md:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Categories with Search */}
      <div>
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2">
            <Search size={16} className="text-[#bfa14f]" />
            <input
              type="text"
              placeholder="Search categories…"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-56 pl-2 pr-2 py-2 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setCategorySearch('')}
            className="text-gray-500 hover:text-[#cfcfcf]"
            aria-label="Clear category search"
          >
            <X size={14} />
          </button>
        </div>

        {/* Premium shortcuts: curated quick filters */}
        <div className="mt-2 px-2 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilters({ ...filters, minRating: 5 })}
            className="text-sm px-3 py-1 rounded-full bg-[#0f0f0f] border border-[#d4af37]/8 text-[#cfcfcf] hover:bg-[#1a1a1a] hover:text-[#ffd700] transition-colors"
          >
            Best Rated
          </button>
          <button
            onClick={() => setFilters({ ...filters, trending: true })}
            className="text-sm px-3 py-1 rounded-full bg-[#0f0f0f] border border-[#1c1c1c]/20 text-[#cfcfcf] hover:bg-[#1a1a1a] hover:text-[#ffd700] transition-colors"
          >
            Trending
          </button>
          <button
            onClick={() => setFilters({ ...filters, sellerType: 'Premium Partner' })}
            className="text-sm px-3 py-1 rounded-full bg-black/20 border border-[#d4af37]/10 text-[#cfcfcf] hover:bg-[#ffd700]/10 hover:text-[#ffd700] transition-colors"
          >
            Premium Partners
          </button>
          <button
            onClick={() => setFilters({ ...filters, fastDelivery: true })}
            className="text-sm px-3 py-1 rounded-full bg-[#0f0f0f] border border-[#1c1c1c]/20 text-[#cfcfcf] hover:bg-[#1a1a1a] hover:text-[#ffd700] transition-colors"
          >
            Fast Delivery
          </button>
        </div>

        <div className="space-y-2 px-2">
          {Object.entries(groupedCategories).map(([group, items]: [string, string[]]) => {
            if (!items || items.length === 0) return null;
            return (
              <div key={group} className="border-b border-[#d4af37]/8 pb-2">
                <button
                  onClick={() => setExpandedGroups((s) => ({ ...s, [group]: !s[group] }))}
                  className="w-full flex items-center justify-between text-sm text-white font-semibold py-2 hover:text-[#ffd700] transition-colors px-1 rounded hover:bg-[#d4af37]/5"
                >
                  <span>{group}</span>
                  <ChevronDown size={18} className={`transition-transform duration-200 ${expandedGroups[group] ? 'rotate-180' : ''}`} />
                </button>

                {expandedGroups[group] && (
                  <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                    {items.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group px-2 py-1.5 rounded hover:bg-[#d4af37]/5 transition-all">
                        <input
                          type="checkbox"
                          checked={filters.category === cat}
                          onChange={(e) => setFilters({ ...filters, category: e.target.checked ? cat : '' })}
                          className="w-4 h-4 rounded border-yellow-600 bg-[#1c1c1c] accent-yellow-600"
                        />
                        <span className="text-sm text-white/80 group-hover:text-[#ffd700] transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#d4af37]/10" />

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex justify-between items-center font-semibold text-white text-sm mb-3 hover:text-[#ffd700] transition-colors"
        >
          Price Range
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#cfcfcf] mb-1 block">Min (R)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice ?? ''}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
                }
                className="w-full px-3 py-2 border border-[#d4af37]/30 rounded-lg text-sm bg-[#1c1c1c] text-white focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/50 transition-all placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-xs text-[#cfcfcf] mb-1 block">Max (R)</label>
              <input
                type="number"
                placeholder="∞"
                value={filters.maxPrice ?? ''}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
                }
                className="w-full px-3 py-2 border border-[#d4af37]/30 rounded-lg text-sm bg-[#1c1c1c] text-white focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]/50 transition-all placeholder-gray-600"
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#d4af37]/10" />

      {/* Seller Type */}
      <div>
        <button
          onClick={() => toggleSection('sellerType')}
          className="w-full flex justify-between items-center font-semibold text-white text-sm mb-3 hover:text-[#ffd700] transition-colors"
        >
          Seller Type
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${expandedSections.sellerType ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.sellerType && (
          <div className="space-y-2">
            {sellerTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.sellerType === type}
                  onChange={(e) => setFilters({ ...filters, sellerType: e.target.checked ? type : '' })}
                  className="w-4 h-4 rounded border-[#d4af37] bg-[#1c1c1c] accent-[#ffd700]"
                />
                <span className="text-sm text-[#cfcfcf] group-hover:text-[#ffd700] transition-colors">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#d4af37]/10" />

      {/* Condition */}
      <div>
        <button
          onClick={() => toggleSection('condition')}
          className="w-full flex justify-between items-center font-semibold text-white text-sm mb-3 hover:text-[#ffd700] transition-colors"
        >
          Condition
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${expandedSections.condition ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.condition && (
          <div className="space-y-2">
            {conditions.map((cond) => (
              <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.condition === cond}
                  onChange={(e) => setFilters({ ...filters, condition: e.target.checked ? cond : '' })}
                  className="w-4 h-4 rounded border-[#d4af37] bg-[#1c1c1c] accent-[#ffd700]"
                />
                <span className="text-sm text-[#cfcfcf] group-hover:text-[#ffd700] transition-colors">{cond}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#d4af37]/10" />

      {/* Ratings */}
      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex justify-between items-center font-semibold text-white text-sm mb-3 hover:text-[#ffd700] transition-colors"
        >
          Ratings
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${expandedSections.rating ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            {ratings.map((r) => (
              <label key={r.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.minRating === r.value}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.checked ? r.value : undefined })}
                  className="w-4 h-4 rounded border-[#d4af37] bg-[#1c1c1c] accent-[#ffd700]"
                />
                <span className="text-sm text-[#cfcfcf] group-hover:text-[#ffd700] transition-colors">{r.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      {Object.values(filters).some((v) => v) && (
        <>
          <div className="border-t border-[#d4af37]/10" />
          <button
            onClick={() =>
              setFilters({
                category: '',
                minPrice: undefined,
                maxPrice: undefined,
                sellerType: '',
                condition: '',
                minRating: undefined
              })
            }
            className="w-full py-2 bg-[#000000] text-[#ffd700] border border-[#d4af37]/20 rounded-lg text-sm font-semibold hover:bg-[#ffd700] hover:text-black transition-all"
          >
            Clear All Filters
          </button>
        </>
      )}
    </aside>
  );
}
