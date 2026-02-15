"use client";

import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { getReceiptDetail, type ReceiptDetail } from "@/app/lib/receipts.action";
import ReceiptPdfDocument from "./ReceiptPdfDocument";

export default function ReceiptPrintModal({
  numReceipt,
  onClose,
}: {
  numReceipt: string | null;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<ReceiptDetail | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!numReceipt) {
      setDetail(null);
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setError(null);
      return;
    }

    let revoked = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const receiptDetail = await getReceiptDetail(numReceipt);
        if (!receiptDetail) {
          setError("No se encontró el ticket.");
          return;
        }
        if (revoked) return;
        setDetail(receiptDetail);

        const blob = await pdf(
          <ReceiptPdfDocument detail={receiptDetail} />
        ).toBlob();
        if (revoked) {
          URL.revokeObjectURL(URL.createObjectURL(blob));
          return;
        }
        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al generar el PDF.");
      } finally {
        if (!revoked) setLoading(false);
      }
    })();

    return () => {
      revoked = true;
    };
  }, [numReceipt]);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  if (numReceipt == null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-slate-700">
          <h2 className="text-lg font-semibold">Ticket {numReceipt} – Vista previa</h2>
          <div className="flex items-center gap-2">
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-1.5 text-sm bg-cyan-600 text-white hover:bg-cyan-500"
              >
                Abrir en nueva pestaña
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1.5 text-stone-500 hover:bg-stone-200 hover:text-stone-800 dark:hover:bg-slate-600 dark:hover:text-slate-200"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden p-2">
          {loading && (
            <p className="flex items-center justify-center py-12 text-stone-500">
              Cargando ticket y generando PDF...
            </p>
          )}
          {error && (
            <p className="flex items-center justify-center py-12 text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          {pdfUrl && !loading && (
            <iframe
              src={pdfUrl}
              title={`Ticket ${numReceipt}`}
              className="h-full w-full rounded border border-stone-200 dark:border-slate-600"
            />
          )}
        </div>
      </div>
    </div>
  );
}
