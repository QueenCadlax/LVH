import React, { useState } from 'react';
import { Sparkles, AlertCircle, Check } from 'lucide-react';

interface AutoCategorizationProps {
  businessName: string;
  description: string;
  onCategorySelect: (category: string, confidence: number) => void;
}

export default function AutoCategorization({ businessName, description, onCategorySelect }: AutoCategorizationProps) {
  const [suggestions, setSuggestions] = useState<Array<{ category: string; confidence: number; reason: string }>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const CATEGORY_KEYWORDS: Record<string, { keywords: string[]; confidence: number }> = {
    'FOOD & HOSPITALITY': {
      keywords: ['restaurant', 'cafe', 'food', 'dining', 'kitchen', 'chef', 'meal', 'beverage', 'coffee', 'wine', 'bar', 'grill', 'pizza', 'burger', 'shisanyama', 'braai'],
      confidence: 1.0
    },
    'REAL ESTATE & PROPERTY': {
      keywords: ['property', 'house', 'land', 'estate', 'rent', 'lease', 'agent', 'development', 'building', 'residential', 'commercial', 'realty'],
      confidence: 0.95
    },
    'AUTOMOTIVE': {
      keywords: ['car', 'vehicle', 'auto', 'garage', 'mechanic', 'service', 'dealer', 'sedan', 'suv', 'bakkie', 'truck', 'bike', 'motorcycle'],
      confidence: 0.9
    },
    'HEALTH & MEDICAL': {
      keywords: ['doctor', 'clinic', 'hospital', 'medical', 'health', 'pharmacy', 'dental', 'dentist', 'therapy', 'physio', 'nurse', 'care'],
      confidence: 0.95
    },
    'BEAUTY, WELLNESS & PERSONAL CARE': {
      keywords: ['salon', 'spa', 'massage', 'beauty', 'hair', 'nails', 'grooming', 'cosmetics', 'skincare', 'wellness', 'therapy'],
      confidence: 0.9
    },
    'EDUCATION & SCHOOLS': {
      keywords: ['school', 'training', 'tuition', 'education', 'course', 'academy', 'university', 'college', 'learning', 'class'],
      confidence: 0.95
    },
    'SHOPPING & RETAIL': {
      keywords: ['shop', 'store', 'retail', 'boutique', 'mall', 'clothing', 'goods', 'products', 'sales'],
      confidence: 0.85
    },
    'TOURISM, TRAVEL & STAYS': {
      keywords: ['hotel', 'lodge', 'resort', 'guesthouse', 'stay', 'accommodation', 'tour', 'travel', 'safari', 'camp'],
      confidence: 0.9
    },
    'TRANSPORT, CHAUFFEUR & FLEET SERVICES': {
      keywords: ['transport', 'taxi', 'bus', 'chauffeur', 'driver', 'delivery', 'logistics', 'fleet', 'courier'],
      confidence: 0.9
    },
    'LEGAL & ADVISORY': {
      keywords: ['lawyer', 'legal', 'attorney', 'law', 'advocate', 'solicitor', 'counsel', 'litigation'],
      confidence: 0.95
    }
  };

  const analyzeBusiness = async () => {
    if (!businessName.trim()) {
      alert('Please enter a business name first');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with keyword matching
    setTimeout(() => {
      const combinedText = `${businessName} ${description}`.toLowerCase();
      const scores: Record<string, { confidence: number; matchedKeywords: string[] }> = {};

      // Calculate matches for each category
      Object.entries(CATEGORY_KEYWORDS).forEach(([category, { keywords, confidence: baseConfidence }]) => {
        const matchedKeywords = keywords.filter(kw => combinedText.includes(kw));
        const matchCount = matchedKeywords.length;
        
        if (matchCount > 0) {
          const adjustedConfidence = Math.min(
            baseConfidence * (1 + (matchCount * 0.15)),
            0.99
          );
          scores[category] = {
            confidence: adjustedConfidence,
            matchedKeywords
          };
        }
      });

      // Sort by confidence and create suggestions
      const sortedSuggestions = Object.entries(scores)
        .map(([category, { confidence, matchedKeywords }]) => ({
          category,
          confidence: Math.round(confidence * 100),
          reason: matchedKeywords.slice(0, 3).join(', ')
        }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5);

      setSuggestions(sortedSuggestions);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleSelectCategory = (category: string, confidence: number) => {
    setSelectedCategory(category);
    onCategorySelect(category, confidence);
  };

  return (
    <div className="bg-white/5 border border-blue-600/30 rounded-lg p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-blue-400" />
          <div>
            <p className="text-sm font-bold text-blue-300">AI Category Suggestion</p>
            <p className="text-xs text-gray-400 mt-0.5">Auto-detect your business category</p>
          </div>
        </div>
      </div>

      {/* ANALYZE BUTTON */}
      <button
        onClick={analyzeBusiness}
        disabled={isAnalyzing || !businessName.trim()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition text-sm"
      >
        <Sparkles size={16} />
        {isAnalyzing ? 'Analyzing...' : 'Suggest Category'}
      </button>

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-300 uppercase">Top Matches</p>
          {suggestions.map((sugg, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectCategory(sugg.category, sugg.confidence)}
              className={`w-full text-left p-3 rounded-lg border transition ${
                selectedCategory === sugg.category
                  ? 'bg-green-600/20 border-green-600/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-white">{sugg.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        sugg.confidence >= 80 ? 'bg-green-500' :
                        sugg.confidence >= 60 ? 'bg-yellow-500' :
                        'bg-orange-500'
                      }`}
                      style={{ width: `${sugg.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white w-10 text-right">{sugg.confidence}%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">Matched: {sugg.reason}</p>
              {selectedCategory === sugg.category && (
                <div className="mt-2 flex items-center gap-1 text-green-400 text-xs font-semibold">
                  <Check size={14} />
                  Selected
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!isAnalyzing && suggestions.length === 0 && (
        <div className="text-center py-6 bg-white/5 rounded-lg border border-white/10">
          <AlertCircle size={24} className="text-gray-600 mx-auto mb-2" />
          <p className="text-xs text-gray-400">Enter business name and click "Suggest Category" for AI recommendations</p>
        </div>
      )}

      {/* LOADING STATE */}
      {isAnalyzing && (
        <div className="flex items-center justify-center py-6">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* INFO BOX */}
      <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3 text-xs text-blue-200 space-y-1">
        <p className="font-semibold">💡 How it works:</p>
        <ul className="space-y-1 ml-2">
          <li>• AI analyzes your business name and description</li>
          <li>• Matches against 10+ category definitions</li>
          <li>• Shows confidence score for each match</li>
          <li>• You can accept or ignore suggestions</li>
        </ul>
      </div>
    </div>
  );
}
