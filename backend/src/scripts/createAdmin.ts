import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  await mongoose.connect(uri);
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const passwordHash = await bcrypt.hash(password, 10);
  const existing = await User.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`[admin] updated password for ${email}`);
  } else {
    await User.create({ email, passwordHash, role: 'admin' });
    console.log(`[admin] created ${email}`);
  }
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

