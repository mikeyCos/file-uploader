const { Router } = require("express");
const {
  getSharedRoute,
  createSharedRoute,
} = require("../controllers/shareController");
const { validateParams } = require("../validators/validators");
const { fileSchema, folderSchema } = require("../validators/paramsValidator");

/* Is this appropriate to do?
 * Function creates a router
 *  An authentication middleware is only on a specific route
 */
const shareRoutes = (isAuth) => {
  const shareRouter = new Router();

  // GET requests
  shareRouter.get("/:folderID", validateParams(folderSchema), getSharedRoute);

  // PUT requests
  shareRouter.put("/:folderID", isAuth, createSharedRoute);

  return shareRouter;
};

module.exports = shareRoutes;
