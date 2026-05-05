import React from 'react';

export const VirtualTour: React.FC<{ images?: string[]; embedUrl?: string }> = ({ images = [], embedUrl }) => {
  if (embedUrl) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/6 bg-[#050505]">
        <iframe title="Virtual Tour" src={embedUrl} style={{ width: '100%', height: 480, border: 'none' }} />
      </div>
    );
  }

  const carousel = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`tour-${i}`} className="w-full h-48 object-cover rounded-lg" />
      ))}
    </div>
  );

  return (
    <div className="p-4 bg-[#0b0b0b] rounded-2xl border border-white/6">
      <h3 className="text-lg font-semibold text-white mb-3">Virtual Tour</h3>
      {images.length ? carousel : <div className="text-gray-400">No tour available. Upload 360 tour or images.</div>}
    </div>
  );
};

export default VirtualTour;
