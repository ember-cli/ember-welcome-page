/* jshint node: true */
'use strict';

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included(app);

    if (this._isProduction()) { return; }

    app.import('vendor/construction.png');
    app.import('vendor/welcome-page.css');
  },

  treeForAddon: function() {
    if (this._isProduction()) { return false; }

    var tree = this._super.treeForAddon.apply(this, arguments);

    return tree;
  },

  _isProduction: function() {
    return EmberAddon.env() === 'production';
  }
};
