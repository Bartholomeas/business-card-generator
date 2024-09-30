import { Suspense } from "react";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";

import Loading from "~/app/loading";

import { CompanyHeader } from "~/components/public/company-page/company-header";

import { type NextPageParamsProp } from "~/types/next.types";
import { renderSectionByType } from "~/components/public/company-page/dynamic-blocks/render-section-by-type";

export const dynamic = "force-dynamic";

const CompanyPage = async ({ params: { slug } }: NextPageParamsProp<{ slug: string; }>) => {
  const companyPage = await api.company.getCompanyPageBySlug.query({ slug }).catch(() => {
    notFound();
  });

  return (
    <div className={"relative flex min-h-screen w-full flex-col gap-8 py-12"}>
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
