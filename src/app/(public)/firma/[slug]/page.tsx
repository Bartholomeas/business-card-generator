import { Suspense } from "react";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";

import { CardStylesStoreProvider } from "~/stores/card";

import { CompanyHeader } from "~/components/public/company-page/company-header";
import Loading from "~/app/loading";

import { type NextPageParamsProp } from "~/types/next.types";
import { type BusinessCard } from "~/server/api/routers/card";

export const dynamic = "force-dynamic";

const CompanyPage = async ({ params: { slug } }: NextPageParamsProp<{ slug: string }>) => {
  const company = await api.company.getCompanyPageBySlug.query({ slug }).catch(() => {
    notFound();
  });

  return (
    <div className={"container relative flex min-h-screen flex-col gap-4 py-12"}>
      {company?.businessCard ? (
        <CardStylesStoreProvider card={company.businessCard as BusinessCard}>
          <Suspense fallback={<Loading />}>
            <CompanyHeader company={company} />
          </Suspense>
        </CardStylesStoreProvider>
      ) : null}
    </div>
  );
};

export default CompanyPage;