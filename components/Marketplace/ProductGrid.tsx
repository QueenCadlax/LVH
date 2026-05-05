import React, { useMemo } from 'react';
import { Product, Seller } from '../../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onView: (p: Product) => void;
  sellers?: Seller[];
}

export default function ProductGrid({ products, onView, sellers = [] }: ProductGridProps) {
  const sellerMap = useMemo(() => {
    const map: Record<string, Seller> = {};
    sellers.forEach((s) => (map[s.id] = s));
    return map;
  }, [sellers]);

  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center bg-[#121212] rounded-lg border border-gray-800">
        <p className="text-white font-medium">No products match your filters</p>
        <p className="text-[#cfcfcf] text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 auto-rows-fr items-stretch">
      {products
        .filter(p => p.images && p.images.length > 0 && !!p.images[0] && p.title && ((typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || (p.price && p.price !== 'Price on request')))
        .map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onView={onView}
          />
        ))}
    </div>
  );
}
