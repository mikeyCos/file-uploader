const prisma = require("./prisma");
const bcrypt = require("bcryptjs");

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

  console.log(accounts);

  /* const folder = await prisma.folder.create({
    data: {
      name: "Folder 0",
      account: {
        connect: { id: account.id },
      },
    },
    include: {
      files: true,
    },
  });

  const file = await prisma.file.create({
    data: {
      name: "A file in Folder 0",

      account: {
        connect: { id: account.id },
      },
    },
  });

  console.log("before creating folder");
  console.log("account:", account);

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
  console.log("db has been seeded");
};

// seedDB();

const emptyDB = async () => {
  await prisma.account.deleteMany();
  console.log("db has been emptied");
};

module.exports = { emptyDB, seedDB };
