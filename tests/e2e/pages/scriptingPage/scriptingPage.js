export class ScriptingPage {

    constructor() {
        this.scriptingPageItem = 'div.v-list a[href="/scripting"]';
        this.pageName = 'div.v-toolbar__title.hidden-sm-and-down';
        this.newItemButton = 'button.primary';
        this.scriptNameInput = 'button.primary';
        this.scriptNameInput = '[data-cy=name]';
        this.scriptIDInput = '[data-cy=id]';
        this.scriptTypeButton = 'div[role="button"]';
        this.scriptTypeContent = '.v-menu__content div.v-list-item__title';
        this.scriptVersionInput = '[data-cy=version]';
        this.scriptScriptDataInput = '[data-cy=script]';
        this.submitButton = '[data-cy=submitBtn]';
        this.clearButton = '[data-cy=clearBtn]';
        this.subtitle = 'div.subtitle-1.font-weight-light';
    }


    goToScriptingPage() {
        cy.get(this.scriptingPageItem).click();
        cy.get(this.pageName).should('have.text', 'Scripting');
        return this;
    }

    clickAddNewScriptingButton() {
        cy.get(this.newItemButton).click();
        cy.get(this.pageName).should('have.text', 'Scripting Edit');
        return this;
    }

    addNewScripting() {
        cy.get(this.scriptNameInput).type('This is Cypress Test');
        cy.get(this.scriptIDInput).type('7634567');
        cy.get(this.scriptTypeButton).click()
        cy.get(this.scriptTypeContent).eq(0).click();
        cy.get(this.scriptVersionInput).type('1');
        cy.get(this.scriptScriptDataInput).type('Hello World');
        cy.get(this.subtitle).click();
        cy.get(this.submitButton).click();
        return this;
    }
}
