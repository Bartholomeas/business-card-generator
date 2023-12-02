import React from "react";
import { TemperatureSelector } from "../temperature-selector";

export const PersonalizeColors = () => {
  return (
    <>
      <TemperatureSelector defaultValue={[0.56]} />
      <TemperatureSelector defaultValue={[0.56]} />
      <TemperatureSelector defaultValue={[0.56]} />
    </>
  );
};
