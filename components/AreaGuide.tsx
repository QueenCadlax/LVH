import React, { useEffect, useState } from 'react';
import { MapPin, Sparkles, Calendar, DollarSign, Compass } from 'lucide-react';
import { generateAreaGuide } from '../services/aiService';

interface AreaGuideProps {
  areaName: string;
  businesses: any[];
  destinations: any[];
}

export const AreaGuide: React.FC<AreaGuideProps> = ({ areaName, businesses, destinations }) => {
  const [guide, setGuide] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      setLoading(true);
      try {
        const result = await generateAreaGuide(areaName, businesses, destinations);
        setGuide(result);
      } catch (error) {
        console.error('Error generating area guide:', error);
        setGuide('');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [areaName, businesses, destinations]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gradient-to-r from-gold-500/20 to-transparent rounded-lg"></div>
          <div className="h-20 bg-white/10 rounded-lg"></div>
          <div className="h-20 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gold-500/20 via-gold-400/10 to-transparent rounded-xl p-8 border border-gold-500/30 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <Sparkles className="text-gold-500" size={24} />
                <div className="absolute inset-0 bg-gold-500/30 rounded-full blur-lg -z-10"></div>
              </div>
              <h2 className="text-3xl font-serif text-white">The Ultimate {areaName} Guide</h2>
            </div>
            <p className="text-gold-300 text-sm">AI-curated luxury travel experience</p>
          </div>
          <div className="bg-gold-500/20 px-4 py-2 rounded-full border border-gold-500/40">
            <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">Premium Guide</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <MapPin size={18} className="text-gold-500 mb-2" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
            <p className="text-white font-semibold mt-1">{areaName}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Calendar size={18} className="text-gold-500 mb-2" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">Best Time</p>
            <p className="text-white font-semibold mt-1">Oct - Apr</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <DollarSign size={18} className="text-gold-500 mb-2" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">Daily Budget</p>
            <p className="text-white font-semibold mt-1">R2,500-5k</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <Compass size={18} className="text-gold-500 mb-2" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">Type</p>
            <p className="text-white font-semibold mt-1">Luxury Stay</p>
          </div>
        </div>
      </div>

      {/* Guide Content */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
        <div className="prose prose-invert max-w-none">
          <div className="space-y-4 text-gray-100 leading-relaxed">
            {guide.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Fine Dining', 'Nature Retreats', 'Cultural Immersion'].map((experience, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-gold-500/30 rounded-lg p-6 cursor-pointer transition-all group"
          >
            <h4 className="font-serif text-lg text-white group-hover:text-gold-300 transition-colors mb-2">
              {experience}
            </h4>
            <p className="text-sm text-gray-400">
              {experience === 'Fine Dining'
                ? 'Exquisite local and international cuisine'
                : experience === 'Nature Retreats'
                ? 'Serene wellness and outdoor experiences'
                : 'Authentic local heritage and traditions'}
            </p>
            <div className="mt-4">
              <button className="text-gold-400 hover:text-gold-300 text-sm font-semibold flex items-center gap-2 transition-colors">
                Explore
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaGuide;
