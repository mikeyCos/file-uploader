const asyncHandler = require("express-async-handler");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");

const filenameSchema = {
  upload_files: {
    trim: true,
    isEmpty: {
      negated: true,
      bail: true,
      errorMessage: "File name cannot be empty.",
    },
    isLength: {
      options: { max: 10 },
      errorMessage: "File name cannot exceed 10 characters in length.",
    },
    escape: true,
  },
};

const validateFilename = (view) => {
  return asyncHandler(async (req, res, next) => {
    console.log("testing...");
    await checkSchema(filenameSchema, ["body"]).run(req);
    const errors = validationResult(req);
    const inputs = matchedData(req, { onlyValidData: false });
    console.log("errors:", errors);
    if (!errors.isEmpty()) {
      return res.status(422).render(view, {
        errors: errors.mapped(),
        inputs,
      });
    }

    next();
  });
};

module.exports = validateFilename;
