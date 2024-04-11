import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const setCardTextElementsByCompanyData = (companyData: Record<string, string>) =>
  Object.entries(companyData).map(([key, value]) => ({
    code: key,
    text: value,
  }));

const prisma = new PrismaClient();

async function main() {
  await prisma.businessCard.deleteMany();
  await prisma.businessCardConfig.deleteMany();
  await prisma.textElement.deleteMany();
  await prisma.userDetails.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();
  await prisma.businessCardTheme.deleteMany();

  const hashedPassword = await bcrypt.hash("!23Haslo", 12);

  await prisma.businessCardTheme.createMany({
    data: [
      {
        name: "Domyślna",
        code: "templateDefault",
        url: "/images/waves-abstract.webp",
      },
      {
        name: "Futura",
        code: "templateFutura",
        url: "/images/waves-abstract.webp",
      },
      {
        name: "Red Dot",
        code: "templateRedDot",
        url: "/images/waves-abstract.webp",
      },
    ],
  });

  const userOneCompany = {
    companyName: "John Company",
    ownerName: "John Doe",
    nip: "837 283 172 85",
    regon: "23482034020",
    phoneNumber: "493 583 283",
    email: "jdoe@gmail.com",
    city: "Washington",
    addressLine1: "Groove St. 123",
    state: "State",
    country: "Poland",
  };

  const companyOneDefaultTextElements = setCardTextElementsByCompanyData(userOneCompany);
  await prisma.user.upsert({
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
            create: userOneCompany,
          },
          cards: {
            create: {
              front: {
                create: {
                  styles: { fontColor: "#f32", fontSize: 16 },

                  textElements: {
                    create: [
                      {
                        text: "John Doe",
                      },
                      {
                        text: "123 123 123",
                        color: "#f32",
                      },
                    ],
                  },
                },
              },
              back: {
                create: {
                  styles: { fontColor: "#a39", fontSize: 16 },
                },
              },
              qrLink: "www.google.pl",
              defaultTextElements: { create: companyOneDefaultTextElements },
              generalStyles: { fontColor: "#8a39", fontSize: 16 },
            },
          },
        },
      },
    },
  });

  const userTwoCompany = {
    companyName: "Marilyn COMP.",
    nip: "432 283 172 85",
    regon: "23652034020",
    phoneNumber: "493 432 283",
    email: "mrln@gmail.com",
    addressLine1: "St. Louis",
    addressLine2: "Somewhere it is",
    state: "Empire state of mind",
    country: "Poland",
  };
  const companyTwoDefaultTextElements = setCardTextElementsByCompanyData(userOneCompany);

  await prisma.user.upsert({
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
          cards: {
            create: { defaultTextElements: { create: companyTwoDefaultTextElements } },
          },
          company: {
            create: userTwoCompany,
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });