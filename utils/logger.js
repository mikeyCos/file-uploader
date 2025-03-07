const logger = (text) => {
  return (req, res, next) => {
    console.log("Logger running...");
    text && console.log(text);
    console.log("req.originalUrl:", req.originalUrl);
    next();
  };
};

module.exports = logger;
