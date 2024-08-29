describe('Address Confirmation Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('adds two comic books to the cart from the Dashboard, navigates to the View Cart page where they are displayed'
    + ' the Cart page, navigates to the Address Confirmation page, then'  
    + ' back to the Cart page', () => {
        cy.wait(5000);
        cy.contains('Binary Barons')
            .parent().contains('Add to Cart').click();
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Binary Barons')
            .parent().parent().contains('$99.99');
        cy.contains('Binary Barons')
            .parent().parent().contains('1');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');

        cy.contains('Proceed to Checkout').click();
        cy.contains('Back').click();
        cy.contains('Cart');
    });

    it('navigates to the empty View Cart page, then verifies that the "Proceed to Checkout" button is missing', () => {
        cy.wait(5000);            
        cy.contains('View Cart').click();

        cy.getByData('cart-section').then(($cartHeader) =>{
            if ($cartHeader.text().includes('Proceed to Checkout')) {
                cy.getByData('this-test-failed');
            }
        });
    });

    it('adds one comic books to the cart from the Dashboard, navigates to the View Cart page it is displayed,'
    + 'navigates to the Address Confirmation page, then tries to update the address with an incorrect street '
    + 'address format', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();
        
        cy.getByData('address-input').clear()
            .type('!0 Superhero Way');
        cy.getByData('confirm-button').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('adds one comic books to the cart from the Dashboard, navigates to the View Cart page it is displayed,'
    + 'navigates to the Address Confirmation page, then tries to update the address with an incorrect city '
    + 'format', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();
        
        cy.getByData('city-input').clear()
            .type('Sk5 City');
        cy.getByData('confirm-button').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('adds one comic books to the cart from the Dashboard, navigates to the View Cart page it is displayed,'
    + 'navigates to the Address Confirmation page, then tries to update the address with an incorrect postal '
    + 'code format', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();
        
        cy.getByData('postal-code-input').clear()
            .type('ALTER TABLE customer ADD virus BLOB;');
        cy.getByData('confirm-button').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('adds one comic books to the cart from the Dashboard, navigates to the View Cart page it is displayed,'
    + 'navigates to the Address Confirmation page, then tries to update the address with an incorrect country '
    + 'format', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();
        
        cy.getByData('country-input').clear()
            .type('Guinea_Burneau');
        cy.getByData('confirm-button').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('adds one comic books to the cart from the Dashboard, navigates to the View Cart page it is displayed,'
    + 'navigates to the Address Confirmation page, then tries to update the address with an correct street address '
    + 'format', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();

        cy.getByData('address-input').clear()
            .type('25 Superhero Way');
        cy.getByData('confirm-button').click();

        cy.contains('Order Confirmation Page');
    });

    it('adds one comic books to the cart from the Dashboard, navigates to the View Cart page it is displayed,'
    + 'navigates to the Address Confirmation page, then tries to update the address without modifying the mailing '
    + 'address', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();

        cy.getByData('confirm-button').click();

        cy.contains('Order Confirmation Page');
    });

    it('resets the address change to the original value', () => {
        cy.contains('Coiling Dragon')
            .parent().contains('Add to Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Coiling Dragon')
            .parent().parent().contains('$108');
        cy.contains('Coiling Dragon')
            .parent().parent().contains('1');
        cy.contains('Proceed to Checkout').click();

        cy.getByData('address-input').clear()
            .type('10 Superhero Way');
        cy.getByData('confirm-button').click();

        cy.contains('Order Confirmation Page');
    });

});
