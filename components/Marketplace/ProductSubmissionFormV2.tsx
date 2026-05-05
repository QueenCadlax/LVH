import React, { useState, useEffect } from 'react';
import {
  ProductCategory,
  PRODUCT_CATEGORIES,
  ProductPricingTier,
  PRODUCT_PRICING_STRUCTURE,
  PRODUCT_REPORT_REASONS,
  type ProductSubmissionData,
  type ProductCondition
} from '@/types';

interface ProductSubmissionFormV2Props {
  onClose: () => void;
  onNavigate: (view: string) => void;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  currentPricingTier?: ProductPricingTier;
  productsListedThisMonth?: number;
}

const CONDITIONS: ProductCondition[] = ['New', 'Used', 'Refurbished', 'Like New'];

/**
 * ProductSubmissionFormV2 - 4-Step Marketplace Product Submission Form
 * Design: BLACK/GOLD/WHITE ONLY
 * Flow: Basics → Photos → Seller Info → Review & Confirm
 * Pricing: Monthly tiers (Entry R60, Starter R150, Pro R300) + One-Off R25
 * Auto-approve: Products live immediately, flagged for moderation
 */
export const ProductSubmissionFormV2: React.FC<ProductSubmissionFormV2Props> = ({
  onClose,
  onNavigate,
  sellerId,
  sellerName,
  sellerEmail,
  currentPricingTier = ProductPricingTier.ENTRY,
  productsListedThisMonth = 0
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState<ProductSubmissionData>({
    title: '',
    description: '',
    category: ProductCategory.FASHION,
    condition: 'New',
    price: '',
    priceValue: 0,
    stock: 1,
    images: [],
    sellerId,
    sellerName,
    sellerEmail,
    sellerPhone: '',
    sellerType: 'individual',
    pricingTier: currentPricingTier
  });

  // Product image preview
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedPricingTier, setSelectedPricingTier] = useState<ProductPricingTier>(currentPricingTier);

  // ========== STEP 1: BASICS ==========
  const handleBasicChange = (field: keyof ProductSubmissionData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      price: `R ${numValue.toLocaleString('en-ZA', { maximumFractionDigits: 2 })}`,
      priceValue: numValue
    }));
  };

  // ========== STEP 2: PHOTOS ==========
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxImages = 5;
    if (imagePreviews.length >= maxImages) {
      setSubmitError(`Maximum ${maxImages} images allowed`);
      return;
    }

    for (let i = 0; i < Math.min(files.length, maxImages - imagePreviews.length); i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImagePreviews(prev => [...prev, base64]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, base64]
        }));
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // ========== STEP 3: SELLER INFO ==========
  const handleSellerChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ========== STEP 4: REVIEW & SUBMIT ==========
  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setSubmitError('Product title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setSubmitError('Description is required');
      return false;
    }
    if (formData.priceValue <= 0) {
      setSubmitError('Valid price is required');
      return false;
    }
    if (imagePreviews.length === 0) {
      setSubmitError('At least one product image is required');
      return false;
    }
    if (!formData.sellerPhone.trim()) {
      setSubmitError('Seller phone number is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setSubmitError('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          pricingTier: selectedPricingTier,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + (PRODUCT_PRICING_STRUCTURE[selectedPricingTier]?.listing_duration_days || 30) * 24 * 60 * 60 * 1000),
          status: 'active'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit product');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        onNavigate('marketplace');
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if seller has reached quota
  const currentQuota = PRODUCT_PRICING_STRUCTURE[selectedPricingTier]?.products_per_month || 5;
  const canAddProduct = selectedPricingTier === ProductPricingTier.ENTRY
    ? productsListedThisMonth < 5
    : selectedPricingTier === ProductPricingTier.STARTER
    ? productsListedThisMonth < 20
    : selectedPricingTier === ProductPricingTier.PRO
    ? true
    : selectedPricingTier === ProductPricingTier.ONE_OFF
    ? true
    : productsListedThisMonth < currentQuota;

  // ========================
  // RENDER
  // ========================
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-black border border-white/20 rounded-lg shadow-2xl my-auto">
        {/* Header */}
        <div className="bg-black border-b border-white/20 px-6 py-4 flex justify-between items-center sticky top-0">
          <h2 className="text-xl font-bold text-white">
            {step === 1 && 'Product Basics'}
            {step === 2 && 'Product Photos'}
            {step === 3 && 'Seller Information'}
            {step === 4 && 'Review & Confirm'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2 px-6 py-4 border-b border-white/20">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded ${s <= step ? 'bg-[#D4AF37]' : 'bg-white/10'}`} />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          {submitSuccess && (
            <div className="bg-white/10 border border-white/30 rounded-lg p-4 mb-6 text-center">
              <p className="text-white font-semibold">✓ Product submitted successfully!</p>
              <p className="text-white/70 text-sm mt-1">Your product is now live on the marketplace</p>
            </div>
          )}

          {submitError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-center">
              <p className="text-red-400 text-sm">{submitError}</p>
            </div>
          )}

          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Product Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleBasicChange('title', e.target.value)}
                  placeholder="e.g., Samsung 55-inch Smart TV"
                  maxLength={100}
                  className="w-full bg-black border border-white/30 rounded px-4 py-2 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none transition-all duration-200 hover:border-white/50"
                />
                <p className="text-white/40 text-xs mt-1">{formData.title.length}/100</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleBasicChange('category', e.target.value)}
                  className="w-full bg-black border border-white/30 rounded px-4 py-2 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none transition-all duration-200 hover:border-white/50 cursor-pointer"
                >
                  {PRODUCT_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Condition <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => handleBasicChange('condition', e.target.value as ProductCondition)}
                  className="w-full bg-black border border-white/30 rounded px-4 py-2 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none transition-all duration-200 hover:border-white/50 cursor-pointer"
                >
                  {CONDITIONS.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm">
                    Price (ZAR) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={handlePriceChange}
                    placeholder="e.g., 5999"
                    className="w-full bg-black border border-white/30 rounded px-4 py-2 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none transition-all duration-200 hover:border-white/50"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm">
                    Quantity in Stock <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleBasicChange('stock', Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="999"
                    className="w-full bg-black border border-white/30 rounded px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-200 hover:border-white/50"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleBasicChange('description', e.target.value)}
                  placeholder="Describe your product in detail. Include brand, features, condition, etc."
                  maxLength={1000}
                  rows={5}
                  className="w-full bg-black border border-white/30 rounded px-4 py-2 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none transition-all duration-200 hover:border-white/50 resize-none"
                />
                <p className="text-white/40 text-xs mt-1">{formData.description.length}/1000</p>
              </div>
            </div>
          )}

          {/* STEP 2: PHOTOS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Product Images <span className="text-red-400">*</span>
                </label>
                <p className="text-white/60 text-xs mb-4">Upload 1-5 photos. First photo will be the main thumbnail.</p>

                {/* Image upload button */}
                <label className="block w-full border-2 border-dashed border-white/30 hover:border-[#D4AF37] rounded-lg p-6 text-center cursor-pointer transition-colors mb-4">
                  <div className="text-white/70 text-sm">
                    <p className="font-semibold mb-1">📷 Click to upload images</p>
                    <p className="text-xs text-white/50">JPG, PNG, WebP (max 5 images)</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={imagePreviews.length >= 5}
                  />
                </label>

                {/* Image previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-32 object-cover rounded border border-white/20"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                        {idx === 0 && (
                          <div className="absolute top-1 left-1 bg-[#D4AF37] text-black text-xs px-2 py-1 rounded font-semibold">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-white/40 text-xs mt-3">{imagePreviews.length}/5 images</p>
              </div>
            </div>
          )}

          {/* STEP 3: SELLER INFO */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Seller Name (prefilled) */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.sellerName}
                  disabled
                  className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white/60 opacity-60 cursor-not-allowed"
                />
              </div>

              {/* Seller Email (prefilled) */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.sellerEmail}
                  disabled
                  className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white/60 opacity-60 cursor-not-allowed"
                />
              </div>

              {/* Seller Phone */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  WhatsApp Number <span className="text-red-400">*</span>
                </label>
                <p className="text-xs text-white/60 mb-2">Buyers will contact you via WhatsApp. Format: +27 XX XXX XXXX</p>
                <input
                  type="tel"
                  value={formData.sellerPhone}
                  onChange={(e) => handleSellerChange('sellerPhone', e.target.value)}
                  placeholder="e.g., +27 72 123 4567"
                  className="w-full bg-black border border-white/30 rounded px-4 py-2 text-white placeholder-white/40 focus:border-[#D4AF37] focus:outline-none transition-all duration-200 hover:border-white/50"
                />
              </div>

              {/* Seller Type */}
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">
                  Seller Type <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.sellerType}
                  onChange={(e) => handleSellerChange('sellerType', e.target.value)}
                  className="w-full bg-black border border-white/30 rounded px-4 py-2 text-white focus:border-[#D4AF37] focus:outline-none transition-all duration-200 hover:border-white/50 cursor-pointer"
                >
                  <option value="individual">Individual Seller</option>
                  <option value="business">Business Seller</option>
                </select>
              </div>

              {/* Pricing Tier Selection */}
              <div>
                <label className="block text-white font-semibold mb-3 text-sm">
                  Choose Listing Duration <span className="text-red-400">*</span>
                </label>
                <div className="space-y-3">
                  {/* Entry */}
                  <label className="flex items-start p-4 border border-white/20 rounded cursor-pointer hover:border-[#D4AF37] transition-colors" style={{
                    backgroundColor: selectedPricingTier === ProductPricingTier.ENTRY ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
                  }}>
                    <input
                      type="radio"
                      name="pricing"
                      value={ProductPricingTier.ENTRY}
                      checked={selectedPricingTier === ProductPricingTier.ENTRY}
                      onChange={(e) => setSelectedPricingTier(e.target.value as ProductPricingTier)}
                      className="mt-1 accent-[#D4AF37]"
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-white font-semibold">Entry - 30 Days</p>
                      <p className="text-white/60 text-sm">5 products/month • Basic listing</p>
                      <p className="text-[#D4AF37] font-bold text-sm mt-1">R 60/month</p>
                    </div>
                  </label>

                  {/* Starter */}
                  <label className="flex items-start p-4 border border-white/20 rounded cursor-pointer hover:border-[#D4AF37] transition-colors" style={{
                    backgroundColor: selectedPricingTier === ProductPricingTier.STARTER ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
                  }}>
                    <input
                      type="radio"
                      name="pricing"
                      value={ProductPricingTier.STARTER}
                      checked={selectedPricingTier === ProductPricingTier.STARTER}
                      onChange={(e) => setSelectedPricingTier(e.target.value as ProductPricingTier)}
                      className="mt-1 accent-[#D4AF37]"
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-white font-semibold">Starter - 90 Days</p>
                      <p className="text-white/60 text-sm">20 products/month • Product analytics</p>
                      <p className="text-[#D4AF37] font-bold text-sm mt-1">R 150/month</p>
                    </div>
                  </label>

                  {/* Pro */}
                  <label className="flex items-start p-4 border border-white/20 rounded cursor-pointer hover:border-[#D4AF37] transition-colors" style={{
                    backgroundColor: selectedPricingTier === ProductPricingTier.PRO ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
                  }}>
                    <input
                      type="radio"
                      name="pricing"
                      value={ProductPricingTier.PRO}
                      checked={selectedPricingTier === ProductPricingTier.PRO}
                      onChange={(e) => setSelectedPricingTier(e.target.value as ProductPricingTier)}
                      className="mt-1 accent-[#D4AF37]"
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-white font-semibold">Pro - 365 Days</p>
                      <p className="text-white/60 text-sm">Unlimited products • Featured badge • Priority support</p>
                      <p className="text-[#D4AF37] font-bold text-sm mt-1">R 300/month</p>
                    </div>
                  </label>

                  {/* One-Off */}
                  <label className="flex items-start p-4 border border-white/20 rounded cursor-pointer hover:border-[#D4AF37] transition-colors" style={{
                    backgroundColor: selectedPricingTier === ProductPricingTier.ONE_OFF ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
                  }}>
                    <input
                      type="radio"
                      name="pricing"
                      value={ProductPricingTier.ONE_OFF}
                      checked={selectedPricingTier === ProductPricingTier.ONE_OFF}
                      onChange={(e) => setSelectedPricingTier(e.target.value as ProductPricingTier)}
                      className="mt-1 accent-[#D4AF37]"
                    />
                    <div className="ml-3 flex-1">
                      <p className="text-white font-semibold">One-Off - 30 Days</p>
                      <p className="text-white/60 text-sm">Perfect for occasional sellers • 1 product only</p>
                      <p className="text-[#D4AF37] font-bold text-sm mt-1">R 25 (one-time)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Product Summary */}
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h3 className="text-white font-bold mb-4">Product Summary</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white/60">Title</p>
                    <p className="text-white font-semibold">{formData.title}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Category</p>
                    <p className="text-white font-semibold">{formData.category}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-white/60">Condition</p>
                      <p className="text-white font-semibold">{formData.condition}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Price</p>
                      <p className="text-white font-semibold text-[#D4AF37]">{formData.price}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Stock</p>
                      <p className="text-white font-semibold">{formData.stock}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60">Description</p>
                    <p className="text-white">{formData.description}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Images</p>
                    <p className="text-white font-semibold">{imagePreviews.length} photo(s)</p>
                  </div>
                </div>
              </div>

              {/* Listing Duration Summary */}
              <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                <h3 className="text-white font-bold mb-4">Listing Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white/60">Plan</p>
                    <p className="text-white font-semibold">{PRODUCT_PRICING_STRUCTURE[selectedPricingTier]?.name}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Duration</p>
                    <p className="text-white font-semibold">{PRODUCT_PRICING_STRUCTURE[selectedPricingTier]?.listing_duration_days} days</p>
                  </div>
                  <div>
                    <p className="text-white/60">Cost</p>
                    <p className="text-white font-bold text-[#D4AF37]">
                      {selectedPricingTier === ProductPricingTier.ONE_OFF
                        ? 'R 35 (one-time)'
                        : `R ${PRODUCT_PRICING_STRUCTURE[selectedPricingTier]?.monthly_price || 0}/month`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Moderation Notice */}
              <div className="bg-gradient-to-r from-[#D4AF37]/5 to-white/5 border border-[#D4AF37]/30 rounded-lg p-4 shadow-lg hover:shadow-xl hover:from-[#D4AF37]/10 hover:to-white/10 transition-all duration-300">
                <p className="text-white/80 text-sm leading-relaxed">
                  <span className="text-[#D4AF37] font-semibold">⚡ Manual Review:</span> Your product will be reviewed by our team within 24 hours. We ensure all listings meet quality standards and protect against fraud. Approved products go live immediately.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="border-t border-white/20 px-6 py-4 bg-black/50 flex justify-between gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting}
              className="px-6 py-2 border border-white/40 text-white hover:border-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            >
              ← Back
            </button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-[#D4AF37] text-black font-semibold hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || submitSuccess}
              className="px-6 py-2 bg-[#D4AF37] text-black font-semibold hover:bg-[#E5C158] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'List Product'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSubmissionFormV2;
