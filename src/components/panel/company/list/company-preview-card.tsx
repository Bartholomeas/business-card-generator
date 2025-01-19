"use client";

import React from 'react';

import Image from "next/image";
import Link from "next/link";

import { BanIcon, Eye, EyeOff } from "lucide-react";

import { routes } from "~/routes/routes";

import { type UserCompanyItem } from "~/server/api/routers/company";

import { Card, CardHeader, Text } from "~/components/common";

interface CompanyPreviewCardProps {
  company: UserCompanyItem;
  logoUrl?: string | null;
}

export const CompanyPreviewCard = ({ company, logoUrl }: CompanyPreviewCardProps) => {
  return (
    <Link href={routes.userCompany(company.slug)}>
      <Card className="flex w-full flex-col gap-2 p-4 transition-transform hover:translate-y-[-4px]">
        <CardHeader className="flex-row flex-nowrap items-center gap-4 p-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`Logo firmy: ${company.companyName}`}
              width={50}
              height={50}
              className="object-cover"
            />
          ) : (
            <span className="flex size-10 items-center justify-center rounded-md bg-background-400">
              <BanIcon className="text-background-600" />
            </span>
          )}
          <div className="flex flex-1 items-center justify-between">
            <Text weight="semibold" size="lg" className="mt-0">
              {company.companyName}
            </Text>
            {company.isPublished ? (
              <Eye className="size-4 text-muted-foreground" />
            ) : (
              <EyeOff className="size-4 text-muted-foreground" />
            )}
          </div>
        </CardHeader>
        <Text weight="medium" size="sm">
          NIP: {company.nip}
        </Text>
      </Card>
    </Link>
  );
};
