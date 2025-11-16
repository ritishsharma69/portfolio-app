import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  handled: { type: Boolean, default: false },
}, { timestamps: true });

export default model('Message', MessageSchema);

