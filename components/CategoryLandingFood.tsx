import React, { useMemo } from 'react';
import { Business } from '../types';
import SubcategoryCard from './SubcategoryCard';

interface Props {
  listings: Business[];
  onSelectSubcategory?: (name: string) => void;
}

const CategoryLandingFood: React.FC<Props> = ({ listings, onSelectSubcategory }) => {
  const featuredFoodListings = useMemo(() => listings.filter(l => (l.isPlatinum || l.isElite)).slice(0, 8), [listings]);
  const popularFoodListings = useMemo(() => listings.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 12), [listings]);

  const subcategories = Array.from(new Set(listings.map(l => l.subcategory).filter(Boolean))) as string[];

  return (
    <div className="bg-black text-white">
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl text-gold-300 font-semibold uppercase">Featured Restaurants</h2>
        <div className="mt-4 flex gap-4 overflow-x-auto py-2">
          {featuredFoodListings.map(f => (
            <div key={f.id} className="min-w-[260px] bg-black rounded-lg border border-gold-500/10 p-3">
              <div className="h-36 overflow-hidden rounded-md">
                <img src={f.image} className="w-full h-full object-cover" />
              </div>
              <div className="mt-2">
                <div className="text-gold-300 font-bold uppercase text-sm">{f.name}</div>
                <div className="text-gray-300 text-sm">{f.subcategory} • {f.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h3 className="text-xl text-gold-300 font-semibold uppercase">Popular Restaurants</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularFoodListings.map(p => (
            <SubcategoryCard
              key={p.id}
              business={p}
              isCompact={true}
              onClick={(business) => onSelectSubcategory?.(business.subcategory || '')}
              primaryCTA="View"
              secondaryCTA="Menu"
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h3 className="text-xl text-gold-300 font-semibold uppercase">Explore Subcategories</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {subcategories.map(sc => (
            <button key={sc} onClick={() => onSelectSubcategory?.(sc)} className="px-4 py-2 rounded border border-gold-500 text-gold-300 bg-black/60">{sc}</button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <h3 className="text-xl text-gold-300 font-semibold uppercase">Curated Collections</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 p-4 rounded-2xl border border-gold-500/5">
            <div className="text-gold-300 font-bold">Elite Picks</div>
            <div className="text-gray-300 text-sm mt-2">Handpicked elite dining experiences across Mpumalanga.</div>
          </div>
          <div className="bg-black/30 p-4 rounded-2xl border border-gold-500/5">
            <div className="text-gold-300 font-bold">Street Food Gems</div>
            <div className="text-gray-300 text-sm mt-2">Trending food trucks and pop-ups for adventurous eaters.</div>
          </div>
          <div className="bg-black/30 p-4 rounded-2xl border border-gold-500/5">
            <div className="text-gold-300 font-bold">Sweet & Bakery</div>
            <div className="text-gray-300 text-sm mt-2">Artisan bakeries and dessert specialists.</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryLandingFood;
