import React, { useState, useEffect } from 'react';
import api from '@/src/services/api';
import './BusinessDashboard.css';

interface Message {
  id: number;
  sender_id: number;
  content: string;
  sender_name?: string;
  read: boolean;
  created_at: string;
}

interface Activity {
  id: number;
  type: string;
  description: string;
  created_at: string;
}

interface Business {
  id: number;
  name: string;
  email: string;
  phone?: string;
  rating: number;
  review_count: number;
  verified: boolean;
  featured: boolean;
}

interface BusinessDashboardData {
  business: Business;
  messages: {
    recent_messages: Message[];
    unread_count: number;
  };
  activity: {
    recent_activity: Activity[];
    stats: Array<{ type: string; count: number }>;
  };
}

interface Props {
  businessId: number;
}

const BusinessDashboard: React.FC<Props> = ({ businessId }) => {
  const [data, setData] = useState<BusinessDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, [businessId]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/business/dashboard/${businessId}`);
      setData(data.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setSendingMessage(true);
      await api.post('/messages', {
        content: newMessage,
        business_id: businessId,
      });
      setNewMessage('');
      await fetchDashboard();
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  if (loading) {
    return <div className="business-dashboard-loading">Loading business dashboard...</div>;
  }

  if (error || !data) {
    return <div className="business-dashboard-error">Error: {error}</div>;
  }

  const { business, messages, activity } = data;

  return (
    <div className="business-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="business-info">
          <h1>{business.name}</h1>
          <p className="business-contact">
            📧 {business.email} {business.phone && `• ☎️ ${business.phone}`}
          </p>
        </div>
        <div className="business-stats-header">
          {business.verified && <span className="badge badge-verified">✓ Verified</span>}
          {business.featured && <span className="badge badge-featured">⭐ Featured</span>}
        </div>
      </div>

      <div className="dashboard-container">
        {/* Main Content */}
        <div className="main-content">
          {/* Quick Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <span className="stat-label">Rating</span>
              <span className="stat-value">{business.rating.toFixed(1)}</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">💬</span>
              <span className="stat-label">Reviews</span>
              <span className="stat-value">{business.review_count}</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📨</span>
              <span className="stat-label">Unread</span>
              <span className="stat-value">{messages.unread_count}</span>
            </div>
          </div>

          {/* Messages Section */}
          <div className="messages-section">
            <h2>💬 Messages & Inquiries</h2>

            {/* Message List */}
            <div className="message-list">
              {messages.recent_messages.length > 0 ? (
                messages.recent_messages.map((msg) => (
                  <div key={msg.id} className={`message-item ${msg.read ? 'read' : 'unread'}`}>
                    <div className="message-header">
                      <span className="sender-name">{msg.sender_name || 'Unknown'}</span>
                      <span className="message-time">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="message-content">{msg.content}</p>
                  </div>
                ))
              ) : (
                <p className="no-data">No messages yet</p>
              )}
            </div>

            {/* Message Form */}
            <form className="message-form" onSubmit={handleSendMessage}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a reply..."
                rows={3}
                disabled={sendingMessage}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={sendingMessage || !newMessage.trim()}
              >
                {sendingMessage ? 'Sending...' : 'Send Reply'}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Activity Stats */}
          <div className="activity-stats">
            <h3>Activity Summary</h3>
            {activity.stats.length > 0 ? (
              <div className="stats-list">
                {activity.stats.map((stat) => (
                  <div key={stat.type} className="stat-row">
                    <span className="stat-type">{stat.type}</span>
                    <span className="stat-count">{stat.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No activity data</p>
            )}
          </div>

          {/* Recent Activity Feed */}
          <div className="activity-feed">
            <h3>Recent Activity</h3>
            {activity.recent_activity.length > 0 ? (
              <div className="activity-list">
                {activity.recent_activity.slice(0, 5).map((act) => (
                  <div key={act.id} className="activity-item">
                    <span className="activity-type-badge">{getActivityBadge(act.type)}</span>
                    <div className="activity-content">
                      <p className="activity-desc">{act.description}</p>
                      <span className="activity-date">
                        {new Date(act.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function getActivityBadge(type: string): string {
  const badges: Record<string, string> = {
    review: '⭐',
    message: '💬',
    booking: '🎟️',
    update: '📝',
    feature: '⭐',
    verify: '✓',
    default: '📌',
  };
  return badges[type] || badges.default;
}

export default BusinessDashboard;
