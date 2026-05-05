import React, { useState } from 'react';
import { MPUMALANGA_AREAS, PRICE_FILTERS, Category, CategorySubcategories } from '../types';
import { Coffee, Wine, Activity, Star, Music, Globe, MapPin, Clock, Users, CheckCircle, Zap } from 'lucide-react';

const PRIMARY_CATEGORIES = (CategorySubcategories[Category.FoodAndHospitality] || []).slice();

const CUISINES = ['African','Shisanyama','South African','Italian','Portuguese','Indian','Asian','Chinese','Japanese','Seafood','Grill & Steakhouse','Burger','Pizza','Vegan','Vegetarian','Halal','Kosher'];

const EXPERIENCE_TAGS = [
  { key: 'trending', label: 'Trending Now', icon: Zap },
  { key: 'elite', label: 'ELITE Dining', icon: Star },
  { key: 'alcohol', label: 'Alcohol Served', icon: Globe },
  { key: 'livemusic', label: 'Live Music', icon: Music },
  { key: 'scenic', label: 'Scenic Views', icon: Activity },
  { key: 'outdoor', label: 'Outdoor Seating', icon: Coffee },
  { key: 'family', label: 'Family Friendly', icon: Users },
  { key: 'datenight', label: 'Date Night', icon: Star },
  { key: 'events', label: 'Events & Parties', icon: Music },
  { key: 'instagram', label: 'Instagrammable', icon: Star }
];

const SERVICE_MODES = ['dineIn','takeaway','delivery','onlineMenu','bookings','walkins'];

const TIME_OPTIONS = ['Open Now','Late Night Eats','Breakfast','Lunch','Dinner','24-Hour'];

const EatsFilters: React.FC<any> = ({ filters, setFilters, onApply }: { filters: any; setFilters: any; onApply?: () => void }) => {
  const [openMobile, setOpenMobile] = useState(false);
  const [aiAssist, setAiAssist] = useState(false);

  const isActive = () => {
    // simple active check
    return Object.keys(filters || {}).some(k => {
      if (!filters[k]) return false;
      if (Array.isArray(filters[k])) return filters[k].length > 0;
      return filters[k] !== '' && filters[k] !== false && filters[k] !== null && filters[k] !== undefined;
    });
  };

  const toggleCuisine = (c: string) => {
    const arr = Array.isArray(filters.cuisines) ? [...filters.cuisines] : [];
    const idx = arr.indexOf(c);
    if (idx === -1) arr.push(c); else arr.splice(idx,1);
    setFilters({...filters, cuisines: arr});
  };

  const toggleExperience = (key: string) => {
    const obj = {...filters.experience};
    obj[key] = !obj[key];
    setFilters({...filters, experience: obj});
  };

  const toggleArea = (area: string) => {
    const arr = Array.isArray(filters.areas) ? [...filters.areas] : [];
    const idx = arr.indexOf(area);
    if (idx === -1) arr.push(area); else arr.splice(idx,1);
    setFilters({...filters, areas: arr});
  };

  const reset = () => {
    setFilters({});
    setAiAssist(false);
  };

  const applyAI = () => {
    // example AI preset mapping
    const preset = {
      areas: ['Mbombela'],
      time: 'Open Now',
      priceRange: 'Mid-range',
      experience: { instagram: true, alchol: false, alcohol: true, trending: true },
      cuisines: []
    };
    setFilters({...filters, ...preset});
    setAiAssist(true);
    onApply && onApply();
  };

  return (
    <>
      {/* Mobile Drawer Trigger */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button onClick={() => setOpenMobile(true)} className={`px-4 py-3 rounded-full shadow-lg bg-gold-500 text-black font-bold`}>Filters</button>
      </div>

      <div className="hidden lg:block w-80 sticky top-28">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-gray-100 font-semibold">Filters</h4>
            <button onClick={reset} className="text-sm text-gray-300">Reset</button>
          </div>

          <div>
            <label className="text-xs text-gray-300">Area</label>
            <div className="max-h-36 overflow-auto mt-2 bg-black/60 p-2 rounded">{MPUMALANGA_AREAS.map(a => (
              <label key={a} className="flex items-center gap-2 text-sm text-gray-200 py-1"><input type="checkbox" checked={Array.isArray(filters.areas) && filters.areas.includes(a)} onChange={() => toggleArea(a)} /> {a}</label>
            ))}</div>
          </div>

          <div>
            <label className="text-xs text-gray-300">Primary Category</label>
            <div className="flex flex-col gap-2 mt-2">
              {PRIMARY_CATEGORIES.map(c => (
                <button key={c} onClick={() => setFilters({...filters, category: filters.category === c ? '' : c})} className={`text-left px-3 py-2 rounded-full text-sm ${filters.category === c ? 'bg-gold-500 text-black font-semibold' : 'bg-black/60 text-gray-200'}`}>{c}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300">Cuisines</label>
            <div className="flex gap-2 overflow-x-auto mt-2 no-scrollbar">
              {CUISINES.map(c => (
                <button key={c} onClick={() => toggleCuisine(c)} className={`px-3 py-1 rounded-full text-sm ${Array.isArray(filters.cuisines) && filters.cuisines.includes(c) ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>{c}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300">Experience</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {EXPERIENCE_TAGS.map(t => {
                const Icon = t.icon;
                return (
                  <button key={t.key} onClick={() => toggleExperience(t.key)} className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${filters.experience && filters.experience[t.key] ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}><Icon size={14} /> {t.label}</button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300">Price</label>
            <div className="flex gap-2 mt-2">
              {PRICE_FILTERS.map(p => (
                <button key={p} onClick={() => setFilters({...filters, priceRange: filters.priceRange === p ? '' : p})} className={`px-3 py-1 rounded-full text-sm ${filters.priceRange === p ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>{p}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300">Service</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {SERVICE_MODES.map(s => (
                <button key={s} onClick={() => setFilters({...filters, [s]: !filters[s]})} className={`px-3 py-1 rounded-full text-sm ${filters[s] ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300">Time & Availability</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {TIME_OPTIONS.map(t => (
                <button key={t} onClick={() => setFilters({...filters, time: filters.time === t ? '' : t})} className={`px-3 py-1 rounded-full text-sm ${filters.time === t ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>{t}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-200"><input type="checkbox" checked={filters.verified} onChange={(e) => setFilters({...filters, verified: e.target.checked})} /> Verified</label>
              <label className="flex items-center gap-2 text-sm text-gray-200"><input type="checkbox" checked={filters.elite} onChange={(e) => setFilters({...filters, elite: e.target.checked})} /> ELITE</label>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-200">AI Assist</label>
              <button onClick={applyAI} className={`px-3 py-1 rounded-full text-sm ${aiAssist ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>Auto</button>
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            <button onClick={() => onApply ? onApply() : null} className={`flex-1 py-2 rounded-lg ${isActive() ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}>Apply</button>
            <button onClick={reset} className="py-2 px-4 rounded-lg bg-black/40 text-gray-200">Reset</button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {openMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpenMobile(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 rounded-t-2xl p-4 max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-gray-100 font-semibold">Filters</h4>
              <button onClick={() => setOpenMobile(false)} className="text-gray-300">Close</button>
            </div>
            {/* reuse desktop content by rendering a compact set of key controls */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-300">Area</label>
                <select value={filters.areas?.[0] || ''} onChange={(e) => setFilters({...filters, areas: e.target.value ? [e.target.value] : []})} className="w-full mt-2 bg-black/60 text-gray-200 p-2 rounded">
                  <option value="">All Areas</option>
                  {MPUMALANGA_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-300">Primary Category</label>
                <select value={filters.category || ''} onChange={(e) => setFilters({...filters, category: e.target.value})} className="w-full mt-2 bg-black/60 text-gray-200 p-2 rounded">
                  <option value="">Any</option>
                  {PRIMARY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { onApply && onApply(); setOpenMobile(false); }} className="flex-1 py-2 rounded bg-gold-500 text-black">Apply</button>
                <button onClick={reset} className="py-2 px-4 rounded bg-black/40 text-gray-200">Reset</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EatsFilters;
