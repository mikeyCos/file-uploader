const asyncHandler = require("express-async-handler");

const faqController = {
  getFaq: asyncHandler(async (req, res) => {
    res.render("faq");
  }),
};

module.exports = faqController;
