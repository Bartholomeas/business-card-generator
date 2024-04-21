"use client";

import { type Company } from "~/server/api/routers/user";
import { Heading } from "~/components/common";
import { withFlip } from "~/components/special/with-flip/with-flip";
import { FlippableCardHandler } from "~/components/panel/card-wizard/card-preview/flippable-card-handler";

const FlippableCard = withFlip(FlippableCardHandler, {
  // buttonHandle: true,
  withRotation: true,
  scaleOnHover: true,
});

interface CompanyHeader {
  company: Company | undefined;
}

export const CompanyHeader = ({ company }: CompanyHeader) => {
  console.log("INSIDECOMP", { company });
  return (
    <header className={"flex flex-col gap-4"}>
      <FlippableCard company={company ?? undefined} />
      <Heading type={"h1"}>xd</Heading>
    </header>
  );
};