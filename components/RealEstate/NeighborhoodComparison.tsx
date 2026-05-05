import React, { useState } from 'react';
import { MapPin, AlertCircle, TrendingUp } from 'lucide-react';

interface Neighborhood {
  name: string;
  safety: number;
  schools: number;
  transport: number;
  amenities: number;
  growth: number;
  medianPrice: number;
  description: string;
  highlights: string[];
}

interface NeighborhoodComparisonProps {
  selectedNeighborhoods?: string[];
  onCompare?: (neighborhoods: Neighborhood[]) => void;
}

const NEIGHBORHOODS_DATA: Record<string, Neighborhood> = {
  'Mbombela Central': {
    name: 'Mbombela Central',
    safety: 72,
    schools: 85,
    transport: 88,
    amenities: 90,
    growth: 65,
    medianPrice: 2100000,
    description: 'Urban center with excellent public transport and shopping facilities.',
    highlights: ['CBD proximity', 'Public transport hub', 'Shopping malls', 'Business district']
  },
  'White River': {
    name: 'White River',
    safety: 88,
    schools: 82,
    transport: 65,
    amenities: 78,
    growth: 72,
    medianPrice: 1950000,
    description: 'Safe suburban area with good schools and family-friendly amenities.',
    highlights: ['Safe neighborhood', 'Quality schools', 'Family-friendly', 'Golf courses']
  },
  'Nelspruit Heights': {
    name: 'Nelspruit Heights',
    safety: 82,
    schools: 88,
    transport: 72,
    amenities: 85,
    growth: 78,
    medianPrice: 2300000,
    description: 'Prestigious residential area with premium amenities and high growth.',
    highlights: ['Premium location', 'Top-rated schools', 'Luxury amenities', 'Green spaces']
  },
  'Riverside': {
    name: 'Riverside',
    safety: 68,
    schools: 72,
    transport: 82,
    amenities: 80,
    growth: 85,
    medianPrice: 1650000,
    description: 'Emerging neighborhood with strong growth potential and good connectivity.',
    highlights: ['High growth', 'Affordable', 'Good transport', 'Development potential']
  },
  'Sonheuwel': {
    name: 'Sonheuwel',
    safety: 85,
    schools: 80,
    transport: 60,
    amenities: 75,
    growth: 70,
    medianPrice: 1800000,
    description: 'Quiet residential area perfect for those seeking peace and security.',
    highlights: ['Quiet suburb', 'Secure neighborhood', 'Family homes', 'Nature access']
  }
};

interface ScoreBarProps {
  label: string;
  value: number;
  color: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ label, value, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default function NeighborhoodComparison({
  selectedNeighborhoods = ['Mbombela Central', 'White River'],
  onCompare
}: NeighborhoodComparisonProps) {
  const [selected, setSelected] = useState<string[]>(selectedNeighborhoods);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const toggleSelection = (neighborhood: string) => {
    if (selected.includes(neighborhood)) {
      setSelected(selected.filter((n) => n !== neighborhood));
    } else if (selected.length < 4) {
      setSelected([...selected, neighborhood]);
    }
  };

  const comparableNeighborhoods = selected.map((name) => NEIGHBORHOODS_DATA[name]);

  // Calculate averages
  const average = (metric: keyof Neighborhood) => {
    const sum = comparableNeighborhoods.reduce((acc, n) => {
      const val = n[metric];
      return acc + (typeof val === 'number' ? val : 0);
    }, 0);
    return Math.round(sum / comparableNeighborhoods.length);
  };

  const getColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 70) return 'bg-yellow-500';
    if (value >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMetricInsight = (metric: string, neighborhoods: Neighborhood[]) => {
    const values = neighborhoods.map((n) => n[metric as keyof Neighborhood] as number);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const diff = max - min;

    if (diff === 0) return 'All neighborhoods equal on this metric';
    if (diff <= 5) return 'Neighborhoods are quite similar';
    if (diff <= 15) return 'Moderate variation between neighborhoods';
    return 'Significant variation - consider priorities';
  };

  return (
    <div className="bg-black border border-yellow-600/40 rounded-lg p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <MapPin size={24} className="text-yellow-400" />
        <div>
          <h3 className="text-white font-bold text-lg">Neighborhood Comparison</h3>
          <p className="text-sm text-gray-400">Compare up to 4 neighborhoods side-by-side</p>
        </div>
      </div>

      {/* NEIGHBORHOOD SELECTION */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-white">Select Neighborhoods</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.keys(NEIGHBORHOODS_DATA).map((name) => (
            <button
              key={name}
              onClick={() => toggleSelection(name)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                selected.includes(name)
                  ? 'bg-yellow-600 text-black'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              } ${
                !selected.includes(name) && selected.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!selected.includes(name) && selected.length >= 4}
            >
              {name}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">
          Selected: {selected.length}/4 | Click to toggle neighborhoods
        </p>
      </div>

      {/* COMPARISON TABLE */}
      {selected.length > 0 && (
        <div className="space-y-4">
          {/* METRIC GRID */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-gray-300 font-semibold">Metric</th>
                  {comparableNeighborhoods.map((n) => (
                    <th
                      key={n.name}
                      className="text-center py-2 px-2 text-yellow-400 font-bold text-xs"
                    >
                      {n.name}
                    </th>
                  ))}
                  {selected.length > 1 && (
                    <th className="text-center py-2 px-2 text-gray-300 font-semibold text-xs">Avg</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {['safety', 'schools', 'transport', 'amenities', 'growth'].map((metric) => (
                  <tr key={metric} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-3 text-gray-300 font-semibold capitalize cursor-pointer"
                        onClick={() =>
                          setExpandedMetric(expandedMetric === metric ? null : metric)
                        }
                    >
                      {metric === 'safety' && '🛡️ Safety'}
                      {metric === 'schools' && '🏫 Schools'}
                      {metric === 'transport' && '🚌 Transport'}
                      {metric === 'amenities' && '🏪 Amenities'}
                      {metric === 'growth' && '📈 Growth'}
                    </td>
                    {comparableNeighborhoods.map((n) => {
                      const value = n[metric as keyof Neighborhood] as number;
                      return (
                        <td key={n.name} className="text-center py-3 px-2">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`inline-block px-2 py-1 rounded font-bold text-xs ${
                              getColor(value)
                            } text-white`}>
                              {value}%
                            </span>
                          </div>
                        </td>
                      );
                    })}
                    {selected.length > 1 && (
                      <td className="text-center py-3 px-2">
                        <span className="inline-block px-2 py-1 rounded font-bold text-xs bg-blue-600 text-white">
                          {average(metric as keyof Neighborhood)}%
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EXPANDED METRIC INSIGHT */}
          {expandedMetric && (
            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <p className="text-sm text-blue-200 font-semibold mb-2">
                💡 {expandedMetric.charAt(0).toUpperCase() + expandedMetric.slice(1)} Insight
              </p>
              <p className="text-sm text-blue-100">
                {getMetricInsight(expandedMetric, comparableNeighborhoods)}
              </p>
            </div>
          )}

          {/* NEIGHBORHOOD DETAILS */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">Neighborhood Details</h4>
            {comparableNeighborhoods.map((neighborhood) => (
              <div key={neighborhood.name} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="text-white font-bold text-sm">{neighborhood.name}</h5>
                    <p className="text-xs text-gray-400 mt-1">{neighborhood.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Median Price</p>
                    <p className="text-lg font-bold text-yellow-400">
                      R {(neighborhood.medianPrice / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </div>

                {/* METRIC BARS */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-white/10">
                  <ScoreBar label="Safety" value={neighborhood.safety} color="bg-red-500" />
                  <ScoreBar label="Schools" value={neighborhood.schools} color="bg-blue-500" />
                  <ScoreBar label="Transport" value={neighborhood.transport} color="bg-green-500" />
                  <ScoreBar label="Amenities" value={neighborhood.amenities} color="bg-purple-500" />
                  <ScoreBar label="Growth" value={neighborhood.growth} color="bg-yellow-500" />
                </div>

                {/* HIGHLIGHTS */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 font-semibold mb-2">Key Highlights</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/10 text-white rounded-full text-xs border border-white/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RECOMMENDATION */}
          {selected.length > 1 && (
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp size={20} className="text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-yellow-200">Recommendation</p>
                  <p className="text-sm text-yellow-100 mt-1">
                    {selected.length === 2
                      ? `Based on your comparison, consider your priorities: ${
                          comparableNeighborhoods[0].safety > comparableNeighborhoods[1].safety
                            ? `${comparableNeighborhoods[0].name} is safer`
                            : `${comparableNeighborhoods[1].name} is safer`
                        }, and ${
                          comparableNeighborhoods[0].growth > comparableNeighborhoods[1].growth
                            ? `${comparableNeighborhoods[0].name} has more growth potential`
                            : `${comparableNeighborhoods[1].name} has more growth potential`
                        }.`
                      : 'Review the metrics above to identify neighborhoods that match your lifestyle priorities.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selected.length === 0 && (
        <div className="bg-gray-900/50 border border-gray-600/30 rounded-lg p-8 text-center">
          <AlertCircle size={32} className="text-gray-400 mx-auto mb-3 opacity-50" />
          <p className="text-gray-400">Select neighborhoods to compare</p>
        </div>
      )}
    </div>
  );
}
