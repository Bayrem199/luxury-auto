const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// Register
router.post('/register',
  [
    body('firstName').notEmpty().withMessage('Prénom requis'),
    body('lastName').notEmpty().withMessage('Nom requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe: 6 caractères minimum'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { firstName, lastName, email, password } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: 'Email déjà utilisé' });
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user._id);
      res.status(201).json({
        message: 'Compte créé avec succès',
        token,
        user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Login
router.post('/login',
  [body('email').isEmail(), body('password').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ message: 'Identifiants incorrects' });
      const token = signToken(user._id);
      res.json({
        message: 'Connexion réussie',
        token,
        user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Get me
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Introuvable' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
