import { Schema, model } from 'mongoose';

const SocialsSchema = new Schema({
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  instagram: { type: String, default: '' },
  x: { type: String, default: '' },
  behance: { type: String, default: '' },
}, { _id: false });

const SettingsSchema = new Schema({
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  availabilityText: { type: String, default: '' },
  socials: { type: SocialsSchema, default: {} },
}, { timestamps: true });

export default model('Settings', SettingsSchema);

