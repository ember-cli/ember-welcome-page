/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/assets/construction.png');
  }
};
