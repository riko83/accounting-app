// src/components/clients/RecentClientsTable.tsx
import React from 'react';
import { Client } from '../../types';
import { MoreVertical, Phone, Mail, Building } from 'lucide-react';
import Button from '../common/Button';

interface RecentClientsTableProps {
  clients: Client[];
}

const RecentClientsTable: React.FC<RecentClientsTableProps> = ({ clients }) => {
  if (clients.length === 0) {
    return (
      <div className="p-6 text-center">
        <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Nuk ka klientë të regjistruar</p>
        <Button variant="outline" className="mt-3">
          Shto klientin e parë
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Emri i Kompanisë
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
                <div className="flex items-center space-x-3">
                  {client.phone && (
                    <a
                      href={`tel:${client.phone}`}
                      className="flex items-center text-sm text-gray-600 hover:text-primary-600"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      {client.phone}
                    </a>
                  )}
                  {client.email && (
                    <a
                      href={`mailto:${client.email}`}
                      className="flex items-center text-sm text-gray-600 hover:text-primary-600"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </a>
                  )}
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentClientsTable;