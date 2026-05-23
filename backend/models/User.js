const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Prénom requis'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Nom requis'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
  },
  password: {
    type: String,
    required: [true, 'Mot de passe requis'],
    minlength: [6, 'Minimum 6 caractères'],
    select: false,
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client',
  },
  favorites: [{
    type: String, // vehicle IDs
  }],
  appointments: [{
    vehicleId: String,
    date: Date,
    type: { type: String, enum: ['essai', 'achat', 'service'] },
    status: { type: String, default: 'pending' },
  }],
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
