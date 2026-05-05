import React, { useState, useMemo, useCallback } from 'react';
import RetailCard from './RetailCard';
import { retailers } from '../data/retailSeeds';
import { Retailer, MPUMALANGA_AREAS, Category, CategorySubcategories } from '../types';
import { SectionTitle } from './Shared';
import { Search } from 'lucide-react';

const retailFilters = [
  'Luxury Brand',
  'Local Brand',
  'Women-Owned',
  'Eco-Friendly',
  'Handmade',
  'Online Store',
  'In-Store Pickup',
  'Delivery Available',
  'Custom Orders',
  'Gift Items',
  'Wholesale Available',
  'Parking Available',
];

// Memoize suggestions at module level to avoid re-calculation
const getRetailSuggestions = () => {
  const names = retailers.map(r => r.name);
  const brands = retailers.flatMap(r => r.brands || []);
  const products = retailers.flatMap(r => r.products || []);
  return Array.from(new Set([...names, ...brands, ...products]));
};
const retailSuggestions = getRetailSuggestions();

const RetailPage: React.FC<{ navigate: (view: string, category?: string, id?: string) => void }> = ({ navigate }) => {
  const [filters, setFilters] = useState<any>({ areas: [], subcategories: [], attributes: {}, priceMin: 0, priceMax: 5000, verified: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [areaQuery, setAreaQuery] = useState('');

  // Use pre-cached suggestions for faster rendering
  const allSuggestions = retailSuggestions;

  const filtered = useMemo(() => {
    return retailers.filter((r) => {
      // Area
      if (filters.areas && filters.areas.length) {
        const area = typeof r.location === 'string' ? r.location : r.location.area;
        if (!filters.areas.includes(area)) return false;
      }
      // Subcategory
      if (filters.subcategories && filters.subcategories.length) {
        if (!filters.subcategories.includes(r.subcategory)) return false;
      }
      // Attributes (tags/filters)
      if (filters.attributes) {
        for (const attr of Object.keys(filters.attributes)) {
          if (filters.attributes[attr] && !(r.tags || []).includes(attr)) return false;
        }
      }
      // Verified
      if (filters.verified && !r.verified) return false;
      // Price range
      const [low, high] = [filters.priceMin ?? 0, filters.priceMax ?? 5000];
      const priceNum = parseInt((r.priceRange || '').replace(/\D/g, '') || '500');
      if (priceNum < low || priceNum > high) return false;
      // Search term
      if (searchTerm && searchTerm.length > 1) {
        const q = searchTerm.toLowerCase();
        const inName = r.name.toLowerCase().includes(q);
        const inBrands = (r.brands || []).some(b => b.toLowerCase().includes(q));
        const inProducts = (r.products || []).some(p => p.toLowerCase().includes(q));
        if (!(inName || inBrands || inProducts)) return false;
      }

      return true;
    });
  }, [filters, searchTerm]);

  const handleView = useCallback((id: string) => navigate('retail-detail', undefined, id), [navigate]);
  const handleContact = useCallback((r: Retailer) => {
    if (r.contactOptions?.whatsapp) window.open(`https://wa.me/${r.contactOptions.whatsapp.replace(/\D/g, '')}`);
    else if (r.contactOptions?.call) window.location.href = `tel:${r.contactOptions.call}`;
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gold-200 mb-4">IN MPUMALANGA</h1>
          <p className="text-xl text-gray-300 mb-6">Discover luxury boutiques, curated retail stores, markets and premium shopping experiences across the Lowveld.</p>
          
          {/* Floating Search */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-x-0 -bottom-14 flex justify-center">
              <div className="w-full max-w-3xl bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 flex items-center gap-3 shadow-lg">
                <Search className="text-gray-300" />
                <input 
                  value={searchTerm} 
                  onChange={(e) => { setSearchTerm(e.target.value); setSuggestionsOpen(true); }} 
                  onFocus={() => setSuggestionsOpen(true)} 
                  placeholder="Search boutiques, stores, products, brands or locations..." 
                  className="bg-transparent outline-none flex-1 text-gray-200 placeholder-gray-400" 
                />
                <button className="text-sm text-gray-300">AI</button>
              </div>
            </div>
            {suggestionsOpen && searchTerm.length > 0 && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-6 w-full max-w-3xl bg-black/80 border border-white/10 rounded-lg p-3 z-40">
                <div className="text-sm text-gray-300 mb-2">Suggestions</div>
                <div className="flex flex-wrap gap-2">
                  {allSuggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,8).map(s => (
                    <button key={s} onClick={() => { setSearchTerm(s); setSuggestionsOpen(false); }} className="px-3 py-1 rounded-full bg-black/60 text-gray-200 hover:bg-gold-500/20">{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Featured Retail & Shopping Experiences Section */}
        <div className="mb-12">
          <SectionTitle title="Featured Retail & Shopping Experiences" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {retailers.filter(r => r.tier === 'Platinum' || r.tier === 'Elite').slice(0, 6).map(r => (
              <RetailCard key={r.id} retailer={r} onView={handleView} onContact={handleContact} />
            ))}
          </div>
        </div>

        {/* Primary Filter Bar */}
        <div className="container mx-auto mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <button 
                onClick={() => { setAreaOpen(!areaOpen); setSubcategoryOpen(false); setPriceOpen(false); }} 
                className={`px-4 py-2 rounded-full shadow-sm ${filters.areas && filters.areas.length ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Area: {filters.areas && filters.areas.length ? filters.areas[0] : 'All Mpumalanga'}
              </button>
              {areaOpen && (
                <div className="absolute mt-2 w-72 bg-black/95 border border-white/10 rounded-lg p-3 shadow-lg z-40">
                  <input 
                    placeholder="Search city or town" 
                    value={areaQuery} 
                    onChange={(e)=>setAreaQuery(e.target.value)} 
                    className="w-full bg-black/80 text-gray-200 px-3 py-2 rounded mb-2" 
                  />
                  <div className="max-h-40 overflow-auto">
                    {MPUMALANGA_AREAS.filter(a => a.toLowerCase().includes(areaQuery.toLowerCase())).map(a => (
                      <button 
                        key={a} 
                        onClick={() => { setFilters({...filters, areas: [a]}); setAreaOpen(false); setAreaQuery(''); }} 
                        className="w-full text-left px-2 py-2 rounded hover:bg-black/80 text-gray-200"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => { setSubcategoryOpen(!subcategoryOpen); setAreaOpen(false); setPriceOpen(false); }} 
                className={`px-4 py-2 rounded-full shadow-sm ${filters.subcategories && filters.subcategories.length ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Type: {filters.subcategories && filters.subcategories.length ? filters.subcategories[0] : 'All Stores'}
              </button>
              {subcategoryOpen && (
                <div className="absolute mt-2 w-56 bg-black/95 border border-white/10 rounded-lg p-3 shadow-lg z-40">
                  {(CategorySubcategories[Category.ShoppingAndRetail] || []).map(t => (
                    <button 
                      key={t} 
                      onClick={() => { setFilters({...filters, subcategories: [t]}); setSubcategoryOpen(false); }} 
                      className="w-full text-left px-2 py-2 rounded hover:bg-black/80 text-gray-200"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => { setPriceOpen(!priceOpen); setAreaOpen(false); setSubcategoryOpen(false); }} 
                className={`px-4 py-2 rounded-full shadow-sm ${filters.priceMin !== undefined || filters.priceMax !== undefined ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Price Range
              </button>
              {priceOpen && (
                <div className="absolute mt-2 w-72 bg-black/95 border border-white/10 rounded-lg p-4 shadow-lg z-40">
                  <div className="text-sm text-gray-300 mb-2">Budget Range (ZAR)</div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={filters.priceMin ?? 0} 
                      onChange={(e)=>setFilters({...filters, priceMin: Number(e.target.value)})} 
                      className="w-20 bg-black/80 text-gray-200 px-2 py-1 rounded" 
                    />
                    <span className="text-gray-400">—</span>
                    <input 
                      type="number" 
                      value={filters.priceMax ?? 5000} 
                      onChange={(e)=>setFilters({...filters, priceMax: Number(e.target.value)})} 
                      className="w-24 bg-black/80 text-gray-200 px-2 py-1 rounded" 
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1" />

            <button 
              onClick={() => setMoreOpen(true)} 
              className="px-4 py-2 rounded-full shadow-sm bg-black/60 text-gray-200 hover:bg-black/80"
            >
              More Filters
            </button>
            <button 
              onClick={() => setFilters({...filters, areas: [], subcategories: [], attributes: {}, priceMin: 0, priceMax: 5000})} 
              className="px-3 py-2 rounded-full text-sm text-gray-300 hover:text-gray-100"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="mb-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(r => (
                <RetailCard key={r.id} retailer={r} onView={handleView} onContact={handleContact} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No retail stores found for your selection.</p>
              <p className="text-gray-500">Adjust filters or explore featured shopping destinations across Mpumalanga.</p>
            </div>
          )}
        </div>

        {/* More Filters Drawer */}
        {moreOpen && (
          <div className="fixed inset-0 z-50 flex items-end">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMoreOpen(false)} />
            <div className="relative w-full max-h-[70vh] bg-black/95 border-t border-white/10 rounded-t-2xl p-6 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-gray-100 font-semibold">More Filters</h3>
                <button onClick={() => setMoreOpen(false)} className="text-gray-300">Close</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 font-semibold mb-3 block">Store Attributes</label>
                  <div className="flex flex-wrap gap-2">
                    {retailFilters.map(attr => (
                      <button 
                        key={attr} 
                        onClick={() => {
                          const newAttrs = {...filters.attributes, [attr]: !filters.attributes[attr]};
                          setFilters({...filters, attributes: newAttrs});
                        }} 
                        className={`px-3 py-1 rounded-full text-sm ${filters.attributes[attr] ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
                      >
                        {attr}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300 font-semibold mb-3 block">Subcategory</label>
                  <div className="flex flex-wrap gap-2">
                    {(CategorySubcategories[Category.ShoppingAndRetail] || []).map(sub => (
                      <button 
                        key={sub} 
                        onClick={() => {
                          const arr = Array.isArray(filters.subcategories) ? [...filters.subcategories] : [];
                          const idx = arr.indexOf(sub);
                          if (idx === -1) arr.push(sub); else arr.splice(idx, 1);
                          setFilters({...filters, subcategories: arr});
                        }} 
                        className={`px-3 py-1 rounded-full text-sm ${Array.isArray(filters.subcategories) && filters.subcategories.includes(sub) ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-200 mb-2">
                    <input 
                      type="checkbox" 
                      checked={!!filters.verified} 
                      onChange={(e)=>setFilters({...filters, verified: e.target.checked})} 
                    /> 
                    Verified Stores Only
                  </label>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    onClick={() => { setFilters({areas: [], subcategories: [], attributes: {}, priceMin: 0, priceMax: 5000, verified: false}); setMoreOpen(false); }} 
                    className="px-4 py-2 rounded bg-black/40 text-gray-300 hover:bg-black/60"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => { setMoreOpen(false); }} 
                    className="px-4 py-2 rounded bg-gold-500 text-black hover:bg-gold-400"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailPage;
