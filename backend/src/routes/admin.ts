import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import Experience from '../models/Experience';
import Project from '../models/Project';
import Message from '../models/Message';

const router = Router();

// Protect all routes
router.use(requireAuth);

// Experience CRUD
router.get('/experience', async (_req, res) => {
  const docs = await Experience.find({}).sort({ current: -1, sortOrder: 1, periodStart: -1 });
  res.json({ items: docs });
});
router.post('/experience', async (req, res) => {
  const created = await Experience.create(req.body);
  res.status(201).json(created);
});
router.patch('/experience/:id', async (req, res) => {
  const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/experience/:id', async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Projects CRUD
router.get('/projects', async (_req, res) => {
  const docs = await Project.find({}).sort({ featured: -1, sortOrder: 1, title: 1 });
  res.json({ items: docs });
});
router.post('/projects', async (req, res) => {
  const created = await Project.create(req.body);
  res.status(201).json(created);
});
router.patch('/projects/:id', async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).end();

// Messages admin helpers (basic)
router.get('/messages', async (_req, res) => {
  const docs = await Message.find({}).sort({ createdAt: -1 });
  res.json({ items: docs });
});
router.patch('/messages/:id', async (req, res) => {
  const updated = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
router.delete('/messages/:id', async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

});

export default router;

