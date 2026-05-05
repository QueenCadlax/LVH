import React, { useState, useEffect } from 'react';
import api from '@/src/services/api';
import './AgentDashboard.css';

interface Agent {
  id: number;
  name: string;
  email: string;
  phone?: string;
  monthly_target: number;
  current_progress: number;
  deals_closed: number;
  total_revenue: number;
  status: 'active' | 'inactive' | 'retired';
}

interface Performance {
  month_year: string;
  target: number;
  actual: number;
  deals_count: number;
  commission: number;
}

interface AgentDashboardData {
  agent: Agent;
  current_performance: Performance | null;
  recent_activity: Performance[];
  progress_percentage: number;
  target_achieved: boolean;
}

const AgentDashboard: React.FC = () => {
  const [data, setData] = useState<AgentDashboardData | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metric, setMetric] = useState<'revenue' | 'deals'>('revenue');

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [metric]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/agent/dashboard');
      setData(data.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const { data } = await api.get(`/agents/leaderboard?metric=${metric}&limit=10`);
      setLeaderboard(data.data);
    } catch (err: any) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  if (loading) {
    return <div className="agent-dashboard-loading">Loading agent dashboard...</div>;
  }

  if (error || !data) {
    return <div className="agent-dashboard-error">Error: {error}</div>;
  }

  const { agent, current_performance, recent_activity, progress_percentage, target_achieved } = data;

  return (
    <div className="agent-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>{agent.name}</h1>
          <p className="agent-contact">
            📧 {agent.email} {agent.phone && `• ☎️ ${agent.phone}`}
          </p>
        </div>
        <div className="header-stats">
          <div className="header-stat">
            <span className="label">Total Revenue</span>
            <span className="value">R{agent.total_revenue.toLocaleString()}</span>
          </div>
          <div className="header-stat">
            <span className="label">Deals Closed</span>
            <span className="value">{agent.deals_closed}</span>
          </div>
          <div className="header-stat">
            <span className="label">Status</span>
            <span className={`status status-${agent.status}`}>{agent.status}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Main Content */}
        <div className="main-section">
          {/* Monthly Target Progress */}
          <div className="progress-card">
            <h2>Monthly Target Progress</h2>
            <div className="target-info">
              <div className="target-row">
                <span className="label">Target</span>
                <span className="value">R{agent.monthly_target.toLocaleString()}</span>
              </div>
              <div className="target-row">
                <span className="label">Current Progress</span>
                <span className="value">R{agent.current_progress.toLocaleString()}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className={`progress-fill ${target_achieved ? 'completed' : ''}`}
                  style={{ width: `${progress_percentage}%` }}
                />
              </div>
              <span className="progress-text">{progress_percentage.toFixed(1)}%</span>
            </div>

            {target_achieved && <p className="target-achieved">✓ Target Achieved!</p>}
          </div>

          {/* Performance History */}
          <div className="performance-card">
            <h2>Performance History (Last 6 Months)</h2>
            {recent_activity.length > 0 ? (
              <div className="performance-table">
                <div className="table-header">
                  <div className="col">Month</div>
                  <div className="col">Target</div>
                  <div className="col">Actual</div>
                  <div className="col">Deals</div>
                  <div className="col">Commission</div>
                </div>
                {recent_activity.map((perf) => (
                  <div key={perf.month_year} className="table-row">
                    <div className="col">{new Date(perf.month_year).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                    <div className="col">R{perf.target.toLocaleString()}</div>
                    <div className="col font-bold">R{perf.actual.toLocaleString()}</div>
                    <div className="col">{perf.deals_count}</div>
                    <div className="col">R{perf.commission.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No performance data available</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Quick Stats */}
          <div className="quick-stats">
            <h3>Quick Stats</h3>
            <div className="stat-box">
              <span className="stat-icon">🎯</span>
              <span className="stat-label">Monthly Target</span>
              <span className="stat-value">R{agent.monthly_target.toLocaleString()}</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">📈</span>
              <span className="stat-label">Current Progress</span>
              <span className="stat-value">R{agent.current_progress.toLocaleString()}</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">🏆</span>
              <span className="stat-label">Total Deals</span>
              <span className="stat-value">{agent.deals_closed}</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">💰</span>
              <span className="stat-label">Total Revenue</span>
              <span className="stat-value">R{agent.total_revenue.toLocaleString()}</span>
            </div>
          </div>

          {/* Current Month Performance */}
          {current_performance && (
            <div className="current-performance">
              <h3>Current Month</h3>
              <div className="perf-details">
                <div className="perf-item">
                  <span className="label">Target</span>
                  <span className="value">R{current_performance.target.toLocaleString()}</span>
                </div>
                <div className="perf-item">
                  <span className="label">Actual</span>
                  <span className="value">R{current_performance.actual.toLocaleString()}</span>
                </div>
                <div className="perf-item">
                  <span className="label">Deals</span>
                  <span className="value">{current_performance.deals_count}</span>
                </div>
                <div className="perf-item">
                  <span className="label">Commission</span>
                  <span className="value">R{current_performance.commission.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard */}
          <div className="leaderboard-section">
            <h3>Leaderboard</h3>
            <div className="metric-toggle">
              <button
                className={`metric-btn ${metric === 'revenue' ? 'active' : ''}`}
                onClick={() => setMetric('revenue')}
              >
                By Revenue
              </button>
              <button
                className={`metric-btn ${metric === 'deals' ? 'active' : ''}`}
                onClick={() => setMetric('deals')}
              >
                By Deals
              </button>
            </div>

            <div className="leaderboard-list">
              {leaderboard.map((agent, index) => (
                <div key={agent.id} className="leaderboard-item">
                  <span className="rank">#{index + 1}</span>
                  <div className="agent-info">
                    <p className="agent-name">{agent.name}</p>
                    <p className="agent-stat">
                      {metric === 'revenue'
                        ? `R${agent.total_revenue.toLocaleString()}`
                        : `${agent.deals_closed} deals`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
