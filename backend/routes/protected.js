const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/dashboard', (req, res) => {
  res.json({
    message: `Bienvenue dans votre espace privé`,
    user: req.user,
    favorites: [],
    appointments: [],
    testDrives: []
  });
});

router.post('/favorite', (req, res) => {
  res.json({ message: 'Véhicule ajouté aux favoris', vehicleId: req.body.vehicleId });
});

router.post('/contact-request', (req, res) => {
  res.json({ message: 'Demande envoyée avec succès', data: req.body });
});

module.exports = router;
