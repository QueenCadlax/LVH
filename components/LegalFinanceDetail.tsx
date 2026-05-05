import React, { useMemo } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Award,
  Briefcase,
} from 'lucide-react';
import { Business } from '../types';

interface LegalFinanceDetailProps {
  id?: string;
  navigate: (view: string, category?: string, id?: string) => void;
  businesses: Business[];
}

interface MockProfessional {
  id: string;
  name: string;
  type: string;
  specialization: string;
  description: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  services: string[];
  expertise: string;
}

const LegalFinanceDetail: React.FC<LegalFinanceDetailProps> = ({ id, navigate, businesses }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Find the professional
  const professional = useMemo(() => {
    const mockProfessionals: MockProfessional[] = [
      {
        id: 'lf_mokoena_1',
        name: 'Mokoena & Associates',
        type: 'Corporate Law Firm',
        specialization: 'Corporate Law',
        description:
          'Experienced corporate law firm specializing in mergers, acquisitions, and business contracts. Serving Mpumalanga for over 12 years.',
        rating: 4.9,
        reviewCount: 127,
        location: 'Mbombela',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        services: ['Mergers & Acquisitions', 'Business Contracts', 'Corporate Advisory', 'Contract Negotiations'],
        expertise: 'Specializes in mergers, acquisitions, and complex business transactions for both local and international clients.',
      },
      {
        id: 'lf_thulani_2',
        name: 'Thulani & Associates',
        type: 'Criminal Defense',
        specialization: 'Criminal Defense',
        description:
          'Specialized in criminal defense with over 15 years of courtroom experience. Dedicated to protecting client rights.',
        rating: 4.8,
        reviewCount: 95,
        location: 'Nelspruit',
        image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=800&h=600&fit=crop',
        services: ['Criminal Defense', 'Bail Applications', 'Appeals', 'Court Representation'],
        expertise:
          'Expert criminal defense attorney with extensive courtroom experience and proven track record of successful cases.',
      },
      {
        id: 'lf_dejager_3',
        name: 'De Jager Accounting',
        type: 'Accounting Firm',
        specialization: 'Accounting & Tax',
        description:
          'Full-service accounting firm offering tax planning, audits, and compliance services. SAICA approved partners.',
        rating: 4.9,
        reviewCount: 156,
        location: 'Hazyview',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        services: ['Annual Audits', 'Tax Planning', 'Compliance', 'Financial Advisory'],
        expertise: 'SAICA-approved accounting firm with expertise in IFRS, tax compliance, and management accounting.',
      },
      {
        id: 'lf_wealth_4',
        name: 'Wealth Management Solutions',
        type: 'Financial Advisory',
        specialization: 'Wealth Management',
        description:
          'Investment advisory and wealth management for high-net-worth individuals. Building generational wealth since 2010.',
        rating: 4.8,
        reviewCount: 102,
        location: 'White River',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        services: ['Investment Planning', 'Retirement Planning', 'Estate Planning', 'Portfolio Management'],
        expertise: 'Financial planners specializing in wealth preservation and growth strategies for high-net-worth clients.',
      },
      {
        id: 'lf_property_5',
        name: 'Property Law Specialists',
        type: 'Property Law',
        specialization: 'Property Law',
        description:
          'Expert property law services for residential and commercial transactions. Full conveyancing support available.',
        rating: 4.7,
        reviewCount: 134,
        location: 'Mbombela',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        services: ['Property Conveyancing', 'Title Transfers', 'Lease Agreements', 'Due Diligence'],
        expertise: 'Specialists in property transactions with deep knowledge of Mpumalanga property market.',
      },
      {
        id: 'lf_tax_6',
        name: 'Mpumalanga Tax Consultants',
        type: 'Tax Consulting',
        specialization: 'Tax Consulting',
        description:
          'Comprehensive tax consulting and strategic tax planning services. SARS-registered representatives.',
        rating: 4.8,
        reviewCount: 98,
        location: 'Nelspruit',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        services: ['Tax Returns', 'Tax Planning', 'SARS Audits', 'VAT Registration'],
        expertise: 'SARS-registered tax advisors with expertise in business and personal tax optimization.',
      },
      {
        id: 'lf_family_7',
        name: 'Family Law Centre',
        type: 'Family Law',
        specialization: 'Family Law',
        description:
          'Compassionate family law services covering divorce, custody, and mediation. Client-focused approach.',
        rating: 4.9,
        reviewCount: 143,
        location: 'White River',
        image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=800&h=600&fit=crop',
        services: ['Divorce Proceedings', 'Custody Mediation', 'Maintenance Agreements', 'Collaborative Divorce'],
        expertise: 'Experienced family law specialists skilled in mediation and dispute resolution.',
      },
      {
        id: 'lf_insurance_8',
        name: 'Premier Insurance Brokers',
        type: 'Insurance Brokerage',
        specialization: 'Insurance Brokerage',
        description:
          'Professional insurance brokerage for personal and business coverage. Independent broker with multiple insurers.',
        rating: 4.7,
        reviewCount: 112,
        location: 'Hazyview',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        services: ['Commercial Insurance', 'Professional Indemnity', 'Risk Management', 'Claims Assistance'],
        expertise: 'Independent insurance brokers with access to top insurers and competitive rates.',
      },
    ];

    return mockProfessionals.find((p) => p.id === id);
  }, [id]);

  // Gallery images - rotate through related images
  const galleryImages = [
    professional?.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507842217343-583f20270319?w=800&h=600&fit=crop',
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  // Scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!professional) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-2xl font-serif text-white mb-4">Professional Not Found</h1>
          <button
            onClick={() => navigate('legal-finance')}
            className="px-6 py-3 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors"
          >
            ← Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const isPlatinum = professional.tier === 'platinum';
  const isElite = professional.tier === 'elite';

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('legal-finance')}
          className="mb-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Directory
        </button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - Gallery & Main Info */}
          <div className="lg:col-span-2">
            {/* GALLERY */}
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <div className="bg-gradient-to-br from-amber-900 to-yellow-900 h-96 relative">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={professional.name}
                  className="w-full h-full object-cover"
                />

                {/* Gallery Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {galleryImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-yellow-400 w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Tier Badge */}
              {isElite && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-black rounded-full text-xs font-bold">
                  ⭐ Elite
                </div>
              )}
              {isPlatinum && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">
                  ♕ Platinum
                </div>
              )}
            </div>

            {/* TAB SECTION */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Tab Buttons */}
              <div className="flex border-b border-white/10">
                {['overview', 'services', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-4 font-semibold text-sm uppercase transition-all ${
                      activeTab === tab
                        ? 'text-yellow-400 border-b-2 border-yellow-400 bg-white/5'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* About Section */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-3">About</h3>
                      <p className="text-gray-300 leading-relaxed text-sm">{professional.description}</p>
                    </div>

                    {/* Expertise Section */}
                    {professional.expertise && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="text-yellow-400" size={20} />
                          <h3 className="text-lg font-bold text-white">Expertise</h3>
                        </div>
                        <p className="text-gray-300 text-sm">
                          {professional.expertise}
                        </p>
                      </div>
                    )}

                    {/* Service Area */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="text-yellow-400" size={20} />
                        <h3 className="text-lg font-bold text-white">Service Area</h3>
                      </div>
                      <p className="text-gray-300 text-sm">{professional.location} and surrounding areas</p>
                    </div>
                  </div>
                )}

                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Services Offered</h3>
                    <div className="space-y-3">
                      {professional.services &&
                        professional.services.map((service, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-black/50 rounded-lg">
                            <CheckCircle className="text-yellow-400 flex-shrink-0" size={20} />
                            <span className="text-gray-300 text-sm">{service}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Mr. Khumalo',
                        rating: 5,
                        text: 'Highly professional and knowledgeable. Resolved our matter efficiently.',
                      },
                      {
                        name: 'Ms. Van der Merwe',
                        rating: 4.8,
                        text: 'Excellent service and very responsive. Would definitely recommend.',
                      },
                      {
                        name: 'Mr. Mthembu',
                        rating: 5,
                        text: 'Outstanding support and guidance. Couldn\'t have done it without their expertise.',
                      },
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
            </div>
          </div>

          {/* RIGHT COLUMN - SIDEBAR */}
          <div className="lg:col-span-1">
            {/* Sticky Sidebar */}
            <div className="sticky top-24 space-y-4">
              {/* Header Info */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-white mb-1">{professional.name}</h1>
                <p className="text-sm text-gray-400 mb-4">
                  {professional.specialization || professional.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < Math.floor(professional.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">{professional.rating?.toFixed(1) || '4.5'}</span>
                  <span className="text-xs text-gray-400">({professional.reviewCount || 0} reviews)</span>
                </div>

                {/* Verified Badge */}
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30 text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircle className="text-green-400" size={18} />
                    <span className="text-sm font-bold text-green-400">Verified Provider</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Trusted by {professional.reviewCount || '100'}+ clients
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <a
                    href="tel:+27137551234"
                    className="flex items-center gap-3 p-3 bg-yellow-400/10 hover:bg-yellow-400/20 rounded-lg transition-colors"
                  >
                    <Phone className="text-yellow-400" size={18} />
                    <span className="text-sm text-gray-300">+27 (13) 755-1234</span>
                  </a>

                  <a
                    href="mailto:info@provider.co.za"
                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                  >
                    <Mail className="text-gray-400" size={18} />
                    <span className="text-sm text-gray-300">info@provider.co.za</span>
                  </a>

                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                  >
                    <Globe className="text-gray-400" size={18} />
                    <span className="text-sm text-gray-300">www.provider.co.za</span>
                  </a>
                </div>
              </div>

              {/* CTA Buttons */}
              <button className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-colors">
                Request Service
              </button>

              <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                Send Message
              </button>

              {/* Quick Links */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-400 mb-2">Emergency Contact</p>
                <p className="text-sm font-semibold text-white">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFinanceDetail;
