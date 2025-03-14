const { Router } = require("express");
const { getSupport } = require("../controllers/supportController");

const supportRoutes = (isAuth) => {
  const supportRouter = new Router();

  // GET requests
  supportRouter.get("/", getSupport);

  return supportRouter;
};

module.exports = supportRoutes;
