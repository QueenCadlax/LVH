import React, { useEffect, useState } from 'react';
import api from '@/src/services/api';
import './AdminPages.css';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  location?: string;
  isVerified: boolean;
  createdAt: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="error-message">{error}</div>
        <button onClick={fetchUsers} className="action-btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>👥 All Users</h2>
        <p>{users.length} total users registered</p>
      </div>

      <div className="premium-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Business Name</th>
              <th>Business Type</th>
              <th>Location</th>
              <th>Verified</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-name">
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>
                </td>
                <td>{user.email}</td>
                <td>{user.phone || '-'}</td>
                <td>{user.businessName || '-'}</td>
                <td>{user.businessType || '-'}</td>
                <td>{user.location || '-'}</td>
                <td>
                  <span
                    className={`badge ${
                      user.isVerified ? 'badge-verified' : 'badge-unverified'
                    }`}
                  >
                    {user.isVerified ? '✅ Verified' : '❌ Unverified'}
                  </span>
                </td>
                <td className="date">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="empty-state">
          <p>No users found</p>
        </div>
      )}
    </div>
  );
};

export default Users;
