import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

const LOREM_MESSAGE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla at ante aliquet egestas. Suspendisse vitae mi eget urna pellentesque tempor.Phasellus fringilla diam eget mauris luctus, quis dapibus ligula malesuada.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur imperdiet odio a ligula iaculis dignissim. Ut bibendum at ipsum fringilla consectetur.";

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
      prisma.company.deleteMany(),
      prisma.businessCard.deleteMany(),
      prisma.businessCardConfig.deleteMany(),
      prisma.textElement.deleteMany(),
      prisma.userDetails.deleteMany(),
      prisma.user.deleteMany(),
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
    // const user2Data = {
    //   email: "test@kwirk.com",
    //   name: "jDoe",
    //   firstName: "John",
    //   lastName: "Doe",
    //   password: hashedPassword,
    // };

    const user1 = await prisma.user.upsert({
      where: {
        email: user1Data.email,
      },
      update: {},
      create: user1Data,
    });
    // const user2 = await prisma.user.upsert({
    //   where: {
    //     email: user2Data.email,
    //   },
    //   update: {},
    //   create: user2Data,
    // });

    const user1Details = await prisma.userDetails.create({
      data: {
        userId: user1.id,
      },
    });
    // const user2Details = await prisma.userDetails.create({
    //   data: {
    //     userId: user2.id,
    //   },
    // });

    const user1FaqSection = await prisma.faqSection.create({
      data: {
        title: "Częste pytania",
        items: {
          create: [
            {
              title: "Co oferujemy?",
              content: LOREM_MESSAGE,
            },
            {
              title: "Jaka gwarancja obowiązuje?",
              content: LOREM_MESSAGE,
            },
            {
              title: "W jaki sposób wyceniacie usługę?",
              content: LOREM_MESSAGE,
            },
          ],
        },
      },
    });

    const user1OpinionsSection = await prisma.opinionsSection.create({
      data: {
        title: "Opinie użytkowników",
        items: {
          create: [
            {
              content: "Super firma, polecam",
              userDetailsId: user1Details.id,
            },
          ],
        },
      },
    });
    const user1CommentsSection = await prisma.commentsSection.create({
      data: {
        title: "Komentarze",
        items: {
          create: [
            {
              content: "Komentarz 1 Lorem ipsum dolor sit amet, consectetur adipiscing",
              userDetailsId: user1Details.id,
            },
            {
              content: "Komentarz 2 Lorem ipsum dolor sit amet, consectetur adipiscing",
              userDetailsId: user1Details.id,
            },
            {
              content: "Komentarz 3 Lorem ipsum dolor sit amet, consectetur adipiscing",
              userDetailsId: user1Details.id,
            },
          ],
        },
      },
    });

    const user1Company = await prisma.company.create({
      data: {
        ...user1CompanyData,
        companyPage: {
          create: {
            sections: {
              create: [
                {
                  sectionType: "faqSection",
                  faqSection: {
                    connect: {
                      id: user1FaqSection.id,
                    },
                  },
                },
                {
                  sectionType: "opinionsSection",
                  opinionsSection: {
                    connect: {
                      id: user1OpinionsSection.id,
                    },
                  },
                },
                {
                  sectionType: "commentsSection",
                  commentsSection: {
                    connect: {
                      id: user1CommentsSection.id,
                    },
                  },
                },
              ],
            },
          },
        },
      },
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

    // user1DetailsOnCompany;
    await prisma.userDetailsOnCompany.create({
      data: {
        userDetailsId: user1Details.id,
        companyId: user1Company.id,
      },
    });

    // user1DetailsOnBusinessCard;
    await prisma.userDetailsOnBusinessCard.create({
      data: {
        userDetailsId: user1Details.id,
        businessCardId: user1BusinessCard.id,
      },
    });

    // if (user1Company.slug) {
    //   // user1Company
    //   const user1CompanyPage = await prisma.companyPage.create({
    //     data: {
    //       slug: user1Company.slug,
    //       // sections:  [{
    //       //
    //       // }]
    //     },
    //   });
    // }

    // const user1CompanyPageSections = await prisma.companyPageSection.create({
    //   data: {
    //     sectionType: "CommentsSection",
    //     faqSectionId: user1FaqSection.id,
    //     companyPageId: user1CompanyPage?.id,
    //   },
    // });

    // const user1CompanyPageFaqSection = await prisma.companyPageSection.create({
    //   data: {
    //     sectionType: "CommentsSection",
    //     companyPageId: user1CompanyPage.id,
    //   },
    // });
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