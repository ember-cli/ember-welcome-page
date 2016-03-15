/* jshint node: true */
'use strict';

var existsSync = require('exists-sync');
var fs = require('fs');
var path = require('path');
var walkSync = require('walk-sync');

module.exports = {
  name: 'ember-welcome-page',

  included: function(app) {
    this._super.included(app);

    this.app = app;

    this.shouldOverrideIndex = this.shouldOverride(this.app.registry, this.app.project.root);
  },

  serverMiddleware: function(config) {
    var app = config.app;
    var options = config.options;

    this.ui.writeInfoLine("\nJust getting started with Ember? Please visit http://localhost:" + options.port + "/ember-getting-started to get going\n");

    app.get('/ember-getting-started-image.png', function (req, res, next) {
      res.sendFile(__dirname + '/vendor/construction.png', options, function (err) {
        if (err) {
          res.status(err.status).end();
        }
      });
    });
    app.get('/ember-getting-started', function (req, res, next) {
      res.sendFile(__dirname + '/vendor/welcome.html', options, function (err) {
        if (err) {
          res.status(err.status).end();
        }
      });
    });

    // we'll add other middleware down here to hijack / (by leaving out next)
    // once we're sure our tests below are working
    //if (this.shouldOverrideIndex) {
    if (true) {
      app.get('/', function (req, res, next) {
        res.sendFile(__dirname + '/vendor/welcome.html', options, function (err) {
          if (err) {
            res.status(err.status).end();
          }
        });
      });
    }
  },

  /* requested tests (need to be watching in real-time preferably ...)
   - Has an application.hbs been created?
   - Has an index.hbs been created?
   - Have any routes been created?
   */
  shouldOverride: function(registry, folderPath) {
    var templateExtensions = registry.extensionsForType('template');
    var jsExtensions = registry.extensionsForType('js');
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
  }
};
