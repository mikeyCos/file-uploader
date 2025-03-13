# Changelog
---
### 13 MAR 2025
- Commit before merging `self-relating-folders` branch to `main` branch.
---
### 12 MAR 2025
- Deleting a folder will delete all it's children folder and their existing files.
- Removed `onDelete: Cascade` from `account` and `parentFolder` fields.
- Temporarily created `deleteFolderFiles.js` in `utils` directory.
- Files can be uploaded, and renamed from folders and subfolders.
- Subfolders can be created from client to database.
- Changed `formAction` from `${req.originalUrl}/files/upload` to `req.originalUrl`.
- Subfolders are seeded in the database and rendered to the client.
---
### 11 MAR 2025
- Created `self-relating-folders` branch.
- Commit before merging `supabase` branch to `main` branch.
- Created `validators.js` module; exports all validator modules from a central module.
- Deleting a folder now deletes all files inside the folder.
- Enabled a download `anchor` element with the `download` attribute; directly downloads file hosted on Supabase.
- Disabled a download 'button' element.
- Added `storagePath` field to `File` Prisma model.
---
### 10 MAR 2025
- Files can be individually downloaded by clicking the download button.
- Created `downloadFile.js` module in the `events` directory.
- Created `generateStoragePath.js` module; accepts `userID`, `filename`, `folderID` parameters.
- Created `utils.js` module; exports all utility modules from a central module.
---
### 09 MAR 2025
- Created `generateRandomIndex.js` module; accepts an array and number upperBound parameters.
- Changed `prisma.folder.createMany()` to `prisma.folder.createManyAndReturn()` in `seed_db.js` module.
- Renamed database scripts in `package.json` from `db-seed` to `seed-db` and `db-empty` to `empty-db`.
---
### 07 MAR 2025
- Created `getFileExtension.js` and `getFilesFromPath.js` utility modules.
- Renamed `seed_buckets.js` module to `seed_bucket.js`.
- Added `size` and `url` fields to `File` Prisma model.
- Added `text` parameter to `logger` function; the function must be called to return a middleware.
- Updated `bcryptjs` package.
- Split route paths for `postFilesUpload`.
---
### 06 MAR 2025
- A `RegExp` object is created in `uploadValidator.js` module and tests again the `mimetype` string.
- Added `uploads/` directory to `.gitignore`.
- Redefined exported object in `allowedMimeTypes.js` module; used string values for MIME types instead of regular expressions.
- Renamed `fileRegexes.js` module to `allowedMimeTypes.js`.
---
### 05 MAR 2025
- Files can be uploaded to Supabase.
- Installed `base64-arraybuffer` package.
----
### 04 MAR 2025
- Created `supabase.js` and `seed_buckets.js` modules.
- Updated `primsa` package.
- Installed `@supabase/supabase-js` to `devDependencies`.
- Created `supabase` branch.
- Commit before merging `crud_folders` branch to `main` branch.
---
### 03 MAR 2025
- The dialog's `onCloseHandler` will remove the dialog's `firstChild` node; i.e., `dialog.firstChild.remove()`/
- Created `fileDetails.ejs` partial; this will render a file's name, size, and created date.
- Added `data-form-action` attribute to buttons that will open the dialog; the value will be used when the form is submitted.
---
### 28 FEB 2025
- Renamed `data-action` to `data-url`.
- Replaced logical OR, `||`, operator with nullish coalescing, `??`, operator for `editFileForm.ejs` and `editFolderForm.ejs` partials. 
---
### 27 FEB 2025
- Folders and files are selected in with `getDrive` method in `driveController.js` module.
- Omitted `folders` and `files` attributes from `prisma.account.findFirst()` in `passport.js` module.
- Deleted `fileValidator.js` module.
- Submitting `form .form-edit-folder` will validate the input and either submit the form or re-render the form with an error message.
- Renamed `createFolderValidator.js` module to `folderValidator.js`.
- Editing an item will replace the old list item with a new list item.
- Created `folder.ejs` page.
---
### 24 FEB 2025
- Adding a folder will refresh the page with `window.location.reload();`.
- Created `itemFile.ejs` and `itemFolder.ejs` partials.
- Removed `post*` methods from `componentsController.js` module.
- The `onSubmit` asynchronous function now accepts a callback function; these callback functions will call the form's specific `fetch` function and manipulate the DOM.
- Added `data-item-id` attribute to forms for `PUT` and `DELETE` requests.
- Removed `data-method` and `data-form-type` attributes from forms.
---
### 23 FEB 2025
- The `name_onInput.js` module now selects the submit button based on the input's form instead of selecting from the `document`. 
- Changed `folderName_onInput.js` to `name_onInput.js`.
- new commit
- Separated component routes for `/form/file/edit/:fileID`, `/form/folder/edit/:folderID`, `/form/file/delete/:fileID`, and `/form/folder/delete/:folderID` paths; each path has their own endpoint.
- Created `deleteFileForm.ejs` and `deleteFolderForm.ejs` partials.
- Deleted `deleteForm.ejs`.
- All `form` elements in a `dialog` element will have the attribute `method="dialog"`. 
---
### 22 FEB 2025
- The `button` elements in `controls.ejs` partial have a data attribute `data-action` with a path value.
- Clicking on the delete button will show a dialog to confirm deleting the item.
- Created `deleteForm.ejs` partial.
---
### 21 FEB 2025
- Created `controls.ejs`, `editFileForm.ejs` and `editFolderForm.ejs` partials.
- Folder and files can be deleted on the server and removed from the client; clicking the delete button will send a `DELETE` request by calling `fetch()`, the server will send a `200` status code, and the item will be removed from client.
- Created `deleteItem.js` module.
- Created Prisma migration `file_folder_on_delete`; deleting a folder will also delete it's files.
- Added `download`, `file`, `folder`, `newFolder`, and `upload` SVG files to `icons` directory.
- Renamed `dashboard.ejs` to `drive.ejs`.
- Deleted `dashboardRouter.js`, and `dashboardController.js` modules.
- Created `fetchForm` asynchronous function in `dialogController.js`; returns form component corresponding to the `formType` parameter.
- Created branch `crud_folders`.
- Commit before merging `files_validation` branch to `main` branch.
---
### 19 FEB 2025
- Validation functions, `validateUpload` and `validateFolder` return asynchronous middlewares. 
- Refactored `form_onSubmit.js` module; separated `fetch` functions into `fetchFiles` and `fetchFolder` while consolidating `then` and `catch` methods.
- Created `regexes` directory and `fileRegexes.js` module.
---
### 18 FEB 2025
- Attempted to validate files using a `fileFilter` function with `multer`; reverted back to using `express-validator`.
- Created `fileValidator.js` module.
- Created `upload.js` module in `config` directory.
---
### 17 FEB 2025
- If `form .form-upload-files` does not pass validation the form is re-rendered and displays an error message.
- The submit button for `form .form-upload-files` is enabled if `input.files.length !== 0` and disabled if `input.files.length === 0`.
- Created `uploadFiles_onChange.js` and `uploadValidator.js` modules.
- Created `regexes` object in `uploadValidator.js` module with file extensions and regular expressions as key-value pairs; the regular expressions are for MIME types.
---
### 15 FEB 2025
- Resolved `RangeError` from occurring from the `fetch` function in `form_onSubmit.js` module by removing the `headers` object with the key and value pair `"Content-Type": "multipart/form-data"`.
---
### 14 FEB 2025
- Created `files_validation` branch.
- Merged `folder_validation` branch with `main` branch.
- Created `form_onSubmit.js`, and `uploadFilesValidator.js` modules.
- If there are no validation errors from submitting `form .form-create-folder`, `HTMLFormElement.submit()` method is called.
- If there are validation errors from submitting `form .form-create-folder`, the form re-renders and replaces the old form with a new form with a error message and previous input value.
- Submitting the `form .form-create-folder` validates the form by fetching with the URL `/components/folder/create` with the request configuration:

```js
{
  method: "POST",
  redirect: "manual",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: data,
}
```
---
### 13 FEB 2025
- Created `folder_validation` branch.
- A user can create a folder without validation and render as a list item.
- The `dialog` element can be closed with `ESC` key, clicking the cancel button, or clicking outside the `form` element.
- Created `folderName_onInput.js` module; enables and disables the submit button for creating a folder.
- Renamed `addFolderForm.ejs` to `createFolderForm.ejs`.
- Renamed `fileRouter.js` to `driveRouter.js` and `fileController.js` to `driveController.js`.
---
### 12 FEB 2025
- Prisma schema only allows creating multiple folders and files in a folder.
---
### 10 FEB 2025
- Sub folders references parent folder's `id`.
---
### 07 FEB 2025
- Created `events` directory.
- Added `add`, `close`, `delete`, and `share` SVG files to `icons` directory.
- Created `addFolderForm.ejs` partial.
- Included script tag for `dialogController.js` in the `head.ejs` partial.
- Created `componentsRouter.js`, and `componentsController.js` modules.
- Created two `button` elements that open a `dialog` element, fetches the specific `form` element based on what `button` is clicked, and removes the `form` element when the `dialog` element is closed.
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