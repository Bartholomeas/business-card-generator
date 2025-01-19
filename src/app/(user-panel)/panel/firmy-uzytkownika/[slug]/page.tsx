import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import { type CompanyPageSectionTypes } from "@prisma/client";
import { ChevronRight } from "lucide-react";

import { routes } from "~/routes/routes";
import { api } from "~/trpc/server";

import { buttonVariants } from "~/components/common";
import { PanelTitleBreadcrumbsTemplate } from "~/components/layout/panel-title-breadcrumbs-template";
import { CompanyPublishToggle } from "~/components/panel/company/single/company-publish-toggle";
import { DndCompanySectionsSkeleton } from "~/components/panel/company/single/dnd-company-sections-skeleton";

import { type NextPageProps } from "~/types/next.types";

const DndCompanySections = dynamic(() => import("~/components/panel/company/single/dnd-company-sections").then((mod) => mod.DndCompanySections));
const DndCompanySidebar = dynamic(() => import("~/components/panel/company/single/dnd-company-sidebar").then((mod) => mod.DndCompanySidebar));

interface CompanyPageProps extends NextPageProps<{ slug: string; }> { }

const CompanyPage = async ({ params: { slug } }: CompanyPageProps) => {
  const companyData = await api.company.getCompanyPageSectionsVisibility.query({
    companySlug: slug,
  });

  console.log("Company data structure:", companyData); // Let's see the exact structure

  const breadcrumbs = [
    {
      label: "Lista firm",
      href: routes.userCompanies
    },
    {
      label: companyData?.company?.companyName ?? "Firma",
    },
  ];

  const sections = companyData?.sections.reduce((acc, curr) => {
    acc[curr.sectionType] = curr.isVisible;
    return acc;
  }, {} as Record<CompanyPageSectionTypes, boolean>);

  return (
    <PanelTitleBreadcrumbsTemplate
      title={companyData?.company?.companyName ?? "Firma"}
      breadcrumbs={breadcrumbs}>
      <div className={"flex flex-col gap-4"}>
        <div className="flex items-center justify-between">
          {companyData?.company && (
            <CompanyPublishToggle
              companyId={companyData.company.id}
              isPublished={Boolean(companyData.company.isPublished)}
            />
          )}
          {slug ? (
            <Link
              href={routes.companyPage(slug)}
              target="_blank"
              className={buttonVariants({
                size: "sm",
                className: "w-fit",
              })}
            >
              Przejdź do strony firmy
              <ChevronRight size={16} className={"ml-2"} />
            </Link>
          ) : null}
        </div>
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-6"}>
          <Suspense fallback={<DndCompanySectionsSkeleton />}>
            <DndCompanySections
              className={"md:col-span-4"}
              companySlug={slug}
              initialData={companyData}
            />
          </Suspense>
          {slug && sections ? <DndCompanySidebar
            className={"md:col-span-2"}
            companySlug={slug}
            sections={sections}
          />
            : null}
        </div>
      </div>
    </PanelTitleBreadcrumbsTemplate >
  );
};

export default CompanyPage;
