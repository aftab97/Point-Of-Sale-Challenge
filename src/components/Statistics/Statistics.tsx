import React from "react";
import { useGlobal } from "../../utilities/globalContext";
import { BarChart } from "@mui/x-charts/BarChart";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Statistics = () => {
  const { groupedSales, cashier } = useGlobal();

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="self-end p-5">{cashier.name}</div>
      <div className="mt-5">
        <h2 className="text-center">Cashier Sales Statistics</h2>
        {groupedSales && (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Cashier"],
              },
            ]}
            series={[
              { data: [groupedSales["1"]] },
              { data: [groupedSales["2"]] },
              { data: [groupedSales["3"]] },
            ]}
            width={500}
            height={300}
            yAxis={[
              {
                label: "total sales amount",
              },
            ]}
          />
        )}
      </div>
      <div>
        <Button>
          <Link to="/">Go Back</Link>
        </Button>
        <Button>
          <Link to="/add-items">Add Sale</Link>
        </Button>
      </div>
    </div>
  );
};

export default Statistics;
