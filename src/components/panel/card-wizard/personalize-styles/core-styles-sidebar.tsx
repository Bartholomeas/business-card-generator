"use client";

import React from "react";
import { Tooltip } from "~/components/common/special/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PersonalizeColors } from "./personalize-colors";
import { PersonalizeText } from "./personalize-text";
import { PersonalizeDecorations } from "./personalize-decorations";
import { CaseSensitive, PaintBucket, Sticker } from "lucide-react";

export const CoreStylesSidebar = () => {
  return (
    <>
      <Tabs defaultValue="style-colors">
        <TabsList className="grid grid-cols-3">
          {styleTabs.map((tab) => (
            <TabsTrigger
              key={`core-styles-sidebar-${tab.value}-${tab.label}`}
              value={tab.value}
            >
              <Tooltip label={tab.label}>{tab.icon}</Tooltip>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="style-colors">
          <PersonalizeColors />
        </TabsContent>
        <TabsContent value="style-text">
          <PersonalizeText />
        </TabsContent>
        <TabsContent value="style-decorations">
          <PersonalizeDecorations />
        </TabsContent>
      </Tabs>
    </>
  );
};

const styleTabs = [
  { value: "style-colors", label: "Kolory", icon: <PaintBucket size={18} /> },
  { value: "style-text", label: "Tekst", icon: <CaseSensitive size={18} /> },
  {
    value: "style-decorations",
    label: "Dekoracje",
    icon: <Sticker size={18} />,
  },
];
