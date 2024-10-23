import React from "react";

import { GripIcon } from "lucide-react";

import { cn } from "~/utils";

import { Text } from "~/components/common";

interface DndTemplateSectionProps {
  title: string;
  children: React.ReactNode;
}

const DndTemplateSection = ({ title, children }: DndTemplateSectionProps) => (
  <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white ">
    <div className="flex items-center justify-between px-4 py-3">
      <Text size="h5" color="secondary" weight="semibold" className="text-gray-700">
        {title}
      </Text>
      <GripIcon className="cursor-move text-gray-400 transition-colors hover:text-gray-600" />
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

interface DndTemplateSkeletonBlockProps extends React.HTMLAttributes<HTMLDivElement> { }

const DndTemplateSkeletonBlock = ({ className, ...props }: DndTemplateSkeletonBlockProps) => (
  <div className={cn("animate-pulse rounded bg-gray-200", className)} {...props} />
);

export const DndTemplateComments = () => (
  <DndTemplateSection title="Sekcja komentarzy">
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="flex items-start space-x-4">
          <DndTemplateSkeletonBlock className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <DndTemplateSkeletonBlock className="h-4 w-1/4" />
            <DndTemplateSkeletonBlock className="h-3 w-3/4" />
            <DndTemplateSkeletonBlock className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </DndTemplateSection>
);

export const DndTemplateFaq = () => (
  <DndTemplateSection title="Sekcja FAQ">
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <DndTemplateSkeletonBlock className="h-4 w-2/3" />
            <DndTemplateSkeletonBlock className="size-4 rounded-full" />
          </div>
          {index === 1 && (
            <div className="space-y-1 pl-4">
              <DndTemplateSkeletonBlock className="h-3 w-full" />
              <DndTemplateSkeletonBlock className="h-3 w-5/6" />
              <DndTemplateSkeletonBlock className="h-3 w-4/5" />
            </div>
          )}
        </div>
      ))}
    </div>
  </DndTemplateSection>
);
