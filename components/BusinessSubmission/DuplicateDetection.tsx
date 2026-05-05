import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Search } from 'lucide-react';

export interface DuplicateMatch {
  id: string;
  businessName: string;
  category: string;
  location: string;
  similarity: number; // 0-100
  lastUpdated: string;
}

interface DuplicateDetectionProps {
  businessName: string;
  category: string;
  onDuplicatesFound?: (matches: DuplicateMatch[]) => void;
}

export default function DuplicateDetection({ businessName, category, onDuplicatesFound }: DuplicateDetectionProps) {
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  // Mock database of existing businesses
  const EXISTING_BUSINESSES: DuplicateMatch[] = [
    {
      id: 'b_kuka_cafe',
      businessName: 'Kuka Café',
      category: 'FOOD & HOSPITALITY',
      location: 'Nelspruit CBD',
      similarity: 45,
      lastUpdated: '2025-12-15'
    },
    {
      id: 'b_garden_restaurant',
      businessName: 'Garden Restaurant',
      category: 'FOOD & HOSPITALITY',
      location: 'Hazyview',
      similarity: 30,
      lastUpdated: '2025-11-20'
    },
    {
      id: 'r_property_dynamics',
      businessName: 'Property Dynamics',
      category: 'REAL ESTATE & PROPERTY',
      location: 'Nelspruit',
      similarity: 55,
      lastUpdated: '2025-10-10'
    }
  ];

  // String similarity algorithm (Levenshtein distance)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();

    if (s1 === s2) return 100;

    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;

    const editDistance = getEditDistance(longer, shorter);
    return Math.round(((longer.length - editDistance) / longer.length) * 100);
  };

  const getEditDistance = (s1: string, s2: string): number => {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  };

  const checkDuplicates = async () => {
    if (!businessName.trim()) {
      alert('Please enter a business name first');
      return;
    }

    setIsChecking(true);
    setHasChecked(true);

    // Simulate API call
    setTimeout(() => {
      const matches: DuplicateMatch[] = EXISTING_BUSINESSES
        .filter(biz => biz.category === category || category === '')
        .map(biz => ({
          ...biz,
          similarity: calculateSimilarity(businessName, biz.businessName)
        }))
        .filter(biz => biz.similarity >= 40) // Only show matches > 40%
        .sort((a, b) => b.similarity - a.similarity);

      setDuplicates(matches);
      setIsChecking(false);
      onDuplicatesFound?.(matches);
    }, 1200);
  };

  const getRiskLevel = (similarity: number) => {
    if (similarity >= 80) return { level: 'high', color: 'red', icon: '⚠️' };
    if (similarity >= 60) return { level: 'medium', color: 'yellow', icon: '⚡' };
    return { level: 'low', color: 'green', icon: '✓' };
  };

  return (
    <div className="bg-white/5 border border-orange-600/30 rounded-lg p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Search size={20} className="text-orange-400" />
          <div>
            <p className="text-sm font-bold text-orange-300">Duplicate Detection</p>
            <p className="text-xs text-gray-400 mt-0.5">Check if similar businesses exist</p>
          </div>
        </div>
      </div>

      {/* CHECK BUTTON */}
      <button
        onClick={checkDuplicates}
        disabled={isChecking || !businessName.trim()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition text-sm"
      >
        <Search size={16} />
        {isChecking ? 'Scanning Database...' : 'Check for Duplicates'}
      </button>

      {/* RESULTS */}
      {hasChecked && !isChecking && (
        <div className="space-y-3">
          {duplicates.length === 0 ? (
            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4 text-center">
              <CheckCircle size={24} className="text-green-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-green-300">Great! No duplicates found</p>
              <p className="text-xs text-green-200 mt-1">Your business name appears to be unique</p>
            </div>
          ) : (
            <>
              <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-red-300">
                      ⚠️ Found {duplicates.length} similar business{duplicates.length !== 1 ? 'es' : ''}
                    </p>
                    <p className="text-xs text-red-200 mt-1">
                      Please review below and consider a unique name if needed
                    </p>
                  </div>
                </div>
              </div>

              {/* DUPLICATE LIST */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {duplicates.map((dup, idx) => {
                  const risk = getRiskLevel(dup.similarity);
                  return (
                    <div
                      key={idx}
                      className={`border rounded-lg p-3 ${
                        risk.level === 'high' ? 'bg-red-900/10 border-red-600/30' :
                        risk.level === 'medium' ? 'bg-yellow-900/10 border-yellow-600/30' :
                        'bg-green-900/10 border-green-600/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-white text-sm">{dup.businessName}</p>
                          <p className="text-xs text-gray-400 mt-1">{dup.category} • {dup.location}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-right">
                            <p className={`text-lg font-bold ${
                              risk.level === 'high' ? 'text-red-400' :
                              risk.level === 'medium' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {dup.similarity}%
                            </p>
                            <p className="text-xs text-gray-500">match</p>
                          </div>
                          <span className="text-xl">{risk.icon}</span>
                        </div>
                      </div>

                      {/* SIMILARITY BAR */}
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            risk.level === 'high' ? 'bg-red-500' :
                            risk.level === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${dup.similarity}%` }}
                        />
                      </div>

                      {/* RISK LABEL */}
                      <p className="text-xs text-gray-400 mt-2">
                        Last updated: {new Date(dup.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* RECOMMENDATION */}
              {duplicates.some(d => d.similarity >= 80) && (
                <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-red-300 mb-2">📌 Recommendation:</p>
                  <p className="text-xs text-red-200">
                    Very similar name detected. Consider:
                  </p>
                  <ul className="text-xs text-red-200 mt-2 space-y-1 ml-4">
                    <li>• Adding your location (e.g., "Café - Nelspruit")</li>
                    <li>• Using a unique descriptor (e.g., "The Cozy Café")</li>
                    <li>• Differentiating by service (e.g., "Vegan Café")</li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* LOADING STATE */}
      {isChecking && (
        <div className="flex items-center justify-center py-6">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* INFO */}
      <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-3 text-xs text-orange-200 space-y-1">
        <p className="font-semibold">🔍 How it works:</p>
        <ul className="space-y-1 ml-2">
          <li>• Scans existing businesses in category</li>
          <li>• Checks name similarity (40% threshold)</li>
          <li>• Shows risk level (Low/Medium/High)</li>
          <li>• Helps you avoid brand conflicts</li>
        </ul>
      </div>
    </div>
  );
}
