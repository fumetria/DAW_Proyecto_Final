import { Metadata } from "next";
import {
  getPendingReceipts,
  getEndDays,
  getAllPendingReceipts,
} from "@/app/lib/end-day.action";
import EndDayTabs from "@/app/ui/dashboard/end-day/EndDayTabs";
import { robotoFlex } from "@/app/fonts";
import Link from "next/link";
import { getUserRole } from "@/app/lib/login.action";

export const metadata: Metadata = {
  title: "Dashboard Cierre de Caja",
};

export default async function Page(props: {
  searchParams?: Promise<{
    tab?: string;
    dateFrom?: string;
    dateTo?: string;
    showAll?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const tab = searchParams?.tab === "history" ? "history" : "pending";
  const dateFrom = searchParams?.dateFrom ?? "";
  const dateTo = searchParams?.dateTo ?? "";
  const showAll =
    searchParams?.showAll === "1" || searchParams?.showAll === "true";
  const role = await getUserRole();

  const [receipts, endDays] = await Promise.all([
    role === "admin" && showAll
      ? getAllPendingReceipts()
      : getPendingReceipts(),
    getEndDays(dateFrom || undefined, dateTo || undefined),
  ]);

  const showAllReceipts = role === "admin" && showAll;

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="mb-5 flex shrink-0 justify-between items-center">
        <h1
          className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}
        >
          Cierre de caja
        </h1>
        {role === "user" && (
          <Link
            href={"/dashboard"}
            className="rounded-lg px-3 py-2 text-stone-50 bg-orange-500 hover:bg-orange-300 dark:text-slate-50 dark:bg-slate-400 dark:hover:bg-slate-300"
          >
            <p>Volver</p>
          </Link>
        )}
      </div>
      <div className="min-h-0 flex-1">
        <EndDayTabs
        pendingReceipts={receipts}
        endDays={endDays}
        dateFrom={dateFrom}
        dateTo={dateTo}
        initialTab={tab}
        role={role ? role : "user"}
        showAllReceipts={showAllReceipts}
      />
      </div>
    </section>
  );
}
