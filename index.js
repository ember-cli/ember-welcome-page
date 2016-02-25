/* jshint node: true */
'use strict';

var fs    = require('fs');
var path  = require('path');

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included(app);

    this.app = app;

    this.shouldIncludeFiles = this._shouldIncludeFiles();
  },

  contentFor: function(type, config) {
    if (type === 'body' && this.shouldIncludeFiles) {
      return fs.readFileSync(path.join(__dirname, 'vendor/welcome.html'), 'utf8');
    }

    if (type === 'head-footer' && this.shouldIncludeFiles) {
      return '<style>' + fs.readFileSync(path.join(__dirname, 'vendor/styles.css'), 'utf8') + '</style>';
    }
  },

  _shouldIncludeFiles: function() {
    // @TODO: improve logic here further to check the parent app (this.app) with various checks
    // see https://github.com/samselikoff/ember-cli-mirage/blob/master/index.js for some initial
    // material on how to tackle this type of checking

    /* requested tests
      - Has an application.hbs been created?
      - Has an index.hbs been created?
      - Have any routes been created?
    */

    // @TODO: figure out how to write tests for this?  painful ...

    return true;
  }
};
