require('dotenv/config');

module.exports = {
  expiresIn: '7d',
  secret: process.env.TOKEN_SECRET,
};
