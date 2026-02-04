// server/src/routes/spreadsheetRoutes.js
import express from 'express';
import { 
  createSpreadsheet, 
  getSpreadsheet, 
  updateCell,
  addSheet,
  deleteSheet,
  exportToExcel,
  importFromExcel 
} from '../controllers/spreadsheetController.js';
import { authenticate } from '../auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createSpreadsheet);
router.get('/:id', getSpreadsheet);
router.put('/:id/sheets/:sheetId/cell', updateCell);
router.post('/:id/sheets', addSheet);
router.delete('/:id/sheets/:sheetId', deleteSheet);
router.get('/:id/export/excel', exportToExcel);
router.post('/import/excel', importFromExcel);

export default router;