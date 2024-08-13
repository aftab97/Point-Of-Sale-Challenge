/* eslint-disable @typescript-eslint/no-unused-expressions */
/// <reference types="cypress" />
describe("statistics page", () => {
  beforeEach(() => {
    const cashier = { id: 1, name: "John Doe" };
    const sales = [
      { cashierId: 1, saleAmount: 100 },
      { cashierId: 2, saleAmount: 200 },
      { cashierId: 1, saleAmount: 50 },
    ];

    localStorage.setItem("cashier", JSON.stringify(cashier));
    localStorage.setItem("sales", JSON.stringify(sales));

    cy.visit("http://localhost:3000/statistics");
  });

  it("renders the cashier name from context", () => {
    cy.get(".self-end").should("contain", "John Doe");
  });

  it("displays the sales statistics grouped by cashier", () => {
    cy.get(".mt-5 h2").should("have.text", "Cashier Sales Statistics");
  });

  it("navigates to the correct routes when buttons are clicked", () => {
    cy.get("button").contains("Go Back").click();
    cy.url().should("eq", `http://localhost:3000/`);

    cy.visit("http://localhost:3000/statistics");

    cy.get("button").contains("Add Sale").click();
    cy.url().should("include", "/add-items");
  });
});
