import React from "react";

import { api } from "~/trpc/server";

import { PanelTitleBreadcrumbsTemplate } from "~/components/layout/panel-title-breadcrumbs-template";
import { CompanyPreviewCard } from "~/components/panel/company/list/company-preview-card";

const breadcrumbs = [
  {
    label: "Lista firm"
  },
];

const UserCompaniesListPage = async () => {
  const companies = await api.company.getUserCompanies.query();

  return (
    <PanelTitleBreadcrumbsTemplate
      title="Twoje firmy"
      breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {companies.map((company) => (
          <CompanyPreviewCard
            key={company.id}
            company={company}
          />
        ))}
      </div>
    </PanelTitleBreadcrumbsTemplate>
  );
};

export default UserCompaniesListPage;
