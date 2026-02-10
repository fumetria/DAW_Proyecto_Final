"use client";

import { useEffect } from "react";
import { usePsGlobalContext } from "../context/PsGlobalContext";

export default function TotalReceipt() {
  const { totalReceipt, setTotalReceipt, receiptLinesTable } =
    usePsGlobalContext();

  useEffect(() => {
    const updateTotalReceipt = () => {
      const total = receiptLinesTable.reduce(
        (totals, receiptLine) => totals + receiptLine.total,
        0
      );
      setTotalReceipt(total);
    };
    updateTotalReceipt();
  }, [receiptLinesTable, setTotalReceipt]);
  return (
    <>
      <h3 className="text-xl xl:text-4xl">
        Total:{" "}
        <span className="font-semibold text-xl xl:text-4xl">
          {Number(totalReceipt).toFixed(2).toString().replace(".", ",")}
        </span>{" "}
        €
      </h3>
    </>
  );
}
