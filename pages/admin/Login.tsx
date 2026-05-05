import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/src/services/api';
import './LoginPage.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@lowveldhub.co.za');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('[Login] Attempting login with email:', email);
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      console.log('[Login] Response:', response.data);

      // Handle both response formats
      const token = response.data.data?.token || response.data.token;
      const user = response.data.data?.user || response.data.user;

      console.log('[Login] Token:', token ? 'Present' : 'Missing');
      console.log('[Login] User:', user ? 'Present' : 'Missing');

      if (response.data.success && token) {
        // Store JWT token in localStorage (using both keys for compatibility)
        localStorage.setItem('token', token);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(user));
        
        console.log('[Login] Token stored successfully');
        console.log('[Login] Calling navigate(/admin/dashboard)');
        // Redirect to dashboard
        navigate('/admin/dashboard');
      } else {
        console.error('[Login] Invalid response:', response.data);
        setError('Invalid response from server. Please try again.');
      }
    } catch (err: any) {
      console.error('[Login] Error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Login failed. Please try again.';
      console.error('[Login] Error message:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>🏛️ LowveldHub Admin</h1>
          <p className="subtitle">Dashboard Login</p>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@lowveldhub.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="demo-info">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@lowveldhub.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
