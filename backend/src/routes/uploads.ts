import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth';
import { ensureCloudinaryConfigured, configureCloudinary, cloudinary } from '../config/cloudinary';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

router.use(requireAuth);

router.post('/image', upload.single('file'), async (req, res) => {
  try {
    ensureCloudinaryConfigured();
    configureCloudinary();
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Wrap upload_stream in a Promise
    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'portfolio' }, (err, data) => {
        if (err || !data) return reject(err || new Error('No data'));
        resolve({ secure_url: data.secure_url, public_id: data.public_id });
      });
      stream.end(req.file!.buffer);
    });

    return res.json({ url: uploadResult.secure_url, publicId: uploadResult.public_id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;

