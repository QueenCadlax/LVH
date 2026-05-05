// Tier enforcement logic
import { TIER_FEATURES } from '../models/Admin';

export const checkTierLimit = (tier: string, resourceType: 'images' | 'videos', currentCount: number): boolean => {
  const features = TIER_FEATURES[tier];
  if (!features) return false;

  switch (resourceType) {
    case 'images':
      return currentCount < features.maxImages;
    case 'videos':
      return currentCount < features.maxVideos;
    default:
      return false;
  }
};

export const getTierLimit = (tier: string, resourceType: 'images' | 'videos'): number => {
  const features = TIER_FEATURES[tier];
  if (!features) return 0;

  switch (resourceType) {
    case 'images':
      return features.maxImages;
    case 'videos':
      return features.maxVideos;
    default:
      return 0;
  }
};

export const getFeatureAccessByTier = (tier: string, feature: string): boolean => {
  const features = TIER_FEATURES[tier];
  if (!features) return false;

  switch (feature) {
    case 'featured':
      return features.featuredPlacement;
    case 'contact_highlight':
      return features.contactHighlight;
    case 'concierge':
      return features.conciergeSupport;
    case 'analytics':
      return features.analyticsAccess;
    case 'api':
      return features.apiAccess;
    default:
      return false;
  }
};

// Tier-based ranking for search results
export const calculateBusinessRank = (
  business: any,
): number => {
  let rank = 0;

  // Base rank from rating
  rank += (business.rating || 0) * 10;

  // Engagement
  rank += (business.clicks || 0) * 0.5;
  rank += (business.reviews || 0) * 1;

  // Tier bonus
  const tierBonuses: Record<string, number> = {
    platinum: 100,
    premium: 50,
    free: 0,
  };

  rank += tierBonuses[business.tier] || 0;

  // Featured placement bonus
  if (business.status === 'approved' && business.tier !== 'free') {
    rank += 25;
  }

  return rank;
};

// Sort businesses by tier and engagement
export const rankBusinessesByTier = (businesses: any[]): any[] => {
  return businesses
    .map(b => ({
      ...b,
      rank: calculateBusinessRank(b),
    }))
    .sort((a, b) => b.rank - a.rank);
};
