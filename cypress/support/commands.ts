export {}

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      logar(usuario: string, senha: string): Chainable<any>;
    }
  }
}

Cypress.Commands.add('logar', (usuario, senha) => {

})
