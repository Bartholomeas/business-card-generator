import { api } from "~/trpc/server";

import { Heading } from "~/components/common";
import { GenericErrorBox } from "~/components/special/generic-error-box";


const UserCardsPage = async () => {
  try {

    const cards = await api.card.getAllCards.query();
    console.log('cards::', cards);
    return (<div className="flex flex-col gap-4">
      <Heading>Karty firmowe</Heading>

      {cards.map((card) => (
        <div key={card.id}>{card.id}</div>
      ))}
    </div>

      // <CardStylesStoreProvider card={card}>
      //   <SelectionProvider>

      //     <Card className="flex h-full flex-col p-4">
      //       <div className="container flex flex-col items-start justify-between px-0 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      //         <Heading size="h3">Kreator</Heading>
      //         <div className="ml-auto flex w-full space-x-2 sm:justify-end">
      //           <PresetSelector presets={presets} />
      //         </div>
      //       </div>

      //       <div className="grid size-full items-stretch overflow-hidden py-6 lg:grid-cols-[4fr_1fr]">
      //         <CreatorSidebar />
      //         {card ? (
      //           <div
      //             className="
      //       flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-DEFAULT p-2 md:order-1 lg:p-4"
      //           >
      //             <div className={"relative size-full max-sm:min-h-[50vh]"}>
      //               {/*<CardPreview company={company} />*/}
      //               <CardWizardBoard />
      //             </div>
      //             <ToggleTextForm />
      //           </div>
      //         ) : (
      //           <div className="flex h-full min-h-[70vh] flex-col items-center justify-center space-y-4 rounded-sm border-DEFAULT p-2 md:order-1 lg:p-4">
      //             <div className="flex flex-col items-center justify-center gap-4 space-y-4 text-lg font-semibold">
      //               Nie masz jeszcze wizytówki.
      //               <Button>Utwórz wizytówkę</Button>
      //             </div>
      //           </div>
      //         )}
      //       </div>
      //     </Card>
      //   </SelectionProvider>
      // </CardStylesStoreProvider>
    );
  } catch (err) {
    return <GenericErrorBox title="Nie udało się załadować kart firmowych" withBackButton />;
  }
};

export default UserCardsPage;
