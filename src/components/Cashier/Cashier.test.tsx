import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cashier from "./Cashier";
import { useGlobal } from "../../utilities/globalContext";

jest.mock("../../utilities/globalContext");

// describe("Cashier", () => {
//   test("tests for radio group present", async () => {
//     render(
//       <GlobalProvider>
//         <Cashier />
//       </GlobalProvider>
//     );
//     const radioGrouop = screen.getByTestId("radio-group");
//     expect(radioGrouop).toBeInTheDocument();
//   });
// });

describe("Cashier Component", () => {
  const mockSetCashier = jest.fn();

  beforeEach(() => {
    // Reset the mock before eac test
    mockSetCashier.mockReset();
  });

  it("renders correctly with available cashiers", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      cashier: { id: "1", name: "Cashier 1" },
      cashiers: [
        { id: "1", name: "Cashier 1" },
        { id: "2", name: "Cashier 2" },
      ],
      setCashier: mockSetCashier,
    });
    render(<Cashier />);

    expect(screen.getByLabelText("Cashier 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Cashier 2")).toBeInTheDocument();

    expect(screen.getByLabelText("Cashier 1")).toBeChecked();
  });

  it("calls setCashier when a different cashier is selected", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      cashier: { id: "1", name: "Cashier 1" },
      cashiers: [
        { id: "1", name: "Cashier 1" },
        { id: "2", name: "Cashier 2" },
      ],
      setCashier: mockSetCashier,
    });

    render(<Cashier />);

    fireEvent.click(screen.getByLabelText("Cashier 2"));

    expect(mockSetCashier).toHaveBeenCalledWith({
      id: "2",
      name: "Cashier 2",
    });
  });

  it("does not render radio buttons if there are no cashiers", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      cashier: null,
      cashiers: [],
      setCashier: mockSetCashier,
    });

    render(<Cashier />);

    expect(screen.queryByTestId("radio-group")).toBeNull();
  });
});
