import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ApiResponse } from '@accounting/shared';
import axios from 'axios';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';
import DocumentsPage from './pages/DocumentsPage';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Styles
import './App.css';

// API Configuration
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Axios interceptor for adding token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor for handling errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get<ApiResponse>('/auth/me');
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Duke ngarkuar aplikacionin...</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          } />
          
          <Route path="/" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;