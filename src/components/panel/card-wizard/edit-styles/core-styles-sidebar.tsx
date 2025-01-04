import React from "react";

import { CaseSensitive, PaintBucket, Sticker } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/common";
import { Tooltip } from "~/components/special/tooltip";

import { PersonalizeColors } from "./colors";
import { PersonalizeDecorations } from "./decorations";
import { PersonalizeText } from "./text/personalize-text";


export const CoreStylesSidebar = () => {
  return (
    <div className="space-y-4 border-l-2 border-backgroundBorder pl-4 lg:order-2">
      <Tabs defaultValue="style-text">
        <TabsList className="grid grid-cols-3">
          {styleTabs.map(tab => (
            <TabsTrigger key={`core-styles-sidebar-${tab.value}`} value={tab.value}>
              <Tooltip label={tab.label}>{tab.icon}</Tooltip>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="style-text" className="flex flex-col gap-4">
          <PersonalizeText />
        </TabsContent>
        <TabsContent value="style-colors">
          <PersonalizeColors />
        </TabsContent>
        <TabsContent value="style-decorations">
          <PersonalizeDecorations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const styleTabs = [
  { value: "style-text", label: "Tekst", icon: <CaseSensitive size={18} /> },
  { value: "style-colors", label: "Kolory", icon: <PaintBucket size={18} /> },
  { value: "style-decorations", label: "Dekoracje", icon: <Sticker size={18} /> },
];
