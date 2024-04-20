import { Suspense } from "react";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import { CompanyHeader } from "~/components/public/company-page/company-header";
import Loading from "~/app/loading";
import { type NextPageParamsProp } from "~/types/next.types";

export const dynamic = "force-dynamic";

const CompanyPage = async ({ params: { slug } }: NextPageParamsProp<{ slug: string }>) => {
  const company = await api.company.getCompanyBySlug.query({ slug }).catch(() => {
    notFound();
  });

  return (
    <div className={"container relative flex flex-col gap-4 py-12"}>
      <Suspense fallback={<Loading />}>
        <CompanyHeader company={company} />
      </Suspense>
    </div>
  );
};
export default CompanyPage;