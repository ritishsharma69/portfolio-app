import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Message from '../models/Message';
import { sendAdminNotification, sendAutoReply } from '../utils/mailer';
import { validate, schemas } from '../middleware/validate';

const router = Router();

// basic rate limit for form submits
const createLimiter = rateLimit({ windowMs: 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false });

router.post('/', createLimiter, validate(schemas.messageCreate), async (req, res) => {
  try {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' });
    }
    const { name, email, subject, message } = (req.body || {}) as { name?: string; email?: string; subject?: string; message?: string };
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }

    const doc = await Message.create({ name, email, subject: subject || '', message });

    // Fire-and-forget emails (do not block response)
    const to = (process.env.MAIL_TO || '').trim();
    if (to) {
      sendAdminNotification(to, { name, email, subject: subject || '', message }).catch((e) => console.error('[mail] admin', e));
      // Optional auto-reply
      if ((process.env.AUTO_REPLY || 'true') === 'true') {
        sendAutoReply(email, name).catch((e) => console.error('[mail] reply', e));
      }
    }

    return res.status(201).json({ id: doc._id, createdAt: doc.createdAt });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to submit message' });
  }
});

export default router;

