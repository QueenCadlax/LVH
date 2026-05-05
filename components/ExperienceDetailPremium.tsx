import React, { useMemo, useState } from 'react';
import { destinations as destinationsData } from '../data/seeds';
import { Heart, Share2, MapPin, Clock, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ExperienceDetailPremium({ id, navigate, businesses }: { id?: string; navigate?: (view:string, sub?:string, id?:string)=>void; businesses?: any[] }){
  const experience = useMemo(() => {
    if (businesses && businesses.length > 0) {
      const found = businesses.find(d => d.id === id);
      if (found) return found;
    }
    return destinationsData.find(d => d.id === id) || destinationsData[0];
  }, [id, businesses]);
  const gallery = experience.images && experience.images.length ? experience.images : [experience.image];
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorited, setIsFavorited] = useState(false);
  const [practicalOpen, setPracticalOpen] = useState<{[k:string]:boolean}>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const tabs = ['overview', 'gallery', 'experiences', 'itinerary', 'location', 'practical'];
  const tabLabels = {
    overview: 'Overview',
    gallery: 'Gallery',
    experiences: 'What to Expect',
    itinerary: 'Itinerary',
    location: 'Location',
    practical: 'Practical Info'
  };

  const nextImage = () => setLightboxIndex((prev) => (prev + 1) % gallery.length);
  const prevImage = () => setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setLightboxOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={32} />
          </button>
          <img src={gallery[lightboxIndex]} style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }} />
          <button onClick={prevImage} style={{ position: 'absolute', left: 20, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(201,162,77,0.3)', color: '#FFF', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextImage} style={{ position: 'absolute', right: 20, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(201,162,77,0.3)', color: '#FFF', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}>
            <ChevronRight size={24} />
          </button>
          <div style={{ position: 'absolute', bottom: 20, color: '#CFCFCF', fontSize: '14px' }}>{lightboxIndex + 1} / {gallery.length}</div>
        </div>
      )}

      {/* PREMIUM HERO GALLERY */}
      <div className="w-full pt-24" style={{ minHeight: '60vh', position: 'relative', background: '#050505' }}>
        <div className="w-full h-full">
          <img src={gallery[0]} className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} style={{ maxHeight: '60vh' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.8))' }} />
          
          {/* Top Right Actions */}
          <div style={{ position: 'absolute', right: 24, top: 40 }} className="flex items-center gap-3">
            <button onClick={() => setIsFavorited(!isFavorited)} className="w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all hover:scale-110" style={{ border: '1px solid rgba(201,162,77,0.3)', background: 'rgba(0,0,0,0.4)' }}>
              <Heart size={20} className={isFavorited ? 'fill-gold-500' : ''} style={{ color: isFavorited ? '#C9A24D' : '#FFFFFF' }} />
            </button>
            <button className="w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all hover:scale-110" style={{ border: '1px solid rgba(201,162,77,0.3)', background: 'rgba(0,0,0,0.4)' }}>
              <Share2 size={20} style={{ color: '#FFFFFF' }} />
            </button>
          </div>

          {/* View Gallery Badge */}
          <div style={{ position: 'absolute', left: 24, bottom: 24 }} className="flex items-center gap-2">
            <button onClick={() => setActiveTab('gallery')} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(201,162,77,0.2)', border: '1px solid rgba(201,162,77,0.4)', color: '#C9A24D' }}>
              📸 View Gallery ({gallery.length})
            </button>
          </div>

          {/* Hero Title Section */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.95))' }} className="p-8">
            <div className="max-w-6xl mx-auto">
              <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(201,162,77,0.15)', border: '1px solid rgba(201,162,77,0.3)', color: '#C9A24D', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>✨ ELITE Experience</div>
              <h1 className="text-6xl font-bold mb-2 font-serif">{experience.name}</h1>
              <p className="text-lg" style={{ color: '#CFCFCF', maxWidth: '600px' }}>{experience.subtitle || experience.description?.slice(0,100)}</p>
              <div className="flex items-center gap-6 mt-4 flex-wrap">
                <div className="flex items-center gap-2" style={{ color: '#C9A24D', fontWeight: 700 }}>⭐ {(experience.rating || 4.8).toFixed(1)} <span style={{ color: '#CFCFCF', fontWeight: 400 }}>({experience.reviews || 82} reviews)</span></div>
                <div className="text-sm" style={{ color: '#CFCFCF' }}>✔ Verified by LowveldHub</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM TAB NAVIGATION */}
      <div style={{ position: 'sticky', top: 64, zIndex: 40, backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(201,162,77,0.2)', background: 'rgba(0,0,0,0.8)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-4 text-sm font-semibold uppercase tracking-wider transition-all relative whitespace-nowrap"
                style={{
                  color: activeTab === tab ? '#C9A24D' : '#CFCFCF'
                }}
              >
                {tabLabels[tab as keyof typeof tabLabels]}
                {activeTab === tab && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#C9A24D' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32">
        <main className="lg:col-span-8 space-y-8">
          
          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <section>
              <h3 className="text-3xl font-bold mb-8">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Large featured image */}
                <div className="md:row-span-2 rounded-lg overflow-hidden cursor-pointer group" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} style={{ border: '1px solid rgba(201,162,77,0.2)', minHeight: '400px' }}>
                  <img src={gallery[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0), rgba(0,0,0,0.3))' }} />
                </div>
                {/* Grid of other images */}
                {gallery.slice(1, 5).map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden cursor-pointer group" onClick={() => { setLightboxIndex(i + 1); setLightboxOpen(true); }} style={{ border: '1px solid rgba(201,162,77,0.2)', minHeight: '190px' }}>
                    <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0), rgba(0,0,0,0.3))' }} />
                  </div>
                ))}
              </div>
              {gallery.length > 5 && (
                <div className="p-6 rounded-lg text-center" style={{ background: 'rgba(201,162,77,0.05)', border: '1px solid rgba(201,162,77,0.1)' }}>
                  <p style={{ color: '#CFCFCF' }}>+ {gallery.length - 5} more photos</p>
                </div>
              )}
            </section>
          )}
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <>
              <section>
                <h3 className="text-3xl font-bold mb-6">About this Experience</h3>
                <p className="text-lg leading-relaxed" style={{ color: '#CFCFCF', lineHeight: '1.8' }}>{experience.description || 'Step into one of Earth\'s oldest landscapes. This curated experience blends wilderness, heritage, and luxury across Mpumalanga\'s most captivating destinations.'}</p>
              </section>

              <section className="pt-8 border-t" style={{ borderTopColor: 'rgba(201,162,77,0.2)' }}>
                <h4 className="text-2xl font-bold mb-8">Experience Highlights</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Ancient Geological Formations', 'Guided Heritage Walk', 'Indigenous Storytelling', 'Scenic Viewpoints', 'Local Cultural Stop', 'Photography Moments'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg transition-all hover:border-gold-500/50" style={{ background: 'rgba(201,162,77,0.05)', border: '1px solid rgba(201,162,77,0.1)' }}>
                      <div style={{ color: '#C9A24D', fontSize: '20px', minWidth: '24px' }}>✓</div>
                      <div className="text-sm leading-relaxed">{item}</div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* EXPERIENCES TAB */}
          {activeTab === 'experiences' && (
            <section>
              <h3 className="text-3xl font-bold mb-8">What to Expect</h3>
              <div className="space-y-4">
                {[
                  { icon: '🌅', title: 'Early Morning Departure', desc: 'Depart at sunrise for optimal wildlife viewing and photography.' },
                  { icon: '🦁', title: 'Big 5 Safari', desc: 'Guided safari with experienced naturalists in pristine game reserves.' },
                  { icon: '🌄', title: 'Scenic Viewpoints', desc: 'Stop at panoramic viewpoints with breathtaking vistas of the Lowveld.' },
                  { icon: '🍽️', title: 'Curated Dining', desc: 'Lunch at exclusive venues with farm-to-table cuisine.' },
                  { icon: '📸', title: 'Photography Sessions', desc: 'Professional guidance for capturing unforgettable moments.' },
                  { icon: '🏨', title: 'Premium Comfort', desc: 'Rest at luxury lodge with world-class amenities.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg" style={{ background: 'rgba(201,162,77,0.05)', border: '1px solid rgba(201,162,77,0.1)' }}>
                    <div style={{ fontSize: '32px', minWidth: '40px' }}>{item.icon}</div>
                    <div>
                      <h5 className="font-bold mb-1">{item.title}</h5>
                      <p style={{ color: '#CFCFCF', fontSize: '14px' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ITINERARY TAB */}
          {activeTab === 'itinerary' && (
            <section>
              <h3 className="text-3xl font-bold mb-8">Suggested Itinerary</h3>
              <div className="space-y-4">
                {[
                  { time: '06:00 AM', title: 'Arrival & Briefing', desc: 'Meet your guide and receive safety briefing' },
                  { time: '06:30 AM', title: 'Game Drive Begins', desc: 'Embark on thrilling wildlife safari' },
                  { time: '09:30 AM', title: 'Scenic Stop', desc: 'Enjoy refreshments at panoramic viewpoint' },
                  { time: '12:00 PM', title: 'Lunch', desc: 'Fine dining experience at exclusive lodge' },
                  { time: '02:00 PM', title: 'Afternoon Activities', desc: 'Cultural visit or additional safari' },
                  { time: '05:00 PM', title: 'Sunset Experience', desc: 'Enjoy golden hour photography' },
                  { time: '06:30 PM', title: 'Return & Dinner', desc: 'Back to base for gourmet dinner' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg" style={{ background: 'rgba(201,162,77,0.05)', border: '1px solid rgba(201,162,77,0.1)' }}>
                    <div className="font-bold min-w-fit" style={{ color: '#C9A24D' }}>{item.time}</div>
                    <div>
                      <h5 className="font-bold mb-1">{item.title}</h5>
                      <p style={{ color: '#CFCFCF', fontSize: '14px' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LOCATION TAB */}
          {activeTab === 'location' && (
            <section>
              <h3 className="text-3xl font-bold mb-6">Location & Access</h3>
              <div className="rounded-lg overflow-hidden mb-4" style={{ height: '400px', background: '#050505', border: '1px solid rgba(201,162,77,0.2)' }}>
                <div className="w-full h-full flex items-center justify-center" style={{ color: '#CFCFCF' }}>🗺️ Interactive Map Coming Soon</div>
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'rgba(201,162,77,0.05)', border: '1px solid rgba(201,162,77,0.1)' }}>
                <p className="font-bold mb-2">Exact Meeting Point</p>
                <p style={{ color: '#CFCFCF' }}>Shared with you upon confirmation. Located in White River, Mpumalanga.</p>
              </div>
            </section>
          )}

          {/* PRACTICAL INFO TAB */}
          {activeTab === 'practical' && (
            <section>
              <h3 className="text-3xl font-bold mb-8">Practical Information</h3>
              <div className="space-y-3">
                {[
                  { title: 'What to Bring', content: 'Comfortable clothing, hiking boots, water bottle, sunscreen, camera, binoculars' },
                  { title: 'Accessibility', content: 'Mostly easy walking; some uneven terrain. Not recommended for mobility issues.' },
                  { title: 'Weather', content: 'Check forecasts. Bring layers for temperature changes. Rainy season Oct-Mar.' },
                  { title: 'Safety Guidelines', content: 'Follow guide instructions always. No off-trail exploration. Stay with group.' },
                  { title: 'Cancellation Policy', content: '100% refund if cancelled 7+ days before. 50% refund within 7 days.' }
                ].map((item, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setPracticalOpen(s => ({...s, [i]: !s[i]}))}
                      className="w-full flex items-center justify-between p-4 rounded-lg transition-all"
                      style={{ background: 'rgba(201,162,77,0.05)', border: '1px solid rgba(201,162,77,0.1)' }}
                    >
                      <span className="font-bold">{item.title}</span>
                      <span style={{ color: '#C9A24D', fontSize: '20px' }}>{practicalOpen[i] ? '−' : '+'}</span>
                    </button>
                    {practicalOpen[i] && (
                      <div className="p-4 mt-2 rounded-lg" style={{ background: 'rgba(201,162,77,0.03)', borderLeft: '2px solid #C9A24D', color: '#CFCFCF' }}>
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REVIEWS SECTION - ALWAYS VISIBLE */}
          <section className="pt-8 border-t" style={{ borderTopColor: 'rgba(201,162,77,0.2)' }}>
            <h4 className="text-2xl font-bold mb-6">Guest Experiences</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { quote: 'A humbling, breathtaking experience. Exceeded all expectations.', author: 'T. Mokoena', type: 'Couple', rating: 5 },
                { quote: 'Deeply moving and beautifully curated. Worth every cent.', author: 'J. van Rensburg', type: 'Family', rating: 5 }
              ].map((review, i) => (
                <div key={i} className="p-6 rounded-lg" style={{ background: 'rgba(201,162,77,0.05)', border: '1px solid rgba(201,162,77,0.1)' }}>
                  <div className="flex gap-1 mb-3">
                    {Array(review.rating).fill(0).map((_, j) => (
                      <span key={j} style={{ color: '#C9A24D' }}>★</span>
                    ))}
                  </div>
                  <p className="text-lg font-light mb-4 leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                  <p className="text-sm" style={{ color: '#CFCFCF' }}>{review.author} • {review.type}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT SIDEBAR - BOOKING CARD */}
        <aside className="lg:col-span-4">
          <div style={{ position: 'sticky', top: 120 }}>
            <div className="rounded-lg p-8" style={{ background: 'rgba(201,162,77,0.05)', border: '1px solid rgba(201,162,77,0.2)' }}>
              <div className="mb-2" style={{ color: '#C9A24D', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>✨ ELITE</div>
              <h3 className="text-2xl font-bold mb-4">{experience.name}</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b" style={{ borderBottomColor: 'rgba(201,162,77,0.2)' }}>
                <div className="flex items-center gap-2 text-sm">
                  <Star size={16} style={{ color: '#C9A24D' }} fill="#C9A24D" />
                  <span style={{ color: '#C9A24D', fontWeight: 700 }}>{(experience.rating || 4.8).toFixed(1)}</span>
                  <span style={{ color: '#CFCFCF' }}>({experience.reviews || 82} verified reviews)</span>
                </div>
                <div className="text-sm flex items-center gap-2" style={{ color: '#CFCFCF' }}>
                  <MapPin size={14} /> {experience.location}
                </div>
                <div className="text-sm flex items-center gap-2" style={{ color: '#CFCFCF' }}>
                  <Clock size={14} /> Full Day (6 hours)
                </div>
              </div>

              <div className="mb-6">
                <div style={{ color: '#CFCFCF', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Price</div>
                <div className="text-3xl font-bold" style={{ color: '#C9A24D' }}>R{(experience.priceLevel || 1200).toLocaleString()}</div>
                <div style={{ color: '#CFCFCF', fontSize: '13px' }}>per person</div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 rounded-lg font-bold transition-all" style={{ background: '#C9A24D', color: '#000' }}>
                  + Add to Journey
                </button>
                <button className="w-full py-3 rounded-lg font-bold transition-all" style={{ border: '1px solid #C9A24D', color: '#C9A24D', background: 'transparent' }}>
                  Request Private Experience
                </button>
                <button className="w-full py-3 rounded-lg font-semibold transition-all" style={{ border: '1px solid rgba(201,162,77,0.2)', color: '#CFCFCF', background: 'transparent' }}>
                  Chat with Concierge
                </button>
              </div>

              <div className="mt-6 pt-6 border-t" style={{ borderTopColor: 'rgba(201,162,77,0.2)' }}>
                <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#CFCFCF', marginBottom: '12px' }}>Verification</div>
                <div className="space-y-2 text-sm" style={{ color: '#CFCFCF' }}>
                  <div>✔ Verified by LowveldHub</div>
                  <div>✔ Local guides certified</div>
                  <div>✔ Safety approved</div>
                  <div>✔ Eco-certified</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FOOTER COPY */}
      <div style={{ background: 'rgba(201,162,77,0.05)', borderTop: '1px solid rgba(201,162,77,0.2)', padding: '32px 0' }}>
        <div className="max-w-6xl mx-auto px-8 text-center space-y-3">
          <p style={{ color: '#CFCFCF' }}>LowveldHub is a curated digital ecosystem. Listings are verified. Excellence is expected.</p>
        </div>
      </div>
    </div>
  );
}
