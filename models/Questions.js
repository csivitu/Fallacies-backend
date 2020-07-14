/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const questions = mongoose.model('questions', mongoose.Schema({
  Id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  Answer: {
    type: Array,
    required: true,
  },
  NextAccount: {
    type: String,
    required: true,
  },
}));

module.exports = questions;
