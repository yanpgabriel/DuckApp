import { defineConfig } from 'cypress'

export default defineConfig({

  video: true,
  screenshotOnRunFailure: true,
  pageLoadTimeout: 10000,

  // reporter: 'junit',
  // reporterOptions: {
  //   mochaFile: 'cypress/reports/junit/resultados.xml',
  //   toConsole: true
  // },

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: true,
    html: true,
    json: true,
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
