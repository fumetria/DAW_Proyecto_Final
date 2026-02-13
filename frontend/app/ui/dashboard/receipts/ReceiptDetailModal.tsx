"use client";

import { useEffect, useState, Fragment } from "react";
import {
  getReceiptDetail,
  type ReceiptDetail,
} from "@/app/lib/receipts.action";

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

export default function ReceiptDetailModal({
  numReceipt,
  onClose,
}: {
  numReceipt: string | null;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<ReceiptDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!numReceipt) {
      queueMicrotask(() => {
        setDetail(null);
        setLoading(false);
      });
      return;
    }
    queueMicrotask(() => setLoading(true));
    getReceiptDetail(numReceipt)
      .then(setDetail)
      .finally(() => setLoading(false));
  }, [numReceipt]);

  if (numReceipt == null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-slate-700">
          <h2 className="text-lg font-semibold">Ticket {numReceipt}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1.5 text-stone-500 hover:bg-stone-200 hover:text-stone-800 dark:hover:bg-slate-600 dark:hover:text-slate-200"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-4">
          {loading ? (
            <p className="text-center text-stone-500">Cargando...</p>
          ) : !detail ? (
            <p className="text-center text-stone-500">
              No se encontró el ticket.
            </p>
          ) : (
            <div className="space-y-4">
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="font-medium text-stone-500 dark:text-slate-400">
                  Fecha:
                </dt>
                <dd>{formatDate(detail.created_at)}</dd>
                <dt className="font-medium text-stone-500 dark:text-slate-400">
                  Usuario:
                </dt>
                <dd>{detail.user_email}</dd>
                <dt className="font-medium text-stone-500 dark:text-slate-400">
                  Total:
                </dt>
                <dd className="font-semibold">{formatPrice(detail.total)}</dd>
                <dt className="font-medium text-stone-500 dark:text-slate-400">
                  F. Pago:
                </dt>
                <dd className="font-semibold">{detail.payment_method}</dd>
              </dl>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-stone-600 dark:text-slate-300">
                  Líneas
                </h3>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-slate-600">
                      <th className="py-1.5 pr-2 font-medium">Cód.</th>
                      <th className="py-1.5 pr-2 font-medium">Artículo</th>
                      <th className="py-1.5 text-right font-medium w-14">
                        Cant.
                      </th>
                      <th className="py-1.5 text-right font-medium">Precio</th>
                      <th className="py-1.5 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.lines.map((line) => (
                      <Fragment key={line.id}>
                        <tr className="border-b border-stone-100 dark:border-slate-700">
                          <td className="py-1.5 pr-2 align-top">
                            {line.cod_art}
                          </td>
                          <td className="py-1.5 pr-2 align-top">
                            {line.article_name ?? "—"}
                          </td>
                          <td className="py-1.5 text-right align-top">
                            {line.quantity}
                          </td>
                          <td className="py-1.5 text-right align-top">
                            {formatPrice(line.price)}
                          </td>
                          <td className="py-1.5 text-right align-top">
                            {formatPrice(line.total)}
                          </td>
                        </tr>
                        {line.details?.trim() ? (
                          <tr className="border-b border-stone-100 dark:border-slate-700">
                            <td className="pb-1.5 pt-0 pr-2" />
                            <td
                              colSpan={4}
                              className="pb-1.5 pt-0 pr-2 text-stone-500 dark:text-slate-400 text-xs italic"
                            >
                              {line.details.trim()}
                            </td>
                          </tr>
                        ) : null}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
