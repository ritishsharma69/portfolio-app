import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { connectDB } from './config/db';

const app = express();

// Middleware
app.use(helmet());
// CORS allowlist: comma-separated origins in CORS_ALLOWLIST, default * in development
const allowlist = (process.env.CORS_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (_origin, cb) => {
    if (!allowlist.length || !(_origin)) return cb(null, true);
    const ok = allowlist.includes(_origin);
    cb(ok ? null : new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
// Support JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Routes
import experienceRouter from './routes/experience';
import projectsRouter from './routes/projects';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import uploadsRouter from './routes/uploads';
import messagesRouter from './routes/messages';
import settingsRouter from './routes/settings';

// Debug endpoint to inspect DB status (non-production only)
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/debug/db', (_req, res) => {
    const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
    const name = mongoose.connection.name;
    const host = (mongoose.connection as any).host;
    res.json({ state, name, host, uriSet: !!process.env.MONGODB_URI });
  });
}

// Health
app.get('/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString(), env: process.env.NODE_ENV || 'development' });
});

app.use('/api/experience', experienceRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/settings', settingsRouter);

app.use('/api/uploads', uploadsRouter);

// Fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Centralized error handler (JSON only)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);
  // Invalid JSON body
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  // Zod validation
  if (err?.name === 'ZodError') {
    return res.status(400).json({ error: 'Validation error', details: err.errors || err });
  }
  // Mongo duplicate key (e.g., unique slug)
  if ((err?.name === 'MongoServerError' || err?.code === 11000) && (err?.code === 11000 || err?.code === 11001)) {
    const keyValue = err.keyValue || {};
    const fields = Object.keys(keyValue);
    return res.status(409).json({ error: 'Duplicate value', fields, keyValue });
  }
  // Mongoose validation
  if (err?.name === 'ValidationError') {
    const details = Object.fromEntries(Object.entries(err.errors || {}).map(([k, v]: any) => [k, v.message]));
    return res.status(400).json({ error: 'Validation error', details });
  }
  return res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
connectDB().finally(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[api] listening on http://localhost:${PORT}`);
  });
});

