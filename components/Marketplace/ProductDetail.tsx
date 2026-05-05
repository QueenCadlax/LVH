import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductReview, Seller } from '../../types';
import { ChevronLeft, ChevronRight, X, Minus, Plus, Heart, Share2, Star, MessageSquare, Store, ShoppingCart, Truck, Shield, RotateCcw, Sparkles } from 'lucide-react';
import { MarketButton } from '../Shared';
import { marketplaceProducts } from '../../data/seeds';
import { getSmartRecommendations } from '../../services/aiService';

interface ProductDetailProps {
  product: Product;
  seller?: Seller | null;
  onClose: () => void;
  onVisitSeller?: (sellerId: string) => void;
  onSelectProduct?: (p: Product) => void;
}

export default function ProductDetail({ product, seller, onClose, onVisitSeller, onSelectProduct }: ProductDetailProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'reviews' | 'specs' | 'details'>('reviews');
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSort, setReviewSort] = useState<'helpful' | 'recent'>('helpful');
  const [imageLoaded, setImageLoaded] = useState(true);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  if (!product) return null;

  const rawImages = product.images || [];
  // Ensure a minimum of 4 images for the gallery by repeating first image or using placeholder
  const images = (() => {
    const min = 4;
    const placeholder = 'https://picsum.photos/seed/lowveldhub/800/800';
    const copy = rawImages.slice(0, 8);
    while (copy.length < min) {
      copy.push(rawImages[0] || placeholder);
    }
    return copy;
  })();
  const currentImage = images[galleryIndex] || '';

  const nextImage = () => {
    setImageLoaded(false);
    setGalleryIndex((i) => (i + 1) % images.length);
  };
  const prevImage = () => {
    setImageLoaded(false);
    setGalleryIndex((i) => (i - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') onClose();
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Fetch AI recommendations
  useEffect(() => {
    const fetchRecs = async () => {
      setLoadingRecs(true);
      try {
        const query = `Find 3 similar luxury products to: ${product.title} (${product.category}). Look for same category, premium quality.`;
        const suggestions = await getSmartRecommendations(query);
        if (Array.isArray(suggestions) && suggestions.length > 0) {
          // Map AI suggestions to actual products
          const mapped = suggestions
            .map(title => marketplaceProducts.find(p => 
              p.title.toLowerCase().includes(title.toLowerCase().split(' ')[0]) && 
              p.category === product.category && 
              p.id !== product.id
            ))
            .filter(Boolean) as Product[];
          setRecommendations(mapped.slice(0, 3));
        }
      } catch (e) {
        // Fallback: use related products if AI fails
        setRecommendations(recommendedProducts.slice(0, 3));
      }
      setLoadingRecs(false);
    };
    fetchRecs();
  }, [product.id, product.title, product.category]);

  const relatedProducts = useMemo(() => {
    const isValid = (p: any) => p.images && p.images.length > 0 && !!p.images[0] && p.title && ((typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || (p.price && p.price !== 'Price on request'));
    return marketplaceProducts
      .filter(p => p.category === product.category && p.id !== product.id && isValid(p))
      .slice(0, 4);
  }, [product]);

  const recommendedProducts = useMemo(() => {
    const isValid = (p: any) => p.images && p.images.length > 0 && !!p.images[0] && p.title && ((typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || (p.price && p.price !== 'Price on request'));
    return marketplaceProducts
      .filter(p => p.category === product.category && p.id !== product.id && isValid(p))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }, [product]);

  const customersAlsoViewed = useMemo(() => {
    const isValid = (p: any) => p.images && p.images.length > 0 && !!p.images[0] && p.title && ((typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || (p.price && p.price !== 'Price on request'));
    const others = marketplaceProducts.filter(p => p.id !== product.id && p.category !== product.category && isValid(p));
    // simple shuffle
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [others[i], others[j]] = [others[j], others[i]];
    }
    return others.slice(0, 6);
  }, [product]);

  const sellerProducts = useMemo(() => {
    if (!product.sellerId) return [];
    return marketplaceProducts.filter((p) => p.sellerId === product.sellerId && p.id !== product.id && p.images && p.images.length > 0 && !!p.images[0] && p.title && ((typeof p.priceValue === 'number' && !Number.isNaN(p.priceValue)) || (p.price && p.price !== 'Price on request'))).slice(0, 6);
  }, [product]);

  const reviews = product.reviews || [
    {
      id: 'r1',
      reviewer: 'Sarah M.',
      rating: 5,
      date: '2 weeks ago',
      text: 'Absolutely stunning quality! The craftsmanship is impeccable and it arrived well-packaged. Highly recommend!',
      helpful: 24,
      verified: true
    },
    {
      id: 'r2',
      reviewer: 'James K.',
      rating: 4,
      date: '1 month ago',
      text: 'Great product, very impressed with the attention to detail. Shipping was faster than expected.',
      helpful: 18,
      verified: false
    },
    {
      id: 'r3',
      reviewer: 'Emma L.',
      rating: 5,
      date: '1 month ago',
      text: 'Perfect for what I needed. The seller was very responsive to my questions before purchase.',
      helpful: 31,
      verified: true
    }
  ];

  const sortedReviews = useMemo(() => {
    const copy = (reviews || []).slice();
    if (reviewSort === 'helpful') {
      return copy.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
    }
    // 'recent' - keep original order for now (UI-only)
    return copy;
  }, [reviews, reviewSort]);

  const averageRating = product.rating || 4.8;
  const reviewCount = product.reviewCount || 342;

  const sellerRating = (seller as any)?.rating ?? product.rating ?? 4.8;
  const sellerDelivery = (seller as any)?.avgDeliveryDays ?? '3-5';
  const sellerReturns = (seller as any)?.returnsAccepted ?? false;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0a] border border-[#d4af37]/30 w-full max-w-7xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-auto max-h-[90vh] lg:max-h-none">
          {/* LEFT: GALLERY */}
          <div className="lg:border-r border-[#d4af37]/20 bg-[#121212] p-6 lg:pr-8 flex flex-col relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 text-[#cfcfcf] hover:text-white bg-[#1c1c1c]/80 rounded-full p-2 transition-colors lg:hidden"
            >
              <X size={20} />
            </button>

                <div className="relative flex-1 flex items-center justify-center bg-gradient-to-b from-[#060606] via-[#0a0a0a] to-[#0a0a0a] rounded-xl overflow-hidden group mb-6 ring-1 ring-black/40">
              {currentImage ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  {/* fade-in image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={galleryIndex}
                        src={currentImage}
                        alt={`${product.title} ${galleryIndex + 1}`}
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-contain max-h-96 lg:max-h-full transition-opacity duration-500 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        } group-hover:scale-110 transform-gpu cursor-zoom-in`}
                      />
                </div>
              ) : (
                <div className="text-[#bfa14f] text-sm">No image</div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#ffd700] hover:bg-[#d4af37] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#ffd700] hover:bg-[#d4af37] text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white bg-black/60 backdrop-blur px-4 py-2 rounded-full font-semibold">
                    {galleryIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth mt-3">
                {images.map((img, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <button
                    key={idx}
                    onClick={() => {
                      setImageLoaded(false);
                      setGalleryIndex(idx);
                    }}
                    className={`w-20 h-20 p-0 rounded-lg flex-shrink-0 transition-all transform hover:scale-105 ${
                      idx === galleryIndex ? 'ring-2 ring-[#ffd700]/60' : ''
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx}`}
                      className={`w-full h-full object-cover rounded-lg border-2 ${
                        idx === galleryIndex ? 'border-[#ffd700]' : 'border-[#d4af37]/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="overflow-y-auto max-h-[90vh] flex flex-col">
            <div className="flex justify-end hidden lg:block p-6 pb-0">
              <button
                onClick={onClose}
                className="text-[#cfcfcf] hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 p-6 md:p-8 space-y-6">
              {/* Header Section */}
              <div>
                {/* Breadcrumbs */}
                <div className="text-xs text-[#cfcfcf] mb-2">
                  <button className="text-[#bfa14f] mr-2" onClick={() => { /* navigate to category */ }}>
                    {product.category}
                  </button>
                  {product.subcategory && <span className="opacity-60">› {product.subcategory}</span>}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-[#bfa14f] uppercase tracking-widest">
                    {product.brand || 'Brand'}
                  </p>
                  {product.sellerType === 'Premium Partner' && (
                    <span className="text-[#ffd700] text-xs font-bold bg-[#ffd700]/10 px-2.5 py-1 rounded-full">
                      ★ Premium Partner
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 pb-4 border-b border-[#d4af37]/20 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(averageRating) ? 'fill-[#ffd700] text-[#ffd700]' : 'text-gray-600'}
                        />
                      ))}
                    </div>
                    <span className="text-[#ffd700] font-bold text-sm">{averageRating}</span>
                    <span className="text-[#cfcfcf] text-sm">({reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-[#ffd700]">{product.price}</span>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${
                        product.inStock
                          ? 'bg-green-900/40 text-green-300'
                          : 'bg-red-900/40 text-red-300'
                      }`}
                    >
                      {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  {product.stock && (
                    <p className="text-xs text-[#cfcfcf]">
                      {product.stock > 5 ? `${product.stock} units available` : `Only ${product.stock} left!`}
                    </p>
                  )}
                </div>
              </div>

              {(product.description || product.fullDescription) && (
                <div className="pb-4 border-b border-[#d4af37]/20">
                  <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">About This Product</h3>
                  <div className="max-h-40 overflow-y-auto pr-2">
                    <p className="text-[#cfcfcf] text-sm leading-relaxed">
                      {product.fullDescription || product.description}
                    </p>
                  </div>
                </div>
              )}

              {(product.material || product.dimensions || product.weight || product.careInstructions) && (
                <div className="bg-[#121212] rounded-lg p-4 border border-[#d4af37]/20">
                  <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Key Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {product.material && (
                      <div>
                        <p className="text-[#bfa14f] text-xs font-bold mb-1">Material</p>
                        <p className="text-white">{product.material}</p>
                      </div>
                    )}
                    {product.dimensions && (
                      <div>
                        <p className="text-[#bfa14f] text-xs font-bold mb-1">Dimensions</p>
                        <p className="text-white">{product.dimensions}</p>
                      </div>
                    )}
                    {product.weight && (
                      <div>
                        <p className="text-[#bfa14f] text-xs font-bold mb-1">Weight</p>
                        <p className="text-white">{product.weight}</p>
                      </div>
                    )}
                    {product.careInstructions && (
                      <div className="col-span-2">
                        <p className="text-[#bfa14f] text-xs font-bold mb-1">Care Instructions</p>
                        <p className="text-white">{product.careInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-[#0f0f0f] rounded-lg p-4 border border-[#d4af37]/12 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {product.sellerImage && (
                    <img
                      src={product.sellerImage}
                      alt={product.sellerName || seller?.name || 'Unknown Seller'}
                      className="w-12 h-12 rounded-lg object-cover border border-[#d4af37]/20 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{product.sellerName || seller?.name || 'Unknown Seller'}</p>
                    <p className="text-xs text-[#cfcfcf] truncate">{product.location || seller?.location || 'Mpumalanga'}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {product.sellerType && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#d4af37]/10 text-[#cfcfcf] bg-black/5">{product.sellerType}</span>
                      )}
                      {seller?.isVerified && <span className="text-[#ffd700] text-[11px] bg-black/20 px-2 py-0.5 rounded-full">Verified</span>}
                    </div>
                    {seller?.isVerified && (
                      <p className="text-xs text-[#bfa14f] mt-1">Verified by LowveldHub</p>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-2">
                  <button
                    onClick={() => onVisitSeller && onVisitSeller(product.sellerId || seller?.id || '')}
                    className="text-[#ffd700] border border-[#ffd700] py-2 rounded-lg text-sm font-semibold hover:bg-[#ffd700]/10 transition-all px-3"
                    type="button"
                  >
                    <Store size={14} className="inline mr-2" /> Visit Seller Store
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs text-[#cfcfcf]">
                <div className="flex items-center gap-2 bg-[#121212] px-3 py-2 rounded-lg border border-[#d4af37]/10">
                  <Star size={14} className="text-[#ffd700]" />
                  <div className="text-sm font-semibold text-white">{sellerRating}</div>
                  <div className="opacity-70">Avg</div>
                </div>
                <div className="flex items-center gap-2 bg-[#121212] px-3 py-2 rounded-lg border border-[#d4af37]/10">
                  <Truck size={14} className="text-[#ffd700]" />
                  <div className="text-sm font-semibold text-white">{sellerDelivery}</div>
                  <div className="opacity-70">Days</div>
                </div>
                <div className="flex items-center gap-2 bg-[#121212] px-3 py-2 rounded-lg border border-[#d4af37]/10">
                  <Shield size={14} className="text-[#ffd700]" />
                  <div className="text-sm font-semibold text-white">{sellerReturns ? 'Yes' : 'No'}</div>
                  <div className="opacity-70">Returns</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#d4af37]/20">
                {/* FUNCTIONAL BUTTONS ONLY - Phase 1 Honest Marketplace */}
                <div className="space-y-3">
                  <MarketButton 
                    onClick={() => {
                      // Extract WhatsApp number from seller data
                      const whatsappNumber = seller?.whatsappNumber || product.sellerPhone;
                      if (!whatsappNumber) {
                        alert('Seller WhatsApp number not available. Please visit their store instead.');
                        return;
                      }
                      // Remove all non-digits and format for WhatsApp
                      const cleanNumber = whatsappNumber.replace(/\D/g, '');
                      const message = `Hi, I found your "${product.title}" on LowveldHub. Is it still available?`;
                      const encodedMessage = encodeURIComponent(message);
                      window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank');
                    }}
                    className="w-full" 
                    size="lg"
                  >
                    Contact Seller on WhatsApp
                  </MarketButton>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-full py-2 rounded-lg border-2 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm ${
                      isFavorite
                        ? 'bg-red-900/30 border-red-600 text-red-400 hover:bg-red-900/50'
                        : 'border-[#d4af37]/30 text-[#cfcfcf] hover:border-[#ffd700] hover:text-[#ffd700]'
                    }`}
                  >
                    <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                    Save for Later
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#d4af37]/20 bg-[#121212] rounded-lg p-4 border border-[#d4af37]/20">
                <p className="text-sm text-[#ffd700] font-semibold mb-3">Before You Enquire, Confirm with Seller:</p>
                <div className="space-y-2 text-xs text-[#cfcfcf]">
                  <div className="flex items-start gap-2">
                    <Truck size={14} className="text-[#ffd700] mt-0.5 flex-shrink-0" />
                    <p>Delivery options & costs</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <RotateCcw size={14} className="text-[#ffd700] mt-0.5 flex-shrink-0" />
                    <p>Return policy (if applicable)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield size={14} className="text-[#ffd700] mt-0.5 flex-shrink-0" />
                    <p>Payment methods accepted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TABS */}
            <div className="border-t border-[#d4af37]/20 bg-[#121212]/50">
              <div className="flex border-b border-[#d4af37]/20">
                {['reviews', 'specs', 'details'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${
                      activeTab === tab ? 'text-[#ffd700] border-b-2 border-[#ffd700]' : 'text-[#cfcfcf] hover:text-white'
                    }`}
                  >
                    {tab === 'reviews' && `Reviews (${reviewCount})`}
                    {tab === 'specs' && 'Specifications'}
                    {tab === 'details' && 'Details'}
                  </button>
                ))}
              </div>

              {activeTab === 'reviews' && (
                <div className="space-y-6 p-6">
                  <div className="py-12 text-center">
                    <div className="inline-block p-6 bg-[#121212] rounded-lg border border-[#d4af37]/30">
                      <Star size={32} className="text-[#ffd700] mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">Verified Reviews Coming Soon</h3>
                      <p className="text-sm text-[#cfcfcf] max-w-md">
                        We are building a trusted review system with LowveldHub verification. Contact the seller directly to learn more about this product.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4">
                  {product.material && (
                    <div className="flex justify-between">
                      <span className="text-[#bfa14f]">Material:</span>
                      <span className="text-white font-medium">{product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-[#bfa14f]">Dimensions:</span>
                      <span className="text-white font-medium">{product.dimensions}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex justify-between">
                      <span className="text-[#bfa14f]">Weight:</span>
                      <span className="text-white font-medium">{product.weight}</span>
                    </div>
                  )}
                  {product.condition && (
                    <div className="flex justify-between">
                      <span className="text-[#bfa14f]">Condition:</span>
                      <span className="text-white font-medium">{product.condition}</span>
                    </div>
                  )}
                  {product.sku && (
                    <div className="flex justify-between">
                      <span className="text-[#bfa14f]">SKU:</span>
                      <span className="text-white font-medium text-xs">{product.sku}</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#bfa14f]">Brand:</span>
                    <span className="text-white font-medium">{product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#bfa14f]">Category:</span>
                    <span className="text-white font-medium">{product.category}</span>
                  </div>
                  {product.subcategory && (
                    <div className="flex justify-between">
                      <span className="text-[#bfa14f]">Subcategory:</span>
                      <span className="text-white font-medium">{product.subcategory}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#bfa14f]">Seller Type:</span>
                    <span className="text-white font-medium">{product.sellerType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#bfa14f]">Location:</span>
                    <span className="text-white font-medium">{product.location}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Related products removed — we show curated recommendations below */}

            {recommendedProducts.length > 0 && (
              <div className="border-t border-[#d4af37]/20 p-6 md:p-8 animate-fade-in">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">You May Also Like</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {recommendedProducts.map(rp => (
                    <div
                      key={rp.id}
                      onClick={() => onSelectProduct && onSelectProduct(rp)}
                      className="min-w-[180px] group cursor-pointer bg-[#121212] border border-[#1c1c1c]/30 rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
                    >
                      <div className="relative h-36 overflow-hidden bg-[#0a0a0a]">
                        <img src={rp.images?.[0]} alt={rp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="p-3">
                        <p className="text-white text-sm font-semibold line-clamp-2">{rp.title}</p>
                        <p className="text-[#ffd700] font-bold text-sm mt-2">{rp.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {customersAlsoViewed.length > 0 && (
              <div className="border-t border-[#d4af37]/20 p-6 md:p-8">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Customers Also Viewed</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {customersAlsoViewed.map(rp => (
                    <div
                      key={rp.id}
                      onClick={() => onSelectProduct && onSelectProduct(rp)}
                      className="min-w-[160px] group cursor-pointer bg-[#121212] border border-[#1c1c1c]/20 rounded-lg overflow-hidden hover:border-[#ffd700] transition-all"
                    >
                      <div className="relative h-28 overflow-hidden bg-[#0a0a0a]">
                        <img src={rp.images?.[0]} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="p-3">
                        <p className="text-white text-xs font-semibold line-clamp-1 group-hover:text-[#ffd700]">{rp.title}</p>
                        <p className="text-[#ffd700] font-bold text-sm mt-1">{rp.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(recommendations.length > 0 || loadingRecs) && (
              <div className="border-t border-yellow-600/20 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-yellow-600" />
                  <h3 className="font-bold text-white text-sm uppercase tracking-wide">AI-Powered Picks</h3>
                </div>
                {loadingRecs ? (
                  <div className="text-center py-4">
                    <p className="text-gray-400 text-sm">Analyzing similar products...</p>
                  </div>
                ) : (
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {recommendations.map(rp => (
                      <div
                        key={rp.id}
                        onClick={() => onSelectProduct?.(rp)}
                        className="min-w-[160px] group cursor-pointer bg-black border border-yellow-600/20 rounded-lg overflow-hidden hover:border-yellow-600/50 transition-all"
                      >
                        <div className="relative h-28 overflow-hidden bg-[#0a0a0a]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rp.images[0]}
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-3">
                          <p className="text-white text-xs font-semibold line-clamp-1 group-hover:text-yellow-600">
                            {rp.title}
                          </p>
                          <p className="text-yellow-600 font-bold text-sm mt-1">{rp.price}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={12} className="text-yellow-600" />
                            <span className="text-xs text-gray-400">{rp.rating?.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {sellerProducts.length > 0 && (
              <div className="border-t border-[#d4af37]/20 p-6 md:p-8">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">From this seller</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {sellerProducts.map(rp => (
                    <div
                      key={rp.id}
                      className="min-w-[160px] group cursor-pointer bg-[#121212] border border-[#d4af37]/20 rounded-lg overflow-hidden hover:border-[#ffd700] transition-all"
                    >
                      <div className="relative h-28 overflow-hidden bg-[#0a0a0a]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rp.images[0]}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-white text-xs font-semibold line-clamp-1 group-hover:text-[#ffd700]">
                          {rp.title}
                        </p>
                        <p className="text-[#ffd700] font-bold text-sm mt-1">{rp.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

