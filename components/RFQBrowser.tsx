import React, { useState, useMemo } from 'react';
import { MapPin, Clock, DollarSign, AlertCircle, ChevronRight } from 'lucide-react';
import { RequestForQuote, MPUMALANGA_AREAS } from '../types';

interface RFQBrowserProps {
  rfqs: RequestForQuote[];
  onSelectRFQ: (rfq: RequestForQuote) => void;
}

export const RFQBrowser: React.FC<RFQBrowserProps> = ({ rfqs, onSelectRFQ }) => {
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRFQs = useMemo(() => {
    return rfqs.filter(rfq => {
      // Area filter
      if (selectedArea !== 'All Areas' && rfq.area !== selectedArea) return false;
      
      // Urgency filter
      if (selectedUrgency !== 'All' && rfq.urgency !== selectedUrgency) return false;
      
      // Budget filter
      if (budgetMin && rfq.budget.max < parseInt(budgetMin)) return false;
      if (budgetMax && rfq.budget.min > parseInt(budgetMax)) return false;
      
      // Search filter
      const query = searchQuery.toLowerCase();
      return rfq.title.toLowerCase().includes(query) || rfq.description.toLowerCase().includes(query);
    });
  }, [rfqs, selectedArea, selectedUrgency, budgetMin, budgetMax, searchQuery]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      default: return '🟢';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Requests</h3>
        
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Area Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            >
              <option>All Areas</option>
              {MPUMALANGA_AREAS.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Urgency Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Urgency</label>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Budget Min */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Min Budget (R)</label>
            <input
              type="number"
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Budget Max */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max Budget (R)</label>
            <input
              type="number"
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
              placeholder="999999"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Open Requests ({filteredRFQs.length})
          </h3>
          {filteredRFQs.length === 0 && searchQuery && (
            <p className="text-sm text-gray-600">No results found. Try adjusting filters.</p>
          )}
        </div>

        {filteredRFQs.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium">No requests match your filters</p>
            <p className="text-gray-500 text-sm mt-1">Adjust filters or check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRFQs.map(rfq => (
              <button
                key={rfq.id}
                onClick={() => onSelectRFQ(rfq)}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-amber-400 hover:shadow-md transition text-left group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    {/* Title & Category */}
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-gray-900 group-hover:text-amber-700 transition">{rfq.title}</h4>
                      <span className={`text-xs font-semibold px-2 py-1 rounded border ${getUrgencyColor(rfq.urgency)}`}>
                        {getUrgencyIcon(rfq.urgency)} {rfq.urgency}
                      </span>
                    </div>

                    {/* Description preview */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{rfq.description}</p>

                    {/* Details grid */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-700">
                        <MapPin size={16} className="text-amber-600" />
                        <span>{rfq.area}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <DollarSign size={16} className="text-amber-600" />
                        <span>R{rfq.budget.min.toLocaleString()} - R{rfq.budget.max.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <Clock size={16} className="text-amber-600" />
                        <span>{rfq.timeline}</span>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {rfq.requirements.slice(0, 3).map((req, idx) => (
                        <span key={idx} className="inline-block text-xs bg-amber-50 text-amber-800 px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                      {rfq.requirements.length > 3 && (
                        <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          +{rfq.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-gray-400 group-hover:text-amber-600 transition">
                    <ChevronRight size={24} />
                  </div>
                </div>

                {/* Posted date */}
                <p className="text-xs text-gray-500 mt-3">
                  Posted {new Date(rfq.createdDate).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
