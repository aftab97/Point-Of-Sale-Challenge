/// <reference types="cypress" />

describe("AddItems Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/add-items");
  });

  it("should load the table with initial data", () => {
    cy.get(".MuiDataGrid-row").should("have.length.greaterThan", 0);

    cy.get(".MuiDataGrid-row")
      .first()
      .within(() => {
        cy.get('[data-field="name"]').should("not.be.empty");
        cy.get('[data-field="price"]').should("not.be.empty");
        cy.get('[data-field="amount"]').should("not.be.empty");
      });
  });

  it("should navigate back when GO BACK button is clicked", () => {
    cy.get("button").contains("GO BACK").click();

    cy.url().should("include", "/statistics");
  });
});
