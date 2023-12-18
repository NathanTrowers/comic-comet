describe('Details Page Page', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('successfully displays the infomation for Binary Barons 2', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Details').click();

        cy.contains('Binary Barons');
        cy.contains('Morpheus');
        cy.contains('99.99');
        cy.contains('7');
    });

    it('successfully navigates back to the Dashboard', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Details').click();

        cy.contains('Back').click();
        cy.url().should('include', '/comic-books');
    });
});
