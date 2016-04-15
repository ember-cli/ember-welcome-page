/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included(app);

    app.import('/vendor/construction.png', {outputFile: 'assets/construction.png'});
  },

  serverMiddleware: function(config) {
    var options = config.options;

    this.ui.writeInfoLine("\nJust getting started with Ember? Please visit http://localhost:" + options.port + "/ember-getting-started to get going\n");
  }
};
