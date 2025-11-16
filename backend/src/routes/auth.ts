import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import User from '../models/User';
import { validate, schemas } from '../middleware/validate';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

router.post('/login', loginLimiter, validate(schemas.login), async (req, res) => {
  try {
    // Ensure JSON body and required fields to avoid destructuring undefined
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' });
    }

    const { email, password } = (req.body || {}) as { email?: string; password?: string };
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;

