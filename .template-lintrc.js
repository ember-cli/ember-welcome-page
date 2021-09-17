'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-implicit-this': false,
  },
  ignore: ['test-app/node_modules/**', 'test-app/dist/**'],
};
