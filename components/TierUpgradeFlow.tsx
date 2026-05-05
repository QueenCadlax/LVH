import React, { useState } from 'react';
import { ListingTier, PRICING_STRUCTURE } from '../types';
import { X, Check, AlertCircle } from 'lucide-react';

interface TierUpgradeFlowProps {
  currentTier: ListingTier;
  businessId: string;
  businessName: string;
  onClose: () => void;
  onUpgrade: (newTier: ListingTier, businessId: string) => Promise<void>;
  isAuthenticated: boolean;
}

const TierUpgradeFlow: React.FC<TierUpgradeFlowProps> = ({
  currentTier,
  businessId,
  businessName,
  onClose,
  onUpgrade,
  isAuthenticated
}) => {
  const [selectedTier, setSelectedTier] = useState<ListingTier | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const tierOrder = [ListingTier.Trial, ListingTier.Premium, ListingTier.Elite, ListingTier.Platinum];
  const currentTierIndex = tierOrder.indexOf(currentTier);
  const upgradableTiers = tierOrder.slice(currentTierIndex + 1);

  const handleUpgrade = async () => {
    if (!selectedTier || !isAuthenticated) {
      setError('Please select a tier or log in first');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await onUpgrade(selectedTier, businessId);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upgrade failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gold-500 to-gold-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Upgrade Your Tier</h2>
            <p className="text-gold-100 text-sm">Current: <span className="font-semibold capitalize">{currentTier}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-gold-700 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Business Info */}
        <div className="bg-gold-50 p-6 border-b border-gold-200">
          <p className="text-gray-700">
            <span className="font-semibold">Upgrading:</span> {businessName}
          </p>
        </div>

        {/* Messages */}
        {!isAuthenticated && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 m-6 flex items-start gap-3">
            <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-blue-800 text-sm">Please log in to upgrade your tier</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6 flex items-start gap-3">
            <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-green-800 font-semibold">Upgrade successful!</p>
              <p className="text-green-700 text-sm">Your tier has been updated.</p>
            </div>
          </div>
        )}

        {/* Tier Options */}
        <div className="p-6 space-y-4">
          {upgradableTiers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">You're already at the highest tier!</p>
            </div>
          ) : (
            <>
              <p className="text-gray-700 font-semibold mb-4">Available Upgrades:</p>
              <div className="grid gap-4">
                {upgradableTiers.map((tier) => {
                  const tierPricing = PRICING_STRUCTURE[tier];
                  const currentPricing = PRICING_STRUCTURE[currentTier];
                  const priceDifference = tierPricing.cost - currentPricing.cost;

                  return (
                    <div
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedTier === tier
                          ? 'border-gold-500 bg-gold-50'
                          : 'border-gray-200 bg-white hover:border-gold-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg capitalize">{tier}</h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {tier === ListingTier.Premium && 'Enhanced visibility and features'}
                            {tier === ListingTier.Elite && 'Premium features with verified badge'}
                            {tier === ListingTier.Platinum && 'Luxury tier with priority support'}
                          </p>
                          <ul className="text-xs text-gray-500 mt-2 space-y-1">
                            {tier === ListingTier.Premium && (
                              <>
                                <li>✓ Verified badge</li>
                                <li>✓ Analytics dashboard</li>
                                <li>✓ Direct messaging</li>
                              </>
                            )}
                            {tier === ListingTier.Elite && (
                              <>
                                <li>✓ Gold badge + featured placement</li>
                                <li>✓ Advanced analytics</li>
                                <li>✓ Priority support</li>
                              </>
                            )}
                            {tier === ListingTier.Platinum && (
                              <>
                                <li>✓ Purple badge + top placement</li>
                                <li>✓ Premium concierge access</li>
                                <li>✓ 24/7 support</li>
                              </>
                            )}
                          </ul>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gold-600">R{priceDifference.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">upgrade cost</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 border-t flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          {upgradableTiers.length > 0 && (
            <button
              onClick={handleUpgrade}
              disabled={!selectedTier || loading || !isAuthenticated}
              className="px-6 py-2 rounded-lg bg-gold-500 text-white font-semibold hover:bg-gold-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Processing...' : `Upgrade Now`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TierUpgradeFlow;
