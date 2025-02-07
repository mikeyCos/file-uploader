const asyncHandler = require("express-async-handler");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    console.log("file:", file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const fileController = {
  postFile: [
    upload.array("upload_file", 25),
    asyncHandler(async (req, res) => {
      console.log("postFile running...");
      res.redirect("/dashboard");
    }),
  ],
};

// upload.single("upload_file"),

module.exports = fileController;
