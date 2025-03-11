const asyncHandler = require("express-async-handler");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");

const filenameSchema = {
  file_name: {
    trim: true,
    isEmpty: {
      negated: true,
      bail: true,
      errorMessage: "File name cannot be empty.",
    },
    isLength: {
      options: { max: 25 },
      errorMessage: "File name cannot exceed 25 characters in length.",
    },
    escape: true,
  },
};

const validateFilename = (view) => {
  return asyncHandler(async (req, res, next) => {
    console.log("validateFilename running...");
    await checkSchema(filenameSchema, ["body"]).run(req);
    const errors = validationResult(req);

    console.log("errors:", errors);
    console.log("req.params:", req.params);
    const { fileID } = req.params;
    if (!errors.isEmpty()) {
      const inputs = matchedData(req, { onlyValidData: false });
      return res.status(422).render(view, {
        errors: errors.mapped(),
        inputs,
        fileID,
        formAction: req.originalUrl,
      });
    }

    // Should a validator set a res.locals variable?
    // res.locals.validData = matchedData(req, { onlyValidData: true });
    next();
  });
};

module.exports = validateFilename;
