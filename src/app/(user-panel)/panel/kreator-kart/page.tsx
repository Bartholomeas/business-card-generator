import { type Metadata } from "next";
import Link from "next/link";

import { api } from "~/trpc/server";
import { routes } from "~/routes/routes";
import { CardStylesStoreProvider } from "~/stores/card";

import { buttonVariants } from "~/components/common";

import { CardPreview } from "~/components/panel/card-wizard/card-preview/card-preview";
import { CoreStylesSidebar, presets, PresetSelector } from "~/components/panel/card-wizard";
import { ToggleTextForm } from "~/components/panel/card-wizard/edit-styles/text/toggle-text-form";

export const metadata: Metadata = {
  title: "Kreator kart | Kwirk",
};

const WizardPanel = async () => {
  const company = await api.user.getUserCompany.query();
  const card = await api.card.getBusinessCard.query();

  return (
    <CardStylesStoreProvider card={card}>
      <div className="flex h-full flex-col">
        <div className="container flex flex-col items-start justify-between space-y-2 px-0 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Kreator</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <Link className={buttonVariants()} href={routes.companyPage(card.id)}>
              Do strony karty
            </Link>
          </div>
        </div>

        <div className="grid h-full w-full items-stretch gap-6 overflow-hidden py-6 lg:grid-cols-[4fr_1fr]">
          <CoreStylesSidebar />
          <div
            className="
          flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-[1px] p-2 md:order-1 lg:p-4"
          >
            <div className={"relative h-full w-full max-sm:min-h-[50vh]"}>
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