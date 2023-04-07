const jwt = require("jsonwebtoken");
const generateToken = (id, time = "3h") => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: time });
};

module.exports = { generateToken };
