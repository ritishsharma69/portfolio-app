import { Router } from 'express';
import mongoose from 'mongoose';
import Settings from '../models/Settings';
import { requireAuth } from '../middleware/auth';
import { validate, schemas } from '../middleware/validate';

const router = Router();

// Get public settings; if DB not connected or no doc, return sensible defaults
router.get('/', async (_req, res) => {
  try {
    const fallback = {
      email: 'ritishfj@gmail.com',
      phone: '+91 76819 09401',
      location: 'India',
      availabilityText: 'Open to full‑time roles and select freelance projects.',
      socials: { linkedin: '', github: '', instagram: '', x: '', behance: '' },
    };

    if (mongoose.connection.readyState !== 1) {
      return res.json(fallback);
    }
    let doc = await Settings.findOne({}).lean();
    if (!doc) {
      // Create a default doc for convenience
      doc = (await Settings.create(fallback)).toObject();
    }
    return res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to load settings' });
  }
});

// Update settings (admin only)
router.patch('/', requireAuth, validate(schemas.settingsPatch), async (req, res) => {
  try {
    const body = req.body || {};
    const updated = await Settings.findOneAndUpdate({}, body, { upsert: true, new: true });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;

