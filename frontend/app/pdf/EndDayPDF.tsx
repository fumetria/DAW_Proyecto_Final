import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { EndDayRow } from "@/app/lib/types/types";

// Margins: 2.5 cm vertical, 3 cm horizontal (1 cm ≈ 28.35 pt)
const MARGIN_V_PT = 70.87;
const MARGIN_H_PT = 85.05;

const styles = StyleSheet.create({
  page: {
    paddingTop: MARGIN_V_PT,
    paddingBottom: MARGIN_V_PT,
    paddingLeft: MARGIN_H_PT,
    paddingRight: MARGIN_H_PT,
    fontSize: 10,
    width: "A4",
    fontFamily: "Helvetica",
  },
  right: { textAlign: "right" as const },
  left: { textAlign: "left" as const },
  center: { textAlign: "center" as const },
  bold: { fontFamily: "Helvetica-Bold" },
  fontBase: { fontSize: 10 },
  fontSmall: { fontSize: 8 },
  fontLarge: { fontSize: 12 },
  marginBottomSmall: { marginBottom: 4 },
  headerTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    textAlign: "left" as const,
  },
  headerRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "flex-start" as const,
    marginBottom: 8,
  },
  headerRight: { textAlign: "right" as const, fontFamily: "Helvetica" },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingVertical: 4,
    marginBottom: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
    paddingVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderBottomWidth: 0,
    borderTopColor: "#000",
    paddingVertical: 4,
  },
  colFecha: { width: "14%", paddingRight: 4 },
  colTicketInicial: { width: "16%", textAlign: "center" as const },
  colTicketFinal: { width: "16%", textAlign: "center" as const },
  colBImponible: { width: "18%", textAlign: "right" as const },
  colIVA: { width: "18%", textAlign: "right" as const },
  colTotal: { width: "18%", textAlign: "right" as const },
});

function defaultDateRange() {
  const year = new Date().getFullYear();
  return { from: `01/01/${year}`, to: `31/12/${year}` };
}

/** Format YYYY-MM-DD to DD/MM/YYYY for display; pass-through if already DD/MM/YYYY */
function toDDMMYYYY(iso: string): string {
  if (!iso || iso.length < 10) return iso;
  const parts = iso.split("-");
  if (parts.length === 3 && parts[0].length === 4)
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return iso;
}

function formatMoney(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

export function EndDayPDF({
  dateFrom,
  dateTo,
  entityName,
  endDays = [],
}: {
  dateFrom?: string;
  dateTo?: string;
  entityName?: string;
  endDays?: EndDayRow[];
} = {}) {
  const { from: defaultFrom, to: defaultTo } = defaultDateRange();
  const from = dateFrom ?? defaultFrom;
  const to = dateTo ?? defaultTo;
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const reportDate = `${day}/${month}/${year}`;
  const fromDisplay = toDDMMYYYY(from);
  const toDisplay = toDDMMYYYY(to);

  const totalSum = endDays.reduce((acc, row) => acc + (row.total ?? 0), 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>
              Listado de Cierres de Caja.
              {entityName ? ` ${entityName}.` : ""} Ejercicio {year}
            </Text>
            <Text style={styles.fontBase}>
              Cierres de Caja entre {fromDisplay} y {toDisplay}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.fontBase,
            styles.headerRight,
            styles.marginBottomSmall,
          ]}
        >
          Fecha: {reportDate}
        </Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.colFecha, styles.center, styles.bold]}>
            Fecha
          </Text>
          <Text style={[styles.colTicketInicial, styles.center, styles.bold]}>
            Tickets Inicial
          </Text>
          <Text style={[styles.colTicketFinal, styles.center, styles.bold]}>
            Tickets Final
          </Text>
          <Text style={[styles.colBImponible, styles.center, styles.bold]}>
            B. Imponible
          </Text>
          <Text style={[styles.colIVA, styles.center, styles.bold]}>IVA</Text>
          <Text style={[styles.colTotal, styles.center, styles.bold]}>
            Total
          </Text>
        </View>

        {endDays.length === 0 ? (
          <View style={styles.tableRow}>
            <Text style={[styles.colFecha, styles.center]}>Sin datos</Text>
            <Text style={styles.colTicketInicial}>—</Text>
            <Text style={[styles.colTicketFinal, styles.center]}>—</Text>
            <Text style={[styles.colBImponible]}>—</Text>
            <Text style={[styles.colIVA]}>—</Text>
            <Text style={styles.colTotal}>—</Text>
          </View>
        ) : (
          endDays.map((row) => (
            <View key={row.id} style={styles.tableRow}>
              <Text style={[styles.colFecha, styles.center]}>
                {toDDMMYYYY(row.date)}
              </Text>
              <Text style={[styles.colTicketInicial, styles.center]}>
                {row.first_receipt_id}
              </Text>
              <Text style={[styles.colTicketFinal, styles.center]}>
                {row.last_receipt_id}
              </Text>
              <Text style={styles.colBImponible}>—</Text>
              <Text style={styles.colIVA}>—</Text>
              <Text style={styles.colTotal}>{formatMoney(row.total)}</Text>
            </View>
          ))
        )}

        <View style={styles.totalRow}>
          <Text style={[styles.colFecha, styles.bold]}>Total</Text>
          <Text style={styles.colTicketInicial} />
          <Text style={styles.colTicketFinal} />
          <Text style={[styles.colBImponible, styles.bold]}>0,00</Text>
          <Text style={[styles.colIVA, styles.bold]}>0,00</Text>
          <Text style={[styles.colTotal, styles.bold]}>
            {formatMoney(totalSum)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
