describe('404 Page Test Suite', () => {
    it('shows 404 Page when the endpoint is "/bubby"', () => {
        cy.visit('/bubby');

        cy.contains('404');
        cy.contains('That page seems to be lost in cyber-space!');
    });

    it('shows 404 Page when the endpoint is "/yoyo/galaxy-colorway"', () => {
        cy.visit('/yoyo/galaxy-colorway');

        cy.contains('404');
        cy.contains('That page seems to be lost in cyber-space!');
    });

    it('shows 404 Page when the endpoint is "/master-software-engineer"', () => {
        cy.visit('/master-software-engineer');

        cy.contains('404');
        cy.contains('That page seems to be lost in cyber-space!');
    });
});
