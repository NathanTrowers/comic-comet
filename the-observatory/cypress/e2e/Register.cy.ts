describe('Registration Test Suite', () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('blocks failed registration when the email format is wrong', () => {
        cy.getByData('email-input').type('comich!d@test.c');
        cy.getByData('name-input').type('Comic Chad');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.getByData('password-confirmation-input').type('com1cFanat!c@P');
        cy.contains('Register').click();

        cy.getByData('message').should('exist')
            .contains('There\'s something alien about what you entered. Try again.');
    });

    it('blocks failed registration when the name format is wrong', () => {
        cy.getByData('email-input').type('comichad@test.com');
        cy.getByData('name-input').type('(DROP TABLE customer;)');
        cy.getByData('password-input').type('com1cFanat!c@P');
        cy.getByData('password-confirmation-input').type('com1cFanat!c@P');
        cy.contains('Register').click();

        cy.getByData('message').should('exist')
            .contains('There\'s something alien about what you entered. Try again.');
    });

    it('blocks failed registration when the password format is wrong', () => {
        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('name-input').type('Comic Chad');
        cy.getByData('password-input').type('com1cFanat!c{}');
        cy.getByData('password-confirmation-input').type('com1cFanat!c{}');
        cy.contains('Register').click();

        cy.getByData('message').should('exist')
            .contains('There\'s something alien about what you entered. Try again.');
    });

    it('blocks failed registration when the password and passwordConfirmation fields do not match', () => {
        cy.getByData('password-input').type('com1cFanat!c@P');
        cy.getByData('password-confirmation-input').type('com1cFanat!cUP');
        cy.contains('Register').click();

        cy.getByData('message').should('exist')
            .contains('There\'s something alien about what you entered. Try again.');
    });

    // The database record must be deleted after each test
    it('allows successful registrations', () => {
        cy.getByData('email-input').type('comicchad@test.com');
        cy.getByData('name-input').type('Comic Chad');
        cy.getByData('password-input').type('com1cFanat!c@P');
        cy.getByData('password-confirmation-input').type('com1cFanat!c@P');
        cy.contains('Register').click();

        cy.contains('Login');
    });

    it('shows that link to login page works from register page', () => {
        cy.contains('Already have an account? Login here!').click();
        cy.contains('Login');
    });
});
