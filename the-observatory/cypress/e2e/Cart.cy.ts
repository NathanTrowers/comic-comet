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

    it('adds two comic books to the cart from the Dashboard, then navigates to the View Cart page where they are displayed.', () => {
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
    });

    it('navigates to the View Cart page while it is empty, then back to the Dashboard.', () => {
        cy.wait(5000);            
        cy.contains('View Cart').click();

        cy.contains('Nothing is in orbit yet! Maybe try adding items to your cart.');
        cy.contains('Back').click();

        cy.url().should('include', '/comic-books');
    });

    it('adds a comic books to the cart from the Dashboard, navigates to the View Cart page where it is displayed,'
    + ' goes back and removes the item fromm the cart, and checks that no item is in the cart', () => {
        cy.wait(5000);            
        cy.contains('Binary Barons 2')
           .parent().contains('Add to Cart').click();

        cy.contains('View Cart').click();

        cy.contains('Binary Barons 2')
            .parent().parent().contains('$99.99');
        cy.contains('Binary Barons 2')
            .parent().parent().contains('1');

        cy.contains('Back').click();

        cy.contains('Remove from Cart').click();
        cy.contains('View Cart').click();

        cy.contains('Nothing is in orbit yet! Maybe try adding items to your cart.');
    });

    it('adds two comic books to the cart from the Dashboard, navigates to the View Cart page where they are displayed'
    + ' then removes them from the cart on the Cart page', () => {
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

        cy.contains('Binary Barons 2')
            .parent().parent().contains('Remove').click();
        cy.contains('Coiling Dragon')
            .parent().parent().contains('Remove').click();

        cy.contains('Nothing is in orbit yet! Maybe try adding items to your cart.');
    });
});
