import { Suspense } from "react";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";

import { CardStylesStoreProvider } from "~/stores/card";

import Loading from "~/app/loading";

import { CompanyHeader } from "~/components/public/company-page/company-header";
import { FaqSection } from "~/components/public/company-page/faq-section";

import { type NextPageParamsProp } from "~/types/next.types";

export const dynamic = "force-dynamic";

const CompanyPage = async ({ params: { slug } }: NextPageParamsProp<{ slug: string }>) => {
  const company = await api.company.getCompanyPageBySlug.query({ slug }).catch(() => {
    notFound();
  });
  console.log("COMPANY", company);

  return (
    <div className={"container-lg relative flex min-h-screen flex-col gap-8 py-12"}>
      {company?.businessCard ? (
        <CardStylesStoreProvider card={company.businessCard}>
          <Suspense fallback={<Loading />}>
            <CompanyHeader company={company} />
          </Suspense>
          <FaqSection
            title={"Częste pytania"}
            data={MOCK_FAQ.map((el, index) => ({
              ...el,
              value: index,
            }))}
          />
        </CardStylesStoreProvider>
      ) : null}
    </div>
  );
};

export default CompanyPage;

const MOCK_FAQ = [
  {
    title: "Pierwsze pytanie",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla at ante aliquet
  egestas. Suspendisse vitae mi eget urna pellentesque tempor.Phasellus fringilla diam eget
  mauris luctus, quis dapibus ligula malesuada.Orci varius natoque penatibus et magnis dis
  parturient montes, nascetur ridiculus mus. Curabitur imperdiet odio a ligula iaculis
  dignissim. Ut bibendum at ipsum fringilla consectetur.`,
  },
  {
    title: "Drugie pytanie",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla at ante aliquet
  egestas. Suspendisse vitae mi eget urna pellentesque tempor.Phasellus fringilla diam eget
  mauris luctus, quis dapibus ligula malesuada.Orci varius natoque penatibus et magnis dis
  parturient montes, nascetur ridiculus mus. Curabitur imperdiet odio a ligula iaculis
  dignissim. Ut bibendum at ipsum fringilla consectetur.`,
  },
  {
    title: "Trzecie pytanie",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla at ante aliquet
  egestas. Suspendisse vitae mi eget urna pellentesque tempor.Phasellus fringilla diam eget
  mauris luctus, quis dapibus ligula malesuada.Orci varius natoque penatibus et magnis dis
  parturient montes, nascetur ridiculus mus. Curabitur imperdiet odio a ligula iaculis
  dignissim. Ut bibendum at ipsum fringilla consectetur.`,
  },
];