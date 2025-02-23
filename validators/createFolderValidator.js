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
      options: { max: 10 },
      errorMessage: "Folder name cannot exceed 10 characters in length.",
    },
    escape: true,
  },
};

const validateFolder = (view) => {
  return asyncHandler(async (req, res, next) => {
    await checkSchema(folderSchema, ["body"]).run(req);
    const errors = validationResult(req);
    const inputs = matchedData(req, { onlyValidData: false });
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(422).render(view, {
        errors: errors.mapped(),
        inputs,
      });
    }

    next();
  });
};

module.exports = validateFolder;
