// src/pages/SpreadsheetsListPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spreadsheet } from '../types/spreadsheet';
import { spreadsheetService } from '@/services/SpreadsheetService';

const SpreadsheetsListPage: React.FC = () => {
  const [spreadsheets, setSpreadsheets] = useState<Spreadsheet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpreadsheets();
  }, []);

  const loadSpreadsheets = async () => {
    try {
      // Në fakt, duhet të keni një endpoint për listën
      // Për tani, do të krijojmë disa mock data
      const mockSpreadsheets: Spreadsheet[] = [
        {
          id: '1',
          name: 'Balance Sheet 2024',
          description: 'Annual balance sheet',
          sheets: [],
          ownerId: '1',
          sharedWith: [],
          isTemplate: false,
          templateType: 'balance',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Income Statement Q1',
          description: 'First quarter income',
          sheets: [],
          ownerId: '1',
          sharedWith: [],
          isTemplate: false,
          templateType: 'income',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      setSpreadsheets(mockSpreadsheets);
    } catch (error) {
      console.error('Failed to load spreadsheets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = async () => {
    try {
      const newSpreadsheet = await spreadsheetService.create('New Spreadsheet');
      // Redirect to the new spreadsheet
      window.location.href = `/spreadsheets/${newSpreadsheet.id}`;
    } catch (error) {
      console.error('Failed to create spreadsheet:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Spreadsheets</h1>
            <p className="text-gray-600 mt-2">
              Manage your accounting spreadsheets
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            + New Spreadsheet
          </button>
        </div>

        {/* Templates Section */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Balance Sheet', 'Income Statement', 'Cash Flow', 'Payroll'].map((template, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition cursor-pointer"
                onClick={() => {
                  // Handle template selection
                  spreadsheetService.create(template, template.toLowerCase().replace(' ', ''));
                }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">
                    {template.charAt(0)}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900">{template}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Pre-built template for {template.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* My Spreadsheets */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Spreadsheets</h2>
          {spreadsheets.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No spreadsheets yet</h3>
              <p className="text-gray-500 mt-1 mb-4">
                Create your first spreadsheet to get started
              </p>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create Spreadsheet
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {spreadsheets.map((spreadsheet) => (
                    <tr key={spreadsheet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <Link
                          to={`/spreadsheets/${spreadsheet.id}`}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-blue-600 font-bold">S</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {spreadsheet.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {spreadsheet.description}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {spreadsheet.templateType || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(spreadsheet.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/spreadsheets/${spreadsheet.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Open
                          </Link>
                          <button className="text-gray-400 hover:text-gray-600">
                            ⋮
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetsListPage;