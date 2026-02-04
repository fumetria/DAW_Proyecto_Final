"use client";

import { usePsGlobalContext } from "../context/PsGlobalContext";

export default function PosFooter() {
  const { lastReceipt } = usePsGlobalContext();
  return (
    <div className="flex gap-2 odd:border-e border-stone-300">
      <div className="border-e border-stone-300 px-2">
        <p>
          Usuario: <span>Usuario1</span>
        </p>
      </div>
      <div className="border-e border-stone-300 px-2">
        <p>
          Último ticket:{" "}
          <span>
            {lastReceipt?.num_receipt ? lastReceipt.num_receipt.toString() : ""}
          </span>
        </p>
      </div>
      <div className="border-e border-stone-300 px-2">
        Importe:{" "}
        <span>
          {lastReceipt?.total
            ? Number(lastReceipt.total)
                .toFixed(2)
                .toString()
                .replace(".", ",") + "€"
            : ""}
        </span>
      </div>
    </div>
  );
}
