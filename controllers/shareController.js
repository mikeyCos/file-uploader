const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const { validateShareDuration } = require("../validators/validators");
const {
  getFolderById,
  updateFolderExpiresAt,
  traverseParentFolders,
  traverseSubfolders,
} = require("../db/prisma");
const { isExpired } = require("../utils/utils");

const shareController = {
  getSharedRoute: asyncHandler(async (req, res, next) => {
    const { folderID } = req.params;
    const folder = await getFolderById(null, folderID);
    const expired = isExpired(folder.expiresAt); // What if folder.expiresAt is null/undefined?
    console.log("expired:", expired);
    if (expired) {
      // Update folder's expiresAt column to null
      // Maybe only updateFolderExpiresAt if folder.expiresAt exists
      await updateFolderExpiresAt(null)(folder);
      return next({ status: 410, error: "Link has expired" });
    }

    const drivePathFolders = await traverseParentFolders(
      folder.accountId,
      folderID
    );

    console.log(drivePathFolders);
    const baseURL = "/share";
    // Need to prohibit specific buttons from rendering
    res.render("folder", {
      drivePathFolders,
      folders: folder.subFolders,
      files: folder.files,
      folder,
      formAction: "",
      baseURL,
      folder,
      public: true,
    });
    // How to handle nested folders?
    // Should the child folders only be accessible from the root>
    // Option 1
    //  Add a folderID parameter
    // Option 2
    //  Add child folders to SharedFolders model
  }),
  createSharedRoute: [
    validateShareDuration("shareFolderForm"),
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { folderID } = req.params;

      const { share_duration } = matchedData(req, { onlyValidData: true });
      // const today = new Date();
      const expiresAt = new Date(
        Date.now() + 3600 * 1000 * 24 * share_duration
      );

      console.log("expiresAt:", expiresAt);

      traverseSubfolders(user.id, folderID, updateFolderExpiresAt(expiresAt));
      res.render("shareFolderOutput", {
        shareURL: `/share/${folderID}`,
        expiresAt,
      });
    }),
  ],
};

module.exports = shareController;
