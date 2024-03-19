describe('Contact Us Page Test Suite', () => {
    beforeEach(() => {
        cy.visit('/login');

        cy.getByData('email-input').type('comicman@test.com');
        cy.getByData('password-input').type('com1cFanat!c');
        cy.contains('Login').click();

        cy.url().should('include', '/comic-books');
    });

    it('blocks message delivery when the subject format is wrong', () => {      
        cy.contains('Contact Us').click();
        cy.url().should('include', '/contact-us');

        cy.getByData('subject-input').type('Incorre\\ctly Form@tted Subjec^');
        cy.getByData('text-input').type('Some text');
        cy.contains('Send Message').click();

        cy.getByData('message').should('exist')
            .contains('There\'s something alien about what you entered. Try again.');
    });

    it('blocks message delivery when the message format is wrong', () => {      
        cy.contains('Contact Us').click();
        cy.url().should('include', '/contact-us');

        cy.getByData('subject-input').type('Exemplary Subject');
        cy.getByData('text-input').type('Incorre\\ctly Form`~~d Mess&ge¡');
        cy.contains('Send Message').click();

        cy.getByData('message').should('exist')
            .contains('There\'s something alien about what you entered. Try again.');
    });

    it('allows message delivery when the input is correct and reroutes to the Comic Books page.', () => {      
        cy.contains('Contact Us').click();
        cy.url().should('include', '/contact-us');

        cy.getByData('subject-input').type('Exemplary Subject');
        cy.getByData('text-input').type('Exemplary Message Text!');
        cy.contains('Send Message').click();

        cy.wait(6000);
        cy.url().should('include', '/comic-books');
    });

    it('successfully navigates to the Contact Us page then back to the Comic Books page', () => {      
        cy.contains('Contact Us').click();
        cy.url().should('include', '/contact-us');
        cy.contains('Back to Comic Books').click();

        cy.url().should('include', '/comic-books');
    });

    it('shows that the info icons work', () => {
        cy.contains('Contact Us').click();
        cy.url().should('include', '/contact-us');

        let infoIcons: any = cy.get('.infoIcon');

        cy.wrap(infoIcons[0]).contains('Only letters, numbers, hyphens (-), apostrophes (\'), forward slashes (\/), number signs (#) and spaces are allowed in a valid subject name');
        cy.wrap(infoIcons[1]).contains('Only letters, numbers, and the special characters in parentheses (.#_!?/()@$%+*) are allowed in a valid message');
    });
});
