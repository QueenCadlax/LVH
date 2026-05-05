import React from 'react';
import { createPortal } from 'react-dom';
import { X, Star, MapPin, Phone, MessageCircle, Wifi, Users, Clock, CheckCircle } from 'lucide-react';
import { PrimaryButton } from './Shared';

const TransportDetail: React.FC<{
  service: any;
  onClose: () => void;
}> = ({ service, onClose }) => {
  if (!service) return null;

  const reviews = service.reviews || [
    { id: 'r1', author: 'A. van der Merwe', text: 'Fantastic service, smooth ride, highly recommended!', rating: 5 },
    { id: 'r2', author: 'L. Nkosi', text: 'Driver was punctual and knowledgeable about the area.', rating: 5 }
  ];

  const experiences = service.connected || [
    { id: 's1', name: 'Leopard Crest Safari Lodge', image: 'https://images.unsplash.com/photo-1508248186352-6e8d3d0f0e0a?auto=format&fit=crop&q=80&w=400', rating: 5, price: 'From R12,800' },
    { id: 's2', name: 'Blyde Canyon Cliff Lodge', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400', rating: 4.9, price: 'From R7,400' }
  ];

  const node = (
    <div className="fixed inset-0 z-[140] overflow-auto bg-black/80 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto my-12 bg-[#070707] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        {/* HERO */}
        <div className="relative h-[44vh] min-h-[340px]">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute top-6 left-6 flex items-center gap-3">
            {service.tier === 'Elite' && <div className="bg-gold-500 text-black text-[11px] font-bold px-3 py-1 rounded shadow">ELITE</div>}
            {service.isFeatured && <div className="bg-gold-400/80 text-black text-[11px] font-bold px-3 py-1 rounded shadow">FEATURED</div>}
          </div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-black/40 border border-white/10 text-white">
            <X />
          </button>

          <div className="absolute left-6 bottom-6 text-white z-20">
            <h1 className="text-4xl md:text-5xl font-serif mb-2">{service.name}</h1>
            <div className="flex flex-wrap gap-4 items-center text-gray-300">
              <div className="flex items-center gap-2"><span className="text-gold-400 font-semibold">Vehicle:</span> {service.vehicleType || 'Luxury Sedan'}</div>
              <div className="flex items-center gap-2"><span className="text-gold-400 font-semibold">Capacity:</span> {service.capacity || '4 passengers'}</div>
              <div className="flex items-center gap-2"><span className="text-gold-400 font-semibold">Duration:</span> {service.duration || '1 hr'}</div>
              <div className="flex items-center gap-2"><span className="text-gold-400 font-semibold">Price:</span> {service.price || 'From R350 / ride'}</div>
              <div className="flex items-center gap-2 text-gold-400"><Star /> <span className="font-bold">{service.rating || 4.9}</span> <span className="text-gray-400">({service.reviewCount || 45})</span></div>
            </div>
            <div className="mt-4 flex gap-3">
              <PrimaryButton onClick={() => window.alert('Request Booking')}>Request Booking</PrimaryButton>
              <button onClick={() => window.open('https://wa.me/27', '_blank')} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-black border border-white/8 text-gold-300 hover:bg-gold-500 hover:text-black transition"> <MessageCircle /> WhatsApp Concierge</button>
            </div>
          </div>
        </div>

        {/* MAIN + SIDEBAR */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <main className="md:col-span-2 text-white space-y-8">
            {/* About */}
            <section>
              <h3 className="text-2xl font-serif text-white mb-3">About This Ride</h3>
              <p className="text-gray-300">{service.description || 'Travel Mpumalanga in comfort with fully vetted drivers. Enjoy scenic drives, private transfers, and luxury vehicles designed to match your journey.'}</p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-gold-400 mt-1"><svg className="w-6 h-6" /><span /></div>
                  <div>
                    <div className="font-semibold">Private Vehicle</div>
                    <div className="text-gray-400 text-sm">Exclusive car for your booking</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gold-400 mt-1"><svg className="w-6 h-6" /><span /></div>
                  <div>
                    <div className="font-semibold">Personal Chauffeur</div>
                    <div className="text-gray-400 text-sm">Professional, vetted drivers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gold-400 mt-1"><svg className="w-6 h-6" /><span /></div>
                  <div>
                    <div className="font-semibold">Scenic Route Options</div>
                    <div className="text-gray-400 text-sm">Customisable scenic itineraries</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gold-400 mt-1"><svg className="w-6 h-6" /><span /></div>
                  <div>
                    <div className="font-semibold">Fully Insured</div>
                    <div className="text-gray-400 text-sm">Comprehensive coverage</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gold-400 mt-1"><svg className="w-6 h-6" /><span /></div>
                  <div>
                    <div className="font-semibold">Wi‑Fi & Connectivity</div>
                    <div className="text-gray-400 text-sm">Onboard Wi‑Fi available</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-gold-400 mt-1"><svg className="w-6 h-6" /><span /></div>
                  <div>
                    <div className="font-semibold">Pet‑Friendly Options</div>
                    <div className="text-gray-400 text-sm">Bring small pets on request</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Experiences */}
            <section>
              <h4 className="text-xl text-white font-semibold mb-4">Experiences / Connected Stays</h4>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {experiences.map(e => (
                  <div key={e.id} className="min-w-[220px] bg-[#0b0b0b] rounded-xl p-3 border border-white/6">
                    <img src={e.image} alt={e.name} className="w-full h-36 object-cover rounded-md mb-2" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">{e.name}</div>
                        <div className="text-gray-400 text-sm">⭐ {e.rating} · {e.price}</div>
                      </div>
                      <button className="text-gold-300 font-semibold">View Stay →</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Host / Provider */}
            <section>
              <h4 className="text-xl text-white font-semibold mb-4">Hosted By</h4>
              <div className="bg-[#0b0b0b] p-4 rounded-xl border border-white/6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-black"><img src={service.provider?.avatar || service.logo || service.image} alt="host" className="w-full h-full object-cover" /></div>
                <div>
                  <div className="text-white font-semibold">{service.provider?.name || service.provider || 'Luxury Chauffeur MP'}</div>
                  <div className="text-gray-400 text-sm">Verified by LowveldHub <CheckCircle className="inline ml-2 text-gold-400" /></div>
                  <div className="text-gray-400 text-sm">Response time: within 24 hours · Languages: {service.provider?.languages?.join(' / ') || 'English / Afrikaans'}</div>
                </div>
                <div className="ml-auto flex gap-2">
                  <a href={`https://wa.me/${service.phone || ''}`} target="_blank" rel="noreferrer" className="bg-green-600/10 border border-green-600/20 px-3 py-2 rounded text-green-300">WhatsApp</a>
                  <a href={`tel:${service.phone || ''}`} className="bg-black/60 border border-white/8 px-3 py-2 rounded text-gold-300">Call</a>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h4 className="text-xl text-white font-semibold mb-4">Guest Reviews</h4>
              <div className="bg-[#0b0b0b] p-4 rounded-xl border border-white/6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl text-gold-400 font-bold">{(service.rating || 4.9).toFixed(1)}</div>
                  <div>
                    <div className="text-white font-semibold">⭐⭐⭐⭐⭐ {(service.rating || 4.9)} / {service.reviewCount || 45}</div>
                    <div className="text-gray-400 text-sm">Based on {service.reviewCount || 45} reviews</div>
                  </div>
                </div>

                {reviews.map(r => (
                  <div key={r.id} className="p-3 bg-black/40 rounded">
                    <div className="text-gray-200 font-semibold">{r.author}</div>
                    <div className="text-gray-400 text-sm">{r.text}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Map */}
            <section>
              <h4 className="text-xl text-white font-semibold mb-4">Map & Route</h4>
              <div className="w-full h-56 bg-[#0a0a0a] rounded-xl border border-white/6 flex items-center justify-center text-gray-500">Map placeholder (dark mode)</div>
            </section>
          </main>

          {/* Booking panel */}
          <aside className="md:col-span-1">
            <div className="sticky top-24 bg-[#0b0b0b] p-5 rounded-xl border border-white/6">
              <div className="text-sm text-gray-400 mb-2">Booking</div>
              <div className="text-2xl font-bold text-white mb-4">{service.price || 'POA'}</div>

              <label className="text-xs text-gray-400">Pick-up Location</label>
              <input placeholder="e.g. KMIA" className="w-full bg-black/30 p-2 rounded mb-3 text-white" />

              <label className="text-xs text-gray-400">Drop-off Location</label>
              <input placeholder="e.g. Leopard Crest" className="w-full bg-black/30 p-2 rounded mb-3 text-white" />

              <label className="text-xs text-gray-400">Date & Time</label>
              <input type="datetime-local" className="w-full bg-black/30 p-2 rounded mb-3 text-white" />

              <label className="text-xs text-gray-400">Passengers</label>
              <select className="w-full bg-black/30 p-2 rounded mb-3 text-white">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>

              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-2">Extras</div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm"><input type="checkbox" className="mr-2" /> Wi‑Fi</label>
                  <label className="text-sm"><input type="checkbox" className="mr-2" /> Child Seat</label>
                  <label className="text-sm"><input type="checkbox" className="mr-2" /> Private Guide</label>
                </div>
              </div>

              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-600 to-gold-400 text-black font-black mb-3">Request Booking</button>
              <button onClick={() => window.open('https://wa.me/27', '_blank')} className="w-full py-3 rounded-lg border border-white/8 text-sm font-semibold">WhatsApp Concierge</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
    );

  if (typeof document !== 'undefined') {
    return createPortal(node, document.body);
  }

  return node;
};

export default TransportDetail;
