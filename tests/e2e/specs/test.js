// https://docs.cypress.io/api/introduction/api.html

import { ScriptingPage } from "../pages/scriptingPage/scriptingPage"

const scriptingPage = new ScriptingPage();
describe('My First Test', () => {

  beforeEach(() => { 
    cy.clearCookies();
    cy.visit('/')
  })

  it('Create a new Script', () => {
    scriptingPage.goToScriptingPage()
      .clickAddNewScriptingButton()
      .addNewScripting();
  })
})
