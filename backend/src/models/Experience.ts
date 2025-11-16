import { Schema, model } from 'mongoose';

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, default: '' },
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date },
  current: { type: Boolean, default: false },
  summary: { type: String, default: '' },
  achievements: [{ type: String }],
  stack: [{ type: String }],
  logoUrl: { type: String, default: '' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export type ExperienceDoc = typeof ExperienceSchema extends infer T ? any : any;
export default model('Experience', ExperienceSchema);

