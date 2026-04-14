import { join } from "node:path";
import ReceiptPDFPreview from "./ReceiptPDFPreview";
import { getReceiptDetail } from "@/app/lib/receipts.action";
import { readFile } from "node:fs/promises";
import qr from "@/app/pdf/components/CompanyQR";
import { auth } from "@/auth";

async function getLogoDataUrl(): Promise<string> {
  const path = join(
    process.cwd(),
    "app",
    "pdf",
    "components",
    "iestacio_logo.png",
  );
  const buffer = await readFile(path);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function Page() {
  const session = await auth();
  const userName = session?.user?.name;
  const receipt = await getReceiptDetail("FS26-000048");
  const logoDataUrl = await getLogoDataUrl();
  const qrDataUrl = await qr();
  if (!receipt || !logoDataUrl || !qrDataUrl) return <div> Sin datos</div>;

  return (
    <div className="w-full h-full">
      <ReceiptPDFPreview
        receipt={receipt}
        qrDataUrl={qrDataUrl}
        logoDataUrl={logoDataUrl}
        userName={userName ? userName : ""}
      />
    </div>
  );
}
