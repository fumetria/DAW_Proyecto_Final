import React from "react";
import { pdf } from "@react-pdf/renderer";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ReceiptPDF } from "@/app/pdf/ReceiptPDF";
import type { ReceiptDetail } from "@/app/lib/receipts.action";
import qr from "@/app/pdf/components/CompanyQR";

async function getLogoDataUrl(): Promise<string> {
  const path = join(process.cwd(), "app", "pdf", "components", "iestacio_logo.png");
  const buffer = await readFile(path);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export async function generateReceiptPdf(
  receipt: ReceiptDetail
): Promise<Buffer> {
  const [qrDataUrl, logoDataUrl] = await Promise.all([qr(), getLogoDataUrl()]);
  const doc = React.createElement(ReceiptPDF, {
    receipt,
    qrDataUrl,
    logoDataUrl,
  });
  const instance = pdf(
    doc as React.ReactElement<React.ComponentProps<typeof import("@react-pdf/renderer").Document>>
  );
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
