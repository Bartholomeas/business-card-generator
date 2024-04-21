import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

const setCardTextElementsByCompanyData = (companyData: Record<string, string | boolean>) =>
  Object.entries(companyData)
    .filter(([_, val]) => typeof val !== "boolean")
    .map(([key, value]) => {
      return {
        code: key,
        text: value as string,
      };
    });

const prisma = new PrismaClient();

async function main() {
  try {
    await Promise.all([
      prisma.userDetailsOnCompany.deleteMany(),
      prisma.businessCard.deleteMany(),
      prisma.businessCardConfig.deleteMany(),
      prisma.textElement.deleteMany(),
      prisma.userDetails.deleteMany(),
      prisma.user.deleteMany(),
      prisma.company.deleteMany(),
      prisma.businessCardTheme.deleteMany(),
    ]);

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

    const user1CompanyData = {
      companyName: "John Company",
      slug: "john-company",
      ownerName: "John Doe",
      nip: "837 283 172 85",
      regon: "23482034020",
      phoneNumber: "493 583 283",
      email: "jdoe@gmail.com",
      city: "Washington",
      addressLine1: "Groove St. 123",
      state: "State",
      country: "Poland",
      isPublished: true,
    };

    const user1Data = {
      email: "test@kwirk.com",
      name: "jDoe",
      firstName: "John",
      lastName: "Doe",
      password: hashedPassword,
    };

    const user1 = await prisma.user.upsert({
      where: {
        email: user1Data.email,
      },
      update: {},
      create: user1Data,
    });

    const user1Details = await prisma.userDetails.create({
      data: {
        userId: user1.id,
      },
    });

    const user1Company = await prisma.company.create({
      data: user1CompanyData,
    });

    const companyOneDefaultTextElements = setCardTextElementsByCompanyData(user1CompanyData);
    const user1BusinessCard = await prisma.businessCard.create({
      data: {
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
        generalStyles: { fontColor: "#8a9", fontSize: 16 },
        defaultTextElements: { create: companyOneDefaultTextElements },
        qrLink: "www.google.pl",
      },
    });

    // connectedBusinessCardWithCompany
    await prisma.businessCard.update({
      where: {
        id: user1BusinessCard.id,
      },
      data: {
        company: {
          connect: {
            id: user1Company.id,
          },
        },
      },
    });

    // user1DetailsOnCompany
    await prisma.userDetailsOnCompany.create({
      data: {
        userDetailsId: user1Details.id,
        companyId: user1Company.id,
      },
    });

    //    user1DetailsOnBusinessCard
    await prisma.userDetailsOnBusinessCard.create({
      data: {
        userDetailsId: user1Details.id,
        businessCardId: user1BusinessCard.id ?? "XDDD",
      },
    });

    // const userTwoCompany = {
    //   companyName: "Marilyn COMP.",
    //   nip: "432 283 172 85",
    //   regon: "23652034020",
    //   phoneNumber: "493 432 283",
    //   email: "mrln@gmail.com",
    //   addressLine1: "St. Louis",
    //   addressLine2: "Somewhere it is",
    //   state: "Empire state of mind",
    //   country: "Poland",
    // };
  } catch (err) {
    console.error({ SeedError: err });
  }
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