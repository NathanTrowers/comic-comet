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

        cy.wait(3000);
        cy.getByData('confirm-button').click();
        
        cy.contains('Order Confirmation Page');
        cy.contains('Cart Total:');
        cy.contains('$108.01');
        cy.contains('Shipping:');
        cy.contains('Sub-total:');
        cy.contains('Tax:');
        cy.contains('$12.96');
        cy.contains('Order Total:')
        cy.contains('$120.97');
        cy.contains('Place Order').click();

        cy.url().should('include', '/comic-books');
        cy.contains('View Cart').click();
        cy.contains('Nothing is in orbit yet! Maybe try adding items to your cart.');
    });

    it('adds two books to the cart, verifies that it is in the cart on the cart page, '
    + 'confirms that the address is correct on the address confirmation page, '
    + 'confirms the order on the order confirmation page, and redirects to the '
    + 'comic book catalogue page', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('Binary Barons 2')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108.01');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Binary Barons 2')
            .parent().parent().contains('$99.99');
        cy.contains('Binary Barons 2')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();

        cy.wait(3000);
        cy.getByData('confirm-button').click();
        
        cy.contains('Order Confirmation Page');
        cy.contains('Cart Total:');
        cy.contains('$208.00');
        cy.contains('Shipping:');
        cy.contains('Sub-total:');
        cy.contains('Tax:');
        cy.contains('$24.96');
        cy.contains('Order Total:')
        cy.contains('$232.96');
        cy.contains('Place Order').click();

        cy.url().should('include', '/comic-books');
        cy.contains('View Cart').click();
        cy.contains('Nothing is in orbit yet! Maybe try adding items to your cart.');
    });
});
