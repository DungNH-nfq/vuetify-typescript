import { ScriptingPage } from "../pages/scriptingPage/scriptingPage"

const scriptingPage = new ScriptingPage();
describe('My First Test', () => {

  beforeEach(() => { 
    cy.clearCookies();
    cy.visit('/')
  })

  it('Create a new Script', () => {
    const scriptName = 'This is Cypress';
    scriptingPage.goToScriptingPage()
      .clickAddNewScriptingButton()
      .addNewScripting(scriptName)
      .verifyScriptDetailsInGrid(scriptName)
      .editScript(scriptName)
      .runTheScript();
  })
})
