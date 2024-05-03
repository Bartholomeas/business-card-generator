import React from "react";
import Link from "next/link";

import { api } from "~/trpc/server";
import { routes } from "~/routes/routes";

import { buttonVariants, Card } from "~/components/common";
import { DndCompanySections } from "~/components/panel/company-page/dnd-company-sections";

import { ChevronRight } from "lucide-react";

const CompanyPage = async () => {
  const company = await api.user.getUserCompany.query();
  const slug = company?.slug;

  return (
    <div className={"flex flex-col gap-4"}>
      {slug ? (
        <Link
          href={routes.companyPage(slug)}
          className={buttonVariants({
            variant: "link",
            size: "sm",
            className: "w-fit bg-primary-400",
          })}
        >
          Przejdź do strony firmy
          <ChevronRight size={16} className={"ml-2"} />
        </Link>
      ) : null}
      <div className={"grid grid-cols-1 gap-4 md:grid-cols-6"}>
        <DndCompanySections className={"md:col-span-4 xl:col-span-5"} />
        <Card className="flex w-full flex-col gap-12 space-y-6 md:col-span-2 xl:col-span-1">
          <p>XD</p>
        </Card>
      </div>
    </div>
  );
};

export default CompanyPage;