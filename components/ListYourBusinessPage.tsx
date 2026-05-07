import React from 'react';
import { CheckCircle, TrendingUp, Users, Zap, ArrowRight, Crown } from 'lucide-react';

interface ListYourBusinessPageProps {
  onNavigate: (view: string) => void;
}

export default function ListYourBusinessPage({ onNavigate }: ListYourBusinessPageProps) {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif" }}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-yellow-600/30">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Add Your Business to <span className="text-yellow-500">LowveldHub</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-2 max-w-2xl mx-auto leading-relaxed">
            Join Mpumalanga's trusted business directory
          </p>
          
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            LowveldHub connects verified businesses with customers looking for reliable services. Every listing is reviewed to maintain platform integrity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:info@lowveldhub.co.za"
              className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2 group"
            >
              Start Your Application
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button
              onClick={() => {
                document.getElementById('how-to-apply')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-yellow-600 hover:bg-yellow-600/10 text-yellow-500 font-bold rounded-lg transition-colors"
            >
              View Details
            </button>
          </div>

          <p className="text-sm text-gray-400">
            ✓ Free to apply | ✓ Curated verification | ✓ Premium placement guaranteed
          </p>
        </div>
      </section>

      {/* Why LowveldHub Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Join LowveldHub?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Curated Visibility */}
            <div className="border border-yellow-600/30 p-8 rounded-lg hover:border-yellow-600/60 transition-colors bg-gray-900/50 backdrop-blur">
              <div className="flex items-start gap-4">
                <Crown className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Premium Visibility</h3>
                  <p className="text-gray-300">
                    Your business appears in a marketplace designed for customers who actively seek trusted services.
                  </p>
                </div>
              </div>
            </div>

            {/* Trusted Platform */}
            <div className="border border-yellow-600/30 p-8 rounded-lg hover:border-yellow-600/60 transition-colors bg-gray-900/50 backdrop-blur">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Verified & Trustworthy</h3>
                  <p className="text-gray-300">
                    All listings are reviewed to ensure credibility and protect both customers and businesses.
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Audience */}
            <div className="border border-yellow-600/30 p-8 rounded-lg hover:border-yellow-600/60 transition-colors bg-gray-900/50 backdrop-blur">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Real Customer Interest</h3>
                  <p className="text-gray-300">
                    Reach customers who are actively looking for your type of service and ready to engage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-4 text-white">Investment Tiers</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Choose the tier that aligns with your growth ambitions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Essential */}
            <div className="relative border border-gray-700/50 p-8 rounded-xl bg-gradient-to-br from-gray-900/50 to-black hover:border-yellow-600/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2 text-white">Essential</h3>
              <p className="text-gray-400 text-sm mb-6">Perfect for new ventures</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-yellow-500">R799</span>
                <span className="text-gray-400 text-sm">/year</span>
              </div>

              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>Professional Business Listing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>Branding & Logo Display</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>Photo Gallery (up to 5)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>Full Contact Information</span>
                </li>
              </ul>

              <button className="w-full py-3 border border-gray-600 hover:border-yellow-600/50 text-white font-semibold rounded-lg transition-colors">
                Get Started
              </button>
            </div>

            {/* Professional - Featured */}
            <div className="relative border-2 border-yellow-600 p-8 rounded-xl bg-gradient-to-br from-yellow-600/15 to-gray-900/50 md:scale-105 md:-translate-y-4 shadow-2xl shadow-yellow-600/20 pt-16">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide whitespace-nowrap">★ Recommended ★</span>
              </div>

              <h3 className="text-2xl font-bold mb-2 text-white">Professional</h3>
              <p className="text-yellow-400 text-sm mb-6 font-semibold">For growing businesses</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-yellow-500">R1,299</span>
                <span className="text-gray-400 text-sm">/year</span>
              </div>

              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span><strong>Everything in Essential</strong> +</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Priority Directory Placement</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Video Integration & Showcase</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Analytics Dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span>Featured Badge & Highlight</span>
                </li>
              </ul>

              <button className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/30">
                Claim Your Advantage
              </button>
            </div>

            {/* Platinum */}
            <div className="relative border border-gray-700/50 p-8 rounded-xl bg-gradient-to-br from-gray-900/50 to-black hover:border-yellow-600/40 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2 text-white">Signature</h3>
              <p className="text-gray-400 text-sm mb-6">For established businesses</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-yellow-500">R1,999</span>
                <span className="text-gray-400 text-sm">/year</span>
              </div>

              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span><strong>Everything in Professional</strong> +</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>Premium Featured Placement</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>Custom Business Profile</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>Verified Badge Display</span>
                </li>
              </ul>

              <button className="w-full py-3 border border-gray-600 hover:border-yellow-600/50 text-white font-semibold rounded-lg transition-colors">
                Explore Signature
              </button>
            </div>
          </div>

          <div className="mt-12 p-6 border border-yellow-600/30 rounded-lg bg-yellow-600/5 text-center">
            <p className="text-gray-300">
              <span className="text-yellow-400 font-bold">All listings include:</span> Verification badge, business directory presence, and direct customer access. Annual payment, non-refundable after 14 days.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950 border-y border-yellow-600/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-4 text-white">Our Review Process</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">A straightforward process designed for businesses ready to grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-500 text-black font-bold mb-6 text-2xl shadow-lg shadow-yellow-600/30">1</div>
              <h3 className="font-bold text-xl mb-3 text-white">Submit Your Details</h3>
              <p className="text-gray-400 leading-relaxed">
                Send your business information, photos, and contact details to <span className="text-yellow-400 font-semibold">info@lowveldhub.co.za</span>. We keep the process simple and straightforward.
              </p>
              {/* Arrow */}
              <div className="hidden md:block absolute -right-8 top-8 text-yellow-600 text-3xl font-light">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-500 text-black font-bold mb-6 text-2xl shadow-lg shadow-yellow-600/30">2</div>
              <h3 className="font-bold text-xl mb-3 text-white">Review Your Application</h3>
              <p className="text-gray-400 leading-relaxed">
                Our team reviews your business details against our quality standards within 24–72 hours. We're thorough to maintain a reliable platform.
              </p>
              {/* Arrow */}
              <div className="hidden md:block absolute -right-8 top-8 text-yellow-600 text-3xl font-light">→</div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-500 text-black font-bold mb-6 text-2xl shadow-lg shadow-yellow-600/30">3</div>
              <h3 className="font-bold text-xl mb-3 text-white">Go Live</h3>
              <p className="text-gray-400 leading-relaxed">
                Once approved, your listing goes live immediately. Start connecting with customers and growing your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section id="how-to-apply" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-4 text-white">Begin Your Application</h2>
            <p className="text-lg text-gray-400">Simple, straightforward, and designed for serious businesses</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/10 via-gray-900 to-gray-950 border-2 border-yellow-600/40 rounded-xl p-12 mb-8 backdrop-blur-sm">
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Ready to apply? Send us your business details. Our team will review your application and get back to you within 1-2 business days.
            </p>
            
            <div className="mb-10 p-8 bg-black/50 rounded-lg border border-yellow-600/20">
              <p className="text-gray-400 font-semibold text-sm mb-4 uppercase tracking-wide">Email Your Application To</p>
              
              <a 
                href="mailto:info@lowveldhub.co.za"
                className="inline-block text-4xl font-bold text-yellow-400 hover:text-yellow-300 transition duration-300 mb-8"
              >
                info@lowveldhub.co.za
              </a>

              <div className="border-t border-yellow-600/20 pt-8">
                <p className="text-gray-300 font-semibold text-sm mb-4 uppercase tracking-wide">Include in Your Email</p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">•</span>
                    <span><strong>Business Name</strong> — Your official trading name</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">•</span>
                    <span><strong>Category</strong> — e.g., Restaurant, Salon, Real Estate, Consulting, etc.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">•</span>
                    <span><strong>Description</strong> — A compelling overview of your services (2–3 sentences)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">•</span>
                    <span><strong>Location</strong> — Town or area served in Mpumalanga</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">•</span>
                    <span><strong>Photos</strong> — Optional but recommended (3–5 high-quality images)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">•</span>
                    <span><strong>Contact Details</strong> — Phone, email, and website (if applicable)</span>
                  </li>
                </ul>
              </div>
            </div>

            <a 
              href="mailto:info@lowveldhub.co.za"
              className="inline-block w-full md:w-auto bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold px-10 py-4 rounded-lg transition-all duration-300 text-center text-lg shadow-lg hover:shadow-yellow-500/30"
            >
              ✦ Start Your Application Now ✦
            </a>
          </div>

          <div className="border-l-4 border-yellow-600/50 pl-6 py-4">
            <p className="text-gray-400 text-sm">
              <span className="text-yellow-400 font-semibold">Response Time:</span> Our team aims to review all applications within 24–72 business hours. You'll receive confirmation of receipt and status updates via email.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="border border-yellow-600/30 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-yellow-500">How long does approval take?</h3>
              <p className="text-gray-300">Usually 24–72 hours. We verify your business details and ensure quality standards.</p>
            </div>

            <div className="border border-yellow-600/30 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-yellow-500">What if my business is rejected?</h3>
              <p className="text-gray-300">We provide honest feedback. You can reapply with updated information or contact our team for guidance.</p>
            </div>

            <div className="border border-yellow-600/30 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-yellow-500">Can I edit my listing?</h3>
              <p className="text-gray-300">Yes, contact our team for changes. We maintain quality control by reviewing updates.</p>
            </div>

            <div className="border border-yellow-600/30 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-yellow-500">Need Help?</h3>
              <p className="text-gray-300">Questions? Email us at <a href="mailto:info@lowveldhub.co.za" className="text-yellow-400 hover:text-yellow-300">info@lowveldhub.co.za</a> or call <a href="tel:+27673759762" className="text-yellow-400 hover:text-yellow-300">+27 (0) 67 375 9762</a>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-yellow-600/30 text-center bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-4xl font-bold mb-6">Ready to Apply?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join the curated businesses trusted by high-intent customers in Mpumalanga.
        </p>

        <a
          href="mailto:info@lowveldhub.co.za"
          className="inline-block px-10 py-4 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded-lg transition-colors text-lg mb-12"
        >
          Apply Now
        </a>

        <div className="border-t border-yellow-600/30 pt-12">
          <p className="text-2xl text-yellow-400 font-serif italic">
            LowveldHub is verified. Listings are reviewed. We maintain trust through quality.
          </p>
        </div>
      </section>
    </div>
  );
}
