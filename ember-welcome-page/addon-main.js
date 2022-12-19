'use strict';

const { addonV1Shim } = require('@embroider/addon-shim');

module.exports = addonV1Shim(__dirname, {
  // this is a backward-compatibility feature that only works when this v2 addon
  // is consumed in a non-embroider build. Under embroider, you don't need this
  // because you can just delete <WelcomePage /> from your template and that
  // will cause it to be dropped from the build.
  disabled(options) {
    const isProductionEnvironment = process.env.EMBER_ENV === 'production';
    const welcomeConfig = options['ember-welcome-page'] || {};

    return isProductionEnvironment && !welcomeConfig.enabled;
  },
});
