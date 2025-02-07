const prisma = require("./prisma");
const bcrypt = require("bcryptjs");

const accounts = Promise.all(
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
  await prisma.folder.deleteMany();
  await prisma.account.createMany({
    data: await accounts,
  });

  /* const account = await prisma.account.create({
    data: {
      name: "Bill Dauterive",
      username: "bill_dozer",
      email: "bill.d@gmail.com",
      password: "Test123!",
      folders: {
        create: {
          name: "test",
        },
      },
    },
    include: {
      folders: true,
    },
  });

  console.log(account); */
};

seedDB();
