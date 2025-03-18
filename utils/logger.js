const logger = (text) => {
  return (req, res, next) => {
    console.log("------------LOGGER START------------");
    text && console.log(text);
    console.log("req.params:", req.params);
    console.log("req.baseUrl:", req.baseUrl);
    console.log("req.path:", req.path);
    console.log("req.url", req.url);
    console.log("req.originalUrl:", req.originalUrl);
    console.log("res.locals:", res.locals);
    console.log("-------------LOGGER END-------------");
    next();
  };
};

module.exports = logger;
