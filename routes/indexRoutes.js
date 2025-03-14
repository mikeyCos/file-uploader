const { Router } = require("express");
const { getIndex } = require("../controllers/indexController");

const indexRoutes = (isAuth) => {
  const indexRouter = new Router();

  // GET requests
  indexRouter.get("/", getIndex);

  return indexRouter;
};

module.exports = indexRoutes;
