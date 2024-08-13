/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
// import { productsMockData } from "../../mocks/mocks";
import { Button } from "@mui/material";
import { useGlobal } from "../../utilities/globalContext";
import { productsMockData } from "../../mocks/mocks";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "sku", headerName: "Sku", width: 180 },
  { field: "name", headerName: "Name", width: 180 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    editable: true,
    align: "left",
    headerAlign: "left",
  },
];

interface TableData {
  sku: number;
  name: string;
  descr: string;
  price: number;
  amount: number;
}

const AddItems = () => {
  const [tableData, setTableData] = useState<
    {
      sku: number;
      name: string;
      descr: string;
      price: number;
      amount: number;
    }[]
  >([]);

  const [total, setTotal] = useState<number>(0);

  const gridApiRef = useGridApiRef();
  const { handleUpdateSales } = useGlobal();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("products")!);
    if (storedData && storedData.length) {
      setTableData(storedData);
    } else {
      const initialData = productsMockData.map((product) => ({
        ...product,
        id: product.sku,
        amount: 1,
      }));
      setTableData(initialData);
    }
  }, []);

  const handleProcessRowUpdate = (newRow: any) => {
    if (gridApiRef.current) {
      const updatedRows = Array.from(
        gridApiRef.current.getRowModels().values()
      );
      const updatedData = updatedRows.map((row) =>
        row.id === newRow.id ? newRow : row
      );
      setTableData(updatedData);
      localStorage.setItem("products", JSON.stringify(updatedData));
    }
    return newRow;
  };

  const handleAddItems = useCallback((tableData: Array<TableData>) => {
    const _total = tableData.reduce((sum, row) => {
      return sum + row.price * row.amount;
    }, 0);
    setTotal(_total);
  }, []);

  const handleSubmit = () => {
    handleUpdateSales(total);
  };

  useMemo(() => {
    handleAddItems(tableData);
  }, [tableData, handleAddItems]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <Button>
          <Link to="statistics">GO BACK</Link>
        </Button>
        <h4>{total && `$${total.toFixed(2)}`}</h4>
      </div>
      <div
        className="m-auto text-center"
        style={{ height: 300, width: "500px" }}
      >
        <DataGrid
          apiRef={gridApiRef}
          columnVisibilityModel={{
            sku: false,
          }}
          rows={tableData}
          columns={columns}
          processRowUpdate={handleProcessRowUpdate}
        />
        <Button onClick={handleSubmit}>
          <Link to="/statistics">Add Item(s)</Link>
        </Button>
      </div>
    </div>
  );
};

export default AddItems;
