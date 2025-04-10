const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: String,
  subject: String,
  body: String,
  date: { type: Date, default: Date.now }
}, {timestamps:true});

module.exports = mongoose.model('Email', emailSchema);
