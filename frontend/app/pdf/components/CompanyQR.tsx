import { toDataURL } from "qrcode";

export default async function qr() {
  const qr = await toDataURL("https://portal.edu.gva.es/iestacio/");
  return qr;
}
