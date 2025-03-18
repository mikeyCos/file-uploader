const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const { validateShareDuration } = require("../validators/validators");
const {
  prisma,
  traverseNestedFolders,
  updateFolderExpiresAt,
} = require("../db/prisma");
const { isExpired } = require("../utils/utils");

const shareController = {
  getSharedRoute: asyncHandler(async (req, res, next) => {
    console.log("getSharedRoute running...");
    const { folderID } = req.params;

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderID,
        expiresAt: { not: null },
      },
      include: {
        files: true,
        subFolders: true,
      },
    });

    console.log("folder:", folder);
    // console.log("folder.expiresAt:", folder.expiresAt);

    // Need to simplify this so the folder existence is not checked twice
    const expired = isExpired(folder.expiresAt);
    console.log("expired:", expired);

    if (expired) {
      // Update folder's expiresAt column to null
      // Maybe only updateFolderExpiresAt if folder.expiresAt exists
      await updateFolderExpiresAt(null)(folder.id);
      return next({ status: 410, error: "Link has expired" });
    }

    const baseURL = "/share/";
    // Need to prohibit specific buttons from rendering
    res.render("folder", {
      folder,
      formAction: "",
      baseURL,
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
      console.log("createSharedRoute running...");

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
      traverseNestedFolders(folderID, updateFolderExpiresAt(expiresAt));
      res.render("shareFolderOutput", {
        shareURL: `/share/${folderID}`,
        expiresAt,
      });
      // res.status(200);
    }),
  ],
};

module.exports = shareController;
