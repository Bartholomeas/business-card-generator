import React from "react";


import Link from "next/link";


import { routes } from "~/routes/routes";
import { api } from "~/trpc/server";

import { Heading } from "~/components/common";
import { CompanyPreviewCard } from "~/components/panel/company/list/company-preview-card";

// const DndCompanySections = dynamic(() => import("~/components/panel/company/sections/dnd-company-sections").then((mod) => mod.DndCompanySections));
// const DndCompanySidebar = dynamic(() => import("~/components/panel/company/sections/dnd-company-sidebar").then((mod) => mod.DndCompanySidebar));


const UserCompaniesListPage = async () => {
  const companies = await api.company.getUserCompany.query();

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {companies.map((company) => (
          <CompanyPreviewCard
            key={company.id}
            company={company}
          />
        ))}
      </div>
    </div>
  );
};

export default UserCompaniesListPage;
