const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  Password: {type: String,required: true, },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('userinfo', userSchema);
