import React from "react";

import { api } from "~/trpc/server";
import { InputSlider } from "~/components/common/form/input-slider";
import { ChooseTheme } from "./choose-theme";

export const PersonalizeColors = async () => {
  const themes = await api.card.getCardThemes.query();

  return (
    <div className="flex flex-col gap-2">
      <InputSlider defaultValue={[0.46]} />
      <InputSlider defaultValue={[0.56]} />
      <InputSlider defaultValue={[0.66]} />
      <ChooseTheme themes={themes} />
    </div>
  );
};
