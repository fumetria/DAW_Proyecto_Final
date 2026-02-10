"use client";

import { lastReceipt } from "@/app/lib/types/types";
import { usePsGlobalContext } from "../context/PsGlobalContext";

export default function PosFooter({
  userName,
  lReceipt,
}: {
  userName: string;
  lReceipt: lastReceipt;
}) {
  const { lastReceipt } = usePsGlobalContext();

  return (
    <div className="flex gap-2 odd:border-e border-stone-300">
      <div className="border-e border-stone-300 px-2">
        <p>
          Usuario: <span>{userName}</span>
        </p>
      </div>
      <div className="border-e border-stone-300 px-2">
        <p>
          Último ticket:{" "}
          <span>
            {lastReceipt?.num_receipt
              ? lastReceipt.num_receipt.toString()
              : lReceipt.num_receipt.toString()}
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
            : Number(lReceipt.total).toFixed(2).toString().replace(".", ",") +
              "€"}
        </span>
      </div>
    </div>
  );
}
