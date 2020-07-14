/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable key-spacing */
/* eslint-disable no-lonely-if */

const login = require('express').Router();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const { stringify } = require('querystring');
const user = require('../models/User');

login.get('/', (req, res) => {
  if (req.session.email) {
    res.redirect('/submissions');
    return;
  }
  res.render('login');
});

login.post('/', async (req, res) => {
  if (!req.body.captcha) {
    res.send({ success: false, status: 'captcha-not-done' });
    return;
  }

  const query = stringify({
    secret: process.env.SECRET_KEY,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress,
  });

  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
  const body = await fetch(verifyURL).then((response) => response.json());

  if (body.success !== undefined && !body.success) {
    res.send({ success: false, status: 'Failed-captcha-verification' });
    return;
  }

  if (!(typeof req.body.email === 'string' && typeof req.body.password === 'string')) {
    res.redirect('/login');
    return;
  }

  if (req.body.email.length > 150 || req.body.password.length > 150) {
    res.send({ status: 'invalid-creds' });
    return;
  }

  const player = await user.findOne({ $or: [{ email: req.body.email }, { username: req.body.email }] });

  if (player) {
    if (!player.verified) {
      res.send({ status: 'not-verified' });
      return;
    }
    const check = await bcrypt.compare(req.body.password, player.password);
    if (check) {
      req.session.email = player.email;
      res.send({ status: 'logged-in' });
      return;
    }
  }
  res.send({ status: 'invalid-creds' });
});

module.exports = login;
