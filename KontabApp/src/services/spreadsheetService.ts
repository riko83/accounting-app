// src/services/spreadsheetService.ts
import { Spreadsheet, CellUpdatePayload } from '../types/spreadsheet';

const API_BASE = '/api/spreadsheets';

export const spreadsheetService = {
  async get(id: string): Promise<Spreadsheet> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch spreadsheet');
    return response.json();
  },

  async create(name: string, templateType?: string): Promise<Spreadsheet> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, templateType })
    });
    if (!response.ok) throw new Error('Failed to create spreadsheet');
    return response.json();
  },

  async updateCell(payload: CellUpdatePayload): Promise<Spreadsheet> {
    const response = await fetch(
      `${API_BASE}/${payload.spreadsheetId}/sheets/${payload.sheetId}/cell`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cellAddress: payload.cellAddress,
          value: payload.value
        })
      }
    );
    if (!response.ok) throw new Error('Failed to update cell');
    return response.json();
  },

  async addSheet(spreadsheetId: string, sheetName: string): Promise<Spreadsheet> {
    const response = await fetch(
      `${API_BASE}/${spreadsheetId}/sheets`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: sheetName })
      }
    );
    if (!response.ok) throw new Error('Failed to add sheet');
    return response.json();
  },

  async deleteSheet(spreadsheetId: string, sheetId: string): Promise<Spreadsheet> {
    const response = await fetch(
      `${API_BASE}/${spreadsheetId}/sheets/${sheetId}`,
      { method: 'DELETE' }
    );
    if (!response.ok) throw new Error('Failed to delete sheet');
    return response.json();
  },

  async exportToExcel(spreadsheetId: string): Promise<Blob> {
    const response = await fetch(`${API_BASE}/${spreadsheetId}/export/excel`);
    if (!response.ok) throw new Error('Failed to export spreadsheet');
    return response.blob();
  },

  async importFromExcel(file: File): Promise<Spreadsheet> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE}/import/excel`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to import spreadsheet');
    return response.json();
  }
};