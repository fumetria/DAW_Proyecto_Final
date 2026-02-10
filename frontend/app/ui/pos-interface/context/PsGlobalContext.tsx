"use client";
import { createContext, useContext } from "react";
import { article, lastReceipt, receiptLineTable } from "@/app/lib/types/types";

interface PsGlobalContextType {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSelectedCategory: (category: string) => void;
  receiptLinesTable: receiptLineTable[];
  setReceiptLinesTable: React.Dispatch<
    React.SetStateAction<receiptLineTable[]>
  >;
  handleNewReceiptLine: (article: article) => void;
  totalReceipt: number;
  setTotalReceipt: React.Dispatch<React.SetStateAction<number>>;
  selectedReceiptLine: receiptLineTable | undefined;
  setSelectedReceiptLine: React.Dispatch<
    React.SetStateAction<receiptLineTable | undefined>
  >;
  handleDeleteLine: (selectedReceiptLine: receiptLineTable) => void;
  handleAddReceiptDetails: (codArt: string, details: string) => void;
  handleUpdateQLine: (codArt: string, quantity: number) => void;
  lastReceipt: lastReceipt | undefined;
  setLastReceipt: React.Dispatch<React.SetStateAction<lastReceipt | undefined>>;
}

export const PsGlobalContext = createContext<PsGlobalContextType | undefined>(
  undefined
);

export function usePsGlobalContext() {
  const context = useContext(PsGlobalContext);
  if (!context) {
    throw new Error(
      "usePsGlobalContext debe usarse dentro de usePsGlobalProvider"
    );
  }
  return context;
}
