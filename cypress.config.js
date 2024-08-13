const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
   baseUrl: 'https://www.airalo.com',


    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
  API_URL: 'https://sandbox-partners-api.airalo.com',

  }


});
