import React, { useState, useEffect } from 'react';
import { Mail, Download, Trash2, RefreshCw, Eye, Filter, Search } from 'lucide-react';

interface Subscriber {
  id: number;
  email: string;
  verified: boolean;
  subscribed_at: string;
  verified_at?: string;
}

interface AdminNewsletterDashboardProps {
  onClose: () => void;
  isAdmin: boolean;
}

const AdminNewsletterDashboard: React.FC<AdminNewsletterDashboardProps> = ({
  onClose,
  isAdmin
}) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      setError('You do not have permission to access this dashboard.');
      return;
    }
    fetchSubscribers();
  }, [isAdmin]);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('lh_token');
      const response = await fetch('http://localhost:5000/api/newsletter/subscribers', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 403) {
        setError('You do not have admin access to this resource.');
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch subscribers');

      const data = await response.json();
      setSubscribers(data.data || data.subscribers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (email: string, id: number) => {
    if (!confirm(`Remove ${email} from newsletter?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/newsletter/unsubscribe/${email}`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Failed to delete subscriber');

      setSubscribers(subscribers.filter(s => s.id !== id));
    } catch (err) {
      alert('Failed to delete subscriber: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleResendVerification = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/newsletter/verify/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resend: true })
      });

      if (!response.ok) throw new Error('Failed to resend verification');
      alert('Verification email sent to ' + email);
    } catch (err) {
      alert('Failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleExport = () => {
    const csv = ['Email,Verified,Subscribed Date,Verified Date'];
    subscribers.forEach(sub => {
      csv.push(`"${sub.email}",${sub.verified},"${sub.subscribed_at}","${sub.verified_at || 'N/A'}"`);
    });
    
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filterVerified === 'all' ? true :
      filterVerified === 'verified' ? sub.verified :
      !sub.verified;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: subscribers.length,
    verified: subscribers.filter(s => s.verified).length,
    unverified: subscribers.filter(s => !s.verified).length,
    verificationRate: subscribers.length > 0 ? ((subscribers.filter(s => s.verified).length / subscribers.length) * 100).toFixed(1) : '0'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white p-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Mail size={28} />
            <div>
              <h2 className="text-2xl font-bold">Newsletter Dashboard</h2>
              <p className="text-gold-100 text-sm">{subscribers.length} subscribers</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-gold-700 p-2 rounded-lg transition"
          >
            ✕
          </button>
        </div>

        {!isAdmin && (
          <div className="bg-red-50 border-b-2 border-red-300 p-4 text-red-800">
            <strong>Access Denied:</strong> You do not have permission to view this dashboard.
          </div>
        )}

        {error && isAdmin && (
          <div className="bg-red-50 border-b-2 border-red-300 p-4 text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {isAdmin && (
          <>
            {/* Stats */}
            {showStats && (
              <div className="grid grid-cols-4 gap-4 bg-gold-50 p-6 border-b border-gold-200">
                <div className="bg-white rounded-lg p-4 border border-gold-200">
                  <p className="text-gray-600 text-sm font-semibold">Total Subscribers</p>
                  <p className="text-3xl font-bold text-gold-600 mt-2">{stats.total}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-gray-600 text-sm font-semibold">Verified</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.verified}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <p className="text-gray-600 text-sm font-semibold">Pending Verification</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">{stats.unverified}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-gray-600 text-sm font-semibold">Verification Rate</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.verificationRate}%</p>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="p-6 border-b border-gray-200 space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
                  />
                </div>
                <select
                  value={filterVerified}
                  onChange={(e) => setFilterVerified(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500"
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Pending Only</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={fetchSubscribers}
                  disabled={loading}
                  className="px-4 py-2 border border-gold-500 text-gold-600 font-semibold rounded-lg hover:bg-gold-50 disabled:opacity-50 flex items-center gap-2 transition"
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 flex items-center gap-2 transition"
                >
                  <Download size={18} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="animate-spin mb-4">
                      <RefreshCw size={32} className="text-gold-500" />
                    </div>
                    <p className="text-gray-600">Loading subscribers...</p>
                  </div>
                </div>
              ) : filteredSubscribers.length === 0 ? (
                <div className="flex items-center justify-center h-48">
                  <p className="text-gray-500">No subscribers found</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Subscribed</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Verified</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscribers.map((subscriber, idx) => (
                      <tr key={subscriber.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm text-gray-800">{subscriber.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            subscriber.verified 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {subscriber.verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {subscriber.verified_at ? new Date(subscriber.verified_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-center">
                          <div className="flex justify-center gap-2">
                            {!subscriber.verified && (
                              <button
                                onClick={() => handleResendVerification(subscriber.email)}
                                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-1"
                              >
                                <RefreshCw size={12} />
                                Verify
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteSubscriber(subscriber.email, subscriber.id)}
                              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-1"
                            >
                              <Trash2 size={12} />
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 border-t flex gap-3 justify-end">
              <button
                onClick={() => setShowStats(!showStats)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
              >
                <Filter size={18} />
                {showStats ? 'Hide' : 'Show'} Stats
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminNewsletterDashboard;
