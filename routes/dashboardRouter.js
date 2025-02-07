const { Router } = require("express");
const { getDashboard } = require("../controllers/dashboardController");

const dashboardRouter = new Router();

// GET requests
dashboardRouter.get("/", getDashboard);

// POST requests

module.exports = dashboardRouter;
