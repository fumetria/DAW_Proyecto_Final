"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RevenueChart({
  revenue,
}: {
  revenue: { month: number; revenue: number }[];
}) {
  const chartHeight = 350;

  // Generate data for all 12 months, initializing with 0
  const chartData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((month) => ({ name: month, revenue: 0 }));

  // Update with actual data
  revenue.forEach((item) => {
    // month is 1-indexed from postgres EXTRACT(MONTH)
    const monthIndex = item.month - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      chartData[monthIndex].revenue = Number(item.revenue); // Ensure it's a number
    }
  });

  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl font-semibold text-stone-500 dark:text-slate-50">
        Ingresos por mes
      </h2>

      <div className="rounded-xl bg-gray-50 p-4 shadow-sm dark:bg-slate-800">
        <div className="dark:hidden sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 dark:bg-slate-900 md:gap-4">
          {/* Using HTML/CSS for a simpler chart if Recharts feels too heavy or if we want pure CSS */}
          {/* But sticking to Recharts as planned */}
          <div className="col-span-12 h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="hidden sm:grid-cols-13 mt-0 dark:grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 dark:bg-slate-900 md:gap-4">
          {/* Using HTML/CSS for a simpler chart if Recharts feels too heavy or if we want pure CSS */}
          {/* But sticking to Recharts as planned */}
          <div className="col-span-12 h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <FontAwesomeIcon
            icon={faCalendar}
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
          />
          <h3 className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Últimos 12 meses
          </h3>
        </div>
      </div>
    </div>
  );
}
