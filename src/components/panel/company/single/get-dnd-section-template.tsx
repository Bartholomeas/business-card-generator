import type { CompanyPageSectionTypes } from "~/server/api/routers/company";

import {
  DndTemplateComments,
  DndTemplateFaq,
} from "~/components/panel/company/single/dnd-section-templates";

export const getDndSectionTemplate = (code: CompanyPageSectionTypes | undefined) => {
  switch (code) {
    case "faqSection":
      return <DndTemplateFaq />;
    case "commentsSection":
      return <DndTemplateComments />;
    case "opinionsSection":
      return <DndTemplateFaq />;
    default:
      return null;
  }
};
