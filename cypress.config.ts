import { defineConfig } from 'cypress'

export default defineConfig({

  video: false,
  screenshotOnRunFailure: false,

  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/junit/resultados.xml',
    toConsole: true
  },

  e2e: {
    'baseUrl': 'http://localhost:4200',
    supportFile: false
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})
