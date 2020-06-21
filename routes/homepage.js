/* eslint-disable linebreak-style */
const home = require('express').Router();

home.get('/', (req, res) => {
  if (!req.session.email) {
    res.redirect('/login');
    return;
  }
  res.render('firstpage');
});

module.exports = home;
