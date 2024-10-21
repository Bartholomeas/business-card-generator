"use client";

import { motion } from "framer-motion";

import { singleItemFadeIn } from "~/misc/styles/animations";

export interface DndSectionItemSkeletonProps {
  index?: number;
}

const DndSectionItemSkeleton = ({ index }: DndSectionItemSkeletonProps) => {
  return (
    <motion.div {...singleItemFadeIn(index)}>
      <div className="rounded-lg">
        <div className="relative size-full min-h-64 rounded-lg bg-background p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-3/4 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
            <div className="h-4 w-5/6 rounded bg-gray-300"></div>
            <div className="h-4 w-2/3 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { DndSectionItemSkeleton };
