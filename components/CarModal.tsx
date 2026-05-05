import React, { useState } from 'react';
import { X, Phone, Calendar, Heart, Share2, ChevronRight, MapPin, Fuel, Zap, Gauge } from 'lucide-react';

const CarModal: React.FC<{
  open: boolean;
  onClose: () => void;
  car: any | null;
}> = ({ open, onClose, car }) => {
  const gold = '#C9A24D';
  const [idx, setIdx] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [expandDescription, setExpandDescription] = useState(false);

  if (!open || !car) return null;

  const images = car.gallery && car.gallery.length ? car.gallery : [car.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div className="min-h-screen flex flex-col" style={{ background: '#000000' }}>
        
        {/* TOP NAV - Breadcrumb */}
        <div className="sticky top-0 z-40 border-b" style={{ borderColor: 'rgba(201,162,77,0.15)', background: '#000000' }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#CFCFCF' }}>
              <button onClick={onClose} className="hover:opacity-60 transition">← Automotive</button>
              <span style={{ color: gold }}>/</span>
              <span>{car.title}</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:opacity-60 transition" style={{ color: gold }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto w-full flex-grow px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT: HERO IMAGE GALLERY - 60% */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '4/3', border: `1px solid rgba(201,162,77,0.2)` }}>
                <img src={images[idx]} alt={car.title} className="w-full h-full object-cover" />
              </div>

              {/* Thumbnails Strip */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300"
                    style={{
                      width: 100,
                      height: 80,
                      border: i === idx ? `2px solid ${gold}` : `1px solid rgba(201,162,77,0.2)`,
                      opacity: i === idx ? 1 : 0.6
                    }}
                  >
                    <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Image Count Badge */}
              <div className="mt-4 inline-block px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: `${gold}15`, color: gold }}>
                {images.length} Photos
              </div>
            </div>

            {/* RIGHT: INFO PANEL - 40% (STICKY) */}
            <div className="lg:col-span-1">
              <div style={{ position: 'sticky', top: 100 }}>
                {/* VEHICLE TITLE */}
                <h1 className="text-4xl font-serif mb-4" style={{ color: '#FFFFFF', fontWeight: 300 }}>
                  {car.title}
                </h1>

                {/* PRICE - Dominant */}
                <div className="mb-6 pb-6 border-b" style={{ borderColor: 'rgba(201,162,77,0.15)' }}>
                  <div className="text-5xl font-semibold mb-2" style={{ color: gold }}>
                    {car.price}
                  </div>
                  <div className="text-xs mb-2" style={{ color: '#666666' }}>
                    Est. from R 12,450 / month
                  </div>
                  <div className="text-sm" style={{ color: '#999999' }}>
                    Availability on request
                  </div>
                </div>

                {/* META ROW - Year, Mileage, Transmission, Fuel */}
                <div className="space-y-3 mb-6 pb-6 border-b" style={{ borderColor: 'rgba(201,162,77,0.15)' }}>
                  <div className="flex items-center gap-3 text-sm">
                    <span style={{ fontSize: 18 }}>📅</span>
                    <div>
                      <div style={{ color: '#CFCFCF' }}>{car.year}</div>
                      <div style={{ color: '#999999', fontSize: 12 }}>Year</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span style={{ fontSize: 18 }}>⏱</span>
                    <div>
                      <div style={{ color: '#CFCFCF' }}>{car.mileage}</div>
                      <div style={{ color: '#999999', fontSize: 12 }}>Mileage</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span style={{ fontSize: 18 }}>⚙️</span>
                    <div>
                      <div style={{ color: '#CFCFCF' }}>{car.transmission || 'Automatic'}</div>
                      <div style={{ color: '#999999', fontSize: 12 }}>Transmission</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span style={{ fontSize: 18 }}>⛽</span>
                    <div>
                      <div style={{ color: '#CFCFCF' }}>{car.fuel || 'Petrol'}</div>
                      <div style={{ color: '#999999', fontSize: 12 }}>Fuel Type</div>
                    </div>
                  </div>
                </div>

                {/* DEALER INFO */}
                <div className="mb-6 pb-6 border-b rounded-xl p-4" style={{ borderColor: 'rgba(201,162,77,0.15)', background: 'rgba(201,162,77,0.03)' }}>
                  <h4 className="text-sm font-semibold mb-3" style={{ color: '#FFFFFF' }}>Seller</h4>
                  <div className="text-sm" style={{ color: '#CFCFCF' }}>
                    {car.dealer || 'Mpumalanga Premium Dealership'}
                  </div>
                  <div className="text-xs mt-3 pt-2" style={{ color: '#666666', borderTop: '1px solid rgba(201,162,77,0.1)' }}>
                    NADA Affiliated Dealer
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-2" style={{ color: gold }}>
                    <span>✓ Verified</span>
                  </div>
                </div>

                {/* CTA BUTTONS - Sticky */}
                <div className="space-y-3">
                  <button className="w-full px-6 py-4 rounded-lg text-sm font-semibold transition-all duration-300" style={{ background: gold, color: '#000000' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                    📞 Contact Dealer
                  </button>
                  <button className="w-full px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }}>
                    📅 Schedule Viewing
                  </button>
                  <div className="flex gap-3">
                    <button className="flex-1 px-6 py-3 rounded-lg text-sm font-semibold transition-all" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }} onClick={() => setIsSaved(!isSaved)}>
                      {isSaved ? '❤️' : '🤍'} Save
                    </button>
                    <button className="flex-1 px-6 py-3 rounded-lg text-sm font-semibold transition-all" style={{ border: `1px solid ${gold}`, color: gold, background: 'transparent' }}>
                      📤 Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HIGHLIGHTS STRIP - Spec Trophies */}
          <div className="mt-16 py-12 border-t border-b" style={{ borderColor: 'rgba(201,162,77,0.15)' }}>
            <h2 className="text-2xl font-serif mb-8" style={{ color: '#FFFFFF' }}>Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-xl overflow-hidden" style={{ border: `1px solid rgba(201,162,77,0.15)`, background: 'rgba(201,162,77,0.02)' }}>
              {[
                { value: '6.9', unit: 'L/100km', label: 'Fuel Efficient' },
                { value: '258 hp', unit: 'Power', label: 'Performance' },
                { value: 'Auto', unit: 'Transmission', label: 'Smooth' },
                { value: 'Fair', unit: 'Condition', label: 'Maintained' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 text-center"
                  style={{
                    borderRight: idx < 3 ? `1px solid rgba(201,162,77,0.1)` : 'none'
                  }}
                >
                  <div className="text-3xl font-semibold mb-2" style={{ color: gold }}>
                    {item.value}
                  </div>
                  <div className="text-xs" style={{ color: '#999999' }}>
                    {item.unit}
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#CFCFCF' }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION - Hard limits enforced */}
          <div className="mt-16 py-12 border-b" style={{ borderColor: 'rgba(201,162,77,0.15)' }}>
            <h2 className="text-2xl font-serif mb-6" style={{ color: '#FFFFFF' }}>About this vehicle</h2>
            <div
              className="text-lg leading-relaxed mb-4 overflow-hidden transition-all"
              style={{
                color: '#DDDDDD',
                fontWeight: 300,
                maxHeight: expandDescription ? '500px' : '90px'
              }}
            >
              <p>
                {car.description || 'A premium luxury sedan that combines sophisticated engineering with timeless elegance. This vehicle represents the pinnacle of automotive craftsmanship, designed for discerning drivers who appreciate both performance and refinement. Every detail has been meticulously crafted to deliver an unparalleled driving experience. The spacious interior provides ultimate comfort, while advanced technology ensures smooth, safe journeys.'}
              </p>
            </div>
            {!expandDescription && (
              <button onClick={() => setExpandDescription(true)} className="text-sm font-semibold" style={{ color: gold }}>
                Show more
              </button>
            )}
            {expandDescription && (
              <button onClick={() => setExpandDescription(false)} className="text-sm font-semibold" style={{ color: gold }}>
                Show less
              </button>
            )}
          </div>

          {/* FEATURES - Grouped by Category */}
          <div className="mt-16 py-12">
            <h2 className="text-2xl font-serif mb-8" style={{ color: '#FFFFFF' }}>Features & Equipment</h2>
            <div className="space-y-8">
              {[
                {
                  group: 'Comfort',
                  items: ['Leather Seats', 'Heated Seats', 'Air Suspension', 'Premium Sound']
                },
                {
                  group: 'Technology',
                  items: ['Apple CarPlay', 'Digital Cockpit', 'Park Assist', 'Sunroof']
                },
                {
                  group: 'Safety',
                  items: ['ABS Braking', 'ISOFIX', 'Stability Control', 'Adaptive Lights']
                }
              ].map((category, catIdx) => (
                <div key={catIdx}>
                  <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: gold, letterSpacing: 1 }}>
                    {category.group}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.items.map((feature, i) => (
                      <div key={i} className="px-4 py-3 rounded-full text-sm font-semibold text-center" style={{ border: `1px solid rgba(201,162,77,0.2)`, color: gold, background: 'rgba(201,162,77,0.02)' }}>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
