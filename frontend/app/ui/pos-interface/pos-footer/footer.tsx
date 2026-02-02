"use client";

import { receipt } from "@/app/lib/types/types";

export default function PosFooter({ receipt }: { receipt: receipt }) {
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
            {receipt.num_receipt ? receipt.num_receipt.toString() : ""}
          </span>
        </p>
      </div>
      <div className="border-e border-stone-300 px-2">
        Importe:{" "}
        <span>
          {receipt.total
            ? Number(receipt.total).toFixed(2).toString().replace(".", ",") +
              "€"
            : ""}
        </span>
      </div>
    </div>
  );
}
