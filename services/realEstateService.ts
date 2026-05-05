import { NeighborhoodScore } from '../components/RealEstate/types';
import * as aiService from './aiService';

// Frontend-first mocks and wrappers. Replace with backend calls later.

export const getNeighborhoodScore = async (area: string): Promise<NeighborhoodScore> => {
  // Mock algorithmic score; in production call an analytics service
  const base = Math.max(40, Math.floor(Math.random() * 40) + 50);
  const score: NeighborhoodScore = {
    safety: Math.min(100, base + Math.floor(Math.random() * 10)),
    amenities: Math.min(100, base - 5 + Math.floor(Math.random() * 15)),
    schools: Math.min(100, base - 8 + Math.floor(Math.random() * 16)),
    transport: Math.min(100, base - 10 + Math.floor(Math.random() * 20)),
    growthIndex: Math.min(100, base + Math.floor(Math.random() * 20)),
    composite: 0,
    comparableMedianPrice: 850000 + Math.floor(Math.random() * 120000)
  };
  score.composite = Math.round((score.safety + score.amenities + score.schools + score.transport + score.growthIndex) / 5);
  return new Promise(resolve => setTimeout(() => resolve(score), 600));
};

export const generateVirtualStaging = async (title: string): Promise<string> => {
  // Use aiService.generateLuxuryPlaceholder for an image placeholder
  try {
    const res: any = await aiService.generateLuxuryPlaceholder(title);
    // aiService should return an object with `imageUrl` or fallback text; adapt as needed
    if (res && typeof res === 'string') return res;
    if (res && res.imageUrl) return res.imageUrl;
    return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400';
  } catch (err) {
    console.error('Staging generation error', err);
    return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400';
  }
};

export default { getNeighborhoodScore, generateVirtualStaging };
