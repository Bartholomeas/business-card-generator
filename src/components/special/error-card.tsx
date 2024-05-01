"use client";

import React from "react";
import Link from "next/link";
import { routes } from "~/routes/routes";
import { Button, buttonVariants, Heading, Text } from "~/components/common";

interface ErrorCardProps {
  errorCode: string | number;
  errorMessage: string;
  onClick?: () => void;
}

export const ErrorCard = ({
  errorCode = 500,
  errorMessage = "Wystąpił nieznany błąd.",
  onClick,
}: ErrorCardProps) => {
  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      <Heading type="h1" className="inline h-fit pb-10 text-[100px]" color="default" weight="bold">
        {errorCode}
      </Heading>
      <Text size="lg" color="primary">
        {errorMessage}
      </Text>
      {onClick ? (
        <Button onClick={onClick}>Spróbuj ponownie</Button>
      ) : (
        <Link className={buttonVariants({})} href={routes.home}>
          Powrót do strony głównej
        </Link>
      )}
    </div>
  );
};