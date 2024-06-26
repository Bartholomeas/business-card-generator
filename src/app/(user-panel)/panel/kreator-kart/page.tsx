import { type Metadata } from "next";

import { api } from "~/trpc/server";
import { CardStylesStoreProvider } from "~/stores/card";

import { CardPreview } from "~/components/panel/card-wizard/card-preview/card-preview";
import { CoreStylesSidebar, presets, PresetSelector } from "~/components/panel/card-wizard";
import { ToggleTextForm } from "~/components/panel/card-wizard/edit-styles/text/toggle-text-form";

export const metadata: Metadata = {
  title: "Kreator kart | Kwirk",
};

const WizardPanel = async () => {
  // TODO: Handle errors instead of missing it
  const [company, card] = await Promise.all([
    api.user.getUserCompany(),
    api.card.getUserBusinessCard(),
  ]).catch(() => [undefined, undefined]);

  return (
    <CardStylesStoreProvider card={card}>
      <div className="flex h-full flex-col">
        <div className="container flex flex-col items-start justify-between space-y-2 px-0 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Kreator</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            {/*<Link className={ń*/}
          </div>
        </div>

        <div className="grid size-full items-stretch gap-6 overflow-hidden py-6 lg:grid-cols-[4fr_1fr]">
          <CoreStylesSidebar />
          <div
            className="
          flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-DEFAULT p-2 md:order-1 lg:p-4"
          >
            <div className={"relative size-full max-sm:min-h-[50vh]"}>
              <CardPreview company={company} />
            </div>
            <ToggleTextForm />
          </div>
        </div>
      </div>
    </CardStylesStoreProvider>
  );
};
export default WizardPanel;
