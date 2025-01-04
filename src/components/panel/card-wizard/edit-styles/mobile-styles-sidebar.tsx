"use client";

import React from "react";
import { CaseSensitive, PaintBucket, Sticker } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/common";
import { PersonalizeText } from "./text/personalize-text";
import { PersonalizeColors } from "./colors";
import { PersonalizeDecorations } from "./decorations";
import { Tooltip } from "~/components/special/tooltip";

export const MobileStylesSidebar = () => {
  return (
    <div className="flex h-[70vh] flex-col">
      <Tabs defaultValue="style-text" className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="style-text" className="h-full">
            <PersonalizeText />
          </TabsContent>
          <TabsContent value="style-colors" className="h-full">
            <PersonalizeColors />
          </TabsContent>
          <TabsContent value="style-decorations" className="h-full">
            <PersonalizeDecorations />
          </TabsContent>
        </div>

        <div className="border-t bg-background p-2">
          <TabsList className="grid w-full grid-cols-3">
            {styleTabs.map(tab => (
              <TabsTrigger key={`mobile-styles-${tab.value}`} value={tab.value}>
                <Tooltip label={tab.label}>{tab.icon}</Tooltip>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

const styleTabs = [
  { value: "style-text", label: "Tekst", icon: <CaseSensitive size={18} /> },
  { value: "style-colors", label: "Kolory", icon: <PaintBucket size={18} /> },
  { value: "style-decorations", label: "Dekoracje", icon: <Sticker size={18} /> },
]; 