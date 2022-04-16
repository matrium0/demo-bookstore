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
})

