"use client";

import dynamic from "next/dynamic";

import { Heading, Text } from "~/components/common";

import { type Company } from "~/server/api/routers/user";
import { Backlight } from "~/components/special/backlight";

const CompanyBusinessCard = dynamic(() =>
  import("~/components/public/company-page/company-business-card").then(
    res => res.CompanyBusinessCard,
  ),
);

interface CompanyHeaderProps {
  company: Company | undefined;
}

export const CompanyHeader = ({ company }: CompanyHeaderProps) => {
  return (
    <header className={"grid w-full items-center gap-8 md:grid-cols-6"}>
      <div className={"relative md:col-span-4"}>
        <Backlight />
        <CompanyBusinessCard company={company} />
      </div>
      <div className={"flex flex-col gap-4 md:col-span-2"}>
        <Heading type={"h1"}>{company?.companyName}</Heading>
        <Text color={"primary"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla at ante aliquet
          egestas. Suspendisse vitae mi eget urna pellentesque tempor. Phasellus fringilla diam eget
          mauris luctus, quis dapibus ligula malesuada. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Curabitur imperdiet odio a ligula iaculis
          dignissim. Ut bibendum at ipsum fringilla consectetur.
        </Text>
      </div>
    </header>
  );
};