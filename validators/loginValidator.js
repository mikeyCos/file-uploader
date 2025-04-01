const { checkSchema } = require("express-validator");

const loginSchema = {
  username: {
    trim: true,
    isEmpty: {
      negated: true,
    },
    errorMessage: "Username cannot be empty.",
    escape: true,
  },
  password: {
    trim: true,
    isEmpty: {
      negated: true,
    },
    errorMessage: "Password cannot be empty.",
    escape: true,
  },
  name: {
    trim: true,
    isEmpty: {
      bail: true,
      errorMessage: "Please leave blank",
    },
    escape: true,
  },
};

const validateLogin = checkSchema(loginSchema, ["body"]);

module.exports = validateLogin;
