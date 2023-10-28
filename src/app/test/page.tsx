"use client";

import React from "react";
import { Button } from "~/components/ui/button";

const Test = () => {
  return (
    <>
      <Button
        onClick={() => {
          console.log("klik");
        }}
      >
        Default
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          console.log("klik");
        }}
      >
        Outline
      </Button>
    </>
  );
};
export default Test;
