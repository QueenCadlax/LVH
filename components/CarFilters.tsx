import React, { useMemo } from 'react';

type Filters = {
  brand?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  dealerTypes?: string[];
  condition?: string[];
  fuel?: string[];
  transmission?: string[];
  mileageMax?: number;
};

export const defaultFilters: Filters = {};

export const CarFilters: React.FC<{
  cars: any[];
  filters: Filters;
  setFilters: (f: Filters) => void;
  onApply?: () => void;
}> = ({ cars, filters, setFilters, onApply }) => {
  // derive brands & models
  const brands = useMemo(() => {
    const s = new Set<string>();
    cars.forEach(c => {
      const brand = (c.title || '').split(' ')[0];
      if (brand) s.add(brand);
    });
    return Array.from(s).sort();
  }, [cars]);

  const models = useMemo(() => {
    const ms = new Set<string>();
    cars.forEach(c => {
      const parts = (c.title || '').split(' ');
      if (parts.length > 1) ms.add(parts.slice(1).join(' '));
    });
    return Array.from(ms).slice(0, 50);
  }, [cars]);

  const update = (patch: Partial<Filters>) => setFilters({ ...filters, ...patch });

  return (
    <div className="w-64 bg-black p-2 rounded-2xl shadow-lg sticky top-24 h-fit border border-white/6 space-y-1.5">
      <h2 className="text-white font-bold text-xs mb-1">Filters</h2>

      <label className="text-xs text-gray-300 block mb-1">Brand</label>
      <select value={filters.brand || ''} onChange={e => update({ brand: e.target.value || undefined })} className="w-full bg-white/5 border border-white/10 rounded p-1 text-white mb-1 text-xs">
        <option value="">Any</option>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <label className="text-xs text-gray-300 block mb-1">Model</label>
      <select value={filters.model || ''} onChange={e => update({ model: e.target.value || undefined })} className="w-full bg-white/5 border border-white/10 rounded p-1 text-white mb-1 text-xs">
        <option value="">Any</option>
        {models.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      <label className="text-xs text-gray-300 block mb-1">Year</label>
      <div className="flex gap-1 mb-1">
        <input type="number" placeholder="Min" value={filters.yearMin || ''} onChange={e => update({ yearMin: e.target.value ? Number(e.target.value) : undefined })} className="w-1/2 bg-white/5 border border-white/10 rounded p-1 text-white text-xs" />
        <input type="number" placeholder="Max" value={filters.yearMax || ''} onChange={e => update({ yearMax: e.target.value ? Number(e.target.value) : undefined })} className="w-1/2 bg-white/5 border border-white/10 rounded p-1 text-white text-xs" />
      </div>

      <label className="text-xs text-gray-300 block mb-1">Price (R)</label>
      <div className="flex gap-1 mb-1">
        <input type="number" placeholder="Min" value={filters.priceMin || ''} onChange={e => update({ priceMin: e.target.value ? Number(e.target.value) : undefined })} className="w-1/2 bg-white/5 border border-white/10 rounded p-1 text-white text-xs" />
        <input type="number" placeholder="Max" value={filters.priceMax || ''} onChange={e => update({ priceMax: e.target.value ? Number(e.target.value) : undefined })} className="w-1/2 bg-white/5 border border-white/10 rounded p-1 text-white text-xs" />
      </div>

      <label className="text-xs text-gray-300 block mb-1">Dealer Type</label>
      <div className="flex flex-col gap-0.5 mb-1">
        {['Premium','Verified','Local'].map(dt => (
          <label key={dt} className="text-gray-300 text-xs flex items-center gap-1"><input type="checkbox" checked={filters.dealerTypes?.includes(dt) || false} onChange={e => {
            const set = new Set(filters.dealerTypes || []);
            if (e.target.checked) set.add(dt); else set.delete(dt);
            update({ dealerTypes: Array.from(set) as string[] });
          }} className="w-3 h-3" />{dt}</label>
        ))}
      </div>

      <label className="text-xs text-gray-300 block mb-1">Condition</label>
      <div className="flex gap-1 mb-1">
        {['New','Used','Certified'].map(c => (
          <button key={c} onClick={() => update({ condition: filters.condition?.includes(c) ? filters.condition?.filter(x => x !== c) : [...(filters.condition || []), c] })} className={`px-1.5 py-0.5 rounded text-xs ${filters.condition?.includes(c) ? 'bg-gold-500 text-black' : 'bg-white/5 text-white'}`}>{c}</button>
        ))}
      </div>

      <label className="text-xs text-gray-300 block mb-1">Fuel</label>
      <div className="flex flex-wrap gap-0.5 mb-1">
        {['Petrol','Diesel','Electric','Hybrid'].map(f => (
          <button key={f} onClick={() => update({ fuel: filters.fuel?.includes(f) ? filters.fuel?.filter(x => x !== f) : [...(filters.fuel || []), f] })} className={`px-1 py-0.5 rounded text-xs font-medium ${filters.fuel?.includes(f) ? 'bg-gold-500 text-black' : 'bg-white/5 text-white'}`}>{f}</button>
        ))}
      </div>

      <label className="text-xs text-gray-300 block mb-1">Transmission</label>
      <div className="flex gap-0.5 mb-1">
        {['Manual','Automatic'].map(t => (
          <button key={t} onClick={() => update({ transmission: filters.transmission?.includes(t) ? filters.transmission?.filter(x => x !== t) : [...(filters.transmission || []), t] })} className={`px-1 py-0.5 rounded text-xs ${filters.transmission?.includes(t) ? 'bg-gold-500 text-black' : 'bg-white/5 text-white'}`}>{t}</button>
        ))}
      </div>

      <label className="text-xs text-gray-300 block mb-1">Max Mileage (km)</label>
      <input type="number" placeholder="e.g. 50000" value={filters.mileageMax || ''} onChange={e => update({ mileageMax: e.target.value ? Number(e.target.value) : undefined })} className="w-full bg-white/5 border border-white/10 rounded p-1 text-white mb-1 text-xs" />

      <div className="mt-0.5">
        <button onClick={() => onApply && onApply()} className="w-full p-1 bg-gold-500 text-black font-bold rounded-lg text-xs">Apply</button>
      </div>
    </div>
  );
};

export default CarFilters;
