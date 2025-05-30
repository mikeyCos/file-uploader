const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const asyncHandler = require("express-async-handler");
const { prisma } = require("./db/prisma");
const { PORT } = require("./config/environment");
const { staticPath, viewsPaths } = require("./paths/paths");
const { logger } = require("./utils/utils");
const app = express();

// Specify static path
app.use(express.static(staticPath));

// Setting views
app.set("views", viewsPaths);
app.set("view engine", "ejs");

const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, // 2 mins * 60 secs * 1000 ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days * 24 hrs * 60 mins * 60 secs * 1000 ms
      // maxAge: 60 * 1000, // 60 secs * 1000 ms = 1 minute
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
  })
);

require("./config/passport");
app.use(passport.session());

// Parses form data
app.use(express.urlencoded({ extended: true }));

// Application-level
app.use(logger("Application-level"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
require("./routes/routes")(app);

// Error middleware function
app.use((err, req, res, next) => {
  const { status, message } = err;

  res.status(status).render("errors", { message, status });
});

app.listen(PORT, () => console.log(`Application running on port: ${PORT}`));
