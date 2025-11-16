import { v2 as cloudinary, type ConfigOptions } from 'cloudinary';

export function ensureCloudinaryConfigured() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary env not configured');
  }
}

export function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;
  const cfg: ConfigOptions = {
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  } as ConfigOptions;
  cloudinary.config(cfg);
}

export { cloudinary };

