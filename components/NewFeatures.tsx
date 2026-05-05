import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Activity, Globe, CheckCircle, Zap, Server, LifeBuoy, X, Upload, ChevronRight, ChevronLeft, Play, User, Edit3, Crown, Sparkles, CreditCard, Share2, Layout, Video, Camera, Briefcase, TrendingUp, ShoppingBag, ArrowUpRight, Phone, Calendar, Check } from 'lucide-react';
import { SectionTitle, PrimaryButton, LuxuryCard } from './Shared';
import { stories, communityGroups, datingProfiles, marketplaceItems } from '../data/seeds';
import ProductCard from './Marketplace/ProductCard';
import { Product } from '../types';
import { enhanceStoryContent } from '../services/aiService';
import { MPUMALANGA_AREAS, Story, Category } from '../types';

// --- AREA SELECTOR COMPONENT ---

export const AreaSelector = ({ activeArea, onChange }: { activeArea: string, onChange: (area: string) => void }) => {
  const areas = ["All Areas", ...MPUMALANGA_AREAS];

  return (
    <div className="relative inline-block text-left z-30">
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500/20 to-gold-500/10 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative flex items-center bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 shadow-xl">
          <MapPin size={12} className="text-gold-500 mr-2" />
          <select 
            value={activeArea}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-bold uppercase tracking-wider text-white appearance-none pr-6 cursor-pointer focus:ring-0 max-w-[150px] md:max-w-none truncate"
            style={{ backgroundImage: 'none' }}
          >
            {areas.map(area => (
              <option key={area} value={area} className="bg-black text-gray-300 py-1">
                {area}
              </option>
            ))}
          </select>
          <ChevronDown size={12} className="text-gray-500 absolute right-3 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

// --- LUXURY EDITORIAL STORY CARD ---

export const LowveldStoryCard: React.FC<{ story: Story; onPress?: () => void }> = ({ story, onPress }) => {
  const categoryColorMap: Record<string, string> = {
    [Category.FoodAndHospitality]: 'bg-gold-500 text-black',
    [Category.TourismTravelAndStays]: 'bg-gold-500 text-black',
    [Category.LuxuryAndLifestyle]: 'bg-gold-500 text-black',
    [Category.BusinessAndProfessional]: 'bg-gold-500 text-black',
    [Category.ShoppingAndRetail]: 'bg-gold-500 text-black',
    [Category.NightlifeAndEntertainment]: 'bg-gold-500 text-black',
    'News': 'bg-gold-500 text-black',
    'Money & Finance': 'bg-gold-500 text-black',
  };
  const tagClass = categoryColorMap[story.type] || 'bg-white/10 text-white';
  return (
    <div 
      onClick={onPress}
      className="group relative bg-[#0d0d0d] rounded-2xl overflow-hidden border border-white/10 cursor-pointer transition-all duration-500 hover:-translate-y-2 animate-fade-in"
    >
      {/* Visual Header */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={story.image} 
          srcSet={`${story.image}&w=600 600w, ${story.image}&w=900 900w, ${story.image}&w=1400 1400w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={story.headline} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className={`${tagClass} backdrop-blur-md text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded border border-white/10 flex items-center gap-2`}> 
            {story.type}
            {story.isFeatured && <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse-slow" />}
          </span>
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-end p-6 pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
            <button onClick={(e) => { e.stopPropagation(); onPress && onPress(); }} className="bg-gold-500 text-black px-4 py-2 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg">Read More</button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {story.isFeatured && (
            <span className="bg-gold-500 text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-[0_0_15px_rgba(227,185,44,0.4)] animate-pulse-slow">
              Featured
            </span>
          )}
          {story.isSponsored && (
             <span className="bg-white/90 text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
               Partner Spotlight
             </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={10} className="text-gold-500" />
          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.15em]">{story.area}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold-400 transition-colors leading-tight mb-2 tracking-tight">
          {story.headline}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">{story.description}</p>

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {story.owner && <span className="text-sm text-gray-300 font-medium">{story.owner}</span>}
              <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">{story.date}</span>
            </div>
            <ArrowUpRight size={14} className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Restrained Glow for Featured/Partner */}
      {(story.isFeatured || story.isPartner || story.isSponsored) && (
        <div className="absolute -inset-1 border border-gold-500/10 rounded-2xl pointer-events-none group-hover:border-gold-500/30 transition-colors"></div>
      )}
    </div>
  );
};

// --- ENTREPRENEUR SPOTLIGHT CARD (PREMIUM VARIANT) ---

export const EntrepreneurSpotlightCard: React.FC<{ story: Story; onNavigate: (view: string, id: string) => void }> = ({ story, onNavigate }) => {
  return (
    <div className="group relative bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-[2rem] overflow-hidden border border-gold-500/20 shadow-2xl transition-all duration-500 hover:border-gold-500/40 animate-fade-in">
       <div className="flex flex-col md:flex-row h-full">
          {/* Visual */}
          <div className="w-full md:w-2/5 relative min-h-[300px]">
             <img src={story.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" alt={story.owner} />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
          </div>

          {/* Detailed Content */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="bg-gold-500 text-black text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-gold-500/60 shadow-[0_0_12px_rgba(227,185,44,0.3)]">Spotlight</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 border border-gold-500/30 px-3 py-1 rounded-full bg-gold-500/5">
                   <MapPin size={10} /> {story.area}
                </span>
             </div>

             <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-tight tracking-tight">
                {story.headline}
             </h2>

             <div className="flex items-center gap-2 text-gold-400 mb-6">
                <Crown size={16} />
                <span className="text-sm font-bold uppercase tracking-wider">{story.owner} • {story.businessName}</span>
             </div>

             {/* Action Buttons */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <button 
                   onClick={() => story.businessId && onNavigate('business-detail', story.businessId)}
                   className="bg-white/5 border border-white/10 hover:bg-gold-500 hover:text-black hover:border-gold-500 text-white p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                >
                   <Briefcase size={12} /> View Business
                </button>
                <button className="bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                   <Phone size={12} /> Contact
                </button>
                <button className="bg-white/5 border border-white/10 hover:bg-green-500 hover:text-black text-white p-3 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                   <Calendar size={12} /> Book
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- ACTIVITY TICKER COMPONENT ---

export const ActivityTicker = () => {
  const [index, setIndex] = useState(0);
  const activities = [
    "A business in Mbombela just upgraded to Premium.",
    "A user in Lydenburg is browsing luxury vehicles.",
    "A restaurant in White River added a new menu.",
    "Someone in Hazyview booked a lodge stay.",
    "A dealership added a new premium vehicle.",
    "Creators uploaded new marketplace services.",
    "5 users are viewing Real Estate listings right now."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 flex justify-center animate-fade-in delay-500">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-3 overflow-hidden max-w-[90vw] md:max-w-md">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Live</span>
        </div>
        <div className="h-4 overflow-hidden relative flex-1">
          {activities.map((text, i) => (
            <div 
              key={i}
              className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out flex items-center ${
                i === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              <span className="text-xs text-white truncate">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- WEBSITE BUILDER SALES SECTION ---

export const WebsiteBuilderSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [management, setManagement] = useState(false);

  const features = [
    "Free Hosting & Domain (1 Year)",
    "AI Business Agent Included",
    "Premium Modern Design",
    "Delivered in 5 Days",
    "24/7 Priority Support"
  ];

  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative rounded-[2rem] overflow-hidden border border-gold-500/30 bg-[#080808] shadow-[0_0_50px_rgba(212,175,55,0.1)] group max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
                <div className="p-10 md:p-14 flex flex-col justify-center order-2 lg:order-1">
                     <h3 className="text-gold-400 font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <Sparkles size={12} /> Limited Time Offer
                     </h3>
                     <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-[1.1]">
                        Get Your AI-Powered <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 animate-shimmer">Website in 5 Days</span>
                     </h2>
                     <div className="inline-flex items-center gap-3 border border-gold-500/30 bg-gold-500/5 rounded-full px-4 py-2 mb-8 w-fit">
                        <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
                        <span className="text-gold-300 font-bold text-xs uppercase tracking-widest">R1999 ONE-TIME • No Monthly Fees</span>
                     </div>
                     <div className="grid grid-cols-1 gap-3 mb-10">
                        {features.map((f, i) => (
                           <div key={i} className="flex items-center gap-3 text-gray-300 group/item">
                               <div className="w-5 h-5 rounded-full border border-gold-500/30 flex items-center justify-center bg-gold-500/10 group-hover/item:bg-gold-500/20 transition-colors">
                                  <CheckCircle size={10} className="text-gold-400" />
                               </div>
                               <span className="text-sm font-sans tracking-wide">{f}</span>
                           </div>
                        ))}
                     </div>
                     <div className="flex flex-wrap gap-6 items-center">
                        <button onClick={() => setIsOpen(true)} className="bg-black text-gold-400 border border-gold-500/50 px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">Order Now</button>
                        <button onClick={() => setIsOpen(true)} className="text-white text-xs font-bold uppercase tracking-widest border-b border-gold-500/50 pb-1 hover:text-gold-400 hover:border-gold-400 transition-colors">Learn More</button>
                     </div>
                </div>
                <div className="relative bg-[#0c0c0c] flex items-center justify-center p-10 min-h-[400px] overflow-hidden order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-white/5">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px]"></div>
                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                     <div className="relative w-full max-w-md transform lg:rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                        <div className="bg-[#050505] rounded-xl border border-white/10 shadow-2xl overflow-hidden relative z-10 aspect-[4/3]">
                            <div className="h-6 bg-[#1a1a1a] flex items-center gap-1.5 px-3 border-b border-white/5"><div className="w-2 h-2 rounded-full bg-red-500/50"></div><div className="w-2 h-2 rounded-full bg-yellow-500/50"></div><div className="w-2 h-2 rounded-full bg-green-500/50"></div></div>
                            <div className="relative h-full bg-[#111]">
                                <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-80" alt="Website Preview" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6"><div className="text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-1">Luxury Design</div><h4 className="text-white font-serif text-xl">Lowveld Luxury</h4></div>
                            </div>
                        </div>
                        <div className="absolute -inset-1 rounded-[14px] border border-gold-500/30 z-0"></div>
                     </div>
                </div>
            </div>
            {isOpen && (
               <div className="absolute inset-0 z-50 bg-[#080808] flex flex-col animate-fade-in">
                   <div className="p-8 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#080808] z-20">
                      <h3 className="text-2xl font-serif text-white">Start Your Project</h3>
                      <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
                   </div>
                   <div className="p-8 lg:p-14 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div><label className="block text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">Business Name</label><input type="text" placeholder="e.g. Lowveld Logistics" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:border-gold-500 outline-none transition-colors" /></div>
                            <div><label className="block text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">Email Address</label><input type="email" placeholder="you@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:border-gold-500 outline-none transition-colors" /></div>
                            <div><label className="block text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">Phone Number</label><input type="tel" placeholder="082 000 0000" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:border-gold-500 outline-none transition-colors" /></div>
                            <div><label className="block text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">Website Type</label><select className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 outline-none transition-colors appearance-none"><option className="bg-black">Business Service</option><option className="bg-black">Online Store (E-commerce)</option><option className="bg-black">Portfolio / Creative</option><option className="bg-black">Restaurant / Booking</option></select></div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8"><div className="flex justify-between items-center"><div><div className="text-white font-bold mb-1">Optional Management</div><div className="text-xs text-gray-400">Monthly updates & security checks</div></div><div onClick={() => setManagement(!management)} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${management ? 'bg-gold-500' : 'bg-white/20'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${management ? 'translate-x-6' : 'translate-x-0'}`}></div></div></div></div>
                        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10"><div className="mb-4 md:mb-0"><div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total Due Today</div><div className="text-4xl font-serif text-white">R 1999<span className="text-lg text-gray-500">.00</span></div>{management && <div className="text-gold-400 text-xs mt-1">+ R99/pm Management</div>}</div><button className="bg-gold-500 text-black px-10 py-4 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors shadow-lg shadow-gold-500/20">Submit & Pay</button></div>
                   </div>
               </div>
            )}
        </div>
      </div>
    </section>
  );
};

// --- LOWVELD STORIES CAROUSEL (HOME SECTION) ---

export const LowveldStoriesSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const story = stories[index];

  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/5 overflow-hidden">
       <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

       <div className="container mx-auto px-4 relative z-10">
         <SectionTitle title="The Lowveld Journal" subtitle="Editorial Features" />
         <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative min-h-[420px] md:min-h-[380px] flex flex-col md:flex-row max-w-6xl mx-auto group">
           <div className="w-full md:w-1/2 relative min-h-[320px] md:min-h-full overflow-hidden">
              <div key={story.id} className="absolute inset-0 animate-fade-in">
             <img src={story.image} alt={story.businessName} className="w-full h-full object-cover transition-transform duration-[6s] ease-linear scale-100 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-6 left-6 bg-black/60 text-gold-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">{story.category || 'Feature'}</div>
              </div>
             </div>
            <button onClick={() => setIndex((index - 1 + stories.length) % stories.length)} className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:bg-white/5">
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button onClick={() => setIndex((index + 1) % stories.length)} className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:bg-white/5">
              <ChevronRight size={20} className="text-white" />
            </button>
             <div className="w-full md:w-1/2 relative bg-[#0a0a0a]/90 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center border-l border-white/5">
                <div key={story.id} className="animate-slide-up">
                    <div className="mb-4">
                      <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-tight tracking-tight">{story.title || story.businessName}</h3>
                      <div className="w-12 h-1 bg-gold-500 mb-6"></div>
                      <p className="text-lg text-gray-300 leading-relaxed mb-6">{story.excerpt || story.headline || story.description}</p>
                      <button onClick={() => window.location.href = `/story/${story.id}`} className="bg-gold-500 text-black transition-colors px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-2 w-fit shadow-lg">Read Feature</button>
                    </div>
                </div>
                <div className="absolute bottom-8 right-8 flex gap-2">
                    {stories.map((_, i) => (<div key={i} onClick={() => setIndex(i)} className={`h-1 cursor-pointer transition-all duration-300 rounded-full ${i === index ? 'w-8 bg-gold-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}></div>))}
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

// --- BE FEATURED SECTION ---

export const BeFeaturedSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isAiWorking, setIsAiWorking] = useState(false);
  const [formData, setFormData] = useState({ businessName: '', category: 'Business', area: 'Mbombela (Nelspruit)', story: '', usp: '', contact: '' });
  const handleAiAssist = async () => { if (!formData.story) return; setIsAiWorking(true); const refined = await enhanceStoryContent(formData.story); setFormData(prev => ({ ...prev, story: refined })); setIsAiWorking(false); };
  return (
    <section className="py-16 bg-[#0a0a0a] border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="glass-panel p-8 rounded-2xl border border-gold-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-12 -mt-12 transition-all group-hover:bg-gold-500/10"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-3">Join the Collection</div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Your Story Deserves the Spotlight</h2>
              <p className="text-gray-400 text-lg mb-6 max-w-xl">From local hustlers to iconic brands — we tell the stories that build reputations, attract customers, and create trust.</p>
              <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wide text-gray-500"><span className="flex items-center gap-2"><Layout size={14} className="text-gold-500" /> Featured on Homepage</span><span className="flex items-center gap-2"><Share2 size={14} className="text-gold-500" /> Shared on Social Media</span><span className="flex items-center gap-2"><Globe size={14} className="text-gold-500" /> Seen by Local Customers</span></div>
            </div>
            <button onClick={() => setIsOpen(true)} className="bg-gold-500 hover:bg-gold-400 text-black px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(227,185,44,0.3)] hover:shadow-[0_0_30px_rgba(227,185,44,0.5)] transition-all transform hover:-translate-y-1 flex items-center gap-2 whitespace-nowrap"><Edit3 size={16} /> Apply to Be Featured</button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#121212] sticky top-0 z-10"><h3 className="text-xl font-serif text-white">Application to Feature</h3><button onClick={() => { setIsOpen(false); setStep(1); }} className="text-gray-500 hover:text-white p-2"><X size={20} /></button></div>
            <div className="p-8">{step === 1 && (
              <div className="space-y-6 animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">Business / Brand Name</label>
                    <input type="text" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-gold-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-gold-500 transition-colors">
                      {Object.values(Category).map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                </div>
                <div className="pt-4"><button onClick={() => setStep(2)} className="w-full bg-gold-500 text-black py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">Submit Application</button></div>
              </div>
            )}</div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- FEATURED PRODUCTS SECTION ---

export const FeaturedProductsSection = ({ onBrowse, favorites = [], onToggleFavorite }: { onBrowse?: () => void, favorites?: string[], onToggleFavorite?: (id: string) => void }) => {
  const products: Product[] = [
    { 
      id: 'p1', 
      title: 'Bespoke Leather Weekender',
      badge: 'ARTISAN',
      brand: 'Crafted by Artisan Studio',
      statement: 'Handcrafted precision for refined living.',
      price: 'From R4,500',
      images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200'], 
      sellerName: 'Artisan Studio', 
      rating: 4.9 
    },
    { 
      id: 'p2', 
      title: 'Limited Edition Chronograph',
      badge: 'LIMITED',
      brand: 'Timepieces Co',
      statement: 'Designed for collectors who value excellence.',
      price: 'Only 5 Available',
      images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200'], 
      sellerName: 'Timepieces Co', 
      rating: 4.8 
    },
    { 
      id: 'p3', 
      title: 'Artisan Coffee Ritual',
      badge: 'CURATED',
      brand: 'Hazy Roastery',
      statement: 'Small-batch craftsmanship with global appeal.',
      price: 'From R1,200',
      images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?auto=format&fit=crop&q=80&w=1200'], 
      sellerName: 'Hazy Roastery', 
      rating: 4.7 
    },
    { 
      id: 'p4', 
      title: 'Luxury Skincare Collection',
      badge: 'CURATED',
      brand: 'Glow Lab Collective',
      statement: 'Elevated essentials for modern luxury.',
      price: 'From R2,800',
      images: ['https://images.unsplash.com/photo-1596462502278-af6db1c97314?auto=format&fit=crop&q=80&w=1200'], 
      sellerName: 'Glow Lab', 
      rating: 4.6 
    }
  ];

  return (
    <section className="py-20 bg-[#050505] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 tracking-tight">Marketplace</h2>
          <p className="text-base text-[#8F8F8F] font-light mb-3 tracking-wide">A refined collection of verified, premium, and limited offerings.</p>
          <div className="w-10 h-px bg-[#C9A24D] mx-auto mb-6"></div>
          
          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[#C9A24D] flex-shrink-0" />
              <span className="text-xs text-white uppercase tracking-widest font-semibold">Verified Sellers</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[#C9A24D] flex-shrink-0" />
              <span className="text-xs text-white uppercase tracking-widest font-semibold">Curated & Limited</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-[#C9A24D] flex-shrink-0" />
              <span className="text-xs text-white uppercase tracking-widest font-semibold">Local & Premium</span>
            </div>
          </div>
        </div>

        {/* 4-Card Grid (No Scroll) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((prod) => (
            <div 
              key={prod.id}
              onClick={() => onBrowse && onBrowse()}
              className="group cursor-pointer h-full flex flex-col"
            >
              {/* Card Container */}
              <div className="bg-[#0B0B0B] rounded-xl overflow-hidden border border-[rgba(201,162,77,0.12)] shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-350 hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 flex flex-col h-full">
                
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-50 h-44 md:h-48">
                  <img 
                    src={prod.images?.[0]} 
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Editorial gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-100"></div>
                  
                  {/* Gold Badge (Top Right) */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.06em] px-2.5 py-1 rounded-full border border-[#C9A24D]">
                      {prod.badge || 'CURATED'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  
                  {/* Product Name (Hero) */}
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 leading-tight">
                    {prod.title}
                  </h3>

                  {/* Brand / Maker (Gold Accent) */}
                  <p className="text-[11px] text-[#B8923A] font-semibold mb-2 uppercase tracking-wide">
                    {prod.brand || prod.sellerName}
                  </p>

                  {/* Value Statement */}
                  <p className="text-sm text-[#BFBFBF] font-light mb-4 line-clamp-2">
                    {prod.statement || `Curated by ${prod.sellerName}`}
                  </p>

                  {/* Price / Scarcity */}
                  {prod.price && (
                    <p className="text-sm text-[#C9A24D] font-semibold mb-4 uppercase tracking-wide">
                      {prod.price}
                    </p>
                  )}

                  {/* Elegant Text CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBrowse && onBrowse();
                    }}
                    className="text-white text-xs font-medium flex items-center gap-2 group/cta mt-auto hover:text-[#C9A24D] transition-colors duration-300"
                  >
                    <span>View Details</span>
                    <span className="text-[#C9A24D] transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section-Level CTA */}
        {onBrowse && (
          <div className="text-center">
            <button
              onClick={onBrowse}
              className="bg-transparent text-white px-12 py-4 rounded-full font-semibold uppercase tracking-widest text-sm border border-[#C9A24D] transition-all duration-300 hover:bg-[#0B0B0B] hover:text-[#C9A24D] mb-4"
            >
              Explore Curated Luxury
            </button>
            <p className="text-xs text-[#8F8F8F] uppercase tracking-widest font-medium">
              Verified sellers. Limited releases. Trusted quality.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// --- CREATOR BUSINESS SPOTLIGHT ---

export const CreatorBusinessSpotlight = () => {
    return (
        <section className="py-20 bg-[#080808] border-t border-white/5">
            <div className="container mx-auto px-4">
                 <SectionTitle title="Creator Studio" subtitle="Collaborate & Grow" />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <div className="bg-gradient-to-br from-gold-500/10 to-transparent p-6 rounded-2xl border border-gold-500/20"><h3 className="text-xl text-white font-serif mb-2">For Businesses</h3><p className="text-gray-400 text-sm mb-4">Connect with top local creators to amplify your brand story.</p><button className="text-gold-400 font-bold uppercase text-xs tracking-wider flex items-center gap-2">Post a Brief <ChevronRight size={14} /></button></div>
                     <div className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 rounded-2xl border border-white/10"><h3 className="text-xl text-white font-serif mb-2">For Creators</h3><p className="text-gray-400 text-sm mb-4">Find paid campaigns and showcase your portfolio.</p><button className="text-white font-bold uppercase text-xs tracking-wider flex items-center gap-2">Join Network <ChevronRight size={14} /></button></div>
                 </div>
            </div>
        </section>
    );
};

// --- LIFESTYLE COMMUNITY SECTION ---

export const LifestyleCommunitySection = () => {
    return (
        <section className="py-20 bg-[#050505] border-t border-white/5">
             <div className="container mx-auto px-4">
                <SectionTitle title="Community" subtitle="Find Your Tribe" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{communityGroups.slice(0,3).map(group => (<div key={group.id} className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-4"><img src={group.image} alt={group.name} className="w-16 h-16 rounded-full object-cover" /><div><h4 className="text-white font-bold">{group.name}</h4><p className="text-gold-500 text-xs font-bold">{group.members} Members</p></div></div>))}</div>
             </div>
        </section>
    );
};
