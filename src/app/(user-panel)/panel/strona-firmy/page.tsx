import React from "react";
import Link from "next/link";

import { api } from "~/trpc/server";
import { routes } from "~/routes/routes";

import { buttonVariants } from "~/components/common";

import { DndCompanySections } from "~/components/panel/company-page/dnd-company-sections";
import { DndCompanySidebar } from "~/components/panel/company-page/dnd-company-sidebar";

import { ChevronRight } from "lucide-react";

const CompanyPage = async () => {
  const company = await api.user.getUserCompany.query().catch(err => {
    console.log(err);
    return undefined;
  });
  const slug = company?.slug;

  return (
    <div className={"flex flex-col gap-4"}>
      {slug ? (
        <Link
          href={routes.companyPage(slug)}
          className={buttonVariants({
            size: "sm",
            className: "w-fit",
          })}
        >
          Przejdź do strony firmy
          <ChevronRight size={16} className={"ml-2"} />
        </Link>
      ) : null}
      <div className={"grid grid-cols-1 gap-4 md:grid-cols-6"}>
        <DndCompanySections className={"md:col-span-4"} />
        <DndCompanySidebar className={"md:col-span-2"} />
      </div>
    </div>
  );
};

export default CompanyPage;
