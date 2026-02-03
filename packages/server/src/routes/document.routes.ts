import { Router } from 'express';
import { body, param } from 'express-validator';
import { 
  getDocuments, 
  uploadDocument, 
  deleteDocument 
} from '../controllers/document.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get all documents for current user
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents
 */
router.get('/', getDocuments);

/**
 * @swagger
 * /api/documents/upload:
 *   post:
 *     summary: Upload new document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - clientId
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               clientId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [INVOICE, RECEIPT, CONTRACT, BALANCE_SHEET, VAT_DECLARATION, PAYROLL, OTHER]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Document uploaded
 *       400:
 *         description: Validation error
 */
router.post('/upload', 
  [
    body('clientId').isString().notEmpty(),
    body('type').optional().isIn(['INVOICE', 'RECEIPT', 'CONTRACT', 'BALANCE_SHEET', 'VAT_DECLARATION', 'PAYROLL', 'OTHER']),
    body('description').optional().isString()
  ],
  validate,
  uploadDocument
);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Delete document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted
 *       404:
 *         description: Document not found
 */
router.delete('/:id',
  [param('id').isString().notEmpty()],
  validate,
  deleteDocument
);

export default router;