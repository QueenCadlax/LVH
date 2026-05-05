/**
 * DEPRECATED: TourismPageNew has been replaced by TourismDiscoveryPage.tsx
 * This file is kept for reference only and should be deleted.
 * All imports have been updated in App.tsx to use TourismDiscoveryPage instead.
 */

export default function TourismPageNew() {
  const destinations = useMemo(() => destinationsData || [], []);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique values for quick filters
  const experienceCategories = ['Nature', 'Wildlife', 'Culture & Heritage', 'Adventure', 'Shopping', 'Scenic Views'];
  const areas = Array.from(new Set(destinations.map(d => d.location).filter(Boolean))) as string[];
  const maxPrice = Math.max(...destinations.map(d => d.pricePerPerson || 0), 2500);

  // Filter destinations
  const filtered = destinations.filter(d => {
    if (selectedCategory && d.experienceCategory !== selectedCategory) return false;
    if (selectedArea && d.location !== selectedArea) return false;
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Top rated featured destinations
  const featured = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);

  const categoryEmojis: Record<string, string> = {
    'Hiking': '🥾',
    'Sightseeing': '🏞',
    'Wildlife Encounters': '🐘',
    'Adventure Activities': '🎢',
    'Food & Wine': '🍽',
    'Boat & Water': '🚤',
    'Cultural Sites': '🏛',
    'Shopping & Markets': '🛍',
  };

  const categoryIcons = [
    { key: 'Wildlife Encounters', emoji: '🐘', label: 'Elephants' },
    { key: 'Hiking', emoji: '🥾', label: 'Hiking' },
    { key: 'Food & Wine', emoji: '🍽', label: 'Food & Wine' },
    { key: 'Boat & Water', emoji: '🚤', label: 'Boat Cruises' },
    { key: 'Adventure Activities', emoji: '🎢', label: 'Attractions' },
    { key: 'Sightseeing', emoji: '🏞', label: 'Sightseeing' },
    { key: 'Cultural Sites', emoji: '🏛', label: 'Heritage' },
    { key: 'Shopping & Markets', emoji: '🛍', label: 'Shopping' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff' }}>
      {/* HERO SECTION — Typography-Driven, No Image */}
      <section style={{ background: '#000', borderBottom: '1px solid rgba(201, 162, 77, 0.3)' }} className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Preheader */}
          <div style={{ color: '#C9A24D', letterSpacing: 2 }} className="text-xs uppercase font-semibold">
            Experience Mpumalanga
          </div>

          {/* Main Headline */}
          <h1 className="mt-4 text-5xl lg:text-6xl font-serif leading-tight" style={{ color: '#FFFFFF' }}>
            Discover <span style={{ color: '#C9A24D' }}>Curated</span> Destinations
          </h1>

          {/* Subheader */}
          <p className="mt-4 text-lg" style={{ color: '#CFCFCF' }}>
            <span style={{ color: '#C9A24D', fontWeight: 700 }}>Curated destinations</span>
            {' '}·{' '}
            <span>Verified experiences</span>
            {' '}·{' '}
            <span style={{ color: '#C9A24D', fontWeight: 700 }}>From R50 pp</span>
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <input
              type="text"
              placeholder="Search destinations, activities, wildlife, food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(201, 162, 77, 0.5)',
                color: '#fff',
                fontSize: '16px',
              }}
            />
          </div>

          {/* Category Scroll Buttons */}
          <div className="mt-10 overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-3">
              {categoryIcons.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveActivityType(prev => prev === cat.key ? null : cat.key)}
                  style={{
                    background: activeActivityType === cat.key ? 'rgba(201, 162, 77, 0.15)' : 'transparent',
                    border: activeActivityType === cat.key ? '1px solid #C9A24D' : '1px solid rgba(201, 162, 77, 0.3)',
                    color: activeActivityType === cat.key ? '#C9A24D' : '#CFCFCF',
                  }}
                  className="px-4 py-3 rounded-full whitespace-nowrap text-sm font-semibold flex items-center gap-2 transition-all"
                >
                  <span className="text-lg">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIEW TOGGLE + FILTER BUTTON */}
      <section className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            style={{
              background: viewMode === 'grid' ? 'rgba(201, 162, 77, 0.2)' : 'transparent',
              border: viewMode === 'grid' ? '1px solid #C9A24D' : '1px solid rgba(255,255,255,0.1)',
              color: viewMode === 'grid' ? '#C9A24D' : '#CFCFCF',
            }}
            className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
          >
            <Grid3x3 size={16} /> Grid View
          </button>
          <button
            onClick={() => setViewMode('map')}
            style={{
              background: viewMode === 'map' ? 'rgba(201, 162, 77, 0.2)' : 'transparent',
              border: viewMode === 'map' ? '1px solid #C9A24D' : '1px solid rgba(255,255,255,0.1)',
              color: viewMode === 'map' ? '#C9A24D' : '#CFCFCF',
            }}
            className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
          >
            <Map size={16} /> Map View
          </button>
        </div>

        <div style={{ color: '#CFCFCF' }} className="text-sm">
          {filtered.length} destinations found
        </div>
      </section>

      {/* MAIN GRID WITH FILTERS */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR — FILTERS (Desktop Only) */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div style={{ border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8, padding: 20 }}>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16 }} className="mb-6">
              Refine Search
            </div>

            {/* ACTIVITY TYPE */}
            <div className="mb-6">
              <div style={{ color: '#C9A24D', fontWeight: 700, fontSize: 14 }} className="mb-3">
                Activity Type
              </div>
              <div className="space-y-2">
                {activityTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeActivityType === type}
                      onChange={() => setActiveActivityType(prev => prev === type ? null : type)}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#C9A24D' }}
                    />
                    <span style={{ color: '#CFCFCF', fontSize: 14 }}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* EXPERIENCE CATEGORY */}
            <div className="mb-6">
              <div style={{ color: '#C9A24D', fontWeight: 700, fontSize: 14 }} className="mb-3">
                Experience
              </div>
              <div className="space-y-2">
                {experienceCategories.slice(0, 5).map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(prev => prev === cat ? null : cat)}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#C9A24D' }}
                    />
                    <span style={{ color: '#CFCFCF', fontSize: 14 }}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRICE SLIDER */}
            <div className="mb-6">
              <div style={{ color: '#C9A24D', fontWeight: 700, fontSize: 14 }} className="mb-3 flex items-center gap-2">
                <DollarSign size={14} /> Price Per Person
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                  style={{ accentColor: '#C9A24D' }}
                />
                <div style={{ color: '#CFCFCF', fontSize: 12 }}>
                  R{priceRange[0]} - R{priceRange[1]}
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {['R50+', 'R100+', 'R250+', 'R500+', 'R1,000+'].map((label) => {
                  const val = Number(label.replace('R', '').replace('+', '').replace(',', ''));
                  return (
                    <button
                      key={label}
                      onClick={() => setPriceRange([val, maxPrice])}
                      style={{
                        background: priceRange[0] === val ? 'rgba(201, 162, 77, 0.1)' : 'transparent',
                        border: priceRange[0] === val ? '1px solid #C9A24D' : '1px solid rgba(255,255,255,0.04)',
                        color: priceRange[0] === val ? '#C9A24D' : '#CFCFCF',
                      }}
                      className="w-full px-3 py-2 rounded text-sm font-semibold"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AREA */}
            <div>
              <div style={{ color: '#C9A24D', fontWeight: 700, fontSize: 14 }} className="mb-3">
                Area
              </div>
              <div className="space-y-2">
                {areas.slice(0, 6).map((area) => (
                  <label key={area} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeArea === area}
                      onChange={() => setActiveArea(prev => prev === area ? null : area)}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#C9A24D' }}
                    />
                    <span style={{ color: '#CFCFCF', fontSize: 14 }}>{area}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-9">
          {viewMode === 'grid' ? (
            <>
              {/* Featured Section */}
              {featured.length > 0 && (
                <section className="mb-12">
                  <div style={{ color: '#C9A24D', fontWeight: 700 }} className="text-sm uppercase mb-6">
                    Featured Destinations
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((d) => (
                      <div key={d.id}>
                        <DestinationCard
                          destination={d}
                          onPress={() => navigate?.('destination-detail', undefined, d.id)}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* All Destinations Grid */}
              <section>
                <div style={{ color: '#C9A24D', fontWeight: 700 }} className="text-sm uppercase mb-6">
                  All Destinations ({filtered.length})
                </div>
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((d) => (
                      <div key={d.id}>
                        <DestinationCard
                          destination={d}
                          onPress={() => navigate?.('destination-detail', undefined, d.id)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      border: '1px solid rgba(255,255,255,0.04)',
                      borderRadius: 8,
                      padding: 40,
                      textAlign: 'center',
                      color: '#CFCFCF',
                    }}
                  >
                    <p>No destinations match your filters.</p>
                    <button
                      onClick={() => {
                        setActiveActivityType(null);
                        setActiveCategory(null);
                        setActiveArea(null);
                        setPriceRange([0, maxPrice]);
                        setSearchQuery('');
                      }}
                      style={{ color: '#C9A24D' }}
                      className="mt-4 text-sm font-semibold hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </section>
            </>
          ) : (
            // MAP VIEW PLACEHOLDER
            <div
              style={{
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: 8,
                padding: 60,
                textAlign: 'center',
                color: '#CFCFCF',
                minHeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>
                <Map size={48} style={{ margin: '0 auto 16px', color: '#C9A24D' }} />
                <p className="font-semibold">Interactive Map View</p>
                <p className="text-sm mt-2">Map showing {filtered.length} destinations</p>
                <p style={{ color: '#999' }} className="text-xs mt-4">
                  (Full map integration coming soon)
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
}

function DestinationCard({ destination, onPress }: DestinationCardProps) {
  const emoji = {
    'Hiking': '🥾',
    'Sightseeing': '🏞',
    'Wildlife Encounters': '🐘',
    'Adventure Activities': '🎢',
    'Food & Wine': '🍽',
    'Boat & Water': '🚤',
    'Cultural Sites': '🏛',
    'Shopping & Markets': '🛍',
  }[destination.activityType || ''] || '📍';

  return (
    <article
      onClick={onPress}
      className="rounded-lg overflow-hidden cursor-pointer group"
      style={{
        border: '1px solid rgba(255,255,255,0.04)',
        background: '#060606',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.5)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(201, 162, 77, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image Section */}
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Dark Overlay + Tier Badge */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
          }}
        />
        <div style={{ position: 'absolute', left: 12, top: 12 }}>
          <div
            style={{
              padding: '6px 10px',
              borderRadius: 999,
              background: destination.rating && destination.rating >= 4.7 ? '#C9A24D' : 'rgba(0,0,0,0.45)',
              color: destination.rating && destination.rating >= 4.7 ? '#000' : '#C9A24D',
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            {destination.rating && destination.rating >= 4.8 ? 'ICONIC' : 'FEATURED'}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
          {destination.name}
        </div>

        {/* Location + Activity */}
        <div style={{ color: '#CFCFCF', fontSize: 13, marginBottom: 12, flex: 1 }}>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} style={{ color: '#C9A24D' }} />
            <span>{destination.location}</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <span>{emoji}</span>
            <span>{destination.activityType}</span>
            {destination.experienceCategory && (
              <>
                <span>·</span>
                <span>{destination.experienceCategory}</span>
              </>
            )}
          </div>
        </div>

        {/* Price + Rating Footer */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {destination.pricePerPerson !== undefined && destination.pricePerPerson > 0 ? (
            <div style={{ color: '#C9A24D', fontWeight: 700 }}>
              From R{destination.pricePerPerson.toLocaleString()} <span style={{ fontSize: 12, color: '#CFCFCF' }}>pp</span>
            </div>
          ) : (
            <div style={{ color: '#C9A24D', fontWeight: 700 }}>Free Entry</div>
          )}
          <div className="flex items-center gap-1" style={{ color: '#C9A24D' }}>
            <Star size={14} fill="currentColor" />
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              {(destination.rating || 4.5).toFixed(1)}
            </span>
            {destination.reviewCount && (
              <span style={{ color: '#CFCFCF', fontSize: 11 }}>({destination.reviewCount})</span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          style={{
            marginTop: 12,
            width: '100%',
            padding: '10px 16px',
            background: 'transparent',
            border: '1px solid #C9A24D',
            color: '#C9A24D',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 77, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          View Details <ChevronRight size={14} />
        </button>
      </div>
    </article>
  );
}
