import React, { useMemo, useState } from 'react';
import { destinations as destinationsData } from '../data/seeds';

export default function TourismPage({ navigate }: { navigate?: (view: string, subview?: string | undefined, id?: string) => void }) {
  const destinations = useMemo(() => destinationsData || [], []);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [queryArea, setQueryArea] = useState('');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const categories = [
    { key: 'nature', label: 'Nature & Icons', emoji: '🌿' },
    { key: 'safari', label: 'Safari & Wildlife', emoji: '🐘' },
    { key: 'scenic', label: 'Scenic Routes', emoji: '🏞' },
    { key: 'culture', label: 'Culture & Heritage', emoji: '🎭' },
    { key: 'wellness', label: 'Wellness Journeys', emoji: '🧖' },
    { key: 'food', label: 'Food & Wine', emoji: '🍷' },
    { key: 'private', label: 'Private & Luxury', emoji: '🚁' },
    { key: 'trails', label: 'Day Trips & Trails', emoji: '🗺' },
  ];

  const filtered = destinations.filter(d => {
    if (activeCategory && !(d.tags || []).some((t:any)=>t.toLowerCase().includes(activeCategory))) return false;
    if (queryArea && !d.location?.toLowerCase().includes(queryArea.toLowerCase())) return false;
    return true;
  });

  // curated featured experiences (ensure these ids exist in `destinations`)
  const curatedIds = ['d1','d2','d4','d6','d5'];
  const featured = curatedIds.map(id => destinations.find(d => d.id === id)).filter(Boolean) as any[];

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff' }}>
      {/* HERO (no big image) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div style={{ color: '#C9A24D', letterSpacing: 2 }} className="text-sm uppercase">TOURISM & EXPERIENCES</div>
        <h1 className="mt-4 text-4xl lg:text-5xl font-serif leading-tight">Explore Mpumalanga, Curated for the Curious</h1>
        <p className="mt-4 text-lg" style={{ color: '#CFCFCF' }}>Iconic landmarks, private adventures, cultural journeys and natural wonders — experienced the LowveldHub way.</p>

        <div className="mt-8 flex gap-4 items-center">
          <button onClick={() => document.getElementById('featured')?.scrollIntoView({behavior:'smooth'})} className="px-6 py-3 rounded" style={{ border: '1px solid #C9A24D', color: '#C9A24D', background: 'transparent', fontWeight: 800 }}>Explore Experiences</button>
          <button onClick={() => { /* AI concierge hook */ }} className="px-6 py-3 rounded" style={{ border: '1px solid transparent', color: '#C9A24D', background: 'transparent' }}>Plan My Trip</button>
          <button onClick={() => setShowFiltersModal(true)} className="ml-auto lg:hidden px-3 py-2 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#CFCFCF' }}>Filters</button>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6">
        {/* mobile: horizontal scroll */}
        <div className="overflow-x-auto pb-4 lg:hidden">
          <div className="flex gap-3">
            {categories.map(c => (
              <button key={c.key} onClick={() => setActiveCategory(prev => prev === c.key ? null : c.key)} className="px-4 py-2 rounded-md" style={{ border: activeCategory === c.key ? '1px solid #C9A24D' : '1px solid rgba(255,255,255,0.04)', color: activeCategory === c.key ? '#C9A24D' : '#CFCFCF' }}>
                <div className="flex items-center gap-2"><span style={{ fontSize: 16 }}>{c.emoji}</span><span>{c.label}</span></div>
              </button>
            ))}
          </div>
        </div>

        {/* desktop: grid 4x2 */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:grid-rows-2 gap-4">
          {categories.map(c => (
            <button key={c.key} onClick={() => setActiveCategory(prev => prev === c.key ? null : c.key)} className="rounded-md text-left p-4" style={{ border: activeCategory === c.key ? '1px solid #C9A24D' : '1px solid rgba(255,255,255,0.04)', background: '#000' }}>
              <div className="flex items-center gap-3"><div style={{ fontSize: 20 }}>{c.emoji}</div><div style={{ color: activeCategory === c.key ? '#C9A24D' : '#CFCFCF' }}>{c.label}</div></div>
            </button>
          ))}
        </div>
      </div>

      {/* Main grid with side filters */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3">
          <div style={{ border: '1px solid rgba(255,255,255,0.04)', padding: 16, borderRadius: 8 }}>
            <div style={{ color: '#FFFFFF', fontWeight: 700 }}>Refine Experiences</div>
            <div className="mt-3 text-sm" style={{ color: '#CFCFCF' }}>
              <div className="mb-3">Area</div>
              <select value={queryArea} onChange={e=>setQueryArea(e.target.value)} className="w-full bg-transparent px-2 py-2 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#CFCFCF' }}>
                <option value="">All Mpumalanga</option>
                <option>Kruger Region</option>
                <option>Panorama Route</option>
                <option>Lowveld Cities</option>
                <option>Barberton</option>
                <option>Nkomazi</option>
              </select>

              <div className="mt-4">Duration</div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Half day</button>
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Full day</button>
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Multi-day</button>
              </div>

              <div className="mt-4">Travel Style</div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Luxury</button>
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Adventure</button>
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Family</button>
              </div>
            </div>
          </div>
        </aside>

        <main id="featured" className="lg:col-span-9">
          {/* Featured editorial cards (consistent heights) */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(d => (
                <article key={d.id} onClick={() => { if (navigate) navigate('experience-detail', undefined, d.id); }} className="relative rounded-lg overflow-hidden cursor-pointer" style={{ minHeight: 300, border: '1px solid rgba(255,255,255,0.03)', background: '#060606' }}>
                  <div style={{ height: 180, overflow: 'hidden' }}>
                    <img src={d.image} className="w-full h-full object-cover" />
                  </div>
                  <div style={{ position: 'absolute', left: 12, top: 12 }}>
                    <div style={{ padding: '6px 10px', borderRadius: 999, background: d.id==='d6' ? '#C9A24D' : 'rgba(0,0,0,0.45)', color: d.id==='d6' ? '#000' : '#C9A24D', fontWeight: 800, fontSize: 12 }}>{d.id==='d6' ? 'LH ELITE' : (d.rating && d.rating >= 5 ? 'ICONIC' : d.id==='d4' ? "EDITOR'S CHOICE" : 'FEATURED')}</div>
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.7))' }} />
                  <div style={{ padding: 16 }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 18 }}>{d.name}</div>
                    <div style={{ color: '#CFCFCF', marginTop: 6 }}>{d.description}</div>
                    <div className="mt-4 flex items-center justify-between">
                      <div style={{ color: '#C9A24D', fontWeight: 700 }}>⭐ {(d.rating || 5).toFixed(1)}</div>
                      <div style={{ color: '#C9A24D', fontWeight: 700 }}>Explore →</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Plan a Journey */}
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif">Plan a Lowveld Journey</h3>
              <div style={{ color: '#C9A24D' }} className="text-sm">Templates</div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['3 Days in Mpumalanga','Romantic Safari Escape','Family Adventure Route','Luxury Weekend Getaway','Wellness & Nature Reset'].slice(0,3).map((t,i)=> (
                <div key={i} className="p-6 rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ color: '#FFFFFF', fontWeight: 700 }}>{t}</div>
                  <div className="mt-3 text-sm" style={{ color: '#CFCFCF' }}>Suggested places, stays, dining and experiences to build your journey.</div>
                  <div className="mt-4"><button className="px-4 py-2 rounded" style={{ border: '1px solid #C9A24D', color: '#C9A24D' }}>Open plan</button></div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Mobile filter modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowFiltersModal(false)} />
          <div className="w-full bg-black rounded-t-xl p-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="flex items-center justify-between">
              <div style={{ color: '#FFFFFF', fontWeight: 700 }}>Filters</div>
              <button onClick={() => setShowFiltersModal(false)} style={{ color: '#CFCFCF' }}>Close</button>
            </div>
            <div className="mt-4">
              <div className="text-sm" style={{ color: '#CFCFCF' }}>Area</div>
              <select className="w-full bg-transparent px-2 py-2 rounded mt-2" style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#CFCFCF' }}>
                <option>All Mpumalanga</option>
                <option>Kruger Region</option>
                <option>Panorama Route</option>
                <option>Barberton</option>
                <option>Nkomazi</option>
              </select>

              <div className="mt-4">Duration</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Half</button>
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Full</button>
                <button className="px-3 py-2" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>Multi</button>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 rounded" style={{ border: '1px solid #C9A24D', color: '#C9A24D' }}>Apply</button>
                <button className="flex-1 px-4 py-2 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#CFCFCF' }}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
