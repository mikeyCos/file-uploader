// Use the JS library to create a bucket.
const supabase = require("./supabase");

const seed_buckets = async () => {
  // Use the JS library to create a bucket.
  // const { data, error } = await supabase.storage.createBucket("avatars", {
  //   public: true,
  // });

  // const { data, error } = await supabase.storage.createBucket("avatars");

  // There is no data returned
  // There is no error returned
  // ** Need to turn off RLS **
  // To allow any user to read data
  //  Update policy
  const { data, error } = await supabase.from("Users").select();

  // Returns error
  //  {
  //    code: '42501',
  //    details: null,
  //    hint: null,
  //    message: 'new row violates row-level security policy for table "Users"'
  //  }
  /* const { data, error } = await supabase
    .from("Users")
    .insert({ username: "Ash" }); */

  console.log("data:", data);
  console.log("error:", error);
};

seed_buckets();
