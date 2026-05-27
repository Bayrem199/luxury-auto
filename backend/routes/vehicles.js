const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Vehicle = require('../models/Vehicle');
const adminAuth = require('../middleware/admin');
const router = express.Router();

const uploadsDir = path.join(__dirname, '../uploads/vehicles');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `vehicle-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET all vehicles (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, status, featured, sort = '-createdAt' } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured === 'true') filter.featured = true;
    const skip = (Number(page) - 1) * Number(limit);
    const [vehicles, total] = await Promise.all([
      Vehicle.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Vehicle.countDocuments(filter),
    ]);
    res.json({ vehicles, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single vehicle
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Introuvable' });
    vehicle.views = (vehicle.views || 0) + 1;
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create (admin)
router.post('/', adminAuth, upload.array('images', 20), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files && req.files.length > 0) {
      const BASE = process.env.BASE_URL || 'https://luxury-auto-backend.onrender.com';
      data.images = req.files.map(f => `${BASE}/uploads/vehicles/${f.filename}`);
      data.heroImage = data.images[0];
    }
    if (data.featured !== undefined) data.featured = data.featured === 'true';
    const vehicle = await Vehicle.create(data);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update (admin)
router.put('/:id', adminAuth, upload.array('images', 20), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files && req.files.length > 0) {
      const BASE = process.env.BASE_URL || 'https://luxury-auto-backend.onrender.com';
      data.images = req.files.map(f => `${BASE}/uploads/vehicles/${f.filename}`);
      data.heroImage = data.images[0];
    }
    if (data.featured !== undefined) data.featured = data.featured === 'true';
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Introuvable' });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH toggle featured (admin)
router.patch('/:id/featured', adminAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Introuvable' });
    vehicle.featured = !vehicle.featured;
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE (admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Introuvable' });
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
