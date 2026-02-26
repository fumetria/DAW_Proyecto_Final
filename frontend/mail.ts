import { createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import "dotenv/config";
import path from "path";
import { readFile } from "node:fs/promises";
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(

  process.env.MAIL_CLIENT_ID,
  process.env.MAIL_CLIENT_SECRET,

);
oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN });

const accessToken = await oAuth2Client.getAccessToken();

if (!accessToken || !accessToken.res) {
  throw new Error("Failed to get access token");
}
const transport = createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.AUTH_EMAIL_USER!,
    clientId: process.env.MAIL_CLIENT_ID!,
    clientSecret: process.env.MAIL_CLIENT_SECRET!,
    refreshToken: process.env.MAIL_REFRESH_TOKEN!,
    accessToken: accessToken,
  },
} as SMTPTransport.Options);

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
        .body {
            margin: 0;
            padding: 0;
            background: #f5f6f8;
            font-family: Arial, Helvetica, sans-serif;
        }

        .container {
            max-width: 630px;
            margin: 0 auto;
            background: #fff;
            border-radius: 8px;
        }

        .header {
            padding: 20px 24px;
            background: #0f7a3e;
            color: #fff;
            font-size: 20px;
        }

        .content {
            padding: 24px;
            color: #111;
            font-size: 14px;
            line-height: 20px;
        }

        .content h1 {
            margin: 0 0 16px;
            font-size: 24px;
            font-weight: 600;
        }

        .footer {
            padding: 16px 24px;
            background: #f7f8fa;
            font-size: 11px;
            color: #666;
        }

        .footer2 {
            text-align: center;
            padding: 16px 24px;
        }
    </style>
</head>
<div class="body">
    <div class="container">
        <div class="header">
            <img src="cid:iestacio_logo" alt="IES L'Estació logo" width="45" height="30" />
            <strong>Cafeteria L'Estació</strong>
        </div>
        <div class="content">
            <h1>Tu ticket digital</h1>
            <p>Hola <strong>${escapeHtml(to)}</strong>, gracias por su visita a nuestra cafeteria.</p>
            <p>Adjuntamos en formato <strong>PDF</strong> su ticket digital correspondiente a la compra del
                <strong>${escapeHtml(dateStr)}</strong>.
            </p>
            <p><strong>N.º de ticket:</strong> ${escapeHtml(receipt.num_receipt)}</p>
            <p><strong>Importe total:</strong> ${escapeHtml(totalStr)}</p>
        </div>
        <div class="footer">
            <p>Este ticket tiene la misma validez que el ticket en papel.</p>
            <p>El contenido del presente correo electrónico y sus adjuntos está destinado únicamente a la persona a la
                que ha sido enviado. Puede contener información privada y confidencial. Si usted no es el destinatario
                al que ha sido remitida, notifíquelo al remitente y proceda a su borrado. </p>
        </div>
        <div class="footer2">
            <img src="cid:iestacio_mail_footer" alt="IES L'Estació logos footer">
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
      {
        filename: "iestacio_mail_footer.png",
        content: await readFile(path.join(process.cwd(), "app", "pdf", "components", "iestacio_mail_footer.png")),
        cid: "iestacio_mail_footer",
      }
    ],
  });
}
