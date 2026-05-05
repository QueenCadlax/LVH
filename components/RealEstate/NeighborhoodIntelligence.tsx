import React, { useEffect, useState } from 'react';
import realEstateService from '../../services/realEstateService';
import { NeighborhoodScore } from './types';

export const NeighborhoodIntelligence: React.FC<{ area: string }> = ({ area }) => {
  const [score, setScore] = useState<NeighborhoodScore | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    realEstateService.getNeighborhoodScore(area).then(s => {
      if (!mounted) return;
      setScore(s);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [area]);

  if (loading || !score) return <div className="p-6 bg-[#0b0b0b] rounded-2xl border border-white/6">Loading neighborhood intelligence...</div>;

  return (
    <div className="p-6 bg-[#0b0b0b] rounded-2xl border border-white/6">
      <h3 className="text-xl font-semibold text-white mb-3">Neighborhood Intelligence — {area}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Metric label="Safety" value={score.safety} />
        <Metric label="Amenities" value={score.amenities} />
        <Metric label="Schools" value={score.schools} />
        <Metric label="Transport" value={score.transport} />
        <Metric label="Growth" value={score.growthIndex} />
        <div className="p-4 bg-[#0a0a0a] rounded-lg">
          <div className="text-sm text-gray-400">Composite Score</div>
          <div className="text-2xl font-bold text-white">{score.composite}</div>
          <div className="text-sm text-gray-500 mt-2">Median price: R{score.comparableMedianPrice.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

const Metric: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="p-4 bg-[#0a0a0a] rounded-lg">
    <div className="text-sm text-gray-400">{label}</div>
    <div className="text-xl font-bold text-white">{value}</div>
    <div className="text-xs text-gray-500 mt-1">{value >= 75 ? 'Excellent' : value >= 50 ? 'Good' : 'Improvement needed'}</div>
  </div>
);

export default NeighborhoodIntelligence;
