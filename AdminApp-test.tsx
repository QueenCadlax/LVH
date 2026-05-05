import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/admin/Login';

const AdminApp: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminApp;
