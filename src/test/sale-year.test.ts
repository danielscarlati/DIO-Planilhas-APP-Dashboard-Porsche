import { describe, expect, it } from "vitest";
import sales from "@/data/sales.json";
import { filterBySaleYear, saleYear } from "@/lib/sale-year";

describe("Sale year filter", () => {
  it("filters by sale date, not model year", () => {
    const rows = [
      { SaleDateSanitized: "2024-04-18", ModelYearSanitized: 2023 },
      { SaleDateSanitized: "2025-01-06", ModelYearSanitized: 2024 },
    ];
    expect(filterBySaleYear(rows, 2024)).toEqual([rows[0]]);
  });

  it("excludes invalid dates from a selected year but retains them in all", () => {
    expect(saleYear("INVALID")).toBeNull();
    expect(saleYear("2024-02-30")).toBeNull();
    expect(filterBySaleYear(sales, 2024)).toHaveLength(11);
    expect(filterBySaleYear(sales, "all")).toHaveLength(100);
  });

  it("includes 2027 sale dates from the workbook", () => {
    expect(filterBySaleYear(sales, 2027)).toHaveLength(15);
  });
});