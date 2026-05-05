import React, { useState } from 'react';
import { Sparkles, Send, MapPin, DollarSign, Clock, CheckCircle, Heart, Share2 } from 'lucide-react';
import { generateVIPItinerary } from '../services/aiService';
import { MPUMALANGA_AREAS } from '../types';

interface VIPItineraryPlannerProps {
  businesses: any[];
  destinations: any[];
  navigate: (view: string) => void;
}

export const VIPItineraryPlanner: React.FC<VIPItineraryPlannerProps> = ({
  businesses,
  destinations,
  navigate
}) => {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [itinerary, setItinerary] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    duration: 3,
    budget: 15000,
    interests: [] as string[],
    startArea: 'Nelspruit'
  });

  const interestOptions = [
    'Fine Dining',
    'Nature & Adventure',
    'Wellness & Spa',
    'Cultural Experiences',
    'Wine Tasting',
    'Safari & Wildlife',
    'Historical Sites',
    'Art & Photography'
  ];

  const areas = MPUMALANGA_AREAS;

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGenerateItinerary = async () => {
    if (formData.interests.length === 0) {
      alert('Please select at least one interest');
      return;
    }

    setStep('generating');
    
    try {
      const result = await generateVIPItinerary({
        duration: formData.duration,
        budget: formData.budget,
        interests: formData.interests,
        startArea: formData.startArea,
        businesses,
        destinations
      });
      setItinerary(result);
      setStep('result');
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setStep('input');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="text-gold-500 animate-pulse" size={32} />
              <div className="absolute inset-0 bg-gold-500/30 rounded-full blur-lg -z-10"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white">VIP Itinerary Planner</h1>
          </div>
          <p className="text-gold-300 text-lg">AI-crafted luxury experiences in Mpumalanga</p>
        </div>

        {step === 'input' && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-gold-500/30 rounded-2xl p-8 backdrop-blur-sm space-y-8">
            {/* Duration */}
            <div>
              <label className="block text-white font-semibold mb-4 flex items-center gap-2">
                <Clock size={20} className="text-gold-500" />
                Trip Duration
              </label>
              <div className="flex gap-4 flex-wrap">
                {[2, 3, 4, 5, 7].map(days => (
                  <button
                    key={days}
                    onClick={() => setFormData(prev => ({ ...prev, duration: days }))}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      formData.duration === days
                        ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/50'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {days} days
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-white font-semibold mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-gold-500" />
                Total Budget
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={formData.budget}
                  onChange={e => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-gold-500/20 border border-gold-500/40 rounded-lg p-4">
                  <p className="text-gold-300 text-sm mb-1">Your Budget</p>
                  <p className="text-white text-2xl font-bold">R {formData.budget.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    ~R {Math.round(formData.budget / formData.duration).toLocaleString()} per day
                  </p>
                </div>
              </div>
            </div>

            {/* Starting Area */}
            <div>
              <label className="block text-white font-semibold mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-gold-500" />
                Starting Location
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {areas.map(area => (
                  <button
                    key={area}
                    onClick={() => setFormData(prev => ({ ...prev, startArea: area }))}
                    className={`p-3 rounded-lg font-semibold transition-all ${
                      formData.startArea === area
                        ? 'bg-gold-500 text-black shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-white font-semibold mb-4 flex items-center gap-2">
                <Heart size={20} className="text-gold-500" />
                Your Interests (Select at least 1)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-4 rounded-lg font-semibold transition-all text-left ${
                      formData.interests.includes(interest)
                        ? 'bg-gold-500/30 text-gold-100 border-2 border-gold-500'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.interests.includes(interest)
                          ? 'bg-gold-500 border-gold-500'
                          : 'border-white/40'
                      }`}>
                        {formData.interests.includes(interest) && (
                          <CheckCircle size={16} className="text-black" />
                        )}
                      </div>
                      {interest}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateItinerary}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-gold-500/50"
            >
              <Sparkles size={20} />
              Generate My VIP Itinerary
            </button>
          </div>
        )}

        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gold-500/30 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-gold-500 animate-pulse" size={24} />
              </div>
            </div>
            <p className="text-white text-lg font-serif">Crafting your luxury itinerary...</p>
            <p className="text-gray-400 text-sm max-w-md text-center">
              Our AI is personalizing the perfect Mpumalanga experience just for you
            </p>
          </div>
        )}

        {step === 'result' && itinerary && (
          <div className="space-y-8">
            {/* Header with Actions */}
            <div className="bg-gradient-to-r from-gold-500/20 to-transparent border border-gold-500/30 rounded-xl p-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-serif text-white mb-2">{itinerary.title}</h2>
                <p className="text-gold-300">{formData.duration} Days • R {itinerary.totalEstimatedCost?.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/20">
                  <Heart size={20} className="text-gold-500" />
                </button>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/20">
                  <Share2 size={20} className="text-gold-500" />
                </button>
              </div>
            </div>

            {/* Day-by-day Itinerary */}
            <div className="space-y-4">
              {itinerary.days?.map((day: any) => (
                <div key={day.day} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-gold-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold-500/30 border border-gold-500/50 flex items-center justify-center">
                      <span className="font-serif font-bold text-gold-300">Day {day.day}</span>
                    </div>
                    {day.suggestedBusinesses && day.suggestedBusinesses.length > 0 && (
                      <p className="text-sm text-gold-300">
                        Est. R{day.estimatedCost?.toLocaleString() || 'TBD'}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-gold-300 text-sm uppercase tracking-wider mb-2">Morning</h4>
                      <p className="text-gray-300 text-sm">{day.morning}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold-300 text-sm uppercase tracking-wider mb-2">Afternoon</h4>
                      <p className="text-gray-300 text-sm">{day.afternoon}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold-300 text-sm uppercase tracking-wider mb-2">Evening</h4>
                      <p className="text-gray-300 text-sm">{day.evening}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Local Insights */}
            {itinerary.local_insights && itinerary.local_insights.length > 0 && (
              <div className="bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 rounded-xl p-6">
                <h3 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-gold-500" />
                  Local Insights
                </h3>
                <ul className="space-y-2">
                  {itinerary.local_insights.map((insight: string, idx: number) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <span className="text-gold-500 font-bold">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep('input')}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg border border-white/20 transition-all"
              >
                Create Another
              </button>
              <button
                onClick={() => navigate('home')}
                className="flex-1 bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 rounded-lg transition-all shadow-lg"
              >
                Explore Businesses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VIPItineraryPlanner;
