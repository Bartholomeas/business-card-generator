import {
  DndTemplateComments,
  DndTemplateFaq,
} from "~/components/panel/company-page/dnd-section-templates";
import type { CompanyPageSectionTypes } from "~/server/api/routers/company";

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