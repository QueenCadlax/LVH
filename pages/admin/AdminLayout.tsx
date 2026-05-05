import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '@/src/utils/auth';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear both admin and main app tokens
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🏆 LowveldHub</h2>
          <p>Premium Admin</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className="nav-link"
            onClick={() => navigate('/admin/dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className="nav-link"
            onClick={() => navigate('/admin/users')}
          >
            👥 Users
          </button>
          <button
            className="nav-link"
            onClick={() => navigate('/admin/businesses')}
          >
            🏢 Businesses
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <h1>✨ LowveldHub Premium Admin Dashboard</h1>
          <div className="header-actions">
            <span className="user-badge">👤 Admin</span>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
