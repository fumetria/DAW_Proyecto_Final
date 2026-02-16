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

export const metadata: Metadata = {
  title: "Dashboard Home",
};

export default async function Page() {
  const { totalTickets, totalRevenue } = await fetchDashboardStats();
  const recentReceipts = await fetchRecentReceipts();
  const monthlyRevenue = await fetchMonthlyRevenue();
  const [ticketsByPaymentMethod, ticketsByUser] = await Promise.all([
    fetchTicketsByPaymentMethod(),
    fetchTicketsByUser(),
  ]);

  return (
    <main>
      <h1
        className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50 mb-3`}
      >
        Vista general
      </h1>
      <div className="">
        <Suspense fallback={CardDashboardSkeleton()}>
          <StatsCards totalTickets={totalTickets} totalRevenue={totalRevenue} />
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
    </main>
  );
}
