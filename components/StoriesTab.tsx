import React, { useState, useMemo } from 'react';
import { LowveldStoriesSection } from './NewFeatures';
import { stories } from '../data/seeds';
import { MapPin, Search, ChevronRight } from 'lucide-react';
import { performSmartSearch } from '../services/aiService';
import { Category } from '../types';

const CATEGORIES = [
  { id: 'Business & Finance', label: 'Business & Finance' },
  { id: 'Entertainment & Culture', label: 'Entertainment & Culture' },
  { id: 'News', label: 'News' },
  { id: 'Food, Travel & Leisure', label: 'Food, Travel & Leisure' },
];

const StoriesTab: React.FC<{ navigate: any }> = ({ navigate }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [items, setItems] = useState(() => stories.slice(0, pageSize));
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const base = items.filter(s => {
      if (selectedCategory && s.type !== selectedCategory && s.category !== selectedCategory) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (s.headline || '').toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q) || (s.owner || '').toLowerCase().includes(q);
    });
    return base;
  }, [query, selectedCategory, items]);

  // Infinite scroll (client-side pagination simulating server)
  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setPage(p => p + 1);
        }
      });
    }, { root: null, rootMargin: '200px', threshold: 0.1 });
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const start = 0;
    const next = stories.slice(0, Math.min(page * pageSize, stories.length));
    setItems(next);
  }, [page]);

  const handleAiSearch = async () => {
    if (!query.trim()) return;
    try {
      const ids = await performSmartSearch(query);
      // performSmartSearch returns ids — fall back to client filtering if unavailable
      if (Array.isArray(ids) && ids.length > 0) {
        setQuery('');
      }
    } catch {}
  };

  return (
    <div className="min-h-screen">
      <LowveldStoriesSection />

      <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            {CATEGORIES.map(cat => {
              return (
                <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold ${selectedCategory === cat.id ? 'bg-gold-500 text-black' : 'bg-white/5 text-white'} transition-colors whitespace-nowrap`}>
                  <MapPin size={14} className={`${selectedCategory === cat.id ? 'text-black' : 'text-gold-300'}`} />
                  <span>{cat.label}</span>
                  <ChevronRight size={12} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex-1 relative">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find finance news in Mpumalanga" className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 pr-12 text-sm text-white outline-none" />
                <button onClick={handleAiSearch} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold-500 text-black rounded-full p-2">
                  <Search size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(s => (
                <div key={s.id} onClick={() => navigate('story-detail', undefined, s.id)} className="cursor-pointer group">
                  <div className="relative overflow-hidden rounded-lg mb-3 h-48">
                    <img src={s.image} alt={s.headline} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {s.isSponsored && <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">Sponsored</div>}
                    {s.isPremium && <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">Premium</div>}
                  </div>
                  <div className="space-y-2">
                    <div className="inline-block px-2 py-1 bg-gold-500/10 border border-gold-500/20 rounded text-gold-400 text-xs font-bold">{s.type}</div>
                    <h3 className="text-white font-bold text-sm leading-tight group-hover:text-gold-400 transition-colors">{s.headline}</h3>
                    <p className="text-gray-400 text-xs truncate">{s.owner}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-white/5">
                      <span>{s.views?.toLocaleString() || '0'} views</span>
                      <span>{s.readingTime || 5} min read</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <div ref={sentinelRef as any} className="w-full flex justify-center py-6">
                {items.length < stories.length ? (
                  <button onClick={() => setPage(p => p + 1)} className="bg-white/5 border border-white/10 text-gold-400 px-6 py-3 rounded-full font-bold">Load More</button>
                ) : (
                  <div className="text-gray-500">End of stories</div>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1 sticky top-28">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
              <h4 className="text-white font-bold mb-3">Trending</h4>
              <div className="space-y-3">
                {stories.filter(s => s.isTrending).slice(0,5).map(t => (
                  <div key={t.id} className="flex items-start gap-3">
                    <img src={t.image} alt={t.headline} loading="lazy" className="w-16 h-12 object-cover rounded-md" />
                    <div>
                      <div className="text-sm text-white font-semibold">{t.headline}</div>
                      <div className="text-xs text-gray-400">{t.area} • {t.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
              <h4 className="text-white font-bold mb-3">Filters</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Category</label>
                  <select className="w-full bg-black/60 border border-white/10 rounded p-2 mt-2 text-white" value={selectedCategory || ''} onChange={(e) => setSelectedCategory(e.target.value || null)}>
                    <option value="">All</option>
                    {CATEGORIES.map(c => (<option key={c.id} value={c.id}>{c.label}</option>))}
                  </select>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default StoriesTab;
