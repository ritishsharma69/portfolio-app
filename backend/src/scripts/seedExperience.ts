import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Experience from '../models/Experience';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[seed] MONGODB_URI not set in environment');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('[seed] connected');

  const docs = [
    {
      company: 'Ritish Studio',
      role: 'Frontend Engineer',
      location: 'India (Remote)',
      periodStart: new Date('2023-08-01'),
      current: true,
      summary: 'Building performant UIs with React, TypeScript, and MUI.',
      achievements: [
        'Delivered multiple responsive, accessible interfaces',
        'Introduced code-splitting and reduced bundle size',
      ],
      stack: ['React', 'TypeScript', 'MUI', 'Vite', 'GSAP'],
      sortOrder: 1,
    },
    {
      company: 'Company B',
      role: 'Full‑Stack Developer',
      location: 'Chandigarh, IN',
      periodStart: new Date('2021-07-01'),
      periodEnd: new Date('2023-07-31'),
      current: false,
      summary: 'Built full‑stack features and owned CI/CD pipelines.',
      achievements: [
        'Designed REST/GraphQL APIs',
        'Cut build times by 40% with caching and parallel jobs',
      ],
      stack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'],
      sortOrder: 2,
    },
  ];

  await Experience.deleteMany({});
  const inserted = await Experience.insertMany(docs);
  console.log(`[seed] inserted ${inserted.length} experience records`);
  await mongoose.disconnect();
  console.log('[seed] done');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

