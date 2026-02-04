import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import { requireAuth, signToken } from '../auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  try {
    
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    console.error(passwordHash);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, role || 'accountant']
    );

    const user = { id: result.insertId, name, email, role: role || 'accountant', createdAt: new Date().toISOString() };
    const token = signToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, name, email, role, password_hash, created_at FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
 
    console.error(rows.email);
    const userRow = rows;
    console.error(userRow.email);
    const match = await bcrypt.compare(password, userRow.password_hash);
     
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = { id: userRow.id, name: userRow.name, email: userRow.email, role: userRow.role, createdAt: userRow.created_at };
    const token = signToken(user);
    return res.json({ user, token });
  } catch (err) {
    console.error(err);
 
    return res.status(500).json({ message: err });
 
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const row = rows[0];
    return res.json({ user: {
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
      createdAt: row.created_at,
    } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
