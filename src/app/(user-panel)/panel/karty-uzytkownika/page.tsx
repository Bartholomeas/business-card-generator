import { api } from "~/trpc/server";

import { Card, Heading } from "~/components/common";
import { CreateCardButton } from "~/components/panel/card-wizard/create-card-button";
import { GenericErrorBox } from "~/components/special/generic-error-box";

const UserCardsPage = async () => {
  try {
    const cards = await api.card.getAllCards.query();
    console.log("KARDS:: ", cards);
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Heading>Karty firmowe</Heading>
          <CreateCardButton />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Card key={card.id} className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Firma:
                  </span>
                  <span className="font-medium">
                    {(card.company && 'companyName' in card.company
                      ? card.company.companyName
                      : 'Brak przypisanej firmy')}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-muted-foreground">
                    Utworzono:
                  </span>
                  <span className="text-sm">
                    {new Date(card.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Elementy tekstowe:
                  </span>
                  <span className="text-sm">
                    {card.defaultTextElements?.length ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Elementy przód:
                  </span>
                  <span className="text-sm">
                    {card.front?.textElements?.length ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Elementy tył:
                  </span>
                  <span className="text-sm">
                    {card.back?.textElements?.length ?? 0}
                  </span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-end gap-2">
                <a
                  href={`/panel/kreator-kart?cardId=${card.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  Edytuj wizytówkę →
                </a>
              </div>
            </Card>
          ))}
        </div>

        {cards.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Nie masz jeszcze żadnych wizytówek</p>
            <CreateCardButton />
          </Card>
        )}
      </div>
    );
  } catch (err) {
    return (
      <GenericErrorBox title="Nie udało się załadować kart firmowych" withBackButton>
        <CreateCardButton />
      </GenericErrorBox>
    );
  }
};

export default UserCardsPage;
