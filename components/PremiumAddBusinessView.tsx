import React, { useState, useEffect, useRef } from 'react';
import { Category, CategorySubcategories, MPUMALANGA_AREAS, ListingTier, PRICING_STRUCTURE, Business } from '../types';
import { Check, CheckCircle, Crown, Award, ChevronRight, Upload, X, ArrowRight, Zap, Heart } from 'lucide-react';

const PremiumAddBusinessView = ({ navigate, onAddBusiness, handleOpenAuth }: { navigate: any, onAddBusiness: (b: Business) => void, handleOpenAuth: (type: string) => void }) => {
    const [showForm, setShowForm] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<{ logo?: string; cover?: string; gallery: string[] }>({ gallery: [] });
    const [socialLinks, setSocialLinks] = useState({ instagram: '', facebook: '', linkedin: '' });

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactName: '',
        email: '',
        phone: '',
        category: Category.FoodAndHospitality,
        subcategory: '',
        area: 'Mbombela (Nelspruit)',
        membership: ListingTier.Premium,
        description: '',
        tags: [] as string[],
    });

    const categories = Object.values(Category);
    const areas = MPUMALANGA_AREAS;
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('lh_user');

    // Auto-save form data
    useEffect(() => {
        localStorage.setItem('lh_addBusiness_draft', JSON.stringify({ formData, step, uploadedImages, socialLinks }));
    }, [formData, step, uploadedImages, socialLinks]);

    // Image upload handler
    const handleImageUpload = (type: 'logo' | 'cover', file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImages(prev => ({ ...prev, [type]: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleGalleryUpload = (files: File[]) => {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImages(prev => ({ ...prev, gallery: [...prev.gallery, e.target?.result as string] }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.contactName || !formData.email) {
                setError('Please fill in all required fields.');
                return;
            }

            setError(null);
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1600));

            const tierDetails = PRICING_STRUCTURE[formData.membership];

            const newBusiness: Business = {
                id: `b-${Date.now()}`,
                name: formData.name,
                category: formData.category,
                subcategory: formData.subcategory || 'General',
                description: formData.description,
                location: formData.area,
                image: uploadedImages.cover || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
                rating: 4.5,
                reviewCount: 1,
                tier: formData.membership,
                subscriptionDuration: tierDetails.duration,
                isPremium: formData.membership === ListingTier.Premium,
                isElite: formData.membership === ListingTier.Elite,
                isPlatinum: formData.membership === ListingTier.Platinum,
                priceLevel: '$$',
                tags: formData.tags.length > 0 ? formData.tags : ['New Listing'],
                phone: formData.phone,
                email: formData.email
            };

            onAddBusiness(newBusiness);
            setLoading(false);
            setStep(4);
        } catch (e) {
            setLoading(false);
            setError('We\'re preparing the application. Please try again in a moment.');
        }
    };



    // Drag & Drop Image Zone
    const DragDropZone = ({ onDrop, label, accept = 'image/*' }: { onDrop: (files: File[]) => void; label: string; accept?: string }) => {
        const [dragActive, setDragActive] = useState(false);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleDrag = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(e.type === 'dragenter' || e.type === 'dragover');
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer.files) onDrop(Array.from(e.dataTransfer.files));
        };

        return (
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center ${dragActive ? 'border-gold-500 bg-gold-500/10' : 'border-white/20 bg-white/3 hover:border-white/40'}`}
            >
                <Upload size={32} className="mx-auto text-gold-400 mb-3" />
                <p className="text-white font-bold mb-1">{label}</p>
                <p className="text-xs text-gray-400">Drag & drop or click to browse</p>
                <input ref={fileInputRef} type="file" accept={accept} className="hidden" onChange={(e) => e.target.files && onDrop(Array.from(e.target.files))} multiple />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black pt-20 pb-24">
            {!showForm ? (
                // PREMIUM LANDING PAGE
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* HERO SECTION */}
                    <section className="space-y-6 py-16 text-center">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300', letterSpacing: '-0.02em' }}>
                                Join Mpumalanga's<br />Trusted Business Network
                            </h1>
                        </div>
                        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                            List your business on LowveldHub and reach discerning customers. Every listing is reviewed and verified to maintain quality and trust.
                        </p>
                        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a 
                                href="mailto:info@lowveldhub.co.za"
                                className="px-8 py-3 bg-gold-500 text-black font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 text-base"
                                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                            >
                                Apply via Email
                            </a>
                            <a 
                                href="#packages-preview"
                                className="px-8 py-3 border border-gray-500 text-gray-300 font-medium rounded-lg hover:border-white hover:text-white transition-all duration-200 text-base"
                                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                            >
                                View Packages
                            </a>
                        </div>
                    </section>

                    {/* WHY LOWVELDHUB - THREE PILLARS */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-t border-white/10">
                        <div className="space-y-3">
                            <div className="text-gold-500 text-lg">✓</div>
                            <h3 className="text-lg font-light text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                Verified Listings Only
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                Every business is reviewed before going live to maintain quality standards.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="text-gold-500 text-lg">✓</div>
                            <h3 className="text-lg font-light text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                AI Concierge Support
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                Customers are guided directly to your business through smart recommendations.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="text-gold-500 text-lg">✓</div>
                            <h3 className="text-lg font-light text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                Trusted by Locals
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                Access a premium, loyal audience seeking authentic Mpumalanga experiences.
                            </p>
                        </div>
                    </section>

                    {/* LISTING PACKAGES */}
                    <section id="packages-preview" className="py-16 border-t border-white/10">
                        <div className="space-y-10">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl md:text-4xl font-light text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300', letterSpacing: '-0.02em' }}>
                                    Listing Packages
                                </h2>
                                <p className="text-gray-400 text-sm font-light" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                    Choose the plan that fits your business needs
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* ESSENTIAL */}
                                <div className="border border-white/10 rounded-xl p-8 space-y-6 hover:border-gold-500/30 transition-colors duration-300 bg-white/2">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Essential</p>
                                        <h3 className="text-xl font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                            Essential
                                        </h3>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-3xl font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                            R799
                                        </p>
                                        <p className="text-gray-400 text-xs font-light">6 Months</p>
                                    </div>
                                    <ul className="space-y-3 text-gray-300 text-xs font-light">
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>Business Name</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>Address</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>Contact</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>Images</span></li>
                                    </ul>
                                    <a 
                                        href="mailto:info@lowveldhub.co.za"
                                        className="block w-full py-2.5 text-center rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors duration-200 text-xs"
                                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                                    >
                                        Apply – Essential
                                    </a>
                                </div>

                                {/* PROFESSIONAL */}
                                <div className="border border-gold-500/40 rounded-xl p-8 space-y-6 bg-gold-500/5 relative">
                                    <div className="absolute top-4 right-4 bg-gold-500 text-black text-xs font-bold px-2.5 py-1 rounded-full tracking-wider">POPULAR</div>
                                    <div>
                                        <p className="text-xs font-semibold text-gold-500 uppercase tracking-widest mb-2">Professional</p>
                                        <h3 className="text-xl font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                            Professional
                                        </h3>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-3xl font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                            R1,299
                                        </p>
                                        <p className="text-gray-400 text-xs font-light">12 Months</p>
                                    </div>
                                    <ul className="space-y-3 text-gray-300 text-xs font-light">
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>All Premium Features</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>Priority Placement</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>ELITE Badge</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>Top Listing in Category</span></li>
                                    </ul>
                                    <a 
                                        href="mailto:info@lowveldhub.co.za"
                                        className="block w-full py-2.5 text-center rounded-lg bg-gold-500 text-black font-semibold hover:bg-gold-400 transition-colors duration-200 text-xs"
                                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                                    >
                                        Apply – Professional
                                    </a>
                                </div>

                                {/* PLATINUM */}
                                <div className="border border-purple-500/30 rounded-xl p-8 space-y-6 bg-purple-500/5">
                                    <div>
                                        <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-2">Platinum</p>
                                        <h3 className="text-xl font-light text-purple-300" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                            Platinum
                                        </h3>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-3xl font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                            R1,999
                                        </p>
                                        <p className="text-gray-400 text-xs font-light">12 Months</p>
                                    </div>
                                    <ul className="space-y-3 text-gray-300 text-xs font-light">
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>All Elite Features</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>Homepage Spotlight</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>Newsletter Feature</span></li>
                                        <li className="flex gap-3"><Check size={14} className="text-gold-400 flex-shrink-0 mt-0.5" /> <span>AI Spotlight</span></li>
                                    </ul>
                                    <a 
                                        href="mailto:info@lowveldhub.co.za"
                                        className="block w-full py-2.5 text-center rounded-lg border border-purple-500/40 text-white font-medium hover:bg-purple-500/10 transition-colors duration-200 text-xs"
                                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                                    >
                                        Request Review
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* HOW IT WORKS - PROCESS */}
                    <section className="py-16 border-t border-white/10">
                        <div className="space-y-10">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl md:text-4xl font-light text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300', letterSpacing: '-0.02em' }}>
                                    How It Works
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="space-y-3">
                                    <div className="text-3xl font-light text-gold-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>1</div>
                                    <h3 className="text-base font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                        Apply
                                    </h3>
                                    <p className="text-gray-400 font-light text-xs leading-relaxed">
                                        Send us your business details via email
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="text-3xl font-light text-gold-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>2</div>
                                    <h3 className="text-base font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                        Review
                                    </h3>
                                    <p className="text-gray-400 font-light text-xs leading-relaxed">
                                        We assess quality, branding, and credibility
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="text-3xl font-light text-gold-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>3</div>
                                    <h3 className="text-base font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                        Approval
                                    </h3>
                                    <p className="text-gray-400 font-light text-xs leading-relaxed">
                                        Your business is approved and onboarded
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="text-3xl font-light text-gold-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>4</div>
                                    <h3 className="text-base font-light text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                        Go Live
                                    </h3>
                                    <p className="text-gray-400 font-light text-xs leading-relaxed">
                                        You are featured on LowveldHub
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* THE INVITATION SECTION */}
                    <section className="py-16 border-t border-white/10">
                        <div className="space-y-10">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl md:text-4xl font-light text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300', letterSpacing: '-0.02em' }}>
                                    The Invitation
                                </h2>
                                <p className="text-base text-gray-400 font-light" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                    Apply to Join Our Curated Network
                                </p>
                            </div>

                            <div className="max-w-3xl mx-auto">
                                <p className="text-center text-sm text-gray-300 font-light leading-relaxed mb-10" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                    We invite exceptional businesses to become part of LowveldHub — a carefully curated ecosystem where quality meets opportunity.
                                </p>

                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">The Process</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                                            {[
                                                { step: '01', title: 'You Apply', desc: 'Email us your business details. No forms, no hassle.' },
                                                { step: '02', title: 'We Review', desc: 'Our team assesses quality, branding, and fit with our community.' },
                                                { step: '03', title: 'We Connect', desc: 'If approved, we guide you through a seamless onboarding.' },
                                                { step: '04', title: 'You Thrive', desc: 'Your business joins an elite network of curated businesses.' }
                                            ].map((item, i) => (
                                                <div key={i} className="space-y-2 text-center md:text-left">
                                                    <p className="text-2xl font-light text-gold-400" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                                                        {item.step}
                                                    </p>
                                                    <p className="font-light text-white text-xs" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>{item.title}</p>
                                                    <p className="text-gray-400 text-xs leading-relaxed font-light">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* WHY PARTNER */}
                    <section className="py-16 border-t border-white/10">
                        <div className="space-y-10">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl md:text-4xl font-light text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300', letterSpacing: '-0.02em' }}>
                                    Why Partner With Us
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                <div className="flex gap-3">
                                    <div className="text-gold-500 font-light text-base flex-shrink-0 pt-0.5">✓</div>
                                    <p className="text-gray-300 font-light leading-relaxed text-xs">Verified customer base seeking premium experiences</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="text-gold-500 font-light text-base flex-shrink-0 pt-0.5">✓</div>
                                    <p className="text-gray-300 font-light leading-relaxed text-xs">AI-powered recommendations to drive real business</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="text-gold-500 font-light text-base flex-shrink-0 pt-0.5">✓</div>
                                    <p className="text-gray-300 font-light leading-relaxed text-xs">No commission on direct sales</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="text-gold-500 font-light text-base flex-shrink-0 pt-0.5">✓</div>
                                    <p className="text-gray-300 font-light leading-relaxed text-xs">Exclusive community of 50+ curated businesses</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* APPLICATION DETAILS */}
                    <section className="py-16 border-t border-white/10">
                        <div className="space-y-10">
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl md:text-4xl font-light text-white leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300', letterSpacing: '-0.02em' }}>
                                    Ready?
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                                    <a 
                                        href="mailto:info@lowveldhub.co.za"
                                        className="px-6 py-2.5 bg-gold-500 text-black font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 text-sm inline-flex items-center gap-2"
                                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                                    >
                                        Apply Now <ArrowRight size={14} />
                                    </a>
                                    <p className="text-gray-400 text-xs font-light">Or email directly</p>
                                </div>
                            </div>

                            <div className="max-w-2xl mx-auto border border-white/10 rounded-xl p-8 space-y-6 bg-white/2">
                                <div>
                                    <h3 className="text-base font-light text-white mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400' }}>
                                        info@lowveldhub.co.za
                                    </h3>
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">In Your Email, Please Include</h4>
                                    <ul className="space-y-1.5 text-gray-300 font-light text-xs">
                                        <li>• Business Name & Website</li>
                                        <li>• Location (Area in Mpumalanga)</li>
                                        <li>• Category / Industry</li>
                                        <li>• Contact Person & Details</li>
                                        <li>• 2–5 High-Quality Images</li>
                                        <li>• Brief Description (50–100 words)</li>
                                    </ul>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                                        Our team reviews applications carefully.<br />You'll hear from us within 24–72 hours.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FOOTER MESSAGE */}
                    <section className="py-12 border-t border-white/10 text-center">
                        <p className="text-xs text-gray-400 font-light leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>
                            LowveldHub is a curated ecosystem, not a directory. We maintain rigorous standards for quality, presentation, and customer experience. Only exceptional businesses are invited to join.
                        </p>
                    </section>
                </div>
            ) : (
                // ALTERNATIVE: Hidden form section (not shown with current flow)
                <div className="container mx-auto px-4 max-w-4xl hidden">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} className="flex flex-col items-center flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= s ? (step === s ? 'bg-gold-500 text-black' : 'bg-green-500 text-white') : 'bg-white/10 text-gray-400'}`}>
                                        {step > s ? <Check size={20} /> : s}
                                    </div>
                                    <div className="text-xs text-gray-400 text-center hidden md:block">
                                        {s === 1 ? 'Details' : s === 2 ? 'Media' : s === 3 ? 'Package' : 'Confirm'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-500" style={{ width: `${(step - 1) * 33.33}%` }}></div>
                        </div>
                    </div>

                    {/* Sign-in gate */}
                    {!isLoggedIn && (
                        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-between">
                            <span className="text-white text-sm">Please sign in to complete your application</span>
                            <button onClick={() => handleOpenAuth('login')} className="text-blue-400 hover:text-blue-300 font-bold text-sm">Sign In</button>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">{error}</div>
                    )}

                    {/* STEP 1: Business Details */}
                    {step === 1 && (
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-light text-white mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400', letterSpacing: '-0.01em' }}>Tell us about your business</h2>
                                <p className="text-gray-400 text-sm font-light" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>Basic information helps us categorize and showcase your listing correctly</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Business Name <span className="text-red-400">*</span></label>
                                    <input 
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Lowveld Roasters Coffee"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">This is how customers will find you</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Category <span className="text-red-400">*</span></label>
                                        <select 
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value as Category, subcategory: '' })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Subcategory</label>
                                        <select 
                                            value={formData.subcategory}
                                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select subcategory</option>
                                            {(CategorySubcategories[formData.category] || []).map(sub => (
                                                <option key={sub} value={sub} className="bg-black">{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Location <span className="text-red-400">*</span></label>
                                    <select 
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        {areas.map(area => (
                                            <option key={area} value={area} className="bg-black">{area}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Contact Person <span className="text-red-400">*</span></label>
                                    <input 
                                        type="text"
                                        value={formData.contactName}
                                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                        placeholder="Full name"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Email <span className="text-red-400">*</span></label>
                                        <input 
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="info@business.co.za"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Phone</label>
                                        <input 
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+27..."
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Business Address</label>
                                    <input 
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Street address, city, postal code"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Business Description</label>
                                    <textarea 
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Tell customers what makes your business special..."
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-gold-500 focus:bg-white/10 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button 
                                    onClick={() => setStep(2)}
                                    className="bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                                >
                                    Next: Media & Branding <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Media & Branding */}
                    {step === 2 && (
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-light text-white mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400', letterSpacing: '-0.01em' }}>Showcase your brand</h2>
                                <p className="text-gray-400 text-sm font-light" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>High-quality images help customers get excited about your business</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-white mb-3">Business Logo</label>
                                    <div className="space-y-3">
                                        {uploadedImages.logo ? (
                                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                                <img src={uploadedImages.logo} alt="Logo" className="w-16 h-16 rounded object-cover" />
                                                <button onClick={() => setUploadedImages(prev => ({ ...prev, logo: undefined }))} className="text-red-400 hover:text-red-300 text-sm font-bold ml-auto">Remove</button>
                                            </div>
                                        ) : (
                                            <DragDropZone onDrop={(files) => handleImageUpload('logo', files[0])} label="Upload your logo" />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-3">Cover Image / Hero Image</label>
                                    <div className="space-y-3">
                                        {uploadedImages.cover ? (
                                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                                <img src={uploadedImages.cover} alt="Cover" className="w-24 h-16 rounded object-cover" />
                                                <button onClick={() => setUploadedImages(prev => ({ ...prev, cover: undefined }))} className="text-red-400 hover:text-red-300 text-sm font-bold ml-auto">Remove</button>
                                            </div>
                                        ) : (
                                            <DragDropZone onDrop={(files) => handleImageUpload('cover', files[0])} label="Upload cover image (recommended: 1200x600)" />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-3">Gallery Images (Up to 5)</label>
                                    <div className="space-y-3">
                                        {uploadedImages.gallery.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {uploadedImages.gallery.map((img, i) => (
                                                    <div key={i} className="relative group">
                                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-24 object-cover rounded border border-white/10" />
                                                        <button 
                                                            onClick={() => setUploadedImages(prev => ({ ...prev, gallery: prev.gallery.filter((_, idx) => idx !== i) }))}
                                                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition-opacity"
                                                        >
                                                            <X size={20} className="text-red-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {uploadedImages.gallery.length < 5 && (
                                            <DragDropZone onDrop={handleGalleryUpload} label="Add gallery images" />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Instagram</label>
                                        <input 
                                            type="text"
                                            value={socialLinks.instagram}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                                            placeholder="@yourhandle"
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-gold-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Facebook</label>
                                        <input 
                                            type="text"
                                            value={socialLinks.facebook}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                                            placeholder="facebook.com/..."
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-gold-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">LinkedIn</label>
                                        <input 
                                            type="text"
                                            value={socialLinks.linkedin}
                                            onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                                            placeholder="linkedin.com/company/..."
                                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-gray-600 focus:border-gold-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button 
                                    onClick={() => setStep(1)}
                                    className="text-gray-400 hover:text-white font-bold uppercase text-xs transition-colors"
                                >
                                    ← Back
                                </button>
                                <button 
                                    onClick={() => setStep(3)}
                                    className="bg-gold-500 hover:bg-gold-600 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                                >
                                    Next: Select Package <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Membership & Packages */}
                    {step === 3 && (
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 space-y-8 animate-fade-in">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-light text-white mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '400', letterSpacing: '-0.01em' }}>Select your plan</h2>
                                <p className="text-gray-400 text-sm font-light" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontWeight: '300' }}>Choose the visibility and features that match your goals</p>
                            </div>

                            <div className="space-y-4">
                                {Object.values(ListingTier).map((tier) => {
                                    const tierData = PRICING_STRUCTURE[tier];
                                    const isSelected = formData.membership === tier;
                                    return (
                                        <div 
                                            key={tier}
                                            onClick={() => setFormData({ ...formData, membership: tier })}
                                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden ${isSelected ? 'border-gold-500 bg-gold-500/10' : 'border-white/10 bg-white/3 hover:border-gold-500/40'}`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-3 right-3 bg-gold-500 text-black text-[10px] font-bold px-2 py-1 rounded">SELECTED</div>
                                            )}
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className={`text-lg font-bold flex items-center gap-2 ${tier === ListingTier.Platinum ? 'text-purple-300' : tier === ListingTier.Elite ? 'text-gold-400' : 'text-white'}`}>
                                                        {tier === ListingTier.Elite && <Crown size={18} />}
                                                        {tier === ListingTier.Platinum && <Award size={18} />}
                                                        {tier}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">{tierData.note}</p>
                                                </div>
                                                {isSelected && <CheckCircle size={20} className="text-gold-500" />}
                                            </div>
                                            <div className="mb-4">
                                                <div className="text-2xl font-bold text-white">
                                                    R{tierData.price}
                                                    <div className="text-xs text-gray-500 font-normal">{tierData.duration}</div>
                                                </div>
                                            </div>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                {tierData.features.map((f, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <Check size={14} className="text-gold-500 flex-shrink-0" /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded" />
                                    <span className="text-sm text-gray-300">I confirm my business meets LowveldHub standards for quality and trust</span>
                                </label>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button 
                                    onClick={() => setStep(2)}
                                    className="text-gray-400 hover:text-white font-bold uppercase text-xs transition-colors"
                                >
                                    ← Back
                                </button>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                                >
                                    {loading ? 'Processing...' : (formData.membership === ListingTier.Platinum ? 'Request Platinum Review' : 'Complete Application')} 
                                    {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Confirmation */}
                    {step === 4 && (
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-12 text-center space-y-8 animate-fade-in">
                            <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto">
                                <CheckCircle size={48} className="text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-serif text-white mb-2">Application Submitted!</h2>
                                <p className="text-lg text-gray-300">
                                    Your listing for <span className="text-gold-400 font-bold">{formData.name}</span> has been received.
                                </p>
                            </div>
                            <div className="bg-white/3 border border-white/10 rounded-lg p-6 text-left space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Business Name:</span>
                                    <span className="text-white font-bold">{formData.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Location:</span>
                                    <span className="text-white font-bold">{formData.area}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Package:</span>
                                    <span className="text-gold-400 font-bold">{formData.membership}</span>
                                </div>
                            </div>
                            <p className="text-gray-400 max-w-xl mx-auto">
                                Our team will review your application within 24–72 hours. You'll receive a confirmation email at <span className="text-white">{formData.email}</span> with next steps.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                                <button 
                                    onClick={() => navigate('home')}
                                    className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-3 rounded-lg font-bold transition-colors"
                                >
                                    Return to Home
                                </button>
                                <button 
                                    onClick={() => navigate('marketplace')}
                                    className="border border-white/20 hover:border-gold-500 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                                >
                                    Explore Marketplace
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PremiumAddBusinessView;
