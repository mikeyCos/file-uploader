const prisma = require("./prisma");
const { decode } = require("base64-arraybuffer");
const supabase = require("./supabase");
const { generateRandomIndex, getFilesFromPath } = require("../utils/utils");

const seedBucket = async (userID, folders, bucketID = "drives", filesPath) => {
  const { data: bucketExists, error: bucketExistsError } =
    await supabase.storage.getBucket(bucketID);

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
    const randomFolderIndex = generateRandomIndex(folders, 1);
    const { id: folderID } = folders[randomFolderIndex] ?? {};
    const { originalname, buffer, mimetype } = file;
    const fileBase64 = decode(buffer.toString("base64"));
    const storagePath = `${userID}${
      folderID ? `/${folderID}` : ""
    }/${originalname}`;

    await supabase.storage
      .from(bucketID)
      .upload(storagePath, fileBase64, { contentType: mimetype });

    const { data } = supabase.storage.from(bucketID).getPublicUrl(storagePath);

    await prisma.file.create({
      data: {
        name: originalname,
        size: file.size,
        url: data.publicUrl,
        storagePath: storagePath,
        accountId: userID,
        folderId: folderID,
      },
    });
  }

  console.log("The bucket have been seeded!");
};

const emptyBucket = async (bucketID = "drives") => {
  await supabase.storage.emptyBucket(bucketID);
};

module.exports = { seedBucket, emptyBucket };
