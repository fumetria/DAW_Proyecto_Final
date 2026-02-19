import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ReceiptDetail } from "@/app/lib/receipts.action";

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleString("es-ES", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function formatPrice(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 9,
    color: "#6b7280",
  },
  table: {
    marginTop: 12,
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#111",
    paddingBottom: 4,
    marginBottom: 2,
    fontWeight: "bold",
  },
  colDesc: { width: "40%" },
  colQty: { width: "15%", textAlign: "right" },
  colPrice: { width: "22%", textAlign: "right" },
  colTotal: { width: "23%", textAlign: "right" },
  totalSection: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#111",
    alignItems: "flex-end",
  },
  totalLine: {
    fontSize: 11,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export function ReceiptPDF({ receipt }: { receipt: ReceiptDetail }) {
  const dateStr = formatDate(receipt.created_at);
  const totalStr = formatPrice(receipt.total);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Ticket {receipt.num_receipt}</Text>
          <Text style={styles.meta}>Fecha: {dateStr}</Text>
          <Text style={styles.meta}>Usuario: {receipt.user_email}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>Artículo</Text>
            <Text style={styles.colQty}>Cant.</Text>
            <Text style={styles.colPrice}>P. unit.</Text>
            <Text style={styles.colTotal}>Total</Text>
          </View>
          {receipt.lines.map((line) => (
            <View key={line.id} style={styles.tableRow}>
              <Text style={styles.colDesc}>
                {line.article_name ?? line.cod_art}
                {line.details ? ` - ${line.details}` : ""}
              </Text>
              <Text style={styles.colQty}>{line.quantity}</Text>
              <Text style={styles.colPrice}>{formatPrice(line.price)}</Text>
              <Text style={styles.colTotal}>{formatPrice(line.total)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLine}>
            Método de pago: {receipt.payment_method ?? "—"}
          </Text>
          <Text style={[styles.totalLine, styles.totalAmount]}>
            Total: {totalStr}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
