// src/components/spreadsheet/SpreadsheetGrid.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, CellValue } from '@/types/spreadsheet';
import { useSpreadsheet } from '@/hooks/useSpreadsheet';
import './SpreadsheetGrid.css';

interface SpreadsheetGridProps {
  sheet: Sheet;
  spreadsheetId: string;
  onCellUpdate: (row: number, col: number, value: CellValue) => void;
  readOnly?: boolean;
}

const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({
  sheet,
  spreadsheetId,
  onCellUpdate,
  readOnly = false
}) => {
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [editValue, setEditValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { updateCell } = useSpreadsheet();

  // Initialize grid dimensions
  const rows = Math.max(sheet.data.length, 100);
  const cols = Math.max(sheet.data[0]?.length || 0, 26);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const value = sheet.data[row]?.[col];
    setEditValue(value?.toString() || '');
  };

  const handleCellBlur = async () => {
    if (!selectedCell) return;
    
    try {
      await updateCell({
        spreadsheetId,
        sheetId: sheet.id,
        row: selectedCell.row,
        col: selectedCell.col,
        value: editValue
      });
      
      onCellUpdate(selectedCell.row, selectedCell.col, editValue);
    } catch (error) {
      console.error('Failed to update cell:', error);
    }
  };

  const getCellDisplayValue = (row: number, col: number): string => {
    const value = sheet.data[row]?.[col];
    if (value == null) return '';
    
    // Check for formula
    const formula = sheet.formulas.find(f => 
      f.cellAddress === `${String.fromCharCode(65 + col)}${row + 1}`
    );
    
    if (formula) {
      return formula.calculatedValue?.toString() || '';
    }
    
    return value.toString();
  };

  // Generate column headers (A-Z)
  const columnHeaders = Array.from({ length: cols }, (_, i) => 
    String.fromCharCode(65 + i)
  );

  return (
    <div className="spreadsheet-wrapper">
      {/* Formula Bar */}
      <div className="formula-bar">
        <div className="cell-address-display">
          {selectedCell ? 
            `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 1}` : 
            ''
          }
        </div>
        <input
          type="text"
          className="formula-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleCellBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleCellBlur()}
          placeholder={selectedCell ? "Enter value or formula" : "Select a cell"}
          disabled={readOnly}
        />
      </div>

      {/* Grid Container */}
      <div className="spreadsheet-container" ref={containerRef}>
        <div className="spreadsheet-grid">
          {/* Column Headers */}
          <div className="grid-row header-row">
            <div className="cell header-cell corner"></div>
            {columnHeaders.map((header, idx) => (
              <div key={idx} className="cell header-cell">
                {header}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              <div className="cell header-cell row-header">
                {rowIdx + 1}
              </div>
              
              {Array.from({ length: cols }).map((_, colIdx) => {
                const isSelected = selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
                const cellClass = `data-cell ${isSelected ? 'selected' : ''}`;
                
                return (
                  <div
                    key={colIdx}
                    className={cellClass}
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                    style={{
                      fontWeight: sheet.formatting[rowIdx]?.[colIdx]?.bold ? 'bold' : 'normal',
                      fontStyle: sheet.formatting[rowIdx]?.[colIdx]?.italic ? 'italic' : 'normal',
                      backgroundColor: sheet.formatting[rowIdx]?.[colIdx]?.backgroundColor,
                      color: sheet.formatting[rowIdx]?.[colIdx]?.textColor,
                      textAlign: sheet.formatting[rowIdx]?.[colIdx]?.textAlign || 'left'
                    }}
                  >
                    {getCellDisplayValue(rowIdx, colIdx)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetGrid;