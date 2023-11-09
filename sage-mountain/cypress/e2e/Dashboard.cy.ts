describe('Dashboard Page', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('admin@test.com');
        cy.getByData('password-input').type('@dM1nistr8tor');
        cy.contains('Login').click();

        cy.url().should('include', '/dashboard');
    });

    it('successfully gets the page', () => {
        cy.contains('Como Agua Para Chocolate');
        cy.contains('Coiling Dragon');
        cy.contains('Como Agua Para Chocolate');
    });

    it('successfully narrows search to only "Coiling Dragon"', () => {
        cy.wait(5000);
        cy.getByData('search-bar-input').type('Coiling Dragon');
        cy.contains('Coiling Dragon');
    });
});
