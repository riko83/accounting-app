import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/clients', label: 'Klientët', icon: <Users size={20} /> },
    { path: '/documents', label: 'Dokumentet', icon: <FileText size={20} /> },
    { path: '/reports', label: 'Raportet', icon: <BarChart3 size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <LayoutDashboard size={32} color="#667eea" />
          <h1>Accounting App</h1>
        </div>
        
        <nav>
          <ul className="sidebar-nav">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <LogOut size={20} />
            Dil
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h2>Mirësevini, {user.name || 'Përdorues'}</h2>
          
          <div className="user-info">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#2d3748' }}>{user.name || 'Përdorues'}</div>
              <div style={{ fontSize: '12px', color: '#718096' }}>{user.role || 'Rol'}</div>
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;