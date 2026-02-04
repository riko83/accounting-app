// src/components/layout/Sidebar.tsx - VERSIONI I RREGULLUAR
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calculator,
  CheckSquare,
  Calendar,
  Settings,
  HelpCircle,
  Building,
  Upload
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const Sidebar: React.FC = () => {
  const { clients } = useStore();
  const recentClients = clients.slice(0, 3);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/clients', icon: Users, label: 'Klientët' },
    { to: '/documents', icon: FileText, label: 'Dokumentet' },
    { to: '/accounting', icon: Calculator, label: 'Kontabiliteti' },
    { to: '/tasks', icon: CheckSquare, label: 'Detyrat' },
    { to: '/calendar', icon: Calendar, label: 'Kalendar' },
  ];

  const quickActions = [
    { to: '/clients/new', icon: Building, label: 'Klient i ri', action: () => console.log('Add client') },
    { to: '/documents/upload', icon: Upload, label: 'Ngarko dokument', action: () => console.log('Upload document') },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Scrollable content inside sidebar */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <nav className="p-4">
          {/* Navigimi */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Navigimi
            </h3>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Veprime të Shpejta */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Veprime të Shpejta
            </h3>
            <ul className="space-y-1">
              {quickActions.map((item) => (
                <li key={item.to}>
                  <button
                    onClick={item.action}
                    className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Klientët e Fundit */}
          {recentClients.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Klientët e Fundit
              </h3>
              <ul className="space-y-2">
                {recentClients.map((client) => (
                  <li key={client.id}>
                    <NavLink
                      to={`/clients/${client.id}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-600 font-semibold text-sm">
                            {client.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600 truncate">
                            {client.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{client.taxId}</p>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        client.status === 'active' ? 'bg-success-500' : 
                        client.status === 'pending' ? 'bg-warning-500' : 'bg-danger-500'
                      }`} />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>

      {/* Footer i Sidebar - Gjithmonë në fund */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <NavLink
          to="/settings"
          end
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
        <NavLink
          to="/help"
          end
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors mt-1 ${
              isActive
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <HelpCircle className="w-5 h-5" />
          <span>Ndihmë</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;