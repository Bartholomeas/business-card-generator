import { type InputControlledProps } from "~/components/form";

export const textElementConfigInputs: InputControlledProps[] = [
  {
    name: "text",
    label: "Tekst",
  },
  {
    name: "color",
    label: "Kolor",
  },
  {
    name: "fontSize",
    label: "Rozmiar tekstu",
    type: "number",
  },
  {
    name: "fontFamily",
    label: "Krój pisma",
    defaultValue: "Poppins",
  },
  {
    name: "fontWeight",
    label: "Waga pisma",
    defaultValue: "normal",
  },
  {
    name: "letterSpacing",
    label: "Odstępy między znakami",
  },
  {
    name: "lineHeight",
    label: "Wysokość linii",
  },
  {
    name: "textAlign",
    label: "Wyrównanie tekstu",
  },
  {
    name: "textDecoration",
    label: "Dekoracje tekstu",
  },
  {
    name: "zIndex",
    label: "Priorytet kolejności",
    defaultValue: "0",
  },
];
