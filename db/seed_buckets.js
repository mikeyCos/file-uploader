// Use the JS library to create a bucket.
const fsPromises = require("node:fs/promises");
const path = require("path");
const { decode } = require("base64-arraybuffer");
const supabase = require("./supabase");
const prisma = require("./prisma");
const allowedMimeTypes = require("../validators/allowedMimeTypes/allowedMimeTypes");

const rootPath = path.join(__dirname, "..");
const uploadsPath = path.join(rootPath, "uploads");
console.log(uploadsPath);

const seedBuckets = async () => {
  const bucketID = "drives";
  const { data: bucketExists, error: bucketExistsError } =
    await supabase.storage.getBucket(bucketID);

  if (bucketExists) {
    // If bucket exists
    //  Empty bucket
    await supabase.storage.emptyBucket(bucketID);
  } else {
    // If bucket does not exist
    //  Create bucket
    await supabase.storage.createBucket(bucketID);
  }

  // Upload files from uploadsPath
  // How to filter files and use fsPromises.stat(path[, options], callback)?
  const files = await fsPromises.readdir(uploadsPath, { withFileTypes: true });
  const filteredFiles = files.filter((file) => file.isFile());
  for (const file of filteredFiles) {
    const filenameArr = file.name.split(".");
    const ext = filenameArr[filenameArr.length - 1];
    const mimetype = allowedMimeTypes[ext];
    const fileFullPath = `${file.path}/${file.name}`;
    const buffer = await fsPromises.readFile(fileFullPath);
    const fileBase64 = decode(buffer.toString("base64"));
    await supabase.storage
      .from(bucketID)
      .upload(`/${file.name}`, fileBase64, { contentType: mimetype });
  }

  console.log("bucketExists:", bucketExists);
  console.log("bucketExistsError:", bucketExistsError);

  console.log("buckets have been seeded!");
};

const emptyBucket = async (bucketID) => {
  await supabase.storage.emptyBucket(bucketID);
};

seedBuckets();
