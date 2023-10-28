Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://demo.guru99.com/insurance/v1/index.php');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('input.btn').click();
  cy.get('input[type="submit"][value="Log out"].btn.btn-danger').should('exist');
});

