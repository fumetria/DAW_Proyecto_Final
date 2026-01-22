"use client";

import { receiptLineTable } from "@/app/lib/types/types";
import { usePsGlobalContext } from "../context/PsGlobalContext";
import ReceiptLine from "./receipt-line";

export default function ReceiptLinesTable() {
  const { receiptLinesTable, selectedReceiptLine, setSelectedReceiptLine } =
    usePsGlobalContext();

  const handleSelectedReceiptLine = (receiptLine: receiptLineTable) => {
    setSelectedReceiptLine(receiptLine);
  };
  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="row-start-1 row-end-2 h-full">
          <table className="h-full w-full table-auto">
            <thead className="bg-stone-600 overflow-y-scroll">
              <tr className="text-stone-100">
                <th>Ref.</th>
                <th>Decripción</th>
                <th>Detalles</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="bg-stone-100 text-blue-900">
              {receiptLinesTable.length > 0 &&
                receiptLinesTable.map((receiptLine) => (
                  <ReceiptLine
                    key={receiptLine.cod_art}
                    receiptLine={receiptLine}
                    handleSelectedReceiptLine={handleSelectedReceiptLine}
                    isSelected={
                      selectedReceiptLine?.cod_art === receiptLine.cod_art
                    }
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
