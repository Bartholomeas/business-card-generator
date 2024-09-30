import { Suspense } from "react";
import { FaqSectionSkeleton } from "~/components/public/company-page/dynamic-blocks/faq/faq-section-skeleton";
import { FaqSection } from "~/components/public/company-page/dynamic-blocks/faq/faq-section";

interface FaqBlockProps {
  id: string | undefined;
}

export const FaqBlock = ({ id }: FaqBlockProps) => (
  <Suspense key={id} fallback={<FaqSectionSkeleton />}>
    <FaqSection id={id} />
  </Suspense>
);
