"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { Reorder } from "framer-motion";

import { cn } from "~/utils";

import { type DndSectionItemProps } from "~/components/panel/company-page/dnd-section-item";

import { type DndSection } from "~/types/panel/company-page.types";


const DndSectionItem = dynamic<DndSectionItemProps>(() =>
  import("~/components/panel/company-page/dnd-section-item").then(res => res.DndSectionItem),
);

const initialItems: DndSection[] = [
  {
    id: "7b347a3885975b9ff7e34bc487e7d8d55bf92dea",
    code: "faqSection",
  },
  {
    id: "0d46391d835ba6a0c221cfa4de44887513c710a5",
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
    // <Card className={cn("p-4", className)}>
    <div className={cn("p-4", className)}>
      <Reorder.Group onReorder={setSections} values={sections} axis={"y"}>
        <div className={"flex flex-col gap-4"}>
          {sections.map((section, index) => (
            <DndSectionItem key={section.id} section={section} index={index} />
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
};

export { DndCompanySections };
