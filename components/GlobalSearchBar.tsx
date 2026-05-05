import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Search, Sparkles, Loader, MapPin, Star, TrendingUp } from 'lucide-react';
import { performSmartSearch, performSmartMedicalSearch } from '../services/aiService';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  location: string;
  rating?: number;
  tier?: string;
  image?: string;
}

interface GlobalSearchBarProps {
  allBusinesses: any[];
  navigate: (view: string, category?: string, id?: string) => void;
  placeholder?: string;
}

const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  allBusinesses,
  navigate,
  placeholder = 'Search businesses, services, dishes...'
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Save search to history when user performs a search
  const addToHistory = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setSearchHistory(prev => {
      const updated = [searchTerm, ...prev.filter(s => s !== searchTerm)].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Suggested searches & trending
  const suggestions = useMemo(() => [
    { icon: '🍽️', text: 'Fine Dining Restaurants', query: 'luxury restaurants' },
    { icon: '🏨', text: 'Luxury Stays', query: 'exclusive accommodation' },
    { icon: '🚗', text: 'Premium Transport', query: 'business transport' },
    { icon: '💆', text: 'Spa & Wellness', query: 'spa and relaxation' },
    { icon: '🎭', text: 'Entertainment', query: 'nightlife and entertainment' },
    { icon: '☕', text: 'Cafes with WiFi', query: 'cafes with wifi' },
  ], []);

  // Local smart search - filters businesses based on query
  const performLocalSmartSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return [];

    const q = searchQuery.toLowerCase();
    const scored = allBusinesses
      .map((business: any) => {
        let score = 0;

        // Exact name match (highest priority)
        if (business.name?.toLowerCase() === q) score += 100;
        // Name contains query
        else if (business.name?.toLowerCase().includes(q)) score += 50;

        // Category match
        if (business.category?.toLowerCase().includes(q)) score += 30;
        if (business.subcategory?.toLowerCase().includes(q)) score += 25;

        // Description/tags match
        if (business.description?.toLowerCase().includes(q)) score += 20;
        if (business.tags?.some((t: string) => t.toLowerCase().includes(q))) score += 15;

        // Menu/cuisine match (for restaurants)
        if (Array.isArray(business.cuisine) && business.cuisine.some((c: string) => c.toLowerCase().includes(q))) score += 20;
        if (Array.isArray(business.menu)) {
          if (business.menu.some((m: any) => m.itemName?.toLowerCase().includes(q))) score += 15;
        }

        // Specialization match (for medical/services)
        if (business.specialization?.toLowerCase().includes(q)) score += 20;

        // Tier/premium boost (Platinum > Elite > Premium > Trial)
        const tierBoost = business.tier === 'Platinum' ? 10 : business.tier === 'Elite' ? 7 : business.tier === 'Premium' ? 3 : 0;
        score += tierBoost;

        // Verified boost
        if (business.verified) score += 5;

        // Rating boost
        if (business.rating && business.rating >= 4.5) score += 3;

        return {
          ...business,
          score,
          matchType: score >= 100 ? 'exact' : score >= 50 ? 'name' : score >= 30 ? 'category' : 'other'
        };
      })
      .filter((b: any) => b.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 8);

    return scored.map((b: any) => ({
      id: b.id,
      name: b.name,
      category: b.category || b.subcategory || 'Business',
      location: typeof b.location === 'string' ? b.location : b.location?.area || 'Mpumalanga',
      rating: b.rating,
      tier: b.tier,
      image: b.image || b.images?.[0]
    }));
  }, [allBusinesses]);

  // Handle search
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // First try local smart search for immediate results
      const localResults = performLocalSmartSearch(searchQuery);
      setResults(localResults);

      // Try AI-powered search for medical or complex queries
      if (searchQuery.toLowerCase().includes('doctor') || searchQuery.toLowerCase().includes('medical') || searchQuery.toLowerCase().includes('health')) {
        try {
          const aiResults = await performSmartMedicalSearch(searchQuery, allBusinesses);
          if (aiResults && Array.isArray(aiResults.results) && aiResults.results.length > 0) {
            setResults(aiResults.results.slice(0, 8).map((b: any) => ({
              id: b.id,
              name: b.name,
              category: b.category || 'Medical',
              location: typeof b.location === 'string' ? b.location : b.location?.area || 'Mpumalanga',
              rating: b.rating,
              tier: b.tier,
              image: b.image
            })));
          }
        } catch (e) {
          // Fall back to local results if AI fails
        }
      }
    } finally {
      setIsSearching(false);
    }
  }, [allBusinesses, performLocalSmartSearch]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        handleSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    const categoryMap: { [key: string]: string } = {
      'Eats': 'eatery-detail',
      'Nightlife': 'nightlife-detail',
      'Retail': 'retail-detail',
      'Business': 'business-detail',
      'Transport': 'transport-detail',
      'Tourism': 'experience-detail',
      'Property': 'property-detail',
      'Medical': 'business-detail',
      'Stays': 'stays-detail',
      'Real Estate': 'property-detail'
    };

    const viewType = categoryMap[result.category] || 'business-detail';
    addToHistory(query); // Save the search term
    navigate(viewType, undefined, result.id);
    setIsOpen(false);
    setQuery('');
  };

  const handleSuggestionClick = (suggestionQuery: string) => {
    setQuery(suggestionQuery);
    setIsOpen(true);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Main Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-11 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all text-sm"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        {isSearching && <Loader className="absolute right-3 top-3.5 text-gold-500 animate-spin" size={18} />}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-gold-500/20 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            // Show search history + suggestions when empty
            <div className="p-4">
              {searchHistory.length > 0 && (
                <>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Searches</span>
                    <button
                      onClick={() => {
                        setSearchHistory([]);
                        localStorage.removeItem('searchHistory');
                      }}
                      className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1 mb-4 pb-4 border-b border-white/10">
                    {searchHistory.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setQuery(term);
                          setIsOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left group"
                      >
                        <Search size={14} className="text-gray-500" />
                        <span className="text-sm text-gray-300 group-hover:text-gold-400">{term}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-gold-500" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Trending Searches</span>
              </div>
              <div className="space-y-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s.query)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                  >
                    <span className="text-lg">{s.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{s.text}</div>
                      <div className="text-xs text-gray-500">{s.query}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            // Search Results
            <div className="p-2">
              <div className="text-xs px-3 py-2 text-gray-400 font-semibold uppercase tracking-wider">
                Results ({results.length})
              </div>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gold-500/10 transition-colors text-left group"
                >
                  {result.image && (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-12 h-12 rounded object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white truncate text-sm group-hover:text-gold-500 transition-colors">
                        {result.name}
                      </h4>
                      {result.tier === 'Platinum' && (
                        <div className="text-xs px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold flex-shrink-0">
                          ⭐ PLAT
                        </div>
                      )}
                      {result.tier === 'Elite' && (
                        <div className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-bold flex-shrink-0">
                          ✨ ELITE
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <span className="text-gold-500">{result.category}</span>
                      {result.location && (
                        <>
                          <span>•</span>
                          <MapPin size={12} className="inline" />
                          <span>{result.location}</span>
                        </>
                      )}
                    </div>
                    {result.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={12} className="fill-gold-500 text-gold-500" />
                        <span className="text-xs text-gray-300">{result.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() && !isSearching ? (
            // No Results
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-300 mb-1">No results found</h3>
              <p className="text-sm text-gray-400">Try searching for a different business, service, or location</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
