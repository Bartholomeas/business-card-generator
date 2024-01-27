import { type Metadata } from "next";

import { api } from "~/trpc/server";

import {
  CardPreview,
  CardStylesProvider,
  CardWizardBoard,
  CoreStylesSidebar,
  PresetSelector,
  presets,
} from "~/components/panel/card-wizard";

export const metadata: Metadata = {
  title: "Kreator kart",
};

const WizardPanel = async () => {
  const company = await api.user.getUserCompany.query();
  const card = await api.user.getBusinessCard.query();

  return (
    <CardStylesProvider card={card}>
      <div className="flex h-full flex-col">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Kreator</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <CardWizardBoard />
          </div>
        </div>

        <div className="grid h-full w-full items-stretch gap-6 overflow-hidden py-6 lg:grid-cols-[4fr_1fr]">
          <CoreStylesSidebar />
          <div
            className="
          relative flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-[1px] p-8 md:order-1"
          >
            <CardPreview company={company} />
          </div>
        </div>
      </div>
    </CardStylesProvider>
  );
};
export default WizardPanel;
