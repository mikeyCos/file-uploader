const prisma = require("./prisma");

const seedDB = async () => {
  await prisma.account.deleteMany();
  // await prisma.account.createMany({
  //   data: [
  //     {
  //       name: "Bill Dauterive",
  //       username: "bill_dozer",
  //       email: "bill.d@gmail.com",
  //       password: "Test123!",
  //       folders: {
  //         create: {

  //         }
  //       }
  //     },
  //     {
  //       name: "Kahn Souphanousinphone",
  //       username: "kBanana",
  //       email: "kahntheman@gmail.com",
  //       password: "Foobar2#",
  //     },
  //     {
  //       name: "Peggy Hill",
  //       username: "spa-peggy",
  //       email: "peggyTeaches@gmail.com",
  //       password: "inEspan456*",
  //     },
  //     {
  //       name: "Luanne Platter",
  //       username: "platter_lp",
  //       email: "lp_barber@gmail.com",
  //       password: "manGer1&BabY",
  //     },
  //   ],
  // });
};

seedDB();
