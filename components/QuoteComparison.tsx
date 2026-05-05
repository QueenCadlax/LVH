import React from 'react';
import { QuoteResponse } from '../types';
import { Check, X, AlertCircle } from 'lucide-react';

interface QuoteComparisonProps {
  quotes: QuoteResponse[];
  onSelectQuote: (quote: QuoteResponse) => void;
}

export const QuoteComparison: React.FC<QuoteComparisonProps> = ({ quotes, onSelectQuote }) => {
  if (quotes.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 font-medium">No quotes to compare</p>
        <p className="text-gray-500 text-sm mt-1">Select 2-3 quotes above to compare side-by-side</p>
      </div>
    );
  }

  const lowestPrice = Math.min(...quotes.map(q => q.quoteAmount));
  const fastestTimeline = quotes.reduce((prev, current) => {
    const prevDays = parseInt(prev.timeline);
    const currDays = parseInt(current.timeline);
    return currDays < prevDays ? current : prev;
  });

  const getComparisonMetrics = (quote: QuoteResponse) => {
    const pricePercentile = ((quote.quoteAmount - lowestPrice) / lowestPrice) * 100;
    const isLowest = quote.quoteAmount === lowestPrice;
    const isFastest = quote.timeline === fastestTimeline.timeline;

    return { pricePercentile, isLowest, isFastest };
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left font-bold">Provider</th>
            {quotes.map(quote => (
              <th key={quote.id} className="px-4 py-3 text-left font-bold min-w-[200px]">
                <div className="flex items-center justify-between">
                  <span>{quote.businessName}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* Price Row */}
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-4 font-semibold text-gray-900">Price</td>
            {quotes.map(quote => {
              const { isLowest, pricePercentile } = getComparisonMetrics(quote);
              return (
                <td key={quote.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-amber-700">
                        R{quote.quoteAmount.toLocaleString()}
                      </p>
                      {isLowest && (
                        <p className="text-xs text-green-700 font-semibold mt-1 flex items-center gap-1">
                          <Check size={14} /> Best Price
                        </p>
                      )}
                      {!isLowest && (
                        <p className="text-xs text-red-700 font-semibold mt-1">
                          +{pricePercentile.toFixed(0)}% higher
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Timeline Row */}
          <tr className="bg-gray-50">
            <td className="px-4 py-4 font-semibold text-gray-900">Timeline</td>
            {quotes.map(quote => {
              const { isFastest } = getComparisonMetrics(quote);
              return (
                <td key={quote.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{quote.timeline}</p>
                    {isFastest && (
                      <p className="text-xs text-green-700 font-semibold flex items-center gap-1">
                        <Check size={14} /> Fastest
                      </p>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Status Row */}
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-4 font-semibold text-gray-900">Status</td>
            {quotes.map(quote => (
              <td key={quote.id} className="px-4 py-4">
                <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                  quote.status === 'Accepted'
                    ? 'bg-green-100 text-green-800'
                    : quote.status === 'Rejected'
                    ? 'bg-red-100 text-red-800'
                    : quote.status === 'Negotiating'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {quote.status}
                </span>
              </td>
            ))}
          </tr>

          {/* Validity Row */}
          <tr className="bg-gray-50">
            <td className="px-4 py-4 font-semibold text-gray-900">Valid Until</td>
            {quotes.map(quote => {
              const daysValid = Math.ceil((new Date(quote.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <td key={quote.id} className="px-4 py-4">
                  <p className="text-gray-900 font-medium">
                    {new Date(quote.validUntil).toLocaleDateString('en-ZA')}
                  </p>
                  <p className={`text-xs font-semibold mt-1 ${daysValid > 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {daysValid > 0 ? `${daysValid} days left` : 'Expired'}
                  </p>
                </td>
              );
            })}
          </tr>

          {/* Deliverables Row */}
          <tr className="bg-white hover:bg-gray-50">
            <td className="px-4 py-4 font-semibold text-gray-900">Deliverables</td>
            {quotes.map(quote => (
              <td key={quote.id} className="px-4 py-4">
                {quote.deliverables && quote.deliverables.length > 0 ? (
                  <ul className="space-y-1">
                    {quote.deliverables.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                        <Check size={14} className="text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 italic">Not specified</p>
                )}
              </td>
            ))}
          </tr>

          {/* Terms Row */}
          <tr className="bg-gray-50">
            <td className="px-4 py-4 font-semibold text-gray-900">Terms</td>
            {quotes.map(quote => (
              <td key={quote.id} className="px-4 py-4">
                <p className="text-xs">
                  {quote.termsAndConditions ? (
                    <span className="text-green-700 flex items-center gap-1">
                      <Check size={14} /> Terms included
                    </span>
                  ) : (
                    <span className="text-gray-500">Standard terms</span>
                  )}
                </p>
              </td>
            ))}
          </tr>

          {/* Action Row */}
          <tr className="bg-white border-t-2 border-amber-200">
            <td className="px-4 py-4"></td>
            {quotes.map(quote => (
              <td key={quote.id} className="px-4 py-4">
                <button
                  onClick={() => onSelectQuote(quote)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 font-semibold transition"
                >
                  {quote.status === 'Accepted' ? 'View Agreement' : 'Select Quote'}
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
