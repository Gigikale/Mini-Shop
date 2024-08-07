const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const generateToken = (data) => {
    return jwt.sign(data, `mini-shop`, { expiresIn: "7d" });
  };

module.exports = {hashPassword, generateToken}