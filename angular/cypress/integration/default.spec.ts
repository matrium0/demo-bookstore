/// <reference types="Cypress" />

describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Welcome');
    cy.contains('Welcome to');
  });
  it('Navigate and display Author Page', () => {
    cy.visit('/author');
    cy.get("h1").contains("Authors");
  });

  it('Navigate and display Author Page', () => {
    cy.visit('/');
    cy.get('a').contains('Author').click();
    cy.get("h1").contains("Authors");
  });

  it('Test Author Search', () => {
    cy.visit('/');

    // click header link to navigate to Author page
    cy.get('a').contains('Author').click();
    cy.get("h1").contains("Authors");

    // on entering the search-input has focus
    cy.get("#filterInput").should("be.focused");

    // search for Brandon Sanderson
    cy.focused().type("Brandon Sanderson", {delay: 150})

    // verify that only a single Author is found and click on him
    cy.get("#author-table-wrapper").find("tbody").find("tr").should('have.length', 1).click();

    // verify that the detail page is loaded and displays details for Brandon Sanderson
    cy.get("h1").contains("Brandon Sanderson");
  });
})

