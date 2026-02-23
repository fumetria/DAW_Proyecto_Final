import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { ReceiptDetail } from "@/app/lib/receipts.action";

// Narrow receipt-style page (thermal ticket width ~80mm ≈ 227pt)
const pageWidth = 227;
const pageHeight = 500;

function formatDate(d: Date | null): string {
  if (!d) return "—";
  const date = new Date(d);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatPrice(n: number): string {
  return n.toFixed(2).replace(".", ",");
}
const styles = StyleSheet.create({
  page: {
    padding: 16,
    fontSize: 9,
    width: pageWidth,
    fontFamily: "Helvetica",
  },
  center: { textAlign: "center" as const },
  right: { textAlign: "right" as const },
  left: { textAlign: "left" as const },
  bold: { fontFamily: "Helvetica-Bold" },
  textSmall: { fontSize: 8 },
  textBase: { fontSize: 9 },
  mySm: { marginVertical: 2 },
  mbMD: { marginBottom: 6 },
  headerTitle: { marginBottom: 4, fontSize: 12 },
  headerSub: { marginBottom: 2, fontSize: 8 },
  headerLogo: { alignItems: "center" as const, marginBottom: 2 },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    marginTop: 2,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 4,
    marginBottom: 2,
  },
  tableHeaderCell: { fontSize: 8 },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  colCant: { width: "12%", textAlign: "center" as const },
  colName: { width: "48%", paddingHorizontal: 4 },
  colPrice: { width: "20%", textAlign: "right" as const },
  colTotal: { width: "20%", textAlign: "right" as const },
  totalLine: { marginTop: 2, marginBottom: 2 },
  footer: { textAlign: "center" as const, marginTop: 9, fontSize: 9 },
  footerQrWrap: { alignItems: "center" as const, width: "100%" },
});

export function ReceiptPDF({
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
  const dateStr = formatDate(receipt.created_at);

  return (
    <Document>
      <Page size={[pageWidth, pageHeight]} style={styles.page}>
        <View style={styles.center}>
          <Text style={[styles.headerSub, styles.bold]}>Cafeteria</Text>
          <Text style={[styles.headerTitle, styles.bold]}>L&apos;ESTACIÓ</Text>
          <View style={styles.headerLogo}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image has no alt prop */}
            <Image src={logoDataUrl} style={{ width: 75, height: 50 }} />
          </View>
          <Text style={styles.headerSub}>Ctra. l&apos;estació S/N</Text>
          <Text style={styles.headerSub}>Tel: 96 291 93 75</Text>
          <Text style={styles.headerSub}>Email: 46006100@edu.gva.es</Text>
        </View>
        <View style={styles.line} />
        {/* Receipt date and number section */}
        <View style={[styles.center, styles.mbMD]}>
          <Text>FACTURA SIMPLIFICADA</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>{dateStr}</Text>
          <Text style={styles.right}>{receipt.num_receipt}</Text>
        </View>
        <View style={styles.line} />

        {/* Receipt lines content section */}
        <View style={styles.tableHeader}>
          <Text style={[styles.colCant, styles.tableHeaderCell]}>Cant</Text>
          <Text style={[styles.colName, styles.tableHeaderCell]}>Nombre</Text>
          <Text style={[styles.colPrice, styles.tableHeaderCell]}>Pre.</Text>
          <Text style={[styles.colTotal, styles.tableHeaderCell]}>Total</Text>
        </View>
        {receipt.lines.map((line) => (
          <View key={line.id} style={styles.tableRow}>
            <Text style={styles.colCant}>{line.quantity}</Text>
            <Text style={styles.colName}>
              {(line.article_name ?? "—").toUpperCase().slice(0, 25)}
            </Text>
            <Text style={styles.colPrice}>{formatPrice(line.price)}</Text>
            <Text style={styles.colTotal}>{formatPrice(line.total)}</Text>
          </View>
        ))}

        {/* Total receipt price section */}
        <View style={styles.line} />
        <View style={[styles.row, styles.totalLine]}>
          <Text style={styles.bold}>Total (Impostos Incl.)</Text>
          <Text style={[styles.right, styles.bold]}>
            {formatPrice(receipt.total)} €
          </Text>
        </View>
        <View style={[styles.row, styles.textSmall]}>
          <Text>M. pagament: {receipt.payment_method}</Text>
          <Text />
        </View>
        {/* <View style={styles.line} />
        <View>
          <Text>M. pagament: {receipt.payment_method}</Text>
        </View>
        <View style={styles.line} /> */}

        {/* Receipt footer */}
        <View style={styles.footer}>
          {/* <View style={[styles.center, styles.mbMD]}>
            <Text style={styles.textSmall}>
              Ha sigut atès per <Text style={styles.bold}>{userName}</Text>
            </Text>
          </View> */}
          <Text>
            Ha sigut atès per <Text style={styles.bold}>{userName}</Text>
          </Text>
          <View style={[styles.center, styles.footerQrWrap]}>
            {/* If we want to show some QR code, put inside this View like company website url */}
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image has no alt prop */}
            <Image src={qrDataUrl} style={{ width: 50, height: 50 }} />
          </View>
          <Text>Gracies per la seua visita</Text>
        </View>
      </Page>
    </Document>
  );
}
