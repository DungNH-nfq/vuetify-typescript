export class BasePage {

    checkPageUrl(url) {
        cy.url().should('contain', url);
        return this;
    }

    sendPostRequest(url) {
        cy.request('POST', url);
        return this;
    }
}
