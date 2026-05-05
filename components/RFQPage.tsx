import React, { useState } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { RequestForQuote, QuoteResponse, RFQStatus } from '../types';
import { RFQForm } from './RFQForm';
import { RFQBrowser } from './RFQBrowser';
import { RFQDetail } from './RFQDetail';

interface RFQPageProps {
  rfqs: RequestForQuote[];
  quotes: QuoteResponse[];
  navigate: (view: string, category?: string, id?: string) => void;
}

export const RFQPage: React.FC<RFQPageProps> = ({ rfqs, quotes, navigate }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState<RequestForQuote | null>(null);
  const [newRFQs, setNewRFQs] = useState<RequestForQuote[]>(rfqs);

  const handleCreateRFQ = (rfqData: Omit<RequestForQuote, 'id' | 'createdDate' | 'updatedDate' | 'status'>) => {
    const newRFQ: RequestForQuote = {
      ...rfqData,
      id: `rfq_${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      status: RFQStatus.Published
    };
    
    setNewRFQs([newRFQ, ...newRFQs]);
    setShowForm(false);
    
    // Show success message (could add toast here)
    console.log('RFQ Created:', newRFQ);
  };

  if (selectedRFQ) {
    return (
      <RFQDetail
        rfq={selectedRFQ}
        quotes={quotes.filter(q => q.rfqId === selectedRFQ.id)}
        onBack={() => setSelectedRFQ(null)}
        navigate={navigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-3">Request for Quotes</h1>
              <p className="text-amber-100 text-lg">
                Post your project needs and get competitive bids from verified Mpumalanga businesses
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-amber-700 hover:bg-amber-50 px-6 py-3 rounded-lg font-bold transition flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={20} /> Create RFQ
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-amber-100 text-sm font-semibold uppercase mb-1">Open Requests</p>
              <p className="text-3xl font-bold">{newRFQs.filter(r => r.status === RFQStatus.Published).length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-amber-100 text-sm font-semibold uppercase mb-1">Total Quotes</p>
              <p className="text-3xl font-bold">{quotes.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-amber-100 text-sm font-semibold uppercase mb-1">Deals Matched</p>
              <p className="text-3xl font-bold">{quotes.filter(q => q.status === 'Accepted').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Trust Banner */}
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-4">
            <MessageSquare className="text-blue-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">How RFQ Works</h3>
              <ol className="text-sm text-gray-700 space-y-1">
                <li><strong>1. Create Request:</strong> Post what you need with budget & timeline</li>
                <li><strong>2. Get Quotes:</strong> Verified businesses submit competitive bids</li>
                <li><strong>3. Compare:</strong> Side-by-side analysis of price, terms, deliverables</li>
                <li><strong>4. Close Deal:</strong> Accept quote & finalize project (we collect 8-12% commission)</li>
              </ol>
            </div>
          </div>
        </div>

        {/* RFQ Browser */}
        <RFQBrowser rfqs={newRFQs} onSelectRFQ={setSelectedRFQ} />
      </div>

      {/* RFQ Form Modal */}
      {showForm && (
        <RFQForm
          onSubmit={handleCreateRFQ}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
