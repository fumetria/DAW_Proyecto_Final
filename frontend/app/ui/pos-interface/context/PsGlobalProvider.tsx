"use client";

import { PsGlobalContext } from "./PsGlobalContext";
import { useState } from "react";

export default function PsGlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <PsGlobalContext.Provider
      value={{ selectedCategory, setSelectedCategory, handleSelectedCategory }}
    >
      {children}
    </PsGlobalContext.Provider>
  );
}
