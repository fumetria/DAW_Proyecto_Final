
import { Metadata } from 'next';
import {
  fetchDashboardStats,
  fetchRecentReceipts,
  fetchMonthlyRevenue,
} from '@/app/lib/data';
import StatsCards from '@/app/ui/dashboard/stats-cards';
import RecentTickets from '@/app/ui/dashboard/recent-tickets';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { Suspense } from 'react';
// import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Dashboard Home',
};

export default async function Page() {
  const { totalTickets, totalRevenue } = await fetchDashboardStats();
  const recentReceipts = await fetchRecentReceipts();
  const monthlyRevenue = await fetchMonthlyRevenue();

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl font-semibold text-stone-900 dark:text-slate-50">
        Vista general
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCards
          totalTickets={totalTickets}
          totalRevenue={totalRevenue}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="md:col-span-4 lg:col-span-4">
          <RevenueChart revenue={monthlyRevenue} />
        </div>
        <div className="md:col-span-4 lg:col-span-4">
          <RecentTickets latestReceipts={recentReceipts} />
        </div>
      </div>
    </main>
  );
}
