export class ScriptingPage {

    constructor() {
        this.scriptingPageItem = 'div.v-list a[href="/scripting"]';
        this.pageName = '[data-cy=header]';
        this.newItemButton = 'button.primary';
        this.scriptNameInput = 'button.primary';
        this.scriptNameInput = '[data-cy=name]';
        this.scriptIDInput = '[data-cy=id]';
        this.scriptTypeButton = 'div[role="button"]';
        this.scriptTypeContent = '.v-menu__content div.v-list-item__title';
        this.scriptVersionInput = '[data-cy=version]';
        this.scriptEndpointInput = '[data-cy=endpoint]';
        this.scriptScriptDataInput = '[data-cy=script]';
        this.submitButton = '[data-cy=submitBtn]';
        this.clearButton = '[data-cy=clearBtn]';
        this.subtitle = 'div.subtitle-1.font-weight-light';
    }


    goToScriptingPage() {
        cy.get(this.scriptingPageItem).click();
        cy.get(this.pageName).should('have.text', ' List of scripting ');
        return this;
    }

    clickAddNewScriptingButton() {
        cy.get(this.newItemButton).click();
        cy.get(this.pageName).should('have.text', ' New Scripting ');
        return this;
    }

    addNewScripting() {
        cy.get(this.scriptNameInput).type('This is Cypress Test');
        // cy.get(this.scriptIDInput).type('7634567');
        cy.get(this.scriptTypeButton).click()
        cy.get(this.scriptTypeContent).eq(0).click();
        cy.get(this.scriptVersionInput).type('1');
        cy.get(this.scriptEndpointInput).type('http://google.com');
        cy.fixture('payload.txt').then((script) => {
            cy.get(this.scriptScriptDataInput).type(script);
        })
        cy.get(this.subtitle).click();
        cy.get(this.submitButton).click();
        return this;
    }

    verifyScriptDetailsInGrid(){
        cy.get('table').contains('td', 'This is Cypress Test').should('be.visible');;
        return this;
    }

}
