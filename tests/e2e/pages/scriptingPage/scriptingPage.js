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
        this.playButton = '[data-cy=playBtn]';
        this.uploadScriptButton = '[data-cy=uploadBtn]';
        this.runScriptButton = '[data-cy=runBtn]';
        this.subtitle = 'div.subtitle-1.font-weight-light';
        this.editScriptButton = '[data-cy=editBtn]';
    }


    goToScriptingPage() {
        cy.get(this.scriptingPageItem).click();
        cy.get(this.pageName).should('have.text', 'List of scripting');
        return this;
    }

    clickAddNewScriptingButton() {
        cy.get(this.newItemButton).click();
        cy.get(this.pageName).should('have.text', ' New Scripting ');
        return this;
    }

    addNewScripting(scriptName) {
        cy.get(this.scriptNameInput).type(scriptName);
        // cy.get(this.scriptIDInput).type('7634567');
        cy.get(this.scriptTypeButton).click()
        cy.get(this.scriptTypeContent).eq(0).click();
        cy.get(this.scriptVersionInput).type('1');
        // cy.get(this.scriptEndpointInput).type('http://google.com');
        cy.fixture('payload.txt').then((script) => {
            cy.get(this.scriptScriptDataInput).type(script);
        })
        cy.get(this.pageName).click();
        cy.get(this.submitButton).click();
        return this;
    }

    verifyScriptDetailsInGrid(scriptName) {
        cy.get('table').contains('td', scriptName).should('be.visible');;
        return this;
    }

    runTheScript() {
        cy.get(this.playButton).click();
        cy.get(this.runScriptButton).click();
        return this;
    }

    editScript(scriptName) {
        cy.get('table')
            .contains('td', scriptName)
            .siblings()
            .find(this.editScriptButton)
            .click()
        cy.get(this.scriptScriptDataInput).clear();
        cy.fixture('payload1.txt').then((script) => {
            cy.get(this.scriptScriptDataInput).type(script);
        })
        cy.get(this.submitButton).click();
        return this;
    }

}
