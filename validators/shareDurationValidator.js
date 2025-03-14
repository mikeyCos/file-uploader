const asyncHandler = require("express-async-handler");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");

const shareDurationSchema = {
  share_duration: {
    trim: true,
    isEmpty: {
      negated: true,
      bail: true,
      errorMessage: "Duration cannot be empty.",
    },
    isInt: {
      options: { min: 1, max: 30 },
      errorMessage: "Duration must be between 1 and 30.",
    },
    escape: true,
  },
};

const validateShareDuration = (view) => {
  return asyncHandler(async (req, res, next) => {
    console.log("validateShareDuration running...");
    await checkSchema(shareDurationSchema, ["body"]).run(req);
    const errors = validationResult(req);

    console.log("errors:", errors);
    console.log("req.params:", req.params);
    const { folderID } = req.params;
    if (!errors.isEmpty()) {
      const inputs = matchedData(req, { onlyValidData: false });
      return res.status(422).render(view, {
        errors: errors.mapped(),
        inputs,
        folderID,
        formAction: req.originalUrl,
      });
    }

    // Should a validator set a res.locals variable?
    // res.locals.validData = matchedData(req, { onlyValidData: true });
    next();
  });
};

module.exports = validateShareDuration;
