describe('Dashboard Page', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('successfully gets the page', () => {
        cy.contains('Como Agua Para Chocolate');
        cy.contains('Coiling Dragon');
        cy.contains('The Last Christian');
    });

    it('successfully narrows search to only "Coiling Dragon"', () => {
        cy.wait(5000);
        cy.getByData('search-bar-input').type('Coiling Dragon');
        cy.contains('Coiling Dragon');
    });
});
