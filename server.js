const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./db/prisma");
const { PORT } = require("./config/environment");
const { staticPaths, viewsPaths } = require("./paths/paths");
const logger = require("./utils/logger");
const indexRouter = require("./routes/indexRouter");
const placeholderRouter = require("./routes/placeholderRouter");
const accountRouter = require("./routes/accountRouter");
const supportRouter = require("./routes/supportRouter");

const app = express();

// Specify static paths
app.use(staticPaths.map((path) => express.static(path)));

// Setting views
app.set("views", viewsPaths);
app.set("view engine", "ejs");

// What to call this block?
// const sessionStore = new pgSession({
//   pool: pool,
//   tableName: "account_sessions",
//   createTableIfMissing: true,
// });

const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, // 2 mins * 60 secs * 1000 ms
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days * 24 hrs * 60 mins * 60 secs * 1000 ms
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
// app.use(logger);

app.use((req, res, next) => {
  console.log("application-level middleware running...");
  console.log("req.session:", req.session);
  console.log("req.user:", req.user);
  console.log("req.originalUrl:", req.originalUrl);
  res.locals.currentUser = req.user;
  next();
});

// Router-level
app.use("/", indexRouter);
app.use("/placeholderA", placeholderRouter);
app.use("/account", accountRouter);
app.use("/support", supportRouter);

app.use((req, res) => {
  res.render("404", { title: "404 - Page Not Found" });
});

// Error middleware function
app.use((err, req, res, next) => {
  console.log("error middleware running...");
  res.render("404", { title: "404 - Page Not Found" });
});

app.listen(PORT, () => console.log(`Application running on port: ${PORT}`));
