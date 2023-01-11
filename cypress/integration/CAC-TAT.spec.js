/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('../src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = Cypress._.repeat('teste, ', 50)

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
          .invoke('val', longText)
          .should('have.value', longText)
        
        cy.contains('button', 'Enviar')
          .click()
          
        cy.get('.success')
          .should('be.visible')
        });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName')
          .type('Luis Ricardo', { delay: 0 })
                  
        cy.get('#lastName')
          .type('Fenerick', { delay: 0 })

        cy.get('#email')
          .type('testeemail.com', { delay: 0 })

        cy.get('#open-text-area')
          .type('Teste', { delay: 0 } )
        
          cy.contains('button', 'Enviar')
            .click()
        
        cy.get('.error')
          .should('be.visible')
    });  

    it('campo telefone continua vazio quando preenchido valor nao-numerico', function() {
        cy.get('#phone')
          .type('abcde')
          .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName')
          .type('Luis Ricardo', { delay: 0 })
                  
        cy.get('#lastName')
          .type('Fenerick', { delay: 0 })

        cy.get('#email')
          .type('testeemail.com', { delay: 0 })

        cy.get('#phone-checkbox')
          .check()

        cy.get('#open-text-area')
          .type('Teste', { delay: 0 } )
        
        cy.get('button[type="submit"]')
          .click()
        
        cy.get('.error')
          .should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Luis Ricardo')
          .should('have.value','Luis Ricardo')
          .clear()
          .should('have.value','')
        
        cy.get('#lastName')
          .type('Fenerick')
          .should('have.value','Fenerick')
          .clear()
          .should('have.value','')

        cy.get('#email')
          .type('teste@email.com')
          .should('have.value','teste@email.com')
          .clear()
          .should('have.value','')
        
        cy.get('#phone')
          .type('999999999')
          .should('have.value', '999999999')
          .clear()
          .should('have.value','')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.contains('button', 'Enviar')
        .click()   
        
      cy.get('.error')
        .should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success')
        .should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio)
            .check()
          cy.wrap($radio)
            .should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('#check input[type="checkbox"]')
        .as('checkboxes')
        .check()

      cy.get('@checkboxes')
        .each(checkbox => {
          expect(checkbox[0].checked).to.equal(true)
        })

    })

    it('seleciona um arquivo da pasta fixtures', function () {
      cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/teste.txt')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('teste.txt')
      })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
      cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/teste.txt', {action: 'drag-drop'})
      .then(input => {
        expect(input[0].files[0].name).to.equal('teste.txt')
      })
      
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
      cy.fixture('teste.txt', { encoding: null}).as('testeFile')
      cy.get('#file-upload')
      .selectFile('@testeFile')
      .then(input => {
        expect(input[0].files[0].name).to.equal('teste.txt')
      })
      
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank');
    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click();
      cy.get('#title')
        .should('have.text', 'CAC TAT - Política de privacidade');
    });

  })
  