import React from 'react';

import { cn } from "~/utils";

interface DndCompanySectionsSkeletonProps {
  className?: string;
}

const DndCompanySectionsSkeleton: React.FC<DndCompanySectionsSkeletonProps> = ({ className }) => {
  return (
    <div className={cn(className, 'md:col-span-4 bg-rose-400 w-full h-full min-h-[300px] min-w-[300px]')}>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="h-24 w-full rounded-lg bg-backgroundCard"
          />
        ))}
      </div>
    </div>
  );
};

export { DndCompanySectionsSkeleton };
