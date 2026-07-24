import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = () => {
  const { admin, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
