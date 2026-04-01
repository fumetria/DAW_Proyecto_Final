export type TaxBreakdown = {
  base: number;
  tax: number;
  gross: number;
};

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Computes base and tax amounts when `gross` already includes tax.
 * - `gross`: final price (IVA incluido)
 * - `taxPercent`: e.g. 21, 10, 4, 0
 */
export function computeTaxBreakdownFromGross(
  gross: number,
  taxPercent: number
): TaxBreakdown {
  const safeGross = Number(gross);
  const safePercent = Number(taxPercent);
  if (!Number.isFinite(safeGross) || safeGross < 0) {
    throw new Error("Invalid gross price");
  }
  if (!Number.isFinite(safePercent) || safePercent < 0) {
    throw new Error("Invalid tax percent");
  }

  const divisor = 1 + safePercent / 100;
  const baseRaw = divisor === 0 ? 0 : safeGross / divisor;
  const base = round2(baseRaw);
  const tax = round2(safeGross - base);
  const grossRounded = round2(safeGross);
  return { base, tax, gross: grossRounded };
}

