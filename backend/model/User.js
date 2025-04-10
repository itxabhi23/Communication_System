const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, index: true, required: true },
  name: String,
  email: { type: String, required: true },
  emailverified: { type: Boolean, default: false },
  exp: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
