import React, { useState } from 'react';
import { MapPin, Sparkles, Search } from 'lucide-react';
import { MPUMALANGA_AREAS } from '../types';

interface AreaGuideLandingProps {
  navigate: (view: string, category?: string, id?: string) => void;
}

export const AreaGuideLanding: React.FC<AreaGuideLandingProps> = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = MPUMALANGA_AREAS.filter(area =>
    area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Featured areas - these are highlighted first but full list is always available
  const featuredAreas = ['Nelspruit', 'Hazyview', 'Sabie', 'Pilgrim\'s Rest', 'White River', 'Dullstroom'];
  const featured = MPUMALANGA_AREAS.filter(area => featuredAreas.includes(area));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="text-gold-500 animate-pulse" size={36} />
              <div className="absolute inset-0 bg-gold-500/30 rounded-full blur-lg -z-10"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white">AI-Powered Area Guides</h1>
          </div>
          <p className="text-gold-300 text-lg mb-2">Discover the Best of Every Mpumalanga Area</p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Luxury travel guides crafted by AI for all 65+ Mpumalanga areas. From fine dining to nature retreats, find your perfect experience.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 text-gold-500" size={20} />
            <input
              type="text"
              placeholder="Search areas... (e.g., Hazyview, Sabie, Nelspruit)"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-gold-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-500/70 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Featured Areas */}
        {!searchTerm && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-2">
              <span className="text-gold-500">✨</span> Popular Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(area => (
                <div
                  key={area}
                  onClick={() => navigate('area-guide', undefined, area)}
                  className="group cursor-pointer bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-gold-500/30 hover:border-gold-500/50 rounded-lg p-6 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-serif text-white group-hover:text-gold-300 transition-colors mb-2">
                        {area}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin size={14} />
                        <span>Mpumalanga</span>
                      </div>
                    </div>
                    <div className="bg-gold-500/20 p-2 rounded-full group-hover:bg-gold-500/30 transition-all">
                      <Sparkles size={20} className="text-gold-400" />
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    Discover luxury experiences, fine dining, and authentic local culture
                  </p>
                  <button className="text-gold-400 hover:text-gold-300 font-semibold text-sm flex items-center gap-2 transition-colors">
                    Read Guide
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Areas Grid */}
        <div>
          <h2 className="text-2xl font-serif text-white mb-6 flex items-center gap-2">
            <MapPin size={28} className="text-gold-500" />
            {searchTerm ? `Search Results (${filteredAreas.length})` : `All Areas (${MPUMALANGA_AREAS.length})`}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredAreas.map(area => (
              <button
                key={area}
                onClick={() => navigate('area-guide', undefined, area)}
                className="bg-white/5 hover:bg-white/15 border border-white/10 hover:border-gold-500/50 rounded-lg p-4 text-center transition-all group cursor-pointer"
              >
                <p className="text-white group-hover:text-gold-300 font-semibold transition-colors">
                  {area}
                </p>
                <p className="text-xs text-gray-400 mt-1">AI Guide</p>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-gold-500/20 to-gold-400/10 border border-gold-500/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-serif text-white mb-4">Plan Your Perfect Trip</h3>
          <p className="text-gold-300 mb-6">
            Not sure where to start? Let our AI create a personalized itinerary just for you.
          </p>
          <button
            onClick={() => navigate('vip-itinerary')}
            className="bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 px-8 rounded-lg transition-all shadow-lg inline-flex items-center gap-2"
          >
            <Sparkles size={20} />
            Start VIP Itinerary Planner
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreaGuideLanding;
