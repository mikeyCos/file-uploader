const { matchedData, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const validateCreateAccount = require("../validators/createAccountValidator");
const validateLogin = require("../validators/loginValidator");
const prisma = require("../db/prisma");

const accountController = {
  getLogin: asyncHandler(async (req, res) => {
    console.log("getLogin running...");
    res.render("login");
  }),
  getLogout: asyncHandler(async (req, res) => {
    req.logout();
    res.redirect("/");
  }),
  getCreateAccount: asyncHandler(async (req, res) => {
    console.log("getCreateAccount running...");
    console.log("req.user:", req.user);
    res.render("createAccount");
  }),
  postLogin: [
    validateLogin,
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const inputs = matchedData(req, { onlyValidData: false });
      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.render("login", {
          errors: errors.mapped(),
          inputs,
        });
      }

      next();
    }),
    (req, res, next) => {
      console.log("postLogin running...");
      console.log("req.body:", req.body);
      passport.authenticate("local", (err, account, info) => {
        console.log("authenticating...");
        console.log("err:", err);
        console.log("account:", account);
        console.log("info:", info);
        if (err) return next(err);
        if (!account) {
          res.locals.message = info.message;
          // Redirect home(?)
          // Can I save the message to the session?
          return res.status(422).render("login");
        }

        console.log("req.login called...");
        return req.login(account, next);
      })(req, res, next);
    },
    (req, res) => {
      console.log("postLogin running after authentication....");
      res.redirect("/drive");
    },
  ],
  postLogout: (req, res, next) => {
    console.log("postLogout running...");
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  },
  postCreateAccount: [
    validateCreateAccount,
    asyncHandler(async (req, res, next) => {
      console.log("postCreateAccount running after validateCreateAccount...");
      const errors = validationResult(req);
      const inputs = matchedData(req, { onlyValidData: false });

      if (!errors.isEmpty()) {
        console.log(errors.mapped());
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
          console.log("account:", account);

          // Automatically login after creating account
          req.login(account, (err) => {
            console.log("login running after creating account...");
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
