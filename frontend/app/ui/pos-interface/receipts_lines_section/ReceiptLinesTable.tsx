"use client";

import { usePsGlobalContext } from "../context/PsGlobalContext";
import ReceiptLine from "./receipt-line";

export default function ReceiptLinesTable() {
  const { receiptLinesTable } = usePsGlobalContext();
  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="row-start-1 row-end-2 h-full">
          <table className="h-full w-full table-auto">
            <thead className="bg-stone-600 overflow-y-scroll">
              <tr className="text-stone-100">
                <th>Ref.</th>
                <th>Description</th>
                <th>Details</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="bg-stone-100 text-blue-900">
              {receiptLinesTable.length > 0 &&
                receiptLinesTable.map((receiptLine) => (
                  <ReceiptLine
                    key={receiptLine.cod_art}
                    receiptLine={receiptLine}
                    // handleSelectedReceiptLine={handleNewReceiptLine}
                    // isSelected={selectedReceiptLine?.id === articleLine.id}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
