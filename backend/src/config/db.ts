import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || '';
  if (!uri) {
    console.warn('[db] MONGODB_URI is not set; skipping DB connection (B1/B2 local without DB)');
    return;
  }
  await mongoose.connect(uri);
  console.log('[db] connected');
}

