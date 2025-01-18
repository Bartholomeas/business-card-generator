"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type CardSide = "front" | "back";

interface FlipContextType {
  isFlipped: boolean;
  currentSide: CardSide;
  handleFlip: () => void;
}

const FlipContext = createContext<FlipContextType | null>(null);

export const useFlipState = () => {
  const context = useContext(FlipContext);
  if (!context) {
    throw new Error("useFlipState must be used within FlipProvider");
  }
  return context;
};

interface FlipProviderProps {
  children: ReactNode;
}

export const FlipProvider = ({ children }: FlipProviderProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const currentSide: CardSide = isFlipped ? "back" : "front";

  const handleFlip = () => {
    setIsFlipped(prev => {
      return !prev;
    });
  };

  return (
    <FlipContext.Provider value={{ isFlipped, currentSide, handleFlip }}>
      {children}
    </FlipContext.Provider>
  );
};

export const useCurrentCardSide = (): CardSide => {
  const context = useContext(FlipContext);
  if (!context) {
    throw new Error("useCurrentCardSide must be used within FlipProvider");
  }
  return context.currentSide;
};
