describe('Update Existing Comic Book Page', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('admin@test.com');
        cy.getByData('password-input').type('@dM1nistr8tor');
        cy.contains('Login').click();
        cy.wait(5000);

        cy.url().should('include', '/dashboard');
        cy.contains('Coiling Dragon')
            .parent().contains('Edit').click();
    });

    it('fails when the name format is invalid', () => {
        cy.getByData('name-input').clear()
            .type('(DROP TABLE comic-books)');
        cy.getByData('update-button').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('fails when the author format is invalid', () => {
        cy.getByData('author-input').clear()
            .type('Examp!e $uthor');

        cy.getByData('update-button').click();
        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('fails when the price format is invalid', () => {
        cy.getByData('price-input').clear()
            .type('9999.00');
        cy.getByData('update-button').click();
 
        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('fails when the quantity format is invalid', () => {
        cy.getByData('quantity-input').clear()
            .type('-3');
        cy.getByData('update-button').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('fails when the there are no updates', () => {
        cy.getByData('update-button').click();

        cy.contains('You did not update any data. Were you staring in space?');
    });

    it('successfully updates existing comic book', () => {
        cy.getByData('radio-discontinued-input').click();
        cy.getByData('update-button').click();

        cy.wait(5000);
        cy.contains('Binary Barons 2')
            .parent().contains('Edit').click();

        // Reset the carrying status to 'carrying'.
        cy.getByData('radio-carrying-input').click();
        cy.getByData('update-button').click();
    });

    it('shows that the info icons work', async (): Promise<any> => {
        let infoIcons: any = await Promise.resolve(cy.get('.infoIcon'));
        cy.wrap(infoIcons[0]).contains('Only letters, numbers, apostrophes, hyphens and spaces are allowed.');
        cy.wrap(infoIcons[1]).contains('Only letters, numbers, apostrophes, hyphens and spaces are allowed.');
        cy.wrap(infoIcons[2]).contains('Only values 0.00-999.99 in the format 0.00 will be accepted.');
        cy.wrap(infoIcons[3]).contains('Only values 0-999 will be accepted.');
        cy.wrap(infoIcons[4]).contains('To remove the file, click on "Choose file" again, then close the dialog box as soon as it opens.');
        cy.wrap(infoIcons[5]).contains('You must choose an option.');
    });
});
