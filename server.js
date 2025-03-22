const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./db/prisma");
const { PORT } = require("./config/environment");
const { staticPaths, viewsPaths } = require("./paths/paths");
const { logger } = require("./utils/utils");
const app = express();

// Specify static paths
app.use(staticPaths.map((path) => express.static(path)));

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
  console.log("application-level middleware running...");
  console.log("req.session:", req.session);
  console.log("req.user:", req.user);
  res.locals.currentUser = req.user;
  next();
});

// Routes
require("./routes/routes")(app);

// Error middleware function
app.use((err, req, res, next) => {
  console.log("error middleware running...");
  console.log("req.headers['content-type']:", req.headers["content-type"]);
  const { error, status } = err;
  // res.render("404", { title: "404 - Page Not Found" });
  res.status(status).render("errors", { error, status });
});

app.listen(PORT, () => console.log(`Application running on port: ${PORT}`));
