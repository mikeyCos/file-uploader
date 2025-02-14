const { checkSchema, validationResult } = require("express-validator");

const filesSchema = {
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

const validateFiles = checkSchema(filesSchema, ["body"]);

const foo = (view) => {
  return (req, res, next) => {
    checkSchema(filesSchema, ["body"]);
    const errors = validationResult(req);
    const inputs = matchedData(req, { onlyValidData: false });

    if (!errors.isEmpty()) {
      // Need a way to render the dashboard with the dialog open with createFolderForm partial
      return res.render(view, {
        formType: "folder",
      });
    }
  };
};

module.exports = validateFiles;
