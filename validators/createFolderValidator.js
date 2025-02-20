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
      options: { max: 2 },
      errorMessage: "testing...",
    },
    escape: true,
  },
};

// const validateFolder = checkSchema(folderSchema, ["body"]);

const validateFolder = (view) => {
  return asyncHandler(async (req, res, next) => {
    await checkSchema(folderSchema, ["body"]).run(req);
    const errors = validationResult(req);
    const inputs = matchedData(req, { onlyValidData: false });
    console.log(errors);
    if (!errors.isEmpty()) {
      // Need a way to render the dashboard with the dialog open with createFolderForm partial
      return res.status(422).render(view, {
        errors: errors.mapped(),
        inputs,
      });
    }
  });
};

module.exports = validateFolder;
