const { prisma } = require("./prisma");
const bcrypt = require("bcryptjs");
const { seedBucket, emptyBucket } = require("./seed_bucket");
const supabase = require("./supabase");

const accountsArr = Promise.all(
  [
    {
      name: "Bill Dauterive",
      username: "bill_dozer",
      email: "bill.d@gmail.com",
      password: "Test123!",
    },
    {
      name: "Kahn Souphanousinphone",
      username: "kBanana",
      email: "kahntheman@gmail.com",
      password: "Foobar2#",
    },
    {
      name: "Peggy Hill",
      username: "spa-peggy",
      email: "peggyTeaches@gmail.com",
      password: "inEspan456*",
    },
    {
      name: "Luanne Platter",
      username: "platter_lp",
      email: "lp_barber@gmail.com",
      password: "manGer1&BabY",
    },
  ].map(async (account) => {
    const { password, ...rest } = account;
    const hashedPassword = await bcrypt.hash(password, 10);
    return { ...rest, password: hashedPassword };
  })
)
  .then((resolve) => resolve)
  .catch((err) => console.log(err.message));

const seedDB = async () => {
  await emptyDB();
  // await prisma.account.deleteMany();
  // await prisma.file.deleteMany();
  // await prisma.folder.deleteMany();

  const [billDauterive, kahnSouphanousinphone, peggyHill] =
    await prisma.account.createManyAndReturn({
      data: await accountsArr,
    });

  // Create folders at the root for user bill_dozer
  await prisma.folder.createManyAndReturn({
    data: [
      {
        name: "Folder 0",
        accountId: billDauterive.id,
      },
      {
        name: "Folder 1",
        accountId: billDauterive.id,
      },
    ],
  });

  await prisma.folder.create({
    include: {},
    data: {
      name: "Folder with subfolders",
      accountId: billDauterive.id,
      subFolders: {
        create: [
          {
            name: "Subfolder 0",
            accountId: billDauterive.id,
            // parentId: folders[0].id,
            subFolders: {
              create: [
                {
                  name: "Folder in subfolder 0",
                  accountId: billDauterive.id,
                },
              ],
            },
          },
          {
            name: "Subfolder 1",
            accountId: billDauterive.id,
          },
        ],
      },
    },
  });

  const folders = await prisma.folder.findMany();

  // Create files for user bill_dozer
  // userID, folderIDs, bucketID = "drives", filesPath
  // await seedBucket(billDozer.id, folders);

  const billDauteriveAfterSeed = await prisma.account.findFirst({
    where: {
      id: billDauterive.id,
    },
    include: {
      folders: {
        include: {
          files: true,
          subFolders: true,
          parentFolder: {
            include: {
              subFolders: true,
            },
          },
        },
      },
      files: true,
    },
  });

  console.log("db has been seeded!");
};

const emptyDB = async () => {
  /* await prisma.file.deleteMany();
  await prisma.folder.deleteMany();
  await prisma.account.deleteMany(); */
  await prisma.account.deleteMany();
  await emptyBucket();
  console.log("db has been emptied");
};

module.exports = { emptyDB, seedDB };
