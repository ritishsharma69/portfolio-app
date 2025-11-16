import { Router } from 'express';
import mongoose from 'mongoose';
import Experience from '../models/Experience';

const router = Router();

const sample = [
  {
    company: 'Company A',
    role: 'Senior Frontend Engineer',
    period: 'Aug 2023 — Present',
    location: 'Remote',
    summary: 'Lead UI engineer building performant, accessible web apps with modern stacks.',
    achievements: [
      'Shipped design‑system components used across 4 products',
      'Improved Lighthouse performance scores from 72 → 94',
      'Partnered with backend to reduce payload size by 35%'
    ],
    stack: ['React', 'TypeScript', 'MUI', 'Vite', 'GSAP']
  },
  {
    company: 'Company B',
    role: 'Full‑Stack Developer',
    period: 'Jul 2021 — Jul 2023',
    location: 'Chandigarh, IN',
    summary: 'Built full‑stack features end‑to‑end and owned CI/CD.',
    achievements: [
      'Designed REST/GraphQL APIs consumed by SPA/Mobile',
      'Cut build times by 40% with CI caching and parallel jobs',
      'Introduced code‑split and lazy‑loading to reduce TTI'
    ],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS']
  }
];

router.get('/', async (_req, res) => {
  try {
    // If DB not connected, return sample for now
    if (mongoose.connection.readyState !== 1) {
      return res.json({ items: sample });
    }
    const docs = await Experience.find({}).sort({ current: -1, sortOrder: 1, periodStart: -1 }).lean();
    return res.json({ items: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load experience' });
  }
});

export default router;

