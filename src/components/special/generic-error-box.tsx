'use client';

import { type PropsWithChildren, useCallback } from "react";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "lucide-react";

import { Button, Heading, Text } from "../common";

interface GenericErrorBoxProps {
  title: string;
  message?: string;
  withBackButton?: boolean;
}

export const GenericErrorBox = ({ title, message, withBackButton = false, children }: PropsWithChildren<GenericErrorBoxProps>) => {
  const router = useRouter();

  const handleBackButton = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4">
      <Heading className="text-xl font-semibold">
        {title}
      </Heading>
      {message && <Text className="text-muted-foreground">{message}</Text>}
      {withBackButton && <Button onClick={handleBackButton}>
        <ArrowLeftIcon className="size-4" />
        Wróć do strony głównej
      </Button>}
      {children}
    </div>
  );
};

