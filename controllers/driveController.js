const asyncHandler = require("express-async-handler");
const { decode } = require("base64-arraybuffer");
const { matchedData } = require("express-validator");
const upload = require("../config/upload");
const {
  createFile,
  createFolder,
  getFileById,
  getFolderById,
  getFiles,
  getFolders,
  updateFileName,
  updateFolderName,
  deleteFile,
  deleteFolder,
  traverseUpNestedFolders,
} = require("../db/prisma");
const supabase = require("../db/supabase");
const {
  validateFilename,
  validateFolder,
  validateUpload,
} = require("../validators/validators");
const { generateStoragePath } = require("../utils/utils");
// const deleteFolderFiles = require("../utils/deleteFolderFiles");

const driveController = {
  getDrive: asyncHandler(async (req, res) => {
    const { user } = req;
    const folders = await getFolders(user.id);
    const files = await getFiles(user.id);

    // /drive/files/upload
    const formAction = req.originalUrl;
    const baseURL = `${req.originalUrl}/folder/`;

    res.render("drive", {
      folders,
      files,
      formAction,
      baseURL,
    });
  }),
  getDriveFolder: asyncHandler(async (req, res) => {
    console.log(req.user);
    const { user } = req;
    const { folderID } = req.params;
    const folder = await getFolderById(user.id, folderID);
    // /drive/folder/:folderID/files/upload
    // How to display a path where the user is?
    // For example Drive > Folder0 > Nested Folder > Nested Nested Folder
    const formAction = req.originalUrl;
    const baseURL = `${req.baseUrl}/folder/`;

    const folders = await traverseUpNestedFolders(user.id, folderID);

    res.render("folder", {
      folder,
      folders,
      formAction,
      baseURL,
    });
  }),
  postFolderCreate: [
    validateFolder("createFolderForm"),
    asyncHandler(async (req, res) => {
      const { user } = req;
      const { folderID } = req.params;
      const { folder_name } = matchedData(req, { onlyValidData: true });

      // What happens if folders are added to a folder with a valid expiresAt value?
      const parentFolder = folderID && (await getFolderById(user.id, folderID));
      await createFolder(
        user.id,
        folder_name,
        folderID,
        parentFolder?.expiresAt
      );

      // res.redirect("/drive");
      // Re-render folders?
      // Could append or prepend or replaceWith
      res.sendStatus(200);
    }),
  ],
  postFilesUpload: [
    upload,
    validateUpload("uploadForm"),
    asyncHandler(async (req, res) => {
      const { user, files } = req;
      const { folderID } = req.params;

      // How to upload files in a folder?
      //  Need folder's id
      // Re-render files?
      // Could append or prepend or replaceWith
      // What to do if filename is something that exists in database?

      // Need to upload files to Supabase
      // Need to know the folder these files are uploading to
      // Folder needs to be tied to req.user.id and the folder it was put in
      // For example,
      //  In the users' drive's root
      //    /req.user.id/file.name
      //  In a folder
      //    /req.user.id/folder.id/file.name
      for (const file of files) {
        const fileBase64 = decode(await file.buffer.toString("base64"));
        const storagePath = generateStoragePath(
          user.id,
          file.originalname,
          folderID
        );

        await supabase.storage.from("drives").upload(storagePath, fileBase64, {
          contentType: file.mimetype,
        });

        const { data } = supabase.storage
          .from("drives")
          .getPublicUrl(storagePath);

        /* await createFile({
          name: file.originalname,
          size: file.size,
          url: data.publicUrl,
          storagePath: storagePath,
          accountId: user.id,
          folderId: folderID,
        }); */

        await createFile(user.id, folderID, file, data.publicUrl, storagePath);
      }

      res.sendStatus(200);
    }),
  ],
  putFile: [
    validateFilename("editFileForm"),
    asyncHandler(async (req, res) => {
      // Need to validate req.params.folderID
      // Need old path for storage
      const { file_name } = matchedData(req, { onlyValidData: true });
      const { user } = req;
      const { fileID } = req.params;

      const { storagePath: oldStoragePath, folderId } = await getFileById(
        fileID
      );

      const newStoragePath = generateStoragePath(user.id, file_name, folderId);

      await supabase.storage
        .from("drives")
        .move(oldStoragePath, newStoragePath);

      const { data } = supabase.storage
        .from("drives")
        .getPublicUrl(newStoragePath);

      const file = await updateFileName(
        fileID,
        file_name,
        data.publicUrl,
        newStoragePath
      );

      res.status(200).render("itemFile", { file });
    }),
  ],
  putFolder: [
    validateFolder("editFolderForm"),
    asyncHandler(async (req, res) => {
      // Need to validate req.params.folderID
      const { user } = req;
      const { folderID } = req.params;
      const { folder_name } = matchedData(req, { onlyValidData: true });
      const folder = await updateFolderName(user.id, folderID, folder_name);

      const baseURL = "/drive/folder/";
      res.render("itemFolder", { folder, baseURL });
    }),
  ],
  deleteFolder: asyncHandler(async (req, res) => {
    const { user } = req;
    const { folderID } = req.params;
    await deleteFolder(user.id, folderID);

    res.sendStatus(200);
  }),
  deleteFile: asyncHandler(async (req, res) => {
    // Need to validate req.params.fileID
    // Need to delete from supabase.storage
    const { user } = req;
    const { fileID } = req.params;
    const { storagePath } = await deleteFile(user.id, fileID);

    await supabase.storage.from("drives").remove([storagePath]);

    res.sendStatus(200);
  }),
  downloadFile: asyncHandler(async (req, res) => {
    // Optional endpoint
    // Need to validate the file exists
    // Use this endpoint if a download button exists
    // As for downloading directly from supabase
    // https://supabase.com/docs/guides/storage/serving/downloads
    const { user } = req;
    const { fileID } = req.params;
    const { storagePath, name } = await getFileById(user.id, fileID);

    const { data, error } = await supabase.storage
      .from("drives")
      .download(storagePath);

    // res.attachment sets the headers
    // Content-Disposition: attachment; filename="[filename]"
    // Content-Type: [file_mimetype]
    res.attachment(name);
    const buffer = Buffer.from(await data.arrayBuffer());
    res.send(buffer);
    res.end();
  }),
};

// upload.single("upload_file"),

module.exports = driveController;
