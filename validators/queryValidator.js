const asyncHandler = require("express-async-handler");
const { checkSchema, validationResult } = require("express-validator");

// Need to validate file and folder against req.user.id
// Only CRUD on files that are owned by req.user.id
// What if req.user is null or undefined

const isShareValid = async (share) => {
  console.log("isShareValid running...");
  console.log("share:", share);

  const regex = new RegExp("^true$");
  const regexResult = regex.text(share);
  // If share exists
  //  Share must be "true"
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

// How to get this to work when handling forms with invalid fileID/folderIDs?
const validateQuery = (schema) => {
  return asyncHandler(async (req, res, next) => {
    console.log("validateQuery running...");
    await checkSchema(schema, ["query"]).run(req);
    const errors = validationResult(req);
    console.log("errors:", errors);
    if (!errors.isEmpty()) {
      next({ message: "Invalid query ", status: 422 });
    }

    next();
  });
};

module.exports = { validateQuery, shareSchema };
