const asyncHandler = require("express-async-handler");
const { checkSchema, validationResult } = require("express-validator");

// Validates share query parameter
// The share query parameter value must be "true"
const isShareValid = async (share) => {
  const regex = new RegExp("^true$");
  const regexResult = regex.test(share);

  if (!regexResult) return Promise.reject("Invalid share query.");
  return Promise.resolve();
};

const shareSchema = {
  share: {
    optional: {
      options: {
        values: undefined,
      },
    },
    trim: true,
    custom: {
      options: isShareValid,
    },
    escape: true,
  },
};

// What is the most appropriate HTTP code for invalid parameters?
const validateQuery = (schema) => {
  return asyncHandler(async (req, res, next) => {
    console.log("validateQuery running...");
    await checkSchema(schema, ["query"]).run(req);
    const errors = validationResult(req);
    console.log("errors:", errors);
    if (!errors.isEmpty()) {
      next({ status: 404 });
    }

    next();
  });
};

module.exports = { validateQuery, shareSchema };
