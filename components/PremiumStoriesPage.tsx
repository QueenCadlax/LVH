import React, { useState, useMemo } from 'react';
import { ChevronRight, Play, BookOpen, TrendingUp, Building2, Sparkles, Cpu, Film } from 'lucide-react';
import { stories } from '../data/seeds';
import { Story } from '../types';

type EditorialPillar = 'journal' | 'entrepreneurs' | 'money' | 'property' | 'lifestyle' | 'innovation' | 'tv';

interface PillarConfig {
  id: EditorialPillar;
  label: string;
  icon: React.ReactNode;
  description: string;
  keywords: string[];
}

const PILLARS: PillarConfig[] = [
  {
    id: 'journal',
    label: 'The Lowveld Journal',
    icon: <BookOpen size={18} />,
    description: 'Regional developments, economic shifts, infrastructure',
    keywords: ['news', 'regional', 'government', 'industry', 'infrastructure']
  },
  {
    id: 'entrepreneurs',
    label: 'Entrepreneurs & Empire Builders',
    icon: <TrendingUp size={18} />,
    description: 'Founder stories, business growth, family businesses',
    keywords: ['entrepreneur', 'spotlight', 'founder', 'business', 'growth']
  },
  {
    id: 'money',
    label: 'Money, Markets & Opportunity',
    icon: <TrendingUp size={18} />,
    description: 'Finance, agriculture exports, business trends',
    keywords: ['finance', 'money', 'market', 'agriculture', 'export', 'macadamia']
  },
  {
    id: 'property',
    label: 'Property, Places & Development',
    icon: <Building2 size={18} />,
    description: 'Eco-estates, commercial projects, property trends',
    keywords: ['property', 'development', 'real estate', 'construction', 'eco']
  },
  {
    id: 'lifestyle',
    label: 'Culture, Taste & Lifestyle',
    icon: <Sparkles size={18} />,
    description: 'Food, travel, luxury living, wellness, fashion',
    keywords: ['lifestyle', 'culture', 'food', 'travel', 'wellness', 'luxury']
  },
  {
    id: 'innovation',
    label: 'Innovation, Tech & The Future',
    icon: <Cpu size={18} />,
    description: 'Tech startups, digital transformation, AI, education',
    keywords: ['innovation', 'tech', 'future', 'technology', 'startup', 'digital', 'ai']
  },
  {
    id: 'tv',
    label: 'Lowveld TV',
    icon: <Film size={18} />,
    description: 'Videos, documentaries, interviews, event coverage',
    keywords: ['video', 'documentary', 'interview', 'event', 'tv']
  }
];

const PremiumStoriesPage: React.FC<{ navigate: any }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<EditorialPillar>('journal');

  // Map stories to pillars
  const storiesByPillar = useMemo(() => {
    const map: Record<EditorialPillar, Story[]> = {
      journal: [],
      entrepreneurs: [],
      money: [],
      property: [],
      lifestyle: [],
      innovation: [],
      tv: []
    };

    stories.forEach(story => {
      const typeLC = (story.type || '').toLowerCase();
      const categoryLC = (story.category || '').toLowerCase();
      const textLC = `${typeLC} ${categoryLC}`.toLowerCase();

      PILLARS.forEach(pillar => {
        if (pillar.keywords.some(kw => textLC.includes(kw))) {
          map[pillar.id].push(story);
        }
      });
    });

    // Ensure each pillar has at least the stories assigned to it
    return map;
  }, []);

  // Get featured story (first trending, then isFeatured, then first story)
  const featuredStory = useMemo(() => {
    return stories.find(s => s.isTrending) || stories.find(s => s.isFeatured) || stories[0];
  }, []);

  // Get secondary featured stories (2–3 related stories)
  const secondaryFeatured = useMemo(() => {
    const related = stories.filter(s => s.id !== featuredStory?.id).slice(0, 3);
    return related;
  }, [featuredStory]);

  // Stories for active tab
  const tabStories = useMemo(() => {
    const all = storiesByPillar[activeTab] || [];
    return all.length > 0 ? all : stories.slice(0, 6);
  }, [activeTab, storiesByPillar]);

  const activePillar = PILLARS.find(p => p.id === activeTab);

  return (
    <div className="min-h-screen bg-black">
      {/* HERO FEATURED STORY */}
      {featuredStory && (
        <div className="pt-28 pb-8">
          <div className="container mx-auto px-4">
            <div
              onClick={() => navigate('story-detail', undefined, featuredStory.id)}
              className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={featuredStory.image}
                alt={featuredStory.headline}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-3xl">
                  <div className="text-sm text-gold-400 font-bold uppercase tracking-widest mb-2">
                    Featured Story
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                    {featuredStory.headline}
                  </h1>
                  <p className="text-lg text-gray-300 max-w-2xl mb-4">
                    {featuredStory.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    {featuredStory.owner && <span>{featuredStory.owner}</span>}
                    <span>•</span>
                    {featuredStory.date && <span>{featuredStory.date}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECONDARY FEATURED (2–3 CARDS) */}
      <div className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryFeatured.map(story => (
              <div
                key={story.id}
                onClick={() => navigate('story-detail', undefined, story.id)}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={story.image}
                  alt={story.headline}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-serif text-white group-hover:text-gold-300 transition-colors">
                    {story.headline}
                  </h3>
                  <div className="text-xs text-gray-400 mt-2">{story.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EDITORIAL PILLAR TABS */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-4">
            {PILLARS.map(pillar => (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === pillar.id
                    ? 'bg-gold-500 text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {pillar.icon}
                <span>{pillar.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PILLAR CONTENT SECTION */}
      <div className="container mx-auto px-4 py-12">
        {/* Pillar intro + description */}
        {activePillar && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-gold-400">{activePillar.icon}</div>
              <h2 className="text-3xl font-serif text-white">{activePillar.label}</h2>
            </div>
            <p className="text-gray-400 max-w-2xl text-lg">{activePillar.description}</p>
          </div>
        )}

        {/* GRID OF STORIES */}
        {tabStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tabStories.map(story => (
              <div
                key={story.id}
                onClick={() => navigate('story-detail', undefined, story.id)}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                  <img
                    src={story.image}
                    alt={story.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {activeTab === 'tv' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                      <Play size={48} className="text-white" fill="white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-serif text-white group-hover:text-gold-300 transition-colors mb-2">
                    {story.headline}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{story.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">{story.date}</div>
                    <ChevronRight size={16} className="text-gold-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400">No stories in this pillar yet.</p>
          </div>
        )}
      </div>

      {/* FOOTER NOTE */}
      <div className="border-t border-white/5 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Interested in being featured? <span className="text-gold-400 cursor-pointer hover:text-gold-300">Contact our editorial team</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumStoriesPage;
