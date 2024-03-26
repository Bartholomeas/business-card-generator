"use client";

import React from "react";
import { TextEditTrigger } from "./text-edit-trigger";
import { type TextElementCodes } from "~/server/api/routers/user";
import { useCardStylesStore } from "~/stores/card";

interface TextEditStylesDesktopProps {
  code?: TextElementCodes;
  className?: string;
}

export const TextEditStylesDesktop = ({ code, className }: TextEditStylesDesktopProps) => {
  const { setChoosenElement } = useCardStylesStore();

  return <TextEditTrigger handleClick={setChoosenElement} code={code} className={className} />;
};
