import React, { useState, useMemo, useCallback } from 'react';
import EateryCard from './EateryCard';
import { eateries } from '../data/eatsSeeds';
import { Eatery, MPUMALANGA_AREAS, Category, CategorySubcategories } from '../types';
import { SectionTitle } from './Shared';
import { Search } from 'lucide-react';

const priceLabelToRange = (label: string) => {
  switch (label) {
    case '$': return [0, 100];
    case '$$': return [100, 300];
    case '$$$': return [300, 800];
    case '$$$$': return [800, 99999];
    default: return [0, 99999];
  }
};

// Memoize suggestions at module level to avoid re-calculation
const getEaterySuggestions = () => {
  const names = eateries.map(e => e.name);
  const cuisines = eateries.flatMap(e => e.cuisine || []);
  const dishes = eateries.flatMap(e => (e.menu || []).map(m => m.itemName));
  return Array.from(new Set([...names, ...cuisines, ...dishes]));
};
const eaterySuggestions = getEaterySuggestions();

const EatsPage: React.FC<{ navigate: (view: string, category?: string, id?: string) => void }> = ({ navigate }) => {
  const [filters, setFilters] = useState<any>({ areas: [], cuisines: [], experience: {}, category: '', priceMin: 0, priceMax: 2500, verified: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [cuisineOpen, setCuisineOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [areaQuery, setAreaQuery] = useState('');

  // Use pre-cached suggestions for faster rendering
  const allSuggestions = eaterySuggestions;

  const filtered = useMemo(() => {
    return eateries.filter((e) => {
      // Area
      if (filters.areas && filters.areas.length) {
        const area = typeof e.location === 'string' ? e.location : e.location.area;
        if (!filters.areas.includes(area)) return false;
      }
      // Category
      if (filters.category && filters.category !== '' && e.category !== filters.category) return false;
      // Cuisines
      if (filters.cuisines && filters.cuisines.length) {
        const has = filters.cuisines.every((c: string) => (e.cuisine || []).includes(c));
        if (!has) return false;
      }
      // Experience tags (simple check for elite/trending/instagram mapped to premiumTier/other)
      if (filters.experience) {
        if (filters.experience.elite && e.premiumTier !== 'Elite') return false;
        if (filters.experience.instagram && !(e.images && e.images.length)) return false;
      }
      // Service modes
      for (const s of ['dineIn','takeaway','delivery']) {
        if (filters[s] && !e[s]) return false;
      }
      // Verified
      if (filters.verified && !e.verified) return false;
      // Price numeric filter using menu average or priceRange heuristic
      const [low, high] = [filters.priceMin ?? 0, filters.priceMax ?? 99999];
      // derive a numeric from menu or priceRange
      const numeric = (() => {
        if (e.menu && e.menu.length) {
          const nums = e.menu.map(m => parseInt((m.price || '').replace(/\D/g,''),10) || 0).filter(n=>n>0);
          if (nums.length) return nums.reduce((a,b)=>a+b,0)/nums.length;
        }
        // fallback to priceRange label mapping
        const pr = priceLabelToRange(e.priceRange || '');
        return (pr[0]+pr[1])/2;
      })();
      if (numeric < low || numeric > high) return false;
      // Search term
      if (searchTerm && searchTerm.length > 1) {
        const q = searchTerm.toLowerCase();
        const inName = e.name.toLowerCase().includes(q);
        const inCuisine = (e.cuisine || []).some(c => c.toLowerCase().includes(q));
        const inMenu = (e.menu || []).some(m => (m.itemName || '').toLowerCase().includes(q));
        if (!(inName || inCuisine || inMenu)) return false;
      }

      return true;
    });
  }, [filters, searchTerm]);

  const handleView = useCallback((id: string) => navigate('eatery-detail', undefined, id), [navigate]);
  const handleContact = useCallback((e: Eatery) => {
    if (e.contactOptions?.whatsapp) window.open(`https://wa.me/${e.contactOptions.whatsapp.replace(/\D/g, '')}`);
    else if (e.contactOptions?.call) window.location.href = `tel:${e.contactOptions.call}`;
  }, []);

  const applyFilters = () => {
    // placeholder: filters are reactive, but we provide callback for mobile apply
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* Floating Search */}
        <div className="relative max-w-4xl mx-auto mb-6">
          <div className="absolute inset-x-0 -top-10 flex justify-center">
            <div className="w-full max-w-3xl bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 flex items-center gap-3 shadow-lg">
              <Search className="text-gray-300" />
              <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setSuggestionsOpen(true); }} onFocus={() => setSuggestionsOpen(true)} placeholder="Search dishes, restaurants, vibes (e.g. shisanyama, Nando’s, pizza)" className="bg-transparent outline-none flex-1 text-gray-200" />
              <button className="text-sm text-gray-300">AI</button>
            </div>
          </div>
          {suggestionsOpen && searchTerm.length > 0 && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-20 w-full max-w-3xl bg-black/80 border border-white/10 rounded-lg p-3 z-40">
              <div className="text-sm text-gray-300 mb-2">Suggestions</div>
              <div className="flex flex-wrap gap-2">
                {allSuggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,8).map(s => (
                  <button key={s} onClick={() => { setSearchTerm(s); setSuggestionsOpen(false); }} className="px-3 py-1 rounded-full bg-black/60 text-gray-200">{s}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto text-center mb-6">
          <h2 className="text-3xl font-serif text-gold-200">Eats</h2>
          <p className="text-gray-300 mt-2">Discover where Mpumalanga eats, celebrates, and connects. From smoky shisanyama to refined fine dining.</p>
          <div className="mt-4 flex justify-center gap-2">
            <button className="text-sm bg-black/60 px-3 py-1 rounded-full text-gray-200">Trending this week</button>
            <button className="text-sm bg-black/60 px-3 py-1 rounded-full text-gray-200">Elite Eats</button>
            <button className="text-sm bg-black/60 px-3 py-1 rounded-full text-gray-200">Shisanyama Near You</button>
          </div>
        </div>

        {/* Primary Filter Bar - pill style */}
        <div className="container mx-auto px-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => { setAreaOpen(!areaOpen); setTypeOpen(false); setCuisineOpen(false); setPriceOpen(false); }} className={`px-4 py-2 rounded-full shadow-sm ${filters.areas && filters.areas.length ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>Area: {filters.areas && filters.areas.length ? filters.areas[0] : 'All Mpumalanga'}</button>
              {areaOpen && (
                <div className="absolute mt-2 w-72 bg-black/95 border border-white/10 rounded-lg p-3 shadow-lg z-40">
                  <input placeholder="Search city or town" value={areaQuery} onChange={(e)=>setAreaQuery(e.target.value)} className="w-full bg-black/80 text-gray-200 px-3 py-2 rounded mb-2" />
                  <div className="max-h-40 overflow-auto">
                    {MPUMALANGA_AREAS.filter(a => a.toLowerCase().includes(areaQuery.toLowerCase())).map(a => (
                      <button key={a} onClick={() => { setFilters({...filters, areas: [a]}); setAreaOpen(false); setAreaQuery(''); }} className="w-full text-left px-2 py-2 rounded hover:bg-black/80 text-gray-200">{a}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setTypeOpen(!typeOpen); setAreaOpen(false); setCuisineOpen(false); setPriceOpen(false); }} className={`px-4 py-2 rounded-full shadow-sm ${filters.category ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>Type: {filters.category || 'All Types'}</button>
              {typeOpen && (
                <div className="absolute mt-2 w-56 bg-black/95 border border-white/10 rounded-lg p-3 shadow-lg z-40">
                      {(CategorySubcategories[Category.FoodAndHospitality] || []).map(t => (
                        <button key={t} onClick={() => { setFilters({...filters, category: t}); setTypeOpen(false); }} className="w-full text-left px-2 py-2 rounded hover:bg-black/80 text-gray-200">{t}</button>
                      ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setCuisineOpen(!cuisineOpen); setAreaOpen(false); setTypeOpen(false); setPriceOpen(false); }} className={`px-4 py-2 rounded-full shadow-sm ${filters.cuisines && filters.cuisines.length ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>Cuisine: {filters.cuisines && filters.cuisines.length ? filters.cuisines.join(', ') : 'All Cuisines'}</button>
              {cuisineOpen && (
                <div className="absolute mt-2 w-80 bg-black/95 border border-white/10 rounded-lg p-3 shadow-lg z-40">
                  <input placeholder="Search cuisine" onChange={(e)=>{ const q=e.target.value; setFilters({...filters, _cuisineQuery:q}); }} className="w-full bg-black/80 text-gray-200 px-3 py-2 rounded mb-2" />
                  <div className="flex flex-wrap gap-2">
                    {['African','South African','Italian','Portuguese','Indian','Asian','Seafood','Grill & Steakhouse','Pizza','Vegan','Vegetarian','Halal','Kosher'].map(c => (
                      <button key={c} onClick={() => {
                        const arr = Array.isArray(filters.cuisines) ? [...filters.cuisines] : [];
                        const idx = arr.indexOf(c);
                        if (idx === -1) arr.push(c); else arr.splice(idx,1);
                        setFilters({...filters, cuisines: arr});
                      }} className={`px-3 py-1 rounded-full text-sm ${Array.isArray(filters.cuisines) && filters.cuisines.includes(c) ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>{c}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setPriceOpen(!priceOpen); setAreaOpen(false); setTypeOpen(false); setCuisineOpen(false); }} className={`px-4 py-2 rounded-full shadow-sm ${filters.priceMin !== undefined || filters.priceMax !== undefined ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>Price</button>
              {priceOpen && (
                <div className="absolute mt-2 w-72 bg-black/95 border border-white/10 rounded-lg p-4 shadow-lg z-40">
                  <div className="text-sm text-gray-300 mb-2">Budget Range (ZAR)</div>
                  <div className="flex items-center gap-2">
                    <input type="number" value={filters.priceMin ?? 0} onChange={(e)=>setFilters({...filters, priceMin: Number(e.target.value)})} className="w-20 bg-black/80 text-gray-200 px-2 py-1 rounded" />
                    <span className="text-gray-400">—</span>
                    <input type="number" value={filters.priceMax ?? 2500} onChange={(e)=>setFilters({...filters, priceMax: Number(e.target.value)})} className="w-24 bg-black/80 text-gray-200 px-2 py-1 rounded" />
                  </div>
                  <div className="mt-3 text-sm text-gray-400">Or use the slider (optional)</div>
                </div>
              )}
            </div>

            <div className="flex-1" />

            <button onClick={() => setMoreOpen(true)} className="px-4 py-2 rounded-full shadow-sm bg-black/60 text-gray-200">More Filters</button>
            <button onClick={() => setFilters({...filters, areas: [], category: '', cuisines: [], priceMin: 0, priceMax: 2500})} className="px-3 py-2 rounded-full text-sm text-gray-300">Reset</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="lg:col-span-1">
            {/* empty: filters handled by concierge bar */}
          </div>
          <div className="lg:col-span-1">
            <SectionTitle title="EATS" subtitle="Discover restaurants, cafés and food spots" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {filtered.map(e => (
                <EateryCard key={e.id} eatery={e} onView={handleView} onContact={handleContact} />
              ))}
            </div>
          </div>
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
                  <label className="text-sm text-gray-300">Cuisines</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['African','South African','Shisanyama','Italian','Portuguese','Indian','Chinese','Japanese','Asian Fusion','Seafood','Grill & Steakhouse','Burger','Pizza','Vegan','Vegetarian','Halal','Kosher'].map(c => (
                      <button key={c} onClick={() => {
                        const arr = Array.isArray(filters.cuisines) ? [...filters.cuisines] : [];
                        const idx = arr.indexOf(c);
                        if (idx === -1) arr.push(c); else arr.splice(idx,1);
                        setFilters({...filters, cuisines: arr});
                      }} className={`px-3 py-1 rounded-full text-sm ${Array.isArray(filters.cuisines) && filters.cuisines.includes(c) ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>{c}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300">Service</label>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {['dineIn','takeaway','delivery','onlineMenu','bookings','walkins'].map(s => (
                      <label key={s} className="flex items-center gap-2 text-gray-200"><input type="checkbox" checked={!!filters[s]} onChange={() => setFilters({...filters, [s]: !filters[s]})} /> {s}</label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300">Availability</label>
                  <div className="mt-2 flex gap-2">
                    {['Open Now','Breakfast','Lunch','Dinner','Late Night Eats','24-Hour'].map(t => (
                      <button key={t} onClick={() => setFilters({...filters, time: filters.time === t ? '' : t})} className={`px-3 py-1 rounded-full text-sm ${filters.time === t ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>{t}</button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2 text-gray-200"><input type="checkbox" checked={!!filters.verified} onChange={(e)=>setFilters({...filters, verified: e.target.checked})} /> Verified</label>
                  <label className="flex items-center gap-2 text-gray-200"><input type="checkbox" checked={!!filters.elite} onChange={(e)=>setFilters({...filters, elite: e.target.checked})} /> ELITE (paid)</label>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={() => { setFilters({}); setMoreOpen(false); }} className="px-4 py-2 rounded bg-black/40 text-gray-300">Clear All</button>
                  <button onClick={() => { setMoreOpen(false); }} className="px-4 py-2 rounded bg-gold-500 text-black">Apply Filters</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EatsPage;
