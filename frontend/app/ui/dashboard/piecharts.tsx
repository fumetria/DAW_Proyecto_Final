"use client";

import { DashboardPieChartData } from "@/app/lib/types/types";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const CHART_COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
];

function SinglePieChart({
    data,
    title,
    emptyMessage = "Sin datos",
}: {
    data: DashboardPieChartData[];
    title: string;
    emptyMessage?: string;
}) {
    if (!data.length) {
        return (
            <div className="flex h-[280px] items-center justify-center rounded-xl bg-gray-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {emptyMessage}
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm dark:bg-slate-800">
            <h3 className="mb-3 text-lg font-semibold text-stone-600 dark:text-slate-200">
                {title}
            </h3>
            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            label={({ name, percent }) =>
                                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        CHART_COLORS[
                                            index % CHART_COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [
                                value ?? 0,
                                "Tickets",
                            ]}
                            contentStyle={{
                                borderRadius: "8px",
                                border: "none",
                                boxShadow:
                                    "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default function PieChartsSection({
    byPaymentMethod,
    byUser,
}: {
    byPaymentMethod: DashboardPieChartData[];
    byUser: DashboardPieChartData[];
}) {
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <SinglePieChart
                data={byPaymentMethod}
                title="Tickets por método de pago"
                emptyMessage="No hay tickets por método de pago"
            />
            <SinglePieChart
                data={byUser}
                title="Facturación por empleado"
                emptyMessage="No hay facturación por empleado"
            />
        </div>
    );
}
