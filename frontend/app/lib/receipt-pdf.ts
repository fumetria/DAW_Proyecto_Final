import React from "react";
import { pdf } from "@react-pdf/renderer";
import { ReceiptPDF } from "@/app/pdf/ReceiptPDF";
import type { ReceiptDetail } from "@/app/lib/receipts.action";

export async function generateReceiptPdf(
  receipt: ReceiptDetail
): Promise<Buffer> {
  const doc = React.createElement(ReceiptPDF, { receipt });
  const instance = pdf(doc);
  const result = await instance.toBuffer();
  if (Buffer.isBuffer(result)) {
    return result;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of result as AsyncIterable<Uint8Array | Buffer>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
