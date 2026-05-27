const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, default: '' },
  subject:   { type: String, default: '' },
  message:   { type: String, required: true },
  replied:   { type: Boolean, default: false },
  replyText: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
