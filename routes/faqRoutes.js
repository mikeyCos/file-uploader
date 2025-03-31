const { Router } = require("express");
const { getFaq } = require("../controllers/faqController");

const faqRoutes = (isAuth) => {
  const faqRouter = new Router();

  // GET requests
  faqRouter.get("/", getFaq);

  return faqRouter;
};

module.exports = faqRoutes;
