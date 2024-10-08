describe('Orders Page Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('navigates to the orders page where an order of "The Last Christian" is shown', () => {
        cy.contains('View Orders').click();
        
        cy.contains('Order ID: 819d98be-20e8-4dbf-8a0d-2b46fe052de1')
            .parent().parent().children().contains('Order Date: Tue Aug 22 2023 23:14:07 GMT-0400 (Eastern Daylight Time)')
            .parent().parent().children().contains('Return Status: none')
            .parent().parent().parent().children().contains('The Last Christian')
                .parent().children().contains('Name:')
            .parent().parent().children().contains('David Gregory')
                .parent().children().contains('Author')
            .parent().parent().children().contains('$50.00')
                .parent().children().contains('Price');
    });

    // reset the return status for the comic book to 'none' in the ddatabase after the below test runs
    it('navigates to the orders page where an order of "The Last Christian" is shown'
    + ' then returns the order', () => {
        cy.contains('View Orders').click();
        
        cy.contains('Order ID: 819d98be-20e8-4dbf-8a0d-2b46fe052de1')
            .parent().parent().children().contains('Return Order').click();
        cy.contains('Are you sure you want to return comic book The Last Christian from order 819d98be-20e8-4dbf-8a0d-2b46fe052de1 ?');
        cy.getByData('return-confirmation-button').click();
        cy.contains('819d98be-20e8-4dbf-8a0d-2b46fe052de1')
        .parent().parent().children().contains('Return Status: return');
    });

    it('navigates to the orders page then back', () => {
        cy.contains('View Orders').click();
        cy.contains('Back').click();

        cy.contains('Coiling Dragon');
    });
});
