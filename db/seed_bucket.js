const prisma = require("./prisma");
const { decode } = require("base64-arraybuffer");
const supabase = require("./supabase");
const getFilesFromPath = require("../utils/getFilesFromPath");
const generateRandomIndex = require("../utils/generateRandomIndex");

const seedBucket = async (userID, folders, bucketID = "drives", filesPath) => {
  const { data: bucketExists, error: bucketExistsError } =
    await supabase.storage.getBucket(bucketID);

  console.log("bucketExists:", bucketExists);
  console.log("bucketExistsError:", bucketExistsError);

  if (bucketExists) {
    // If bucket exists
    //  Empty bucket
    await supabase.storage.emptyBucket(bucketID);
  } else {
    // If bucket does not exist
    //  Create bucket
    await supabase.storage.createBucket(bucketID, { fileSizeLimit: "5MB" });
  }

  const files = await getFilesFromPath(filesPath);
  console.log("folders:", folders);
  // Upload files from uploadsPath
  for (const file of files) {
    const randomFolderIndex = generateRandomIndex(files, 1);
    const { id: folderID } = folders[randomFolderIndex] ?? {};
    const { originalname, buffer, mimetype } = file;
    const fileBase64 = decode(buffer.toString("base64"));
    const storagePath = `/${userID}${
      folderID ? `/${folderID}` : ""
    }/${originalname}`;

    console.log("file:", file);
    console.log("storagePath:", storagePath);
    console.log("folderID:", folderID);
    await supabase.storage
      .from(bucketID)
      .upload(storagePath, fileBase64, { contentType: mimetype });

    await prisma.file.create({
      data: {
        name: originalname,
        size: file.size,
        url: storagePath,
        accountId: userID,
        folderId: folderID,
      },
    });
  }

  console.log("The bucket have been seeded!");
};

const emptyBucket = async (bucketID) => {
  await supabase.storage.emptyBucket(bucketID);
};

module.exports = seedBucket;
