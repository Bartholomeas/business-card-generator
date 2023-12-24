import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.businessCard.deleteMany();
  await prisma.businessCardConfig.deleteMany();
  await prisma.userDetails.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  const test_one = await prisma.user.upsert({
    where: { email: "test@onet.pl" },
    update: {},
    create: {
      name: "jDoe",
      email: "test@onet.pl",
      firstName: "John",
      lastName: "Doe",
      password: "!23Haslo",
      userDetails: {
        create: {
          companies: {
            create: [
              {
                companyName: "John Company",
                nip: "837 283 172 85",
                regon: "23482034020",
                phoneNumber: "493 583 283",
                email: "jdoe@gmail.com",
                addressLine1: "St. Louis",
                addressLine2: "Somewhere it is",
                state: "Empire state of mind",
                country: "Poland",
              },
            ],
          },
          cards: {
            create: [
              {
                front: {
                  create: {
                    styles: JSON.stringify({ fontColor: "#f32", fontSize: 16 }),
                  },
                },
                back: {
                  create: {
                    styles: JSON.stringify({ fontColor: "#a39", fontSize: 16 }),
                  },
                },
                withQr: false,
              },
            ],
          },
        },
      },
    },
  });
  const test_two = await prisma.user.upsert({
    where: { email: "test2@onet.pl" },
    update: {},
    create: {
      name: "Mrln",
      email: "test2@onet.pl",
      firstName: "Marilyn",
      lastName: "Smith",
      password: "!23Haslo",
      userDetails: {
        create: {
          companies: {
            create: [
              {
                companyName: "Marilyn COMP.",
                nip: "432 283 172 85",
                regon: "23652034020",
                phoneNumber: "493 432 283",
                email: "mrln@gmail.com",
                addressLine1: "St. Louis",
                addressLine2: "Somewhere it is",
                state: "Empire state of mind",
                country: "Poland",
              },
            ],
          },
        },
      },
    },
  });

  console.log({ test_one, test_two });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
