const backend = require('./build/dev-server');

module.exports = {
  devServer: {
    before: backend
  },

  pluginOptions: {
    i18n: {
      locale: 'ko',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
};
