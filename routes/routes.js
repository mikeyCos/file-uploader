const indexRoutes = require("./indexRoutes");
const faqRoutes = require("./faqRoutes");
const accountRoutes = require("./accountRoutes");
const supportRoutes = require("./supportRoutes");
const driveRoutes = require("./driveRoutes");
const componentsRoutes = require("./componentsRoutes");
const shareRoutes = require("./shareRoutes");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  next({ status: 401 });
};

// Router-level
const routes = (app) => {
  app.use("/", indexRoutes());
  app.use("/faq", faqRoutes());
  app.use("/support", supportRoutes());
  app.use("/components", componentsRoutes(isAuth));

  // Fully-Protected routes
  app.use("/drive", isAuth, driveRoutes()); // isAuth will be on all /drive paths

  // Semi-Protected routes
  app.use("/account", accountRoutes(isAuth)); // isAuth will only be on /logout path; is this needed?
  app.use("/share", shareRoutes(isAuth)); // isAuth will only be on the post path

  app.use((req, res, next) => {
    next({ message: "Page not found", status: 404 });
  });
};

module.exports = routes;
