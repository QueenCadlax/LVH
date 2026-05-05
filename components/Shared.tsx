
import React, { useState, useEffect } from 'react';
import { Star, MapPin, CheckCircle, Heart, Share2, Phone, Mail, Search, Sparkles, Filter, ChevronDown, Check, X, User, Lock, ArrowRight, Briefcase, Camera, Crown, MessageCircle, DollarSign, Award, Layers, RefreshCw, Linkedin, Facebook, Instagram, Twitter, ShieldCheck, Gem, Clock, Play, Eye } from 'lucide-react';
import { MPUMALANGA_AREAS, PRICE_FILTERS, RATING_FILTERS, LISTING_TIER_FILTERS, SERVICE_TYPE_FILTERS, ListingTier } from '../types';

export const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 text-center relative z-10 group">
    <h2 className="text-3xl md:text-5xl font-serif text-white mb-3 tracking-wide drop-shadow-lg transform transition-transform duration-500 group-hover:scale-105">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-300% animate-shimmer">
        {title}
      </span>
    </h2>
    {subtitle && <p className="text-gray-400 font-sans tracking-[0.2em] uppercase text-xs md:text-sm animate-fade-in">{subtitle}</p>}
    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6 shadow-[0_0_15px_rgba(227,185,44,0.5)]"></div>
  </div>
);

export const LuxuryCard: React.FC<{ 
  image: string; 
  title: string; 
  logo?: string;
  subtitle?: string; 
  rating?: number; 
  reviewCount?: number;
  price?: string; 
  location?: string; 
  badge?: string; 
  id?: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onPress?: () => void;
  phone?: string;
  email?: string;
  tiktokUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  category?: string;
  subcategory?: string;
  verified?: boolean;
  isElite?: boolean;
  isPlatinum?: boolean;
  isTopRated?: boolean;
  isFeatured?: boolean;
  compact?: boolean;
  isVerifiedSeller?: boolean;
  isLocalVendor?: boolean;
  areaDominationArea?: string;
  areaDominationTier?: 'Gold' | 'Platinum';
  trustBadges?: string[];
  hasVideo?: boolean;
  viewCount?: number;
  tier?: 'Trial' | 'Premium' | 'Elite' | 'Platinum';
  distance?: number;
}> = ({ 
  image, 
  logo,
  title, 
  subtitle, 
  rating, 
  reviewCount,
  price, 
  location, 
  badge,
  id,
  isFavorite,
  onToggleFavorite,
  onPress,
  phone,
  email,
  tiktokUrl,
  linkedinUrl,
  facebookUrl,
  instagramUrl,
  twitterUrl,
  category,
  subcategory,
  verified,
  isElite,
  isPlatinum,
  isTopRated,
  isFeatured,
  compact,
  isVerifiedSeller,
  isLocalVendor,
  areaDominationArea,
  areaDominationTier,
  trustBadges,
  hasVideo,
  viewCount,
  tier,
  distance,
}) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?id=${id || 'listing'}`;
    const shareData = { title: title, text: subtitle || `Discover ${title} on LowveldHub`, url: shareUrl };
    if (navigator.share) navigator.share(shareData).catch(() => copyToClipboard(shareUrl));
    else copyToClipboard(shareUrl);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert('Link copied to clipboard!')).catch(err => console.error(err));
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const formatWhatsApp = (num?: string) => {
    if (!num) return '';
    let cleaned = num.replace(/\D/g, '');
    if (cleaned.startsWith('0') && cleaned.length === 10) {
      cleaned = '27' + cleaned.substring(1);
    }
    return cleaned;
  };

  // Helper to determine if business is currently open (mock implementation)
  const getBusinessStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    
    // Mock logic: Consider open 8 AM - 10 PM
    // In production, this would use actual business hours
    const isOpen = hour >= 8 && hour < 22;
    return isOpen;
  };

  const isOpen = getBusinessStatus();

  const whatsappUrl = phone 
    ? `https://wa.me/${formatWhatsApp(phone)}?text=${encodeURIComponent(`Hi, I'm interested in "${title}" on LowveldHub.`)}`
    : '#';

  return (
    <div className="group relative h-full cursor-pointer" onClick={onPress}>
      {/* Apple/Airbnb Minimalist Card - Clean, Spacious, Elegant */}
      <div className="relative h-full bg-white rounded-2xl overflow-hidden border border-gray-200/80 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col z-10">
        
        {/* APPLE/AIRBNB MINIMAL IMAGE SECTION - Clean, Spacious */}
        <div className="h-48 relative overflow-hidden flex-shrink-0 bg-gray-100">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>
          )}
          <img 
            loading="lazy" 
            src={image || 'https://images.unsplash.com/photo-1531297461136-82eb8a638e51?auto=format&fit=crop&q=80&w=800'} 
            alt={title} 
            onLoad={() => setImgLoaded(true)} 
            className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.05] ${imgLoaded ? 'opacity-100 blur-0' : 'opacity-50 blur-sm'}`} 
          />
          
          {/* Top Right Corner Actions - Minimal */}
          <div className="absolute top-4 right-4 flex gap-2 z-30">
            <button 
              onClick={(e) => { e.stopPropagation(); if (onToggleFavorite && id) onToggleFavorite(id); }} 
              className={`p-2.5 rounded-full transition-all duration-300 backdrop-blur-md ${isFavorite ? 'bg-black text-red-500 shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-white'}`} 
              title="Save"
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleShare} 
              className="p-2.5 rounded-full bg-white/80 text-gray-700 hover:bg-white transition-all duration-300 backdrop-blur-md" 
              title="Share"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Top Left Badges - Minimal */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-30">
            {isPlatinum && (
              <span className="bg-black text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                ⭐ Platinum
              </span>
            )}
            {isElite && !isPlatinum && (
              <span className="bg-black text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                ✨ Elite
              </span>
            )}
            {isTopRated && !isElite && !isPlatinum && (
              <span className="bg-black text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                ⭐ Top Rated
              </span>
            )}
          </div>

          {/* Price Badge - Minimal Bottom Right */}
          {price && (
            <div className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full font-semibold text-sm z-30">
              {price}
            </div>
          )}
        </div>

        {/* APPLE/AIRBNB MINIMAL CONTENT SECTION - Clean, Spacious, Readable */}
        <div className="p-4 flex flex-col flex-grow overflow-hidden">
          {/* Title - Clean and Bold */}
          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>

          {/* Subtitle - Minimal */}
          {subtitle && (
            <p className="text-sm text-gray-500 line-clamp-1 mb-3">
              {subtitle}
            </p>
          )}

          {/* Location - Simple and Clear */}
          <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-3">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span className="truncate">{location || 'Mpumalanga'}</span>
          </div>

          {/* Rating Section - Clean */}
          {rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={14} 
                    fill={i < Math.round(rating) ? 'currentColor' : 'none'} 
                    className="text-gray-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{rating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({reviewCount || 0})</span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* CTA Button - Minimal and Clean */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsContactOpen(true); }}
            className="w-full py-3 rounded-lg bg-gray-900 text-white font-semibold text-sm transition-all duration-300 hover:bg-gray-800 active:scale-[0.98] mb-2"
          >
            {category === 'EatsAndBeverages' || category === 'EATS & BEVERAGES' 
              ? 'Book Table' 
              : category === 'RealEstate' || category === 'REAL ESTATE' 
              ? 'View Property'
              : 'Contact'}
          </button>

          {/* Quick Actions - Minimal Bottom Row */}
          <div className="flex gap-3">
            {phone && (
              <a 
                href={`tel:${phone}`} 
                onClick={stopPropagation} 
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm transition-all hover:border-gray-300 hover:bg-gray-50 text-center"
                title="Call"
              >
                <Phone size={16} className="inline mr-1.5" />
                Call
              </a>
            )}
            {phone && (
              <a 
                href={whatsappUrl} 
                target="_blank" 
                onClick={stopPropagation} 
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm transition-all hover:border-gray-300 hover:bg-gray-50 text-center"
                title="Message"
              >
                <MessageCircle size={16} className="inline mr-1.5" />
                Message
              </a>
            )}
          </div>
        </div>
      </div>

      {/* APPLE/AIRBNB MINIMAL CONTACT MODAL */}
      {isContactOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" 
          onClick={(e) => { e.stopPropagation(); setIsContactOpen(false); }}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsContactOpen(false)} 
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>

            {/* Title */}
            <div className="mb-6 pr-8">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-2">Contact</p>
              <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            </div>

            {/* Contact Options */}
            <div className="space-y-3">
              {phone && (
                <a 
                  href={`tel:${phone}`} 
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-100">
                    <Phone size={18} className="text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.08em] font-medium">Call</p>
                    <p className="text-sm font-semibold text-gray-900">{phone}</p>
                  </div>
                </a>
              )}
              
              {phone && (
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-green-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-green-100">
                    <MessageCircle size={18} className="text-gray-600 group-hover:text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.08em] font-medium">Message</p>
                    <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                  </div>
                </a>
              )}

              {email && (
                <a 
                  href={`mailto:${email}`} 
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:bg-purple-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-purple-100">
                    <Mail size={18} className="text-gray-600 group-hover:text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.08em] font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{email}</p>
                  </div>
                </a>
              )}

              {/* Social Links */}
              {(facebookUrl || instagramUrl || linkedinUrl) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em] mb-3">Follow</p>
                  <div className="flex gap-2">
                    {facebookUrl && (
                      <a 
                        href={facebookUrl} 
                        target="_blank" 
                        className="flex-1 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center"
                        title="Facebook"
                      >
                        <Facebook size={18} className="text-gray-600" />
                      </a>
                    )}
                    {instagramUrl && (
                      <a 
                        href={instagramUrl} 
                        target="_blank" 
                        className="flex-1 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center"
                        title="Instagram"
                      >
                        <Instagram size={18} className="text-gray-600" />
                      </a>
                    )}
                    {linkedinUrl && (
                      <a 
                        href={linkedinUrl} 
                        target="_blank" 
                        className="flex-1 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center"
                        title="LinkedIn"
                      >
                        <Linkedin size={18} className="text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-400 font-medium">Verified on LowveldHub</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Memoize LuxuryCard to prevent unnecessary re-renders
export const MemoLuxuryCard = React.memo(LuxuryCard);

export const CategoryCard: React.FC<{
  Icon: any;
  label: string;
  description?: string;
  count?: number;
  onClick?: () => void;
}> = ({ Icon, label, description, count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative text-left p-8 rounded-[1.5rem] bg-[#0a0a0a] border border-white/6 hover:border-gold-400 transition-all duration-700 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transform hover:-translate-y-3"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="relative z-20 flex items-start gap-4">
        <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-b from-black/60 to-black/30 border border-white/6 shadow-md overflow-hidden">
          <Icon size={32} className="text-gold-300" />
        </div>

        <div className="flex-1">
          <div>
            <div className="text-lg font-semibold text-white leading-tight">{label}</div>
            {description && <div className="text-sm text-gray-400 mt-1">{description}</div>}
          </div>
        </div>
      </div>
    </button>
  );
};

export const PrimaryButton = ({ children, onClick, className = '' }: { children?: React.ReactNode, onClick?: () => void, className?: string }) => (
  <button onClick={onClick} className={`relative overflow-hidden bg-gradient-to-r from-gold-600 to-gold-400 text-black font-black py-4 px-10 rounded-xl shadow-[0_0_25px_rgba(227,185,44,0.35)] hover:shadow-[0_0_40px_rgba(227,185,44,0.6)] transform hover:-translate-y-1 transition-all duration-300 group ${className}`}><div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12"></div><span className="relative z-10 uppercase tracking-[0.2em] text-xs flex items-center gap-3 justify-center">{children}</span></button>
);

export const MarketButton = ({ children, onClick, className = '', size = 'md' }: { children?: React.ReactNode, onClick?: (e?: React.MouseEvent) => void, className?: string, size?: 'sm'|'md'|'lg' }) => {
  const sizes: Record<string,string> = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-sm',
    lg: 'py-4 px-6 text-base'
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-250 transform ${sizes[size]} ${className} bg-black text-[#ffd700] border border-[#d4af37]/20 hover:bg-[#ffd700] hover:text-black hover:border-[#ffd700] shadow-[0_6px_18px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_28px_rgba(212,175,55,0.12)]`}
    >
      {children}
    </button>
  );
};

export const HeroFilterHeader = ({ title, subtitle, placeholder, image }: { title: string; subtitle: string; placeholder?: string; image: string; }) => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="relative h-[60vh] min-h-[450px] flex items-center justify-center mb-20 overflow-hidden rounded-b-[4rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
      <div className="absolute inset-0 overflow-hidden"><img src={image} alt={title} className="w-full h-full object-cover transform scale-105 transition-transform duration-[20s] ease-linear hover:scale-110 will-change-transform" style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.1)` }} /><div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#050505] backdrop-blur-[2px]"></div><div className="absolute top-0 right-10 z-20"><div className="bg-gold-500 w-14 h-24 shadow-2xl flex flex-col items-center justify-end pb-3 rounded-b-xl"><Star size={18} className="text-black fill-current animate-pulse-slow" /></div></div></div>
      <div className="relative z-10 container mx-auto px-4 text-center"><div className="animate-slide-up"><h1 className="text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl tracking-tighter uppercase"><span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gold-200 to-white bg-300% animate-shimmer">{title}</span></h1><p className="text-gold-400 text-sm md:text-xl uppercase tracking-[0.4em] mb-12 font-black text-glow">{subtitle}</p></div>
        {placeholder && (<div className="max-w-3xl mx-auto relative group animate-fade-in delay-200"><div className="absolute inset-0 bg-gold-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div><div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full px-8 py-5 shadow-2xl focus-within:bg-black/95 focus-within:border-gold-500 transition-all duration-300 transform group-hover:scale-[1.01]"><div className="text-gold-400 mr-5"><Search size={26} /></div><input type="text" placeholder={placeholder} className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 font-sans text-xl" /><button className="hidden md:block text-[10px] font-black tracking-widest bg-gold-500 text-black px-8 py-3 rounded-full hover:bg-white transition-all shadow-lg uppercase">Intelligent Search</button></div></div>)}
      </div>
    </div>
  );
};

export const SponsoredBanner = ({ pageType }: { pageType: 'restaurant' | 'car' | 'estate' | 'general' }) => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return null;
    let content = { title: "Exclusive Offer", desc: "Get 20% off your first month.", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400" };
    if (pageType === 'restaurant') content = { title: "Summer Menu Tasting", desc: "Book at Blue Moon Bistro today.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" };
    else if (pageType === 'car') content = { title: "Westvaal Clearance", desc: "Low interest rates on all AMGs.", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400" };
    else if (pageType === 'estate') content = { title: "Shandon Estate Phase 2", desc: "Plots selling from R1.2M.", img: "https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&q=80&w=800" };
    return (
        <div className="container mx-auto px-4 -mt-10 relative z-20 mb-16">
            <div className="bg-white/5 backdrop-blur-2xl border border-gold-500/40 rounded-xl p-5 flex items-center justify-between shadow-2xl animate-fade-in group"><div className="flex items-center gap-6"><div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10"><img src={content.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Ad" /></div><div><span className="text-[10px] text-gold-500 uppercase tracking-[0.3em] font-black mb-1 block">Elite Partner Spotlight</span><h4 className="text-white font-serif text-2xl leading-none mb-1 uppercase tracking-tight">{content.title}</h4><p className="text-gray-400 text-sm font-medium tracking-wide">{content.desc}</p></div></div><button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-white p-3 hover:bg-white/5 rounded-full transition-all"><span><X size={20}/></span></button></div>
        </div>
    );
};

export interface FilterState { search: string; areas: string[]; categories: string[]; subcategories: string[]; minRating: number; prices: string[]; listingTiers: string[]; serviceTypes: string[]; verifiedOnly?: boolean; onlyOpenNow?: boolean }

export const AdvancedFilterPanel = ({ type = 'marketplace', onFilter }: { type?: 'marketplace' | 'directory' | 'creator'; onFilter: (state: FilterState) => void; }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [areaSearch, setAreaSearch] = useState(''); 
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [onlyOpenNow, setOnlyOpenNow] = useState<boolean>(false);

  const handleToggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const applyFilters = () => { 
    onFilter({ search, areas: selectedAreas, categories: [], subcategories: [], minRating: selectedRating, prices: selectedPrices, listingTiers: selectedTiers, serviceTypes: selectedServices, verifiedOnly, onlyOpenNow }); 
    setIsOpen(false); 
  };

  const resetFilters = () => { 
    setSearch(''); setAreaSearch(''); setSelectedAreas([]); setSelectedPrices([]); setSelectedRating(0); setSelectedTiers([]); setSelectedServices([]);
    onFilter({ search: '', areas: [], categories: [], subcategories: [], minRating: 0, prices: [], listingTiers: [], serviceTypes: [] }); 
  };

  const filteredAreas = MPUMALANGA_AREAS.filter(area => 
    area.toLowerCase().includes(areaSearch.toLowerCase())
  );

  const filterBtnBase = "transition-all duration-500 border font-black uppercase tracking-[0.2em] text-[10px] px-5 py-3 rounded-xl whitespace-nowrap shadow-sm";
  const getFilterBtnClass = (isActive: boolean) => {
    return `${filterBtnBase} ${isActive 
      ? 'bg-gold-500/20 border-gold-500 text-gold-400 shadow-[0_0_15px_rgba(227,185,44,0.3)] animate-pulse-gold' 
      : 'bg-white/[0.03] border-white/10 text-gray-500 hover:border-gold-500/40 hover:text-white'}`;
  };

  return (
    <div className="relative z-30 mb-10">
      <div className="flex flex-col md:flex-row gap-5 items-stretch">
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 shadow-2xl focus-within:border-gold-500 transition-all duration-500">
            <Search size={24} className="text-gold-500 mr-4" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && applyFilters()} placeholder="Deep search regional entities..." className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 text-base font-sans" />
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className={`px-10 py-4 rounded-full border flex items-center justify-center gap-3 transition-all duration-500 font-black text-xs uppercase tracking-[0.3em] ${isOpen ? 'bg-gold-500 text-black border-gold-500 shadow-[0_0_20px_rgba(227,185,44,0.4)]' : 'bg-black/60 text-white border-white/10 hover:border-gold-500/60 shadow-lg'}`}>
          <Filter size={18} /> {isOpen ? 'Hide Filters' : 'Refine Results'}
        </button>
      </div>

      <div className={`absolute top-full left-0 right-0 mt-6 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'max-h-[1200px] opacity-100 py-12 z-50' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-10 md:px-16 space-y-12 custom-scrollbar overflow-y-auto max-h-[75vh]">
          {/* Service Types */}
          <div>
            <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-7 flex items-center gap-3 opacity-90"><Layers size={16} /> Filter by Service</h4>
            <div className="flex flex-wrap gap-3">
              {SERVICE_TYPE_FILTERS.map(service => (
                <button key={service} onClick={() => handleToggle(selectedServices, setSelectedServices, service)} className={getFilterBtnClass(selectedServices.includes(service))}>{service}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Area Filter with Search */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-7">
                <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 opacity-90"><MapPin size={16} /> Regional Hubs</h4>
                <div className="relative max-w-[280px] w-full">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input 
                    type="text" 
                    value={areaSearch} 
                    onChange={(e) => setAreaSearch(e.target.value)} 
                    placeholder="Search regional hubs..." 
                    className="w-full bg-white/5 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-xs text-white focus:border-gold-500/60 outline-none transition-all placeholder:text-gray-600 font-sans" 
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 h-56 overflow-y-auto pr-6 custom-scrollbar scroll-gold">
                {filteredAreas.map(area => (
                  <button key={area} onClick={() => handleToggle(selectedAreas, setSelectedAreas, area)} className={getFilterBtnClass(selectedAreas.includes(area))}>{area}</button>
                ))}
                {filteredAreas.length === 0 && <div className="text-gray-600 text-xs py-4 uppercase tracking-widest font-black">No sectors found.</div>}
              </div>
            </div>

            {/* Price & Listing Type */}
            <div className="space-y-10">
              <div>
                <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-7 flex items-center gap-3 opacity-90"><DollarSign size={16} /> Price Tier</h4>
                <div className="flex flex-wrap gap-3">
                  {PRICE_FILTERS.map(price => (
                    <button key={price} onClick={() => handleToggle(selectedPrices, setSelectedPrices, price)} className={getFilterBtnClass(selectedPrices.includes(price))}>{price}</button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-7 flex items-center gap-3 opacity-90"><Crown size={16} /> Network Tier</h4>
                <div className="flex flex-wrap gap-3">
                  {LISTING_TIER_FILTERS.map(tier => (
                    <button key={tier} onClick={() => handleToggle(selectedTiers, setSelectedTiers, tier)} className={getFilterBtnClass(selectedTiers.includes(tier))}>{tier}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-7 flex items-center gap-3 opacity-90"><Star size={16} /> Guest Experience</h4>
              <div className="flex flex-col gap-3">
                {RATING_FILTERS.map(rating => (
                  <button key={rating.value} onClick={() => setSelectedRating(selectedRating === rating.value ? 0 : rating.value)} className={getFilterBtnClass(selectedRating === rating.value)}>
                    <div className="flex items-center gap-3">
                      <Star size={12} fill={selectedRating === rating.value ? "currentColor" : "none"} />
                      {rating.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Verified / Open Now quick toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-3 opacity-90"><ShieldCheck size={16} /> Verification</h4>
              <div className="flex gap-3">
                <button onClick={() => setVerifiedOnly(!verifiedOnly)} className={getFilterBtnClass(verifiedOnly)}>{verifiedOnly ? 'Verified Only' : 'Include All'}</button>
              </div>
            </div>
            <div>
              <h4 className="text-gold-400 text-[11px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-3 opacity-90"><Clock size={16} /> Open Now</h4>
              <div className="flex gap-3">
                <button onClick={() => setOnlyOpenNow(!onlyOpenNow)} className={getFilterBtnClass(onlyOpenNow)}>{onlyOpenNow ? 'Open Now' : 'Any Time'}</button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <button onClick={resetFilters} className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all flex items-center gap-3 group">
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" /> Purge Selection
            </button>
            <div className="flex items-center gap-5 w-full md:w-auto">
              <button onClick={() => setIsOpen(false)} className="px-10 py-4 text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all">Cancel</button>
              <button onClick={applyFilters} className="flex-1 md:flex-none bg-gold-500 hover:bg-white text-black px-14 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-gold-500/30 transition-all transform hover:-translate-y-1">Apply Parameters</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: { isOpen: boolean; onClose: () => void; initialMode?: 'login' | 'signup'; }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', area: 'Mbombela (Nelspruit)', type: 'User' as 'User' | 'Business' | 'Creator' });
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isOpen) { setMode(initialMode); setFormData(prev => ({ ...prev, email: '', password: '', name: '' })); } }, [isOpen, initialMode]);
  if (!isOpen) return null;
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await new Promise(resolve => setTimeout(resolve, 1500)); setLoading(false); onClose(); };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in"><div className="relative bg-[#121212] border border-white/10 rounded-[2.5rem] w-full max-w-md shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"><div className="relative p-10 pb-5 text-center border-b border-white/5"><button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white p-2.5 bg-white/5 rounded-full border border-white/10 transition-all hover:scale-110"><X size={24} /></button><h3 className="text-4xl font-serif text-white mb-3 uppercase tracking-tighter">{mode === 'login' ? 'The Hub Awaits' : 'Claim Your Space'}</h3><p className="text-[10px] text-gold-500 uppercase tracking-[0.4em] font-black">Secure Authentication</p></div><div className="p-10 pt-8 overflow-y-auto"><form onSubmit={handleSubmit} className="space-y-6"><div><label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Email Address</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.03] border border-white/15 rounded-xl p-4 text-white focus:border-gold-500 outline-none transition-all font-sans" /></div><div><label className="block text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Password Credentials</label><input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-white/[0.03] border border-white/15 rounded-xl p-4 text-white focus:border-gold-500 outline-none transition-all font-sans" /></div><button type="submit" disabled={loading} className="w-full bg-gold-500 hover:bg-gold-400 text-black font-black py-5 rounded-xl uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-gold-500/40 transition-all mt-8 flex items-center justify-center gap-3">{loading ? 'Validating Hub Access...' : (mode === 'login' ? 'Enter Sanctuary' : 'Initialize Profile')}<ArrowRight size={18} /></button></form><div className="mt-10 text-center border-t border-white/5 pt-8"><button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-gold-400 font-black hover:text-white transition-all uppercase text-[10px] tracking-[0.4em]">{mode === 'login' ? 'Create New Member Identity' : 'Existing Member Access'}</button></div></div></div></div>
  );
};

export const AreaDominationBadge = ({ area, tier }: { area: string; tier: 'Gold' | 'Platinum' }) => {
  const isGold = tier === 'Gold';
  const isPlatinum = tier === 'Platinum';
  
  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] border transition-all ${
      isPlatinum 
        ? 'bg-gradient-to-r from-purple-600/30 to-purple-500/20 border-purple-400/60 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
        : 'bg-gradient-to-r from-amber-600/30 to-amber-500/20 border-amber-400/60 text-amber-200 shadow-[0_0_20px_rgba(217,119,6,0.3)]'
    }`}>
      <MapPin size={14} className="flex-shrink-0" />
      <span className="whitespace-nowrap">
        {isPlatinum ? '👑' : '🏆'} Dominating {area}
      </span>
    </div>
  );
};

export const TrustBadgeDisplay = ({ badge }: { badge: string }) => {
  const badgeConfig: Record<string, { label: string; color: string; icon: string }> = {
    'TOP_SELLER': { label: 'Top Seller', color: 'from-purple-600 to-purple-500', icon: '⭐' },
    'VERIFIED': { label: 'Verified', color: 'from-green-600 to-green-500', icon: '✓' },
    'RISING_STAR': { label: 'Rising Star', color: 'from-yellow-600 to-yellow-500', icon: '🌟' },
    'CUSTOMER_CHOICE': { label: 'Customer Choice', color: 'from-red-600 to-red-500', icon: '❤️' },
    'CERTIFIED': { label: 'Certified', color: 'from-blue-600 to-blue-500', icon: '🔒' },
    'RESPONSIVE_TEAM': { label: 'Responsive Team', color: 'from-emerald-600 to-emerald-500', icon: '⚡' }
  };

  const config = badgeConfig[badge] || { label: badge, color: 'from-gray-600 to-gray-500', icon: '✓' };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.color} text-white text-[8px] font-black uppercase tracking-wider shadow-lg`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

export const VerificationIndicator = ({ type, isVerified, badge }: { type: string; isVerified: boolean; badge?: string }) => {
  const typeConfig: Record<string, { label: string; icon: string; color: string }> = {
    'ISO': { label: 'ISO Certified', icon: '📋', color: 'text-blue-400' },
    'BGC': { label: 'BGC Checked', icon: '🛡️', color: 'text-green-400' },
    'INSURANCE': { label: 'Insured', icon: '🏛️', color: 'text-purple-400' },
    'RESPONSE_TIME': { label: 'Fast Response', icon: '⚡', color: 'text-yellow-400' },
    'PAYMENT_SECURE': { label: 'Secure Payment', icon: '🔐', color: 'text-green-400' }
  };

  const config = typeConfig[type] || { label: type, icon: '✓', color: 'text-gray-400' };

  if (!isVerified) return null;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 ${config.color}`}>
      <span className="text-sm">{config.icon}</span>
      <span className="text-[8px] font-black uppercase tracking-wider">{badge || config.label}</span>
    </div>
  );
};

export const SellerScoreBreakdown = ({ score }: { score: any }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">Quality</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400" style={{ width: `${(score.quality / 5) * 100}%` }} />
          </div>
          <span className="text-sm font-bold text-gold-400">{score.quality.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">Reliability</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: `${score.reliability}%` }} />
          </div>
          <span className="text-sm font-bold text-green-400">{score.reliability}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">Communication</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${score.communication}%` }} />
          </div>
          <span className="text-sm font-bold text-blue-400">{score.communication}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-300">Security</span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400" style={{ width: `${score.security}%` }} />
          </div>
          <span className="text-sm font-bold text-purple-400">{score.security}%</span>
        </div>
      </div>
    </div>
  );
};

export const TrustStackPanel = ({ trustStack }: { trustStack: any }) => {
  if (!trustStack) return null;

  return (
    <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-gold-400 text-sm font-black uppercase tracking-widest mb-4">Trust Badges</h3>
        <div className="flex flex-wrap gap-2">
          {trustStack.badges?.map((badge: string) => (
            <TrustBadgeDisplay badge={badge} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gold-400 text-sm font-black uppercase tracking-widest mb-4">Verification Status</h3>
        <div className="flex flex-wrap gap-2">
          {trustStack.indicators?.map((indicator: any, idx: number) => (
            <VerificationIndicator 
              type={indicator.type} 
              isVerified={indicator.isVerified} 
              badge={indicator.badge} 
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gold-400 text-sm font-black uppercase tracking-widest mb-4">Performance Metrics</h3>
        <SellerScoreBreakdown score={trustStack.sellerScore} />
        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
          <span className="text-sm text-gray-400">{trustStack.sellerScore.verifiedPurchaseReviews} Verified Reviews</span>
          <span className="text-sm text-gray-400">{trustStack.sellerScore.completedTransactions} Transactions</span>
        </div>
      </div>
    </div>
  );
};


