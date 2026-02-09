"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PendingReceiptsTable from "./PendingReceiptsTable";
import EndDaysTable from "./EndDaysTable";
import { createEndDay } from "@/app/lib/end-day.action";
import type { PendingReceiptRow, EndDayRow } from "@/app/lib/end-day.action";

type TabId = "pending" | "history";

export default function EndDayTabs({
    pendingReceipts,
    endDays,
    dateFrom,
    dateTo,
    initialTab = "pending",
}: {
    pendingReceipts: PendingReceiptRow[];
    endDays: EndDayRow[];
    dateFrom: string;
    dateTo: string;
    initialTab?: TabId;
}) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabId>(initialTab);
    const [closing, setClosing] = useState(false);
    const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

    const handleCerrarCaja = async () => {
        setClosing(true);
        setMessage(null);
        const result = await createEndDay();
        setClosing(false);
        if (result.ok) {
            setMessage({ type: "ok", text: "Cierre de caja realizado correctamente." });
            router.refresh();
        } else {
            setMessage({ type: "error", text: result.error ?? "Error al cerrar caja." });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 border-b border-stone-300 dark:border-slate-700">
                <button
                    type="button"
                    onClick={() => setActiveTab("pending")}
                    className={`px-4 py-2 rounded-t font-medium transition-colors ${
                        activeTab === "pending"
                            ? "bg-stone-200 dark:bg-slate-600 text-stone-900 dark:text-slate-100 border-b-2 border-cyan-500 dark:border-cyan-400 -mb-px"
                            : "bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-700"
                    }`}
                >
                    Pendientes de cierre
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("history")}
                    className={`px-4 py-2 rounded-t font-medium transition-colors ${
                        activeTab === "history"
                            ? "bg-stone-200 dark:bg-slate-600 text-stone-900 dark:text-slate-100 border-b-2 border-cyan-500 dark:border-cyan-400 -mb-px"
                            : "bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-700"
                    }`}
                >
                    Histórico de cierres
                </button>
            </div>

            {message && (
                <div
                    className={`rounded-lg px-4 py-2 ${
                        message.type === "ok"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                            : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                    }`}
                >
                    {message.text}
                </div>
            )}

            {activeTab === "pending" && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCerrarCaja}
                            disabled={pendingReceipts.length === 0 || closing}
                            className="rounded-lg px-4 py-2 bg-cyan-600 text-white font-medium hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-cyan-500 dark:hover:bg-cyan-400"
                        >
                            {closing ? "Cerrando..." : "Cerrar caja"}
                        </button>
                    </div>
                    <PendingReceiptsTable receipts={pendingReceipts} />
                </div>
            )}

            {activeTab === "history" && (
                <div className="space-y-4">
                    <form
                        method="get"
                        action="/dashboard/end-day"
                        className="flex flex-wrap items-end gap-3"
                    >
                        <input type="hidden" name="tab" value="history" />
                        <label className="flex flex-col gap-1 text-sm">
                            <span className="text-stone-600 dark:text-slate-400">Desde</span>
                            <input
                                type="date"
                                name="dateFrom"
                                defaultValue={dateFrom || undefined}
                                className="rounded border border-stone-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                            <span className="text-stone-600 dark:text-slate-400">Hasta</span>
                            <input
                                type="date"
                                name="dateTo"
                                defaultValue={dateTo || undefined}
                                className="rounded border border-stone-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                            />
                        </label>
                        <button
                            type="submit"
                            className="rounded-lg px-4 py-2 bg-stone-200 dark:bg-slate-600 text-stone-800 dark:text-slate-100 font-medium hover:bg-stone-300 dark:hover:bg-slate-500"
                        >
                            Filtrar
                        </button>
                    </form>
                    <EndDaysTable endDays={endDays} />
                </div>
            )}
        </div>
    );
}
