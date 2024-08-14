import { type ReactNode } from "react";
import { Separator, Text } from "~/components/common";
import { cn } from "~/utils";
import { GripIcon } from "lucide-react";

interface DndTemplateCardHeaderProps {
  title: string;
}

const DndTemplateCardHeader = ({ title }: DndTemplateCardHeaderProps) => (
  <div className={"flex select-none flex-col gap-2 pb-4"}>
    <div className={"flex w-full items-center justify-between"}>
      <Text size={"h5"} color={"secondary"} weight={"semibold"}>
        {title}
      </Text>
      <GripIcon className={"text-textSecondary"} />
    </div>
    <Separator className={"h-[4px]"} />
  </div>
);

interface DndTemplateSkeletonBlockProps {
  className?: string;
  children?: ReactNode;
}

const DndTemplateSkeletonBlock = ({ className, children }: DndTemplateSkeletonBlockProps) => (
  <div className={cn("rounded bg-primary opacity-30", className)}>{children}</div>
);

const DndTemplateComments = () => (
  <div className={"flex h-full w-full flex-col"}>
    <DndTemplateCardHeader title={"Sekcja komentarzy"} />
    <div className={"flex w-full flex-col gap-4"}>
      {new Array(3).fill(null).map((_, index) => (
        <div key={index} className={"flex items-start gap-4"}>
          <DndTemplateSkeletonBlock className={"aspect-square w-[25%] max-w-[48px] rounded-full"} />
          <div className={"flex w-full flex-col gap-1"}>
            <DndTemplateSkeletonBlock className={"mb-2 aspect-square h-4 w-[25%]"} />
            <DndTemplateSkeletonBlock className={"aspect-square h-3 w-[95%]"} />
            <DndTemplateSkeletonBlock className={"aspect-square h-3 w-[75%]"} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
const DndTemplateFaq = () => (
  <div className={"flex h-full w-full flex-col"}>
    <DndTemplateCardHeader title={"Sekcja FAQ"} />
    <div className={"flex w-full flex-col gap-6"}>
      {new Array(3).fill(null).map((_, index) => (
        <div key={index} className={"flex w-full flex-col gap-1"}>
          <div className={"mb-2 flex w-full items-center justify-between gap-4"}>
            <DndTemplateSkeletonBlock className={"h-3 w-[45%]"} />
            <DndTemplateSkeletonBlock className={"aspect-square h-3 w-3 rounded-full"} />
          </div>
          {index === 0 ? (
            <div className={"mb-2 flex w-full flex-col gap-1"}>
              <DndTemplateSkeletonBlock className={"aspect-square h-2 w-[95%] rounded-full"} />
              <DndTemplateSkeletonBlock className={"aspect-square h-2 w-[85%] rounded-full"} />
              <DndTemplateSkeletonBlock className={"aspect-square h-2 w-[90%] rounded-full"} />
              <DndTemplateSkeletonBlock className={"aspect-square h-2 w-[45%] rounded-full"} />
            </div>
          ) : null}
          <DndTemplateSkeletonBlock className={"h-1 w-full"} />
        </div>
      ))}
    </div>
  </div>
);

export { DndTemplateComments, DndTemplateFaq };
