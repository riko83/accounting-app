import React, { useEffect, useState } from 'react';
import { Users, FileText, DollarSign, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { ApiResponse } from '@accounting/shared';

interface DashboardStats {
  totalClients: number;
  totalDocuments: number;
  totalInvoices: number;
  totalRevenue: number;
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalDocuments: 0,
    totalInvoices: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real app, you would have a dedicated dashboard endpoint
      // For now, we'll use mock data
      setStats({
        totalClients: 15,
        totalDocuments: 47,
        totalInvoices: 23,
        totalRevenue: 125000
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Klientë',
      value: stats.totalClients,
      icon: <Users size={24} />,
      color: 'clients',
      change: '+2 këtë muaj'
    },
    {
      title: 'Dokumente',
      value: stats.totalDocuments,
      icon: <FileText size={24} />,
      color: 'documents',
      change: '+5 këtë javë'
    },
    {
      title: 'Fatura',
      value: stats.totalInvoices,
      icon: <DollarSign size={24} />,
      color: 'invoices',
      change: '3 të papaguara'
    },
    {
      title: 'Të Ardhurat',
      value: `${stats.totalRevenue.toLocaleString()} ALL`,
      icon: <TrendingUp size={24} />,
      color: 'revenue',
      change: '+15% nga muaji i kaluar'
    }
  ];

  if (loading) {
    return (
      <div className="card">
        <p>Duke ngarkuar dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <small style={{ color: '#718096', fontSize: '12px' }}>{stat.change}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Aktiviteti i Fundit</h3>
          <button className="btn btn-secondary">Shiko të gjithë</button>
        </div>
        
        <div style={{ padding: '20px', textAlign: 'center', color: '#718096' }}>
          <p>Komponenti i aktivitetit do të shfaqë aktivitetet e fundit të sistemit.</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>Ky është një aplikacion demo me funksionalitet bazë.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Klientët Aktiv</h3>
          <ul style={{ listStyle: 'none' }}>
            {['Restorant Palma', 'Kafe Bar Dritë', 'Ndërtimtari Sh.p.k', 'Market Ushqimore'].map((client, index) => (
              <li key={index} style={{ padding: '12px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <span>{client}</span>
                <span className="status-badge status-active">Aktiv</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '20px' }}>Afatet e Ardhshme</h3>
          <ul style={{ listStyle: 'none' }}>
            {[
              { task: 'Deklarimi TVSH', date: '15 Dhjetor', status: 'warning' },
              { task: 'Paga të Stafit', date: '5 Dhjetor', status: 'info' },
              { task: 'Raporti Mujor', date: '31 Dhjetor', status: 'warning' }
            ].map((item, index) => (
              <li key={index} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>{item.task}</div>
                    <div style={{ fontSize: '12px', color: '#718096' }}>Afati: {item.date}</div>
                  </div>
                  <span className={`status-badge status-${item.status}`}>
                    {item.status === 'warning' ? 'Për tu përfunduar' : 'Në vijim'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;