import { createTransport } from "nodemailer";
import "dotenv/config";
import path from "path";
import { readFile } from "node:fs/promises";

const transport = createTransport({
  host: process.env.EMAIL_HOST!,
  port: parseInt(process.env.EMAIL_PORT!),
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASSWORD!,
  },
});

const sender = {
  address: process.env.EMAIL_FROM ?? "hello@example.com",
  name: process.env.EMAIL_FROM_NAME ?? "Ticket Digital",
};

export type ReceiptDetailForEmail = {
  num_receipt: string;
  created_at: Date | null;
  total: number;
  payment_method: string | null;
};

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatPrice(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

function buildReceiptEmailHtml(
  to: string,
  receipt: ReceiptDetailForEmail
): string {
  const dateStr = formatDate(receipt.created_at);
  const totalStr = formatPrice(receipt.total);
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tu ticket digital</title>
</head>
<head>
  <style>
    .body { margin: 0; padding: 0; background: #f5f6f8; font-family: Arial, Helvetica, sans-serif; }
    .container { max-width: 630px; margin: 0 auto; background: #fff; border-radius: 8px; }
    .header { padding: 20px 24px; background: #0f7a3e; color: #fff; }
    .content { padding: 24px; color: #111; font-size: 14px; line-height: 20px; }
    .content h1 { margin: 0 0 16px; font-size: 20px; }
    .footer { padding: 16px 24px; background: #f7f8fa; font-size: 11px; color: #666; }
  </style>
</head>
<div class="body">
  <div class="container">
    <div class="header">
      <img src="cid:iestacio_logo" alt="IES L'Estació logo" width="45" height="30"/>
      <strong>Tu ticket digital</strong>
    </div>
    <div class="content">
      <h1>Tu ticket digital</h1>
      <p>Hola <strong>${escapeHtml(to)}</strong>, gracias por su visita.</p>
      <p>Adjuntamos en formato <strong>PDF</strong> su ticket digital correspondiente a la compra del <strong>${escapeHtml(dateStr)}</strong>.</p>
      <p><strong>N.º de ticket:</strong> ${escapeHtml(receipt.num_receipt)}</p>
      <p><strong>Importe total:</strong> ${escapeHtml(totalStr)}</p>
    </div>
    <div class="footer">
      Este ticket tiene la misma validez que el ticket en papel.
    </div>
  </div>
</body>
</html>
`.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendReceiptEmail(
  to: string,
  receiptDetail: ReceiptDetailForEmail,
  pdfBuffer: Buffer
): Promise<void> {
  const dateStr = receiptDetail.created_at
    ? formatDate(receiptDetail.created_at).replace(/\D/g, "")
    : new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const totalStr = formatPrice(receiptDetail.total).replace(".", ",");
  const subject = `${dateStr} Ticket ${totalStr}`;
  const html = buildReceiptEmailHtml(to, receiptDetail);
  const filename = `ticket-${receiptDetail.num_receipt}.pdf`;

  await transport.sendMail({
    from: sender,
    to,
    subject,
    html,
    attachments: [
      {
        filename,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
      {
        filename: "iestacio_logo.png",
        content: await readFile(path.join(process.cwd(), "app", "pdf", "components", "iestacio_logo.png")),
        cid: "iestacio_logo",
      },
    ],
  });
}
