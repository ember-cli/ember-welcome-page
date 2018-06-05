/* eslint-env node */
'use strict';

var path = require('path');
var writeFile = require('broccoli-file-creator');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included(app);
    this._welcomeConfig = app.options['ember-welcome-page'] || {};

    if (this._isDisabled()) { return; }

    app.import('vendor/welcome-page.css');
  },

  treeForPublic: function() {
    if (this._isDisabled()) { return false; }

    var tree = this._super.treeForPublic.apply(this, arguments);

    return tree;
  },

  treeForAddon: function() {
    if (this._isDisabled()) { return false; }

    var tree = this._super.treeForAddon.apply(this, arguments);

    var appDependencyDescriptorsJson = this._buildAppDependencyTree();

    var appDependencyDescriptorsContent
      = "define('ember-welcome-page/-app-dependency-descriptors', ['exports'], function(exports) {\n"
      + "  exports.default = " + JSON.stringify(appDependencyDescriptorsJson) + ";\n"
      + '});';

    var appDependencyDescriptorsFile = writeFile(
      '/addon/-app-dependency-descriptors.js',
      appDependencyDescriptorsContent
    );

    return new MergeTrees([tree, appDependencyDescriptorsFile]);
  },

  treeForApp: function() {
    if (this._isDisabled()) { return false; }

    var tree = this._super.treeForApp.apply(this, arguments);

    return tree;
  },

  _isDisabled: function() {
    return process.env.EMBER_ENV === 'production' && !this._welcomeConfig.enabled;
  },

  _buildAppDependencyTree() {
    var _this = this;
    var appDependencyList = this._findAppDependencies();
    return appDependencyList.map(function(nodeModule) {
      return _this._buildNodeModuleDescriptorObject(nodeModule);
    });
  },

  _findAppDependencies() {
    var appPkg = require(path.join(this.project.root, 'package.json'));
    var dependencies = Object.keys(appPkg.dependencies || {});
    var devDependencies = Object.keys(appPkg.devDependencies || {});
    var optionalDependencies = Object.keys(appPkg.optionalDependencies || {});
    return dependencies.concat(devDependencies, optionalDependencies);
  },

  _buildNodeModuleDescriptorObject(nodeModule) {
    var pkg = require(path.join(this.project.root, 'node_modules', nodeModule, 'package.json'));
    return {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      href: this._buildUrl(pkg)
    };
  },

  _buildUrl(pkg) {
    return 'https://www.npmjs.com/package/' + pkg.name;
  }
};
