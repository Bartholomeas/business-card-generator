"use client";

import { motion, Reorder, useDragControls, useMotionValue } from "framer-motion";

import { singleItemFadeIn } from "~/misc/styles/animations";

import { getDndSectionTemplate } from "~/components/panel/company-page/get-dnd-section-template";

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
          boxShadow: "5px 5px 45px rgba(170, 244, 35, 0.1)",
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

// <button
//     className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2
// focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"> <span className="absolute inset-[-1000%]
// animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"/>
// <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3
// py-1 text-sm font-medium text-white backdrop-blur-3xl"> Border Magic </span> </button>
