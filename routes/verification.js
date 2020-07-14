/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const verify = require('express').Router();
const jwt = require('jsonwebtoken');
const user = require('../models/User');

verify.get('/', (req, res) => {
  jwt.verify(req.query.token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err);
      return;
    }
    const player = await user.findOne({ _id: decoded._id });
    player.verified = true;
    try {
      player.save();
    } catch (e) {
      console.log(`Error occured: ${e}`);
    }
  });
  res.redirect('/login?verified=true');
});

module.exports = verify;
