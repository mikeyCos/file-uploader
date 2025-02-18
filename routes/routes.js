const indexRouter = require("./indexRouter");
const dashboardRouter = require("./dashboardRouter");
const placeholderRouter = require("./placeholderRouter");
const accountRouter = require("./accountRouter");
const supportRouter = require("./supportRouter");
const driveRouter = require("./driveRouter");
const componentsRouter = require("./componentsRouter");

/* const path = require("path");
const rootPath = path.join(__dirname, "..");
const viewsPartialsPath = path.join(rootPath, "views/partials"); */

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
  app.use("/components", componentsRouter);

  // Protected routes
  app.use("/account", accountRouter); // Rename to auth or an array of mounts ["/login", "/signup"]
  app.use("/dashboard", [checkAuth, dashboardRouter]);
  app.use("/drive", [checkAuth], driveRouter);

  app.use((req, res, next) => {
    next({ status: 404, error: "Page not found" });
  });
};

module.exports = routes;
