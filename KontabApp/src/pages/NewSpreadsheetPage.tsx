// src/pages/NewSpreadsheetPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { spreadsheetService } from '@/services/SpreadsheetService';

const NewSpreadsheetPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const templates = [
    { id: 'balance', name: 'Balance Sheet', description: 'Assets, liabilities, and equity' },
    { id: 'income', name: 'Income Statement', description: 'Revenue, expenses, and profit' },
    { id: 'cashflow', name: 'Cash Flow', description: 'Cash inflows and outflows' },
    { id: 'payroll', name: 'Payroll', description: 'Employee salaries and taxes' },
    { id: 'general', name: 'Blank', description: 'Empty spreadsheet' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a name for the spreadsheet');
      return;
    }

    setLoading(true);
    try {
      const newSpreadsheet = await spreadsheetService.create(name, template || undefined);
      navigate(`/spreadsheets/${newSpreadsheet.id}`);
    } catch (error) {
      console.error('Failed to create spreadsheet:', error);
      alert('Failed to create spreadsheet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Spreadsheet</h1>
            <p className="text-gray-600 mt-2">
              Choose a template or start from scratch
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spreadsheet Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Annual Report 2024"
                required
              />
              
              <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of this spreadsheet"
                rows={3}
              />
            </div>

            {/* Template Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Choose a Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((t) => (
                  <div
                    key={t.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      template === t.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setTemplate(t.id)}
                  >
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                        template === t.id ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <span className={`font-bold ${
                          template === t.id ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          {t.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{t.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{t.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/spreadsheets')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Spreadsheet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSpreadsheetPage;