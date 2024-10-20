import React from "react";


import Link from "next/link";


import { routes } from "~/routes/routes";
import { api } from "~/trpc/server";

import { Heading } from "~/components/common";

// const DndCompanySections = dynamic(() => import("~/components/panel/company-page/sections/dnd-company-sections").then((mod) => mod.DndCompanySections));
// const DndCompanySidebar = dynamic(() => import("~/components/panel/company-page/sections/dnd-company-sidebar").then((mod) => mod.DndCompanySidebar));


const UserCompaniesListPage = async () => {
  const company = await api.user.getUserCompany.query();
  // const slug = company?.slug;
  console.log("HIHIHIHI:", company);
  // const companySectionsVisibility = await api.company.getCompanyPageSectionsVisibility.query({
  //   companySlug: slug,
  // });

  // const sections = companySectionsVisibility.reduce((acc, curr) => {
  //   acc[curr.sectionType] = curr.isVisible;
  //   return acc;
  // }, {} as Record<CompanyPageSectionTypes, boolean>);

  return (
    <div className="flex flex-col gap-2">
      <Heading type='h1'>Twoje firmy</Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {company.map((c) => (
          <Link href={routes.companyPage(c.slug)} key={c.id}>{c.companyName}</Link>
        ))}
      </div>
    </div>
    // <div className={"flex flex-col gap-4"}>
    //   {slug ? (
    //     <Link
    //       href={routes.companyPage(slug)}
    //       target="_blank"
    //       className={buttonVariants({
    //         size: "sm",
    //         className: "w-fit",
    //       })}
    //     >
    //       Przejdź do strony firmy
    //       <ChevronRight size={16} className={"ml-2"} />
    //     </Link>
    //   ) : null}
    //   <div className={"grid grid-cols-1 gap-4 md:grid-cols-6"}>
    //     <DndCompanySections className={"md:col-span-4"} />
    //     {slug ? <DndCompanySidebar
    //       className={"md:col-span-2"}
    //       companySlug={slug}
    //       sections={sections}
    //     />
    //       : null}
    //   </div>
    // </div>
  );
};

export default UserCompaniesListPage;
