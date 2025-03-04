import dynamic from "next/dynamic";

import { type Metadata } from "next";

import { CardStylesStoreProvider } from "~/stores/card";
import { api } from "~/trpc/server";

import { Card, Heading } from "~/components/common";
import { CoreStylesSidebar } from "~/components/panel/card-wizard";
import { CardPreview } from "~/components/panel/card-wizard/card-preview/card-preview";
import { CardSwitcher } from "~/components/panel/card-wizard/card-switcher";
import { CreateCardButton } from "~/components/panel/card-wizard/create-card-button";
import { ToggleTextForm } from "~/components/panel/card-wizard/edit-styles/text/toggle-text-form";
import { FlipProvider } from "~/components/special/with-flip/hooks/use-flip-state";

const LayersPanel = dynamic(() => import("~/components/panel/card-wizard/layers-panel/layers-panel").then(mod => mod.LayersPanel), {
  ssr: false
});

const FloatingStylesButton = dynamic(() => import("~/components/panel/card-wizard/edit-styles/floating-styles-button").then(mod => mod.FloatingStylesButton));

export const metadata: Metadata = {
  title: "Kreator kart | Kwirk",
};

const WizardPanel = async () => {
  // TODO: Handle errors instead of missing it
  const [company, card] = await Promise.all([
    api.company.getUserCompany.query(),
    api.card.getUserBusinessCard.query(),
  ]).catch(() => [undefined, undefined]);

  return (
    <FlipProvider>
      <CardStylesStoreProvider card={card}>
        <Card className="flex h-full flex-col p-4">
          <div className="container flex flex-col items-start justify-between gap-4 px-0 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
            <Heading size='h3'>Kreator</Heading>
            {card && <CardSwitcher currentCardId={card.id} />}
          </div>

          <div className="grid size-full items-stretch overflow-hidden py-6 lg:grid-cols-[1fr_300px]">
            {card ? (
              <div className="flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-DEFAULT p-2 lg:p-4">
                <div className="relative size-full max-sm:min-h-[50vh]">
                  <CardPreview company={company} />
                </div>
                <ToggleTextForm />
              </div>
            ) : (
              <div className="flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-DEFAULT p-2 lg:p-4">
                <div className="flex flex-col items-center justify-center gap-4 space-y-4 text-lg font-semibold">
                  Nie masz jeszcze wizytówki.
                  <CreateCardButton />
                </div>
              </div>
            )}

            <div className="hidden lg:block">
              <CoreStylesSidebar />
            </div>
          </div>
        </Card>

        <FloatingStylesButton />
        <LayersPanel />
      </CardStylesStoreProvider>
    </FlipProvider>
  );
};
export default WizardPanel;
