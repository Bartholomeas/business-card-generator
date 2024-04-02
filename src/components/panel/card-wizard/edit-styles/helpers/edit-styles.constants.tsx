import {
  type InputColorProps,
  type InputControlledProps,
  type SelectControlledProps,
  type ToggleGroupControlledProps,
} from "~/components/form";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import React from "react";

interface InputElement extends InputControlledProps {
  inputType: "input";
}

interface ColorElement extends InputColorProps {
  inputType: "color";
}

interface ToggleGroupElement extends ToggleGroupControlledProps {
  inputType: "toggle-group";
}

interface SelectElement extends SelectControlledProps {
  inputType: "select";
}

export type ControlledInputElements =
  | InputElement
  | ColorElement
  | ToggleGroupElement
  | SelectElement;

export const textElementConfigInputs: ControlledInputElements[] = [
  {
    inputType: "input",
    name: "text",
    label: "Tekst",
  },
  {
    inputType: "color",
    name: "color",
    label: "Kolor",
  },
  {
    inputType: "input",
    type: "number",
    name: "fontSize",
    label: "Rozmiar tekstu",
  },
  {
    inputType: "select",
    name: "fontFamily",
    placeholder: "Wybierz krój pisma",
    label: "Krój pisma",
    defaultValue: "poppins",
    items: [
      {
        children: "Poppins",
        value: "poppins",
      },
      {
        children: "Roboto",
        value: "roboto",
      },
    ],
  },
  {
    inputType: "select",
    name: "fontWeight",
    label: "Waga pisma",
    placeholder: "Wybierz wagę pisma",
    defaultValue: "normal",
    items: [
      {
        children: "Lekki",
        value: "light",
        className: "font-light",
      },
      {
        children: "Normalny",
        value: "normal",
        className: "font-normal",
      },
      {
        children: "Średni",
        value: "medium",
        className: "font-medium",
      },
      {
        children: "Pogrubiony",
        value: "semibold",
        className: "font-semibold",
      },
      {
        children: "Gruby",
        value: "bold",
        className: "font-bold",
      },
    ],
  },
  {
    inputType: "input",
    type: "number",
    name: "letterSpacing",
    label: "Odstępy między znakami",
    step: 0.1,
    min: 0.1,
  },
  {
    inputType: "input",
    type: "number",
    name: "lineHeight",
    label: "Wysokość linii",
    step: 0.1,
    min: 0.1,
  },
  {
    inputType: "toggle-group",
    name: "textAlign",
    label: "Wyrównanie tekstu",
    items: [
      { label: <AlignLeft size={16} />, value: "left" },
      { label: <AlignCenter size={16} />, value: "center" },
      { label: <AlignRight size={16} />, value: "right" },
      { label: <AlignJustify size={16} />, value: "justify" },
    ],
  },
  {
    inputType: "input",
    defaultValue: "default",
    name: "textDecoration",
    label: "Dekoracje tekstu",
  },
  {
    inputType: "input",
    type: "number",
    name: "zIndex",
    label: "Priorytet kolejności",
    defaultValue: "0",
  },
];
