/* jshint node: true */
'use strict';

var express = require('express');

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included(app);

    this.app = app;

    this.shouldIncludeFiles = this._shouldIncludeFiles();
  },

  serverMiddleware: function(config) {
    var app = config.app;
    var options = config.options;

    console.log(`If you're just getting started with ember, please visit http://localhost:${options.port}/ember-getting-started to get going`);

    app.use('/ember-getting-started', express.static(__dirname + 'vendor/welcome.html'));

    // @TODO: we'll add other middleware down here to hijack / (by leaving out next)
    // once we're sure our tests below are working
  },

  _shouldIncludeFiles: function() {
    // @TODO: improve logic here further to check the parent app (this.app) with various checks
    // see https://github.com/samselikoff/ember-cli-mirage/blob/master/index.js for some initial
    // material on how to tackle this type of checking

    /* requested tests (need to be watching in real-time preferably ...)
      - Has an application.hbs been created?
      - Has an index.hbs been created?
      - Have any routes been created?
    */

    // @TODO: figure out how to write tests for this?  painful ...

    return true;
  }
};
