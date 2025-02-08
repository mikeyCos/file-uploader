const { Router } = require("express");
const { getIndex } = require("../controllers/indexController");

const indexRouter = new Router();

// GET requests
indexRouter.get("/", getIndex);

module.exports = indexRouter;
