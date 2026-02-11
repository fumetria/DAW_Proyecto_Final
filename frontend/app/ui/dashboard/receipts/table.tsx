"use client";

import { useState } from "react";
import { faEye, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReceiptRow } from "@/app/lib/receipts.action";
import ReceiptDetailModal from "./ReceiptDetailModal";

function formatPrice(n: number) {
    return n.toFixed(2).replace(".", ",") + " €";
}

function formatDate(d: Date | null) {
    if (!d) return "—";
    return new Date(d).toLocaleString("es-ES", {
        dateStyle: "short",
        timeStyle: "short",
    });
}

export default function ReceiptsTable({
    receipts,
}: {
    receipts: ReceiptRow[];
}) {
    const [detailNumReceipt, setDetailNumReceipt] = useState<string | null>(null);

    return (
        <>
            <section className="md:hidden">
                <table className="bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
                    <thead className="rounded-lg">
                        <tr className="border-stone-300 border-b dark:border-slate-900">
                            <th scope="col" className="p-2 md:p-3 md:font-semibold text-center">
                                Núm. Ticket
                            </th>
                            {/* <th scope="col" className="p-3 font-semibold text-center">
                                Fecha
                            </th> */}
                            <th scope="col" className="p-2 md:p-3 md:font-semibold text-center">
                                Total
                            </th>
                            {/* <th scope="col" className="p-2 md:p-3 md:font-semibold text-center">
                                Forma pago
                            </th> */}
                            {/* <th scope="col" className="p-3 font-semibold text-center">
                                Usuario
                            </th> */}
                            <th scope="col" className="p-2 md:p-3 md:font-semibold text-center">
                                Cierre de caja
                            </th>
                            <th scope="col" className="p-2 md:p-3 md:font-semibold text-center flex items-center justify-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts?.map((receipt) => (
                            <tr
                                key={receipt.id}
                                className="border-b border-stone-300 last:border-none dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
                            >
                                <td className="p-2 md:p-3 text-center">
                                    <p>{receipt.num_receipt}</p>
                                    <p className="text-sm text-stone-600 dark:text-slate-400">{formatDate(receipt.created_at)}</p>
                                </td>
                                {/* <td className="p-3 text-center">
                                    {formatDate(receipt.created_at)}
                                </td> */}
                                <td className="p-3 text-center text-sm md:text-base">
                                    {formatPrice(receipt.total)}
                                </td>
                                {/* <td className="p-3 text-center text-sm md:text-base">
                                    {receipt.payment_method ?? "—"}
                                </td> */}
                                {/* <td className="p-3 text-center">
                                    {receipt.user_email}
                                </td> */}
                                <td className="p-3 text-center">
                                    {receipt.is_open ? "Pendiente" : "Incluido"}
                                </td>
                                <td className="p-3 flex justify-center gap-2 text-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => setDetailNumReceipt(receipt.num_receipt)}
                                        className="rounded-md p-1 md:p-2 bg-blue-600 text-stone-100 hover:bg-blue-200 hover:text-blue-600 dark:bg-slate-600 dark:hover:bg-cyan-400 dark:hover:text-slate-50"
                                        title="Ver detalle"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button
                                        type="button"
                                        title="Imprimir (próximamente)"
                                        className="rounded-md p-1 md:p-2 bg-stone-400 text-stone-100 hover:bg-stone-300 dark:bg-slate-600 dark:hover:bg-slate-500 cursor-not-allowed opacity-70"
                                    >
                                        <FontAwesomeIcon icon={faPrint} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section className="hidden md:block">
                <table className="bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
                    <thead className="rounded-lg">
                        <tr className="border-stone-300 border-b dark:border-slate-900">
                            <th scope="col" className="px-2 py-3 font-semibold text-center">
                                Núm. Ticket
                            </th>
                            <th scope="col" className="p-3 font-semibold text-center">
                                Fecha
                            </th>
                            <th scope="col" className="p-3 font-semibold text-center">
                                Total
                            </th>
                            <th scope="col" className="p-3 font-semibold text-center">
                                Forma pago
                            </th>
                            <th scope="col" className="p-3 font-semibold text-center">
                                Usuario
                            </th>
                            <th scope="col" className="p-3 font-semibold text-center">
                                Cierre de caja
                            </th>
                            <th scope="col" className="p-3 font-semibold text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts?.map((receipt) => (
                            <tr
                                key={receipt.id}
                                className="border-b border-stone-300 last:border-none dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
                            >
                                <td className="px-2 py-3 text-center">
                                    {receipt.num_receipt}
                                </td>
                                <td className="p-3 text-center">
                                    {formatDate(receipt.created_at)}
                                </td>
                                <td className="p-3 text-center">
                                    {formatPrice(receipt.total)}
                                </td>
                                <td className="p-3 text-center">
                                    {receipt.payment_method ?? "—"}
                                </td>
                                <td className="p-3 text-center">
                                    {receipt.user_email}
                                </td>
                                <td className="p-3 text-center">
                                    {receipt.is_open ? "Pendiente" : "Incluido"}
                                </td>
                                <td className="p-3 flex justify-center gap-2 text-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => setDetailNumReceipt(receipt.num_receipt)}
                                        className="rounded-md p-2 bg-blue-600 text-stone-100 hover:bg-blue-200 hover:text-blue-600 dark:bg-slate-600 dark:hover:bg-cyan-400 dark:hover:text-slate-50"
                                        title="Ver detalle"
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button
                                        type="button"
                                        title="Imprimir (próximamente)"
                                        className="rounded-md p-2 bg-stone-400 text-stone-100 hover:bg-stone-300 dark:bg-slate-600 dark:hover:bg-slate-500 cursor-not-allowed opacity-70"
                                    >
                                        <FontAwesomeIcon icon={faPrint} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <ReceiptDetailModal
                numReceipt={detailNumReceipt}
                onClose={() => setDetailNumReceipt(null)}
            />
        </>
    );
}
