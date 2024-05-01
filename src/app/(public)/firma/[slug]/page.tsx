import { Suspense } from "react";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";

import Loading from "~/app/loading";

import { CompanyHeader } from "~/components/public/company-page/company-header";

import { type NextPageParamsProp } from "~/types/next.types";
import { renderSectionByType } from "~/components/public/company-page/render-section-by-type";

export const dynamic = "force-dynamic";

const CompanyPage = async ({ params: { slug } }: NextPageParamsProp<{ slug: string }>) => {
  const companyPage = await api.company.getCompanyPageBySlug.query({ slug }).catch(() => {
    notFound();
  });
  // const section = await api.company.getFaqSection.query({ id: companyPage?.sections?.[0]?.id });

  return (
    <div className={"container-lg relative flex min-h-screen flex-col gap-8 py-12"}>
      <Suspense fallback={<Loading />}>
        <CompanyHeader slug={slug} />
        {companyPage?.sections
          ? companyPage.sections.map(({ id, sectionType }) =>
              renderSectionByType({
                id,
                sectionType,
              }),
            )
          : null}
      </Suspense>
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