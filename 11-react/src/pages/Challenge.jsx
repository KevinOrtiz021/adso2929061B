import React from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Login     from '../components/Login';
import Dashboard from '../components/Dashboard';

function PetsApp() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <Login />;
}

function Challenge() {
  return (
    <AuthProvider>
      <PetsApp />
    </AuthProvider>
  );
}

export default Challenge;
