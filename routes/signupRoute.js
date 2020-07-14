/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */

const signup = require('express').Router();
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const user = require('../models/User');
const sendEmails = require('../actions/sendMails');
const { hashPassword } = require('../actions/hash');

const JWT_SECRET = 'JackSparrow-shall-not-die';

signup.get('/', (req, res) => {
  res.render('signup');
});

signup.post('/', async (req, res) => {
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
    res.redirect('/signup');
    return;
  }

  if (req.body.email.length > 150 || req.body.password.length > 150 || req.body.username.length > 150) {
    res.redirect('/signup');
    return;
  }

  const users = await user.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
  if (users) {
    // console.log(users);

    if (users.email === req.body.email) {
      if (!users.verified && ((Date.now() - users.timestamp) >= 10800000)) {
        user.remove({ email: req.body.email });
      } else {
        res.send({ status: 'email_exist' });
        return;
      }
    }
  }
  if (users) {
    if (users.username === req.body.username) {
      res.send({ status: 'username_exist' });
      return;
    }
  }

  const newUser = new user({
    email: req.body.email,
    username: req.body.username,
    password: await hashPassword(req.body.password),
    timestamp: Date.now(),
    verified: false,
  });
  let player;
  try {
    player = await newUser.save();
  } catch (e) {
    console.log(`Error occured: ${e}`);
  }
  const verificationToken = jwt.sign({ _id: player._id }, process.env.JWT_SECRET || JWT_SECRET);
  const link = process.env.VERIFICATION_LINK + verificationToken || `http://localhost:3000/verify?token=${player.verificationToken}`;

  if (process.env.MODE === 'PRODUCTION') {
    sendEmails(req.body.email, link, 'verify', (err) => {
      if (err) {
        console.error(`Error: ${err}`);
      } else {
        console.log(`Verification mail sent to ${req.body.email}`);
      }
    });
  }
  res.send({ status: 'success' });
});

module.exports = signup;
