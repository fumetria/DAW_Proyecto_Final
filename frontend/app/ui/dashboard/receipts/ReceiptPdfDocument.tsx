"use client";

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ReceiptDetail } from "@/app/lib/receipts.action";

// Narrow receipt-style page (thermal ticket width ~80mm ≈ 227pt)
const pageWidth = 227;
const pageHeight = 500;

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
  headerTitle: { marginBottom: 4 },
  headerSub: { marginBottom: 2, fontSize: 8 },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
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
  totalLine: { marginTop: 4, marginBottom: 8 },
  footer: { textAlign: "center" as const, marginTop: 12, fontSize: 9 },
});

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

export default function ReceiptPdfDocument({ detail }: { detail: ReceiptDetail }) {
  const dateStr = formatDate(detail.created_at);

  return (
    <Document>
      <Page size={[pageWidth, pageHeight]} style={styles.page}>
        {/* Header - same as printer ticket */}
        <View style={styles.center}>
          <Text style={[styles.headerTitle, styles.bold]}>Cafeteria</Text>
          <Text style={[styles.headerSub, styles.bold]}>L&apos;ESTACIÓ</Text>
          <Text style={styles.headerSub}>Ctra. l&apos;estació S/N</Text>
          <Text style={styles.headerSub}>Tel: 96 291 93 75</Text>
          <Text style={styles.headerSub}>Email: 46006100@edu.gva.es</Text>
        </View>
        <View style={styles.line} />

        {/* Ticket date + num_receipt */}
        <View style={styles.row}>
          <Text style={styles.left}>{dateStr}</Text>
          <Text style={styles.right}>{detail.num_receipt}</Text>
        </View>
        <View style={styles.line} />

        {/* Table header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.colCant, styles.tableHeaderCell]}>Cant</Text>
          <Text style={[styles.colName, styles.tableHeaderCell]}>Nombre</Text>
          <Text style={[styles.colPrice, styles.tableHeaderCell]}>Pre.</Text>
          <Text style={[styles.colTotal, styles.tableHeaderCell]}>Total</Text>
        </View>

        {/* Lines */}
        {detail.lines.map((line) => (
          <View key={line.id} style={styles.tableRow}>
            <Text style={styles.colCant}>{line.quantity}</Text>
            <Text style={styles.colName}>
              {(line.article_name ?? "—").toUpperCase().slice(0, 25)}
            </Text>
            <Text style={styles.colPrice}>{formatPrice(line.price)}</Text>
            <Text style={styles.colTotal}>{formatPrice(line.total)}</Text>
          </View>
        ))}

        <View style={styles.line} />
        <View style={[styles.row, styles.totalLine]}>
          <Text />
          <Text style={[styles.right, styles.bold]}>
            TOTAL: {formatPrice(detail.total)} €
          </Text>
        </View>
        <View style={styles.line} />

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Gracies per la seua visita</Text>
        </View>
      </Page>
    </Document>
  );
}
