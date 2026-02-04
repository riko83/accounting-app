// server/src/controllers/spreadsheetController.js
import { db } from '../db.js';
import { v4 as uuidv4 } from 'uuid';
import xlsx from 'xlsx';

export const createSpreadsheet = async (req, res) => {
  try {
    const { name, templateType } = req.body;
    const userId = req.user.id;

    const spreadsheet = {
      id: uuidv4(),
      name: name || 'New Spreadsheet',
      ownerId: userId,
      sheets: [{
        id: uuidv4(),
        name: 'Sheet1',
        data: Array(100).fill().map(() => Array(26).fill('')),
        formulas: [],
        formatting: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      sharedWith: [],
      isTemplate: false,
      templateType,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('spreadsheets').insertOne(spreadsheet);
    res.status(201).json(spreadsheet);
  } catch (error) {
    console.error('Create spreadsheet error:', error);
    res.status(500).json({ error: 'Failed to create spreadsheet' });
  }
};

export const getSpreadsheet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const spreadsheet = await db.collection('spreadsheets').findOne({
      id,
      $or: [
        { ownerId: userId },
        { sharedWith: userId }
      ]
    });

    if (!spreadsheet) {
      return res.status(404).json({ error: 'Spreadsheet not found' });
    }

    res.json(spreadsheet);
  } catch (error) {
    console.error('Get spreadsheet error:', error);
    res.status(500).json({ error: 'Failed to fetch spreadsheet' });
  }
};

export const updateCell = async (req, res) => {
  try {
    const { id, sheetId } = req.params;
    const { cellAddress, value } = req.body;
    const userId = req.user.id;

    // Parse cell address
    const match = cellAddress.match(/^([A-Z]+)(\d+)$/);
    if (!match) {
      return res.status(400).json({ error: 'Invalid cell address' });
    }

    const [, colLetters, rowStr] = match;
    const row = parseInt(rowStr) - 1;
    const col = columnLettersToIndex(colLetters);

    // Get spreadsheet
    const spreadsheet = await db.collection('spreadsheets').findOne({ 
      id,
      $or: [{ ownerId: userId }, { sharedWith: userId }]
    });

    if (!spreadsheet) {
      return res.status(404).json({ error: 'Spreadsheet not found' });
    }

    const sheet = spreadsheet.sheets.find(s => s.id === sheetId);
    if (!sheet) {
      return res.status(404).json({ error: 'Sheet not found' });
    }

    // Ensure data array dimensions
    if (!sheet.data[row]) {
      sheet.data[row] = [];
    }

    // Update cell value
    sheet.data[row][col] = value;

    // Handle formulas
    if (typeof value === 'string' && value.startsWith('=')) {
      const formulaCell = {
        id: uuidv4(),
        cellAddress,
        formula: value,
        dependencies: extractCellReferences(value),
        calculatedValue: null,
        lastCalculated: new Date()
      };

      // Remove existing formula for this cell
      sheet.formulas = sheet.formulas.filter(f => f.cellAddress !== cellAddress);
      sheet.formulas.push(formulaCell);
    } else {
      // Remove formula if exists
      sheet.formulas = sheet.formulas.filter(f => f.cellAddress !== cellAddress);
    }

    spreadsheet.updatedAt = new Date();

    await db.collection('spreadsheets').updateOne(
      { id },
      { $set: spreadsheet }
    );

    res.json(spreadsheet);
  } catch (error) {
    console.error('Update cell error:', error);
    res.status(500).json({ error: 'Failed to update cell' });
  }
};

// Helper functions
function columnLettersToIndex(letters) {
  let result = 0;
  for (let i = 0; i < letters.length; i++) {
    result = result * 26 + (letters.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }
  return result - 1;
}

function extractCellReferences(formula) {
  const pattern = /\b[A-Z]{1,3}\d{1,5}\b/g;
  const matches = formula.match(pattern);
  return matches ? Array.from(new Set(matches)) : [];
}