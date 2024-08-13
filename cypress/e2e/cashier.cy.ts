/// <reference types="cypress" />

describe("Cashier Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the cashier selection radio group", () => {
    cy.get('[data-testid="radio-group"]').should("be.visible");
  });

  it("should allow selecting a cashier", () => {
    cy.get('[data-testid="radio-group"]')
      .find('input[type="radio"]')
      .first()
      .check();
  });

  it("should navigate to the Statistics page when clicking the Statistics button", () => {
    cy.contains("Statistics").click();

    cy.url().should("include", "/statistics");
  });
});
