describe('Dashboard Page', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('admin@test.com');
        cy.getByData('password-input').type('@dM1nistr8tor');
        cy.contains('Login').click();
        cy.wait(5000);

        cy.url().should('include', '/dashboard');
        cy.contains('New Comic Book').click();
    });

    xit('fails when the name format is invalid', () => {
        cy.getByData('name-input').type('(DROP TABLE comic-books)');
        cy.getByData('author-input').type('Morpheus');
        cy.getByData('price-input').type('99.99');
        cy.getByData('quantity-input').type('7');
        cy.getByData('radio-carrying-input').click();
        cy.contains('Save').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    xit('fails when the author format is invalid', () => {
        cy.getByData('name-input').type('Binary Barons');
        cy.getByData('author-input').type('Examp!e $uthor');
        cy.getByData('price-input').type('99.99');
        cy.getByData('quantity-input').type('7');
        cy.getByData('radio-carrying-input').click();
        cy.contains('Save').click();

        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    xit('fails when the price format is invalid', () => {
        cy.getByData('name-input').type('Binary Barons');
        cy.getByData('author-input').type('Morpheus');
        cy.getByData('price-input').type('9999.00');
        cy.getByData('quantity-input').type('7');
        cy.getByData('radio-carrying-input').click();
        cy.contains('Save').click();
 
        cy.contains('There\'s something alien about what you entered. Try again.');
    });

    xit('fails when the quantity format is invalid', () => {
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

    xit('successfully cancels new comic book creation', () => {
        cy.contains('New Comic Book').click();
        
        cy.contains('Cancel').click();
        cy.url().should('include', '/dashboard');
    });
});
