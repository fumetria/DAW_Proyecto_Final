"use client";

import { useEffect, useState } from "react";
import { getEndDayDetail } from "@/app/lib/end-day.action";
import type { EndDayDetail } from "@/app/lib/types/types";
import Image from "next/image";

function formatPrice(n: number) {
  return n.toFixed(2).replace(".", ",") + " €";
}

function formatDateStr(s: string) {
  try {
    const d = new Date(s + "T12:00:00");
    if (isNaN(d.getTime())) return s;
    return d.toLocaleDateString("es-ES", { dateStyle: "short" });
  } catch {
    return s;
  }
}

function formatDate(d: Date | null) {
  if (!d) return "—";
  const date = new Date(d).toLocaleString("es-ES", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return date.toString().replace(",", "");
}

export default function EndDayDetailModal({
  endDayId,
  onClose,
}: {
  endDayId: string | null;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<EndDayDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!endDayId) {
      queueMicrotask(() => {
        setDetail(null);
        setLoading(false);
      });
      return;
    }
    queueMicrotask(() => setLoading(true));
    getEndDayDetail(endDayId)
      .then(setDetail)
      .finally(() => setLoading(false));
  }, [endDayId]);

  if (endDayId == null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-slate-700">
          <h2 className="text-lg font-semibold">Detalle del cierre de caja</h2>
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
            <div className="flex items-center justify-center gap-2">
              <style
                dangerouslySetInnerHTML={{
                  __html: `@keyframes loadingDots { 93.75%, 100% { opacity: 0.2; } }`,
                }}
              />
              <svg
                className="h-5 w-5 shrink-0 text-blue-500 dark:text-cyan-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <circle
                  cx="4"
                  cy="12"
                  r="3"
                  style={{
                    animation: "loadingDots 0.8s linear infinite",
                    animationDelay: "-0.8s",
                  }}
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  style={{
                    animation: "loadingDots 0.8s linear infinite",
                    animationDelay: "-0.65s",
                  }}
                />
                <circle
                  cx="20"
                  cy="12"
                  r="3"
                  style={{
                    animation: "loadingDots 0.8s linear infinite",
                    animationDelay: "-0.5s",
                  }}
                />
              </svg>
              <p className="text-center text-stone-500 dark:text-slate-400">
                Cargando...
              </p>
            </div>
          ) : !detail ? (
            <p className="text-center text-stone-500 dark:text-slate-400">
              No se encontró el cierre.
            </p>
          ) : (
            <div className="space-y-4">
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="font-medium text-stone-500 dark:text-slate-400">
                  Día del cierre:
                </dt>
                <dd>{formatDateStr(detail.date)}</dd>
                <dt className="font-medium text-stone-500 dark:text-slate-400">
                  Usuario:
                </dt>
                <dd>{detail.user_email}</dd>
                <dt className="font-medium text-stone-500 dark:text-slate-400">
                  Importe total:
                </dt>
                <dd className="font-semibold">{formatPrice(detail.total)}</dd>
              </dl>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-stone-600 dark:text-slate-300">
                  Tickets incluidos
                </h3>
                {detail.receipts.length === 0 ? (
                  <p className="rounded-lg bg-stone-100 py-3 text-center text-sm text-stone-500 dark:bg-slate-700 dark:text-slate-400">
                    Detalle de tickets no disponible para este cierre.
                  </p>
                ) : (
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 dark:border-slate-600">
                        <th className="py-1.5 pr-2 font-medium">Núm. ticket</th>
                        <th className="py-1.5 pr-2 font-medium">Fecha</th>
                        <th className="py-1.5 text-right font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.receipts.map((r) => (
                        <tr
                          key={r.num_receipt}
                          className="border-b border-stone-100 dark:border-slate-700"
                        >
                          <td className="py-1.5 pr-2">{r.num_receipt}</td>
                          <td className="py-1.5 pr-2">
                            {formatDate(r.created_at)}
                          </td>
                          <td className="py-1.5 text-right">
                            {formatPrice(r.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
