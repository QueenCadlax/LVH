import React, { useState, useMemo, useCallback } from 'react';
import EateryCard from './EateryCard';
import { eateries } from '../data/eatsSeeds';
import { Eatery, MPUMALANGA_AREAS } from '../types';
import { Search, Star, Flame, Utensils } from 'lucide-react';

const priceLabelToRange = (label: string) => {
  switch (label) {
    case '$': return [0, 100];
    case '$$': return [100, 300];
    case '$$$': return [300, 800];
    case '$$$$': return [800, 99999];
    default: return [0, 99999];
  }
};

const EatsPagePremium: React.FC<{ navigate: (view: string, category?: string, id?: string) => void }> = ({ navigate }) => {
  const [filters, setFilters] = useState<any>({ areas: [], cuisines: [], category: '', priceMin: 0, priceMax: 2500, verified: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [areaQuery, setAreaQuery] = useState('');

  const allSuggestions = useMemo(() => {
    const names = eateries.map(e => e.name);
    const cuisines = eateries.flatMap(e => e.cuisine || []);
    const dishes = eateries.flatMap(e => (e.menu || []).map(m => m.itemName));
    return Array.from(new Set([...names, ...cuisines, ...dishes]));
  }, []);

  const filtered = useMemo(() => {
    let result = eateries.filter((e) => {
      if (filters.areas && filters.areas.length) {
        const area = typeof e.location === 'string' ? e.location : e.location.area;
        if (!filters.areas.includes(area)) return false;
      }
      if (filters.category && filters.category !== '' && e.category !== filters.category) return false;
      if (filters.cuisines && filters.cuisines.length) {
        const has = filters.cuisines.every((c: string) => (e.cuisine || []).includes(c));
        if (!has) return false;
      }
      if (filters.verified && !e.verified) return false;
      const [low, high] = [filters.priceMin ?? 0, filters.priceMax ?? 99999];
      const numeric = (() => {
        if (e.menu && e.menu.length) {
          const nums = e.menu.map(m => parseInt((m.price || '').replace(/\D/g,''),10) || 0).filter(n=>n>0);
          if (nums.length) return nums.reduce((a,b)=>a+b,0)/nums.length;
        }
        const pr = priceLabelToRange(e.priceRange || '');
        return (pr[0]+pr[1])/2;
      })();
      if (numeric < low || numeric > high) return false;
      if (searchTerm && searchTerm.length > 1) {
        const q = searchTerm.toLowerCase();
        const inName = e.name.toLowerCase().includes(q);
        const inCuisine = (e.cuisine || []).some(c => c.toLowerCase().includes(q));
        const inMenu = (e.menu || []).some(m => (m.itemName || '').toLowerCase().includes(q));
        if (!(inName || inCuisine || inMenu)) return false;
      }
      return true;
    });

    if (sortBy === 'rating') result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'trending') result.sort((a, b) => ((b.reviews?.length) || 0) - ((a.reviews?.length) || 0));
    else if (sortBy === 'newest') result.sort((a, b) => (b.id?.localeCompare(a.id) || 0));

    return result;
  }, [filters, searchTerm, sortBy]);

  const editorPicks = useMemo(() => eateries.filter(e => e.premiumTier === 'Elite').slice(0, 4), []);
  const trending = useMemo(() => [...eateries].sort((a,b) => ((b.reviews?.length) || 0) - ((a.reviews?.length) || 0)).slice(0, 4), []);
  const shisanyama = useMemo(() => eateries.filter(e => (e.cuisine || []).includes('Shisanyama')).slice(0, 4), []);

  const handleView = useCallback((id: string) => navigate('eatery-detail', undefined, id), [navigate]);
  const handleContact = useCallback((e: Eatery) => {
    if (e.contactOptions?.whatsapp) window.open(`https://wa.me/${e.contactOptions.whatsapp.replace(/\D/g, '')}`);
    else if (e.contactOptions?.call) window.location.href = `tel:${e.contactOptions.call}`;
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-black">
      {/* PREMIUM HERO SECTION */}
      <section className="relative h-80 bg-gradient-to-br from-black via-black to-black overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-8 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full" style={{ background: 'rgba(201,162,77,0.15)', border: '1px solid rgba(201,162,77,0.3)', color: '#C9A24D', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🍽️ Culinary</div>
          <h1 className="text-5xl md:text-6xl font-bold font-serif" style={{ color: '#FFFFFF' }}>Where Mpumalanga Eats</h1>
          <p className="text-lg" style={{ color: '#CFCFCF', maxWidth: '600px' }}>From smoky shisanyama to refined fine dining. Discover where locals celebrate, connect, and indulge.</p>

          {/* Hero Search */}
          <div className="max-w-2xl mx-auto w-full mt-8 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search restaurants, dishes, cuisines..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setSuggestionsOpen(true); }}
                onFocus={() => setSuggestionsOpen(true)}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 text-base shadow-lg"
              />
              <Search className="absolute right-4 top-4 text-gray-400" size={20} />
            </div>
            {suggestionsOpen && searchTerm.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-black/90 border border-white/10 rounded-lg p-4 z-40">
                <div className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Suggestions</div>
                <div className="flex flex-wrap gap-2">
                  {allSuggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,8).map(s => (
                    <button key={s} onClick={() => { setSearchTerm(s); setSuggestionsOpen(false); }} className="px-3 py-1 rounded-full text-sm" style={{ background: 'rgba(201,162,77,0.1)', border: '1px solid rgba(201,162,77,0.2)', color: '#CFCFCF' }}>{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 space-y-16">
        {/* PREMIUM FILTER BAR */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <button onClick={() => setAreaOpen(!areaOpen)} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all" style={{ background: filters.areas?.length ? '#C9A24D' : 'rgba(201,162,77,0.1)', border: '1px solid rgba(201,162,77,0.3)', color: filters.areas?.length ? '#000' : '#C9A24D' }}>
              📍 {filters.areas?.length ? filters.areas[0] : 'All Areas'}
            </button>
            {areaOpen && (
              <div className="absolute mt-2 w-64 bg-black border border-white/10 rounded-lg p-3 shadow-lg z-40" style={{ borderColor: 'rgba(201,162,77,0.2)' }}>
                <input placeholder="Search city..." value={areaQuery} onChange={(e)=>setAreaQuery(e.target.value)} className="w-full bg-black/80 text-gray-200 px-3 py-2 rounded mb-2 border border-white/10" />
                <div className="max-h-60 overflow-auto space-y-1">
                  {MPUMALANGA_AREAS.filter(a => a.toLowerCase().includes(areaQuery.toLowerCase())).map(a => (
                    <button key={a} onClick={() => { setFilters({...filters, areas: [a]}); setAreaOpen(false); }} className="w-full text-left px-2 py-2 rounded hover:bg-white/5 text-gray-200 text-sm">{a}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setTypeOpen(!typeOpen)} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all" style={{ background: filters.category ? '#C9A24D' : 'rgba(201,162,77,0.1)', border: '1px solid rgba(201,162,77,0.3)', color: filters.category ? '#000' : '#C9A24D' }}>
              🍴 {filters.category || 'Type'}
            </button>
            {typeOpen && (
              <div className="absolute mt-2 w-48 bg-black border rounded-lg p-3 shadow-lg z-40" style={{ borderColor: 'rgba(201,162,77,0.2)' }}>
                {['Fine Dining', 'Casual', 'Fast Food', 'Cafe', 'Bar', 'Takeaway'].map(t => (
                  <button key={t} onClick={() => { setFilters({...filters, category: t}); setTypeOpen(false); }} className="w-full text-left px-2 py-2 rounded hover:bg-white/5 text-gray-200 text-sm">{t}</button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setMoreOpen(true)} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'rgba(201,162,77,0.1)', border: '1px solid rgba(201,162,77,0.3)', color: '#C9A24D' }}>
            ⚙️ More Filters
          </button>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-gray-200 text-sm">
              <option value="rating">⭐ Rating</option>
              <option value="trending">🔥 Trending</option>
              <option value="newest">✨ Newest</option>
            </select>
          </div>
        </div>

        {/* FEATURED: TRENDING */}
        {trending.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Flame size={24} style={{ color: '#C9A24D' }} />
              <h2 className="text-2xl font-bold">Trending This Week</h2>
              <span className="text-xs text-gray-400 ml-2">Most reviewed</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trending.map(e => (
                <EateryCard key={e.id} eatery={e} onView={handleView} onContact={handleContact} />
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mt-8" />
          </section>
        )}

        {/* FEATURED: SHISANYAMA */}
        {shisanyama.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Utensils size={24} style={{ color: '#C9A24D' }} />
              <h2 className="text-2xl font-bold">Shisanyama Near You</h2>
              <span className="text-xs text-gray-400 ml-2">Local favorite</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shisanyama.map(e => (
                <EateryCard key={e.id} eatery={e} onView={handleView} onContact={handleContact} />
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mt-8" />
          </section>
        )}

        {/* ALL RESTAURANTS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Restaurants <span className="text-sm text-gray-400">({filtered.length} results)</span></h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(e => (
                <EateryCard key={e.id} eatery={e} onView={handleView} onContact={handleContact} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🍽️</div>
              <h3 className="text-2xl font-bold mb-2">No Restaurants Found</h3>
              <p style={{ color: '#CFCFCF' }}>Try adjusting your filters to discover amazing dining experiences</p>
            </div>
          )}
        </section>
      </div>

      {/* MORE FILTERS DRAWER */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMoreOpen(false)} />
          <div className="relative w-full max-h-[70vh] bg-black border-t rounded-t-2xl p-6 overflow-auto" style={{ borderTopColor: 'rgba(201,162,77,0.2)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">More Filters</h3>
              <button onClick={() => setMoreOpen(false)} className="text-gray-300 text-2xl">×</button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold mb-3 block" style={{ color: '#C9A24D' }}>Cuisines</label>
                <div className="flex flex-wrap gap-2">
                  {['African','South African','Shisanyama','Italian','Portuguese','Indian','Chinese','Japanese','Seafood','Grill','Pizza','Vegan'].map(c => (
                    <button key={c} onClick={() => {
                      const arr = Array.isArray(filters.cuisines) ? [...filters.cuisines] : [];
                      const idx = arr.indexOf(c);
                      if (idx === -1) arr.push(c); else arr.splice(idx,1);
                      setFilters({...filters, cuisines: arr});
                    }} className="px-3 py-1 rounded-full text-sm transition-all" style={{ background: Array.isArray(filters.cuisines) && filters.cuisines.includes(c) ? '#C9A24D' : 'rgba(201,162,77,0.1)', color: Array.isArray(filters.cuisines) && filters.cuisines.includes(c) ? '#000' : '#C9A24D' }}>{c}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 block" style={{ color: '#C9A24D' }}>Price Range</label>
                <input type="range" min="0" max="2500" value={filters.priceMax} onChange={(e) => setFilters({...filters, priceMax: parseInt(e.target.value)})} className="w-full" />
                <div className="text-xs text-gray-400 mt-2">Up to R{filters.priceMax}</div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-200">
                  <input type="checkbox" checked={!!filters.verified} onChange={(e)=>setFilters({...filters, verified: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm">Verified by LowveldHub</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t" style={{ borderTopColor: 'rgba(201,162,77,0.2)' }}>
                <button onClick={() => { setFilters({}); setMoreOpen(false); }} className="px-4 py-2 rounded-lg bg-black/60 text-gray-300 text-sm font-semibold">Clear All</button>
                <button onClick={() => setMoreOpen(false)} className="px-4 py-2 rounded-lg text-black text-sm font-semibold" style={{ background: '#C9A24D' }}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EatsPagePremium;
