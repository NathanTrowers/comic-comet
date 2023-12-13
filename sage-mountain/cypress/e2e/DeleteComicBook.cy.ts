describe('Dashboard Page (Delete Comic Book)', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('admin@test.com');
        cy.getByData('password-input').type('@dM1nistr8tor');
        cy.contains('Login').click();

        cy.url().should('include', '/dashboard');
    });

    it('successfully deletes a comic book the page', () => {
        cy.contains('New Comic Book').click();
        cy.getByData('name-input').type('Binary Barons 3');
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
        cy.contains('Binary Barons 3')
            .parent().contains('X').click();
        cy.contains('Delete').click();
        
        cy.getByData('catalogue-section').then(($logsSection) =>{
            if ($logsSection.text().includes('Binary Barons 3')) {
                cy.getByData('this-test-failed');
            }
        });
    });

    it('cancels the deletion using the confirmation dialog', () => {
        cy.contains('Binary Barons')
            .parent().contains('X').click();
        cy.contains('Cancel').click();
    });
});
