/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const users = mongoose.model('users', mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    index: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  points: {
    type: Number,
    default: 1,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}));

module.exports = users;
