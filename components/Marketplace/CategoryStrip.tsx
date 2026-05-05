import React, { useMemo } from 'react';
import { MARKETPLACE_CATEGORY_GROUPS } from '../../types';
import { Star, Gift, Home, Package, Heart } from 'lucide-react';

interface CategoryStripProps {
  selectedCategory?: string;
  onSelect?: (category: string) => void;
}

export default function CategoryStrip({ selectedCategory, onSelect }: CategoryStripProps) {
  // Get first few categories from each group for the strip
  const displayCategories = useMemo(() => {
    const categories: string[] = [];
    const groups = Object.values(MARKETPLACE_CATEGORY_GROUPS);
    
    // Take first item from first 5 groups to show variety
    groups.slice(0, 5).forEach((items) => {
      if (items.length > 0) {
        categories.push(items[0]);
      }
    });
    
    return categories;
  }, []);

  return (
    <div className="w-full overflow-x-auto -mx-4 px-4 py-4">
      <div className="flex gap-2">
        <button
          onClick={() => onSelect?.('')}
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
            !selectedCategory
              ? 'bg-[#ffd700] text-black border-[#ffd700] shadow-lg shadow-[#ffd700]/50'
              : 'bg-[#121212] text-[#cfcfcf] border-[#d4af37]/30 hover:border-[#ffd700] hover:bg-[#1c1c1c]'
          }`}
        >
          All Products
        </button>
        {/* Highlighted Luxury Picks */}
        <button
          onClick={() => onSelect?.('Luxury Picks')}
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
            selectedCategory === 'Luxury Picks'
              ? 'bg-[#ffd700] text-black border-[#ffd700] shadow-lg shadow-[#ffd700]/50'
              : 'bg-[#0f0f0f] text-[#f4e6b3] border-[#d4af37]/10 hover:border-[#ffd700] hover:bg-[#121212]'
          }`}
        >
          <Star size={14} className="inline mr-2" /> Luxury Picks
        </button>
        {displayCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect?.(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
              selectedCategory === cat
                ? 'bg-[#ffd700] text-black border-[#ffd700] shadow-lg shadow-[#ffd700]/50'
                : 'bg-[#121212] text-[#cfcfcf] border-[#d4af37]/30 hover:border-[#ffd700] hover:bg-[#1c1c1c]'
            }`}
          >
            {/* small icon mapping for a few top categories */}
            {cat === 'Home & Living' && <Home size={14} className="inline mr-2" />}
            {cat === 'Gifts' && <Gift size={14} className="inline mr-2" />}
            {cat === 'Fashion' && <Heart size={14} className="inline mr-2" />}
            {cat === 'Electronics' && <Package size={14} className="inline mr-2" />}
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
