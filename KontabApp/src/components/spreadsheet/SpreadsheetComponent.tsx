// frontend/src/components/spreadsheet/SpreadsheetComponent.tsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Spreadsheet, Sheet, CellValue } from '../../types/spreadsheet.types';
import './SpreadsheetComponent.css';

interface SpreadsheetComponentProps {
  sheet: Sheet;
  onCellChange: (row: number, col: number, value: CellValue) => void;
  readOnly?: boolean;
}

const SpreadsheetComponent: React.FC<SpreadsheetComponentProps> = ({
  sheet,
  onCellChange,
  readOnly = false
}) => {
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize with 50 rows x 26 columns (A-Z)
  const rows = sheet.data.length || 50;
  const cols = sheet.data[0]?.length || 26;

  const handleCellClick = useCallback((row: number, col: number) => {
    setSelectedCell({ row, col });
    const cellValue = sheet.data[row]?.[col];
    setEditValue(cellValue?.toString() || '');
  }, [sheet.data]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!selectedCell) return;

    if (e.key === 'Enter') {
      const newValue = editValue.trim();
      onCellChange(selectedCell.row, selectedCell.col, newValue);
      
      // Move to next row
      setSelectedCell(prev => prev ? { ...prev, row: prev.row + 1 } : null);
    } else if (e.key === 'Escape') {
      setSelectedCell(null);
      setEditValue('');
    }
  }, [selectedCell, editValue, onCellChange]);

  const getCellDisplayValue = useCallback((row: number, col: number): string => {
    const value = sheet.data[row]?.[col];
    if (value === null || value === undefined) return '';
    
    // Check if this cell has a formula
    const cellAddress = `${String.fromCharCode(65 + col)}${row + 1}`;
    const formula = sheet.formulas?.[cellAddress];
    
    if (formula) {
      // Display formula result (në praktikë do të llogaritet)
      return `=${formula.formula}`;
    }
    
    // Format number values
    if (typeof value === 'number') {
      const formatting = sheet.formatting?.[row]?.[col];
      if (formatting?.numberFormat === 'currency') {
        return `${formatting.currencySymbol || ''}${value.toFixed(2)}`;
      }
      if (formatting?.numberFormat === 'percentage') {
        return `${(value * 100).toFixed(2)}%`;
      }
      return value.toString();
    }
    
    return value.toString();
  }, [sheet]);

  // Generate column headers (A, B, C, ...)
  const columnHeaders = Array.from({ length: cols }, (_, i) => 
    String.fromCharCode(65 + i)
  );

  return (
    <div className="spreadsheet-container" ref={containerRef}>
      {/* Formula Bar */}
      <div className="formula-bar">
        <div className="cell-address">
          {selectedCell ? 
            `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 1}` : 
            'Select a cell'
          }
        </div>
        <input
          type="text"
          className="formula-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter value or formula (start with =)"
        />
      </div>

      {/* Spreadsheet Grid */}
      <div className="spreadsheet-grid">
        {/* Column Headers */}
        <div className="row headers">
          <div className="cell corner"></div>
          {columnHeaders.map((header, colIndex) => (
            <div key={colIndex} className="cell header">
              {header}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {/* Row Header */}
            <div className="cell header">
              {rowIndex + 1}
            </div>
            
            {/* Data Cells */}
            {Array.from({ length: cols }).map((_, colIndex) => {
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              const cellClass = `cell ${isSelected ? 'selected' : ''} ${
                sheet.formatting?.[rowIndex]?.[colIndex]?.bold ? 'bold' : ''
              }`;
              
              return (
                <div
                  key={colIndex}
                  className={cellClass}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    backgroundColor: sheet.formatting?.[rowIndex]?.[colIndex]?.backgroundColor,
                    color: sheet.formatting?.[rowIndex]?.[colIndex]?.textColor,
                    fontSize: sheet.formatting?.[rowIndex]?.[colIndex]?.fontSize
                  }}
                >
                  {getCellDisplayValue(rowIndex, colIndex)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpreadsheetComponent;