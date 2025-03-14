const { Router } = require("express");
const { getPlaceholder } = require("../controllers/placeholderController");

const placeholderRoutes = (isAuth) => {
  const placeholderRouter = new Router();

  // GET requests
  placeholderRouter.get("/", getPlaceholder);

  return placeholderRouter;
};

module.exports = placeholderRoutes;
