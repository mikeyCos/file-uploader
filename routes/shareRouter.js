const { Router } = require("express");
const {
  getSharedRoute,
  createSharedRoute,
} = require("../controllers/shareController");

const shareRouter = new Router();

// GET requests
shareRouter.get("/:id", getSharedRoute);

// POST requests
// This a protected route
shareRouter.post("/:id", createSharedRoute);

module.exports = shareRouter;
