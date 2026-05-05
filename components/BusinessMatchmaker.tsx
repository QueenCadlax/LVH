import React, { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, MapPin } from 'lucide-react';
import { BusinessMatch, ListingTier } from '../types';
import { findBusinessMatches } from '../services/aiService';

interface BusinessMatchmakerProps {
  businessName: string;
  businessCategory: string;
  businessArea: string;
  allBusinesses: any[];
  onSelect: (id: string) => void;
}

export const BusinessMatchmaker: React.FC<BusinessMatchmakerProps> = ({
  businessName,
  businessCategory,
  businessArea,
  allBusinesses,
  onSelect
}) => {
  const [matches, setMatches] = useState<BusinessMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const results = await findBusinessMatches(
          businessName,
          businessCategory,
          businessArea,
          allBusinesses
        );
        setMatches(results || []);
      } catch (error) {
        console.error('Error fetching business matches:', error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [businessName, businessCategory, businessArea, allBusinesses]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-gold-500/10 to-gold-400/5 rounded-xl p-6 border border-gold-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-gold-500" size={20} />
          <h3 className="text-lg font-serif text-white">AI Smart Matches</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-20 bg-white/10 rounded-lg"></div>
          <div className="h-20 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-gold-500/10 via-gold-400/5 to-transparent rounded-xl p-6 border border-gold-500/30 backdrop-blur-sm">
      {/* Header with AI Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="text-gold-500 animate-pulse" size={24} />
            <div className="absolute inset-0 bg-gold-500/30 rounded-full blur-lg -z-10"></div>
          </div>
          <div>
            <h3 className="text-xl font-serif text-white">Smart Business Matches</h3>
            <p className="text-xs text-gold-300">AI-powered complementary partnerships</p>
          </div>
        </div>
        <div className="bg-gold-500/20 px-3 py-1 rounded-full border border-gold-500/40">
          <p className="text-xs font-bold text-gold-300 uppercase tracking-wider">AI-Powered</p>
        </div>
      </div>

      {/* Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.slice(0, 4).map((match) => (
          <div
            key={match.id}
            onClick={() => onSelect(match.id)}
            className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/40 rounded-lg p-4 transition-all duration-300"
          >
            {/* Match Score Badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-white group-hover:text-gold-300 transition-colors mb-1">
                  {match.name}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2">{match.matchReason}</p>
              </div>
              <div className="ml-3 flex items-center gap-1 bg-gold-500/20 px-2 py-1 rounded-full whitespace-nowrap">
                <TrendingUp size={12} className="text-gold-400" />
                <span className="text-xs font-bold text-gold-300">{match.matchScore}%</span>
              </div>
            </div>

            {/* Location and Rating */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-gold-500/60" />
                <span>{match.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gold-400">★ {match.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Tier Badge */}
            {(match.tier === 'Platinum' || match.tier === 'Elite') && (
              <div className="mt-2">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  match.tier === 'Platinum'
                    ? 'bg-purple-500/30 text-purple-200 border border-purple-500/50'
                    : 'bg-gold-500/30 text-gold-200 border border-gold-500/50'
                }`}>
                  {match.tier}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All CTA */}
      {matches.length > 4 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => console.log('View all matches')}
            className="text-sm text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-2 transition-colors"
          >
            View all {matches.length} matches
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessMatchmaker;
