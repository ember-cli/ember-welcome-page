'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-implicit-this': false,
  },
  ignore: ['scenario/**', 'test-app/node_modules/**', 'test-app/dist/**'],
};
