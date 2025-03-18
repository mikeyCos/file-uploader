const asyncHandler = require("express-async-handler");

const indexController = {
  getIndex: asyncHandler((req, res) => {
    console.log("getIndex running...");
    res.render("index");
  }),
};

module.exports = indexController;
