const { checkSchema, validationResult } = require("express-validator");

const folderSchema = {
  folder_name: {
    trim: true,
    isEmpty: {
      negated: true,
      bail: true,
      errorMessage: "Folder name cannot be empty.",
    },
    isLength: {
      max: 25,
    },
    escape: true,
  },
};

const validateFolder = checkSchema(folderSchema, ["body"]);

const foo = (view) => {
  return (req, res, next) => {
    checkSchema(folderSchema, ["body"]);
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

module.exports = validateFolder;
