import React, { useState } from 'react';
import { ChevronLeft, Upload, Check, Sparkles, FileText, Shield, Plus, Lightbulb, AlertCircle, Eye } from 'lucide-react';
import { AMENITIES_OPTIONS, OPERATING_HOURS_TEMPLATE, PACKAGE_PRICING } from '../types';

interface BusinessSubmissionFormProps {
  onClose: () => void;
  onNavigate?: (view: string) => void;
}

type Step = 'info' | 'media' | 'services' | 'package' | 'submit';

// Helper function to get AI suggestions
const getAISuggestions = async (field: string, currentValue: string): Promise<string> => {
  try {
    const suggestions: Record<string, string> = {
      businessName: "Pro tip: Include your specialty or location in the name (e.g., 'Kuka Café - Mbombela')",
      description: "Pro tip: Mention your specialty, years of experience, and what makes you unique. Keep it to 2-3 sentences.",
      services: "Pro tip: List your top 3-5 services. Be specific (e.g., 'Hair coloring, extensions, treatments')",
      phone: "Pro tip: This is how customers reach you. Ensure it's monitored during business hours.",
      images: "Pro tip: Include storefront, team, products/services in action. Use professional, well-lit photos."
    };
    return suggestions[field] || "Share helpful information to attract customers.";
  } catch (error) {
    console.error('AI suggestion error:', error);
    return '';
  }
};

export default function BusinessSubmissionForm({ onClose, onNavigate }: BusinessSubmissionFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showAIHelp, setShowAIHelp] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string>>({});

  // Step 1: Business Info
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // Step 2: Media & Files (ENHANCED - MULTIPLE DOCUMENTS)
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [businessRegistration, setBusinessRegistration] = useState<{name: string; size: string} | null>(null);
  const [ownerIdPassport, setOwnerIdPassport] = useState<{name: string; size: string} | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<Array<{name: string; size: string}>>([]);
  const [menuUrl, setMenuUrl] = useState('');

  // Step 3: Services & Hours
  const [operatingHours, setOperatingHours] = useState(OPERATING_HOURS_TEMPLATE);
  const [services, setServices] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [restaurantReservations, setRestaurantReservations] = useState(false);
  const [restaurantDietaryOptions, setRestaurantDietaryOptions] = useState<string[]>([]);

  // Step 4: Package
  const [selectedPackage, setSelectedPackage] = useState<'essential' | 'professional' | 'platinum'>('professional');
  const [packageAmount, setPackageAmount] = useState(PACKAGE_PRICING.professional);

  const categoryOptions: Record<string, string[]> = {
    'Restaurant': ['Fine Dining', 'Casual Dining', 'Fast Food', 'Bakery', 'Cafe', 'Pizzeria', 'Steakhouse', 'Indian', 'Chinese', 'Italian'],
    'Hair Salon': ['Women\'s Salon', 'Men\'s Barber', 'Unisex', 'Hair Treatment'],
    'Real Estate': ['Residential', 'Commercial', 'Land', 'Apartment', 'House', 'Office'],
    'Retail': ['Clothing', 'Grocery', 'Electronics', 'Furniture', 'Books'],
    'Spa & Wellness': ['Massage', 'Facial', 'Wellness Center', 'Gym'],
    'Hotel & Lodging': ['Hotel', 'Guest House', 'Bed & Breakfast'],
    'Automotive': ['Car Dealer', 'Repair Shop', 'Car Rental', 'Gas Station'],
    'Professional Services': ['Lawyer', 'Accountant', 'Consultant', 'Architect'],
    'Medical': ['Clinic', 'Hospital', 'Pharmacy', 'Dentist', 'Eye Care'],
    'Transportation': ['Taxi Service', 'Bus Service', 'Car Rental', 'Courier']
  };

  const subCategories = categoryOptions[category] || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file, idx) => 
        `image-${Date.now()}-${idx}`
      );
      setImages([...images, ...newImages]);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: 'registration' | 'ownerId' | 'additional') => {
    const file = e.target.files?.[0];
    if (file) {
      const fileInfo = { name: file.name, size: `${(file.size / 1024).toFixed(0)} KB` };
      if (docType === 'registration') setBusinessRegistration(fileInfo);
      if (docType === 'ownerId') setOwnerIdPassport(fileInfo);
      if (docType === 'additional') setAdditionalDocs([...additionalDocs, fileInfo]);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handlePackageSelect = (pkg: 'essential' | 'professional' | 'platinum') => {
    setSelectedPackage(pkg);
    setPackageAmount(PACKAGE_PRICING[pkg]);
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 'info':
        return !!(businessName && category && location && contactPhone);
      case 'media':
        return images.length > 0 && !!(businessRegistration && ownerIdPassport);
      case 'services':
        return true;
      case 'package':
        return !!selectedPackage;
      case 'submit':
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        business_name: businessName,
        category,
        sub_category: subCategory,
        location,
        address,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        description,
        operating_hours: operatingHours,
        services,
        amenities,
        menu_url: menuUrl,
        logo_url: logoUrl,
        images,
        videos,
        business_registration: businessRegistration?.name,
        owner_id_passport: ownerIdPassport?.name,
        additional_documents: additionalDocs.map(d => d.name),
        facebook_url: facebookUrl,
        instagram_url: instagramUrl,
        twitter_url: twitterUrl,
        tiktok_url: tiktokUrl,
        linkedin_url: linkedinUrl,
        youtube_url: youtubeUrl,
        website_url: websiteUrl,
        selected_package: selectedPackage,
        package_amount: packageAmount,
        restaurant_reservations: category === 'Restaurant' ? restaurantReservations : null,
        dietary_options: category === 'Restaurant' ? restaurantDietaryOptions : []
      };

      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      setSubmitSuccess(true);
      setTimeout(() => onClose(), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit business');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = {
    'info': { icon: '🏢', title: 'Your Business Identity', subtitle: 'Build trust with professional information' },
    'media': { icon: '📸', title: 'Visual Showcase', subtitle: 'Impress customers with professional imagery' },
    'services': { icon: '✨', title: 'Excellence Offered', subtitle: 'Detail your services and expertise' },
    'package': { icon: '👑', title: 'Premium Package', subtitle: 'Choose your visibility level' },
    'submit': { icon: '✓', title: 'Final Review', subtitle: 'Confirm your luxury listing' }
  };

  const currentStepInfo = stepTitles[currentStep];
  const stepIndex = ['info', 'media', 'services', 'package', 'submit'].indexOf(currentStep);
  const progressPercent = ((stepIndex + 1) / 5) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-black rounded-xl max-w-3xl w-full max-h-[95vh] overflow-y-auto border border-yellow-600/30">
        {/* Enhanced Header with Step Indicators */}
        <div className="sticky top-0 bg-gradient-to-r from-black to-gray-900 text-white p-6 border-b border-yellow-600/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {currentStepInfo.icon} {currentStepInfo.title}
              </h2>
              <p className="text-yellow-500 text-sm mt-1">{currentStepInfo.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-yellow-600 hover:bg-yellow-600/10 p-2 rounded-full transition"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-yellow-500 text-xs mt-2">Step {stepIndex + 1} of 5 - {Math.round(progressPercent)}%</p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-gradient-to-r from-yellow-600/10 to-yellow-500/10 border border-yellow-600/30 p-8 m-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <Check className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">✓ Listing Submitted Successfully!</h3>
                <p className="text-yellow-500 text-sm">Your application is under review</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-300 text-sm ml-12">
              <p>📧 Step 1: Confirmation email sent to you</p>
              <p>👀 Step 2: Our team reviews (2-5 business days)</p>
              <p>💳 Step 3: Pay invoice (link in email)</p>
              <p>🎉 Step 4: Go live on LowveldHub</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-8 bg-black space-y-6">
          {error && (
            <div className="bg-red-600/20 border border-red-600/50 text-red-400 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">To proceed, we need:</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* STEP 1: BUSINESS IDENTITY */}
          {currentStep === 'info' && (
            <div className="space-y-6">
              {/* Business Basics Card */}
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  Business Basics
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white flex justify-between">
                      <span>Business Name *</span>
                      <button onClick={() => setShowAIHelp('businessName')} className="text-yellow-600 text-xs hover:text-yellow-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI Help
                      </button>
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 outline-none text-white placeholder-gray-500 transition"
                      placeholder="e.g., Kuka Café - Premium Coffee Experience"
                    />
                    {showAIHelp === 'businessName' && (
                      <div className="bg-yellow-600/10 border border-yellow-600/30 rounded p-3 mt-2 text-xs text-gray-300">
                        💡 {aiSuggestions['businessName'] || "Pro tip: Include your specialty or location in the name"}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Category *</label>
                      <select
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setSubCategory('');
                        }}
                        className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 outline-none text-white transition"
                      >
                        <option value="">Select Category</option>
                        {Object.keys(categoryOptions).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {subCategories.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Sub-Category</label>
                        <select
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                          className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 outline-none text-white transition"
                        >
                          <option value="">Select Sub-Category</option>
                          {subCategories.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Location & Contact Card */}
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  📍 Location & Contact
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Location / City *</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-gray-500 transition"
                      placeholder="e.g., Mbombela"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Full Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-gray-500 transition"
                      placeholder="Street address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Preferred Contact Number *</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-gray-500 transition"
                      placeholder="+27 ..."
                    />
                    <p className="text-xs text-gray-400 mt-1">💡 Ensure it's monitored during business hours</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-gray-500 transition"
                      placeholder="info@business.com"
                    />
                  </div>
                </div>
              </div>

              {/* Your Story Card */}
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  ✍️ Your Story: What Makes You Unique
                </h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-gray-500 transition"
                  placeholder="Describe your business, unique value, and what customers love about you..."
                />
                <p className="text-xs text-gray-400 mt-2">💡 Mention your specialty, experience, or what sets you apart. 2-3 sentences recommended.</p>
              </div>

              {/* Social Media Card */}
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4">🌐 Connect With Customers (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="Website" className="bg-gray-900 border border-yellow-600/30 rounded-lg p-3 text-white placeholder-gray-500 text-sm" />
                  <input type="url" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} placeholder="Facebook" className="bg-gray-900 border border-yellow-600/30 rounded-lg p-3 text-white placeholder-gray-500 text-sm" />
                  <input type="url" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="Instagram" className="bg-gray-900 border border-yellow-600/30 rounded-lg p-3 text-white placeholder-gray-500 text-sm" />
                  <input type="url" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="Twitter/X" className="bg-gray-900 border border-yellow-600/30 rounded-lg p-3 text-white placeholder-gray-500 text-sm" />
                  <input type="url" value={tiktokUrl} onChange={(e) => setTiktokUrl(e.target.value)} placeholder="TikTok" className="bg-gray-900 border border-yellow-600/30 rounded-lg p-3 text-white placeholder-gray-500 text-sm" />
                  <input type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="LinkedIn" className="bg-gray-900 border border-yellow-600/30 rounded-lg p-3 text-white placeholder-gray-500 text-sm" />
                  <input type="url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="YouTube" className="bg-gray-900 border border-yellow-600/30 rounded-lg p-3 text-white placeholder-gray-500 text-sm col-span-2" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: VISUAL SHOWCASE WITH ENHANCED DOCUMENTS */}
          {currentStep === 'media' && (
            <div className="space-y-6">
              {/* Logo & Images */}
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4">🖼️ Showcase Your Business</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Business Logo (Optional)</label>
                    <label className="border-2 border-dashed border-yellow-600/50 rounded-lg p-6 cursor-pointer hover:border-yellow-600 hover:bg-yellow-600/5 transition block text-center">
                      <Upload className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                      <span className="text-sm text-gray-300">Click to upload logo</span>
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setLogoUrl(`logo-${Date.now()}`);
                      }} className="hidden" />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Professional Images * (Min 1)</label>
                    <label className="border-2 border-dashed border-yellow-600/50 rounded-lg p-6 cursor-pointer hover:border-yellow-600 hover:bg-yellow-600/5 transition block text-center">
                      <Upload className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                      <span className="text-sm text-gray-300">Showcase your business</span>
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <p className="text-xs text-gray-400 mt-2">💡 Use well-lit, professional photos: storefront, team, products/services</p>
                    {images.length > 0 && <div className="mt-3 text-yellow-600 text-sm">✓ {images.length} image(s) uploaded</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Videos (Optional)</label>
                    <label className="border-2 border-dashed border-yellow-600/50 rounded-lg p-6 cursor-pointer hover:border-yellow-600 hover:bg-yellow-600/5 transition block text-center">
                      <Upload className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                      <span className="text-sm text-gray-300">Showcase your products/services in action</span>
                      <input type="file" multiple accept="video/*" onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          const newVideos = Array.from(files).map((_, idx) => `video-${Date.now()}-${idx}`);
                          setVideos([...videos, ...newVideos]);
                        }
                      }} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* ENHANCED: LEGAL DOCUMENTATION SECTION */}
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  📑 Legal Documentation
                  <span className="text-xs text-yellow-500">Verify your legitimacy & ownership</span>
                </h3>

                <div className="space-y-4">
                  {/* Business Registration */}
                  <div className="border border-yellow-600/20 rounded-lg p-4 bg-black/50">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-yellow-600" />
                        Business Registration Certificate *
                      </label>
                      <span className="text-xs text-yellow-600">REQUIRED</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">CIPC Certificate or Certificate of Registration</p>
                    <label className="border-2 border-dashed border-yellow-600/50 rounded-lg p-4 cursor-pointer hover:border-yellow-600 transition block text-center">
                      <Upload className="w-6 h-6 mx-auto text-yellow-600 mb-1" />
                      <span className="text-xs text-gray-300">Click to upload</span>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleDocumentUpload(e, 'registration')} className="hidden" />
                    </label>
                    {businessRegistration && (
                      <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
                        ✓ {businessRegistration.name} ({businessRegistration.size})
                      </p>
                    )}
                  </div>

                  {/* Owner ID / Passport */}
                  <div className="border border-yellow-600/20 rounded-lg p-4 bg-black/50">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-white flex items-center gap-2">
                        <Shield className="w-4 h-4 text-yellow-600" />
                        Owner ID / Passport *
                      </label>
                      <span className="text-xs text-yellow-600">REQUIRED</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">Valid ID Book, Driver's License, or Passport (clear, readable scan)</p>
                    <label className="border-2 border-dashed border-yellow-600/50 rounded-lg p-4 cursor-pointer hover:border-yellow-600 transition block text-center">
                      <Upload className="w-6 h-6 mx-auto text-yellow-600 mb-1" />
                      <span className="text-xs text-gray-300">Click to upload</span>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleDocumentUpload(e, 'ownerId')} className="hidden" />
                    </label>
                    {ownerIdPassport && (
                      <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
                        ✓ {ownerIdPassport.name} ({ownerIdPassport.size})
                      </p>
                    )}
                  </div>

                  {/* Additional Documents */}
                  <div className="border border-yellow-600/20 rounded-lg p-4 bg-black/50">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-white flex items-center gap-2">
                        <Plus className="w-4 h-4 text-yellow-600" />
                        Additional Documents (Optional)
                      </label>
                      <span className="text-xs text-gray-400">OPTIONAL</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">Lease Agreement, Tax Certificate, Liquor License, etc.</p>
                    <label className="border-2 border-dashed border-yellow-600/50 rounded-lg p-4 cursor-pointer hover:border-yellow-600 transition block text-center">
                      <Upload className="w-6 h-6 mx-auto text-yellow-600 mb-1" />
                      <span className="text-xs text-gray-300">Click to add more documents (upload multiple)</span>
                      <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          Array.from(files).forEach(file => {
                            handleDocumentUpload({target: {files: [file]}} as any, 'additional');
                          });
                        }
                      }} className="hidden" />
                    </label>
                    {additionalDocs.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {additionalDocs.map((doc, idx) => (
                          <p key={idx} className="text-xs text-yellow-600 flex items-center gap-1">
                            ✓ {doc.name} ({doc.size})
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Status Summary */}
                <div className="mt-6 bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
                  <p className="text-sm font-medium text-white mb-2">📋 Documentation Status:</p>
                  <div className="space-y-1 text-xs text-gray-300">
                    <p className={businessRegistration ? 'text-yellow-600' : 'text-gray-400'}>✓ Business Registration: {businessRegistration ? 'Uploaded' : 'Pending'}</p>
                    <p className={ownerIdPassport ? 'text-yellow-600' : 'text-gray-400'}>✓ Owner ID/Passport: {ownerIdPassport ? 'Uploaded' : 'Pending'}</p>
                    <p className="text-gray-400">✓ Additional Documents: {additionalDocs.length} uploaded</p>
                  </div>
                </div>
              </div>

              {/* Menu for Restaurants */}
              {category === 'Restaurant' && (
                <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                  <h3 className="font-bold text-white mb-4">Menu (Optional)</h3>
                  <label className="border-2 border-dashed border-yellow-600/50 rounded-lg p-6 cursor-pointer hover:border-yellow-600 hover:bg-yellow-600/5 transition block text-center">
                    <Upload className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                    <span className="text-sm text-gray-300">Upload your menu (PDF or image)</span>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleDocumentUpload(e, 'registration')} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: EXCELLENCE OFFERED */}
          {currentStep === 'services' && (
            <div className="space-y-6">
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4">✨ Excellence Offered: Core Services & Expertise</h3>
                <textarea
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-900 border border-yellow-600/30 rounded-lg p-3 focus:ring-2 focus:ring-yellow-600 outline-none text-white placeholder-gray-500 transition"
                  placeholder="List your top services. E.g., 'Hair coloring, extensions, treatments, styling, blowouts'"
                />
                <p className="text-xs text-gray-400 mt-2">💡 Be specific. Your top 3-5 services attract the right customers.</p>
              </div>

              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4">🏢 Facilities & Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {AMENITIES_OPTIONS.map(amenity => (
                    <label key={amenity} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-yellow-600/10 transition">
                      <input
                        type="checkbox"
                        checked={amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-4 h-4 rounded border-yellow-600 accent-yellow-600"
                      />
                      <span className="ml-2 text-sm text-gray-300">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <h3 className="font-bold text-white mb-4">⏰ Operating Hours</h3>
                <div className="space-y-3">
                  {Object.entries(operatingHours).map(([day, hours]: any) => (
                    <div key={day} className="flex items-center gap-4 p-3 rounded-lg bg-gray-900/50 border border-yellow-600/20">
                      <span className="w-20 text-sm font-medium text-gray-300 capitalize">{day}</span>
                      {typeof hours === 'object' && 'open' in hours ? (
                        <>
                          <input type="time" value={(hours as any).open} onChange={(e) => setOperatingHours({...operatingHours, [day]: {...hours, open: e.target.value}})} className="bg-gray-800 border border-yellow-600/30 rounded px-2 py-1 text-sm text-white" />
                          <span className="text-gray-400">to</span>
                          <input type="time" value={(hours as any).close} onChange={(e) => setOperatingHours({...operatingHours, [day]: {...hours, close: e.target.value}})} className="bg-gray-800 border border-yellow-600/30 rounded px-2 py-1 text-sm text-white" />
                        </>
                      ) : (
                        <span className="text-gray-500 text-sm">{hours}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Restaurant Specific */}
              {category === 'Restaurant' && (
                <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                  <h3 className="font-bold text-white mb-4">Restaurant Specialties</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-3">Dietary Options Available</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Dairy-Free'].map(option => (
                          <label key={option} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-yellow-600/10 transition">
                            <input
                              type="checkbox"
                              checked={restaurantDietaryOptions.includes(option)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setRestaurantDietaryOptions([...restaurantDietaryOptions, option]);
                                } else {
                                  setRestaurantDietaryOptions(restaurantDietaryOptions.filter(o => o !== option));
                                }
                              }}
                              className="w-4 h-4 rounded border-yellow-600 accent-yellow-600"
                            />
                            <span className="ml-2 text-sm text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg bg-yellow-600/10 border border-yellow-600/30">
                      <input
                        type="checkbox"
                        checked={restaurantReservations}
                        onChange={(e) => setRestaurantReservations(e.target.checked)}
                        className="w-5 h-5 rounded border-yellow-600 accent-yellow-600"
                      />
                      <span className="text-sm font-medium text-white">We Accept Table Reservations</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: PREMIUM PACKAGE */}
          {currentStep === 'package' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-white text-lg font-bold mb-2">Choose Your Premium Package</h3>
                <p className="text-gray-400 text-sm">Unlock the visibility your business deserves</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['essential', 'professional', 'platinum'] as const).map((pkg) => (
                  <div
                    key={pkg}
                    onClick={() => handlePackageSelect(pkg)}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition ${
                      selectedPackage === pkg
                        ? 'border-yellow-600 bg-gradient-to-br from-yellow-600/10 to-transparent'
                        : 'border-gray-700 hover:border-yellow-600/50'
                    }`}
                  >
                    {pkg === 'professional' && <div className="bg-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">RECOMMENDED</div>}
                    <h4 className="font-bold text-lg text-white capitalize mb-2">{pkg}</h4>
                    <p className="text-3xl font-bold text-yellow-600 mb-4">R{PACKAGE_PRICING[pkg]}</p>
                    <ul className="text-sm space-y-2 text-gray-300">
                      {pkg === 'essential' && (
                        <>
                          <li>✓ Basic listing</li>
                          <li>✓ Up to 10 photos</li>
                          <li>✓ Contact info</li>
                          <li>✓ Operating hours</li>
                        </>
                      )}
                      {pkg === 'professional' && (
                        <>
                          <li>✓ Featured listing</li>
                          <li>✓ Unlimited photos & videos</li>
                          <li>✓ Menu & services</li>
                          <li>✓ Amenities list</li>
                          <li>✓ Premium badge</li>
                        </>
                      )}
                      {pkg === 'platinum' && (
                        <>
                          <li>✓ VIP placement</li>
                          <li>✓ All Professional features</li>
                          <li>✓ Analytics dashboard</li>
                          <li>✓ Priority support</li>
                          <li>✓ Purple luxury badge</li>
                        </>
                      )}
                    </ul>
                    {selectedPackage === pkg && (
                      <div className="mt-4 bg-yellow-600 text-black py-2 px-4 rounded-lg text-center font-bold text-sm">
                        ✓ Selected
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: FINAL REVIEW */}
          {currentStep === 'submit' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Details Card */}
                <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                  <h4 className="font-bold text-white mb-4 flex items-center justify-between">
                    🏢 Business Details
                    <button className="text-xs text-yellow-600 hover:text-yellow-500">Edit</button>
                  </h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><span className="text-yellow-600">Business:</span> {businessName}</p>
                    <p><span className="text-yellow-600">Category:</span> {category} {subCategory && `(${subCategory})`}</p>
                    <p><span className="text-yellow-600">Location:</span> {location}</p>
                    <p><span className="text-yellow-600">Contact:</span> {contactPhone}</p>
                  </div>
                </div>

                {/* Media & Documents Card */}
                <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                  <h4 className="font-bold text-white mb-4 flex items-center justify-between">
                    📸 Media & Documents
                    <button className="text-xs text-yellow-600 hover:text-yellow-500">Edit</button>
                  </h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="text-yellow-600">✓ {images.length} image(s) uploaded</p>
                    {businessRegistration && <p className="text-yellow-600">✓ Business Registration</p>}
                    {ownerIdPassport && <p className="text-yellow-600">✓ Owner ID/Passport</p>}
                    {additionalDocs.length > 0 && <p className="text-yellow-600">✓ {additionalDocs.length} additional doc(s)</p>}
                  </div>
                </div>

                {/* Services Card */}
                <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                  <h4 className="font-bold text-white mb-4 flex items-center justify-between">
                    ✨ Services & Hours
                    <button className="text-xs text-yellow-600 hover:text-yellow-500">Edit</button>
                  </h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="line-clamp-2"><span className="text-yellow-600">Services:</span> {services || 'Not specified'}</p>
                    <p><span className="text-yellow-600">Amenities:</span> {amenities.length > 0 ? amenities.slice(0, 2).join(', ') + '...' : 'None'}</p>
                  </div>
                </div>

                {/* Your Package Card */}
                <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                  <h4 className="font-bold text-white mb-4 flex items-center justify-between">
                    👑 Your Package
                    <button className="text-xs text-yellow-600 hover:text-yellow-500">Edit</button>
                  </h4>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-yellow-600 capitalize">{selectedPackage}</p>
                    <p className="text-2xl font-bold text-white">R{packageAmount}/year</p>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-gradient-to-br from-yellow-600/5 to-transparent">
                <p className="text-sm text-yellow-600 font-medium mb-3">✓ By submitting, you confirm:</p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• All information is accurate and complete</li>
                  <li>• You own or are authorized to manage this business</li>
                  <li>• Our team will review within 2-5 business days</li>
                  <li>• You will be contacted via email with next steps</li>
                </ul>
              </div>

              {/* Next Steps */}
              <div className="border border-yellow-600/30 rounded-lg p-6 bg-yellow-600/10">
                <p className="text-white font-bold mb-3">📧 What Happens Next:</p>
                <ol className="text-sm text-gray-300 space-y-2 pl-5 list-decimal">
                  <li>Confirmation email sent immediately</li>
                  <li>Our team verifies your business details</li>
                  <li>You receive invoice with payment link</li>
                  <li>After payment, your listing goes LIVE 🎉</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-gradient-to-r from-black to-gray-900 border-t border-yellow-600/30 p-6 flex items-center justify-between">
          <button
            onClick={() => {
              const steps: Step[] = ['info', 'media', 'services', 'package', 'submit'];
              const currentIdx = steps.indexOf(currentStep);
              if (currentIdx > 0) setCurrentStep(steps[currentIdx - 1]);
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-yellow-600 hover:bg-yellow-600/10 rounded-lg transition disabled:opacity-50"
            disabled={currentStep === 'info'}
          >
            <ChevronLeft className="w-5 h-5" />
            ← Previous
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-800 hover:text-yellow-600 transition"
            >
              ✕ Close
            </button>

            {currentStep !== 'submit' && (
              <button
                onClick={() => {
                  if (validateStep()) {
                    const steps: Step[] = ['info', 'media', 'services', 'package', 'submit'];
                    const currentIdx = steps.indexOf(currentStep);
                    if (currentIdx < steps.length - 1) setCurrentStep(steps[currentIdx + 1]);
                  } else {
                    setError('Please complete all required fields');
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition font-bold"
              >
                Continue →
              </button>
            )}

            {currentStep === 'submit' && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || submitSuccess}
                className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-yellow-600/50"
              >
                {isSubmitting ? 'Processing...' : '✓ Complete Your Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
