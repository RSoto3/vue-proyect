module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/unit/setup-vuetify.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!vuetify/.*)', // Transforma solo los módulos de Vuetify.
  ],
};