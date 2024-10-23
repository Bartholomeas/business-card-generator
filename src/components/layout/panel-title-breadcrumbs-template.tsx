import React, { type PropsWithChildren } from 'react';

import { Heading } from "../common";
import { Breadcrumbs } from "../common/breadcrumbs";
import { type BreadcrumbSingleItem } from "../common/breadcrumbs/breadcrumbs.types";

interface PanelTitleBreadcrumbsTemplateProps extends PropsWithChildren {
  title?: string;
  breadcrumbs: BreadcrumbSingleItem[];
}
export const PanelTitleBreadcrumbsTemplate = ({ title, breadcrumbs, children }: PanelTitleBreadcrumbsTemplateProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs items={breadcrumbs} />
      {title ? <Heading type="h1" className="mb-2">{title}</Heading> : null}
      {children}
    </div>
  );
};
