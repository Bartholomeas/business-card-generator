import { type Metadata } from "next";

import { presets } from "~/components/panel/card-wizard/presets";
import { CardWizardBoard } from "~/components/panel/card-wizard/card-wizard-board";
import { PresetSelector } from "~/components/panel/card-wizard/preset-selector";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Separator } from "~/components/ui/separator";
import { CoreStylesSidebar } from "~/components/panel/card-wizard/core-styles-sidebar";

export const metadata: Metadata = {
  title: "Kreator kart",
};

const WizardPanel = () => {
  return (
    <>
      <div className=" flex h-full flex-col">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Kreator</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <CardWizardBoard />
          </div>
        </div>
        <Separator />
        <div className="h-full py-6">
          <div className="grid h-full w-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className="flex flex-col space-y-4 md:order-2">
              <div className="grid gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Personalizacja
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Choose the interface that best suits your task. You can
                    provide: a simple prompt to complete, starting and ending
                    text to insert a completion within, or some text with
                    instructions to edit it.
                  </HoverCardContent>
                </HoverCard>
                <CoreStylesSidebar />
              </div>
            </div>
            <div className="md:order-1">
              <div className="flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-[1px]">
                <div className="h-[300px] w-[300px] bg-rose-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WizardPanel;
