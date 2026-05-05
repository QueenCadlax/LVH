import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Admin Pages
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Businesses from './pages/admin/Businesses';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  console.log('[ProtectedRoute] Token:', token ? 'Present' : 'Missing');
  if (!token) {
    console.log('[ProtectedRoute] No token, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }
  console.log('[ProtectedRoute] Token valid, rendering protected content');
  return <>{children}</>;
};

const AdminApp: React.FC = () => {
  React.useEffect(() => {
    console.log('[AdminApp] Mounted');
    console.log('[AdminApp] Current URL:', window.location.pathname);
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Login Route - not protected */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes - protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="businesses" element={<Businesses />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
