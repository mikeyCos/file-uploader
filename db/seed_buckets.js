// Use the JS library to create a bucket.
const supabase = require("./supabase");
const prisma = require("./prisma");

const seed_buckets = async () => {
  // Check if bucket exists
  //  If bucket exists, empty
  //  Else, create bucket
  const { data, error } = await supabase.storage.createBucket("drives");
  // const { data, error } = await supabase.storage.createBucket("avatars");
  // Use the JS library to create a bucket.
  // const { data, error } = await supabase.storage.createBucket("something");
  // console.log("data:", data);
  // console.log("error:", error);
  // How to seed bucket with files?
};

seed_buckets();
