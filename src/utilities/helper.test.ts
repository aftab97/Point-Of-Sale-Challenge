import { GroupedSales, Sale } from "./globalContext";
import { groupSalesByCashier } from "./helper";

describe("groupSalesByCashier", () => {
  it("should group and sum sales by cashier ID", () => {
    const salesData: Sale[] = [
      { cashierId: 1, saleAmount: 100 },
      { cashierId: 2, saleAmount: 200 },
      { cashierId: 1, saleAmount: 150 },
    ];

    const expectedGroupedSales: GroupedSales = {
      1: 250,
      2: 200,
    };

    const result = groupSalesByCashier(salesData);

    expect(result).toEqual(expectedGroupedSales);
  });

  it("should return an empty object for an empty array", () => {
    const salesData: Sale[] = [];

    const result = groupSalesByCashier(salesData);

    expect(result).toEqual({});
  });

  it("should handle a single cashier with multiple sales", () => {
    const salesData: Sale[] = [
      { cashierId: 1, saleAmount: 100 },
      { cashierId: 1, saleAmount: 150 },
    ];

    const expectedGroupedSales: GroupedSales = {
      1: 250,
    };

    const result = groupSalesByCashier(salesData);

    expect(result).toEqual(expectedGroupedSales);
  });

  it("should handle multiple cashiers with no overlapping sales", () => {
    const salesData: Sale[] = [
      { cashierId: 1, saleAmount: 100 },
      { cashierId: 2, saleAmount: 200 },
      { cashierId: 3, saleAmount: 300 },
    ];

    const expectedGroupedSales: GroupedSales = {
      1: 100,
      2: 200,
      3: 300,
    };

    const result = groupSalesByCashier(salesData);

    expect(result).toEqual(expectedGroupedSales);
  });

  it("should handle sales data where cashier IDs are not sequential", () => {
    const salesData: Sale[] = [
      { cashierId: 10, saleAmount: 500 },
      { cashierId: 5, saleAmount: 150 },
      { cashierId: 10, saleAmount: 250 },
    ];

    const expectedGroupedSales: GroupedSales = {
      10: 750,
      5: 150,
    };

    const result = groupSalesByCashier(salesData);

    expect(result).toEqual(expectedGroupedSales);
  });
});
