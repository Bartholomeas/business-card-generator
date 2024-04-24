"use client";

import { memo, useId } from "react";
import DOMPurify from "isomorphic-dompurify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/special/accordion";
import { Heading, headingVariants, textVariants } from "~/components/common";

interface FaqSingleItem {
  title: string;
  content: string;
  value: string | number;
}

interface FaqSectionProps {
  title?: string;
  data: FaqSingleItem[];
}

export const FaqSection = memo(({ title, data }: FaqSectionProps) => {
  const id = useId();

  return (
    <section className={"flex flex-col gap-2 pt-8"}>
      {title ? <Heading size={"h2"}>{title}</Heading> : null}
      <Accordion type="single" collapsible className="w-full">
        {data?.length > 0
          ? data?.map(({ title, content, value }) => (
              <AccordionItem key={`${value}-${title}-${id}`} value={`${value}-${id}`}>
                <AccordionTrigger
                  className={headingVariants({ size: "h4", color: "white", weight: "bold" })}
                >
                  {title}
                </AccordionTrigger>
                <AccordionContent className={textVariants()}>
                  {DOMPurify.sanitize(content)}
                </AccordionContent>
              </AccordionItem>
            ))
          : null}
      </Accordion>
    </section>
  );
});

FaqSection.displayName = "FaqSection";