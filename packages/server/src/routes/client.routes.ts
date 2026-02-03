import { Router } from 'express';
import { body, param } from 'express-validator';
import { 
  getClients, 
  getClientById, 
  createClient, 
  updateClient, 
  deleteClient 
} from '../controllers/client.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients for current user
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 */
router.get('/', getClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Clients]
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
 *         description: Client data
 *       404:
 *         description: Client not found
 */
router.get('/:id', 
  [param('id').isString().notEmpty()],
  validate,
  getClientById
);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nipt
 *             properties:
 *               name:
 *                 type: string
 *               nipt:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, PENDING]
 *     responses:
 *       201:
 *         description: Client created
 *       400:
 *         description: Validation error
 */
router.post('/',
  [
    body('name').trim().notEmpty(),
    body('nipt').trim().notEmpty(),
    body('email').optional().isEmail(),
    body('phone').optional().isString(),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'PENDING'])
  ],
  validate,
  createClient
);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated
 *       404:
 *         description: Client not found
 */
router.put('/:id',
  [
    param('id').isString().notEmpty(),
    body('name').optional().trim().notEmpty(),
    body('email').optional().isEmail(),
    body('phone').optional().isString(),
    body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'PENDING'])
  ],
  validate,
  updateClient
);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete client
 *     tags: [Clients]
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
 *         description: Client deleted
 *       404:
 *         description: Client not found
 */
router.delete('/:id',
  [param('id').isString().notEmpty()],
  validate,
  deleteClient
);

export default router;