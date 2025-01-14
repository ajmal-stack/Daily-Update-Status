// backend/routes/dailyUpdateRoutes.js
const express = require('express');
const router = express.Router();
const DailyUpdate = require('../models/DailyUpdate');

// CREATE - POST a new daily update
router.post('/', async (req, res) => {
  console.log('Received body:', req.body);
  try {
    const newUpdate = new DailyUpdate(req.body);
    const savedUpdate = await newUpdate.save();
    res.status(201).json(savedUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - GET all daily updates (optional: you could filter by date or user)
router.get('/', async (req, res) => {
  try {
    const updates = await DailyUpdate.find();
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - GET daily updates by a specific date (example route)
router.get('/:date', async (req, res) => {
  try {
    const dateParam = req.params.date;
    // e.g. dateParam might be "2025-01-14"
    const updates = await DailyUpdate.find({
      date: new Date(dateParam),
    });
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
