"use client";

import { useState } from "react";

import { Settings2 } from "lucide-react";

import { cn } from "~/utils";

import { Button } from "~/components/common";

import { MobileStylesSidebar } from "./mobile-styles-sidebar";

export const FloatingStylesButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 lg:hidden">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "rounded-full bg-background shadow-md transition-transform",
          )}
        >
          <Settings2 className="size-6" />
        </Button>

        {isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 w-80 rounded-lg border bg-background shadow-lg">
            <MobileStylesSidebar />
          </div>
        )}
      </div>
    </div>
  );
}; 