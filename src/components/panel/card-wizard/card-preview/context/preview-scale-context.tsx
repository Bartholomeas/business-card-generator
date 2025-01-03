"use client";
import { createContext, useContext } from "react";

interface PreviewScaleContextType {
  scale: number;
}

const PreviewScaleContext = createContext<PreviewScaleContextType | null>(null);

export const usePreviewScale = () => {
  const context = useContext(PreviewScaleContext);
  if (context === null) {
    throw new Error('usePreviewScale must be used within a PreviewScaleProvider');
  }
  return context;
};

export { PreviewScaleContext }; 