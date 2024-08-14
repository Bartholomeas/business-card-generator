import React from "react";
import Link from "next/link";

import { api } from "~/trpc/server";
import { routes } from "~/routes/routes";

import { buttonVariants } from "~/components/common";

import { ChevronRight } from "lucide-react";

const CompanyPage = async () => {
  const company = await api.user.getUserCompany.query();
  const slug = company?.slug;

  return (
    <div className="flex w-full flex-col gap-12 space-y-6">
      Strona firmy
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
    </div>
  );
};

export default CompanyPage;