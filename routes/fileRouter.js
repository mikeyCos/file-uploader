const { Router } = require("express");
const { postFile } = require("../controllers/fileController");

const fileRouter = new Router();

// GET requests

// POST requests
fileRouter.post("/upload", postFile);

module.exports = fileRouter;
