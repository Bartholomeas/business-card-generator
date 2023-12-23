import { type Metadata } from "next";

import { presets } from "~/components/panel/card-wizard/top-bar/presets";

import { Separator } from "~/components/ui/separator";

import { CardWizardBoard } from "~/components/panel/card-wizard/card-wizard-board";
import { PresetSelector } from "~/components/panel/card-wizard/top-bar/preset-selector";
import { CardPreview } from "~/components/panel/card-wizard/card-preview/card-preview";
import { CoreStylesSidebar } from "~/components/panel/card-wizard/personalize-styles";

export const metadata: Metadata = {
  title: "Kreator kart",
};

const WizardPanel = () => {
  return (
    <>
      <div className="flex h-full flex-col">
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
                <CoreStylesSidebar />
              </div>
            </div>
            {/* <div className="flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-[1px]"></div> */}
            <div className="flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-[1px] p-8 md:order-1">
              <CardPreview />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WizardPanel;
