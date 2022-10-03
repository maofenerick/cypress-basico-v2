it.only('testa a página da política de privavidade de forma independente', function () {
    cy.visit('../src/privacy.html')
    cy.get('#title')
      .should('have.text', 'CAC TAT - Política de privacidade');
    
});