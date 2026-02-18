import { Metadata } from "next";
import {
  fetchDashboardStats,
  fetchRecentReceipts,
  fetchMonthlyRevenue,
  fetchTicketsByPaymentMethod,
  fetchTicketsByUser,
} from "@/app/lib/data";
import StatsCards from "@/app/ui/dashboard/stats-cards";
import RecentTickets from "@/app/ui/dashboard/recent-tickets";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import PieChartsSection from "@/app/ui/dashboard/piecharts";
import { Suspense } from "react";
import { robotoFlex } from "@/app/fonts";
import { CardDashboardSkeleton } from "@/app/ui/dashboard/skeletons";
import { getUserRole } from "@/app/lib/login.action";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Home",
};

export default async function Page() {
  const role = await getUserRole();

  let ticketsByPaymentMethod: Awaited<
    ReturnType<typeof fetchTicketsByPaymentMethod>
  > = [];
  let ticketsByUser: Awaited<ReturnType<typeof fetchTicketsByUser>> = [];
  let recentReceipts: Awaited<ReturnType<typeof fetchRecentReceipts>> = [];
  let monthlyRevenue: Awaited<ReturnType<typeof fetchMonthlyRevenue>> = [];
  let totalTickets = 0;
  let totalRevenue = 0;
  let incomeThisMonth = 0;
  let incomeToday = 0;

  if (role === "admin") {
    const [byPaymentMethod, byUser, recent, monthly, stats] = await Promise.all(
      [
        fetchTicketsByPaymentMethod(),
        fetchTicketsByUser(),
        fetchRecentReceipts(),
        fetchMonthlyRevenue(),
        fetchDashboardStats(),
      ],
    );
    ticketsByPaymentMethod = byPaymentMethod;
    ticketsByUser = byUser;
    recentReceipts = recent;
    monthlyRevenue = monthly;
    totalTickets = stats.totalTickets;
    totalRevenue = stats.totalRevenue;
    incomeThisMonth = Number(stats.incomeThisMonth ?? 0);
    incomeToday = Number(stats.incomeToday ?? 0);
  }

  return (
    <main className="h-full">
      {role === "admin" ? (
        <>
          <h1
            className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50 mb-3`}
          >
            Vista general
          </h1>
          <div className="">
            <Suspense fallback={CardDashboardSkeleton()}>
              <StatsCards
                totalTickets={totalTickets}
                totalRevenue={totalRevenue}
                incomeThisMonth={Number(incomeThisMonth ?? 0)}
                incomeToday={Number(incomeToday ?? 0)}
              />
            </Suspense>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <div className="md:col-span-4 lg:col-span-4">
              <Suspense>
                <RevenueChart revenue={monthlyRevenue} />
              </Suspense>
            </div>
            <div className="md:col-span-4 lg:col-span-4">
              <Suspense>
                <RecentTickets latestReceipts={recentReceipts} />
              </Suspense>
            </div>
          </div>
          <PieChartsSection
            byPaymentMethod={ticketsByPaymentMethod}
            byUser={ticketsByUser}
          />
        </>
      ) : (
        <div
          id="user-dashboard"
          className="grid grid-rows-[auto_1fr] h-full w-full gap-2"
        >
          <div className="">
            <h2
              className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50 mb-3`}
            >
              Panel de control
            </h2>
          </div>
          <section className="flex flex-col md:flex-row grow items-center gap-8 justify-center h-full w-full">
            <Link
              href={"/dashboard/end-day"}
              className="flex items-center justify-center size-22 p-1 md:p-2 xl:size-42 2xl:size-52 rounded border border-transparent hover:border-blue-500 hover:text-blue-500  md:rounded-4xl bg-blue-500 hover:bg-blue-300 text-stone-50 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-50 dark:hover:border-transparent dark:hover:text-slate-200"
            >
              <p className="text-center text-wrap text-sm md:text-base xl:text-lg 2xl:text-2xl font-semibold">
                Cierre de caja
              </p>
            </Link>
            <Link
              href={"/pos"}
              className="flex items-center justify-center size-22 p-1 md:p-2 xl:size-42 2xl:size-52 rounded md:rounded-4xl border border-transparent hover:border-orange-500 hover:text-orange-500 bg-orange-500 hover:bg-orange-300 text-stone-50 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-50 dark:hover:border-transparent dark:hover:text-slate-200"
            >
              <p className="text-center text-wrap text-sm md:text-base  xl:text-lg 2xl:text-2xl font-semibold">
                Acceder a TPV
              </p>
            </Link>
          </section>
        </div>
      )}
    </main>
  );
}
