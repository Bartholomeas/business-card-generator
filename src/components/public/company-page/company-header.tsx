"use client";

import dynamic from "next/dynamic";

import { Heading, Text } from "~/components/common";
import { Backlight } from "~/components/special/backlight";

import { type Company } from "~/server/api/routers/user";

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
    <header className={"grid w-full gap-4 md:grid-cols-6"}>
      <div className={"relative md:col-span-4"}>
        <Backlight />
        <CompanyBusinessCard company={company} />
      </div>
      <div className={"flex flex-col gap-4 md:col-span-2"}>
        <Heading type={"h1"}>{company?.companyName}</Heading>
        <Text color={"primary"} size={"sm"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla at ante aliquet
          egestas. Suspendisse vitae mi eget urna pellentesque tempor. Phasellus fringilla diam eget
          mauris luctus, quis dapibus ligula malesuada. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Curabitur imperdiet odio a ligula iaculis
          dignissim. Ut bibendum at ipsum fringilla consectetur. In consequat aliquam lectus non
          pharetra. Donec lobortis, justo venenatis gravida congue, ex ante feugiat orci, quis
          eleifend tellus nisl vestibulum libero. Mauris sit amet lacus vitae augue imperdiet varius
          ultricies in tortor. Proin vel gravida quam. Maecenas auctor finibus odio.
        </Text>
      </div>
    </header>
  );
};