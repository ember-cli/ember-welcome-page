'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/welcome-page.css');
  },

  config() {
    const project = this.project;
    if (project) {
      return {
        isModuleUnification: project.isModuleUnification && project.isModuleUnification()
      };
    }
  }
};
