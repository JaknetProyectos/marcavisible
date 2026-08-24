const formatter = new Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** `3840` -> `"$3,840.00"` */
export function formatPrice(value: number): string {
  return `$${formatter.format(value)}`;
}

export const IVA_RATE = 0.16;

/** Precio con IVA incluido. */
export function withTax(value: number): number {
  return Math.round(value * (1 + IVA_RATE) * 100) / 100;
}
