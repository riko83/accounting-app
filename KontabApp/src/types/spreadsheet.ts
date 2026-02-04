// src/types/spreadsheet.ts
export type CellValue = string | number | boolean | null | undefined;

export interface CellPosition {
  row: number;
  col: number;
  sheetId: string;
}

export interface FormulaCell {
  id: string;
  cellAddress: string; // "A1", "B2"
  formula: string;
  dependencies: string[];
  calculatedValue: CellValue;
  lastCalculated: Date;
}

export interface CellFormatting {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
  fontFamily?: string;
  backgroundColor?: string;
  textColor?: string;
  numberFormat?: 'currency' | 'percentage' | 'number' | 'date';
  currency?: string;
  decimalPlaces?: number;
  textAlign?: 'left' | 'center' | 'right';
}

export interface Sheet {
  id: string;
  name: string;
  data: CellValue[][];
  formulas: FormulaCell[];
  formatting: CellFormatting[][];
  createdAt: Date;
  updatedAt: Date;
}

export interface Spreadsheet {
  id: string;
  name: string;
  description?: string;
  sheets: Sheet[];
  ownerId: string;
  sharedWith: string[]; // User IDs
  isTemplate: boolean;
  templateType?: 'balance' | 'income' | 'cashflow' | 'payroll' | 'custom';
  createdAt: Date;
  updatedAt: Date;
}

export interface CellUpdatePayload {
  spreadsheetId: string;
  sheetId: string;
  cellAddress: string;
  value: CellValue;
  isFormula?: boolean;
}