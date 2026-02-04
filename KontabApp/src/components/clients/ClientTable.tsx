// src/components/clients/ClientTable.tsx
import React from 'react';
import { Client } from '../../types';
import { MoreVertical, Phone, Mail, Edit, Trash2 } from 'lucide-react';

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientTable: React.FC<ClientTableProps> = ({ clients, onEdit, onDelete }) => {
  const [showActions, setShowActions] = React.useState<string | null>(null);

  if (clients.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">Nuk u gjetën klientë</p>
        <p className="text-sm text-gray-400 mt-1">Provoni të ndryshoni filtrat ose shtoni një klient të ri</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Klienti
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NIPT
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kontakt
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statusi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data e regjistrimit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Veprime
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-semibold">
                      {client.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {client.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {client.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-mono">
                  {client.taxId}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col space-y-1">
                  {client.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-3 h-3 mr-1" />
                      {client.phone}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-3 h-3 mr-1" />
                    {client.email}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${client.status === 'active' 
                    ? 'bg-success-100 text-success-800' 
                    : client.status === 'pending'
                    ? 'bg-warning-100 text-warning-800'
                    : 'bg-danger-100 text-danger-800'
                  }
                `}>
                  {client.status === 'active' ? 'Aktiv' : 
                   client.status === 'pending' ? 'Në Pritje' : 'Jo Aktiv'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(client.createdAt).toLocaleDateString('sq-AL')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                <button 
                  onClick={() => setShowActions(showActions === client.id ? null : client.id)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                
                {showActions === client.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onEdit(client);
                          setShowActions(null);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifiko
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Jeni i sigurt për të fshirë këtë klient?')) {
                            onDelete(client.id);
                          }
                          setShowActions(null);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-danger-600 hover:bg-danger-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Fshi
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;