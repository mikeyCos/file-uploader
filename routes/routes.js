const indexRouter = require("./indexRouter");
const dashboardRouter = require("./dashboardRouter");
const placeholderRouter = require("./placeholderRouter");
const accountRouter = require("./accountRouter");
const supportRouter = require("./supportRouter");
const fileRouter = require("./fileRouter");

const checkAuth = (req, res, next) => {
  console.log("req.path:", req.path);
  if (req.isAuthenticated()) {
    return next();
  }
  next({ status: 401 });
};

// Router-level
const routes = (app) => {
  app.use("/", indexRouter);
  app.use("/placeholderA", placeholderRouter);
  app.use("/support", supportRouter);

  // Protected routes
  app.use("/account", accountRouter); // Rename to auth or an array of mounts ["/login", "/signup"]
  app.use("/dashboard", [checkAuth, dashboardRouter]);
  app.use("/file", [checkAuth], fileRouter);

  app.use((req, res, next) => {
    next({ status: 404, error: "Page not found" });
  });
};

module.exports = routes;
