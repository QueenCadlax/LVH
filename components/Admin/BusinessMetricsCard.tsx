import React from 'react';
import { TrendingUp, Eye, Heart, MessageSquare, Calendar, Users } from 'lucide-react';

export interface BusinessMetrics {
  businessId: string;
  businessName: string;
  totalViews: number;
  totalFavorites: number;
  totalEnquiries: number;
  weeklyTrend: number; // percentage change
  lastUpdated: string;
  contactAttempts: number;
  conversionRate: number; // enquiries / views
}

interface BusinessMetricsCardProps {
  metrics: BusinessMetrics;
  onViewDetails?: (businessId: string) => void;
}

export default function BusinessMetricsCard({ metrics, onViewDetails }: BusinessMetricsCardProps) {
  const conversionPercent = ((metrics.totalEnquiries / Math.max(metrics.totalViews, 1)) * 100).toFixed(1);
  const isGrowth = metrics.weeklyTrend >= 0;

  return (
    <div className="bg-black border border-yellow-600/40 rounded-lg p-4 hover:border-yellow-600/60 transition">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm">{metrics.businessName}</h3>
          <p className="text-xs text-gray-400 mt-0.5">Updated {new Date(metrics.lastUpdated).toLocaleDateString()}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
          isGrowth ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
        }`}>
          <TrendingUp size={12} />
          {isGrowth ? '+' : ''}{metrics.weeklyTrend}%
        </div>
      </div>

      {/* MAIN METRICS */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* VIEWS */}
        <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
          <div className="flex items-center justify-center mb-2">
            <Eye size={16} className="text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{metrics.totalViews}</p>
          <p className="text-xs text-gray-400 mt-1">Views</p>
        </div>

        {/* FAVORITES */}
        <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
          <div className="flex items-center justify-center mb-2">
            <Heart size={16} className="text-pink-400" />
          </div>
          <p className="text-2xl font-bold text-white">{metrics.totalFavorites}</p>
          <p className="text-xs text-gray-400 mt-1">Favorites</p>
        </div>

        {/* ENQUIRIES */}
        <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
          <div className="flex items-center justify-center mb-2">
            <MessageSquare size={16} className="text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{metrics.totalEnquiries}</p>
          <p className="text-xs text-gray-400 mt-1">Enquiries</p>
        </div>
      </div>

      {/* SECONDARY METRICS */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        {/* CONVERSION RATE */}
        <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-2">
          <p className="text-xs text-yellow-200 font-semibold">Conversion Rate</p>
          <p className="text-lg font-bold text-yellow-400 mt-1">{conversionPercent}%</p>
          <p className="text-xs text-gray-400 mt-1">Enquiries / Views</p>
        </div>

        {/* AVG CONTACTS */}
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-2">
          <p className="text-xs text-blue-200 font-semibold">Contact Attempts</p>
          <p className="text-lg font-bold text-blue-400 mt-1">{metrics.contactAttempts}</p>
          <p className="text-xs text-gray-400 mt-1">This month</p>
        </div>
      </div>

      {/* PERFORMANCE INSIGHT */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-4">
        <p className="text-xs font-semibold text-white mb-2">📊 Performance Insight</p>
        <div className="space-y-1 text-xs text-gray-300">
          {metrics.totalViews === 0 ? (
            <p>No views yet. <span className="text-yellow-400 font-semibold">Promote this listing</span> to attract attention.</p>
          ) : conversionPercent > 5 ? (
            <p>✓ Strong conversion rate! This listing is <span className="text-green-400 font-semibold">performing well</span>.</p>
          ) : conversionPercent > 2 ? (
            <p>Moderate engagement. Consider <span className="text-yellow-400 font-semibold">enhancing photos</span> or description.</p>
          ) : (
            <p>Low conversion rate. <span className="text-yellow-400 font-semibold">Update listing details</span> to improve appeal.</p>
          )}
        </div>
      </div>

      {/* ACTION BUTTON */}
      {onViewDetails && (
        <button
          onClick={() => onViewDetails(metrics.businessId)}
          className="w-full px-3 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/50 text-yellow-300 rounded-lg text-sm font-bold transition"
        >
          View Full Analytics
        </button>
      )}
    </div>
  );
}
