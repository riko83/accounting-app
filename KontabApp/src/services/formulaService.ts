
import { CellValue, Sheet } from '../types/spreadsheet.types';

export class FormulaService {
  static evaluateFormula(formula: string, sheet: Sheet): CellValue {
    if (!formula.startsWith('=')) {
      return formula;
    }

    const expression = formula.substring(1).toUpperCase();
    
    // Extract cell references
    const cellRefs = this.extractCellReferences(expression);
    
    // Get values from referenced cells
    const context: Record<string, number> = {};
    cellRefs.forEach(ref => {
      const { row, col } = this.parseCellAddress(ref);
      const value = sheet.data[row]?.[col];
      if (typeof value === 'number') {
        context[ref] = value;
      }
    });

    // Simple formula evaluation
    try {
      if (expression.startsWith('SUM(')) {
        const range = expression.match(/SUM\(([^)]+)\)/)?.[1];
        if (range) {
          return this.evaluateSum(range, sheet);
        }
      }
      
      if (expression.startsWith('AVERAGE(')) {
        const range = expression.match(/AVERAGE\(([^)]+)\)/)?.[1];
        if (range) {
          return this.evaluateAverage(range, sheet);
        }
      }
      
      // Basic arithmetic
      if (expression.includes('+') || expression.includes('-') || 
          expression.includes('*') || expression.includes('/')) {
        return this.evaluateArithmetic(expression, context);
      }
      
      return formula; // Return original if can't evaluate
    } catch (error) {
      console.error('Formula evaluation error:', error);
      return `#ERROR: ${error}`;
    }
  }

  private static extractCellReferences(expression: string): string[] {
    const cellRefPattern = /\b[A-Z]+\d+\b/g;
    const matches = expression.match(cellRefPattern);
    return matches || [];
  }

  private static parseCellAddress(address: string): { row: number; col: number } {
    const match = address.match(/^([A-Z]+)(\d+)$/);
    if (!match) {
      throw new Error(`Invalid cell address: ${address}`);
    }

    const [, colLetters, rowStr] = match;
    const row = parseInt(rowStr, 10) - 1;
    const col = this.columnLettersToIndex(colLetters);

    return { row, col };
  }

  private static columnLettersToIndex(letters: string): number {
    let result = 0;
    for (let i = 0; i < letters.length; i++) {
      result = result * 26 + (letters.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return result - 1;
  }

  private static evaluateSum(range: string, sheet: Sheet): number {
    if (range.includes(':')) {
      // Range like A1:B10
      const [start, end] = range.split(':');
      const startAddr = this.parseCellAddress(start);
      const endAddr = this.parseCellAddress(end);
      
      let sum = 0;
      for (let row = startAddr.row; row <= endAddr.row; row++) {
        for (let col = startAddr.col; col <= endAddr.col; col++) {
          const value = sheet.data[row]?.[col];
          if (typeof value === 'number') {
            sum += value;
          }
        }
      }
      return sum;
    } else {
      // Single cell or list
      const cells = range.split(',').map(cell => cell.trim());
      return cells.reduce((sum, cell) => {
        const { row, col } = this.parseCellAddress(cell);
        const value = sheet.data[row]?.[col];
        return sum + (typeof value === 'number' ? value : 0);
      }, 0);
    }
  }

  private static evaluateAverage(range: string, sheet: Sheet): number {
    const sum = this.evaluateSum(range, sheet);
    
    // Count cells in range
    let count = 0;
    if (range.includes(':')) {
      const [start, end] = range.split(':');
      const startAddr = this.parseCellAddress(start);
      const endAddr = this.parseCellAddress(end);
      
      count = (endAddr.row - startAddr.row + 1) * (endAddr.col - startAddr.col + 1);
    } else {
      count = range.split(',').length;
    }
    
    return count > 0 ? sum / count : 0;
  }

  private static evaluateArithmetic(expression: string, context: Record<string, number>): number {
    // Replace cell references with their values
    let evalExpression = expression;
    Object.entries(context).forEach(([cellRef, value]) => {
      evalExpression = evalExpression.replace(new RegExp(cellRef, 'g'), value.toString());
    });
    
    // Safe evaluation
    try {
      // Using Function constructor as a simple evaluator
      // NË PRODUKT DO TË PËRDORNI NJË LIBRAR MË TË SIGURT
      return new Function('return ' + evalExpression)();
    } catch (error) {
      throw new Error(`Arithmetic evaluation failed: ${error}`);
    }
  }
}