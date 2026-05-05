import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Users,
  X,
  ZoomIn,
  Check,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react';

interface Experience {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: number;
  reviewCount: number;
  price: string;
  description: string;
  longDescription: string;
  heroImage: string;
  gallery: string[];
  bestTime: string;
  accessTypes: string[];
  highlights: {
    name: string;
    type: string;
    rating: number;
    price: string;
    image: string;
  }[];
  itineraryItems: {
    activity: string;
    duration: string;
    note: string;
  }[];
  included: string[];
  notIncluded: string[];
  nearbyExperiences: {
    id: string;
    name: string;
    type: string;
    rating: number;
    price: string;
    image: string;
  }[];
  reviews: {
    author: string;
    rating: number;
    comment: string;
    verified: boolean;
  }[];
  mapLocation?: {
    lat: number;
    lng: number;
  };
  verifiedBadge?: string;
}

interface Props {
  experience?: Experience;
  navigate?: (view: string, category?: string, id?: string) => void;
  onClose?: () => void;
}

const TourismExperienceDetailView: React.FC<Props> = ({
  experience,
  navigate,
  onClose,
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState(false);
  const [nearbyScrollIndex, setNearbyScrollIndex] = useState(0);

  // Mock data for God's Window
  const mockExperience: Experience = {
    id: 'gods-window',
    name: "God's Window",
    location: 'Graskop, Mpumalanga',
    type: 'Sightseeing / Scenic',
    rating: 4.7,
    reviewCount: 3200,
    price: 'From R50 pp',
    description:
      'Iconic panoramic views of the Lowveld and Blyde River Canyon',
    longDescription:
      'Situated on the Drakensberg escarpment, God\'s Window offers breathtaking panoramic vistas across lush valleys and cliffs. Perfect for photography, hiking, and private tours, this curated destination is reserved for travelers seeking a premium Mpumalanga experience.',
    heroImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    ],
    bestTime: 'Daylight hours',
    accessTypes: ['Public', 'Guided', 'Private'],
    highlights: [
      {
        name: "Bourke's Luck Potholes",
        type: 'Nature',
        rating: 4.6,
        price: 'From R75',
        image:
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
      },
      {
        name: 'Three Rondavels Viewpoint',
        type: 'Scenic',
        rating: 4.7,
        price: 'Free',
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      },
      {
        name: 'Lisbon Falls',
        type: 'Scenic',
        rating: 4.6,
        price: 'From R50',
        image:
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
      },
      {
        name: 'Panorama Route Wine Estate',
        type: 'Leisure',
        rating: 4.6,
        price: 'From R250',
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      },
    ],
    itineraryItems: [
      {
        activity: "God's Window Viewpoint",
        duration: '30 min',
        note: 'Admission included',
      },
      {
        activity: "Bourke's Luck Potholes",
        duration: '1 hr',
        note: 'Admission included',
      },
      {
        activity: 'Three Rondavels',
        duration: '20 min',
        note: 'Free',
      },
      {
        activity: 'Lisbon Falls',
        duration: '15 min',
        note: 'Free',
      },
    ],
    included: [
      'Professional guide',
      'Sightseeing & photography spots',
      'Light refreshments (optional)',
      'Access to all viewpoints',
    ],
    notIncluded: ['Transport', 'Gratuities', 'Meals', 'Personal insurance'],
    nearbyExperiences: [
      {
        id: 'mac-mac-falls',
        name: 'Mac Mac Falls',
        type: 'Scenic Waterfall',
        rating: 4.8,
        price: 'From R40',
        image:
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
      },
      {
        id: 'wonderview-estate',
        name: 'Wonderview Estate',
        type: 'Vineyard Experience',
        rating: 4.7,
        price: 'From R180',
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      },
      {
        id: 'graskop-caves',
        name: 'Graskop Caves',
        type: 'Underground Adventure',
        rating: 4.5,
        price: 'From R120',
        image:
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
      },
      {
        id: 'safari-experience',
        name: 'Kruger Safari Experience',
        type: 'Wildlife Tour',
        rating: 4.9,
        price: 'From R450',
        image:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      },
    ],
    reviews: [
      {
        author: 'Catherine M.',
        rating: 5,
        comment:
          'Absolutely breathtaking views! Our guide was incredibly knowledgeable and made the experience unforgettable. Best decision we made on our trip.',
        verified: true,
      },
      {
        author: 'James T.',
        rating: 5,
        comment:
          'The panoramic vistas are truly world-class. Photography opportunities are endless. Highly recommend visiting at sunset for the most stunning light.',
        verified: true,
      },
      {
        author: 'Sarah & David',
        rating: 4,
        comment:
          'Amazing experience with professional guides. Weather was perfect. Would have liked more time to explore. Coming back soon!',
        verified: true,
      },
    ],
    verifiedBadge: 'Verified by LowveldHub • Curated Experience',
  };

  const exp = experience || mockExperience;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextCarouselSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % exp.gallery.length);
  };

  const prevCarouselSlide = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? exp.gallery.length - 1 : prev - 1
    );
  };

  const nextLightboxSlide = () => {
    setLightboxIndex((prev) => (prev + 1) % exp.gallery.length);
  };

  const prevLightboxSlide = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? exp.gallery.length - 1 : prev - 1
    );
  };

  const nextNearbyScroll = () => {
    setNearbyScrollIndex((prev) =>
      Math.min(prev + 1, Math.max(0, exp.nearbyExperiences.length - 3))
    );
  };

  const prevNearbyScroll = () => {
    setNearbyScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===== 1. HERO SECTION ===== */}
      <div
        className="relative w-full h-[65vh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${exp.heroImage})` }}
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 p-3 rounded-full z-20 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-2">{exp.name}</h1>
            <div className="flex items-center gap-2 mb-4 text-gray-300">
              <MapPin className="w-5 h-5 text-[#C9A24D]" />
              <span>{exp.location}</span>
            </div>

            {/* Rating & Price */}
            <div className="flex items-center gap-6 mb-6 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[#C9A24D] text-[#C9A24D]" />
                <span>{exp.rating}</span>
                <span className="text-gray-400">
                  ({exp.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#C9A24D] font-semibold">
                <DollarSign className="w-5 h-5" />
                <span>{exp.price}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-200 mb-8 max-w-2xl text-lg">
              {exp.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 mb-6">
              <button className="px-8 py-3 bg-[#C9A24D] text-black font-semibold rounded-lg hover:bg-[#D4B369] transition-all duration-200 flex items-center gap-2">
                Book Experience
              </button>
              <button className="px-8 py-3 border border-[#C9A24D] text-[#C9A24D] font-semibold rounded-lg hover:bg-[#C9A24D]/10 transition-all duration-200 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat with Concierge
              </button>
            </div>

            {/* Verified Badge */}
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <Check className="w-4 h-4 text-[#C9A24D]" />
              {exp.verifiedBadge}
            </div>
          </div>
        </div>

        {/* Scroll Hint Animation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronLeft className="w-6 h-6 text-[#C9A24D]" />
        </div>
      </div>

      {/* ===== 2. IMAGE GALLERY CAROUSEL ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-96 rounded-xl overflow-hidden group">
            <img
              src={exp.gallery[carouselIndex]}
              alt={`Gallery slide ${carouselIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => {
                setShowLightbox(true);
                setLightboxIndex(carouselIndex);
              }}
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevCarouselSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full z-10 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCarouselSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-3 rounded-full z-10 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 px-4 py-2 rounded-full text-sm">
              {carouselIndex + 1} / {exp.gallery.length}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-3 mt-6">
            {exp.gallery.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={`h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  idx === carouselIndex
                    ? 'border-[#C9A24D]'
                    : 'border-gray-700 hover:border-[#C9A24D]/50'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 3. BEST SEASON & WEATHER ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Best Season & Weather</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-[#C9A24D]">Optimal Months</h3>
            <p className="text-gray-300 mb-4">Visit May–September for crisp, clear skies and excellent visibility. October–April brings warmer temperatures but occasional rain.</p>
            <p className="text-sm text-gray-400"><strong>Peak Season:</strong> July–August (drier, cooler, best for photography)</p>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-[#C9A24D]">Weather Patterns</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🌤️ <strong>Dry Season (May–Sep):</strong> 12–20°C, minimal rain, sharp visibility</li>
              <li>☀️ <strong>Summer (Oct–Apr):</strong> 18–26°C, afternoon thunderstorms, lush greenery</li>
              <li>⚠️ <strong>Avoid:</strong> November (peak rainfall, misty conditions)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 4. PHOTOGRAPHY TIPS & BEST SPOTS ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Photography Tips & Best Spots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-br from-[#C9A24D]/10 to-transparent rounded-xl border border-[#C9A24D]/30">
            <h3 className="text-lg font-semibold mb-4 text-[#C9A24D]">📸 Golden Hour Magic</h3>
            <p className="text-gray-300 mb-3">Visit at sunrise (5:30–6:30 AM) or sunset (5:00–6:30 PM) for warm, directional light that transforms landscapes.</p>
            <p className="text-sm text-gray-400">Tip: Arrive 30 mins early to scout composition and avoid crowds.</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#C9A24D]/10 to-transparent rounded-xl border border-[#C9A24D]/30">
            <h3 className="text-lg font-semibold mb-4 text-[#C9A24D]">🎯 Best Composition Spots</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ The Ledge: Panoramic vistas, wide-angle heaven</li>
              <li>✓ Three Rondavels: Distinctive rock formations in frame</li>
              <li>✓ Blyde River Canyon: Layered mist & depth</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 5. WHAT TO BRING ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">What to Bring</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-4 text-[#C9A24D]">☀️ Sun & Elements</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ High SPF sunscreen (altitude = stronger UV)</li>
              <li>✓ Wide-brimmed hat or cap</li>
              <li>✓ Lightweight, breathable clothing</li>
              <li>✓ Sunglasses (polarized preferred)</li>
              <li>✓ Windbreaker (altitude winds)</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-4 text-[#C9A24D]">📷 Camera & Tech</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ DSLR/mirrorless camera + lenses</li>
              <li>✓ Tripod (for long exposures, group shots)</li>
              <li>✓ Portable power bank (2+ charges)</li>
              <li>✓ ND filters (for creative long exposures)</li>
              <li>✓ Cleaning cloth for lenses</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-4 text-[#C9A24D]">🥾 Comfort & Safety</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Comfortable hiking boots (trails are rocky)</li>
              <li>✓ Refillable water bottle (2L+)</li>
              <li>✓ Snacks (energy bars, nuts)</li>
              <li>✓ Insect repellent (low-dose)</li>
              <li>✓ Basic first aid kit</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 6. SAFETY & ACCESS INFO ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Safety & Access Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#C9A24D]" />
              Difficulty & Physical Requirements
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>🥾 <strong>Difficulty:</strong> Moderate (uneven terrain, some steep sections)</li>
              <li>⏱️ <strong>Duration:</strong> 3–4 hours walking</li>
              <li>🎯 <strong>Fitness Level:</strong> Good fitness recommended, not for young children</li>
              <li>⛔ <strong>Not Suitable For:</strong> Mobility issues, severe vertigo, pregnant women</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-[#C9A24D]" />
              Safety Guidelines
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Always stay on marked paths</li>
              <li>✓ Don't lean over railings for photos</li>
              <li>✓ Inform guide if you feel unwell</li>
              <li>✓ Emergency services 30 mins away (stay with group)</li>
              <li>✓ Guides trained in first aid</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 7. MUST-SEE HIGHLIGHTS ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Must-See Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exp.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="group cursor-pointer rounded-xl overflow-hidden border border-gray-800 hover:border-[#C9A24D] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A24D]/20"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={highlight.image}
                  alt={highlight.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 bg-gray-900/50">
                <p className="text-xs text-[#C9A24D] font-semibold mb-2">
                  {highlight.type}
                </p>
                <h3 className="font-bold mb-3 line-clamp-2">{highlight.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#C9A24D] text-[#C9A24D]" />
                    <span className="text-sm">{highlight.rating}</span>
                  </div>
                  <span className="text-[#C9A24D] font-semibold text-sm">
                    {highlight.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 8. OVERVIEW SECTION ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Overview</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          {exp.longDescription}
        </p>
      </div>

      {/* ===== 6. ITINERARY / HIGHLIGHTS ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Typical Itinerary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exp.itineraryItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-[#C9A24D] hover:shadow-lg hover:shadow-[#C9A24D]/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold group-hover:text-[#C9A24D] transition-colors duration-200">
                  {item.activity}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <Clock className="w-4 h-4 text-[#C9A24D]" />
                <span>{item.duration}</span>
              </div>
              <p className="text-xs text-gray-400">{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 7. WHAT'S INCLUDED / NOT INCLUDED ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">What's Included</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Included */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-[#C9A24D]">
              Included
            </h3>
            <ul className="space-y-4">
              {exp.included.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#C9A24D] flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Included */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-400">
              Not Included
            </h3>
            <ul className="space-y-4">
              {exp.notIncluded.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 11. NEARBY EXPERIENCES CAROUSEL ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-2">
          Guests who visited this also explored…
        </h2>
        <p className="text-gray-400 mb-8">Recommended nearby experiences</p>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
            {exp.nearbyExperiences
              .slice(nearbyScrollIndex, nearbyScrollIndex + 3)
              .map((nearby, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-gray-800 hover:border-[#C9A24D] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A24D]/20"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={nearby.image}
                      alt={nearby.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="bg-black/60 hover:bg-black/80 p-2 rounded-full transition-all duration-200">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5 bg-gray-900/50">
                    <p className="text-xs text-[#C9A24D] font-semibold mb-2">
                      {nearby.type}
                    </p>
                    <h3 className="font-bold mb-3">{nearby.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#C9A24D] text-[#C9A24D]" />
                        <span className="text-sm">{nearby.rating}</span>
                      </div>
                      <span className="text-[#C9A24D] font-semibold text-sm">
                        {nearby.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Scroll Navigation */}
          {exp.nearbyExperiences.length > 3 && (
            <>
              <button
                onClick={prevNearbyScroll}
                disabled={nearbyScrollIndex === 0}
                className="absolute -left-6 top-1/3 bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-full z-10 transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextNearbyScroll}
                disabled={
                  nearbyScrollIndex >=
                  exp.nearbyExperiences.length - 3
                }
                className="absolute -right-6 top-1/3 bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-full z-10 transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ===== 10. PREMIUM & PRIVATE OPTIONS ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Private & Premium Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-[#C9A24D]/10 to-transparent rounded-xl border border-[#C9A24D]/30">
            <h3 className="text-lg font-semibold text-[#C9A24D] mb-3">Standard Access</h3>
            <p className="text-gray-300 text-sm mb-4">Group tour with other guests, professional guide, 3-4 hours</p>
            <p className="text-[#C9A24D] font-bold text-lg">From R50 pp</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#C9A24D]/20 to-transparent rounded-xl border border-[#C9A24D]/50 ring-1 ring-[#C9A24D]/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-[#C9A24D]">Premium Private</h3>
              <span className="text-xs bg-[#C9A24D] text-black px-3 py-1 rounded-full font-semibold">POPULAR</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">Exclusive guide, flexible timing, sunrise/sunset options available</p>
            <p className="text-[#C9A24D] font-bold text-lg">From R450/group</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-[#C9A24D]/10 to-transparent rounded-xl border border-[#C9A24D]/30">
            <h3 className="text-lg font-semibold text-[#C9A24D] mb-3">Elite VIP Experience</h3>
            <p className="text-gray-300 text-sm mb-4">Concierge-arranged, personal photographer, gourmet picnic included</p>
            <p className="text-[#C9A24D] font-bold text-lg">From R1,200/person</p>
          </div>
        </div>
      </div>

      {/* ===== 11. VISITOR PHOTO GALLERY ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-2">Guest Moments</h2>
        <p className="text-gray-400 mb-8">Real experiences from verified LowveldHub guests</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((_, idx) => (
            <div key={idx} className="group relative h-56 rounded-lg overflow-hidden border border-gray-800 hover:border-[#C9A24D] transition-all duration-300">
              <img 
                src={exp.gallery[idx % exp.gallery.length]} 
                alt={`Guest photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="text-sm font-semibold text-white">@guest{idx + 1}</p>
                  <p className="text-xs text-gray-300">Golden hour perfection</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 12. OPERATING HOURS & BOOKING ===== */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Operating Hours & Booking</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-6 text-[#C9A24D]">Opening Hours</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-700">
                <span className="text-gray-300">Monday - Sunday</span>
                <span className="text-white font-semibold">6:00 AM - 6:00 PM</span>
              </div>
              <div className="mt-4 p-3 bg-[#C9A24D]/10 border border-[#C9A24D]/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  🌅 <strong>Best Time:</strong> Arrive 30 min before sunrise or sunset for optimal light
                </p>
              </div>
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  ⚠️ <strong>Note:</strong> Closed during severe weather warnings
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-6 text-[#C9A24D]">Quick Booking Info</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#C9A24D] flex-shrink-0 mt-0.5" />
                <span><strong>Booking:</strong> No reservation required for standard tours</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#C9A24D] flex-shrink-0 mt-0.5" />
                <span><strong>Groups:</strong> Private guides recommend booking 24hrs ahead</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#C9A24D] flex-shrink-0 mt-0.5" />
                <span><strong>Cancellation:</strong> Free cancellation up to 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#C9A24D] flex-shrink-0 mt-0.5" />
                <span><strong>Payment:</strong> Cash or card accepted at entrance</span>
              </li>
            </ul>
            <button className="w-full mt-6 px-8 py-3 bg-[#C9A24D] text-black font-semibold rounded-lg hover:bg-[#D4B369] transition-all duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* ===== LIGHTBOX ===== */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Main Image */}
            <img
              src={exp.gallery[lightboxIndex]}
              alt={`Lightbox image ${lightboxIndex + 1}`}
              className="max-w-4xl max-h-[85vh] object-contain"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevLightboxSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#C9A24D] hover:bg-[#D4B369] p-3 rounded-full z-10 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={nextLightboxSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#C9A24D] hover:bg-[#D4B369] p-3 rounded-full z-10 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 bg-[#C9A24D] hover:bg-[#D4B369] p-3 rounded-full z-10 transition-all duration-200"
            >
              <X className="w-6 h-6 text-black" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 px-6 py-3 rounded-full text-white font-semibold">
              {lightboxIndex + 1} / {exp.gallery.length}
            </div>
          </div>
        </div>
      )}

      {/* Spacing */}
      <div className="h-20" />
    </div>
  );
};

export default TourismExperienceDetailView;
