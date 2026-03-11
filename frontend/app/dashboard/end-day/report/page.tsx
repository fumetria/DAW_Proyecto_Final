import { getEndDays } from "@/app/lib/end-day.action";
import Link from "next/link";
import { robotoFlex } from "@/app/fonts";
import EndDayPDFPreviewClient from "../../../ui/dashboard/end-day/EndDayPDFPreviewClient";

export default async function Page(props: {
  searchParams?: Promise<{ dateFrom?: string; dateTo?: string }>;
}) {
  const searchParams = await props.searchParams;
  const dateFrom = searchParams?.dateFrom ?? "";
  const dateTo = searchParams?.dateTo ?? "";

  const endDays = await getEndDays(dateFrom, dateTo);
  /***
   * Ahora mismo, en EndDayTabs, mandamos por parametros en la url de la fecha de inicio y fin del informe a end-days/report?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD
   * con estos datos hacemos fetch de los end-days y cuando esten hay que pasarles los datos al componente
   */
  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
        <h1
          className={`${robotoFlex.className} text-2xl font-semibold text-stone-500 dark:text-slate-50`}
        >
          Informe PDF – Cierres de Caja
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
