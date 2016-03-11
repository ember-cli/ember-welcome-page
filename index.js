/* jshint node: true */
'use strict';

var fs    = require('fs-extra');
var path  = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included(app);

    this.app = app;

    this.welcomeDirectory = path.join(this.project.addonPackages['ember-welcome-page'].path, '/welcome');

    this.shouldIncludeFiles = this._shouldIncludeFiles();

    if (this.shouldIncludeFiles) {
      app.import('vendor/app.css');
    }
  },

  testemMiddleware: function(app) {

    var root = this.project.root;
    app.post('/welcome-add-application-hbs', function(req, res) {

      var fromFile = path.join(root, '/tests/files/application.hbs');
      var toFile = path.join(root, '/tests/dummy/app/templates/application.hbs');

      // @TODO: work out how to handle this.  currently putting in a new file
      // causes an infinite loop, as adding a new file causes our tests to reload
      // causing this to run again ;-)  can we turn off watching of one folder using
      // an add-on?

      //fs.copy(fromFile, toFile, function (err) {
      //  if (err) return res.send({
      //    status: err
      //  });
      //
      //  res.send({
      //    status: 'copied file'
      //  });
      //})
    });

    app.post('/welcome-remove-application-hbs', function(req, res) {
      res.status(201).end();
    });
  },

  // handle merging in our application.hbs file
  // because we are doing things here (without an overwrite), this will automatically
  // turn off if an application.hbs file is created in the parent app
  treeForTemplates: function(tree) {
    if (!this._shouldIncludeFiles) {
      return tree;
    }

    var welcomeTemplates = new Funnel(this.welcomeDirectory, {
      srcDir: 'templates'
    });

    if (tree) {
      return mergeTrees([tree, welcomeTemplates]);
    } else {
      return welcomeTemplates;
    }
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
