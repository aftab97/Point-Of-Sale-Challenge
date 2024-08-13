import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { cashierMockData, salesMockData } from "../mocks/mocks";
import { lsCashier, lsSales } from "./localStorage";
import { groupSalesByCashier } from "./helper";

interface Cashier {
  id: number;
  name: string;
}

export interface Sale {
  cashierId: number;
  saleAmount: number;
}

export interface GroupedSales {
  [cashierId: number]: number;
}

interface IGlobalContext {
  cashiers: Array<Cashier>;
  setCashiers: Dispatch<SetStateAction<Array<Cashier>>>;
  cashier: Cashier;
  setCashier: Dispatch<SetStateAction<Cashier>>;
  sales: Array<Sale>;
  setSales: Dispatch<SetStateAction<Array<Sale>>>;
  groupedSales: GroupedSales;
  setGroupedSales: Dispatch<SetStateAction<GroupedSales>>;
  handleUpdateSales: (amount: number) => void;
}

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [cashiers, setCashiers] = useState<Array<Cashier>>(cashierMockData);

  // keep in sync with LS
  const [cashier, setCashier] = useState<Cashier>(lsCashier || cashiers[0]);

  const [sales, setSales] = useState<Array<Sale>>(lsSales || salesMockData);

  const [groupedSales, setGroupedSales] = useState<GroupedSales>(
    groupSalesByCashier(sales)
  );

  // sync handler for cashier
  useEffect(() => {
    localStorage.setItem("cashier", JSON.stringify(cashier));
  }, [cashier]);

  // sync handler for sales
  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  const handleUpdateSales = (amount: number) => {
    const newSale = { cashierId: cashier.id, saleAmount: amount };
    const updatedSales = [...sales, newSale];
    setSales(updatedSales);
    setGroupedSales(groupSalesByCashier(updatedSales));
  };

  return (
    <GlobalContext.Provider
      value={{
        cashiers,
        setCashiers,
        cashier,
        setCashier,
        sales,
        setSales,
        groupedSales,
        setGroupedSales,
        handleUpdateSales,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within an GlobalProvider");
  }
  return context;
}
