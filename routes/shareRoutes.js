const { Router } = require("express");
const {
  getSharedRoute,
  createSharedRoute,
} = require("../controllers/shareController");
const { validateParams } = require("../validators/validators");
const { folderSchema } = require("../validators/paramsValidator");

/* Is this appropriate to do?
 * Function creates a router
 *  Authentication middleware will invoke on specific route
 */
const shareRoutes = (isAuth) => {
  const shareRouter = new Router();

  // GET requests
  shareRouter.get("/:folderID", validateParams(folderSchema), getSharedRoute);

  // PUT requests
  shareRouter.put(
    "/:folderID",
    isAuth,
    validateParams(folderSchema),
    createSharedRoute
  );

  return shareRouter;
};

module.exports = shareRoutes;
