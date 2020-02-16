/* globals cy expect */

describe('update-user', () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.seedUsers();
    cy.visit('http://localhost:3000/');
  });

  it('should update an user, omitting password', () => {
    cy.contains('Login').click();
    cy.get('input[name=username]').type('admin');
    cy.get('input[name=password]').type('adminadmin');
    cy.get('button[type=submit]').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.window().then(() => {
      cy.contains('Users').click();

      cy.window().then(() => {
        cy.url().should('eq', 'http://localhost:3000/users');
        cy.get('table').should('contain', 'admin');
        cy.get('table').should('contain', 'testuser');
        cy.get('button[id=editUser_ryfEzeGqzRvW7FbL5').click();

        cy.get('#uniforms-0001-0001')
          .clear()
          .type('newuser');
        cy.get('button[type=submit]').click();

        cy.wait(1000);
        cy.get('table').should('not.contain', 'testuser');
        cy.get('table').should('contain', 'newuser');
        // header tr and 2 users tr
        cy.get('table')
          .find('tr')
          .should('have.length', 3);

        // login with updated username
        cy.contains('Logout').click();
        cy.window().then(() => {
          cy.url().should('eq', 'http://localhost:3000/');

          cy.window().then(() => {
            cy.contains('Login').click();
            cy.url().should('eq', 'http://localhost:3000/login');
            cy.get('input[name=username]').type('newuser');
            cy.get('input[name=password]').type('testuser');
            cy.get('button[type=submit]').click();

            cy.url().should('eq', 'http://localhost:3000/');

            cy.window().then((win) => {
              const user = win.Meteor.user();
              expect(user).to.exist;
              expect(user.username).to.equal('newuser');
            });
          });
        });
      });
    });
  });

  it('should update an user with new password', () => {
    cy.contains('Login').click();
    cy.get('input[name=username]').type('admin');
    cy.get('input[name=password]').type('adminadmin');
    cy.get('button[type=submit]').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.window().then(() => {
      cy.contains('Users').click();

      cy.window().then(() => {
        cy.url().should('eq', 'http://localhost:3000/users');
        cy.get('table').should('contain', 'admin');
        cy.get('table').should('contain', 'testuser');
        cy.get('button[id=editUser_ryfEzeGqzRvW7FbL5').click();

        cy.get('#uniforms-0001-0001')
          .clear()
          .type('newuser');
        cy.get('input[name=password]').type('newpassword');
        cy.get('button[role="switch"]').click();
        cy.get('button[type=submit]').click();

        cy.wait(1000);
        cy.get('table').should('not.contain', 'testuser');
        cy.get('table').should('contain', 'newuser');
        // header tr and 2 users tr
        cy.get('table')
          .find('tr')
          .should('have.length', 3);

        // login with updated user
        cy.contains('Logout').click();
        cy.window().then(() => {
          cy.url().should('eq', 'http://localhost:3000/');

          cy.window().then(() => {
            cy.contains('Login').click();
            cy.url().should('eq', 'http://localhost:3000/login');
            cy.get('input[name=username]').type('newuser');
            cy.get('input[name=password]').type('newpassword');
            cy.get('button[type=submit]').click();

            cy.url().should('eq', 'http://localhost:3000/');

            cy.window().then((win) => {
              const user = win.Meteor.user();
              expect(user).to.exist;
              expect(user.username).to.equal('newuser');
            });
          });
        });
      });
    });
  });
});
