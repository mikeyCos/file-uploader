// Use the JS library to create a bucket.
const { decode } = require("base64-arraybuffer");
const supabase = require("./supabase");
const getFileExtension = require("../utils/getFileExtension");
const getFilesFromPath = require("../utils/getFilesFromPath");
const allowedMimeTypes = require("../validators/allowedMimeTypes/allowedMimeTypes");

const seedBucket = async (bucketID = "drives") => {
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

  // Upload files from uploadsPath

  const files = await getFilesFromPath();

  for (const file of files) {
    const { name: filename, parentPath } = file;
    const ext = getFileExtension(filename);
    const mimetype = allowedMimeTypes[ext];
    const fileFullPath = `${parentPath}/${filename}`;
    const buffer = await fsPromises.readFile(fileFullPath);
    const fileBase64 = decode(buffer.toString("base64"));
    // await supabase.storage
    //   .from(bucketID)
    //   .upload(`/${file.name}`, fileBase64, { contentType: mimetype });
  }

  console.log("buckets have been seeded!");
};

const emptyBucket = async (bucketID) => {
  await supabase.storage.emptyBucket(bucketID);
};

module.exports = { seedBucket };
