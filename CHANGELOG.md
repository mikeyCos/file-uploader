# Changelog
---
### 07 FEB 2025
- Created `events` directory.
- Added `add`, `close`, `delete`, and `share` SVG files to `icons` directory.
- Created `addFolderForm.ejs` partial.
- Included script tag for `dialogController.js` in the `head.ejs` partial.
---
### 06 FEB 2025
- Renamed `seedDB.js` module to `seed_db.js`.
- Created `dashboardRouter.js`, `dashboardController.js`, `fileRouter.js`, and `fileRouterController.js` modules.
- Created `errors.ejs` and `dashboard.ejs` pages.
- Created `routes.js` module; the module is fetched and immediately called with the express application object, `app`.
- Created `uploadForm.ejs` partial.
- Authenticated users can submit multiple files of any time to the `file` input; these files are temporarily saved locally in `uploads` directory.
- The mount path `/dashboard` is a protected route that requires a logged-in user.
---
### 05 FEB 2025
- Initial commit for `file-uploader` project.
- Installed pre-existing dependencies in `package.json`.
- Installed `prisma`, `@quixo3/prisma-session-store`, and `multer` packages.
- Uninstalled `connect-pg-simple` package.
- Renamed `app.js` to `server.js`.
- Renamed `accountValidator.js` to `createAccountValidator.js`, `authenticationRouter.js` to `accountRouter.js`, and `authenticationController.js` to `accountController.js`.
- Included inputs for `fullname` and `email` fields.
- Deleted `initdb.js`, `pool.js` and `queries.js` modules in `db` directory.
- Recreated `db` directory, `prisma.js` and `seedDB.js` modules.
- The `password` property is omitted during deserialization.
---
### 09 JAN 2025
- Added `validateLogin` onto `authenticationController.postLogin` to validate inputs are not empty.
- Created a placeholder middleware in `authenticationRouter.js` module named `isAuthenticated`; redirects to the root path if `req.isAuthenticated()` returns true, otherwise move to the next middleware.
---
### 08 JAN 2025
- Installed `bcryptjs` dependency.
- Input errors in `createAccountForm.ejs` partial now use the value of `locals.errors?.*.msg` instead of static content.
- A user can login and logout their account with their valid username and password.
- Changed logout HTTP request method from `GET` to `POST` by changing the logout anchor into a form element.
- Created `demo` directory and `DEMO.md`.
- Moved `passport.authentication` from the `authenticationRouter.js` module to `authenticationController.js` module.
- Creating an account will automatically sign the account in.
---
### 07 JAN 2025
- On a `POST` request, an account can be created when the form is validated without errors and the account will be inserted into a database depending on the `DATABASE_URL` from the `environment.js` module.
- Created `loginValidator.js` module with the intent to validate inputs before authenticating and logging in an account.
- Created `form.css` style sheet and added CSS properties to hide and show input errors.
---
### 06 JAN 2025
- Updated outdated dependencies.
- Created `DATABASE_URL` property in `environment.js` module; the value is either `process.env.DATABASE_URL` or `postgresql://${process.env.DBUSER}:${process.env.DBPASSWORD}@localhost:5432/${process.env.DBNAME}`.
- Installed `express-session`, `passport`, `passport-local`, and `connect-pg-simple` dependencies.
- Created `authenticationRouter.js`, `supportRouter.js` , `authenticationController.js`, `supportController.js`, and `passport.js` modules.
- Created `createAccount.ejs`, `login.ejs`, and `support.ejs` pages.
- Created `createAccountForm.ejs` and `loginForm.ejs` partials.
- Created `config` directory and moved `environment.js` module from `utils` directory to `config` directory.
---
### 26 AUG 2024
- Initialized `NodeJS`/`Express` boilerplate template named `node-express-template`.
- Created a variety of files including: `CHANGELOG.md`, `app.js`, and `PROJECT_SPECIFICATIONS`.
- Created a variety of subdirectories including: `paths`, `public`, `routes`, `utils`, and `views`.
- Template can be locally started with `npm run dev`.
- Defined static and non-static paths in `paths/paths.js`.
- Created and linked a `reset` stylesheet.
---