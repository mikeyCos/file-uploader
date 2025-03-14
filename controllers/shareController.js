const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const { validateShareDuration } = require("../validators/validators");
const {
  traverseNestedFolders,
  updateFolderExpiresAt,
} = require("../db/prisma");

const shareController = {
  getSharedRoute: asyncHandler(async (req, res) => {
    console.log("getShare running...");
    console.log("req.params:", req.params);
    // How to handle nested folders?
    // Option 1
    //  Add a folderID parameter
    // Option 2
    //  Add child folders to SharedFolders model
  }),
  createSharedRoute: [
    validateShareDuration("shareFolderForm"),
    asyncHandler(async (req, res) => {
      console.log("createSharedRoute running...");
      console.log("req.params:", req.params);

      const { folderID } = req.params;

      const { share_duration } = matchedData(req, { onlyValidData: true });
      // const today = new Date();
      const expiresAt = new Date(
        Date.now() + 3600 * 1000 * 24 * share_duration
      );

      // console.log("today:", today);
      console.log("expiresAt:", expiresAt);
      // console.log(
      //   Math.floor((expiresAt.getTime() - today.getTime()) / (1000 * 3600 * 24))
      // );
      // traverseNestedFolders(folderID, updateFolderExpiresAt(expiresAt));
      res.render("shareFolderOutput", { shareURL: "Hello world!", expiresAt });
      // res.status(200);
    }),
  ],
};

module.exports = shareController;
