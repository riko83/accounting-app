// src/utils/formulaParser.ts
export class FormulaParser {
    static evaluate(formula: string, context: Record<string, any> = {}): any {
      if (!formula.startsWith('=')) return formula;
  
      const expression = formula.substring(1).trim();
      
      try {
        // Replace cell references with their values
        let evalExpression = expression;
        const cellRefs = this.extractCellReferences(expression);
        
        cellRefs.forEach(ref => {
          if (context[ref] !== undefined) {
            evalExpression = evalExpression.replace(
              new RegExp(ref, 'g'),
              typeof context[ref] === 'number' ? context[ref].toString() : `"${context[ref]}"`
            );
          }
        });
  
        // Handle accounting functions
        if (evalExpression.includes('VAT(')) {
          evalExpression = this.replaceVATFunction(evalExpression);
        }
        
        if (evalExpression.includes('NETTO(')) {
          evalExpression = this.replaceNettoFunction(evalExpression);
        }
  
        // Evaluate simple expressions
        return this.safeEval(evalExpression);
      } catch (error) {
        console.error('Formula evaluation error:', error);
        return `#ERROR: ${error instanceof Error ? error.message : 'Invalid formula'}`;
      }
    }
  
    private static extractCellReferences(expression: string): string[] {
      const pattern = /\b[A-Z]{1,3}\d{1,5}\b/g;
      const matches = expression.match(pattern);
      return matches ? Array.from(new Set(matches)) : [];
    }
  
    private static replaceVATFunction(expression: string): string {
      return expression.replace(
        /VAT\(([^,]+)(?:,\s*([^)]+))?\)/g,
        (match, amount, rate = '0.2') => `(${amount} * ${rate})`
      );
    }
  
    private static replaceNettoFunction(expression: string): string {
      return expression.replace(
        /NETTO\(([^,]+)(?:,\s*([^)]+))?\)/g,
        (match, brutto, rate = '0.2') => `(${brutto} / (1 + ${rate}))`
      );
    }
  
    private static safeEval(expression: string): any {
      // Remove any dangerous patterns
      const sanitized = expression
        .replace(/[^0-9+\-*/().,%\s]/g, '')
        .trim();
  
      try {
        // Use Function constructor for safe evaluation
        // In production, use a proper expression evaluator library
        return new Function(`return ${sanitized}`)();
      } catch {
        // If evaluation fails, try with math.js or similar
        return this.fallbackEval(sanitized);
      }
    }
  
    private static fallbackEval(expression: string): number {
      // Simple arithmetic evaluator for basic operations
      const tokens = expression.match(/(\d+(?:\.\d+)?|[+\-*/()])/g) || [];
      
      // Implement Shunting Yard algorithm for proper evaluation
      // This is simplified - use a library like math.js in production
      try {
        return eval(expression); // Only for trusted input in controlled environment
      } catch {
        throw new Error('Unable to evaluate expression');
      }
    }
  
    static isFormula(value: string): boolean {
      return typeof value === 'string' && value.startsWith('=');
    }
  
    static getFormulaDependencies(formula: string): string[] {
      return this.extractCellReferences(formula);
    }
  }