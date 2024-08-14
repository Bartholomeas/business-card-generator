import { FaqBlock } from "~/components/public/company-page/dynamic-blocks/faq/faq-block";
import { CommentsBlock } from "~/components/public/company-page/dynamic-blocks/comments/comments-block";
import type { CompanyPageSectionTypes } from "~/server/api/routers/company";

interface CompanyPageSection {
  id: string | undefined;
  sectionType: CompanyPageSectionTypes;
}

export const renderSectionByType = ({ id, sectionType }: CompanyPageSection) => {
  switch (sectionType) {
    case "faqSection":
      return <FaqBlock key={id} id={id} />;
    case "opinionsSection":
      return <CommentsBlock key={id} id={id} />;
    case "commentsSection":
      return <CommentsBlock key={id} id={id} />;
    default:
      return null;
  }
};
