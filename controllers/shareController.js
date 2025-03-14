const asyncHandler = require("express-async-handler");

const shareController = {
  getSharedRoute: asyncHandler(async (req, res) => {
    console.log("getShare running...");
    console.log("req.params:", req.params);
  }),
  createSharedRoute: asyncHandler(async (req, res) => {
    console.log("createSharedRoute running...");
    console.log("req.params:", req.params);

    res.render("shareFolderOutput", { shareURL: "Hello world!" });
    // res.status(200);
  }),
};

module.exports = shareController;
