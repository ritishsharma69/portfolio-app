import { Schema, model } from 'mongoose';

const LinkSchema = new Schema({ demo: String, code: String }, { _id: false });

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDesc: { type: String, default: '' },
  features: [{ type: String }],
  tech: [{ type: String }],
  tags: [{ type: String }],
  links: { type: LinkSchema, default: {} },
  coverUrl: { type: String, default: '' },
  gallery: [{ type: String }],
  featured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default model('Project', ProjectSchema);

