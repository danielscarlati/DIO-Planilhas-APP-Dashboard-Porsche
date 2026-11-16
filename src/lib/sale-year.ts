export function saleYear(date: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return null;
  return parsed.getUTCFullYear();
}

export function filterBySaleYear<T extends { SaleDateSanitized: string }>(rows: T[], year: number | "all"): T[] {
  return year === "all" ? rows : rows.filter((row) => saleYear(row.SaleDateSanitized) === year);
}