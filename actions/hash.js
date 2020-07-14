/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');

async function hashPassword(pass) {
  const password = pass;

  // const salt = process.env.HASH_SALT || 8;
  const hash = await bcrypt.hash(password, 8);
  return hash;
}

module.exports.hashPassword = hashPassword;
