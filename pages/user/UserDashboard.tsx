import React, { useState, useEffect } from 'react';
import api from '@/src/services/api';
import './UserDashboard.css';

interface DashboardData {
  // New simplified format from backend
  rewardPoints?: number;
  savedItems?: number;
  unreadMessages?: number;
  recentActivity?: any[];
  // Old format fields (for backward compatibility)
  user?: any;
  loyalty?: { total_points: number };
  referrals?: any;
  messages?: any;
}

const UserDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/user/dashboard');
      setDashboardData(data.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error || !dashboardData) {
    return <div className="dashboard-error">Error: {error}</div>;
  }

  // Handle both old and new API response formats
  const rewardPoints = dashboardData.rewardPoints ?? dashboardData.loyalty?.total_points ?? 0;
  const savedItems = dashboardData.savedItems ?? 0;
  const unreadMessages = dashboardData.unreadMessages ?? 0;
  const recentActivity = dashboardData.recentActivity ?? dashboardData.recent_activity ?? [];
  const userName = dashboardData.user?.name ?? 'User';

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {userName}! 👋</h1>
        <p>Here's your personal dashboard overview</p>
      </div>

      <div className="dashboard-grid">
        {/* Reward Points Card */}
        <div className="dashboard-card rewards-card">
          <div className="card-icon">⭐</div>
          <h3>Reward Points</h3>
          <div className="reward-content">
            <div className="points-display">
              <span className="points-number">{rewardPoints}</span>
              <span className="points-label">Points</span>
            </div>
            <p className="points-info">Earn points on every purchase and activity</p>
            <button className="btn btn-secondary">Redeem Points</button>
          </div>
        </div>

        {/* Saved Items Card */}
        <div className="dashboard-card saved-items-card">
          <div className="card-icon">💾</div>
          <h3>Saved Items</h3>
          <div className="saved-content">
            <div className="items-display">
              <span className="items-number">{savedItems}</span>
              <span className="items-label">Saved</span>
            </div>
            <p className="items-info">Items you've bookmarked for later</p>
            <button className="btn btn-secondary">View Saved</button>
          </div>
        </div>

        {/* Messages Card */}
        <div className="dashboard-card messages-card">
          <div className="card-icon">💬</div>
          <h3>Messages</h3>
          <div className="messages-content">
            <div className="unread-badge">
              {unreadMessages} Unread
            </div>
            <p className="messages-info">You have {unreadMessages} unread message{unreadMessages !== 1 ? 's' : ''}</p>
            <button className="btn btn-secondary">View All Messages</button>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="dashboard-card quick-actions-card">
          <div className="card-icon">⚡</div>
          <h3>Quick Actions</h3>
          <div className="actions-content">
            <button className="btn btn-outline">Edit Profile</button>
            <button className="btn btn-outline">Settings</button>
            <button className="btn btn-outline">Support</button>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="activity-section">
        <h2>📋 Recent Activity</h2>
        {recentActivity && recentActivity.length > 0 ? (
          <div className="activity-feed">
            {recentActivity.map((activity: any, index: number) => (
              <div key={activity.id || index} className="activity-item">
                <span className="activity-type">{getActivityIcon(activity.type)}</span>
                <div className="activity-details">
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-time">
                    {activity.created_at ? new Date(activity.created_at).toLocaleDateString() : 'Recently'}
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
  );
};

function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    booking: '🎟️',
    review: '⭐',
    points: '💰',
    message: '💬',
    purchase: '🛒',
    referral: '🤝',
    default: '📌',
  };
  return icons[type] || icons.default;
}

export default UserDashboard;
