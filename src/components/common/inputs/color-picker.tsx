"use client";

import { useState } from "react";
import { debounce } from "~/misc/utils/debounce";

export const ColorPicker = () => {
  const [value, setValue] = useState("#fff");

  const setChoosenColorValue = debounce((value: string) => {
    console.log(value);
    setValue(value);
  });

  return (
    <div className="flex justify-center rounded-sm">
      <input
        className="aspect-square h-[32px] w-[32px] overflow-hidden rounded-full"
        id="nativeColorPicker1"
        type="color"
        onChange={(e) => setChoosenColorValue(e.target.value)}
        value={value}
      />
      <button
        id="burronNativeColor"
        type="button"
        className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
      >
        Button
      </button>
    </div>
  );
};
