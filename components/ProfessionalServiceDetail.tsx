import React, { useState, useEffect } from 'react';
import { Business, ListingTier } from '../types';
import {
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  MapPin,
  Star,
  Heart,
  Share2,
  Check,
  Clock,
  Award,
  Users,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProfessionalServiceDetailProps {
  service: Business | null;
  navigate: (view: string, cat?: string, id?: string) => void;
  favorites?: string[];
  toggleFavorite?: (id: string) => void;
}

const ProfessionalServiceDetail: React.FC<ProfessionalServiceDetailProps> = ({
  service,
  navigate,
  favorites = [],
  toggleFavorite,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'reviews'>('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service?.id]);

  useEffect(() => {
    if (service?.id) {
      setIsFavorited(favorites.includes(service.id));
    }
  }, [service?.id, favorites]);

  if (!service) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-black">
        <div className="container mx-auto px-6">
          <button
            onClick={() => navigate('services')}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
          >
            <ArrowLeft size={20} /> Back to Services
          </button>
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Service provider not found</p>
          </div>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (toggleFavorite && service.id) {
      toggleFavorite(service.id);
      setIsFavorited(!isFavorited);
    }
  };

  const nextGallery = () => {
    setGalleryIdx((prev) => (prev + 1) % 3);
  };

  const prevGallery = () => {
    setGalleryIdx((prev) => (prev - 1 + 3) % 3);
  };

  const galleries = [service.image, service.image, service.image]; // Using same image 3 times for demo

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('services')}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 font-semibold"
        >
          <ArrowLeft size={20} /> Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">
            {/* Gallery Section */}
            <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-8">
              <div className="relative h-80 bg-gradient-to-br from-amber-900 to-yellow-900">
                <img
                  src={galleries[galleryIdx]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />

                {/* Gallery Nav */}
                <button
                  onClick={prevGallery}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextGallery}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Gallery Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {galleries.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === galleryIdx ? 'bg-yellow-400 w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Tier Badge */}
                {service.tier === ListingTier.Elite && (
                  <div className="absolute top-4 right-4 bg-yellow-400/90 text-black px-4 py-2 rounded-full font-bold text-sm">
                    ⭐ ELITE
                  </div>
                )}
                {service.tier === ListingTier.Premium && (
                  <div className="absolute top-4 right-4 bg-purple-500/90 text-white px-4 py-2 rounded-full font-bold text-sm">
                    ★ PREMIUM
                  </div>
                )}
              </div>

              {/* Favorites & Share */}
              <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                <button
                  onClick={handleFavoriteClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isFavorited
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                  {isFavorited ? 'Favorited' : 'Add to Favorites'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-all">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
              {['overview', 'services', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 px-4 font-semibold transition-all ${
                    activeTab === tab
                      ? 'text-yellow-400 border-b-2 border-yellow-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* About - SHORT */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">About</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {service.description || 'Professional service provider with excellent track record.'}
                  </p>
                </div>

                {/* Service Area */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-yellow-400" size={20} />
                    <h3 className="text-lg font-bold text-white">Service Area</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{service.location}</p>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Services Offered</h3>
                <div className="space-y-3">
                  {[
                    'Emergency Service',
                    'Repairs & Maintenance',
                    'Installations',
                    'Inspections & Diagnostics',
                    'Professional Consultation',
                  ].map((serviceItem, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-black/50 rounded-lg">
                      <Check className="text-yellow-400 flex-shrink-0" size={20} />
                      <span className="text-gray-300 text-sm">{serviceItem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {[
                  { name: 'John Doe', rating: 5, text: 'Fast and reliable service. Fixed our issue same day.' },
                  { name: 'Sarah Johnson', rating: 4.8, text: 'Very professional and affordable.' },
                  { name: 'Mike Wilson', rating: 5, text: 'Highly recommended! Great work and even better customer service.' },
                ].map((review, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-white text-sm">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">⭐ {review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-yellow-400/30 rounded-2xl p-6 sticky top-32 space-y-4">
              {/* Name & Rating */}
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{service.name}</h1>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-white">{service.rating?.toFixed(1) || '4.5'}</span>
                  </div>
                  <span className="text-sm text-gray-400">({service.reviewCount || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Check size={16} className="text-green-400" />
                  <span>Verified Provider</span>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              {/* Contact Info */}
              {service.phone && (
                <a
                  href={`tel:${service.phone}`}
                  className="flex items-center gap-3 p-3 bg-yellow-400/10 hover:bg-yellow-400/20 rounded-lg transition-all text-yellow-400 font-semibold group"
                >
                  <Phone size={20} />
                  <span className="text-sm">{service.phone}</span>
                </a>
              )}

              {service.email && (
                <a
                  href={`mailto:${service.email}`}
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-gray-300 font-semibold"
                >
                  <Mail size={20} />
                  <span className="text-sm truncate">{service.email}</span>
                </a>
              )}

              {service.website && (
                <a
                  href={`https://${service.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-gray-300 font-semibold"
                >
                  <Globe size={20} />
                  <span className="text-sm truncate">{service.website}</span>
                </a>
              )}

              {/* Main CTA */}
              <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-black font-bold py-3 rounded-lg transition-all">
                Request Service
              </button>

              {/* Secondary CTA */}
              <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-lg transition-all border border-white/10">
                <MessageCircle size={18} />
                Send Message
              </button>

              {/* Verified Badge */}
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Check className="text-green-400" size={18} />
                  <span className="text-sm font-bold text-green-400">Verified Provider</span>
                </div>
                <p className="text-xs text-gray-300">Trusted by {service.reviewCount || 234}+ customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalServiceDetail;
