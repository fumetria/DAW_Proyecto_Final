"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PendingReceiptsTable from "./PendingReceiptsTable";
import EndDaysTable from "./EndDaysTable";
import { createEndDay } from "@/app/lib/end-day.action";
import type { PendingReceiptRow, EndDayRow } from "@/app/lib/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";

type TabId = "pending" | "history";

export default function EndDayTabs({
  pendingReceipts,
  endDays,
  dateFrom,
  dateTo,
  initialTab = "pending",
  role,
  showAllReceipts = false,
}: {
  pendingReceipts: PendingReceiptRow[];
  endDays: EndDayRow[];
  dateFrom: string;
  dateTo: string;
  initialTab?: TabId;
  role: string;
  showAllReceipts?: boolean;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const [closing, setClosing] = useState(false);
  const [message, setMessage] = useState<{
    type: "ok" | "error";
    text: string;
  } | null>(null);

  const handleCerrarCaja = async () => {
    setClosing(true);
    setMessage(null);
    const result = await createEndDay(showAllReceipts);
    setClosing(false);
    if (result.ok) {
      setMessage({
        type: "ok",
        text: "Cierre de caja realizado correctamente.",
      });
      router.refresh();
    } else {
      setMessage({
        type: "error",
        text: result.error ?? "Error al cerrar caja.",
      });
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-t font-medium transition-colors ${
            activeTab === "pending"
              ? "bg-stone-200 dark:bg-slate-600 text-stone-900 dark:text-slate-100 border-b-2 border-blue-500 dark:border-cyan-400 -mb-px"
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
              ? "bg-stone-200 dark:bg-slate-600 text-stone-900 dark:text-slate-100 border-b-2 border-blue-500 dark:border-cyan-400 -mb-px"
              : "bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-700"
          }`}
        >
          Histórico de cierres
        </button>
      </div>
      <section className="flex min-h-0 flex-1 flex-col overflow-auto rounded-b-xl rounded-tr-xl bg-stone-100 p-4 dark:bg-slate-800">
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
          <div className="mt-2 flex min-h-0 flex-1 flex-col">
            <div className="flex shrink-0 flex-wrap justify-end items-center gap-3">
              {role === "admin" &&
                (showAllReceipts ? (
                  <Link
                    href="/dashboard/end-day?tab=pending"
                    className="rounded-lg px-4 py-2 bg-stone-200 dark:bg-slate-600 text-stone-800 dark:text-slate-100 font-medium hover:bg-stone-300 dark:hover:bg-slate-500 inline-flex items-center gap-2"
                    title="Ver solo mis tickets"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="hidden sm:inline">Solo los míos</span>
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/end-day?tab=pending&showAll=1"
                    className="rounded-lg px-4 py-2 bg-stone-200 dark:bg-slate-600 text-stone-800 dark:text-slate-100 font-medium hover:bg-stone-300 dark:hover:bg-slate-500 inline-flex items-center gap-2"
                    title="Mostrar todos los tickets pendientes"
                  >
                    <FontAwesomeIcon icon={faEye} />
                    <span className="hidden sm:inline">Mostrar todos</span>
                  </Link>
                ))}
              <button
                type="button"
                onClick={handleCerrarCaja}
                disabled={pendingReceipts.length === 0 || closing}
                className="rounded-lg px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-cyan-500 dark:hover:bg-cyan-400"
              >
                {closing ? "Cerrando..." : "Cerrar caja"}
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              <PendingReceiptsTable receipts={pendingReceipts} />
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="flex min-h-0 flex-1 flex-col space-y-4 overflow-auto">
            <form
              method="get"
              action="/dashboard/end-day"
              className="flex flex-wrap items-end gap-3"
            >
              <input type="hidden" name="tab" value="history" />
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-stone-600 dark:text-slate-400">
                  Desde
                </span>
                <input
                  type="date"
                  name="dateFrom"
                  defaultValue={dateFrom || undefined}
                  className="rounded border border-stone-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-stone-600 dark:text-slate-400">
                  Hasta
                </span>
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
            <div className="min-h-0 flex-1 overflow-auto">
              <EndDaysTable endDays={endDays} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
