import React, { useState, useMemo, useCallback } from 'react';
import BusinessCard from './BusinessCard';
import { professionals } from '../data/businessSeeds';
import { ProfessionalService, MPUMALANGA_AREAS, Category, CategorySubcategories } from '../types';
import { SectionTitle } from './Shared';
import { Search } from 'lucide-react';

const businessFilters = [
  'Verified Firm',
  'Women-Owned',
  'Black-Owned',
  'Enterprise Ready',
  'SME Friendly',
  'Corporate Services',
  'Startup Support',
  'Remote Services',
  'On-Site Consulting',
  'Retainer Available',
  'Hourly Billing',
  'Free Consultation',
  'Parking Available',
];

// Memoize suggestions at module level to avoid re-calculation
const getBusinessSuggestions = () => {
  const names = professionals.map(p => p.name);
  const subcats = professionals.map(p => p.subcategory);
  const expertise = professionals.flatMap(p => p.expertise || []);
  return Array.from(new Set([...names, ...subcats, ...expertise]));
};
const businessSuggestions = getBusinessSuggestions();

const BusinessPage: React.FC<{ navigate: (view: string, category?: string, id?: string) => void }> = ({ navigate }) => {
  const [filters, setFilters] = useState<any>({ areas: [], subcategories: [], attributes: {}, verified: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [areaQuery, setAreaQuery] = useState('');

  // Use pre-cached suggestions for faster rendering
  const allSuggestions = businessSuggestions;

  const filtered = useMemo(() => {
    return professionals.filter((p) => {
      // Area
      if (filters.areas && filters.areas.length) {
        const area = typeof p.location === 'string' ? p.location : p.location.area;
        if (!filters.areas.includes(area)) return false;
      }
      // Subcategory
      if (filters.subcategories && filters.subcategories.length) {
        if (!filters.subcategories.includes(p.subcategory)) return false;
      }
      // Attributes (tags/filters)
      if (filters.attributes) {
        for (const attr of Object.keys(filters.attributes)) {
          if (filters.attributes[attr] && !(p.tags || []).includes(attr)) return false;
        }
      }
      // Verified
      if (filters.verified && !p.verified) return false;
      // Search term
      if (searchTerm && searchTerm.length > 1) {
        const q = searchTerm.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inSubcat = p.subcategory.toLowerCase().includes(q);
        const inExpertise = (p.expertise || []).some(e => e.toLowerCase().includes(q));
        if (!(inName || inSubcat || inExpertise)) return false;
      }

      return true;
    });
  }, [filters, searchTerm]);

  const handleView = useCallback((id: string) => navigate('business-professional-detail', undefined, id), [navigate]);
  const handleContact = useCallback((p: ProfessionalService) => {
    if (p.contactOptions?.whatsapp) window.open(`https://wa.me/${p.contactOptions.whatsapp.replace(/\D/g, '')}`);
    else if (p.contactOptions?.call) window.location.href = `tel:${p.contactOptions.call}`;
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gold-200 mb-4">IN MPUMALANGA</h1>
          <p className="text-xl text-gray-300 mb-6">Connect with trusted legal, financial, consulting and professional service providers powering business growth across the Lowveld.</p>
          
          {/* Floating Search */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-x-0 -bottom-14 flex justify-center">
              <div className="w-full max-w-3xl bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 flex items-center gap-3 shadow-lg">
                <Search className="text-gray-300" />
                <input 
                  value={searchTerm} 
                  onChange={(e) => { setSearchTerm(e.target.value); setSuggestionsOpen(true); }} 
                  onFocus={() => setSuggestionsOpen(true)} 
                  placeholder="Search firms, services, industries or locations..." 
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

        {/* Featured Business & Professional Firms Section */}
        <div className="mb-12">
          <SectionTitle title="Featured Business & Professional Firms" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {professionals.filter(p => p.tier === 'Platinum' || p.tier === 'Elite').slice(0, 6).map(p => (
              <BusinessCard key={p.id} professional={p} onView={handleView} onContact={handleContact} />
            ))}
          </div>
        </div>

        {/* Primary Filter Bar */}
        <div className="container mx-auto mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <button 
                onClick={() => { setAreaOpen(!areaOpen); setSubcategoryOpen(false); }} 
                className={`px-4 py-2 rounded-full shadow-sm ${filters.areas && filters.areas.length ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Location: {filters.areas && filters.areas.length ? filters.areas[0] : 'All Mpumalanga'}
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
                onClick={() => { setSubcategoryOpen(!subcategoryOpen); setAreaOpen(false); }} 
                className={`px-4 py-2 rounded-full shadow-sm ${filters.subcategories && filters.subcategories.length ? 'bg-gold-500 text-black' : 'bg-black/60 text-gray-200'}`}
              >
                Service: {filters.subcategories && filters.subcategories.length ? filters.subcategories[0] : 'All Services'}
              </button>
              {subcategoryOpen && (
                <div className="absolute mt-2 w-72 bg-black/95 border border-white/10 rounded-lg p-3 shadow-lg z-40">
                  {(CategorySubcategories[Category.BusinessAndProfessional] || []).map(t => (
                    <button 
                      key={t} 
                      onClick={() => { setFilters({...filters, subcategories: [t]}); setSubcategoryOpen(false); }} 
                      className="w-full text-left px-2 py-2 rounded hover:bg-black/80 text-gray-200 text-sm"
                    >
                      {t}
                    </button>
                  ))}
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
              onClick={() => setFilters({...filters, areas: [], subcategories: [], attributes: {}, verified: false})} 
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
              {filtered.map(p => (
                <BusinessCard key={p.id} professional={p} onView={handleView} onContact={handleContact} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No professional services found for your selection.</p>
              <p className="text-gray-500">Adjust filters or explore trusted firms across Mpumalanga.</p>
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
                  <label className="text-sm text-gray-300 font-semibold mb-3 block">Firm Attributes</label>
                  <div className="flex flex-wrap gap-2">
                    {businessFilters.map(attr => (
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
                  <label className="text-sm text-gray-300 font-semibold mb-3 block">Service Category</label>
                  <div className="flex flex-wrap gap-2">
                    {(CategorySubcategories[Category.BusinessAndProfessional] || []).map(sub => (
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
                    Verified Firms Only
                  </label>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    onClick={() => { setFilters({areas: [], subcategories: [], attributes: {}, verified: false}); setMoreOpen(false); }} 
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

export default BusinessPage;
