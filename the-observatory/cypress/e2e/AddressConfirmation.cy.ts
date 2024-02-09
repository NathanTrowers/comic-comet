describe('Cart Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('adds two comic books to the cart from the Dashboard, navigates to the View Cart page where they are displayed'
    + ' the Cart page then navigates to the Address Confirmation page', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Add to Cart').click();
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
            
        cy.contains('View Cart').click();

        cy.contains('Binary Barons 2')
            .parent().parent().contains('$99.99');
        cy.contains('Binary Barons 2')
            .parent().parent().contains('1');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');

        cy.contains('Proceed to Checkout').click();
        cy.contains('Address Confirmation');
    });

    it('adds two comic books to the cart from the Dashboard, navigates to the View Cart page where they are displayed'
    + ' the Cart page, navigates to the Address Confirmation page, then'  
    + ' back to the Cart page', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Add to Cart').click();
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
            
        cy.contains('View Cart').click();

        cy.contains('Binary Barons 2')
            .parent().parent().contains('$99.99');
        cy.contains('Binary Barons 2')
            .parent().parent().contains('1');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');

        cy.contains('Proceed to Checkout').click();
        cy.contains('Back').click();
        cy.contains('View Cart');
    });

    it('navigates to the empty View Cart page, then verifies that the Address'
    + ' the Cart page, navigates to the Address Confirmation page, then'  
    + ' back to the Cart page', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Add to Cart').click();
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
            
        cy.contains('View Cart').click();

        cy.contains('Binary Barons 2')
            .parent().parent().contains('$99.99');
        cy.contains('Binary Barons 2')
            .parent().parent().contains('1');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');

        cy.contains('Proceed to Checkout').click();
        cy.contains('Back').click();
        cy.contains('View Cart');
    });
});
