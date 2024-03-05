describe('Footer Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('successfully navigates to the links contained', () => {
        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Details').click();
        
        cy.contains(`This website is a part of the NOT Software Portfolio © ${new Date().getFullYear()}. All Rights Reserved`);

        cy.contains('Dashboard').click();
        cy.contains('Binary Barons 2');

        cy.contains('Cart').click();
        cy.contains('Nothing is in orbit yet! Maybe try adding items to your cart.');
        cy.contains('Back').click();

        cy.contains('Orders').click();
        cy.contains('Order ID:');
    });
});
