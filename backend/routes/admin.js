const express = require('express');
const User = require('../models/User');
const adminAuth = require('../middleware/admin');
const router = express.Router();

router.get('/users', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 15, search } = req.query;
    const filter = {};
    if (search) filter.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find(filter).select('-password').sort('-createdAt').skip(skip).limit(Number(limit)),
      User.countDocuments(filter),
    ]);
    res.json({ users, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/users/:id/role', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
