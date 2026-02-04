// src/pages/Documents.tsx
import React, { useState } from 'react';
import { Search, Filter, Upload, FileText, Download, MoreVertical } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Documents: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const documents = [
    {
      id: '1',
      name: 'Fatura_Shkurt_2024.pdf',
      type: 'invoice',
      client: 'Tech Solutions Sh.P.K',
      size: '2.4 MB',
      date: '2024-02-28',
      status: 'processed'
    },
    {
      id: '2',
      name: 'Ekstrakt_Bankar_Mars.pdf',
      type: 'bank_statement',
      client: 'Green Energy AL',
      size: '1.8 MB',
      date: '2024-03-15',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Fletëpagesa_Janar.xlsx',
      type: 'payroll',
      client: 'Digital Marketing Pro',
      size: '850 KB',
      date: '2024-01-31',
      status: 'processed'
    },
    {
      id: '4',
      name: 'Deklarata_TVSH_Februar.pdf',
      type: 'tax',
      client: 'Food Express',
      size: '3.2 MB',
      date: '2024-03-05',
      status: 'pending'
    },
    {
      id: '5',
      name: 'Faturë_Elektriciteti.pdf',
      type: 'receipt',
      client: 'Construct Plus',
      size: '1.1 MB',
      date: '2024-03-10',
      status: 'processed'
    }
  ];

  const documentTypes = [
    { value: 'all', label: 'Të gjitha' },
    { value: 'invoice', label: 'Faturat' },
    { value: 'receipt', label: 'Faturat e shpenzimeve' },
    { value: 'bank_statement', label: 'Ekstrakte bankare' },
    { value: 'payroll', label: 'Fletëpagesa' },
    { value: 'tax', label: 'Deklarata tatimore' },
    { value: 'other', label: 'Të tjera' }
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      invoice: 'bg-blue-100 text-blue-800',
      receipt: 'bg-green-100 text-green-800',
      bank_statement: 'bg-purple-100 text-purple-800',
      payroll: 'bg-yellow-100 text-yellow-800',
      tax: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.other;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      invoice: 'Faturë',
      receipt: 'Faturë shpenzimi',
      bank_statement: 'Ekstrakt bankar',
      payroll: 'Fletëpagesë',
      tax: 'Deklaratë',
      other: 'Tjetër'
    };
    return labels[type] || labels.other;
  };

  const filteredDocuments = selectedFilter === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dokumentet</h1>
          <p className="text-gray-600 mt-2">
            Menaxhoni të gjitha dokumentet e klientëve
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Download}>
            Eksporto
          </Button>
          <Button variant="primary" icon={Upload}>
            Ngarko Dokument
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Dokumente totale</p>
            </div>
            <FileText className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Në pritje</p>
            </div>
            <FileText className="w-8 h-8 text-warning-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">124 MB</p>
              <p className="text-sm text-gray-600">Hapësirë totale</p>
            </div>
            <FileText className="w-8 h-8 text-success-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Kërko dokumente me emër, klient..."
              icon={Search}
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {documentTypes.slice(1).map(type => (
            <button
              key={type.value}
              onClick={() => setSelectedFilter(type.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === type.value
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emri i Dokumentit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lloji
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klienti
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Madhësia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statusi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veprime
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                      {getTypeLabel(doc.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doc.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.status === 'processed' 
                        ? 'bg-success-100 text-success-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                      {doc.status === 'processed' ? 'I përpunuar' : 'Në pritje'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900 p-1">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nuk u gjetën dokumente</p>
            <Button variant="outline" className="mt-3" icon={Upload}>
              Ngarko dokumentin e parë
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;