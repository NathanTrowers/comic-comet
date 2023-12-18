describe('Cart Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('successfully adds then removes a comic book from the cart on the dashboard page', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Add to Cart').click();

        cy.contains('Binary Barons 2')
            .parent().contains('Remove from Cart').click();

        cy.contains('Binary Barons 2')
            .parent().contains('Add to Cart');
    });

    it('successfully adds then removes a comic book from the cart on the single comic book page', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Details').click();
            
        cy.contains('Add to Cart').click();
        cy.contains('Remove from Cart').click();

        cy.contains('Add to Cart').click();
    });

    it('successfully adds a comic book to the cart from the Dashboard, then removes it from the cart from the single comic book page', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Add to Cart').click();
        cy.contains('Binary Barons 2')
            .parent().contains('Details').click();
            
        cy.contains('Remove from Cart').click();

        cy.contains('Add to Cart');
    });
});
