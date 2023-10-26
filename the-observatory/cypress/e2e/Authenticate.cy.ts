describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('blocks failed login when the email format is wrong', () => {
        cy.getByData('email-input').type('comicma!@test.c');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.getByData('message').should('exist')
            .contains('Invalid credentials. Try again.');
    });

    it('blocks failed login when the password format is wrong', () => {
        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c{}');
        cy.contains('Login').click();

        cy.getByData('message').should('exist')
            .contains('Invalid credentials. Try again.');
    });

    it('blocks failed login when the password field is blank', () => {
        cy.getByData('email-input').type('comicman@test.com');
        cy.contains('Login').click();

        cy.getByData('message').should('exist')
            .contains('Invalid credentials. Try again.');
    });

    it('allows successful login and logout', () => {
        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.contains('Logout').click();
        cy.contains('Login');
    });
});
