"use client";

import { motion, Reorder, useDragControls, useMotionValue } from "framer-motion";

import { singleItemFadeIn } from "~/misc/styles/animations";

import { getDndSectionTemplate } from "~/components/panel/company/single/get-dnd-section-template";

import { type DndSection } from "~/types/panel/company-page.types";


export interface DndSectionItemProps {
  section: DndSection;
  index?: number;
}

const DndSectionItem = ({ section, index }: DndSectionItemProps) => {
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  return (
    <motion.div {...singleItemFadeIn(index)}>
      <Reorder.Item
        value={section}
        id={section?.id}
        dragListener={false}
        dragControls={dragControls}
        style={{ y }}
        whileDrag={{
          scale: 1.05,
          zIndex: 300,
          cursor: "grabbing",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          transition: {
            duration: 1,
          },
        }}
        className={"rounded-lg"}
      >
        <div
          className={"relative size-full min-h-64 cursor-grab rounded-lg bg-background p-4"}
          onPointerDown={e => dragControls.start(e)}
        >
          {getDndSectionTemplate(section?.code)}
        </div>
      </Reorder.Item>
    </motion.div>
  );
};
export { DndSectionItem };
