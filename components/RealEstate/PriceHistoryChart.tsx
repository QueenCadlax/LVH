import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Calendar } from 'lucide-react';

export interface PriceHistoryPoint {
  date: string;
  price: number;
  change: number; // percentage
  action?: string; // 'listed', 'reduced', 'sold'
}

interface PriceHistoryChartProps {
  propertyId: string;
  propertyName: string;
  currentPrice: number;
  currency?: string;
  history: PriceHistoryPoint[];
  timeframe?: '6M' | '1Y' | '2Y' | '5Y' | 'ALL';
  onTimeframeChange?: (timeframe: string) => void;
}

export default function PriceHistoryChart({
  propertyId,
  propertyName,
  currentPrice,
  currency = 'R',
  history = [],
  timeframe = '1Y',
  onTimeframeChange
}: PriceHistoryChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Generate mock data if none provided
  const mockHistory: PriceHistoryPoint[] = [
    { date: '2024-01', price: 1800000, change: 0, action: 'listed' },
    { date: '2024-02', price: 1850000, change: 2.8, action: 'raised' },
    { date: '2024-03', price: 1820000, change: -1.6, action: 'reduced' },
    { date: '2024-04', price: 1790000, change: -1.6 },
    { date: '2024-05', price: 1750000, change: -2.2 },
    { date: '2024-06', price: 1680000, change: -4.0, action: 'reduced' },
    { date: '2024-07', price: 1650000, change: -1.8 },
    { date: '2024-08', price: 1680000, change: 1.8, action: 'raised' },
    { date: '2024-09', price: 1720000, change: 2.4 },
    { date: '2024-10', price: 1750000, change: 1.7 },
    { date: '2024-11', price: 1780000, change: 1.7 },
    { date: '2024-12', price: 1800000, change: 1.1 },
  ];

  const displayHistory = history.length > 0 ? history : mockHistory;
  
  const minPrice = Math.min(...displayHistory.map(h => h.price));
  const maxPrice = Math.max(...displayHistory.map(h => h.price));
  const priceRange = maxPrice - minPrice;
  const startPrice = displayHistory[0]?.price || currentPrice;
  const endPrice = displayHistory[displayHistory.length - 1]?.price || currentPrice;
  const totalChange = ((endPrice - startPrice) / startPrice) * 100;
  const avgPrice = Math.round(displayHistory.reduce((sum, h) => sum + h.price, 0) / displayHistory.length);

  const formatPrice = (price: number) => {
    return `${currency} ${(price / 1000000).toFixed(2)}M`;
  };

  const getYPosition = (price: number) => {
    return 100 - ((price - minPrice) / priceRange) * 100;
  };

  return (
    <div className="bg-black border border-yellow-600/40 rounded-lg p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-bold text-lg">{propertyName}</h3>
          <p className="text-sm text-gray-400 mt-1">Price History & Market Analysis</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{formatPrice(currentPrice)}</p>
          <div className="flex items-center gap-1 text-sm mt-1">
            {totalChange >= 0 ? (
              <>
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-green-400 font-semibold">+{totalChange.toFixed(1)}%</span>
              </>
            ) : (
              <>
                <TrendingDown size={14} className="text-red-400" />
                <span className="text-red-400 font-semibold">{totalChange.toFixed(1)}%</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-3 text-sm">
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <p className="text-gray-400 text-xs mb-1">Current</p>
          <p className="text-white font-bold">{formatPrice(currentPrice)}</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <p className="text-gray-400 text-xs mb-1">Average</p>
          <p className="text-white font-bold">{formatPrice(avgPrice)}</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <p className="text-gray-400 text-xs mb-1">Highest</p>
          <p className="text-white font-bold">{formatPrice(maxPrice)}</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
          <p className="text-gray-400 text-xs mb-1">Lowest</p>
          <p className="text-white font-bold">{formatPrice(minPrice)}</p>
        </div>
      </div>

      {/* CHART */}
      <div className="space-y-3">
        {/* TIMEFRAME SELECTOR */}
        <div className="flex gap-2">
          {['6M', '1Y', '2Y', '5Y', 'ALL'].map((tf) => (
            <button
              key={tf}
              onClick={() => {
                setSelectedTimeframe(tf);
                onTimeframeChange?.(tf);
              }}
              className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                selectedTimeframe === tf
                  ? 'bg-yellow-600 text-black'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* CHART CONTAINER */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <svg viewBox="0 0 1000 300" className="w-full h-auto">
            {/* GRID LINES */}
            {[0, 25, 50, 75, 100].map((pct) => (
              <line
                key={`grid-${pct}`}
                x1="50"
                y1={pct * 3}
                x2="950"
                y2={pct * 3}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}

            {/* Y-AXIS */}
            <line x1="50" y1="0" x2="50" y2="300" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

            {/* X-AXIS */}
            <line x1="50" y1="300" x2="950" y2="300" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

            {/* PRICE LABELS (Y-AXIS) */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((pct, idx) => {
              const price = minPrice + priceRange * pct;
              return (
                <text
                  key={`y-label-${idx}`}
                  x="40"
                  y={300 - pct * 300}
                  textAnchor="end"
                  fontSize="12"
                  fill="rgba(255,255,255,0.6)"
                >
                  {formatPrice(price)}
                </text>
              );
            })}

            {/* DATA POINTS & LINE */}
            <polyline
              points={displayHistory
                .map((h, idx) => {
                  const x = 50 + (idx / (displayHistory.length - 1 || 1)) * 900;
                  const y = 300 - (getYPosition(h.price) / 100) * 300;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#FCD34D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* DATA POINTS (CIRCLES) */}
            {displayHistory.map((h, idx) => {
              const x = 50 + (idx / (displayHistory.length - 1 || 1)) * 900;
              const y = 300 - (getYPosition(h.price) / 100) * 300;
              const isHovered = hoveredPoint === idx;

              return (
                <g key={`point-${idx}`} onMouseEnter={() => setHoveredPoint(idx)} onMouseLeave={() => setHoveredPoint(null)}>
                  <circle cx={x} cy={y} r={isHovered ? 6 : 4} fill="#FCD34D" className="cursor-pointer transition-all" />

                  {/* TOOLTIP */}
                  {isHovered && (
                    <g>
                      <rect x={x - 60} y={y - 60} width="120" height="55" fill="rgba(0,0,0,0.9)" rx="4" />
                      <text x={x} y={y - 40} textAnchor="middle" fontSize="11" fill="#FCD34D" fontWeight="bold">
                        {h.date}
                      </text>
                      <text x={x} y={y - 25} textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">
                        {formatPrice(h.price)}
                      </text>
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        fontSize="10"
                        fill={h.change >= 0 ? '#22C55E' : '#EF4444'}
                      >
                        {h.change >= 0 ? '+' : ''}{h.change.toFixed(1)}%
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* DATE LABELS (X-AXIS) */}
            {displayHistory.map((h, idx) => {
              if (idx % Math.ceil(displayHistory.length / 6) === 0) {
                const x = 50 + (idx / (displayHistory.length - 1 || 1)) * 900;
                return (
                  <text
                    key={`x-label-${idx}`}
                    x={x}
                    y="320"
                    textAnchor="middle"
                    fontSize="11"
                    fill="rgba(255,255,255,0.6)"
                  >
                    {h.date}
                  </text>
                );
              }
              return null;
            })}
          </svg>
        </div>
      </div>

      {/* LEGEND & ACTIONS */}
      <div className="space-y-3">
        {/* ACTIONS LEGEND */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-xs bg-white/5 px-2 py-1 rounded">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-gray-300">Price Raised</span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-white/5 px-2 py-1 rounded">
            <span className="w-2 h-2 bg-red-400 rounded-full" />
            <span className="text-gray-300">Price Reduced</span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-white/5 px-2 py-1 rounded">
            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="text-gray-300">Listed</span>
          </div>
        </div>

        {/* INSIGHTS */}
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3">
          <p className="text-xs font-semibold text-blue-300 mb-2">💡 Market Insights</p>
          <div className="space-y-1 text-xs text-blue-200">
            <p>• Property has changed {displayHistory.filter(h => h.action).length} times over {selectedTimeframe}</p>
            <p>• Current price is {totalChange >= 0 ? 'above' : 'below'} initial listing by {Math.abs(totalChange).toFixed(1)}%</p>
            <p>• Average price point: {formatPrice(avgPrice)}</p>
          </div>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg font-bold transition text-sm">
        📊 Download Report
      </button>
    </div>
  );
}
