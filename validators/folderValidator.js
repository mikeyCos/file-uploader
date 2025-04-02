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
  name: {
    trim: true,
    isEmpty: {
      bail: true,
      errorMessage: "Please leave blank",
    },
    escape: true,
  },
};

const validateFolder = (view) => {
  return asyncHandler(async (req, res, next) => {
    await checkSchema(folderSchema, ["body"]).run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const inputs = matchedData(req, { onlyValidData: false });
      const { folderID } = req.params;

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
