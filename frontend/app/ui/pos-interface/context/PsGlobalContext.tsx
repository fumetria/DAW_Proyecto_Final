"use client";
import { createContext, useContext } from "react";

interface PsGlobalContextType {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSelectedCategory: (category: string) => void;
}

export const PsGlobalContext = createContext<PsGlobalContextType | undefined>(
  undefined
);

export function usePsGlobalContext() {
  const context = useContext(PsGlobalContext);
  if (!context) {
    throw new Error(
      "usePsGlobbalContext debe usarse dentro de usePsGlobbalProvider"
    );
  }
  return context;
}
