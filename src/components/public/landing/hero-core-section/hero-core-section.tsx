import React from 'react';

import dynamic from "next/dynamic";

import { Button, Heading, Text } from "~/components/common";

const InstallAppCard = dynamic(() => import("./install-app-card").then(mod => mod.InstallAppCard), { ssr: false });

export const HeroCoreSection = () => {
  return (
    <section>
      <div className="container">
        <div className="mx-auto grid w-full grid-cols-1 items-center gap-8 py-12 md:grid-cols-2">
          <div>
            <span className="mb-2 block text-lg font-medium text-textSecondary">
              Twórz, przesyłaj, zwyciężaj
            </span>
            <Heading type={"h1"} className="text-4xl font-semibold md:text-6xl">
              Jedna karta kluczem do sieci.
            </Heading>
            <Text className="my-4 text-base text-textSecondary md:my-6 md:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in error repellat
              voluptatibus ad.
            </Text>
            <div className="mt-8 flex items-center gap-4">
              <Button>Stwórz swoją kartę</Button>
            </div>
          </div>
          <div className="mt-8">
            <InstallAppCard variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};
