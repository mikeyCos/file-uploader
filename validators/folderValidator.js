const asyncHandler = require("express-async-handler");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");

const folderSchema = {
  folder_name: {
    trim: true,
    isEmpty: {
      negated: true,
      bail: true,
      errorMessage: "Folder name cannot be empty.",
    },
    isLength: {
      options: { max: 25 },
      errorMessage: "Folder name cannot exceed 25 characters in length.",
    },
    escape: true,
  },
};

const validateFolder = (view) => {
  return asyncHandler(async (req, res, next) => {
    await checkSchema(folderSchema, ["body"]).run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("req.params:", req.params);
      const inputs = matchedData(req, { onlyValidData: false });
      const { folderID } = req.params;
      console.log("req.originalUrl:", req.originalUrl);
      console.log("folderID:", folderID);
      return res.status(422).render(view, {
        errors: errors.mapped(),
        inputs,
        folderID,
        formAction: req.originalUrl,
      });
    }

    next();
  });
};

// Can I reuse this for filename?

module.exports = validateFolder;
