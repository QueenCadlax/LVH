import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
  // Check for admin token first (admin dashboard)
  let token = localStorage.getItem('adminToken');
  
  // Fall back to main app token
  if (!token) {
    token = getToken();
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
