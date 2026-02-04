// src/App.tsx - Version i përditësuar
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import Clients from '@/pages/Clients';
import Documents from '@/pages/Documents';
import Accounting from '@/pages/Accounting';
import Tasks from '@/pages/Tasks';
import ClientDetails from '@/pages/ClientDetails';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Login from '@/pages/Login'; 
import SpreadsheetsListPage from './pages/SpreadsheetsListPage';
import SpreadsheetPage from './pages/SpreadsheetPage';
import NewSpreadsheetPage from './pages/NewSpreadsheetPage';
  
const ErrorBoundary: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {children}
    </React.Suspense>
  );
};
function App() {
  return (
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
 
          <Route path="/spreadsheets" element={<SpreadsheetsListPage />} />
          <Route path="/spreadsheets/:id" element={<SpreadsheetPage />} />
          <Route path="/spreadsheets/new" element={<NewSpreadsheetPage />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<ClientDetails />} />
          <Route path="documents" element={<Documents />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
    </ErrorBoundary>
  );
}

export default App;