/* globals cy */

describe('delete-user', () => {
  before(() => {
    cy.resetDatabase();
    cy.seedUsers();
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should delete an user', () => {
    cy.contains('Login').click();
    cy.get('input[name=username]').type('admin');
    cy.get('input[name=password]').type('adminadmin');
    cy.get('button[type=submit]').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.window().then(() => {
      cy.contains('Menu').click();
      cy.contains('Users').click();

      cy.window().then(() => {
        cy.url().should('eq', 'http://localhost:3000/users');
        cy.get('table').should('contain', 'admin');
        cy.get('table').should('contain', 'testuser');
        cy.get('button[id=deleteUser_ryfEzeGqzRvW7FbL5').click();
        cy.contains('OK').click();
        cy.get('table').should('not.contain', 'testuser');
        // header tr, 1 user tr
        cy.get('table')
          .find('tr')
          .should('have.length', 2);
      });
    });
  });
});
