// src/pages/Clients.tsx - Version i plotë
import React, { useState } from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ClientTable from '@/components/clients/ClientTable';
import ClientForm from '@/components/clients/ClientForm';
import { useStore } from '../store/useStore';
import { Client } from '../types';

const Clients: React.FC = () => {
  const { clients, setClients } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.taxId.includes(searchTerm) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setClients([...clients, newClient]);
    setShowForm(false);
  };

  const handleEditClient = (clientData: Partial<Client>) => {
    if (!editingClient) return;
    
    const updatedClients = clients.map(client =>
      client.id === editingClient.id ? { ...client, ...clientData } : client
    );
    
    setClients(updatedClients);
    setEditingClient(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Klientët</h1>
          <p className="text-gray-600 mt-2">
            Menaxhoni të gjithë klientët tuaj në një vend
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Download}>
            Eksporto
          </Button>
          <Button variant="primary" icon={Plus} onClick={() => setShowForm(true)}>
            Shto Klient
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-primary-600">{clients.length}</div>
          <div className="text-sm text-primary-800">Total Klientë</div>
        </div>
        <div className="bg-success-50 border border-success-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-success-600">
            {clients.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-success-800">Aktivë</div>
        </div>
        <div className="bg-warning-50 border border-warning-100 rounded-lg p-4">
          <div className="text-2xl font-bold text-warning-600">
            {clients.filter(c => c.status === 'pending').length}
          </div>
          <div className="text-sm text-warning-800">Në Pritje</div>
        </div>
        <div className="bg-danger-50 border border-danger-100 rounded-lg p-4">
          <div className="text-2-xl font-bold text-danger-600">
            {clients.filter(c => c.status === 'inactive').length}
          </div>
          <div className="text-sm text-danger-800">Jo Aktivë</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Kërko klientë me emër, NIPT ose email..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Të gjithë statuset</option>
                <option value="active">Aktiv</option>
                <option value="pending">Në Pritje</option>
                <option value="inactive">Jo Aktiv</option>
              </select>
            </div>
            <Button variant="ghost" onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}>
              Pastro
            </Button>
          </div>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <ClientTable 
          clients={filteredClients} 
          onEdit={setEditingClient}
          onDelete={(id) => {
            setClients(clients.filter(client => client.id !== id));
          }}
        />
      </div>

      {/* Forms */}
      {showForm && (
        <ClientForm
          title="Shto Klient të Ri" 
          onSubmit={handleAddClient}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingClient && (
        <ClientForm
          title="Modifiko Klientin"
          initialData={editingClient}
          onSubmit={handleEditClient}
          onCancel={() => setEditingClient(null)}
        />
      )}
    </div>
  );
};

export default Clients;