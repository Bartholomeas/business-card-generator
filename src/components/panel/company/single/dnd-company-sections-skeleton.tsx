import React from 'react';

import { cn } from "~/utils";

interface DndCompanySectionsSkeletonProps {
  className?: string;
}

const DndCompanySectionsSkeleton: React.FC<DndCompanySectionsSkeletonProps> = ({ className }) => {
  return (
    <div className={cn("animate-pulse", className)}>
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
