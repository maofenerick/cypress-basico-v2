// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName')
      .type('Luis Ricardo', { delay: 0 })
      .should('have.value','Luis Ricardo')
        
    cy.get('#lastName')
      .type('Fenerick', { delay: 0 })
      .should('have.value','Fenerick')

    cy.get('#email')
      .type('teste@email.com', { delay: 0 })
      .should('have.value','teste@email.com')

    cy.get('#open-text-area')
      .type('Teste 123', { delay: 0 } )
      .should('have.value', 'Teste 123')
        
    cy.contains('button', 'Enviar')
      .click()
})