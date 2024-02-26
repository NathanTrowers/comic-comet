describe('Order Confirmation Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('adds a book to the cart, verifies that it is in the cart on the cart page, '
    + 'confirms that the address is correct on the address confirmation page, '
    + 'confirms the order on the order confirmation page, and redirects to the '
    + 'comic book catalogue page', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108.01');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();

        cy.getByData('confirm-button').click();
        
        cy.contains('Order Confirmation Page');
        cy.contains('Item:');
        cy.contains('$108.01');
        cy.contains('Shipping');
        cy.contains('Sub-total');
        cy.contains('Tax');
        cy.contains('$12.97');
        cy.contains('Order Total:')
        cy.contains('$120.97');
        // cy.contains('Place Order').click();

        // cy.url().should('include', '/comic-books');
    });

});
