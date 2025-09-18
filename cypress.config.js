const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.thecolorapi.com/",
    defaultCommandTimeout: 10000,
    video: false
  }
});
