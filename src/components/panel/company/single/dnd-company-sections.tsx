"use client";

import { useEffect, useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { Reorder } from "framer-motion";

import { api } from "~/providers/trpc-provider";
import { cn } from "~/utils";

import { type VisibilityCompanySection, type ServerGetCompanyPageSectionsVisibilityResponse } from "~/server/api/routers/company";

import { Button } from "~/components/common";
import { type DndSectionItemProps } from "~/components/panel/company/single/dnd-section-item";

import { type DndSection } from "~/types/panel/company-page.types";


const DndSectionItem = dynamic<DndSectionItemProps>(() =>
  import("~/components/panel/company/single/dnd-section-item").then(
    res => res.DndSectionItem,
  ),
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

const transformSectionsToDndSections = (
  sections: VisibilityCompanySection[] | undefined
): DndSection[] => {
  if (!sections) return initialItems;

  return sections?.filter(section => section.isVisible).map(section => ({
    id: section.id,
    code: section.sectionType,
  }));
};

interface DndCompanySectionsProps {
  className?: string;
  companySlug: string,
  initialData?: ServerGetCompanyPageSectionsVisibilityResponse;
}

const DndCompanySections = ({ className, companySlug, initialData }: DndCompanySectionsProps) => {
  const [company] = api.company.getCompanyPageSectionsVisibility.useSuspenseQuery({
    companySlug,
  }, {
    initialData
  });
  const { mutateAsync, isLoading } = api.company.reorderCompanySections.useMutation();

  const dndSections = useMemo(() => transformSectionsToDndSections(company?.sections), [company?.sections]);
  const [sections, setSections] = useState<DndSection[]>(dndSections);

  const setSectionsOrder = (dndSections: DndSection[]) => {
    setSections(dndSections);
  };

  const handleSectionsReorder = async () => {
    await mutateAsync({ companySlug, sections: sections.map(section => section.code) });
  };

  useEffect(() => {
    setSections(dndSections);
  }, [dndSections]);


  return (
    <div className={cn(className, 'flex flex-col gap-2')}>
      <Reorder.Group onReorder={setSectionsOrder} values={sections} axis={"y"}>
        <div className={"flex flex-col gap-4"}>
          {sections.map((section, index) => (
            <DndSectionItem key={section.id} section={section} index={index} />
          ))}
        </div>
      </Reorder.Group>
      <Button
        onClick={handleSectionsReorder}
        isLoading={isLoading}
        className="w-fit self-end"
      >Zapisz kolejność</Button>
    </div >
  );
};

export { DndCompanySections };
