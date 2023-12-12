describe('Add New Comic Book Page', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('admin@test.com');
        cy.getByData('password-input').type('@dM1nistr8tor');
        cy.contains('Login').click();
        cy.wait(5000);

        cy.url().should('include', '/dashboard');
        cy.contains('New Comic Book').click();
    });

    it('fails when the name format is invalid', () => {
        cy.getByData('name-input').type('(DROP TABLE comic-books)');
        cy.getByData('author-input').type('Morpheus');
        cy.getByData('price-input').type('99.99');
        cy.getByData('quantity-input').type('7');
        cy.getByData('radio-carrying-input').click();
        cy.contains('Save').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('fails when the author format is invalid', () => {
        cy.getByData('name-input').type('Binary Barons');
        cy.getByData('author-input').type('Examp!e $uthor');
        cy.getByData('price-input').type('99.99');
        cy.getByData('quantity-input').type('7');
        cy.getByData('radio-carrying-input').click();
        cy.contains('Save').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('fails when the price format is invalid', () => {
        cy.getByData('name-input').type('Binary Barons');
        cy.getByData('author-input').type('Morpheus');
        cy.getByData('price-input').type('9999.00');
        cy.getByData('quantity-input').type('7');
        cy.getByData('radio-carrying-input').click();
        cy.contains('Save').click();
 
        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('fails when the quantity format is invalid', () => {
        cy.getByData('name-input').type('Binary Barons');
        cy.getByData('author-input').type('Morpheus');
        cy.getByData('price-input').type('99.99');
        cy.getByData('quantity-input').type('-3');
        cy.getByData('radio-discontinued-input').click();
        cy.contains('Save').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    it('successfully adds new comic book', () => {
        cy.getByData('name-input').type('Binary Barons');
        cy.getByData('author-input').type('Morpheus');
        cy.getByData('price-input').type('99.99');
        cy.getByData('quantity-input').type('7');
        cy.get('input[type=file]').selectFile({
            contents: 'cypress/fixtures/logo512.png',
            fileName: 'logo512.png',
            mimeType: 'iamge/png',
            lastModified: Date.now(),
        });
        cy.getByData('radio-carrying-input').click();
        cy.contains('Save').click();

        cy.wait(5000);
        cy.contains('Binary Barons');
    });

    it('successfully cancels new comic book creation', () => {
        cy.contains('Cancel').click();
        cy.url().should('include', '/dashboard');
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
