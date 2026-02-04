// src/components/layout/Layout.tsx - VERSIONI FINAL
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header - fixed në krye */}
      <div className="flex-shrink-0">
        <Header />
      </div>
      
      {/* Main container - flex dhe overflow hidden */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar - me scroll të brendshëm */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Main content - me scroll të pavarur */}
        <main className="flex-1 min-w-0 overflow-y-auto scrollbar-thin">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;