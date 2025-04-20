const crypto = require("crypto");

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const isTokenExpired = (createdAt, expiryMinutes = 10) => {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const diffMinutes = (now - createdTime) / (1000 * 60);
  return diffMinutes > expiryMinutes;
};

module.exports = {
  generateToken,
  isTokenExpired,
};