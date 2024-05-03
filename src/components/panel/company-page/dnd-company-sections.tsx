"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Reorder } from "framer-motion";
import { type DndSection } from "~/types/panel/company-page.types";
import { Card } from "~/components/common";
import { cn } from "~/utils";

const DndSectionItem = dynamic(() =>
  import("~/components/panel/company-page/dnd-section-item").then(res => res.DndSectionItem),
);

const initialItems: DndSection[] = [
  {
    id: "asdasdaw45a4as",
    code: "faqSection",
  },
  {
    id: "ghffgdasdaw45a4asSA$as",
    code: "opinionsSection",
  },
  {
    id: "ASDasdfjh8",
    code: "commentsSection",
  },
];

interface DndCompanySectionsProps {
  className?: string;
}

const DndCompanySections = ({ className }: DndCompanySectionsProps) => {
  const [sections, setSections] = useState<DndSection[]>(initialItems);
  console.log(sections);
  return (
    <Card className={cn("p-4", className)}>
      <Reorder.Group onReorder={setSections} values={sections} axis={"y"}>
        <div className={"flex flex-col gap-4"}>
          {sections.map((section, index) => (
            <DndSectionItem key={section.id} section={section} index={index} />
          ))}
        </div>
      </Reorder.Group>
    </Card>
  );
};

export { DndCompanySections };