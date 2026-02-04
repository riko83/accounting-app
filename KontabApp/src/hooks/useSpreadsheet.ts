// src/hooks/useSpreadsheet.ts
import { useState, useCallback } from 'react';
import { Spreadsheet, Sheet, CellUpdatePayload } from '../types/spreadsheet';
import { spreadsheetService } from '@/services/SpreadsheetService';

export const useSpreadsheet = () => {
  const [currentSpreadsheet, setCurrentSpreadsheet] = useState<Spreadsheet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSpreadsheet = useCallback(async (spreadsheetId: string) => {
    setLoading(true);
    try {
      const spreadsheet = await spreadsheetService.get(spreadsheetId);
      setCurrentSpreadsheet(spreadsheet);
      setError(null);
      return spreadsheet;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load spreadsheet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createSpreadsheet = useCallback(async (name: string, templateType?: string) => {
    setLoading(true);
    try {
      const spreadsheet = await spreadsheetService.create(name, templateType);
      setCurrentSpreadsheet(spreadsheet);
      setError(null);
      return spreadsheet;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create spreadsheet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCell = useCallback(async (payload: {
    spreadsheetId: string;
    sheetId: string;
    row: number;
    col: number;
    value: string | number | null;
  }) => {
    if (!currentSpreadsheet) throw new Error('No spreadsheet loaded');
    
    try {
      const cellAddress = `${String.fromCharCode(65 + payload.col)}${payload.row + 1}`;
      
      const updated = await spreadsheetService.updateCell({
        spreadsheetId: payload.spreadsheetId,
        sheetId: payload.sheetId,
        cellAddress,
        value: payload.value
      });
      
      setCurrentSpreadsheet(updated);
      return updated;
    } catch (err) {
      console.error('Failed to update cell:', err);
      throw err;
    }
  }, [currentSpreadsheet]);

  const addSheet = useCallback(async (spreadsheetId: string, sheetName: string) => {
    try {
      const updated = await spreadsheetService.addSheet(spreadsheetId, sheetName);
      setCurrentSpreadsheet(updated);
      return updated;
    } catch (err) {
      console.error('Failed to add sheet:', err);
      throw err;
    }
  }, []);

  return {
    spreadsheet: currentSpreadsheet,
    loading,
    error,
    loadSpreadsheet,
    createSpreadsheet,
    updateCell,
    addSheet,
    setSpreadsheet: setCurrentSpreadsheet
  };
};