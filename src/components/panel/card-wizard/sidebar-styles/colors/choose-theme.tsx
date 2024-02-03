import React from "react";
import Image from "next/image";
import { type BusinessCardTheme } from "@prisma/client";
import { Checkbox } from "~/components/common/ui";

interface ChooseThemeProps {
  themes: BusinessCardTheme[] | undefined;
}
export const ChooseTheme = ({ themes }: ChooseThemeProps) => {
  return (
    <div className="flex flex-col gap-2">
      {themes ? (
        themes.map(theme => <ThemeBox key={theme.id} theme={theme} />)
      ) : (
        <p>Brak motywów</p>
      )}
    </div>
  );
};

interface ThemeBoxProps {
  theme: BusinessCardTheme;
}

const ThemeBox = ({ theme }: ThemeBoxProps) => {
  return (
    <div className="flex flex-col">
      <div className="aspect-cardOne h-auto w-full overflow-hidden border-2 border-border p-2">
        <Image
          src={theme.url ?? ""}
          alt={`Motyw o nazwie ${theme.name}`}
          height={80}
          width={120}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="text-xs">{theme.name}</p>
    </div>
  );
};
