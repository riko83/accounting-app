// src/pages/SpreadsheetPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SpreadsheetGrid from '../components/spreadsheet/SpreadsheetGrid';
import { useSpreadsheet } from '../hooks/useSpreadsheet';
import { Sheet } from '../types/spreadsheet';

const SpreadsheetPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { spreadsheet, loading, error, loadSpreadsheet } = useSpreadsheet();
  const [currentSheet, setCurrentSheet] = useState<Sheet | null>(null);

  React.useEffect(() => {
    if (id) {
      loadSpreadsheet(id).then(spreadsheet => {
        if (spreadsheet?.sheets?.length > 0) {
          setCurrentSheet(spreadsheet.sheets[0]);
        }
      });
    }
  }, [id, loadSpreadsheet]);

  const handleCellUpdate = (row: number, col: number, value: string | number | null) => {
    if (!currentSheet || !id) return;
    
    // Update local state immediately for better UX
    const updatedSheet = { ...currentSheet };
    if (!updatedSheet.data[row]) {
      updatedSheet.data[row] = [];
    }
    updatedSheet.data[row][col] = value;
    setCurrentSheet(updatedSheet);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentSheet) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-yellow-800 font-medium">No Spreadsheet Found</h3>
          <p className="text-yellow-600 mt-1">Please create or select a spreadsheet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {spreadsheet?.name || 'Spreadsheet'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {spreadsheet?.description || 'Edit your data in real-time'}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Save
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Export to Excel
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Share
            </button>
          </div>
        </div>

        {/* Sheet Tabs */}
        {spreadsheet?.sheets && spreadsheet.sheets.length > 0 && (
          <div className="flex items-center mt-4 space-x-2">
            {spreadsheet.sheets.map((sheet, index) => (
              <button
                key={sheet.id}
                className={`px-4 py-2 rounded-t-lg transition ${
                  currentSheet.id === sheet.id
                    ? 'bg-white border-t border-l border-r border-gray-300 text-blue-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setCurrentSheet(sheet)}
              >
                {sheet.name}
              </button>
            ))}
            <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
              +
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <SpreadsheetGrid
          sheet={currentSheet}
          spreadsheetId={id!}
          onCellUpdate={handleCellUpdate}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>Ready</span>
            <span>•</span>
            <span>{currentSheet.data.length} rows</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-700">Undo (Ctrl+Z)</button>
            <button className="hover:text-gray-700">Redo (Ctrl+Y)</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpreadsheetPage;