import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.businessCard.deleteMany();
  await prisma.businessCardConfig.deleteMany();
  await prisma.textElement.deleteMany();
  await prisma.userDetails.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  const hashedPassword = await bcrypt.hash("!23Haslo", 12);

  const test_one = await prisma.user.upsert({
    where: { email: "test@onet.pl" },
    update: {},
    create: {
      name: "jDoe",
      email: "test@onet.pl",
      firstName: "John",
      lastName: "Doe",
      password: hashedPassword,
      userDetails: {
        create: {
          company: {
            create: {
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
          },
          cards: {
            create: {
              front: {
                create: {
                  styles: { fontColor: "#f32", fontSize: 16 },

                  textElements: {
                    create: [{ text: "xddd" }, { text: "test2" }],
                  },
                },
              },
              back: {
                create: {
                  styles: { fontColor: "#a39", fontSize: 16 },
                },
              },
              qrLink: "www.google.pl",
              generalStyles: { fontColor: "#8a39", fontSize: 16 },
            },
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
      password: hashedPassword,
      userDetails: {
        create: {
          company: {
            create: {
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
