import React from 'react';
import InvestmentCalculator from '../components/RealEstate/InvestmentCalculator';
import NeighborhoodIntelligence from '../components/RealEstate/NeighborhoodIntelligence';
import VirtualTour from '../components/RealEstate/VirtualTour';
import VirtualStaging from '../components/RealEstate/VirtualStaging';

const RealEstatePremiumPage: React.FC = () => {
  const sampleImages = [
    'https://images.unsplash.com/photo-1494548162494-384bba4ab999?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-serif text-white">Premium Real Estate Tools</h1>
          <p className="text-gray-400">Investment analysis, neighbourhood intelligence, virtual staging and tours — built for premium listings.</p>

          <InvestmentCalculator />

          <div className="mt-6">
            <VirtualTour images={sampleImages} />
          </div>

          <div className="mt-6">
            <VirtualStaging title="Staged 3-bedroom villa" />
          </div>
        </div>

        <aside className="space-y-6">
          <NeighborhoodIntelligence area="Mbombela" />

          <div className="p-6 bg-[#0b0b0b] rounded-2xl border border-white/6">
            <h3 className="text-lg font-semibold text-white mb-2">Lead Capture</h3>
            <p className="text-sm text-gray-400 mb-4">Capture buyer interest and export leads to your CRM (HubSpot/Pipedrive) — frontend stub.</p>
            <button className="bg-white text-black px-4 py-2 rounded-full font-bold">Capture Lead (Demo)</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RealEstatePremiumPage;
