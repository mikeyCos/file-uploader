const asyncHandler = require("express-async-handler");

const dashboardController = {
  getDashboard: asyncHandler(async (req, res) => {
    console.log("getDashboard running...");
    res.render("dashboard");
  }),
};

module.exports = dashboardController;
