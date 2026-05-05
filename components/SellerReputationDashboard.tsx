import React, { useState } from 'react';
import { ArrowLeft, Trophy, TrendingUp, Users, MessageSquare, ShieldCheck, Star } from 'lucide-react';
import { SellerScoreBreakdown, TrustBadgeDisplay } from './Shared';

const SellerReputationDashboard = ({ business, navigate }: any) => {
  const trustStack = business?.trustStack;
  if (!trustStack) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4">
        <button onClick={() => navigate('directory')} className="flex items-center gap-2 text-gold-500 hover:text-gold-400 mb-6">
          <ArrowLeft size={20} /> Back
        </button>
        <p className="text-gray-400">No reputation data available</p>
      </div>
    );
  }

  const score = trustStack.sellerScore;

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <button onClick={() => navigate('directory')} className="flex items-center gap-2 text-gold-500 hover:text-gold-400 mb-8">
          <ArrowLeft size={20} /> Back to Directory
        </button>

        <div className="mb-12">
          <h1 className="text-5xl font-serif text-white mb-2">{business.name}</h1>
          <p className="text-gray-400 text-lg">Seller Reputation Dashboard</p>
        </div>

        {/* Overall Score Hero */}
        <div className="bg-gradient-to-br from-purple-600/20 to-gold-600/10 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-7xl font-black text-white mb-2">{score.overallScore.toFixed(1)}</div>
              <div className="text-gold-400 font-black uppercase tracking-widest text-sm">Overall Score</div>
              <div className="flex justify-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={20} className={i <= Math.round(score.overallScore) ? 'fill-gold-400 text-gold-400' : 'text-gray-600'} />
                ))}
              </div>
            </div>

            <div className="text-center border-l border-r border-white/10">
              <div className="text-4xl font-black text-green-400 mb-2">{score.completedTransactions}</div>
              <div className="text-gray-400 font-black uppercase tracking-widest text-xs">Completed Transactions</div>
              <div className="text-gray-500 text-sm mt-2">{score.verifiedPurchaseReviews} verified</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-blue-400 mb-2">{score.totalReviews}</div>
              <div className="text-gray-400 font-black uppercase tracking-widest text-xs">Total Reviews</div>
              <div className="text-gray-500 text-sm mt-2">Last updated {new Date(score.lastUpdated).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        {trustStack.badges && trustStack.badges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Trophy className="text-gold-400" size={28} />
              Trust Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trustStack.badges.map((badge: string) => (
                <div key={badge} className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <TrustBadgeDisplay badge={badge} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <TrendingUp className="text-gold-400" size={28} />
            Performance Metrics
          </h2>
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
            <SellerScoreBreakdown score={score} />
          </div>
        </div>

        {/* Verification Indicators */}
        {trustStack.indicators && trustStack.indicators.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="text-gold-400" size={28} />
              Verification Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trustStack.indicators.map((indicator: any, idx: number) => {
                const typeLabels: Record<string, string> = {
                  'ISO': 'ISO Certified',
                  'BGC': 'Background Check',
                  'INSURANCE': 'Business Insurance',
                  'RESPONSE_TIME': 'Response Time',
                  'PAYMENT_SECURE': 'Secure Payments'
                };

                return (
                  <div key={idx} className="bg-gradient-to-br from-green-600/20 to-emerald-600/10 border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-white font-bold mb-1">{typeLabels[indicator.type] || indicator.type}</div>
                        {indicator.verificationDate && (
                          <div className="text-gray-400 text-sm">Verified {new Date(indicator.verificationDate).toLocaleDateString()}</div>
                        )}
                        {indicator.badge && (
                          <div className="text-gold-400 font-black text-sm mt-2">{indicator.badge}</div>
                        )}
                      </div>
                      <div className="text-green-400 text-2xl">✓</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-black text-gold-400 mb-2">{(score.quality).toFixed(1)}/5</div>
            <div className="text-gray-400 text-sm uppercase font-black tracking-widest">Quality</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-black text-green-400 mb-2">{score.reliability}%</div>
            <div className="text-gray-400 text-sm uppercase font-black tracking-widest">Reliability</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-black text-blue-400 mb-2">{score.communication}%</div>
            <div className="text-gray-400 text-sm uppercase font-black tracking-widest">Communication</div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-black text-purple-400 mb-2">{score.security}%</div>
            <div className="text-gray-400 text-sm uppercase font-black tracking-widest">Security</div>
          </div>
        </div>

        {/* How Reputation Works */}
        <div className="mt-16 bg-gold-500/5 border border-gold-500/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">How Reputation Works</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <Star size={20} className="text-gold-400 flex-shrink-0 mt-1" />
              <span><strong>Quality:</strong> Average rating from verified purchases</span>
            </li>
            <li className="flex items-start gap-3">
              <Star size={20} className="text-green-400 flex-shrink-0 mt-1" />
              <span><strong>Reliability:</strong> On-time delivery percentage</span>
            </li>
            <li className="flex items-start gap-3">
              <Star size={20} className="text-blue-400 flex-shrink-0 mt-1" />
              <span><strong>Communication:</strong> Average response time to inquiries</span>
            </li>
            <li className="flex items-start gap-3">
              <Star size={20} className="text-purple-400 flex-shrink-0 mt-1" />
              <span><strong>Security:</strong> Trust score based on transaction safety</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerReputationDashboard;
