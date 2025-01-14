// backend/models/DailyUpdate.js

const mongoose = require('mongoose');

const DailyUpdateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  tasks: [
    {
      title: { type: String, required: true },
      status: { type: String, default: 'In Progress' },
      comments: { type: String, default: '' },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('DailyUpdate', DailyUpdateSchema);
