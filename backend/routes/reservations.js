const express = require('express');
const Reservation = require('../models/Reservation');
const adminAuth = require('../middleware/admin');
const router = express.Router();

router.get('/', adminAuth, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const reservations = await Reservation.find(filter)
      .populate('user', 'firstName lastName email')
      .populate('vehicle', 'brand model year')
      .sort('-createdAt');
    res.json({ reservations, total: reservations.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const r = await Reservation.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(r);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
