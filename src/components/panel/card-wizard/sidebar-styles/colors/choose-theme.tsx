import React from "react";
import { type BusinessCardTheme } from "@prisma/client";
import Image from "next/image";

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
  console.log(theme);
  return (
    <div className="flex flex-col">
      <div className="border-2 border-border p-4">
        <Image
          src={theme.url ?? ""}
          alt={`Motyw o nazwie ${theme.name}`}
          height={60}
          width={120}
          className="h-full w-full object-cover"
        />
      </div>
      <p>{theme.name}</p>
    </div>
  );
};
