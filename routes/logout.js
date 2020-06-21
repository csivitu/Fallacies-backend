/* eslint-disable linebreak-style */
/* eslint-disable new-cap */

const logout = require('express').Router();

logout.post('/', (req, res) => {
  if (!req.session.email) {
    res.send({ status: 'logged-out' });
    return;
  }

  req.session.destroy();
  res.send({ status: 'logged-out' });
});

module.exports = logout;
