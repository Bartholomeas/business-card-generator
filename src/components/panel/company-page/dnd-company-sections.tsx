"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Reorder } from "framer-motion";

import { type DndSection } from "~/types/panel/company-page.types";
import { cn } from "~/utils";

import { Card } from "~/components/common";
import { type DndSectionItemProps } from "~/components/panel/company-page/dnd-section-item";

const DndSectionItem = dynamic<DndSectionItemProps>(() =>
  import("~/components/panel/company-page/dnd-section-item").then(res => res.DndSectionItem),
);

const initialItems: DndSection[] = [
  {
    id: "916b5cdf-5df7-4fff-9954-86ea856351ec",
    code: "faqSection",
  },
  {
    id: "ceb0dd4e-cf26-47b3-a17d-5134c4140a30",
    code: "opinionsSection",
  },
  {
    id: "1a0d2432-583a-4f03-b7cf-a0ede45fcd9c",
    code: "commentsSection",
  },
];

interface DndCompanySectionsProps {
  className?: string;
}

const DndCompanySections = ({ className }: DndCompanySectionsProps) => {
  const [sections, setSections] = useState<DndSection[]>(initialItems);
  return (
    <Card className={cn("p-4", className)}>
      <Reorder.Group onReorder={setSections} values={sections} axis={"y"}>
        <div className={"flex flex-col gap-4"}>
          {Array.isArray(sections)
            ? sections?.map((section, index) => (
                <DndSectionItem key={section?.id} section={section} index={index} />
              ))
            : null}
        </div>
      </Reorder.Group>
    </Card>
  );
};

export { DndCompanySections };
