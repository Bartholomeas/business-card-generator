import React from "react";
import { InputSlider } from "../../../common/inputs/input-slider";

export const PersonalizeColors = () => {
  return (
    <>
      <InputSlider defaultValue={[0.56]} />
      <InputSlider defaultValue={[0.56]} />
      <InputSlider defaultValue={[0.56]} />
    </>
  );
};
