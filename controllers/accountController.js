const { matchedData, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {
  validateCreateAccount,
  validateLogin,
} = require("../validators/validators");
const { prisma } = require("../db/prisma");

const accountController = {
  getLogin: asyncHandler(async (req, res) => {
    res.render("login");
  }),
  getLogout: asyncHandler(async (req, res) => {
    req.logout();
    res.redirect("/");
  }),
  getCreateAccount: asyncHandler(async (req, res) => {
    res.render("createAccount");
  }),
  postLogin: [
    validateLogin,
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const inputs = matchedData(req, { onlyValidData: false });
      if (!errors.isEmpty()) {
        return res.render("login", {
          errors: errors.mapped(),
          inputs,
        });
      }

      next();
    }),
    (req, res, next) => {
      passport.authenticate("local", (err, account, info) => {
        if (err) return next(err);
        if (!account) {
          res.locals.message = info.message;
          // Redirect home(?)
          // Can I save the message to the session?
          return res.status(422).render("login");
        }

        return req.login(account, next);
      })(req, res, next);
    },
    (req, res) => {
      res.redirect("/drive");
    },
  ],
  postLogout: (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  },
  postCreateAccount: [
    validateCreateAccount,
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const inputs = matchedData(req, { onlyValidData: false });

      if (!errors.isEmpty()) {
        return res.render("createAccount", {
          errors: errors.mapped(),
          inputs,
        });
      }

      next();
    }),
    asyncHandler(async (req, res, next) => {
      try {
        // Valid and sanitized data
        const { fullname, email, username, password } = matchedData(req);
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          if (err) return next(err);

          const account = await prisma.account.create({
            data: { name: fullname, email, username, password: hashedPassword },
            omit: {
              password: true,
            },
          });

          // Automatically login after creating account
          req.login(account, (err) => {
            res.redirect("/drive");
          });
        });
      } catch (err) {
        return next(err);
      }
    }),
  ],
};

module.exports = accountController;
