const backend = require('./build/dev-server');

module.exports = {
  devServer: {
    before: backend
  }
};
