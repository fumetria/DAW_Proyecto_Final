"use client";

import type { EndDayRow } from "@/app/lib/types/types";

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

export default function EndDaysTable({ endDays }: { endDays: EndDayRow[] }) {
  return (
    <section>
      <table className="bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
        <thead className="rounded-lg">
          <tr className="border-stone-300 border-b dark:border-slate-900">
            <th scope="col" className="px-2 py-3 font-semibold text-center">
              Fecha
            </th>
            <th scope="col" className="p-3 font-semibold text-center">
              Total
            </th>
            <th scope="col" className="p-3 font-semibold text-center">
              Primer ticket
            </th>
            <th scope="col" className="p-3 font-semibold text-center">
              Último ticket
            </th>
            <th scope="col" className="p-3 font-semibold text-center">
              Nº tickets
            </th>
          </tr>
        </thead>
        <tbody>
          {endDays?.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center text-stone-500 dark:text-slate-400"
              >
                No hay cierres de caja para el filtro seleccionado.
              </td>
            </tr>
          ) : (
            endDays?.map((row) => (
              <tr
                key={row.id}
                className="border-b border-stone-300 last:border-none dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
              >
                <td className="px-2 py-3 text-center">
                  {formatDateStr(row.date)}
                </td>
                <td className="p-3 text-center">{formatPrice(row.total)}</td>
                <td className="p-3 text-center">{row.first_receipt_id}</td>
                <td className="p-3 text-center">{row.last_receipt_id}</td>
                <td className="p-3 text-center">{row.total_receipts}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
