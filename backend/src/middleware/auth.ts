import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export interface AuthPayload { id: string; email: string; role: 'admin'; }

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    (req as any).user = payload;
    if (payload.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

