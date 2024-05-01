import DOMPurify from "isomorphic-dompurify";

import { api } from "~/trpc/server";

import { Heading, headingVariants, textVariants } from "~/components/common";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/special/accordion";

interface FaqSectionProps {
  id: string | undefined;
}

export const FaqSection = async ({ id }: FaqSectionProps) => {
  const section = await api.company.getFaqSection.query({ id });
  const faqQuestions = section?.items ?? undefined;

  if (!faqQuestions) return null;
  return (
    <section className={"flex flex-col gap-2 pt-8"}>
      {section?.title ? (
        <Heading size={"h2"} className={"mb-4"}>
          {section?.title}
        </Heading>
      ) : null}
      <Accordion type="single" collapsible className="w-full">
        {faqQuestions
          ? faqQuestions.map(({ title, content }, index) => (
              <AccordionItem key={`${title}-${index}`} value={`${title}-${index}`}>
                <AccordionTrigger
                  className={headingVariants({ size: "h4", color: "white", weight: "semibold" })}
                >
                  {title}
                </AccordionTrigger>
                <AccordionContent className={textVariants({ size: "sm" })}>
                  {DOMPurify.sanitize(content)}
                </AccordionContent>
              </AccordionItem>
            ))
          : null}
      </Accordion>
    </section>
  );
};