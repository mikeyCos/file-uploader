const prisma = require("./prisma");
const bcrypt = require("bcryptjs");
const seedBucket = require("./seed_bucket");

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
  await prisma.account.deleteMany();
  // await prisma.file.deleteMany();
  // await prisma.folder.deleteMany();

  const accounts = await prisma.account.createManyAndReturn({
    data: await accountsArr,
  });

  const billDozer = await prisma.account.findFirst({
    where: {
      id: accounts[0].id,
    },
  });

  // Create folders for user bill_dozer
  const folders = await prisma.folder.createManyAndReturn({
    data: [
      {
        name: "Folder 0",
        accountId: billDozer.id,
      },
      {
        name: "Folder 1",
        accountId: billDozer.id,
      },
    ],
  });

  // userID, folderIDs, bucketID = "drives", filesPath
  await seedBucket(billDozer.id, folders);
  // Create files for user bill_dozer
  /* await prisma.file.createMany({
    data: [
      {
        name: "A file not in a folder",
        accountId: billDozerAfterFolder.id,
      },
      {
        name: "A file in folder 0",
        accountId: accounts[0].id,
        folderId: billDozerAfterFolder.folders[0].id,
      },
      {
        name: "A file 0",
        accountId: billDozerAfterFolder.id,
      },
    ],
  }); */

  const billDozerAfterSeed = await prisma.account.findFirst({
    where: {
      id: accounts[0].id,
    },
    include: {
      folders: {
        include: {
          files: true,
        },
      },
      files: true,
    },
  });

  console.log("billDozerAfterSeed:", billDozerAfterSeed);

  /*

  console.log("after creating folder");
  console.log("folder:", folder);

  const accountAfterCreatingFolder = await prisma.account.findFirst({
    where: {
      id: account.id,
    },
    include: {
      folders: {
        include: {
          files: true,
        },
      },
      files: true,
    },
  });

  console.log("accountAfterCreatingFolder:", accountAfterCreatingFolder); */
  /* const account = await prisma.account.create({
    data: {
      name: "Luanne Platter",
      username: "platter_lp",
      email: "lp_barber@gmail.com",
      password: "manGer1&BabY",
      folders: {
        create: [
          {
            name: "Folder 0",
            files: {
              create: {
                name: "A file",
              },
            },
          },
          {
            name: "Folder 1",
          },
        ],
      },
    },
    include: {
      folders: {
        include: {
          files: true,
        },
      },
    },
  }); */
  // console.log("account.folders:", account.folders);
  // console.log("account.folders[0].files:", account.folders[0].files);
  console.log("db has been seeded!");
};

const emptyDB = async () => {
  await prisma.account.deleteMany();
  console.log("db has been emptied");
};

module.exports = { emptyDB, seedDB };
