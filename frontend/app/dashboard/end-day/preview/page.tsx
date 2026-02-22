import { Metadata } from "next";
import Link from "next/link";
import EndDayPDFPreviewClient from "./EndDayPDFPreviewClient";
import { robotoFlex } from "@/app/fonts";
import { getEndDays } from "@/app/lib/end-day.action";

export const metadata: Metadata = {
  title: "Vista previa PDF - Cierre de Caja",
};

function defaultDateRange() {
  const year = new Date().getFullYear();
  return { from: `${year}-01-01`, to: `${year}-12-31` };
}

export default async function EndDayPreviewPage(props: {
  searchParams?: Promise<{ dateFrom?: string; dateTo?: string }>;
}) {
  const searchParams = await props.searchParams;
  const defaults = defaultDateRange();
  const dateFrom = searchParams?.dateFrom ?? defaults.from;
  const dateTo = searchParams?.dateTo ?? defaults.to;

  const endDays = await getEndDays(dateFrom, dateTo);

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
        <h1
          className={`${robotoFlex.className} text-2xl font-semibold text-stone-500 dark:text-slate-50`}
        >
          Vista previa PDF – Cierre de Caja
        </h1>
        <Link
          href="/dashboard/end-day"
          className="rounded-lg bg-stone-200 px-3 py-2 text-stone-700 hover:bg-stone-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500"
        >
          Volver a Cierre de caja
        </Link>
      </div>
      <div className="min-h-0 flex-1 rounded border border-stone-200 bg-stone-50 dark:border-slate-600 dark:bg-slate-900">
        <EndDayPDFPreviewClient
          dateFrom={dateFrom}
          dateTo={dateTo}
          endDays={endDays}
        />
      </div>
    </section>
  );
}
