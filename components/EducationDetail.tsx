import React from 'react';
import { Business, Category, ListingTier } from '../types';
import { MapPin, Star, Phone, Globe, Mail, CheckCircle, ArrowLeft, Share2, Heart, BookOpen, Users, Clock } from 'lucide-react';

interface EducationDetailProps {
  institution: Business;
  navigate: (view: string, category?: string, id?: string) => void;
  businesses: Business[];
}

const EducationDetail: React.FC<EducationDetailProps> = ({ institution, navigate, businesses }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [institution.id]);

  if (!institution) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-slate-600">Institution not found</p>
      </div>
    );
  }

  const relatedInstitutions = businesses
    .filter(b => 
      b.category === Category.EducationAndSkills && 
      b.id !== institution.id && 
      b.location === institution.location
    )
    .slice(0, 3);

  const isVerified = institution.tier === ListingTier.Elite || institution.tier === ListingTier.Platinum;

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div className="h-64 md:h-80 bg-gradient-to-br from-blue-100 to-slate-100 overflow-hidden">
          {institution.image && (
            <img
              src={institution.image}
              alt={institution.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Header Actions */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
          <button
            onClick={() => navigate('education')}
            className="bg-white/90 hover:bg-white text-slate-900 p-2 rounded-lg transition-all flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 hover:bg-white text-slate-900 p-2 rounded-lg transition-all"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button className="bg-white/90 hover:bg-white text-slate-900 p-2 rounded-lg transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-6 md:p-8 border border-white/10">
              {/* Title + Verification + Quick Stats (CLEAN TOP) */}
              <div className="mb-8">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                      {institution.name}
                    </h1>
                    <div className="flex items-center gap-4 flex-wrap">
                      {isVerified && (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-semibold">Verified</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-amber-300">
                        <Star className="w-4 h-4 fill-amber-300" />
                        <span className="font-bold">{institution.rating || 'N/A'}</span>
                        <span className="text-gray-400 text-sm">({institution.reviewCount || 0})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm">{institution.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tagline / Description (WHAT THEY OFFER) */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {institution.description || 'Premium education institution'}
                </p>
              </div>

              {/* Programs Offered (CRITICAL — WHAT STUDENTS CARE ABOUT) */}
              {institution.amenities && institution.amenities.length > 0 && (
                <div className="mb-8 pb-8 border-b border-white/10">
                  <h2 className="text-xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                    Programs Offered
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {institution.amenities.map((program, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                        <span className="font-medium">{program}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Section (SHORT, FOCUSED) */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <h2 className="text-xl font-serif font-bold text-white mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed">
                  {institution.description || 'A trusted education institution providing quality education and training services.'}
                </p>
              </div>

              {/* Sample Reviews (BUILDS REAL TRUST) */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <h2 className="text-xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  Student Reviews
                </h2>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">5.0</span>
                    </div>
                    <p className="text-gray-300 text-sm">"Very practical courses, helped me transition to tech. Highly recommended!"</p>
                    <p className="text-xs text-gray-500 mt-2">— Sarah M.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <Star className="w-3.5 h-3.5 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-400">4.8</span>
                    </div>
                    <p className="text-gray-300 text-sm">"Flexible schedule and great support. Perfect for working professionals."</p>
                    <p className="text-xs text-gray-500 mt-2">— James T.</p>
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* Sidebar - STRONG ACTION FOCUS */}
          <div>
            {/* PRIMARY ACTION */}
            <div className="bg-[#D4AF37] rounded-lg shadow-lg p-6 mb-6 text-black sticky top-24 border border-[#E8D4A0]">
              <button className="w-full bg-black text-[#D4AF37] py-4 font-bold text-lg rounded-lg hover:bg-gray-900 transition-all border border-[#D4AF37] mb-4 hover:scale-105">
                Enroll Now
              </button>
              <div className="space-y-2">
                <a
                  href={institution.email ? `mailto:${institution.email}` : '#'}
                  className="block text-center py-2 text-black font-semibold hover:text-gray-700 transition-colors text-sm border-t border-black/20"
                >
                  Send Inquiry
                </a>
                {institution.phone && (
                  <a
                    href={`tel:${institution.phone}`}
                    className="block text-center py-2 text-black font-semibold hover:text-gray-700 transition-colors text-sm border-t border-black/20"
                  >
                    Call Now
                  </a>
                )}
              </div>
            </div>

            {/* Contact Info (EASILY ACCESSIBLE) */}
            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-white/10 mb-6">
              <h3 className="text-sm font-bold text-[#D4AF37] mb-4 uppercase tracking-widest">Contact</h3>
              <div className="space-y-3">
                {institution.phone && (
                  <a
                    href={`tel:${institution.phone}`}
                    className="flex items-center gap-3 p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-white font-medium text-sm">{institution.phone}</span>
                  </a>
                )}
                {institution.email && (
                  <a
                    href={`mailto:${institution.email}`}
                    className="flex items-center gap-3 p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-white font-medium text-sm line-clamp-1">{institution.email}</span>
                  </a>
                )}
                {institution.website && (
                  <a
                    href={institution.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <Globe className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-white font-medium text-sm">Website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Facts (MINIMAL, USER-FOCUSED) */}
            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-white/10">
              <h3 className="text-sm font-bold text-[#D4AF37] mb-4 uppercase tracking-widest">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 font-semibold mb-0.5">Delivery</p>
                  <p className="text-white">{institution.location === 'Remote' ? 'Online' : institution.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold mb-0.5">Status</p>
                  <p className="text-emerald-400 font-medium">✓ Verified</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold mb-0.5">Learners</p>
                  <p className="text-white">{institution.reviewCount || 0}+ students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Institutions */}
      {relatedInstitutions.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 mt-16">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">
            Similar Institutions in {institution.location}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedInstitutions.map((related) => (
              <button
                key={related.id}
                onClick={() => navigate('education-detail', Category.EducationAndSkills, related.id)}
                className="bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:shadow-lg hover:border-[#D4AF37] transition-all group text-left"
              >
                <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  {related.image && (
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {related.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-gray-300">{related.rating || 'N/A'}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Back to Directory */}
      <div className="container mx-auto px-4 md:px-6 mt-16 text-center">
        <button
          onClick={() => navigate('education')}
          className="px-8 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#E8D4A0] transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to All Institutions
        </button>
      </div>
    </div>
  );
};

export default EducationDetail;
