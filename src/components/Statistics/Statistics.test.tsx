import React from "react";
import { render, screen } from "@testing-library/react";
import Statistics from "./Statistics";
import { useGlobal } from "../../utilities/globalContext";
import { BarChart } from "@mui/x-charts/BarChart";

jest.mock("../../utilities/globalContext");

jest.mock("@mui/x-charts/BarChart", () => ({
  BarChart: jest.fn(() => <div data-testid="bar-chart" />),
}));

describe("Statistics Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the cashier's name", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      cashier: { id: "1", name: "Cashier 1" },
      groupedSales: null,
    });

    render(<Statistics />);

    expect(screen.getByText("Cashier 1")).toBeInTheDocument();
  });

  it("renders the BarChart with correct data", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      cashier: { id: "1", name: "Cashier 1" },
      groupedSales: {
        "1": 100,
        "2": 200,
        "3": 150,
      },
    });

    render(<Statistics />);

    expect(BarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        xAxis: [{ scaleType: "band", data: ["Cashier"] }],
        series: [{ data: [100] }, { data: [200] }, { data: [150] }],
        width: 500,
        height: 300,
        yAxis: [{ label: "total sales amount" }],
      }),
      {}
    );
  });

  it("does not render the BarChart when groupedSales is null", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      cashier: { id: "1", name: "Cashier 1" },
      groupedSales: null,
    });

    render(<Statistics />);

    expect(screen.queryByTestId("bar-chart")).toBeNull();
  });
});
