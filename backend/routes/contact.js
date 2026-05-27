const express = require('express');
const Contact = require('../models/Contact');
const adminAuth = require('../middleware/admin');
const router = express.Router();

router.get('/', adminAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort('-createdAt');
    res.json({ messages, total: messages.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/reply', adminAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { replied: true, replyText: req.body.message, repliedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
