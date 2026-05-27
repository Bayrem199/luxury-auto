const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  vehicle:       { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  customerName:  { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  type:          { type: String, default: 'essai' },
  date:          { type: Date },
  message:       { type: String, default: '' },
  status:        { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
