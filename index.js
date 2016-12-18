/* jshint node: true */
'use strict';

var existsSync = require('exists-sync');
var fs = require('fs');
var path = require('path');
var VersionChecker = require('ember-cli-version-checker');
var walkSync = require('walk-sync');

function getWelcomePageHTML(baseURL, version) {
  var lodash = require('lodash');
  var fileName = path.join(__dirname, 'vendor', 'welcome.html');
  var contents = fs.readFileSync(fileName, { encoding: 'utf8' });
  var compiled = lodash.template(contents);

  return compiled({ baseURL: baseURL, version: version });
}

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included(app);

    this.app = app;

    var checker = new VersionChecker(this);
    this.guidesVersion = this.massageVersionNumber(checker.for('ember', 'bower').version || checker.for('ember-core', 'npm').version);

    this.jsExt = this.app.registry.extensionsForType('js');
    this.templateExt = this.app.registry.extensionsForType('template');
  },

  serverMiddleware: function(config) {
    var app = config.app;
    var options = config.options;

    this.ui.writeInfoLine("\nJust getting started with Ember? Please visit http://localhost:" + options.port + "/ember-getting-started to get going\n");
    var _this = this;

    var welcomePageHTML = getWelcomePageHTML(options.baseURL, this.guidesVersion);

    app.get('/ember-getting-started-image.png', function (req, res, next) {
      res.sendFile(__dirname + '/vendor/construction.png', options, function (err) {
        if (err) {
          res.status(err.status).end();
        }
      });
    });

    app.get('/ember-getting-started', function (req, res, next) {
      res.send(welcomePageHTML);
    });

    // we'll assume we're running '/' but then bail if we aren't supposed to be overriding
    app.get(options.baseURL, function(req, res, next) {
      if (_this.shouldOverride(_this.jsExt, _this.templateExt, _this.app.project.root)) {
        res.send(welcomePageHTML);
      } else {
        next();
      }
    });
  },

  /* requested tests (need to be watching in real-time preferably ...)
   - Has an application.hbs been created?
   - Has an index.hbs been created?
   - Have any routes been created?
   */
  shouldOverride: function(jsExtensions, templateExtensions, folderPath) {

    var appFiles = walkSync(path.join(folderPath, 'app'));

    var jsFiles = appFiles
      .filter(function(fileName) {
        var extension = path.extname(fileName).slice(1); // remove leading `.`

        return jsExtensions.indexOf(extension) > -1;
      });

    var templateFiles = appFiles
      .filter(function(fileName) {
        var extension = path.extname(fileName).slice(1); // remove leading `.`

        return templateExtensions.indexOf(extension) > -1;
      });

    var routeFiles = jsFiles
      .filter(function(fileName) {
        var baseName = path.basename(fileName);

        return baseName === 'route' || fileName.match(/^routes/);
      });

    var routerPath = path.join(folderPath, 'app', 'router.js');
    var hasRouterMapContents = false;

    if (existsSync(routerPath)) {
      var router = fs.readFileSync(routerPath, { encoding: 'utf8' });
      hasRouterMapContents = router.match(/this\.route|this\.resource/);
    }

    var hasTemplates = templateFiles.length > 0;
    var hasRoutes = routeFiles.length > 0;

    return !hasTemplates && !hasRoutes && !hasRouterMapContents;
  },

  massageVersionNumber: function(version) {
    return version.replace(/(\d+).(\d+).\d/, '$1.$2.0');
  }
};
