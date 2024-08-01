const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username field, required and unique
  password: { type: String, required: true } // Password field, required
});

module.exports = mongoose.model('users', UserSchema);
