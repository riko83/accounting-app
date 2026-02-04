// src/components/documents/DocumentStats.tsx
import React from 'react';
import { FileText, Upload, CheckCircle, Clock } from 'lucide-react';

const DocumentStats: React.FC = () => {
  const stats = [
    { label: 'Faturat', value: 12, icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { label: 'Ekstrakte bankare', value: 8, icon: FileText, color: 'bg-purple-100 text-purple-600' },
    { label: 'Fletëpagesa', value: 5, icon: FileText, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Deklaratat', value: 3, icon: FileText, color: 'bg-red-100 text-red-600' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Statistikat e Dokumenteve</h3>
          <p className="text-sm text-gray-600 mt-1">Për shpërndarjen sipas llojit</p>
        </div>
        <Upload className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`p-2 rounded-lg ${stat.color.split(' ')[0]}`}>
                <stat.icon className="w-5 h-5" />
              </span>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-success-500" />
            <span className="text-sm font-medium">Dokumente të përpunuara</span>
          </div>
          <span className="text-sm font-bold text-gray-900">16</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-warning-500" />
            <span className="text-sm font-medium">Në pritje të përpunimit</span>
          </div>
          <span className="text-sm font-bold text-gray-900">8</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentStats;