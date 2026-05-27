const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  brand:         { type: String, required: true },
  model:         { type: String, required: true },
  year:          { type: Number },
  price:         { type: Number },
  mileage:       { type: Number, default: 0 },
  fuelType:      { type: String, default: 'Gasoline' },
  horsepower:    { type: Number },
  transmission:  { type: String, default: 'Automatic' },
  category:      { type: String, default: 'Sedan' },
  description:   { type: String, default: '' },
  exteriorColor: { type: String, default: '' },
  interiorColor: { type: String, default: '' },
  images:        [{ type: String }],
  heroImage:     { type: String, default: '' },
  status:        { type: String, default: 'available' },
  featured:      { type: Boolean, default: false },
  views:         { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
