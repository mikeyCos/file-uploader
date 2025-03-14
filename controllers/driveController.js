const asyncHandler = require("express-async-handler");
const { decode } = require("base64-arraybuffer");
const { matchedData } = require("express-validator");
const upload = require("../config/upload");
const prisma = require("../db/prisma");
const supabase = require("../db/supabase");
const {
  validateFilename,
  validateFolder,
  validateUpload,
} = require("../validators/validators");
const { generateStoragePath } = require("../utils/utils");
const deleteFolderFiles = require("../utils/deleteFolderFiles");

const driveController = {
  getDrive: asyncHandler(async (req, res) => {
    console.log("getDrive running...");
    console.log("req.params:", req.params);
    console.log("req.baseUrl:", req.baseUrl);
    console.log("req.originalUrl:", req.originalUrl);

    const folders = await prisma.folder.findMany({
      where: {
        parentFolderId: null,
      },
    });
    const files = await prisma.file.findMany({
      where: {
        folderId: null,
      },
    });

    // /drive/files/upload
    const formAction = req.originalUrl;

    res.render("drive", {
      folders,
      files,
      formAction,
    });
  }),
  getDriveFolder: asyncHandler(async (req, res) => {
    console.log("getDriveFolder running...");
    console.log("req.params:", req.params);
    console.log("req.baseUrl:", req.baseUrl);
    console.log("req.originalUrl:", req.originalUrl);
    // Need to validate req.params.folderID
    const { folderID } = req.params;
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderID,
      },
      include: {
        files: true,
        subFolders: true,
      },
    });

    console.log("folder:", { folder });

    // /drive/folder/:folderID/files/upload
    // Currently used int he controls partial
    const formAction = req.originalUrl;

    res.render("folder", {
      folder,
      formAction,
    });
  }),
  postFolderCreate: [
    validateFolder("createFolderForm"),
    asyncHandler(async (req, res) => {
      const { folderID } = req.params;
      console.log("postFolderCreate running...");
      console.log("req.user:", req.user);
      console.log("req.body:", req.body);
      console.log("res.locals", res.locals);
      console.log("req.params:", req.params);
      const { folder_name } = matchedData(req, { onlyValidData: true });

      await prisma.folder.create({
        data: {
          name: folder_name,
          account: {
            connect: { id: req.user.id },
          },
          ...(folderID && {
            parentFolder: {
              connect: {
                id: folderID,
              },
            },
          }),
        },
      });

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
      console.log("postFilesUpload running...");
      // console.log("req.body:", req.body);
      console.log("req.files:", req.files);
      console.log("req.params:", req.params);
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
        console.log("fileBase64:", fileBase64);
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

        await prisma.file.create({
          data: {
            name: file.originalname,
            size: file.size,
            url: data.publicUrl,
            storagePath: storagePath,
            accountId: user.id,
            folderId: folderID,
          },
        });
      }

      res.sendStatus(200);
    }),
  ],
  putFile: [
    validateFilename("editFileForm"),
    asyncHandler(async (req, res) => {
      console.log("putFile running...");
      console.log("req.params:", req.params);
      console.log("res.locals:", res.locals);
      // Need to validate req.params.folderID
      // Need old path for storage
      const { file_name } = matchedData(req, { onlyValidData: true });
      const { user } = req;
      const { fileID } = req.params;

      const { storagePath: oldStoragePath, folderId } =
        await prisma.file.findUnique({
          where: {
            id: fileID,
          },
        });

      const newStoragePath = generateStoragePath(user.id, file_name, folderId);

      await supabase.storage
        .from("drives")
        .move(oldStoragePath, newStoragePath);

      const { data } = supabase.storage
        .from("drives")
        .getPublicUrl(newStoragePath);

      const file = await prisma.file.update({
        where: {
          id: fileID,
        },
        data: {
          name: file_name,
          storagePath: newStoragePath,
          url: data.publicUrl,
        },
      });

      res.status(200).render("itemFile", { file });
    }),
  ],
  putFolder: [
    validateFolder("editFolderForm"),
    asyncHandler(async (req, res) => {
      console.log("putFolder running...");
      console.log("req.params:", req.params);
      console.log("req.body:", req.body);
      console.log("res.locals:", res.locals);
      // Need to validate req.params.folderID
      const { folderID } = req.params;
      const { folder_name } = matchedData(req, { onlyValidData: true });
      const folder = await prisma.folder.update({
        where: {
          id: folderID,
        },
        data: {
          name: folder_name,
        },
      });

      console.log("folder:", folder);
      res.render("itemFolder", { folder });
    }),
  ],
  deleteFolder: asyncHandler(async (req, res) => {
    // Need to validate req.params.folderID
    // What to do if there are files in folder?
    // Option 1
    //  Delete files
    // Option 2
    //  Remove folder relation
    console.log("deleteFolder running...");
    const { folderID } = req.params;
    /* const folder = await prisma.folder.delete({
      where: {
        id: folderID,
      },
      include: {
        files: true,
      },
    }); */

    // Need to delete files from supabase.storage that are nested in a parent folder
    /* if (folder.files.length > 0) {
      for (const file of folder.files) {
        await supabase.storage.from("drives").remove([file.storagePath]);
      }
    } */

    deleteFolderFiles(folderID);

    // This is fetched from the client and causes 2 GET requests
    // res.redirect("/drive");
    // res.render("drive")
    res.sendStatus(200);
  }),
  deleteFile: asyncHandler(async (req, res) => {
    console.log("deleteFile running...");

    // Need to validate req.params.fileID
    // Need to delete from supabase.storage
    const { fileID } = req.params;
    const { storagePath } = await prisma.file.delete({
      where: {
        id: fileID,
      },
    });

    console.log("storagePath:", storagePath);
    await supabase.storage.from("drives").remove([storagePath]);

    res.sendStatus(200);
  }),
  downloadFile: asyncHandler(async (req, res) => {
    // Need to validate the file exists
    // Use this endpoint if a download button exists
    // As for downloading directly from supabase
    // https://supabase.com/docs/guides/storage/serving/downloads
    console.log("downloadFile running...");
    const { fileID } = req.params;
    console.log("fileID:", fileID);

    const { storagePath, name } = await prisma.file.findFirst({
      where: {
        id: fileID,
      },
    });

    // const { data, error } = await supabase.storage.from("drives").download(storagePath);

    // res.attachment sets the headers
    // Content-Disposition: attachment; filename="[filename]"
    // Content-Type: [file_mimetype]
    // res.attachment(name);
    // const buffer = Buffer.from(await data.arrayBuffer());
    // res.send(buffer);
    // res.end();
  }),
};

// upload.single("upload_file"),

module.exports = driveController;
