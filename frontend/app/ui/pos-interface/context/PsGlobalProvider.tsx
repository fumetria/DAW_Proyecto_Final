"use client";

import { article, receiptLineTable } from "@/app/lib/types/types";
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
  const [receiptLinesTable, setReceiptLinesTable] = useState<
    receiptLineTable[]
  >([]);
  const [totalReceipt, setTotalReceipt] = useState<number>(0);

  const [selectedReceiptLine, setSelectedReceiptLine] = useState<
    receiptLineTable | undefined
  >(undefined);

  const handleNewReceiptLine = (article: article) => {
    setReceiptLinesTable((prevLines: receiptLineTable[]) => {
      // Si el articulo ya esta en pantalla, nos dará el indice de este
      const existingIndex = prevLines.findIndex(
        (line) => line.cod_art === article.cod_art
      );

      if (existingIndex !== -1) {
        const updatedLines = [...prevLines];
        // Accedemos al articulo usando el indice que hemos obtenido anteriormente
        const existingLine = { ...updatedLines[existingIndex] };
        // Actualizamos las cantidades y totales
        existingLine.quantity = Number(existingLine.quantity) + 1;
        existingLine.total =
          Number(existingLine.quantity) * Number(existingLine.price);
        // Actualizamos la linea y devolvemos el array actualizado para
        // que se actualize en la función setArticlesLines
        updatedLines[existingIndex] = existingLine;
        return updatedLines;
      } else {
        const newLine = {
          cod_art: article.cod_art,
          name: article.name,
          quantity: 1,
          price: Number(article.pvp),
          total: Number(article.pvp),
        };
        return [...prevLines, newLine];
      }
    });
  };

  const handleDeleteLine = (selectedReceiptLine: receiptLineTable) => {
    const newReceiptLinesList = receiptLinesTable.filter(
      (receiptLine) => receiptLine.cod_art != selectedReceiptLine?.cod_art
    );
    setReceiptLinesTable(newReceiptLinesList);
    setSelectedReceiptLine(undefined);
  };

  const handleAddReceiptDetails = (codArt: string, details: string) => {
    setReceiptLinesTable((prevLines) =>
      prevLines.map((line) =>
        line.cod_art === codArt ? { ...line, details } : line
      )
    );
  };

  return (
    <PsGlobalContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        handleSelectedCategory,
        receiptLinesTable,
        setReceiptLinesTable,
        handleNewReceiptLine,
        totalReceipt,
        setTotalReceipt,
        selectedReceiptLine,
        setSelectedReceiptLine,
        handleDeleteLine,
        handleAddReceiptDetails,
      }}
    >
      {children}
    </PsGlobalContext.Provider>
  );
}
