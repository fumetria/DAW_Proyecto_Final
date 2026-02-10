"use client";

import { useState } from "react";
import { faEye, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PendingReceiptRow } from "@/app/lib/types/types";
import ReceiptDetailModal from "@/app/ui/dashboard/receipts/ReceiptDetailModal";

function formatPrice(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

function formatDate(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("es-ES", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function PendingReceiptsTable({
  receipts,
}: {
  receipts: PendingReceiptRow[];
}) {
  const [detailNumReceipt, setDetailNumReceipt] = useState<string | null>(null);

  return (
    <>
      <section>
        {receipts?.length === 0 && (
          <div className="grid justify-items-center items-center bg-stone-100 dark:bg-slate-800 rounded-xl p-10 text-center text-stone-500 dark:text-slate-400">
            <FontAwesomeIcon icon={faFileInvoice} size="5x" />
            <p className="mt-4">
              No hay tickets pendientes de añadir al cierre de caja.
            </p>
          </div>
        )}
        {receipts?.length > 0 && (
          <table className="mt-4 bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
            <thead className="rounded-lg bg-stone-200 dark:bg-slate-700">
              <tr className="border-stone-300 border-b dark:border-slate-900">
                <th scope="col" className="px-2 py-3 font-semibold text-center">
                  Núm. Ticket
                </th>
                <th scope="col" className="p-3 font-semibold text-center">
                  Fecha
                </th>
                <th scope="col" className="p-3 font-semibold text-center">
                  Total
                </th>
                <th scope="col" className="p-3 font-semibold text-center">
                  Forma pago
                </th>
                <th scope="col" className="p-3 font-semibold text-center">
                  Usuario
                </th>
                <th scope="col" className="p-3 font-semibold text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="">
              {receipts?.map((receipt) => (
                <tr
                  key={receipt.id}
                  className="even:bg-stone-200 dark:even:bg-slate-700 border-b border-stone-300 last:border-none dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
                >
                  <td className="px-2 py-3 text-center">
                    {receipt.num_receipt}
                  </td>
                  <td className="p-3 text-center">
                    {formatDate(receipt.created_at)}
                  </td>
                  <td className="p-3 text-center">
                    {formatPrice(receipt.total)}
                  </td>
                  <td className="p-3 text-center">
                    {receipt.payment_method ?? "—"}
                  </td>
                  <td className="p-3 text-center">{receipt.user_email}</td>
                  <td className="p-3 flex justify-center gap-2 text-center items-center">
                    <button
                      type="button"
                      onClick={() => setDetailNumReceipt(receipt.num_receipt)}
                      className="rounded-md p-2 bg-blue-600 text-stone-100 hover:bg-blue-200 hover:text-blue-600 dark:bg-slate-600 dark:hover:bg-cyan-400 dark:hover:text-slate-50"
                      title="Ver detalle"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <ReceiptDetailModal
        numReceipt={detailNumReceipt}
        onClose={() => setDetailNumReceipt(null)}
      />
    </>
  );
}
