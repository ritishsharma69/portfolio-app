import { Router } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project';

const router = Router();

const sample = [
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    shortDesc: 'Full-featured online store with modern UI/UX',
    features: ['Product catalog & search','Shopping cart & checkout','Payment integration'],
    tech: ['React','Node.js','MongoDB','Stripe','AWS'],
    tags: ['Web','E‑commerce'],
    links: { demo: '#', code: '#' },
    featured: true,
    sortOrder: 1,
  },
  {
    title: 'Chat App',
    slug: 'chat-app',
    shortDesc: 'Real-time messaging platform',
    features: ['Realtime','Groups','Typing indicators'],
    tech: ['React','Socket.io'],
    tags: ['Realtime'],
    links: { demo: '#', code: '#' },
    sortOrder: 2,
  }
];

router.get('/', async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ items: sample });
    }
    const docs = await Project.find({}).sort({ featured: -1, sortOrder: 1, title: 1 }).lean();
    res.json({ items: docs });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (mongoose.connection.readyState !== 1) {
      const p = sample.find((s) => s.slug === slug);
      return p ? res.json(p) : res.status(404).json({ error: 'Not found' });
    }
    const doc = await Project.findOne({ slug }).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load project' });
  }
});

export default router;

