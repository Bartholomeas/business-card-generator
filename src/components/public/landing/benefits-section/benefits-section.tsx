'use client';

import React, { useRef } from 'react';

import { useScroll } from "framer-motion";

import { Heading } from "~/components/common";

import Picture1 from "./../../../../../public/images/landing/img5.jpg";
import Picture2 from "./../../../../../public/images/landing/img6.jpg";
import Picture3 from "./../../../../../public/images/landing/img7.jpg";
import Picture4 from "./../../../../../public/images/landing/img8.jpg";
import { BenefitsCard } from "./benefits-card";
import { type BenefitCard } from "./benefits-section.types";

export const cards: BenefitCard[] = [
  {
    title: "Profesjonalna Wizytówka Online",
    description: "Stwórz swoją unikalną wizytówkę online, która wyróżni Cię na tle konkurencji. Kwirk umożliwia łatwe dostosowanie wyglądu i treści, aby idealnie odzwierciedlić Twoją markę.",
    src: Picture1,
    colorClassName: "bg-background-400"
  },
  {
    title: "Integracja z Rzeczywistością",
    description: "Połącz świat cyfrowy z fizycznym dzięki kodom QR na tradycyjnych wizytówkach. Klienci mogą łatwo zeskanować kod i natychmiast uzyskać dostęp do Twojej rozszerzonej wizytówki online.",
    src: Picture2,
    colorClassName: "bg-background-500"
  },
  {
    title: "Analityka i Statystyki",
    description: "Zyskaj cenne informacje o odwiedzających Twoją wizytówkę. Śledź liczbę wyświetleń, czas spędzony na stronie i inne kluczowe metryki, aby optymalizować swoją obecność online.",
    src: Picture3,
    colorClassName: "bg-background-600"
  },
  {
    title: "Łatwa Personalizacja",
    description: "Dostosuj swoją wizytówkę bez wysiłku dzięki intuicyjnemu interfejsowi drag & drop. Wybieraj spośród wielu motywów i dostosowuj każdy element, aby idealnie pasował do Twojej marki.",
    src: Picture4,
    colorClassName: "bg-background-700"
  }
];

export const BenefitsSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef, offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} className="my-[25vh] flex flex-col gap-10">
      <Heading
        size='h1'
        align='center'
        type='h2'>Dlaczego Kwirk?</Heading>
      {cards.map((card, index) => {
        const targetScale = 1 - ((cards.length - index) * 0.05);

        return <BenefitsCard
          key={`benefitsCard-${card.title}-${card.colorClassName}`}
          index={index}
          progress={scrollYProgress}
          range={[index * 0.25, 1]}
          targetScale={targetScale}
          {...card}
        />;
      })}
    </section>
  );
};
