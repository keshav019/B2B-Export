const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
// User Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'vendor'],
    default: 'user'
  },
  otp: {
    type: String,
    min: 100000,
    max: 999999
  }
});
userSchema.index({ name: 'text' });

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;
