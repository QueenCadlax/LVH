import React from 'react';
import { CheckCircle, Clock, MessageSquare, Shield, Award } from 'lucide-react';
import { QuoteResponse } from '../types';

interface QuoteCardProps {
  quote: QuoteResponse;
  onSelect: (quote: QuoteResponse) => void;
  isSelected?: boolean;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onSelect, isSelected = false }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-300';
      case 'Negotiating': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted': return <CheckCircle size={16} />;
      case 'Rejected': return '✗';
      case 'Negotiating': return <MessageSquare size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const daysValid = quote.validUntil ? 
    Math.ceil((new Date(quote.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;

  return (
    <div
      onClick={() => onSelect(quote)}
      className={`p-5 rounded-lg border-2 cursor-pointer transition ${
        isSelected
          ? 'border-amber-500 bg-amber-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-sm'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{quote.businessName}</h4>
          <p className="text-xs text-gray-500 mt-1">
            Submitted {new Date(quote.submittedDate).toLocaleDateString('en-ZA')}
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded border inline-flex items-center gap-1 ${getStatusColor(quote.status)}`}>
          {getStatusIcon(quote.status)}
          {quote.status}
        </span>
      </div>

      {/* Quote Amount - Highlighted */}
      <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
        <p className="text-xs text-amber-700 font-semibold uppercase">Quoted Price</p>
        <p className="text-3xl font-bold text-amber-700">R{quote.quoteAmount.toLocaleString()}</p>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-gray-600 font-semibold">TIMELINE</p>
          <p className="text-sm font-medium text-gray-900">{quote.timeline}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 font-semibold">VALID UNTIL</p>
          <p className="text-sm font-medium text-gray-900">
            {daysValid > 0 ? `${daysValid} days` : 'Expired'}
          </p>
        </div>
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-xs text-blue-700 font-semibold mb-1 flex items-center gap-1">
            <MessageSquare size={14} /> Notes from Provider
          </p>
          <p className="text-sm text-blue-900">{quote.notes}</p>
        </div>
      )}

      {/* Deliverables */}
      {quote.deliverables && quote.deliverables.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Award size={14} /> What's Included
          </p>
          <ul className="space-y-1">
            {quote.deliverables.map((del, idx) => (
              <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                <span className="text-amber-600">✓</span> {del}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Terms */}
      {quote.termsAndConditions && (
        <div className="flex items-center gap-1 text-xs text-gray-600 p-2 bg-gray-50 rounded border border-gray-200">
          <Shield size={14} className="text-gray-500" />
          <span>Terms & Conditions apply</span>
        </div>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-amber-200">
          <p className="text-xs text-amber-700 font-semibold flex items-center gap-1">
            <CheckCircle size={14} /> Selected for comparison
          </p>
        </div>
      )}
    </div>
  );
};
