import React from 'react';

import Picture from "./../../../../../public/images/landing/img1.jpg";
import { BenefitsCard } from "./benefits-card";
import { type BenefitCard } from "./benefits-section.types";

export const cards: BenefitCard[] = [
  {
    title: "Matthias Leidinger",
    description: "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: Picture,
    colorClassName: "bg-background-400"
  },
  {
    title: "Clément Chapillon",
    description: "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves (French for ‘The tawny rocks’).",
    src: Picture,
    colorClassName: "bg-background-500"
  },
  {
    title: "Zissou",
    description: "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    src: Picture,
    colorClassName: "bg-background-600"
  },
  {
    title: "Zissou",
    description: "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    src: Picture,
    colorClassName: "bg-background-700"
  }
];

export const BenefitsSection = () => {
  return (
    <section className="my-[50vh]">
      {cards.map((card, index) => {
        return <BenefitsCard
          key={`benefitsCard-${card.title}-${card.colorClassName}`}
          {...card}
          index={index}
          colorClassName={card.colorClassName}
        />;
      })}
    </section>
  );
};
