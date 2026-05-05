import React, { useEffect, useState } from 'react';
import api from '@/src/services/api';
import './AdminPages.css';

interface Business {
  id: number;
  name: string;
  description?: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  tier: string;
  status: string;
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: string;
  userId?: number;
  ownerEmail: string;
  ownerFirstName: string;
  ownerLastName: string;
}

const Businesses: React.FC = () => {
  const [businesses, setBusiness] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/businesses-list');
      if (response.data.success) {
        setBusiness(response.data.businesses);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch businesses');
      console.error('Error fetching businesses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyBusiness = async (id: number) => {
    try {
      setActionLoading(id);
      const response = await api.patch(`/admin/business/${id}/verify`);
      if (response.data.success) {
        setSuccessMessage(`✅ Business verified successfully!`);
        fetchBusinesses();
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to verify business');
      console.error('Error verifying business:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleFeatureBusiness = async (id: number) => {
    try {
      setActionLoading(id);
      const response = await api.patch(`/admin/business/${id}/feature`);
      if (response.data.success) {
        setSuccessMessage(`⭐ Business featured successfully!`);
        fetchBusinesses();
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to feature business');
      console.error('Error featuring business:', err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading businesses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="error-message">{error}</div>
        <button onClick={fetchBusinesses} className="action-btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>🏢 All Businesses</h2>
        <p>{businesses.length} total business listings</p>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="businesses-grid">
        {businesses.map((business) => (
          <div key={business.id} className="business-card premium-card">
            <div className="card-header">
              <h3>{business.name}</h3>
              <span className="category-badge">{business.category}</span>
            </div>

            <div className="card-meta">
              <p className="description">{business.description || 'No description'}</p>
              <div className="meta-items">
                <span>📍 {business.location}</span>
                <span>⭐ {business.rating.toFixed(1)}</span>
                <span>💬 {business.reviewCount} reviews</span>
              </div>
            </div>

            <div className="card-owner">
              <strong>Owner:</strong> {business.ownerFirstName} {business.ownerLastName}
              <br />
              <strong>Email:</strong> {business.ownerEmail}
            </div>

            <div className="card-status">
              <div className="status-row">
                <span>Verified:</span>
                <span
                  className={`badge ${
                    business.isVerified ? 'badge-verified' : 'badge-unverified'
                  }`}
                >
                  {business.isVerified ? '✅ Yes' : '❌ No'}
                </span>
              </div>
              <div className="status-row">
                <span>Featured:</span>
                <span
                  className={`badge ${
                    business.isFeatured ? 'badge-featured' : 'badge-unverified'
                  }`}
                >
                  {business.isFeatured ? '⭐ Yes' : '🔒 No'}
                </span>
              </div>
              <div className="status-row">
                <span>Status:</span>
                <span className="badge badge-verified">{business.status}</span>
              </div>
              <div className="status-row">
                <span>Tier:</span>
                <span className="badge badge-featured">{business.tier}</span>
              </div>
            </div>

            <div className="card-actions">
              {!business.isVerified && (
                <button
                  className="action-btn btn-primary"
                  onClick={() => handleVerifyBusiness(business.id)}
                  disabled={actionLoading === business.id}
                >
                  {actionLoading === business.id ? '⏳ Verifying...' : '✅ Verify'}
                </button>
              )}
              {!business.isFeatured && (
                <button
                  className="action-btn btn-secondary"
                  onClick={() => handleFeatureBusiness(business.id)}
                  disabled={actionLoading === business.id}
                >
                  {actionLoading === business.id ? '⏳ Featuring...' : '⭐ Feature'}
                </button>
              )}
              {business.isVerified && business.isFeatured && (
                <div className="all-done">✨ Fully Setup</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {businesses.length === 0 && (
        <div className="empty-state">
          <p>No businesses found</p>
        </div>
      )}
    </div>
  );
};

export default Businesses;
