import React, { useState } from 'react';
import realEstateService from '../../services/realEstateService';

export const VirtualStaging: React.FC<{ title?: string }> = ({ title = 'Virtual Staging' }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const url = await realEstateService.generateVirtualStaging(title);
    setImage(url);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-[#0b0b0b] rounded-2xl border border-white/6">
      <h3 className="text-xl font-semibold text-white mb-3">Virtual Staging</h3>
      <p className="text-sm text-gray-400 mb-4">Generate a staged preview image for marketing artwork. Uses AI placeholders (frontend stub).</p>
      <div className="flex gap-3 items-center">
        <button onClick={handleGenerate} className="bg-gold-500 text-black px-4 py-2 rounded-full font-bold">Generate Staging</button>
        {loading && <div className="text-gray-400">Generating...</div>}
      </div>

      {image && (
        <div className="mt-4">
          <img src={image} alt="staged" className="w-full h-60 object-cover rounded-lg border border-white/6" />
          <div className="mt-2 text-sm text-gray-400">Right-click → Save image to use in listings.</div>
        </div>
      )}
    </div>
  );
};

export default VirtualStaging;
