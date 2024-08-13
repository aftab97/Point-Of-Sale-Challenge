import { render, screen, RenderResult } from "@testing-library/react";
import { GlobalProvider, useGlobal } from "./globalContext";

const renderWithGlobalProvider = (ui: React.ReactElement): RenderResult => {
  return render(<GlobalProvider>{ui}</GlobalProvider>);
};

// Component to test the useGlobal hook
const TestComponent = () => {
  const { cashier, groupedSales, handleUpdateSales } = useGlobal();

  // Test logic here
  return (
    <div>
      <div data-testid="cashier-name">{cashier.name}</div>
      <button
        onClick={() => handleUpdateSales(100)}
        data-testid="update-sales-button"
      >
        Update Sales
      </button>
      <div data-testid="grouped-sales">{JSON.stringify(groupedSales)}</div>
    </div>
  );
};

describe("GlobalProvider", () => {
  it("initializes context values correctly", () => {
    renderWithGlobalProvider(<TestComponent />);

    expect(screen.getByTestId("cashier-name")).toBeInTheDocument();
    expect(screen.getByTestId("cashier-name").textContent).toBe("Cashier 1");
  });

  it("localStorage - cashier", async () => {
    const setItemMock = jest.spyOn(Storage.prototype, "setItem");

    renderWithGlobalProvider(<TestComponent />);

    expect(setItemMock).toHaveBeenCalledWith(
      "cashier",
      JSON.stringify({ id: 1, name: "Cashier 1" })
    );
  });
});
