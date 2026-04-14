"use client";

import { ReceiptDetail } from "@/app/lib/receipts.action";
import { ReceiptPDF } from "@/app/pdf/ReceiptPDF";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
  { ssr: false },
);

export default function ReceiptPDFPreview({
  receipt,
  qrDataUrl,
  logoDataUrl,
  userName,
}: {
  receipt: ReceiptDetail;
  qrDataUrl: string;
  logoDataUrl: string;
  userName?: string;
}) {
  return (
    <div className="w-full h-full">
      <PDFViewer width={"100%"} height={"100%"}>
        <ReceiptPDF
          receipt={receipt}
          qrDataUrl={qrDataUrl}
          logoDataUrl={logoDataUrl}
          userName={userName}
        />
      </PDFViewer>
    </div>
  );
}
