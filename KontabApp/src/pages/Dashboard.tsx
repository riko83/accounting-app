// src/pages/Dashboard.tsx - UPDATED
import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  FileText,
  CheckSquare,
  Calendar,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Clock,
  Plus,ChevronDown,
  Table,
  ArrowUpRight
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import Button from '../components/common/Button';
import { useStore } from '../store/useStore';
import { useApi } from '../services/useApi';
import RecentClientsTable from '../components/clients/RecentClientsTable';
import UpcomingTasks from '../components/tasks/UpcomingTasks';
import DocumentStats from '../components/documents/DocumentStats';
import DocumentUpload from '../components/documents/DocumentUpload';
import { Spreadsheet } from '@/types/spreadsheet';

const Dashboard: React.FC = () => {
  const { clients, documents, tasks, dashboardStats, setDashboardStats,spreadsheets } = useStore();
  const recentSpreadsheets = spreadsheets.slice(0, 3); // 3 të fundit
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const api = useApi();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCreateDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await api.getDashboardStats();
        const enhancedStats = {
          ...stats,
          totalSpreadsheets: stats.totalSpreadsheets || spreadsheets.length
        };
        setDashboardStats(enhancedStats);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };
    loadStats();
  }, []);
  useEffect(() => {
    loadRecentSpreadsheets();
  }, []);
  const loadRecentSpreadsheets = async () => {
    try {
      // Në fakt, duhet të keni një endpoint për spreadsheets e fundit
      // Për tani, do të përdorim një mock funksion
      const spreadsheets = await getRecentSpreadsheets();
      setRecentSpreadsheets(spreadsheets);
    } catch (error) {
      console.error('Failed to load recent spreadsheets:', error);
    } finally {
      //setLoading(false);
    }
  };

  const getRecentSpreadsheets = async (): Promise<Spreadsheet[]> => {
    // Mock data - në prodhim do të merrni nga API
    return [
      {
        id: '1',
        name: 'Balance Sheet 2024',
        description: 'Annual financial statement',
        sheets: [],
        ownerId: '1',
        sharedWith: [],
        isTemplate: false,
        templateType: 'balance',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '2',
        name: 'Income Q1',
        description: 'First quarter income report',
        sheets: [],
        ownerId: '1',
        sharedWith: [],
        isTemplate: false,
        templateType: 'income',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: '3',
        name: 'Payroll January',
        description: 'Monthly payroll calculation',
        sheets: [],
        ownerId: '1',
        sharedWith: [],
        isTemplate: false,
        templateType: 'payroll',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-15')
      }
    ];
  };

  const stats = dashboardStats || {
    totalClients: 0,
    activeClients: 0,
    pendingDocuments: 0,
    pendingTasks: 0,
    upcomingDeadlines: 0,
    monthlyRevenue: 0,
    totalSpreadsheets:0
  };

  const recentClients = clients.slice(0, 5);
  const urgentTasks = tasks
    .filter(t => t.priority === 'high' && t.status !== 'completed')
    .slice(0, 3);

  const handleAddClient = () => {
    setShowAddClient(true);
    setShowCreateDropdown(false);
    // Në praktikë, do të hapej një modal
    console.log('Add new client');
  };
  const handleCreateSpreadsheet = () => {
    setShowCreateDropdown(false);
    window.location.href = '/spreadsheets/new';
  };
  
  const handleCreateTask = () => {
    setShowCreateDropdown(false);
    window.location.href = '/tasks/new';
    console.log('Create new task');
  };

  const handleUploadDocument = () => {
    setShowUploadModal(true);
  };

   

  const handleRecordPayment = () => {
    // Do të hapej modal për regjistrimin e pagesës
    console.log('Record payment');
  };

  return (
    <div className="space-y-6">
        {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Mirë se vini përsëri! Këtu është një përmbledhje e aktivitetit tuaj.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Clock}>
            Sot: {new Date().toLocaleDateString('sq-AL')}
          </Button>
          
          {/* Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            {/* Butoni i Dropdown-it */}
            <Button 
              variant="primary" 
              icon={Plus}
              onClick={() => setShowCreateDropdown(!showCreateDropdown)}
            >
              Krijo të ri <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Dropdown Menu - kontrollohet nga state */}
            {showCreateDropdown && (
              <div 
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <a 
                    href="/clients/new" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={handleAddClient}
                  >
                    + Klient i ri
                  </a>
                  <a 
                    href="/spreadsheets/new" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={handleCreateSpreadsheet}
                  >
                    + Spreadsheet i ri
                  </a>
                  <a 
                    href="/tasks/new" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={handleCreateTask}
                  >
                    + Detyrë e re
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Klientët Total"
          value={stats.totalClients}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          color="blue"
          description="+2 këtë muaj"
          onClick={() => console.log('Navigate to clients')}
        />
        <StatCard
          title="Klientë Aktiv"
          value={stats.activeClients}
          icon={Users}
          color="green"
          description={`${Math.round((stats.activeClients / stats.totalClients) * 100)}% e totalit`}
        />
        <StatCard
          title="Dokumente në Pritje"
          value={stats.pendingDocuments}
          icon={FileText}
          color="orange"
          description="Kërkojnë përpunim"
          onClick={() => console.log('Navigate to pending documents')}
        />
        <StatCard
          title="Detyra në Pritje"
          value={stats.pendingTasks}
          icon={CheckSquare}
          color="red"
          onClick={() => console.log('Navigate to pending tasks')}
        />
        <StatCard
          title="Afatet"
          value={stats.upcomingDeadlines}
          icon={Calendar}
          color="purple"
          description="Këtë javë"
          onClick={() => console.log('Navigate to calendar')}
        />
        <StatCard
          title="Të ardhura"
          value={`${stats.monthlyRevenue?.toLocaleString()} €`}
          icon={TrendingUp}
          color="indigo"
          description="Muaj aktual"
          onClick={() => console.log('Navigate to accounting')}
        />
        <StatCard
          title="Spreadsheets"
          value={stats.totalSpreadsheets || 0} // Do të duhet të shtoni këtë në statistikat tuaja
          icon={Table}
          color="yellow" // Ose çdo ngjyrë tjetër që nuk është përdorur
          description="Fletëllogaritje"
          onClick={() => window.location.href = '/spreadsheets'} // Ose përdorni useNavigate
        />
      </div>

      {/* Alerts Section */}
      {urgentTasks.length > 0 && (
        <div className="bg-danger-50 border-l-4 border-danger-400 p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-danger-400 mt-0.5" />
            <div className="ml-3">
              <p className="text-sm font-medium text-danger-800">
                Ju keni {urgentTasks.length} detyra urgiente!
              </p>
              <ul className="mt-1 text-sm text-danger-700 list-disc list-inside">
                {urgentTasks.map(task => (
                  <li key={task.id}>{task.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Klientët e Fundit
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Klientët e shtuar ose të përditësuar së fundmi
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Spreadsheets e Fundit
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Fletëllogaritjet tuaja të modifikuara së fundmi
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={ArrowUpRight}
                  onClick={() => console.log('Navigate to all clients')}
                >
                  Shiko të gjithë
                </Button>
              </div>
            </div>
            <RecentClientsTable clients={recentClients} />
            <div className="p-6">
              {/* Këtu mund të vendosni një listë të thjeshtë ose një komponent RecentSpreadsheetsTable */}
              <p className="text-gray-500 text-center py-4">
                Akoma nuk keni asnjë spreadsheet. <a href="/spreadsheets/new" className="text-teal-600 hover:underline">Krijoni të parën!</a>
              </p>
            </div>
          </div>

          <DocumentStats />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UpcomingTasks />

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Veprime të Shpejta
            </h3>
            <div className="space-y-3">
              <Button 
                variant="primary" 
                className="w-full" 
                icon={Users}
                onClick={handleAddClient}
              >
                Shto Klient të Ri
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                icon={FileText}
                onClick={handleUploadDocument}
              >
                Ngarko Dokument
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                icon={DollarSign}
                onClick={handleRecordPayment}
              >
                Regjistro Pagesë
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                icon={CheckSquare}
                onClick={handleCreateTask}
              >
                Krijo Detyrë të Re
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                icon={Table} // Përdorni të njëjtën ikonë
                onClick={() => window.location.href = '/spreadsheets'}
              >
                Hap Spreadsheets
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                icon={Table}
                onClick={() => window.location.href = '/spreadsheets/new'}
              >
                Krijo Spreadsheet
              </Button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Statusi i Sistemit
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backup i fundit</span>
                <span className="text-sm font-medium text-success-600">
                  Sot 02:00
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Hapësirë e lirë</span>
                <span className="text-sm font-medium text-warning-600">
                  4.2 GB / 10 GB
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Versioni</span>
                <span className="text-sm font-medium text-gray-900">v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div> 
      
      {/* Modals */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Ngarko Dokumentet</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <DocumentUpload onClose={() => setShowUploadModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;