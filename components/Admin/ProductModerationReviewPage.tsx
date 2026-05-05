import React, { useState, useEffect } from 'react';

interface FlaggedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  reported_count: number;
  report_reasons: string[];
  status: 'active' | 'removed' | 'suspended';
  seller_name: string;
  seller_email: string;
  created_at: string;
}

/**
 * ProductModerationReviewPage - Simple admin review for flagged marketplace products
 * BLACK/GOLD/WHITE design only
 * Lightweight moderation: view flagged products + action buttons
 */
export const ProductModerationReviewPage: React.FC<{
  navigate: (view: string) => void;
}> = ({ navigate }) => {
  const [flaggedProducts, setFlaggedProducts] = useState<FlaggedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFlaggedProducts();
  }, [filterStatus]);

  const fetchFlaggedProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/flagged?status=${filterStatus}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      });

      if (!response.ok) throw new Error('Failed to fetch flagged products');

      const data = await response.json();
      setFlaggedProducts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load flagged products');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (productId: string) => {
    setActionInProgress(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/${productId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify({ action: 'clear_reports' })
      });

      if (!response.ok) throw new Error('Failed to approve product');

      setFlaggedProducts(prev => prev.filter(p => p.id !== productId));
      setSelectedProduct(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve product');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleRemove = async (productId: string) => {
    if (!confirm('Remove this product from marketplace?')) return;

    setActionInProgress(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/${productId}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify({ reason: 'Admin removal due to moderation' })
      });

      if (!response.ok) throw new Error('Failed to remove product');

      setFlaggedProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, status: 'removed' } : p
      ));
      setSelectedProduct(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove product');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleSuspendSeller = async (productId: string, sellerEmail: string) => {
    if (!confirm(`Suspend seller ${sellerEmail}? They won't be able to list products.`)) return;

    setActionInProgress(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/${productId}/suspend-seller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify({ seller_email: sellerEmail })
      });

      if (!response.ok) throw new Error('Failed to suspend seller');

      setFlaggedProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, status: 'suspended' } : p
      ));
      setSelectedProduct(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to suspend seller');
    } finally {
      setActionInProgress(false);
    }
  };

  const selectedProductData = selectedProduct ? flaggedProducts.find(p => p.id === selectedProduct) : null;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-white/20 p-6 sticky top-0 z-40">
        <button
          onClick={() => navigate('admin')}
          className="text-white/60 hover:text-white mb-4 transition-colors"
        >
          ← Back to Admin
        </button>
        <h1 className="text-3xl font-bold text-white mb-2">
          🚨 Flagged Products Moderation
        </h1>
        <p className="text-white/60 text-sm">
          Review marketplace products reported by community as spam or scams
        </p>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 border border-white/20 rounded-lg p-4">
            <p className="text-white/60 text-sm">Total Flagged</p>
            <p className="text-white font-bold text-2xl mt-1">
              {flaggedProducts.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-white/5 border border-white/20 rounded-lg p-4">
            <p className="text-white/60 text-sm">Removed</p>
            <p className="text-white font-bold text-2xl mt-1">
              {flaggedProducts.filter(p => p.status === 'removed').length}
            </p>
          </div>
          <div className="bg-white/5 border border-white/20 rounded-lg p-4">
            <p className="text-white/60 text-sm">Suspended Sellers</p>
            <p className="text-white font-bold text-2xl mt-1">
              {flaggedProducts.filter(p => p.status === 'suspended').length}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Filter buttons */}
        <div className="flex gap-2 mb-6">
          {(['all', 'active', 'suspended'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                filterStatus === status
                  ? 'bg-[#D4AF37] text-black'
                  : 'bg-white/5 border border-white/20 text-white hover:border-[#D4AF37]'
              }`}
            >
              {status === 'all' ? 'All' : status === 'active' ? 'Active' : 'Suspended'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white/5 border border-white/20 rounded-lg p-8 text-center">
                <p className="text-white/60">Loading flagged products...</p>
              </div>
            ) : flaggedProducts.length === 0 ? (
              <div className="bg-white/5 border border-white/20 rounded-lg p-8 text-center">
                <p className="text-white/60">No flagged products found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {flaggedProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedProduct === product.id
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                        : 'bg-white/5 border-white/20 hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded border border-white/20"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">{product.title}</p>
                        <p className="text-white/60 text-sm">By {product.seller_name}</p>
                        <div className="flex gap-3 mt-2">
                          <span className="bg-red-500/20 border border-red-500/30 text-red-400 text-xs px-2 py-1 rounded">
                            🚩 {product.reported_count} reports
                          </span>
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${
                            product.status === 'active'
                              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                              : product.status === 'removed'
                              ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                              : 'bg-orange-500/20 border border-orange-500/30 text-orange-400'
                          }`}>
                            {product.status === 'active' ? '● Active' : product.status === 'removed' ? '✗ Removed' : '⊘ Suspended'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Panel */}
          {selectedProductData && (
            <div className="bg-white/5 border border-white/20 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4">Product Details</h3>

              {/* Main image */}
              <img
                src={selectedProductData.image}
                alt={selectedProductData.title}
                className="w-full h-40 object-cover rounded-lg border border-white/20 mb-4"
              />

              {/* Info */}
              <div className="space-y-3 text-sm mb-6">
                <div>
                  <p className="text-white/60">Title</p>
                  <p className="text-white font-semibold">{selectedProductData.title}</p>
                </div>
                <div>
                  <p className="text-white/60">Price</p>
                  <p className="text-white font-semibold text-[#D4AF37]">R {selectedProductData.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/60">Status</p>
                  <p className={`font-semibold ${
                    selectedProductData.status === 'active'
                      ? 'text-green-400'
                      : selectedProductData.status === 'removed'
                      ? 'text-red-400'
                      : 'text-orange-400'
                  }`}>
                    {selectedProductData.status === 'active' ? 'Active' : selectedProductData.status === 'removed' ? 'Removed' : 'Suspended'}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Reports ({selectedProductData.reported_count})</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedProductData.report_reasons.map((reason, i) => (
                      <span key={i} className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/60">Seller</p>
                  <p className="text-white">{selectedProductData.seller_name}</p>
                  <p className="text-white/50 text-xs">{selectedProductData.seller_email}</p>
                </div>
                <div>
                  <p className="text-white/60">Listed</p>
                  <p className="text-white text-xs">
                    {new Date(selectedProductData.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {selectedProductData.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedProductData.id)}
                      disabled={actionInProgress}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✓ Clear & Approve
                    </button>
                    <button
                      onClick={() => handleRemove(selectedProductData.id)}
                      disabled={actionInProgress}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✗ Remove Product
                    </button>
                    <button
                      onClick={() => handleSuspendSeller(selectedProductData.id, selectedProductData.seller_email)}
                      disabled={actionInProgress}
                      className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ⊘ Suspend Seller
                    </button>
                  </>
                )}

                {selectedProductData.status === 'removed' && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-center">
                    <p className="text-red-400 text-sm font-semibold">Product Removed</p>
                  </div>
                )}

                {selectedProductData.status === 'suspended' && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3 text-center">
                    <p className="text-orange-400 text-sm font-semibold">Seller Suspended</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModerationReviewPage;
