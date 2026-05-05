import React from 'react';
import { Star, Car, Users, Briefcase, ShieldCheck, Wifi, Heart, Share2, MapPin } from 'lucide-react';
import { PrimaryButton } from './Shared';

const Amenity = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-1.5 text-xs text-gray-400">
    <div className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-yellow-400 flex-shrink-0">{icon}</div>
    <div className="truncate">{label}</div>
  </div>
);

const TransportCard: React.FC<{
  service: any;
  onBook?: (s: any) => void;
  onContact?: (s: any) => void;
  onOpen?: (s: any) => void;
}> = ({ service, onBook, onContact, onOpen }) => {
  return (
    <div
      className="group bg-[#0b0b0b] rounded-xl overflow-hidden border border-white/6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => onOpen && onOpen(service)}
    >
      <div className="relative overflow-hidden h-40">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute top-2 left-2">
          {service.tier && (
            <div className="bg-black text-yellow-400 text-[10px] font-semibold px-2 py-0.5 rounded">{service.tier.toUpperCase()}</div>
          )}
        </div>

        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={(e) => { e.stopPropagation(); }} className="p-1 rounded-full bg-black/60 border border-white/6 text-white">
            <Heart size={12} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); }} className="p-1 rounded-full bg-black/60 border border-white/6 text-white">
            <Share2 size={12} />
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2">
        <div>
          <h3 className="text-sm font-medium text-white truncate leading-tight">{service.name}</h3>
          <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1 line-clamp-1">
            <MapPin className="text-yellow-400 flex-shrink-0" size={12} /> 
            <span className="truncate">{service.vehicleType || 'Transport'} • {service.provider?.name || service.location || 'Mpumalanga'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-white text-sm">{(service.rating || 0).toFixed(1)}</span>
          </div>
          <div className="text-gray-500 text-xs">({service.reviewCount || 0})</div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-xs py-1.5">
          <Amenity icon={<Car size={12} />} label={service.vehicleType || 'Vehicle'} />
          <Amenity icon={<Users size={12} />} label={`${service.capacity || '–'} guests`} />
          <Amenity icon={<Briefcase size={12} />} label={`${service.luggage || '2'} bags`} />
          <Amenity icon={<ShieldCheck size={12} />} label="Insured" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1">
          <div>
            <div className="text-yellow-400 font-semibold text-sm">{service.price || 'POA'}</div>
            <div className="text-gray-500 text-xs">{service.duration || ''}</div>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={(e) => { e.stopPropagation(); onBook && onBook(service); }} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold text-xs hover:shadow-md transition-shadow">Book</button>
            <button onClick={(e) => { e.stopPropagation(); onContact && onContact(service); }} className="px-2 py-1.5 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 transition-colors text-xs font-medium">Ask</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportCard;
