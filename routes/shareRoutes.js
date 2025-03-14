const { Router } = require("express");
const {
  getSharedRoute,
  createSharedRoute,
} = require("../controllers/shareController");

/* const shareRouter = new Router();

// GET requests
shareRouter.get("/:id", getSharedRoute);

// POST requests
// This is protected route
shareRouter.post("/:id", createSharedRoute);

module.exports = shareRouter; */

/* Is this appropriate to do?
 * Function creates a router
 *  An authentication middleware is only on a specific route
 */
const shareRoutes = (isAuth) => {
  const shareRouter = new Router();

  // GET requests
  shareRouter.get("/:folderID", getSharedRoute);

  // PUT requests
  shareRouter.put("/:folderID", isAuth, createSharedRoute);

  return shareRouter;
};

module.exports = shareRoutes;
