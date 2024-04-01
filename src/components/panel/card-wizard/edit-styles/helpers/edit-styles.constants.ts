import {
  type InputColorProps,
  type InputControlledProps,
  type ToggleGroupControlledProps,
} from "~/components/form";

interface ColorElement extends InputColorProps {
  inputType: "color";
}

interface InputElement extends InputControlledProps {
  inputType: "input";
}

interface ToggleGroupElement extends ToggleGroupControlledProps {
  inputType: "toggle-group";
}

export type ControlledInputElements = InputElement | ColorElement | ToggleGroupElement;

export const textElementConfigInputs: ControlledInputElements[] = [
  {
    inputType: "input",
    name: "text",
    label: "Tekst",
  },
  {
    inputType: "toggle-group",
    name: "textAlign",
    label: "Wyrównanie tekstu",
    items: [
      {
        label: "Do lewej",
        value: "left",
      },
      {
        label: "Do prawej",
        value: "right",
      },
    ],
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
    inputType: "input",
    name: "fontFamily",
    label: "Krój pisma",
    defaultValue: "Poppins",
  },
  {
    inputType: "input",
    name: "fontWeight",
    label: "Waga pisma",
    defaultValue: "normal",
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
    inputType: "input",
    name: "textAlign",
    label: "Wyrównanie tekstu",
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
