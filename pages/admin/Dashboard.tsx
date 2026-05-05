import React, { useEffect, useState } from 'react';
import api from '@/src/services/api';
import './AdminPages.css';

interface Stats {
  totalUsers?: number;
  totalBusinesses?: number;
  verifiedBusinesses?: number;
  featuredBusinesses?: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetch data from both endpoints to calculate stats
      const usersRes = await api.get('/admin/users');
      const businessesRes = await api.get('/admin/businesses-list');

      if (usersRes.data.success && businessesRes.data.success) {
        const users = usersRes.data.users || [];
        const businesses = businessesRes.data.businesses || [];

        setStats({
          totalUsers: users.length,
          totalBusinesses: businesses.length,
          verifiedBusinesses: businesses.filter((b: any) => b.isVerified).length,
          featuredBusinesses: businesses.filter((b: any) => b.isFeatured).length,
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>📊 Dashboard</h2>
        <p>Welcome to LowveldHub Admin Control Center</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card premium-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers || 0}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card premium-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>{stats.totalBusinesses || 0}</h3>
            <p>Total Businesses</p>
          </div>
        </div>

        <div className="stat-card premium-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.verifiedBusinesses || 0}</h3>
            <p>Verified Businesses</p>
          </div>
        </div>

        <div className="stat-card premium-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>{stats.featuredBusinesses || 0}</h3>
            <p>Featured Businesses</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section premium-card">
          <h3>🚀 Quick Actions</h3>
          <ul className="action-list">
            <li>📋 Review pending businesses</li>
            <li>✅ Verify new listings</li>
            <li>⭐ Feature top businesses</li>
            <li>👥 Manage user accounts</li>
            <li>📊 View analytics</li>
          </ul>
        </div>

        <div className="dashboard-section premium-card">
          <h3>ℹ️ System Status</h3>
          <div className="status-items">
            <div className="status-item">
              <span className="status-label">Backend API</span>
              <span className="status-indicator online">🟢 Online</span>
            </div>
            <div className="status-item">
              <span className="status-label">Database</span>
              <span className="status-indicator online">🟢 Connected</span>
            </div>
            <div className="status-item">
              <span className="status-label">Authentication</span>
              <span className="status-indicator online">🟢 Active</span>
            </div>
            <div className="status-item">
              <span className="status-label">Cache</span>
              <span className="status-indicator online">🟢 Enabled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-section premium-card">
        <h3>🏆 Welcome to LowveldHub Premium Admin</h3>
        <p>
          This is your exclusive admin dashboard for managing the LowveldHub luxury B2B
          directory. You have complete control over:
        </p>
        <ul className="feature-list">
          <li>✨ User management and verification</li>
          <li>🏢 Business listing approval and curation</li>
          <li>⭐ Featured listings management</li>
          <li>📊 Platform analytics and statistics</li>
          <li>🎯 Premium tier management</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
