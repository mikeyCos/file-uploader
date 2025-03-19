const asyncHandler = require("express-async-handler");

const indexController = {
  getIndex: asyncHandler((req, res) => {
    res.render("index");
  }),
};

module.exports = indexController;
