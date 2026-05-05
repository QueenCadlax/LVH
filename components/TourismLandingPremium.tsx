import React, { useState, useMemo, useCallback } from 'react';
import { Heart, MapPin, Star, Filter, X, Clock, Users, TrendingUp, AlertCircle, ChevronDown } from 'lucide-react';
import {
  hotelsLodges,
  guestHousesBBs,
  safarisGameReserves,
  tourOperatorsGuides,
  scenicRoutesAdventure,
  yachtBoatCharters,
  privateJetAirCharter,
} from '../data/tourismTravelSeeds';

interface Experience {
  id: string;
  name: string;
  image?: string;
  location: string;
  type: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  duration?: string;
  difficulty?: string;
  groupSize?: number;
  tier?: 'Platinum' | 'Elite' | 'Premium' | 'Trial';
  description?: string;
  category?: string;
  isElite?: boolean;
}

interface TourismLandingPremiumProps {
  navigate?: (view: string, category?: string, id?: string) => void;
}

const ExperienceCard = React.memo(({ experience, onFavorite, onViewDetail }: any) => (
  <div
    onClick={() => onViewDetail(experience.id)}
    className="group rounded-xl overflow-hidden border border-[#2A2A2E] hover:border-[#D4AF37] transition-all cursor-pointer bg-[#1A1A1E]"
  >
    {/* Image */}
    <div className="relative h-56 bg-gradient-to-br from-[#2A2A2E] to-[#0E0E11] overflow-hidden">
      {experience.image ? (
        <img
          src={experience.image}
          alt={experience.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#D4AF37]/30">
          <TrendingUp size={40} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Tier Badge */}
      {experience.tier && (
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur text-xs font-bold text-[#D4AF37]">
            {experience.tier === 'Platinum' ? '👑 PLATINUM' : experience.tier === 'Elite' ? '✨ ELITE' : '⭐ FEATURED'}
          </span>
        </div>
      )}

      {/* Heart Favorite */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(experience.id);
        }}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all"
      >
        <Heart size={18} className="text-black" />
      </button>

      {/* Duration Badge */}
      {experience.duration && (
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/70 backdrop-blur text-xs text-white font-semibold">
          {experience.duration}
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-4 space-y-3">
      <div>
        <h3 className="text-base font-semibold text-white line-clamp-1">{experience.name}</h3>
        <p className="text-xs text-[#A0A0A6]">{experience.type} • {experience.location}</p>
      </div>

      {/* Rating & Price */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2E]">
        <div className="flex items-center gap-1">
          <Star size={14} fill="#D4AF37" color="#D4AF37" />
          <span className="text-sm font-semibold text-[#D4AF37]">{experience.rating?.toFixed(1) || '4.8'}</span>
          <span className="text-xs text-[#A0A0A6]">({experience.reviewCount || 0})</span>
        </div>
        {experience.price && (
          <p className="text-sm font-bold text-[#D4AF37]">From R{experience.price.toLocaleString()}</p>
        )}
      </div>

      {/* CTA */}
      <button className="w-full py-2 bg-[#D4AF37] text-black font-bold text-sm rounded-lg hover:bg-[#E5C158] transition-colors">
        Explore
      </button>
    </div>
  </div>
));

ExperienceCard.displayName = 'ExperienceCard';

export default React.memo(function TourismLandingPremium({ navigate, businesses }: TourismLandingPremiumProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    destination: 'All',
    experienceType: 'All',
    location: 'All Areas',
    duration: 'All',
    budget: { min: 0, max: 10000 },
    groupSize: 'All',
    specialInterest: 'All',
  });

  // Combine all tourism data
  const allExperiences = useMemo(() => [
    ...safarisGameReserves,
    ...tourOperatorsGuides,
    ...scenicRoutesAdventure,
    ...hotelsLodges,
    ...yachtBoatCharters,
    ...privateJetAirCharter,
  ], []);

  // Filter logic
  const filtered = useMemo(() => {
    let result = allExperiences;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.name.toLowerCase().includes(query) ||
        e.location.toLowerCase().includes(query) ||
        e.type.toLowerCase().includes(query) ||
        (e.description && e.description.toLowerCase().includes(query))
      );
    }

    if (filters.location !== 'All Areas') {
      result = result.filter(e => e.location === filters.location);
    }

    if (filters.budget.max > 0) {
      result = result.filter(e => (e.price || 0) <= filters.budget.max);
    }

    // Sort: Elite/Platinum first
    return result.sort((a, b) => {
      const tierOrder = { Platinum: 0, Elite: 1, Premium: 2, Trial: 3 };
      return (tierOrder[a.tier as keyof typeof tierOrder] || 3) - (tierOrder[b.tier as keyof typeof tierOrder] || 3);
    });
  }, [allExperiences, filters, searchQuery]);

  const toggleFavorite = useCallback((id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
  }, [favorites]);

  const handleViewDetail = useCallback((id: string) => {
    if (navigate) navigate('experience-detail', undefined, id);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-96 bg-gradient-to-br from-black via-black to-black overflow-hidden pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-8 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: '"Georgia", serif' }}>
            Discover Mpumalanga's Wonders
          </h1>
          <p className="text-xl text-gold-400 max-w-3xl font-light">
            Curated luxury experiences in Africa's most captivating province
          </p>
          
          {/* Hero Search Bar */}
          <div className="max-w-3xl mx-auto w-full mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search experiences, destinations, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 text-base shadow-lg"
              />
              <svg
                className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN LAYOUT ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* ===== LEFT: FILTER PANEL ===== */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-6 bg-[#1A1A1E] p-6 rounded-xl border border-[#2A2A2E]">
              <h3 className="text-lg font-bold text-white">Filters</h3>

              {/* Filter Panel Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#2A2A2E] border border-[#3A3A3E] text-white placeholder-gray-500 text-sm focus:border-[#D4AF37] outline-none"
                />
                <svg
                  className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Destination Category */}
              <div>
                <label className="text-sm font-semibold text-[#D4AF37] mb-3 block">Destination Category</label>
                <select
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3A3A3E] rounded-lg text-white text-sm focus:border-[#D4AF37] outline-none"
                >
                  <option>All</option>
                  <option>Nature</option>
                  <option>Adventure</option>
                  <option>Wildlife</option>
                  <option>Cultural</option>
                  <option>Wellness</option>
                </select>
              </div>

              {/* Experience Type */}
              <div>
                <label className="text-sm font-semibold text-[#D4AF37] mb-3 block">Experience Type</label>
                <select
                  value={filters.experienceType}
                  onChange={(e) => setFilters({ ...filters, experienceType: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3A3A3E] rounded-lg text-white text-sm focus:border-[#D4AF37] outline-none"
                >
                  <option>All</option>
                  <option>Tours</option>
                  <option>Hiking</option>
                  <option>Wildlife Safari</option>
                  <option>Scenic Drives</option>
                  <option>Dining</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-semibold text-[#D4AF37] mb-3 block">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3A3A3E] rounded-lg text-white text-sm focus:border-[#D4AF37] outline-none"
                >
                  <option>All Areas</option>
                  <option>Kruger Gate</option>
                  <option>Panoramic Route</option>
                  <option>Mbombela</option>
                  <option>Sabie</option>
                  <option>Graskop</option>
                  <option>White River</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-semibold text-[#D4AF37] mb-3 block">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3A3A3E] rounded-lg text-white text-sm focus:border-[#D4AF37] outline-none"
                >
                  <option>All</option>
                  <option>Half-day</option>
                  <option>Full-day</option>
                  <option>Multi-day</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="text-sm font-semibold text-[#D4AF37] mb-3 block">Budget Range</label>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  value={filters.budget.max}
                  onChange={(e) => setFilters({ ...filters, budget: { ...filters.budget, max: parseInt(e.target.value) } })}
                  className="w-full accent-[#D4AF37]"
                />
                <p className="text-xs text-[#A0A0A6] mt-2">Up to R{filters.budget.max.toLocaleString()}</p>
              </div>

              {/* Group Size */}
              <div>
                <label className="text-sm font-semibold text-[#D4AF37] mb-3 block">Group Size</label>
                <select
                  value={filters.groupSize}
                  onChange={(e) => setFilters({ ...filters, groupSize: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3A3A3E] rounded-lg text-white text-sm focus:border-[#D4AF37] outline-none"
                >
                  <option>All</option>
                  <option>Solo</option>
                  <option>Couple</option>
                  <option>Family</option>
                  <option>Corporate</option>
                </select>
              </div>

              {/* Special Interest */}
              <div>
                <label className="text-sm font-semibold text-[#D4AF37] mb-3 block">Special Interest</label>
                <select
                  value={filters.specialInterest}
                  onChange={(e) => setFilters({ ...filters, specialInterest: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2A2A2E] border border-[#3A3A3E] rounded-lg text-white text-sm focus:border-[#D4AF37] outline-none"
                >
                  <option>All</option>
                  <option>Photography</option>
                  <option>Wellness</option>
                  <option>Romance</option>
                  <option>Educational</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() =>
                  setFilters({
                    destination: 'All',
                    experienceType: 'All',
                    location: 'All Areas',
                    duration: 'All',
                    budget: { min: 0, max: 10000 },
                    groupSize: 'All',
                    specialInterest: 'All',
                  })
                }
                className="w-full py-2 text-[#D4AF37] border border-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-sm font-semibold"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* ===== RIGHT: LISTINGS FEED ===== */}
          <div className="space-y-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1E] border border-[#2A2A2E] rounded-lg text-[#D4AF37] font-semibold w-full"
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={18} className={`ml-auto transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Mobile Filter Drawer */}
              {showMobileFilters && (
                <div className="mt-4 space-y-4 p-4 bg-[#1A1A1E] rounded-lg border border-[#2A2A2E]">
                  {/* Filter content same as desktop */}
                  <p className="text-sm text-[#A0A0A6]">Use desktop view for full filter experience</p>
                </div>
              )}
            </div>

            {/* Gold Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            {/* Featured/Editor's Picks */}
            {filtered.slice(0, 3).some(e => e.tier === 'Platinum' || e.tier === 'Elite') && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">🌟 Editor's Picks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {filtered
                    .filter(e => e.tier === 'Platinum' || e.tier === 'Elite')
                    .slice(0, 4)
                    .map(exp => (
                      <ExperienceCard
                        key={exp.id}
                        experience={exp}
                        onFavorite={toggleFavorite}
                        onViewDetail={handleViewDetail}
                      />
                    ))}
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8" />
              </div>
            )}

            {/* All Experiences */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Curated Experiences</h2>
                <p className="text-sm text-[#A0A0A6]">
                  Showing <span className="text-[#D4AF37] font-bold">{filtered.length}</span> experiences
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map(exp => (
                    <ExperienceCard
                      key={exp.id}
                      experience={exp}
                      onFavorite={toggleFavorite}
                      onViewDetail={handleViewDetail}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <AlertCircle className="w-12 h-12 text-[#D4AF37] mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">No Experiences Found</h3>
                  <p className="text-[#A0A0A6]">Try adjusting your filters to discover amazing experiences</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="bg-[#1A1A1E] border-t border-[#2A2A2E] py-16 mt-16">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">Why Experience With Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '✓', title: 'Local Guides Verified', desc: 'Expert, background-checked guides' },
              { icon: '✓', title: 'Safety Certified', desc: 'All activities meet safety standards' },
              { icon: '✓', title: 'Environmental Commitment', desc: 'Sustainable & eco-friendly' },
              { icon: '✓', title: 'Booking Guarantees', desc: 'Secure payment & cancellation policy' },
            ].map((trust, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl text-[#D4AF37] mb-3">{trust.icon}</p>
                <p className="font-bold text-white mb-2">{trust.title}</p>
                <p className="text-sm text-[#A0A0A6]">{trust.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-black/50 rounded-lg border border-[#2A2A2E] text-center">
            <p className="text-[#D4AF37] font-bold mb-2">✓ LowveldHub Verified</p>
            <p className="text-[#A0A0A6]">Curated for excellence. Your adventure, our responsibility.</p>
            <p className="text-xs text-[#7A7A80] mt-4">
              We are a curated digital ecosystem. Listings are verified. Excellence is expected.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});
