import React from "react";
import { TemperatureSelector } from "../temperature-selector";
import { ColorPicker } from "~/components/common/inputs/color-picker";

export const PersonalizeColors = () => {
  return (
    <>
      <ColorPicker />
      <TemperatureSelector defaultValue={[0.56]} />
      <TemperatureSelector defaultValue={[0.56]} />
      <TemperatureSelector defaultValue={[0.56]} />
    </>
  );
};
