describe('Tela de login', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  it('Deve sucesso ao abrir a tela de autenticação', () => {
    cy.visit('/')
    cy.url().should('include', '/auth')
    cy.get('#login').should('be.visible')
  })

  it('Deve sucesso ao abrir a tela de autenticação com form de login', () => {
    cy.visit('/auth')
    cy.get('#login').click()
    cy.url().should('include', '/auth/login')
    cy.get('#email').should('be.visible')
    cy.get('#senha').should('be.visible')
  })

  it('Deve sucesso ao conseguir logar com form de login', () => {
    cy.visit('/auth/login')
    cy.url().should('include', '/auth/login')

    cy.get('#email > input[type=email]').should('be.visible')
    cy.get('#senha input[type=password]').should('be.visible')

    cy.get('#enviar').click()

    cy.get('.p-toast-message.p-toast-message-success').should('be.visible')
  })

})
