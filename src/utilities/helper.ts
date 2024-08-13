import { GroupedSales, Sale } from "./globalContext";

export const salesMockData = [
  {
    cashierId: 1,
    saleAmount: 100.0,
  },
  {
    cashierId: 1,
    saleAmount: 200.0,
  },
  {
    cashierId: 2,
    saleAmount: 500.0,
  },
  {
    cashierId: 1,
    saleAmount: 150.0,
  },
  {
    cashierId: 3,
    saleAmount: 300.0,
  },
];

export const groupSalesByCashier = (salesData: Array<Sale>): GroupedSales => {
  const groupedSales: GroupedSales = {};

  salesData.forEach(({ cashierId, saleAmount }) => {
    if (!groupedSales[cashierId]) {
      groupedSales[cashierId] = 0;
    }
    groupedSales[cashierId] += saleAmount;
  });

  return groupedSales;
};
