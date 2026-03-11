"use client";

import dynamic from "next/dynamic";
import { EndDayPDF } from "@/app/pdf/EndDayPDF";
import type { EndDayRow } from "@/app/lib/types/types";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
  { ssr: false }
);

export default function EndDayPDFPreviewClient({
  dateFrom,
  dateTo,
  endDays = [],
}: {
  dateFrom?: string;
  dateTo?: string;
  endDays?: EndDayRow[];
}) {
  return (
    <div className="h-full min-h-[70vh] w-full">
      <PDFViewer width="100%" height="100%" showToolbar>
        <EndDayPDF
          dateFrom={dateFrom}
          dateTo={dateTo}
          endDays={endDays}
        />
      </PDFViewer>
    </div>
  );
}
