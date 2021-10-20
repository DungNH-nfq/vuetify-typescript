export class HomePage {
    goToHomePage() {
        cy.visit('/');
        return this;
    }
}
