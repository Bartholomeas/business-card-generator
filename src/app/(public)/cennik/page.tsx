import React from "react";

import { Button, Heading, Text } from "~/components/common";
import { PricingCard } from "~/components/public/pricing/pricing-card";

const PricingPage = () => {
  return (
    <section className="relative overflow-hidden text-foreground selection:bg-zinc-600">
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 space-y-3">
          <Heading
            type={"h1"}
            align={"center"}
            className="text-3xl leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight"
          >
            Cennik
          </Heading>
          <Text align={"center"}>
            Używaj za darmo, a jeśli potrzebujesz więcej, możesz zwiększyć swoje limity.
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PricingCard
            tier="Free"
            price="0zł/ miesiąc"
            bestFor="Dla podstawowych korzyści"
            CTA={
              <Button variant={"outline"} className="w-full">
                Działaj za darmo!
              </Button>
            }
            benefits={[
              { text: "Eksport do druku", checked: true },
              { text: "Dostęp do wszystkich wzorów", checked: true },
              { text: "Strona firmy", checked: true },
              { text: "Personalizacja styli", checked: true },
              { text: "Podstawowe statystyki", checked: true },
              { text: "Wiele firm", checked: false },
              { text: "Stopka e-mail", checked: false },
              { text: "Integracja z kalendarzem", checked: false },
              { text: "Automatyczne powiadomienia", checked: false },
            ]}
          />
          <PricingCard
            tier="Pro"
            price="15zł/ miesiąc"
            bestFor="Dla pełni mocy zarządzania firmą"
            CTA={
              <Button className="w-full">
                Spróbuj 14 dni za darmo!
              </Button>
            }
            benefits={[
              { text: "Eksport do druku", checked: true },
              { text: "Dostęp do wszystkich wzorów", checked: true },
              { text: "Strona firmy", checked: true },
              { text: "Personalizacja styli", checked: true },
              { text: "Rozbudowane statystyki", checked: true },
              { text: "Wiele firm", checked: true },
              { text: "Stopka e-mail", checked: true },
              { text: "Integracja z kalendarzem", checked: true },
              { text: "I wiele więcej..", checked: true },
            ]}
            className="border-2 border-primary-500 shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
