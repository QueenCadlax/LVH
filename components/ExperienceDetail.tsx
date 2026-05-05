import React, { useMemo, useState } from 'react';
import { destinations as destinationsData } from '../data/seeds';

export default function ExperienceDetail({ id, navigate }: { id?: string; navigate?: (view:string, sub?:string, id?:string)=>void }){
  const experience = useMemo(() => destinationsData.find(d => d.id === id) || destinationsData[0], [id]);
  const gold = '#C9A24D';
  const gallery = experience.images && experience.images.length ? experience.images : [experience.image];
  const [activeItinerary, setActiveItinerary] = useState<string | null>(null);
  const [practicalOpen, setPracticalOpen] = useState<{[k:string]:boolean}>({});

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* HERO GALLERY */}
      <div className="w-full" style={{ minHeight: '65vh', position: 'relative' }}>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-10">
          <div className="lg:col-span-7 col-span-1 relative">
            <img src={gallery[0]} className="w-full h-full object-cover" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.7))' }} />
            <div style={{ position: 'absolute', left: 32, bottom: 32 }}>
              <div style={{ height: 6, width: 80, background: gold, borderRadius: 2, marginBottom: 12 }} />
              <h1 className="text-4xl lg:text-5xl font-serif">{experience.name}</h1>
              <div className="mt-2 text-sm" style={{ color: '#CFCFCF' }}>{experience.subtitle || `${experience.description?.slice(0,80)}`}</div>
              <div className="mt-4" style={{ color: gold, fontWeight: 800 }}>⭐ {(experience.rating || 4.8).toFixed(1)} · Curated Icon</div>
            </div>
          </div>

          <div className="lg:col-span-3 col-span-1 flex flex-col gap-2 p-3 lg:p-0">
            {gallery.slice(1,4).map((g,i)=> (
              <div key={i} className="w-full h-1/3 overflow-hidden rounded" style={{ background: '#050505' }}>
                <img src={g} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* top-right actions */}
        <div style={{ position: 'absolute', right: 24, top: 20 }} className="flex items-center gap-3">
          <button aria-label="Save" style={{ width:44,height:44,borderRadius:12,border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center' }}>🤍</button>
          <button aria-label="Add to Journey" style={{ padding:'8px 12px', borderRadius:10, background: gold, color:'#000', fontWeight:800 }}>+ Add to Journey</button>
          <button aria-label="Share" style={{ width:44,height:44,borderRadius:12,border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center' }}>🔗</button>
        </div>
      </div>

      {/* SUMMARY BAR (sticky) */}
      <div style={{ position: 'sticky', top:0, zIndex:30, backdropFilter:'blur(6px)', borderBottom: '1px solid rgba(255,255,255,0.03)', background:'rgba(0,0,0,0.6)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
          <div style={{ color: '#CFCFCF' }}>Duration: <strong style={{ color: '#FFFFFF' }}>Full Day</strong></div>
          <div style={{ color: '#CFCFCF' }}>Style: <strong style={{ color: '#FFFFFF' }}>Cultural · Scenic</strong></div>
          <div style={{ color: '#CFCFCF' }}>Best for: <strong style={{ color: '#FFFFFF' }}>Couples · Families</strong></div>
          <div style={{ color: '#CFCFCF' }}>Difficulty: <strong style={{ color: '#FFFFFF' }}>Easy</strong></div>
          <div style={{ color: '#CFCFCF' }}>Region: <strong style={{ color: '#FFFFFF' }}>{experience.location}</strong></div>
          <div className="ml-auto flex gap-3">
            <button className="px-4 py-2 rounded" style={{ border: `1px solid ${gold}`, color: gold }}>Plan This Experience</button>
            <button className="px-4 py-2 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#CFCFCF' }}>Chat with Concierge</button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 space-y-8">
          <section>
            <h3 className="text-2xl font-semibold">About this experience</h3>
            <div className="mt-3 text-base" style={{ color: '#CFCFCF', lineHeight: 1.8 }}>{experience.description || 'Step into one of Earth\'s oldest landscapes... (editorial storytelling).'}</div>
          </section>

          <section>
            <h4 className="text-lg font-semibold">What you’ll experience</h4>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {['Ancient geological formations','Guided heritage walk','Indigenous storytelling','Scenic viewpoints','Local cultural stop','Photography moments'].map((t,i)=> (
                <div key={i} className="flex items-start gap-3" style={{ color: '#CFCFCF' }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:'rgba(255,255,255,0.03)', display:'flex',alignItems:'center',justifyContent:'center' }}>🌿</div>
                  <div>{t}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-lg font-semibold">Suggested itinerary</h4>
            <div className="mt-4 space-y-3">
              {[
                {k:'morning',t:'Morning',c:'Arrival & guided heritage walk'},
                {k:'midday',t:'Midday',c:'Scenic drive + cultural lunch stop'},
                {k:'afternoon',t:'Afternoon',c:'Viewpoints, photography & free exploration'}
              ].map(it => (
                <div key={it.k} style={{ border: '1px solid rgba(255,255,255,0.04)', padding: 12, borderRadius: 8 }}>
                  <div className="flex items-center justify-between">
                    <div style={{ fontWeight: 700 }}>{it.t}</div>
                    <button onClick={() => setActiveItinerary(prev => prev === it.k ? null : it.k)} style={{ color: '#CFCFCF' }}>{activeItinerary===it.k ? 'Hide' : 'View'}</button>
                  </div>
                  {activeItinerary === it.k && <div className="mt-3" style={{ color: '#CFCFCF' }}>{it.c}</div>}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-lg font-semibold">Location</h4>
            <div className="mt-3" style={{ height: 260, background: '#050505', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 8 }}>[Map — dark mode placeholder]</div>
            <div className="mt-2 text-sm" style={{ color: '#CFCFCF' }}>Exact meeting point shared after confirmation.</div>
          </section>

          {/* Pair with your experience */}
          <section>
            <h4 className="text-lg font-semibold">Pair with your experience</h4>
            <div className="mt-4 overflow-x-auto flex gap-4 py-2">
              {[{t:'Leopard Crest Safari Lodge'},{t:'Barberton Boutique Hotel'},{t:'Heritage View Restaurant'},{t:'Local Farm-to-Table Stop'},{t:'Private Driver'}].map((p,i)=> (
                <div key={i} className="min-w-[220px] p-4 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ color: '#FFFFFF', fontWeight: 700 }}>{p.t}</div>
                  <div className="mt-2 text-sm" style={{ color: '#CFCFCF' }}>View details →</div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h4 className="text-lg font-semibold">Guest experiences</h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{q:'A humbling, breathtaking experience.',n:'T. Mokoena',t:'Couple'},{q:'Deeply moving and beautifully curated.',n:'J. van Rensburg',t:'Family'}].map((r,i)=> (
                <div key={i} style={{ border: '1px solid rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>&ldquo;{r.q}&rdquo;</div>
                  <div className="text-sm mt-2" style={{ color: '#CFCFCF' }}>{r.n} · {r.t}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Practical info (collapsible) */}
          <section>
            <h4 className="text-lg font-semibold">Practical information</h4>
            <div className="mt-3 space-y-2">
              {[
                {k:'bring',t:'What to bring',c:'Comfortable shoes, water, sun protection.'},
                {k:'access',t:'Accessibility',c:'Mostly easy walking; some uneven paths.'},
                {k:'weather',t:'Weather notes',c:'Bring layers; afternoons can be warm.'},
                {k:'safety',t:'Safety & guidelines',c:'Follow guide instructions; no off-trail exploration.'},
              ].map(it => (
                <div key={it.k}>
                  <button onClick={() => setPracticalOpen(s => ({...s, [it.k]: !s[it.k]}))} className="w-full flex items-center justify-between" style={{ color: '#FFFFFF', padding: '10px 12px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 8 }}>
                    <div>{it.t}</div>
                    <div style={{ color: '#CFCFCF' }}>{practicalOpen[it.k] ? '−' : '+'}</div>
                  </button>
                  {practicalOpen[it.k] && <div className="mt-2 p-3" style={{ color: '#CFCFCF' }}>{it.c}</div>}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT STICKY EXPERIENCE CARD */}
        <aside className="lg:col-span-4">
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ border: `1px solid rgba(255,255,255,0.04)`, padding: 16, borderRadius: 12, background: '#000' }}>
              <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 18 }}>{experience.name}</div>
              <div className="mt-2" style={{ color: '#CFCFCF' }}>⭐ {(experience.rating || 4.8).toFixed(1)} ({experience.reviews || 82} reviews)</div>
              <div className="mt-3 text-sm" style={{ color: '#CFCFCF' }}>✔ Verified by LowveldHub<br/>✔ Public access<br/>✔ Local guides available</div>

              <div className="mt-4">
                <div style={{ color: gold, fontWeight: 800 }}>{experience.priceLevel || 'From R1,200'} per person</div>
                <div className="mt-3" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                  <button className="px-4 py-2 rounded" style={{ border: `1px solid ${gold}`, color: gold }}>Add to Journey</button>
                  <button className="px-4 py-2 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#CFCFCF' }}>WhatsApp Concierge</button>
                  <button className="px-4 py-2 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#CFCFCF' }}>Request Private Experience</button>
                </div>
              </div>

              <div className="mt-6">
                <div style={{ color: '#CFCFCF', fontSize: 13 }}>Availability</div>
                <div className="mt-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
                  {Array.from({length:14}).map((_,i)=>(<div key={i} style={{ height: 18, borderRadius:6, background: i%5===0?gold:'#0B0B0B', border:'1px solid rgba(255,255,255,0.03)'}} />))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FINAL CTA STRIP */}
      <div style={{ position: 'fixed', left:0, right:0, bottom:0, background: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.9))', borderTop:`1px solid rgba(255,255,255,0.03)` }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div style={{ color: '#FFFFFF', fontWeight: 700 }}>Make this part of your Lowveld journey.</div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded" style={{ border: `1px solid ${gold}`, color: gold }}>Plan My Trip</button>
            <button className="px-4 py-2 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)', color: '#CFCFCF' }}>Explore Nearby Experiences</button>
          </div>
        </div>
      </div>
    </div>
  );
}
