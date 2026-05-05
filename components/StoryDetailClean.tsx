import React, { useMemo, useState, useEffect } from 'react';
import { stories } from '../data/seeds';
import { MapPin, Share2, Bookmark, ChevronLeft, Linkedin, Twitter, Mail, Lock } from 'lucide-react';
import { getSmartRecommendations } from '../services/aiService';

const StoryDetailClean: React.FC<{ storyId?: string; navigate: any }> = ({ storyId, navigate }) => {
  const story = useMemo(() => stories.find(s => s.id === storyId), [storyId]);
  const [bookmarks, setBookmarks] = useState<string[]>(() => JSON.parse(localStorage.getItem('lh_story_bookmarks') || '[]'));
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.includes(storyId || ''));
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!story) return <div className="pt-28 container mx-auto px-4"> <p className="text-gray-400">Story not found.</p> </div>;

  // Related stories & series
  const seriesStories = story.series ? stories.filter(s => s.series?.name === story.series?.name && s.id !== story.id) : [];
  const related = stories.filter(s => s.id !== story.id && (s.type === story.type || s.category === story.category) && !seriesStories.find(ss => ss.id === s.id)).slice(0, 4);
  
  const [aiSuggestions, setAiSuggestions] = useState<typeof stories>([]);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      setIsSuggestLoading(true);
      try {
        const cats = await getSmartRecommendations(story.headline || story.description || '');
        if (!mounted) return;
        if (Array.isArray(cats) && cats.length > 0) {
          const picks = stories.filter(s => cats.includes(s.type) || cats.includes(s.category)).filter(s => s.id !== story.id).slice(0, 4);
          setAiSuggestions(picks);
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setIsSuggestLoading(false);
      }
    };
    run();
    return () => { mounted = false; };
  }, [story.id]);

  // Bookmark toggle
  const toggleBookmark = () => {
    const updated = isBookmarked ? bookmarks.filter(b => b !== storyId) : [...bookmarks, storyId || ''];
    setBookmarks(updated);
    setIsBookmarked(!isBookmarked);
    localStorage.setItem('lh_story_bookmarks', JSON.stringify(updated));
  };

  // Newsletter subscription
  const handleSubscribe = () => {
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmailInput('');
    }
  };

  // Share functions
  const shareUrl = window.location.href;
  const shareText = `Check out: "${story.headline}" on LowveldHub`;

  const openShare = (platform: string) => {
    let url = '';
    if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'email') {
      url = `mailto:?subject=${encodeURIComponent(story.headline || 'Check this out')}&body=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
    }
    if (url) window.open(url, '_blank');
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#050505]">
      <div className="relative">
        <img src={story.image} alt={story.headline} loading="lazy" className="w-full h-[56vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute top-6 left-6">
          <button onClick={() => navigate('lowveld-stories')} className="bg-black/60 text-white p-2 rounded-full border border-white/10"> <ChevronLeft size={18} /> </button>
        </div>
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-[10px] font-bold uppercase tracking-widest">{story.type}</div>
            {story.isSponsored && <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold uppercase">Sponsored</div>}
            {story.isPremium && <div className="inline-block px-3 py-1 bg-purple-600/10 border border-purple-600/20 rounded-full text-purple-400 text-[10px] font-bold uppercase flex items-center gap-1"><Lock size={10} />Premium</div>}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-3">{story.headline}</h1>
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <div className="flex items-center gap-2"><MapPin size={14} className="text-gold-400" /> <span>{story.area}</span></div>
            <div>{story.date}</div>
            <div>{story.views?.toLocaleString() || '0'} views</div>
            {story.readingTime && <div>{story.readingTime} min read</div>}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2 bg-[#0a0a0a] p-8 rounded-2xl border border-white/10">
          <div className="prose prose-invert max-w-none text-gray-200">
            {Array.isArray(story.images) && story.images.length > 0 ? (
              <div className="mb-6">
                <div className="relative overflow-hidden rounded-lg">
                  <img src={story.images[galleryIndex]} loading="lazy" className="w-full h-80 object-cover rounded-md" />
                  <button onClick={() => setGalleryIndex((galleryIndex - 1 + story.images.length) % story.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">‹</button>
                  <button onClick={() => setGalleryIndex((galleryIndex + 1) % story.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">›</button>
                </div>
                <div className="mt-3 flex gap-2">
                  {story.images.map((im, i) => (
                    <img key={i} src={im} loading="lazy" onClick={() => setGalleryIndex(i)} className={`w-20 h-12 object-cover rounded-md cursor-pointer border ${i === galleryIndex ? 'border-gold-500' : 'border-white/10'}`} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-lg italic font-serif">{story.description}</p>
            )}
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris euismod, arcu a tristique tincidunt, justo urna cursus arcu, id faucibus sapien augue non lorem. Suspendisse potenti. Integer et lectus a arcu volutpat bibendum.</p>
            <blockquote className="border-l-4 border-gold-500 pl-4 italic text-gray-300">“This is a highlighted quote from the story to draw attention to the author's voice.”</blockquote>
            <h3 className="mt-6">Background</h3>
            <p>More in-depth reporting goes here. Embed images, videos, and slideshows as required by the editorial content.</p>

            {/* Series Section */}
            {story.series && (
              <div className="mt-8 p-4 bg-gold-500/5 border border-gold-500/20 rounded-lg">
                <h4 className="text-gold-400 font-bold mb-2">Series: {story.series.name}</h4>
                <p className="text-gray-400 text-sm">Part {story.series.part} of {story.series.total}</p>
                {seriesStories.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {seriesStories.slice(0, 3).map(ss => (
                      <button key={ss.id} onClick={() => navigate('story-detail', undefined, ss.id)} className="w-full text-left text-sm text-gold-400 hover:text-gold-300 transition-colors">
                        → Part {ss.series?.part}: {ss.headline}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Related Stories */}
            <div className="mt-8">
              <h4 className="text-gold-400 font-bold mb-4">Related Stories</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map(r => (
                  <div key={r.id} onClick={() => navigate('story-detail', undefined, r.id)} className="cursor-pointer bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                    <img src={r.image} loading="lazy" className="w-full h-28 object-cover rounded-md mb-2" />
                    <div className="text-sm text-white font-semibold">{r.headline}</div>
                    <div className="text-xs text-gray-400">{r.area} • {r.date}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="text-gold-400 font-bold mb-4">AI Suggestions</h4>
                {isSuggestLoading ? <div className="text-gray-400">Loading recommendations…</div> : (
                  <div className="grid grid-cols-1 gap-3">
                    {aiSuggestions.length > 0 ? aiSuggestions.map(a => (
                      <div key={a.id} onClick={() => navigate('story-detail', undefined, a.id)} className="cursor-pointer bg-white/5 p-3 rounded-lg flex gap-3 items-center hover:bg-white/10 transition-colors">
                        <img src={a.image} loading="lazy" className="w-16 h-12 object-cover rounded-md" />
                        <div className="text-sm text-white">{a.headline}</div>
                      </div>
                    )) : <div className="text-gray-400">No AI suggestions available.</div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 sticky top-28 space-y-6">
          {/* Author Profile */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-white font-bold text-lg">
                {(story.owner || '').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold">{story.owner}</h4>
                <p className="text-gold-400 text-xs font-semibold">{story.authorTitle}</p>
                <p className="text-gray-400 text-xs mt-1">{story.authorBio}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 border-t border-white/10 pt-3">
              {stories.filter(s => s.owner === story.owner).length} stories published
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
            <button onClick={toggleBookmark} className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-bold transition-colors ${isBookmarked ? 'bg-gold-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}>
              <Bookmark size={16} /> {isBookmarked ? 'Bookmarked' : 'Save'}
            </button>
            <div className="flex gap-2">
              <button onClick={() => openShare('linkedin')} className="flex-1 flex items-center justify-center gap-1 bg-white/5 text-white py-2 rounded-lg hover:bg-blue-500/20 transition-colors" title="Share on LinkedIn">
                <Linkedin size={16} />
              </button>
              <button onClick={() => openShare('twitter')} className="flex-1 flex items-center justify-center gap-1 bg-white/5 text-white py-2 rounded-lg hover:bg-blue-400/20 transition-colors" title="Share on Twitter">
                <Twitter size={16} />
              </button>
              <button onClick={() => openShare('email')} className="flex-1 flex items-center justify-center gap-1 bg-white/5 text-white py-2 rounded-lg hover:bg-red-500/20 transition-colors" title="Share via Email">
                <Mail size={16} />
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-br from-gold-500/20 to-gold-600/10 p-6 rounded-2xl border border-gold-500/20">
            <h4 className="text-white font-bold mb-2">Weekly Insights</h4>
            <p className="text-gray-400 text-sm mb-4">Get the best of Lowveld Stories delivered to your inbox.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="email"
                placeholder="Your email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className="bg-black/60 border border-gold-500/20 rounded px-3 py-2 text-white text-sm outline-none focus:border-gold-500/50 transition-colors" 
              />
              <button 
                onClick={handleSubscribe}
                className="bg-gold-500 text-black px-4 py-2 rounded font-bold hover:bg-gold-600 transition-colors text-sm"
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>

          {/* Story Stats */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="text-white font-bold mb-3 text-sm">Story Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Views:</span>
                <span className="text-gold-400 font-bold">{story.views?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Reading Time:</span>
                <span className="text-gold-400 font-bold">{story.readingTime || 5} min</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Category:</span>
                <span className="text-gold-400 font-bold text-xs">{story.type}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StoryDetailClean;
