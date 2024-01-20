import React from "react";
import { InputSlider } from "~/components/common/form/input-slider";

export const PersonalizeColors = () => {
  return (
    <>
      <InputSlider defaultValue={[0.56]} />
      <InputSlider defaultValue={[0.56]} />
      <InputSlider defaultValue={[0.56]} />
    </>
  );
};
