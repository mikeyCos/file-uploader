const asyncHandler = require("express-async-handler");
const { checkSchema, validationResult } = require("express-validator");

const paramsSchema = {
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

const validateParams = asyncHandler(async (req, res, next) => {
  await checkSchema(paramsSchema, ["params"]).run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next({ error: "Unprocessable request parameters", status: 422 });
  }

  next();
});

module.exports = validateParams;
