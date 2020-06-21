/* eslint-disable linebreak-style */
const timer = require('express').Router();

timer.get('/', (req, res) => {
  if (!req.session.email) {
    res.redirect('/login');
    return;
  }

  res.render('timer');
});

module.exports = timer;
