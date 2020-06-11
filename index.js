'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    this._super.included.apply(this, arguments);

    this._welcomeConfig = app.options['ember-welcome-page'] || {};

    if (this._isDisabled()) { return; }

    app.import('vendor/welcome-page.css');
  },

  treeForPublic() {
    if (this._isDisabled()) { return false; }

    var tree = this._super.treeForPublic.apply(this, arguments);

    return tree;
  },

  treeForAddon() {
    if (this._isDisabled()) { return false; }

    var tree = this._super.treeForAddon.apply(this, arguments);

    return tree;
  },

  treeForApp() {
    if (this._isDisabled()) { return false; }

    var tree = this._super.treeForApp.apply(this, arguments);

    return tree;
  },

  _isDisabled() {
    return this._welcomeConfig.enabled === false;
  }
};
