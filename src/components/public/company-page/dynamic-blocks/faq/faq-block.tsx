import { Suspense } from "react";

import { FaqSection } from "~/components/public/company-page/dynamic-blocks/faq/faq-section";
import { FaqSectionSkeleton } from "~/components/public/company-page/dynamic-blocks/faq/faq-section-skeleton";

interface FaqBlockProps {
	id: string | undefined;
}

export const FaqBlock = ({ id }: FaqBlockProps) => (
	<Suspense key={id} fallback={<FaqSectionSkeleton />}>
		<FaqSection id={id} />
	</Suspense>
);
