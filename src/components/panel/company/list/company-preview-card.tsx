import React from 'react';

import Image from "next/image";
import Link from "next/link";

import { BanIcon } from "lucide-react";

import { routes } from "~/routes/routes";
import { api } from "~/trpc/server";

import { type UserCompanyItem } from "~/server/api/routers/company";

import { Card, CardHeader, Text } from "~/components/common";

interface CompanyPreviewCardProps {
  company: UserCompanyItem;
}
export const CompanyPreviewCard = async ({ company }: CompanyPreviewCardProps) => {

  let logo;
  if (company?.logoId) logo = await api.file.getFile.query({ fileId: company.logoId }).catch(() => null);
  console.log('XDD', logo);

  return (
    <Link href={routes.userCompany(company.slug)}>
      <Card className="flex w-full flex-col gap-2 p-4 transition-transform hover:-translate-y-[4px]">
        <CardHeader className="flex-row flex-nowrap items-center gap-4 p-0">
          {logo?.url ? <Image
            src={logo?.url}
            alt={`Logo firmy: ${company?.companyName}`}
            width={50}
            height={50}
            className="object-cover"
          /> : <span
            className="flex size-10 items-center justify-center rounded-md bg-background-400" >
            <BanIcon className="text-background-600" />
          </span>}
          {company?.companyName}
        </CardHeader>
        <Text
          weight={'medium'}
          size={'sm'}
        >
          NIP: {company?.nip}
        </Text>
      </Card>
    </Link>
  );
};
