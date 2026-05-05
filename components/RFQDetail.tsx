import React, { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, AlertCircle, Award } from 'lucide-react';
import { RequestForQuote, QuoteResponse, RFQStatus } from '../types';
import { QuoteCard } from './QuoteCard';
import { QuoteComparison } from './QuoteComparison';

interface RFQDetailProps {
  rfq: RequestForQuote;
  quotes: QuoteResponse[];
  onBack: () => void;
  navigate: (view: string, category?: string, id?: string) => void;
}

export const RFQDetail: React.FC<RFQDetailProps> = ({ rfq, quotes, onBack, navigate }) => {
  const [compareMode, setCompareMode] = useState(false);
  const [selectedQuotes, setSelectedQuotes] = useState<Set<string>>(new Set());

  const toggleQuoteSelection = (quoteId: string) => {
    const newSelected = new Set(selectedQuotes);
    if (newSelected.has(quoteId)) {
      newSelected.delete(quoteId);
    } else {
      if (newSelected.size < 3) {
        newSelected.add(quoteId);
      }
    }
    setSelectedQuotes(newSelected);
  };

  const selectedQuotesList = quotes.filter(q => selectedQuotes.has(q.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold mb-4"
          >
            <ArrowLeft size={20} /> Back to Requests
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{rfq.title}</h1>
              <p className="text-gray-600">
                Posted {new Date(rfq.createdDate).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <span className={`inline-block px-4 py-2 rounded-lg font-semibold text-white ${
              rfq.status === RFQStatus.Published ? 'bg-green-600' : 'bg-yellow-600'
            }`}>
              {rfq.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: RFQ Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About This Request</h2>
              <p className="text-gray-700 leading-relaxed">{rfq.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-1">LOCATION</p>
                <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin size={18} className="text-amber-600" /> {rfq.area}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-1">BUDGET RANGE</p>
                <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <DollarSign size={18} className="text-amber-600" /> 
                  R{rfq.budget.min.toLocaleString()} - R{rfq.budget.max.toLocaleString()}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold mb-1">TIMELINE</p>
                <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Clock size={18} className="text-amber-600" /> {rfq.timeline}
                </p>
              </div>

              <div className={`rounded-lg p-4 border-2 ${
                rfq.urgency === 'High' ? 'bg-red-50 border-red-300' :
                rfq.urgency === 'Medium' ? 'bg-yellow-50 border-yellow-300' :
                'bg-green-50 border-green-300'
              }`}>
                <p className="text-sm text-gray-600 font-semibold mb-1">URGENCY</p>
                <p className="text-lg font-bold">{rfq.urgency === 'High' ? '🔴' : rfq.urgency === 'Medium' ? '🟡' : '🟢'} {rfq.urgency}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={20} className="text-amber-600" /> Requirements
              </h3>
              <div className="space-y-2">
                {rfq.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Preference */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm text-gray-600 font-semibold mb-2">PREFERRED CONTACT METHOD</p>
              <p className="text-lg font-bold text-gray-900">{rfq.contactPreference}</p>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Image */}
            {rfq.imageUrl && (
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <img src={rfq.imageUrl} alt={rfq.title} className="w-full h-48 object-cover" />
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Quotes Received</span>
                  <span className="text-2xl font-bold text-amber-700">{quotes.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Pending Response</span>
                  <span className="text-2xl font-bold text-yellow-700">{quotes.filter(q => q.status === 'Pending').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Accepted</span>
                  <span className="text-2xl font-bold text-green-700">{quotes.filter(q => q.status === 'Accepted').length}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {selectedQuotesList.length > 0 && (
              <button
                onClick={() => setCompareMode(!compareMode)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
              >
                {compareMode ? 'Hide Comparison' : `Compare ${selectedQuotesList.length} Quote${selectedQuotesList.length > 1 ? 's' : ''}`}
              </button>
            )}
          </div>
        </div>

        {/* Quotes Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quotes from Providers ({quotes.length})</h2>

          {quotes.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium">No quotes yet</p>
              <p className="text-gray-500 text-sm mt-1">Quotes will appear here as businesses submit them</p>
            </div>
          ) : compareMode && selectedQuotesList.length > 0 ? (
            <QuoteComparison
              quotes={selectedQuotesList}
              onSelectQuote={(quote) => {
                // Could navigate to quote detail or show business profile
                console.log('Selected quote:', quote);
              }}
            />
          ) : (
            <div className="grid gap-4">
              {quotes.map(quote => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  isSelected={selectedQuotes.has(quote.id)}
                  onSelect={() => toggleQuoteSelection(quote.id)}
                />
              ))}
            </div>
          )}

          {quotes.length > 1 && !compareMode && selectedQuotes.size === 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
              💡 <strong>Tip:</strong> Click on quotes to select them for side-by-side comparison (up to 3)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
