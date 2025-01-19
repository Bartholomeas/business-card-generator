import React from "react";

import { api } from "~/trpc/server";

import { PanelTitleBreadcrumbsTemplate } from "~/components/layout/panel-title-breadcrumbs-template";
import { CompanyPreviewCard } from "~/components/panel/company/list/company-preview-card";
import { CreateCompanyButton } from "~/components/panel/company/list/create-company-button";
import { GenericErrorBox } from "~/components/special/generic-error-box";

const breadcrumbs = [
  {
    label: "Lista firm"
  },
];

const UserCompaniesListPage = async () => {
  try {
    const companies = await api.company.getUserCompanies.query();

    const logosPromises = companies.map(company =>
      company.logoId
        ? api.file.getFile.query({ fileId: company.logoId }).catch(() => null)
        : Promise.resolve(null)
    );
    const logos = await Promise.all(logosPromises);

    return (
      <PanelTitleBreadcrumbsTemplate
        title="Twoje firmy"
        breadcrumbs={breadcrumbs}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {companies?.map((company, index) => (
            <CompanyPreviewCard
              key={company.id}
              company={company}
              logoUrl={logos[index]?.url}
            />
          ))}
        </div>
        <CreateCompanyButton />
      </PanelTitleBreadcrumbsTemplate>
    );
  } catch (err) {
    console.error("Error in UserCompaniesListPage:", err);
    return (
      <GenericErrorBox title="Nie udało się załadować firm">
        <p className="text-sm text-muted-foreground">
          Spróbuj odświeżyć stronę lub zaloguj się ponownie
        </p>
        <CreateCompanyButton />
      </GenericErrorBox>
    );
  }
};

export default UserCompaniesListPage;
